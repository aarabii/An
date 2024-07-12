"use client";

import { motion } from "framer-motion";

import SkillLogos from "@/constant/skillLogos";

import { Title } from "../ui/Title";
import { SkillCard } from "../ui/card/SkillCard";

export const Skills = () => {
  return (
    <section id="skills" className="py-16 overflow-hidden relative">
      <div className="container mx-auto">
        <Title title="Skills" />

        <div className="mt-9 relative">
          <motion.div
            className="flex gap-8"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...SkillLogos, ...SkillLogos].map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.title}
                Icon={skill.logoComponent}
                className="lg:pr-16 md:pr-8 sm:pr-4 pr-2"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
