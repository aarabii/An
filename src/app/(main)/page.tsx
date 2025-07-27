import { Fragment } from "react";

import { Navbar, Footer } from "@/components/common";
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="top-0 fixed -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      {/* Content */}
      <Fragment>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </Fragment>
    </div>
  );
}
