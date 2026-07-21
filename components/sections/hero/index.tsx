"use client";

import { profile } from "@/constant";

import { HeroName } from "./_components/HeroName";
import { HeroRole } from "./_components/HeroRole";
import { HeroQuote } from "./_components/HeroQuote";
import { HeroActions } from "./_components/HeroActions";

export const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden px-6 select-none md:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-start w-full">
          <HeroName
            firstName={profile.name.first}
            lastName={profile.name.last}
          />

          <HeroRole
            constantWord={profile.hero_titles.constant_word}
            rotatingWords={profile.hero_titles.rotating_word}
          />

          <HeroQuote quote={profile.quote} />

          <HeroActions onContactClick={scrollToContact} />
        </div>
      </div>
    </section>
  );
};
