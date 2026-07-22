"use client";

import { serif } from "@/app/fonts";
import { GradientBackground } from "./_components/GradientBg";
import { profile } from "@/constant";
import { RotatingTextHero } from "./_components/RotatingTextHero";
import { ActionBtn } from "./_components/ActionBtn";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen w-full items-center justify-center bg-transparent select-none text-white overflow-hidden"
    >
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Hero Main Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center gap-8 max-w-4xl mx-auto px-6 py-20 min-h-screen">
          <h1
            className={`${serif.className} text-white text-center text-balance font-normal tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-md`}
          >
            {profile.name.full}
          </h1>
          <ActionBtn />
        </section>

        {/* Rotating Text - Positioned at Bottom Right */}
        <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-20 pointer-events-none">
          <RotatingTextHero
            constant_word={profile.hero_titles.constant_word}
            rotating_words={profile.hero_titles.rotating_words}
          />
        </div>
      </main>
    </section>
  );
};
