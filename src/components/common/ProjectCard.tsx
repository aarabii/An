import { FC } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import { TechClip } from "./TechClip";
import { FiExternalLink, FiGithub } from "react-icons/fi";

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
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.1,
      }}
      className="rounded-lg border bg-card text-card-foreground w-full max-w-sm mx-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-gray-100 shadow-[inset_0px_0px_5px_0px_#e2e8f0]"
    >
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="leading-none tracking-tight text-2xl font-medium capitalize">
          {title}
        </h3>
        <div className="flex flex-row gap-3">
          <Link
            href={hostedAt}
            rel="noopener noreferrer"
            target="_blank"
            passHref
          >
            <FiExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link href={git} rel="noopener noreferrer" target="_blank" passHref>
            <FiGithub className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-sm">{desc}</div>
        <p className="text-muted-foreground">
          {tech.map((tech, index) => (
            <TechClip key={index} name={tech} />
          ))}
        </p>
      </div>
    </motion.div>
  );
};
