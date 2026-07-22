"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Ban,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Info,
  Lock,
  Scale,
  UserCheck,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { FAQS, LicenseSection } from "./license-data";

interface LicenseOverviewTabProps {
  sections: LicenseSection[];
}

export const LicenseOverviewTab: React.FC<LicenseOverviewTabProps> = ({
  sections,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {/* 3 Visual Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Allowed Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 backdrop-blur-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-500/50 transition-colors shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Allowed
              </h3>
              <span className="text-[11px] font-mono text-emerald-400/70">
                Personal & Portfolio Use
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-muted-foreground font-mono">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Clone & fork repository</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Customize styling & components</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Deploy on your custom domain</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use for learning & experimentation</span>
            </li>
          </ul>
        </div>

        {/* Prohibited Card */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/15 backdrop-blur-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-rose-500/50 transition-colors shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-rose-400 uppercase tracking-wider">
                Prohibited
              </h3>
              <span className="text-[11px] font-mono text-rose-400/70">
                Resale & Paid Deliverables
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-muted-foreground font-mono">
            <li className="flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Reselling as template/starter kit</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Selling as client deliverable for cash</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Removing copyright notice/LICENSE</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Claiming original core authorship</span>
            </li>
          </ul>
        </div>

        {/* Conditions Card */}
        <div className="rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-accent/50 transition-colors shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-accent uppercase tracking-wider">
                Conditions
              </h3>
              <span className="text-[11px] font-mono text-accent/70">
                Attribution & Personal Data
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-muted-foreground font-mono">
            <li className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>Keep LICENSE file in repository</span>
            </li>
            <li className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>Live site credit is optional</span>
            </li>
            <li className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>Replace personal bio & photo assets</span>
            </li>
            <li className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>No trademark rights to author name</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Accordion License Articles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest font-semibold flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>License Articles & Breakdown</span>
          </h2>
          <span className="font-mono text-[11px] text-muted-foreground">
            {sections.length} Articles Listed
          </span>
        </div>

        {sections.map((sec) => {
          const isExpanded = expandedSection === sec.id;
          return (
            <div
              key={sec.id}
              className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-border/90 shadow-md"
            >
              <button
                onClick={() =>
                  setExpandedSection(isExpanded ? null : sec.id)
                }
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent font-bold px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
                    {sec.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                      {sec.title}
                      {sec.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-semibold",
                            sec.badgeType === "success"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          )}
                        >
                          {sec.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
                    isExpanded && "rotate-180 text-accent"
                  )}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/40 p-5 sm:p-6 bg-card/30 space-y-4"
                  >
                    {sec.items && (
                      <div className="grid grid-cols-1 gap-3 font-mono text-xs">
                        {sec.items.map((item) => (
                          <div
                            key={item.term}
                            className="p-3.5 rounded-xl border border-border/40 bg-muted/40"
                          >
                            <strong className="text-accent font-semibold block mb-1">
                              "{item.term}"
                            </strong>
                            <span className="text-muted-foreground">
                              {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.points && (
                      <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
                        {sec.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-accent font-bold mt-0.5">
                              •
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.examples && (
                      <div className="mt-4 pt-4 border-t border-border/40 space-y-2">
                        <span className="text-[11px] font-mono uppercase text-accent font-semibold block">
                          Real-World Examples:
                        </span>
                        {sec.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="text-xs font-mono p-3 rounded-xl bg-muted/40 border border-border/30 text-muted-foreground"
                          >
                            💡 {ex}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-6 border-t border-border/40 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent" />
          <h2 className="font-mono text-sm text-foreground uppercase tracking-wider font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl flex flex-col gap-2 shadow-sm"
            >
              <h3 className="text-xs sm:text-sm font-semibold font-mono text-accent flex items-start gap-2">
                <span className="text-muted-foreground font-normal">Q:</span>
                {faq.q}
              </h3>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
