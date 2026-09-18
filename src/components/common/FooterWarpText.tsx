"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { PERSONAL_INFO } from "@/constant";

const WarpText = dynamic(() => import("@/components/misc/WarpText"), {
  ssr: false,
});

interface FooterWarpTextProps {
  firstName?: string;
  lastName?: string;
  className?: string;
}

export const FooterWarpText = ({
  firstName = PERSONAL_INFO.firstName.toUpperCase(),
  lastName = PERSONAL_INFO.lastName.toUpperCase(),
  className,
}: FooterWarpTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
        threshold: 0,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full flex-col overflow-hidden px-4 py-6 sm:px-6 sm:py-8 select-none ${className ?? ""}`}
      aria-label={`${firstName} ${lastName}`}
      role="img"
    >
      {isVisible ? (
        <>
          {/* First Name — Top Left, takes 50% width, font size auto-calculated */}
          <div className="w-1/2 self-start min-h-16 sm:min-h-22 md:min-h-28">
            <WarpText
              text={firstName}
              align="left"
              maxWidthRatio={0.96}
              maxHeightRatio={0.9}
              fontSize="clamp(2rem, 9vw, 6.5rem)"
              fontWeight={800}
              fontFamily="var(--font-heading)"
              letterSpacing="-0.04em"
              lineHeight={0.9}
              color="var(--color-foreground)"
              warpStrength={0.06}
              warpScale={1.5}
              speed={0.4}
              pointerInfluence={0.35}
              pointerStrength={0.3}
              refraction={0.014}
              ripple
              className="min-h-16 sm:min-h-22 md:min-h-28 w-full"
            />
          </div>

          {/* Last Name — Directly below, takes 100% width, stretched to fill area if needed */}
          <div className="w-full min-h-16 sm:min-h-22 md:min-h-28">
            <WarpText
              text={lastName}
              align="left"
              maxWidthRatio={0.98}
              maxHeightRatio={0.9}
              stretch={true}
              fontSize="clamp(3rem, 15vw, 11rem)"
              fontWeight={800}
              fontFamily="var(--font-heading)"
              letterSpacing="-0.03em"
              lineHeight={0.9}
              color="var(--color-foreground)"
              warpStrength={0.06}
              warpScale={1.5}
              speed={0.4}
              pointerInfluence={0.35}
              pointerStrength={0.3}
              refraction={0.014}
              ripple
              className="min-h-20 sm:min-h-28 md:min-h-37 w-full"
            />
          </div>
        </>
      ) : (
        <div
          className="min-h-16 sm:min-h-22 md:min-h-28 w-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default FooterWarpText;
