"use client";

import { mono } from "@/app/fonts";
import { profile, socials } from "@/constant";
import { cn } from "@/lib/utils";

export const SocialColumn = () => {
  return (
    <div className="w-full flex flex-col justify-start space-y-3">
      <span
        className={cn(
          mono.className,
          "text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1"
        )}
      >
        SOCIAL
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground hover:underline transition-colors uppercase"
          >
            {social.name}
          </a>
        ))}
        <a
          href={`mailto:${profile.email}`}
          className="hover:text-foreground hover:underline transition-colors uppercase"
        >
          EMAIL
        </a>
      </div>
    </div>
  );
};
