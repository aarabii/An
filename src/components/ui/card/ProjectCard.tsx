"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { FiGithub } from "react-icons/fi";

import { Techclip } from "../Techclip";
import { Meteors } from "../Meteors";

interface ProjectCardProps {
  title: string;
  desc: string;
  git: string;
  hostedAt: string;
  tech: string[];
}

export const ProjectCard: FC<ProjectCardProps> = ({
  title,
  desc,
  git,
  hostedAt,
  tech,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative rounded-lg border w-full max-w-sm mx-auto shadow-xl overflow-hidden"
    >
      <div className="relative p-6 bg-gray-900 bg-opacity-40 rounded-lg flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between pb-2">
          <h3 className="leading-none tracking-tight text-2xl cursor-pointer font-medium capitalize text-slate-100">
            <Link
              href={hostedAt}
              rel="noopener noreferrer"
              target="_blank"
              passHref
            >
              {title}
            </Link>
          </h3>
          <div className="flex flex-row gap-3">
            <Link href={git} rel="noopener noreferrer" target="_blank" passHref>
              <FiGithub className="h-5 w-5 text-slate-200" />
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <div className="text-sm text-slate-400">{desc}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tech.map((tech, index) => (
              <Techclip key={index} name={tech} />
            ))}
          </div>
        </div>
      </div>

      <Meteors number={5} className="opacity-30 -z-30" />
    </motion.div>
  );
};
