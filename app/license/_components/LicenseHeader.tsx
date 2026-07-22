"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Check, Copy, Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { heading } from "@/app/fonts";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";
import { RAW_LICENSE_TEXT } from "./license-data";

export const LicenseHeader = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_LICENSE_TEXT);
    setCopied(true);
    toast.success("License text copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([RAW_LICENSE_TEXT], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "LICENSE";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("LICENSE file downloaded!");
  };

  return (
    <header className="space-y-8">
      {/* Top Navigation & Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-sm hover:border-accent/40"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-accent" />
                <span>Copy License</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border border-border/60 bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </motion.div>

      {/* Main Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-3xl border border-border/60 bg-card/50 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-[11px] uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Custom Portfolio License
            </span>
          </div>

          <h1
            className={cn(
              heading.className,
              "text-3xl sm:text-5xl uppercase tracking-wider text-primary font-bold"
            )}
          >
            Terms & Licensing
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            This repository and its codebase are authored by{" "}
            <strong className="text-foreground font-semibold">
              {profile.name.full}
            </strong>
            . It is free for personal portfolio use with attribution, while
            strictly prohibiting commercial resale or derivative template sales.
          </p>

          {/* Quick Stats Grid */}
          <div className="pt-5 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span className="block text-[10px] uppercase text-accent/80 font-semibold mb-0.5">
                Author
              </span>
              <span className="text-foreground font-semibold">
                {profile.name.full}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-accent/80 font-semibold mb-0.5">
                License Type
              </span>
              <span className="text-foreground font-semibold">
                Personal / Non-Commercial
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-accent/80 font-semibold mb-0.5">
                Commercial Resale
              </span>
              <span className="text-rose-400 font-semibold">Prohibited</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-accent/80 font-semibold mb-0.5">
                Attribution
              </span>
              <span className="text-emerald-400 font-semibold">
                LICENSE File Required
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
