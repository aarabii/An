"use client";

import { Main } from "@/pages/Main";
import { Preloader } from "@/pages/Preloader";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoaded(true);
    };

    simulateLoading();
  }, []);

  return <React.Fragment>{isLoaded ? <Main /> : <Preloader />}</React.Fragment>;
}
