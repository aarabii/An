"use client";

import { Main } from "@/layouts/Main";
import { Preloader } from "@/layouts/Preloader";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setIsLoaded(true);
    };

    simulateLoading();
  }, []);

  return <React.Fragment>{isLoaded ? <Main /> : <Preloader />}</React.Fragment>;
}
