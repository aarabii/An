import React from "react";
import { motion } from "framer-motion";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

import { Footer } from "./Footer";

export const Main = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-x-hidden text-slate-300 antialiased selection:bg-cyan-300 selection:text-cyan-300"
    >
      <div className="top-0 fixed -z-10 h-full w-full">
        {/* This is the background*/}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <motion.div className="mx-auto container px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </motion.div>

      <Footer />
    </motion.div>
  );
};
