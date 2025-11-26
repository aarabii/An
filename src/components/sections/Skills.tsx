"use client";

import { motion } from "motion/react";
import React, { useRef, useEffect, useState, FC } from "react";

import { nasalization } from "@/app/fonts";
import { skillsData } from "@/constant";
import { SkillCard } from "@/components/Cards";

interface LogoProps {
  title: string;
  logoComponent: React.FC;
  color: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

interface MarqueeProps {
  skills: LogoProps[];
  direction: "left" | "right";
}

const Marquee: FC<MarqueeProps> = ({ skills, direction }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    const measureWidth = () => {
      if (marqueeRef.current) {
        setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
      }
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);

    return () => window.removeEventListener("resize", measureWidth);
  }, [skills]);

  const speedFactor = 50;
  const animationDuration = marqueeWidth > 0 ? marqueeWidth / speedFactor : 0;

  const animateX =
    direction === "right" ? [0, -marqueeWidth] : [-marqueeWidth, 0];

  return (
    <div className="my-2">
      <div className="relative overflow-hidden py-2">
        <motion.div
          ref={marqueeRef}
          className="flex flex-row gap-8 whitespace-nowrap"
          animate={marqueeWidth > 0 ? { x: animateX } : {}}
          transition={{
            repeat: Infinity,
            duration: animationDuration,
            ease: "linear",
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <SkillCard
              key={`${skill.title}-${index}`}
              title={skill.title}
              color={skill.color || "#ffffff"}
              Icon={skill.logoComponent}
              className="lg:pr-16 md:pr-8 sm:pr-4 pr-2 flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-16 overflow-hidden relative">


      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8">
          <motion.h2
            className={`${nasalization.className} text-4xl font-bold text-primary`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            My Skills
          </motion.h2>
        </div>

        {(skillsData as SkillsDataProps[]).map((category, index) => {
          let direction: "left" | "right";

          if (index % 2 === 0) {
            direction = "right";
          } else {
            direction = "left";
          }

          return (
            <Marquee
              key={category.title}
              skills={category.data}
              direction={direction}
            />
          );
        })}
      </div>
    </section>
  );
};
