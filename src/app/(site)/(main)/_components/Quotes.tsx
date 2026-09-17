"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LINES } from "@/constant/lines";
import { Container, Title } from "@/components/common";

const DURATION = 10000;

/* ── Auto-fit text to a single line ── */
function FitLine({
  children,
  className,
  maxSize,
}: {
  children: string;
  className?: string;
  maxSize: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.fontSize = `${maxSize}px`;
    const { scrollWidth, clientWidth } = el;
    if (scrollWidth > clientWidth) {
      el.style.fontSize = `${Math.floor(maxSize * (clientWidth / scrollWidth))}px`;
    }
    setReady(true);
  }, [maxSize]);

  useEffect(() => {
    document.fonts.ready.then(fit);
  }, [fit]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        whiteSpace: "nowrap",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {children}
    </p>
  );
}

/* ── Quotes Section ── */
const Quotes = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // rAF-driven progress bar + auto-advance with reduced-motion support
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const start = Date.now();
    let raf: number;

    const tick = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        setProgress(0);
        setActive((prev) => (prev + 1) % LINES.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const goTo = (i: number) => {
    if (i === active) return;
    setProgress(0);
    setActive(i);
  };

  const quote = LINES[active];

  return (
    <Container id="quotes">
      <Title heading="Words that stayed" />
      <div className="relative w-full overflow-hidden py-4 sm:py-8">
        {/* Quote text — key forces remount for clean fade-in per quote */}
        <div
          key={active}
          className="mx-auto h-24 w-full font-serif text-center"
        >
          <FitLine maxSize={22} className="italic text-muted-foreground">
            {quote.top}
          </FitLine>
          <FitLine
            maxSize={34}
            className="mt-3 font-bold italic text-foreground"
          >
            {quote.main}
          </FitLine>
        </div>

        {/* Dot navigation */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-1.5">
          {LINES.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              className="relative flex h-8 items-center justify-center p-1.5 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Quote ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span
                className="relative block h-2 overflow-hidden rounded-full bg-border transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: i === active ? 32 : 8 }}
              >
                {i === active && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Quotes;
