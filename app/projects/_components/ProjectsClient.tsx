"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import { Footer, Navbar } from "@/components/common";
import { WorkCard } from "@/components/sections/work/_components/WorkCard";
import { selected_works, works } from "@/constant/projects";
import { heading } from "@/app/fonts";
import { cn } from "@/lib/utils";
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
        <main className="flex-1 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
          <ProjectsHeader totalFeaturedCount={allProjects.length} />

          {/* Section 1: Featured Selected Works & Projects */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border/40 pb-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2
                className={cn(
                  heading.className,
                  "text-xl sm:text-2xl uppercase tracking-wider text-primary font-bold"
                )}
              >
                Featured Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allProjects.map((project, idx) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
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

          {/* Section 2: Live GitHub Repositories (Excluding featured projects) */}
          <GithubSection constantProjects={allProjects} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
