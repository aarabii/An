"use client";

import Link from "next/link";
import { mono } from "@/app/fonts";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

export const CopyrightBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-4 rounded-md border border-border/60 bg-card/30 px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <span className={cn(mono.className, "text-[11px] sm:text-xs text-muted-foreground")}>
        © {currentYear} {profile.name.full}. MIT License — Free for personal use with attribution.
      </span>
      <div className={cn(mono.className, "flex items-center gap-4 text-[11px] sm:text-xs text-muted-foreground")}>
        <Link href="/license" className="hover:text-foreground hover:underline transition-colors">
          LICENSE
        </Link>
        <span>|</span>
        <span>DESIGNED & DEVELOPED BY {profile.name.first.toUpperCase()}</span>
      </div>
    </div>
  );
};
