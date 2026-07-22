"use client";

import { socials } from "@/constant/social";

export const SocialLinks = () => {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs text-muted-foreground/40 lowercase">
        let&apos;s build something epic.
      </span>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 sm:gap-x-8">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {/* Corner brackets on hover */}
            <span className="absolute -top-1 -left-1 text-[10px] text-muted-foreground/0 group-hover:text-accent transition-colors">
              ┌
            </span>
            <span className="absolute -top-1 -right-1 text-[10px] text-muted-foreground/0 group-hover:text-accent transition-colors">
              ┐
            </span>
            <span className="absolute -bottom-1 -left-1 text-[10px] text-muted-foreground/0 group-hover:text-accent transition-colors">
              └
            </span>
            <span className="absolute -bottom-1 -right-1 text-[10px] text-muted-foreground/0 group-hover:text-accent transition-colors">
              ┘
            </span>

            <span className="text-muted-foreground/40 group-hover:text-accent transition-colors">
              •
            </span>
            <span className="lowercase">{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
