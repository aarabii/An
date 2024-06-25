"use client";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

import useScrollDirection from "@/hooks/useScrollDirection";
import { ResumeRender } from "@/components/sections/ResumeRender";

export default function Resume() {
  const router = useRouter();
  const scrollDirection = useScrollDirection();

  const [isTop, setIsTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(top >= 0 && top <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const resumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/resume.pdf";
    link.download = "Aarab_Nishchal's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <Navbar
          btnText="Download"
          btnFnc={resumeDownload}
          className={`fixed top-0 w-full transition-transform duration-300 z-50 ${
            scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          } ${isTop ? "" : "border-b border-slate-300"}`}
        />
        <main className="flex-grow pt-[6rem] overflow-y-auto relative">
          <div className="fixed inset-0 -z-10 bg-slate-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] mask-image[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>
          <div className="container mx-auto flex flex-col items-center justify-center w-screen">
            <ResumeRender />
          </div>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
