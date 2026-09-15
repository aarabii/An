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

  // rAF-driven progress bar + auto-advance
  useEffect(() => {
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
    <Container id="quotes" className="">
      <Title heading="Words that stayed" />
      <div className="relative w-full overflow-hidden px-6 py-16 sm:px-12 sm:py-24">
        {/* Quote text — key forces remount for clean fade-in per quote */}
        <div
          key={active}
          className="mx-auto h-20 w-full font-serif text-center"
        >
          <FitLine maxSize={22} className="italic text-foreground/70">
            {quote.top}
          </FitLine>
          <FitLine
            maxSize={34}
            className="mt-3 font-bold italic text-foreground/90"
          >
            {quote.main}
          </FitLine>
        </div>

        {/* Dot navigation */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-2">
          {LINES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-2 cursor-pointer overflow-hidden rounded-full bg-foreground/20 transition-[width] duration-500"
              style={{ width: i === active ? 32 : 8 }}
              aria-label={`Quote ${i + 1}`}
            >
              {i === active && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground/60"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Quotes;
