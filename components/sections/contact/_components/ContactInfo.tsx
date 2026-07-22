"use client";

import { Mail, MapPin } from "lucide-react";
import { profile } from "@/constant/profile";

export const ContactInfo = () => {
  const locationString = `${profile.education.location.city}, India`;

  return (
    <div className="flex flex-row items-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm text-white/85 font-medium flex-wrap">
      <a
        href={`mailto:${profile.email}`}
        className="flex items-center gap-2 hover:text-white transition-colors group shrink-0"
      >
        <Mail className="size-4 text-accent group-hover:text-accent transition-colors shrink-0" />
        <span>{profile.email}</span>
      </a>

      <div className="flex items-center gap-2 hover:text-white transition-colors group shrink-0">
        <MapPin className="size-4 text-accent group-hover:text-accent transition-colors shrink-0" />
        <span>{locationString}</span>
      </div>
    </div>
  );
};
