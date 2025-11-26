"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experienceData } from "@/constant";
import { ExperienceCard } from "../Cards";
import { nasalization } from "@/app/fonts";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="experience"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}



      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold text-primary`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="text-xs text-muted-foreground max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My professional journey and key experiences
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"
            style={{ height: `${experienceData.length * 200}px` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${index}`}
                role={exp.role}
                year={exp.year}
                description={exp.description}
                company={exp.company}
                technologies={exp.technologies}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
