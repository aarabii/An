"use client";

import React from "react";
import { motion } from "motion/react";

import { Footer, Navbar } from "@/components/common";
import { WorkCard } from "@/components/sections/work/_components/WorkCard";
import { selected_works, works } from "@/constant/projects";
import { GithubSection } from "./GithubSection";
import { ProjectsHeader } from "./ProjectsHeader";

export default function ProjectsClient() {
  // Combine both arrays from constant/projects.ts
  const allProjects = [...selected_works, ...works];

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above global background canvas/shader */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full space-y-16">
          <ProjectsHeader />

          {/* Section 1: Featured Selected Works & Projects */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
                // Featured Projects ({allProjects.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {allProjects.map((project, idx) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <WorkCard
                    name={project.name}
                    description={project.description}
                    technologies={project.technologies}
                    links={project.links}
                    index={idx}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 2: Live GitHub Repositories */}
          <GithubSection constantProjects={allProjects} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

