"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Preloader } from "@/components/common/Preloader";

import useScrollDirection from "@/hooks/useScrollDirection";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(true);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoaded(true);
    };

    simulateLoading();
  }, []);

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
      {isLoaded ? (
        <div className="flex-1 flex flex-col">
          <Navbar
            className={`transition-transform duration-300 ${
              scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
            } ${isTop ? "" : "border-b border-slate-300"}`}
          />
          <main>{children}</main>
          <Footer />
        </div>
      ) : (
        <Preloader />
      )}
    </LazyMotion>
  );
};

export default HomePageLayout;
