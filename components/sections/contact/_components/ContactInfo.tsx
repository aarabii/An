"use client";

import { Mail, MapPin } from "lucide-react";
import { profile } from "@/constant/profile";

export const ContactInfo = () => {
  const locationString = `${profile.education.location.city}, India`;

  return (
    <div className="flex flex-row items-center gap-4 sm:gap-8 font-mono text-xs text-muted-foreground/80 flex-wrap">
      <a
        href={`mailto:${profile.email}`}
        className="flex items-center gap-2 hover:text-foreground transition-colors group shrink-0"
      >
        <Mail className="size-3.5 text-accent/80 group-hover:text-accent transition-colors shrink-0" />
        <span>{profile.email}</span>
      </a>

      <div className="flex items-center gap-2 hover:text-foreground transition-colors group shrink-0">
        <MapPin className="size-3.5 text-accent/80 group-hover:text-accent transition-colors shrink-0" />
        <span>{locationString}</span>
      </div>
    </div>
  );
};
