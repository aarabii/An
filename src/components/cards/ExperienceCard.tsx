"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaCode } from "react-icons/fa6";
import { type ExperienceItem } from "@/constant";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  item: ExperienceItem;
  defaultOpen?: boolean;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  item,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("relative pl-9 sm:pl-11", className)}>
      {/* Left timeline rail: Node + connector line + branch elbow */}
      <div className="absolute left-0 top-0 bottom-3 flex w-7 sm:w-8 flex-col items-center pointer-events-none select-none">
        {/* Node Box with FaCode */}
        <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-2xs">
          <FaCode className="size-3.5 sm:size-4 text-foreground/80" />
        </div>
        {/* Vertical connecting line */}
        <div className="my-1.5 w-px flex-1 bg-border/70" />
        {/* Elbow turning towards stack badges */}
        <div className="h-4 w-3.5 sm:w-4 self-end rounded-bl border-b border-l border-border/70" />
      </div>

      {/* Right main column */}
      <div className="flex flex-col gap-3">
        {/* Clickable Experience Card */}
        <Card
          data-state={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls={`exp-content-${item.id}`}
          className={cn(
            "group cursor-pointer rounded-xl border border-border bg-card/60 p-5 sm:p-6 transition-all duration-200 select-none ring-0 ring-transparent gap-0",
            "hover:border-foreground/25 hover:bg-card/90 active:scale-[0.998]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          {/* Header: Role / Company title + Chevron */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground tracking-tight">
                {item.title}
              </h3>
              <span className="font-heading text-sm sm:text-base font-normal text-muted-foreground">
                /{" "}
                {item.company.url ? (
                  <a
                    href={item.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    {item.company.name}
                  </a>
                ) : (
                  item.company.name
                )}
              </span>
            </div>

            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 group-hover:text-foreground">
              <ChevronDown className="size-4 sm:size-5" />
            </div>
          </div>

          {/* Subtitle: Experience Type + Date Range */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 text-xs sm:text-sm text-muted-foreground font-para">
            <span className="capitalize">{item.type}</span>
            <span className="text-border select-none">•</span>
            <span>
              {item.startDate.month} {item.startDate.year} –{" "}
              {item.present
                ? "Present"
                : `${item.endDate?.month} ${item.endDate?.year}`}
            </span>
          </div>

          {/* Expandable Responsibilities */}
          <div
            id={`exp-content-${item.id}`}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
              isOpen
                ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-border/40"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <ul className="space-y-2.5 text-sm sm:text-base font-para text-primary/80 leading-relaxed">
                {item.responsibilities.map((res, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Tech Stack Badges (outside clickable card) */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5 pl-1">
          {item.stack.map((tech, index) => (
            <Badge
              key={`${item.id}-stack-${index}`}
              variant="outline"
              className="rounded-md border-border/70 bg-card/60 px-2.5 py-0.5 text-xs font-mono font-normal text-muted-foreground hover:border-border hover:text-foreground transition-colors cursor-default select-none"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
