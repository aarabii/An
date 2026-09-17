"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import type { TileData } from "./types";
import {
  TOTAL_PAIRS,
  STORAGE_KEY,
  TURN_TIMEOUT_MS,
  MISMATCH_DELAY_MS,
} from "./constants";

// Pre-defined base indices: pairs [0, 0, 1, 1, ..., 9, 9]
const BASE_INDICES: readonly number[] = Array.from(
  { length: TOTAL_PAIRS * 2 },
  (_, i) => Math.floor(i / 2),
);

function getInitialDeterministicDeck(): TileData[] {
  return BASE_INDICES.map((iconIndex, id) => ({
    id,
    iconIndex,
    isFlipped: false,
    isMatched: false,
  }));
}

function generateShuffledDeck(): TileData[] {
  const indices = [...BASE_INDICES];

  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  return indices.map((iconIndex, id) => ({
    id,
    iconIndex,
    isFlipped: false,
    isMatched: false,
  }));
}

// ---------------------------------------------------------------------------
// bestTime as an external store synced from localStorage.
//
// Why not useState + useEffect: reading localStorage during render would
// differ between server (unavailable) and client (may have a value),
// causing a hydration mismatch. useSyncExternalStore is the built-in,
// lint-clean tool for exactly this: an external source that may differ
// between server snapshot and client snapshot, with no setState-in-effect
// involved at all.
//
// The module-level listener set covers same-tab writes (the native
// "storage" event only fires in *other* tabs), so a win recorded in this
// tab updates the UI immediately, and a win recorded in another tab also
// propagates here.
// ---------------------------------------------------------------------------
const bestTimeListeners = new Set<() => void>();

function notifyBestTimeChange() {
  bestTimeListeners.forEach((callback) => callback());
}

function subscribeBestTime(callback: () => void) {
  bestTimeListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    bestTimeListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getBestTimeSnapshot(): number | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return null;
    const parsed = parseInt(stored, 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : null;
  } catch {
    // e.g. private mode / storage disabled
    return null;
  }
}

function getBestTimeServerSnapshot(): number | null {
  return null;
}

function writeBestTime(value: number) {
  try {
    localStorage.setItem(STORAGE_KEY, value.toString());
  } catch {
    // Ignore localStorage write error
  }
  notifyBestTimeChange();
}

