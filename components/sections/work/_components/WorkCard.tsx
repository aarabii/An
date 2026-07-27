"use client";

import { motion } from "motion/react";
import { TechBadge } from "@/components/common/tech-badge";
import { WorkGradiendBg } from "./WorkGradiendBg";

export interface WorkCardProps {
  name: string;
  description: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
  index?: number;
}

const GRADIENTS: string[][] = [
  // Orange → Amber → Red
  ["hsl(25, 95%, 53%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)"],

  // Purple → Indigo → Violet
  ["hsl(271, 81%, 56%)", "hsl(239, 84%, 67%)", "hsl(258, 90%, 66%)"],

  // Sky → Blue → Deep Indigo
  ["hsl(198, 93%, 60%)", "hsl(221, 83%, 53%)", "hsl(243, 75%, 59%)"],

  // Emerald → Teal → Cyan
  ["hsl(158, 64%, 52%)", "hsl(173, 80%, 40%)", "hsl(189, 94%, 43%)"],
];

export const WorkCard = ({
  name,
  description,
  technologies,
  links,
  index = 0,
}: WorkCardProps) => {
  const liveUrl = links?.live;
  const githubUrl = links?.github;

  const formattedIndex = String(index + 1).padStart(3, "0");

  const gradientColors = GRADIENTS[index % GRADIENTS.length] ?? GRADIENTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{
        duration: 0.6,
        delay: (index % 2) * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-neutral-800 bg-neutral-950 shadow-2xl transition-colors duration-300 hover:border-neutral-600 hover:shadow-accent/5"
    >
      {/* Gradient Background */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
        <WorkGradiendBg colors={gradientColors} />
      </div>

      {/* Dark Folder Section */}
      <div className="relative z-10 -mt-14 flex flex-1 flex-col sm:-mt-16">
        {/* Folder Bump SVG Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <svg
            className="h-full w-full fill-neutral-950"
            viewBox="0 0 400 340"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 32 C 0 14, 14 0, 32 0 L 175 0 C 190 0, 198 10, 205 22 C 212 34, 220 40, 235 40 L 368 40 C 386 40, 400 54, 400 72 L 400 340 L 0 340 Z"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 pt-2">
          {/* Top Bump Tab Header */}
          <div className="flex h-10 items-center pr-24 sm:h-11">
            <h3 className="truncate font-mono text-sm font-bold tracking-wider text-white uppercase sm:text-base">
              {name}
            </h3>
          </div>

          {/* Body Section */}
          <div className="mt-4 flex flex-1 flex-col gap-4">
            <p className="text-left font-mono text-xs leading-relaxed text-neutral-300 sm:text-sm">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex flex-col pt-2">
            <div className="mb-4 h-px w-full bg-linear-to-r from-neutral-800 via-neutral-700/80 to-neutral-800" />

            <div className="flex items-end justify-between">
              <span className="font-mono text-2xl font-extrabold tracking-tighter text-white sm:text-3xl">
                {formattedIndex}
              </span>

              <div className="flex items-center gap-4">
                {liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase transition-colors hover:text-white hover:underline"
                  >
                    LIVE
                  </motion.a>
                )}

                {githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold tracking-wider text-neutral-400 uppercase transition-colors hover:text-white hover:underline"
                  >
                    GITHUB
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
