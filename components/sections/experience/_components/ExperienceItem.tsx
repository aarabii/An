"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { type Experience, type ExperienceDate } from "@/constant";
import { TechBadge } from "@/components/common";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  item: Experience;
  index: number;
}

const formatDate = (date: ExperienceDate) => {
  return `${date.mm.slice(0, 3)} ${date.yyyy}`;
};

export const ExperienceItem = ({ item, index }: ExperienceItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const dateRange = item.current
    ? `${formatDate(item.startDate)} — Present`
    : `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative w-full flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-neutral-800/60 bg-neutral-900/30 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-neutral-700/80 hover:bg-neutral-900/50 hover:shadow-xl",
      )}
    >
      {/* Header Section: Company, Role & Date */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800/60 pb-4">
        <div className="flex flex-col gap-1">
          <a
            href={item.companySite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heading text-xl font-bold uppercase tracking-tight text-white transition-colors hover:text-accent sm:text-2xl"
          >
            <span>{item.company}</span>
            <ExternalLink className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100 text-accent shrink-0" />
          </a>

          <p className="font-mono text-xs sm:text-sm font-semibold text-accent tracking-wide">
            {item.role}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 font-mono text-xs font-medium shrink-0 self-start sm:self-auto">
          <Calendar className="h-3.5 w-3.5 text-accent shrink-0" />
          <span>{dateRange}</span>
        </div>
      </div>

      {/* Content Section: Description & Tech Badges */}
      <div className="flex flex-col justify-between gap-6">
        <ul className="flex flex-col gap-2.5 font-mono text-xs sm:text-sm leading-relaxed text-neutral-300">
          {item.description.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 + 0.15 }}
              className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:shadow-xs before:shadow-accent/50"
            >
              {desc}
            </motion.li>
          ))}
        </ul>

        {item.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/40">
            {item.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

