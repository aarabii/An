"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";

import useScrollDirection from "@/hooks/useScrollDirection";

const ResumePageLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollDirection = useScrollDirection();
  const router = useRouter();

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

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex-1 flex flex-col">
        <Navbar
          btnText="Home"
          btnFnc={() => router.push("/")}
          className={`transition-transform duration-300 ${
            scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          } ${isTop ? "" : "border-b border-slate-300"}`}
        />
        <main>{children}</main>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
    </LazyMotion>
  );
};

export default ResumePageLayout;
