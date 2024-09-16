"use client";

import { motion } from "framer-motion";

import { EXPERIENCE_DATA } from "@/constant/experience";

import { Title } from "../ui/Title";
import { ExperienceCard } from "../ui/card/ExperienceCard";

export const Experience = () => {
  return (
    <section id="experience">
      <Title title="Experience" />

      <div>
        {EXPERIENCE_DATA.map((exp, index) => (
          <ExperienceCard
            key={index}
            role={exp.role}
            year={exp.year}
            description={exp.description}
            company={exp.company}
            technologies={exp.technologies}
            url={exp?.url}
          />
        ))}
      </div>
    </section>
  );
};
