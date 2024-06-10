"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import { Navbar } from "@/layouts/Navbar";
import { Main } from "@/layouts/Main";
import { Preloader } from "@/layouts/Preloader";

import useScrollDirection from "@/util/hook/useScrollDirection";

const Home: React.FC = () => {
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
          <main>
            <Main />
          </main>
        </div>
      ) : (
        <Preloader />
      )}
    </LazyMotion>
  );
};

export default Home;
