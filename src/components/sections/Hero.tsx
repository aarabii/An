"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { selfData } from "@/constant/self";

import { quentin, mono } from "@/app/fonts";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-start px-6 relative overflow-hidden">
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/10 blur-xl"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-violet/10 blur-xl"
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          className="max-w-4xl space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.h1
              className={`${quentin.className} text-6xl md:text-8xl font-bold text-primary`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {selfData.name}
            </motion.h1>
            <motion.p
              className={`${mono.className} text-lg  md:text-md text-secondry-foreground`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {selfData.roles[0]}
            </motion.p>
            <motion.p
              className="text-lg text-primary-foreground/80 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {selfData.bio}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 relative group overflow-hidden"
            >
              <Link href="/resume">
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Resume</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
