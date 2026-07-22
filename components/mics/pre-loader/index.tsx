"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { serif } from "@/app/fonts";
import { profile } from "@/constant";

const SESSION_KEY = "preloader_shown_v1";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return true;
  return sessionStorage.getItem(SESSION_KEY) !== "true";
};
const getServerSnapshot = () => false;

export const PreLoader = () => {
  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const [hasEnded, setHasEnded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isVisible = shouldShow && !hasEnded;

  useEffect(() => {
    if (!isVisible) return;

    document.body.classList.add("preloader-active");
    document.body.style.overflow = "hidden";

    let timeElapsed = false;
    let pageReady = document.readyState === "complete";

    const finish = () => {
      if (timeElapsed && pageReady) {
        setHasEnded(true);
        document.body.classList.remove("preloader-active");
        document.body.style.overflow = "";
        if (process.env.NODE_ENV !== "development") {
          sessionStorage.setItem(SESSION_KEY, "true");
        }
      }
    };

    const timer = setTimeout(() => {
      timeElapsed = true;
      finish();
    }, 2000);

    const handleLoad = () => {
      pageReady = true;
      finish();
    };

    if (!pageReady) {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const firstY = shouldReduceMotion ? 0 : 40;
  const lastY = shouldReduceMotion ? 0 : -40;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-transparent select-none text-primary overflow-hidden w-full h-full pointer-events-auto"
        >
          <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden z-10">
            {/* Hero Main Content Matching Container */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center gap-8 max-w-4xl mx-auto px-6 py-20 min-h-screen">
              <h1
                className={`${serif.className} text-primary text-center text-balance font-normal tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-md flex flex-wrap items-center justify-center gap-x-[0.25em]`}
              >
                <motion.span
                  initial={{ y: firstY, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {profile.name.first}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-block text-primary/30 font-light px-1"
                >
                  /
                </motion.span>
                <motion.span
                  initial={{ y: lastY, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {profile.name.last}
                </motion.span>
              </h1>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
