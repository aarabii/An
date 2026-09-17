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
        className="group -mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-4 rounded-md p-2 text-left transition-colors duration-150 cursor-pointer select-none hover:bg-muted/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
      >
        <span className="font-heading text-3xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground break-all">
          {email}
        </span>

        <div className="flex shrink-0 items-center gap-2 text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
          <span className="font-mono text-xs tracking-wider uppercase hidden sm:inline">
            {copied ? "Copied!" : "Copy"}
          </span>
          {copied ? (
            <Check className="size-5 sm:size-6 text-success" />
          ) : (
            <ArrowUpRight className="size-5 sm:size-6" />
          )}
        </div>
      </button>
    </div>
  );
};
