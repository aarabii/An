"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Briefcase, Download, ExternalLink, GraduationCap, RefreshCw } from "lucide-react";

import { Footer, Navbar, SectionHeader } from "@/components/common";
import { experience, profile } from "@/constant";

const RESUME_PATH = "/docs/aarab_nishchal_resume.pdf";

export default function ResumeClient() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above background layer */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
          {/* Top Navigation & Return */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-sm hover:border-accent/40"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Portfolio</span>
            </Link>
          </motion.div>

          {/* Section Header */}
          <div className="pt-2">
            <SectionHeader as="h1" number="05" title="Resume & Experience" align="left" />
            <p className="text-xs sm:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed -mt-10">
              AI Engineer Intern & Full-Stack Developer specializing in Next.js, LLM integrations, and intelligent automation systems.
            </p>
          </div>

          {/* Semantic, Crawlable Executive Summary for Search Engines and Recruiters */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Resume Overview"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </div>
              <div className="space-y-4 font-mono text-xs text-muted-foreground">
                {experience.map((exp, i) => (
                  <div key={i} className="space-y-1 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-foreground font-semibold">
                      <span>{exp.role}</span>
                      <span className="text-accent text-[11px]">{exp.company}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                      {exp.description[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Key Stack</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-muted-foreground">
                <div>
                  <p className="text-foreground font-semibold">{profile.education.degree} in {profile.education.major}</p>
                  <p className="text-accent text-[11px]">{profile.education.uni} ({profile.education.batch})</p>
                </div>
                <div className="pt-2 border-t border-border/40 space-y-1.5">
                  <span className="text-foreground text-[11px] font-semibold block">Core Technologies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "React", "TypeScript", "Python", "LLMs", "AI Agents", "n8n", "PostgreSQL"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-muted text-[10px] border border-border text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40">
            <span className="font-mono text-xs text-muted-foreground">
              Official Document Preview (PDF)
            </span>

            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setKey((prev) => prev + 1)}
                className="p-2 rounded-xl border border-border/60 bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Reload PDF Viewer"
                aria-label="Reload PDF Viewer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl border border-border/60 bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">Open Fullscreen</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                href={RESUME_PATH}
                download="Aarab_Nishchal_Resume.pdf"
                className="inline-flex items-center gap-2 text-xs font-mono px-4.5 py-2 rounded-xl border border-accent/40 bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer shadow-md font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </motion.a>
            </div>
          </div>

          {/* PDF Viewer Container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-162 sm:h-225 rounded-3xl overflow-hidden border border-border/60 bg-black/60 shadow-2xl backdrop-blur-xl"
          >
            <object
              key={key}
              data={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full border-0"
              aria-label="Aarab Nishchal Resume PDF"
            >
              <iframe
                src={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title="Aarab Nishchal Resume PDF"
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-card/80">
                  <p className="text-sm text-muted-foreground">
                    Your browser does not support embedded PDF preview.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={RESUME_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold"
                    >
                      View PDF Fullscreen
                    </a>
                    <a
                      href={RESUME_PATH}
                      download="aarab_nishchal_resume.pdf"
                      className="px-4 py-2 rounded-xl border border-border text-foreground font-mono text-xs"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </iframe>
            </object>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
