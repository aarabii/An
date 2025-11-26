"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { nasalization } from "@/app/fonts";

import { ProjectCard } from "../Cards";
import { projectsData } from "@/constant/";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="project"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto px-4 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold text-primary`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Projects
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projectsData.map((proj, index) => (
            <ProjectCard
              key={proj.name}
              index={index}
              title={proj.name}
              desc={proj.description}
              github={proj.github_link}
              demo={proj.demo}
              tech={proj.tech}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
