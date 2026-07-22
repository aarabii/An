"use client";

import { useState, useRef } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { profile } from "@/constant";
import { SectionHeader } from "@/components/common";

import { StatementCard, type SlideItem } from "./_components/StatementCard";
import { OriginCard } from "./_components/OriginCard";
import { EducationSlide } from "./_components/EducationSlide";
import { CodingStatsSlide } from "./_components/CodingStatsSlide";
import { QuoteSlide } from "./_components/QuoteSlide";

const DEFAULT_SLIDES: SlideItem[] = [
  profile.about[0],
  <EducationSlide key="edu" />,
  <CodingStatsSlide key="stats" />,
  <QuoteSlide key="quote" quote={profile.quote} />,
];

interface AboutSectionProps {
  slides?: SlideItem[];
  imageSrc?: string | string[];
}

export const AboutSection = ({
  slides = DEFAULT_SLIDES,
  imageSrc = "/images/me.png",
}: AboutSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = slides.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * totalItems), totalItems - 1);
    setActiveIndex(Math.max(0, index));
  });

  const handleSelectIndex = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = rect.height - window.innerHeight;
    const targetScroll =
      scrollTop + (index / totalItems) * Math.max(0, scrollHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      <section
        id="about"
        className="sticky top-20 w-full select-none px-6 py-12 md:px-12 lg:px-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeader number="02" title="About" align="left" />

          {/* Bento Grid — The Brief | Origin */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatementCard
              slides={slides}
              activeIndex={activeIndex}
              onSelectIndex={handleSelectIndex}
              index={0}
            />
            <OriginCard
              imageSrc={imageSrc}
              activeIndex={activeIndex}
              onSelectIndex={handleSelectIndex}
              index={1}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
