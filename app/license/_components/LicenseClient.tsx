"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

import { Footer, Navbar } from "@/components/common";
import { LicenseContactBanner } from "./LicenseContactBanner";
import { LicenseHeader } from "./LicenseHeader";
import { HUMAN_LICENSE_SUMMARY, RAW_LICENSE_TEXT } from "./license-data";

export default function LicenseClient() {
  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above global background canvas/shader */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full space-y-12">
          <LicenseHeader />

          {/* Human-Readable TL;DR Summary Card ("The Deal") */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[28px] border border-border bg-card p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="border-b border-border pb-3">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                // The Deal (TL;DR Summary)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              {/* Allowed Column */}
              <div className="p-5 rounded-2xl border border-success-border bg-success-bg flex flex-col gap-3">
                <div className="flex items-center gap-2 text-success-foreground font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{HUMAN_LICENSE_SUMMARY.allowed.title}</span>
                </div>
                <ul className="space-y-2 text-foreground/90 leading-relaxed">
                  {HUMAN_LICENSE_SUMMARY.allowed.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-success font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prohibited Column */}
              <div className="p-5 rounded-2xl border border-error-border bg-error-bg flex flex-col gap-3">
                <div className="flex items-center gap-2 text-error-foreground font-bold uppercase tracking-wider">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{HUMAN_LICENSE_SUMMARY.prohibited.title}</span>
                </div>
                <ul className="space-y-2 text-foreground/90 leading-relaxed">
                  {HUMAN_LICENSE_SUMMARY.prohibited.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-error font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terms Column */}
              <div className="p-5 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{HUMAN_LICENSE_SUMMARY.terms.title}</span>
                </div>
                <ul className="space-y-2 text-foreground/90 leading-relaxed">
                  {HUMAN_LICENSE_SUMMARY.terms.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Official Raw Markdown License Document */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-[28px] border border-border bg-card p-6 sm:p-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                // Official License Text (LICENSE)
              </h2>
              <span className="font-mono text-[11px] text-muted-foreground">
                Plain Markdown
              </span>
            </div>

            <pre className="p-5 rounded-2xl bg-muted/80 border border-border font-mono text-xs text-foreground/90 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {RAW_LICENSE_TEXT}
            </pre>
          </motion.section>

          {/* Contact & Commercial Exception Banner */}
          <LicenseContactBanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}