export function useMemoryGame() {
  // Deterministic initial deck during SSR prevents hydration mismatches
  const [tiles, setTiles] = useState<TileData[]>(getInitialDeterministicDeck);
  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [turnTimeRemainingMs, setTurnTimeRemainingMs] = useState(0);

  // High score & victory
  const bestTime = useSyncExternalStore(
    subscribeBestTime,
    getBestTimeSnapshot,
    getBestTimeServerSnapshot,
  );
  const [isNewBest, setIsNewBest] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Refs for timers & timestamps
  const gameStartTimeRef = useRef<number | null>(null);
  const turnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mismatchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reshuffle client-side only, replacing the deterministic SSR deck.
  // This must stay an effect (not a lazy initializer) to avoid a
  // hydration mismatch: the server can't know the random shuffle order,
  // so we render deterministically first and randomize after mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setTiles(generateShuffledDeck());
  }, []);

  // Main game timer
  useEffect(() => {
    if (isTimerActive) {
      gameTimerIntervalRef.current = setInterval(() => {
        if (gameStartTimeRef.current) {
          const elapsed = Math.floor(
            (Date.now() - gameStartTimeRef.current) / 1000,
          );
          setTimerSeconds(elapsed);
        }
      }, 1000);
    } else if (gameTimerIntervalRef.current) {
      clearInterval(gameTimerIntervalRef.current);
      gameTimerIntervalRef.current = null;
    }

    return () => {
      if (gameTimerIntervalRef.current) {
        clearInterval(gameTimerIntervalRef.current);
      }
    };
  }, [isTimerActive]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
      if (turnIntervalRef.current) clearInterval(turnIntervalRef.current);
      if (mismatchTimeoutRef.current) clearTimeout(mismatchTimeoutRef.current);
      if (gameTimerIntervalRef.current)
        clearInterval(gameTimerIntervalRef.current);
    };
  }, []);

  const clearTurnTimers = useCallback(() => {
    if (turnTimeoutRef.current) {
      clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = null;
    }
    if (turnIntervalRef.current) {
      clearInterval(turnIntervalRef.current);
      turnIntervalRef.current = null;
    }
    setTurnTimeRemainingMs(0);
  }, []);

  const handleTileClick = useCallback(
    (tileIndex: number) => {
      const targetTile = tiles[tileIndex];

      if (isChecking || targetTile.isFlipped || targetTile.isMatched) {
        return;
      }

      // Start timer on first move
      if (!isTimerActive) {
        gameStartTimeRef.current = Date.now();
        setIsTimerActive(true);
      }

      // Case 1: First tile of the turn
      if (firstSelected === null) {
        setFirstSelected(tileIndex);
        setTiles((prev) =>
          prev.map((t, idx) =>
            idx === tileIndex ? { ...t, isFlipped: true } : t,
          ),
        );

        setTurnTimeRemainingMs(TURN_TIMEOUT_MS);
        const startTime = Date.now();

        turnIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, TURN_TIMEOUT_MS - elapsed);
          setTurnTimeRemainingMs(remaining);
        }, 100);

        turnTimeoutRef.current = setTimeout(() => {
          clearTurnTimers();
          setTiles((prev) =>
            prev.map((t, idx) =>
              idx === tileIndex ? { ...t, isFlipped: false } : t,
            ),
          );
          setFirstSelected(null);
        }, TURN_TIMEOUT_MS);

        return;
      }

      // Case 2: Second tile clicked within 3s window
      if (firstSelected !== tileIndex) {
        clearTurnTimers();
        setIsChecking(true);
        setMoves((prev) => prev + 1);

        setTiles((prev) =>
          prev.map((t, idx) =>
            idx === tileIndex ? { ...t, isFlipped: true } : t,
          ),
        );

        const firstTile = tiles[firstSelected];
        const isMatch = firstTile.iconIndex === targetTile.iconIndex;

        if (isMatch) {
          // Both tiles matched
          setTiles((prev) =>
            prev.map((t, idx) =>
              idx === firstSelected || idx === tileIndex
                ? { ...t, isMatched: true, isFlipped: true }
                : t,
            ),
          );
          setFirstSelected(null);
          setIsChecking(false);

          const newMatchedCount = matchedCount + 1;
          setMatchedCount(newMatchedCount);

          if (newMatchedCount === TOTAL_PAIRS) {
            setIsTimerActive(false);

            const finalElapsed = gameStartTimeRef.current
              ? Math.max(
                  1,
                  Math.floor((Date.now() - gameStartTimeRef.current) / 1000),
                )
              : timerSeconds;

            setTimerSeconds(finalElapsed);

            // Persist high score (bestTime updates via the external store
            // subscription, not a local setState call)
            const currentBest = getBestTimeSnapshot();

            if (currentBest === null || finalElapsed < currentBest) {
              writeBestTime(finalElapsed);
              setIsNewBest(true);
            } else {
              setIsNewBest(false);
            }

            setIsVictoryOpen(true);
          }
        } else {
          // Mismatch: show briefly then flip both down
          mismatchTimeoutRef.current = setTimeout(() => {
            setTiles((prev) =>
              prev.map((t, idx) =>
                idx === firstSelected || idx === tileIndex
                  ? { ...t, isFlipped: false }
                  : t,
              ),
            );
            setFirstSelected(null);
            setIsChecking(false);
          }, MISMATCH_DELAY_MS);
        }
      }
    },
    [
      tiles,
      firstSelected,
      isChecking,
      isTimerActive,
      matchedCount,
      timerSeconds,
      clearTurnTimers,
    ],
  );

  const resetGame = useCallback(() => {
    clearTurnTimers();
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    gameStartTimeRef.current = null;
    setTiles(generateShuffledDeck());
    setFirstSelected(null);
    setIsChecking(false);
    setMoves(0);
    setMatchedCount(0);
    setTimerSeconds(0);
    setIsTimerActive(false);
    setIsNewBest(false);
    setIsVictoryOpen(false);
  }, [clearTurnTimers]);

  return {
    tiles,
    handleTileClick,
    firstSelected,
    isChecking,
    moves,
    matchedCount,
    totalPairs: TOTAL_PAIRS,
    timerSeconds,
    isTimerActive,
    turnTimeRemainingMs,
    bestTime,
    isNewBest,
    isVictoryOpen,
    setIsVictoryOpen,
    resetGame,
  };
}
