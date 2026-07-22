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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative grid grid-cols-1 gap-6 py-8 transition-colors duration-300 md:grid-cols-12 md:gap-8 md:py-10 border border-white/15 bg-white/5 backdrop-blur-xl p-4 m-4 rounded-md",
        "border-b border-white/10",
      )}
    >
      <div className="flex flex-col justify-start md:col-span-5">
        <div className="flex items-start gap-3">
          <div className="group flex flex-col gap-1">
            <a
              href={item.companySite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-heading text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-accent sm:text-xl md:text-2xl"
            >
              <span>{item.company}</span>
              <ExternalLink className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100 text-accent" />
            </a>

            {/* Role */}
            <p className="text-sm font-semibold text-accent sm:text-base">
              {item.role}
            </p>

            <div className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/70">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <span>{dateRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 md:col-span-7">
        <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-white/85 sm:text-base">
          {item.description.map((desc, i) => (
            <li
              key={i}
              className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-accent before:shadow-sm before:shadow-accent/50"
            >
              {desc}
            </li>
          ))}
        </ul>

        {item.technologies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {item.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
