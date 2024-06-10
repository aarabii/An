"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { Main } from "@/layouts/Main";
import { Preloader } from "@/layouts/Preloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoaded(true);
    };

    simulateLoading();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {isLoaded ? (
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main>
            <Main />
          </main>
        </div>
      ) : (
        <Preloader />
      )}
    </LazyMotion>
  );
}
