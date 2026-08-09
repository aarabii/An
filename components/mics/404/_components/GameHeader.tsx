"use client";

import React from "react";
import { motion } from "motion/react";
import { serif } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const GameHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 mb-6 sm:mb-8 text-center flex flex-col items-center"
    >
      <h1 className={cn(serif.className, "text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-tight text-balance")}>
        Lost in space?{" "}
        <span className="text-accent font-normal">
          Let&apos;s play!
        </span>
      </h1>
      
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
        Flip matching icons in the 404 grid to clear the game and unlock your custom winner trophy!
      </p>
    </motion.div>
  );
};


