"use client";

import { GrainGradient } from "@paper-design/shaders-react";

interface SectionGradiendBgProps {
  colors: string[];
  shape:
    | "truchet"
    | "wave"
    | "dots"
    | "corners"
    | "ripple"
    | "blob"
    | "sphere"
    | undefined;
}

export function SectionGradiendBg({ colors, shape }: SectionGradiendBgProps) {
  return (
    <div className="absolute inset-0">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 0%)"
        softness={0.76}
        intensity={0.45}
        noise={0.25}
        shape={shape}
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={colors}
      />
    </div>
  );
}
