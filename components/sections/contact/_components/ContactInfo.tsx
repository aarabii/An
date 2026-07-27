"use client";

import { Mail, MapPin } from "lucide-react";
import { profile } from "@/constant/profile";

export const ContactInfo = () => {
  const locationString = `${profile.education.location.city}, India`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationString)}`;

  return (
    <div className="flex flex-row items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm text-neutral-300 font-medium flex-wrap">
      <a
        href={`mailto:${profile.email}`}
        className="flex items-center gap-2 text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-colors group shrink-0"
      >
        <Mail className="size-4 text-accent group-hover:scale-110 transition-transform shrink-0" />
        <span>{profile.email}</span>
      </a>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-colors group shrink-0"
      >
        <MapPin className="size-4 text-accent group-hover:scale-110 transition-transform shrink-0" />
        <span>{locationString}</span>
      </a>
    </div>
  );
};


