"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import { SKILLS_DATA } from "@/constant/skills";

import { Title } from "../ui/Title";
import { SkillCard } from "../ui/card/SkillCard";

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

export const Skills = () => {
  const controls = useAnimation();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start("animate");
    }
  }, [isHovered, controls]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center py-16"
    >
      <Title title="Skills" />

      {/* When we dont want to use full view width for skills */}
      {/*<div className="relative overflow-hidden w-full max-w-screen-lg px-4"> */}
      <div className="">
        <motion.div
          ref={marqueeRef}
          variants={marqueeVariants}
          animate={controls}
          initial="animate"
          className="flex flex-row lg:py-8 py-4 space-x-4"
        >
          {SKILLS_DATA.concat(SKILLS_DATA).map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              icon={skill.icon}
              onHoverStart={handleMouseEnter}
              onHoverEnd={handleMouseLeave}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
