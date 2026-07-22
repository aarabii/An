"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { RAW_LICENSE_TEXT } from "./license-data";

export const LicenseCodeTab = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_LICENSE_TEXT);
    setCopied(true);
    toast.success("License text copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-border/60 bg-black/90 backdrop-blur-xl p-4 sm:p-6 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">
            LICENSE (Plain Markdown Text)
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-muted/60 border border-border/60 hover:bg-muted text-accent transition-colors cursor-pointer active:scale-95"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied" : "Copy Raw"}</span>
        </button>
      </div>

      <pre className="p-4 rounded-xl bg-card/60 border border-border/40 text-xs font-mono text-emerald-400/90 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
        {RAW_LICENSE_TEXT}
      </pre>
    </motion.div>
  );
};
