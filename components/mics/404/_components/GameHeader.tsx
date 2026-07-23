"use client";

import React from "react";
import { motion } from "motion/react";

export const GameHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 mb-8 text-center"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
        Page not found,{" "}
        <span className="text-emerald-400 font-bold">
          let&apos;s play
        </span>
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
        Flip matching icons in the 404 grid to clear the game and unlock your custom winner trophy!
      </p>
    </motion.div>
  );
};
