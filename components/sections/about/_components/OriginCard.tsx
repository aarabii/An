"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { BentoCard } from "./BentoCard";
import { cn } from "@/lib/utils";

interface OriginCardProps {
  imageSrc: string | string[];
  activeIndex?: number;
  onSelectIndex?: (index: number) => void;
  index?: number;
}

export const OriginCard = ({
  imageSrc,
  activeIndex = 0,
  onSelectIndex,
  index = 0,
}: OriginCardProps) => {
  const images = Array.isArray(imageSrc) ? imageSrc : [imageSrc];
  const currentImgIndex = Math.min(activeIndex, images.length - 1);
  const currentImage = images[currentImgIndex] || images[0];

  return (
    <BentoCard className="flex flex-col p-0 overflow-hidden relative" index={index}>
      {/* Photo with scanline overlay + grayscale-to-color hover */}
      <div className="group relative aspect-square w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentImage}
              alt="Aarab Nishchal"
              fill
              className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
          }}
        />

        {/* Corner brackets on the image */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 z-10
            before:absolute before:top-0 before:left-0
            before:size-3 before:border-t before:border-l
            before:border-border/40
            after:absolute after:top-0 after:right-0
            after:size-3 after:border-t after:border-r
            after:border-border/40"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 z-10
            before:absolute before:bottom-0 before:left-0
            before:size-3 before:border-b before:border-l
            before:border-border/40
            after:absolute after:right-0 after:bottom-0
            after:size-3 after:border-r after:border-b
            after:border-border/40"
        />

        {/* Bottom dotted indicators for images */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 px-2.5 py-1 rounded-full bg-card/60 backdrop-blur-md border border-border/50">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelectIndex?.(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none",
                i === currentImgIndex
                  ? "bg-foreground scale-110"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60 cursor-pointer"
              )}
              title={`Image ${i + 1} of ${images.length}`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  );
};



