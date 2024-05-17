import React from "react";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";

export const Main = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-300">
      <div className="top-0 fixed -z-10 h-full w-full">
        {/* This is the background*/}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="mx-auto container px-8">
        <Navbar />
        <Hero />
        <About />
        {/* will add the skills section later as it look ugly */}
        {/* <Skills /> */}
        <Experience />
        <Projects />
      </div>
    </div>
  );
};
