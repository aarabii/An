"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Download, ExternalLink, RefreshCw } from "lucide-react";

import { Footer, Navbar } from "@/components/common";

const RESUME_PATH = "/docs/aarab_nishchal_resume.pdf";

export default function ResumeClient() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above background layer */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-sm hover:border-accent/40"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Portfolio</span>
            </Link>

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
          </motion.div>

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
