"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/common";
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
    <header className="space-y-6">
      {/* Top Navigation & Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border bg-card/80 backdrop-blur-xl hover:border-card-border-hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border border-accent/30 bg-accent/10 hover:bg-accent/20 text-accent transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy LICENSE</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border border-border bg-card hover:bg-card-hover text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </motion.div>

      {/* Section Header with Main Page Numbering & Styling */}
      <div className="pt-4">
        <SectionHeader number="07" title="License & Terms" align="left" />
        <p className="text-xs sm:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed -mt-10">
          You can clone this, fork it, and build your own portfolio with it. Just don&apos;t
          package it up to sell as a template or pretend you wrote the whole thing from scratch.
        </p>
      </div>
    </header>
  );
};
