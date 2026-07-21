"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  onContactClick: () => void;
}

export const HeroActions = ({ onContactClick }: HeroActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-9 flex flex-wrap items-center gap-3"
    >
      <Button
        size="lg"
        className="h-11 rounded-lg px-6 font-medium"
        onClick={onContactClick}
      >
        Contact Me
      </Button>

      <Link
        href="/resume"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 rounded-lg px-6 font-medium"
        )}
      >
        View Resume
      </Link>
    </motion.div>
  );
};
