"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseCommandProps {
  onCmdOpn: () => void;
}

export function useCommand({ onCmdOpn }: UseCommandProps) {
  const router = useRouter();

  useEffect(() => {
    // Key: `${shiftPressed ? 1 : 0}:${key}`. Every entry requires Cmd/Ctrl.
    // This makes "c" and "shift+c" distinct, non-overlapping combos by construction.
    const shortcuts: Record<string, () => void> = {
      "0:k": onCmdOpn,

      "0:g": () => router.push("/"),
      "0:j": () => router.push("/projects"),
      "0:w": () => router.push("/blogs"),
      "0:r": () => router.push("/bookmarks"),

      "1:c": () => router.push("/contact"),
      "1:v": () => router.push("/resume"),
      "1:m": () => router.push("/recommendations"),
    };

    function handleKeyDown(event: KeyboardEvent) {
      const modifier = event.metaKey || event.ctrlKey;
      if (!modifier || event.altKey) return;

      const lookupKey = `${event.shiftKey ? 1 : 0}:${event.key.toLowerCase()}`;
      const action = shortcuts[lookupKey];
      if (!action) return;

      event.preventDefault();
      action();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, onCmdOpn]);
}
