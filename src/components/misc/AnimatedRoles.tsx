"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;
const FADE_MS = 300;

export const AnimatedRoles = ({ roles }: { roles: string[] }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (roles.length <= 1) return;

    const interval = setInterval(() => {
      // fade out, swap text while invisible, then fade back in
      setVisible(false);

      const swapTimeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, FADE_MS);

      return () => clearTimeout(swapTimeout);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <p
      className={`text-base font-para text-muted-foreground transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {roles[index]}
    </p>
  );
};
