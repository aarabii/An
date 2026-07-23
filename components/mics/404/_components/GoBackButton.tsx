"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export const GoBackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-sm font-medium text-foreground transition-all hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <FaArrowLeft className="size-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
        <span>Go Back</span>
      </button>
    </div>
  );
};
