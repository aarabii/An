"use client";

import React, { useRef } from "react";
import { useInView } from "motion/react";
import { GrainGradient } from "@paper-design/shaders-react";

export interface SectionGradiendBgProps {
  colors: string[];
  shape?:
    | "truchet"
    | "wave"
    | "dots"
    | "corners"
    | "ripple"
    | "blob"
    | "sphere"
    | undefined;
  speed?: number;
  scale?: number;
  softness?: number;
  intensity?: number;
  noise?: number;
  className?: string;
}

export function SectionGradiendBg({
  colors,
  shape = "corners",
  speed = 1,
  scale = 1,
  softness = 0.76,
  intensity = 0.45,
  noise = 0.25,
  className,
}: SectionGradiendBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport trigger: Mount WebGL canvas ONLY when in viewport to save WebGL contexts
  const isInView = useInView(containerRef, { margin: "100px" });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}
    >
      {isInView ? (
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="#000000"
          softness={softness}
          intensity={intensity}
          noise={noise}
          shape={shape}
          offsetX={0}
          offsetY={0}
          scale={scale}
          rotation={0}
          speed={speed}
          colors={colors}
        />
      ) : (
        <div
          className="w-full h-full opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors[0] || "#38BDF8"}, ${colors[1] || "transparent"} 70%)`,
          }}
        />
      )}
    </div>
  );
}
