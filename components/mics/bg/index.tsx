"use client";

import { GradientBackground } from "@/components/mics/bg/GradientBg";

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none">
      <GradientBackground />
    </div>
  );
};
