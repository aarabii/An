"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { Techclip } from "../Techclip";

interface ExperienceCardProps {
  key: number;
  role: string;
  year: string;
  description: string;
  company: string;
  technologies: string[];
  url?: string;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  key,
  role,
  year,
  description,
  company,
  technologies,
  url,
}) => {
  return (
    <div key={key} className="mb-8 flex flex-wrap lg:justify-center">
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/4"
      >
        <p className="mb-2 text-base tracking-wider text-purple-200">{year}</p>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
        className="w-full max-w-xl lg:w-3/4"
      >
        <h6 className="mb-2 font-bold text-lg">
          {role} -{" "}
          <span
            className={`text-sm text-purple-200 ${
              url ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {company}
          </span>
        </h6>
        <p className="mb-4 text-slate-400">{description}</p>
        {technologies.map((tec, index) => (
          <Techclip key={index} name={tec} />
        ))}
      </motion.div>
    </div>
  );
};
