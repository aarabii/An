"use client";

import { type Experience } from "@/constant";
import { ExperienceItem } from "./ExperienceItem";

interface ExperienceListProps {
  items: Experience[];
}

export const ExperienceList = ({ items }: ExperienceListProps) => {
  return (
    <div className="flex w-full flex-col">
      {items.map((item, index) => (
        <ExperienceItem
          key={`${item.company}-${index}`}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
};
