"use client";

import { motion } from "framer-motion";
import Resume from "@/components/sections/Resume";

export default function ResumePage() {
  return (
    <motion.div
      className="overflow-x-hidden text-slate-300 antialiased"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="top-0 fixed -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      {/* Add padding-top to account for navbar height */}
      <main className="m-auto container cursor-default select-none min-h-screen pt-24">
        <Resume />
      </main>
    </motion.div>
  );
}
