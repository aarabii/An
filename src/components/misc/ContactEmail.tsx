"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { PERSONAL_INFO } from "@/constant";

export const ContactEmail = () => {
  const [copied, setCopied] = useState(false);
  const email = PERSONAL_INFO.contact_email;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Direct Inbox
      </span>

      {/* Full-width email bar with copy action */}
      <button
        type="button"
        onClick={handleCopy}
        className="group -mx-2 flex w-[calc(100%+1rem)] items-center justify-between rounded-lg p-2 text-left transition-all duration-200 cursor-pointer select-none hover:bg-muted/40 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
      >
        <span className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-muted-foreground">
          {email}
        </span>

        <div className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="font-mono text-xs tracking-wider uppercase hidden sm:inline">
            {copied ? "Copied!" : "Copy"}
          </span>
          {copied ? (
            <Check className="size-5 sm:size-7 text-emerald-400" />
          ) : (
            <ArrowUpRight className="size-5 sm:size-7 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </div>
      </button>
    </div>
  );
};
