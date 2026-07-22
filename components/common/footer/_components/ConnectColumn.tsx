"use client";

import Link from "next/link";
import { mono } from "@/app/fonts";
import { cn } from "@/lib/utils";

export const ConnectColumn = () => {
  return (
    <div className="w-full flex flex-col justify-between space-y-4">
      <div>
        <span
          className={cn(
            mono.className,
            "text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block",
          )}
        >
          LET&apos;S CONNECT ✦
        </span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I&apos;m always open to discussing new projects, creative ideas or
          opportunities to be part of your visions.
        </p>
      </div>
      <div>
        <Link
          href="/#contact"
          className={cn(
            mono.className,
            "text-xs font-medium uppercase tracking-wider text-foreground hover:underline inline-block pt-2",
          )}
        >
          SAY HELLO
        </Link>
      </div>
    </div>
  );
};
