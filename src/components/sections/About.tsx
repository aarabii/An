"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { nasalization } from "@/app/fonts";
import { MapPin } from "lucide-react";
import { selfData } from "@/constant/self";
import Link from "next/link";

export const About = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-72 h-72 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={"/images/me.png"}
                alt="Profile Picture"
                width={288}
                height={288}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className={`${nasalization.className} text-4xl font-bold text-primary`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="space-y-4 text-primary-foreground/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {selfData.about.map((paragraph, index) => (
                <p key={index} className="text-sm">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`https://www.google.com/maps/place/${selfData.current_location.city}+${selfData.current_location.state}+${selfData.current_location.country}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {selfData.current_location.city},{" "}
                  {selfData.current_location.state}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
