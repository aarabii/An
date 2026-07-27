"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { mono } from "@/app/fonts";
import { Menu } from "./_components/Menu";
import { profile } from "@/constant";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const SCROLL_THRESHOLD = 10;
    const HIDE_DELTA = 5;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (Math.abs(delta) > HIDE_DELTA) {
        setIsVisible(delta < 0);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out pointer-events-auto",
        isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-2"
      )}
    >
      <div
        className={cn(
          "floating-nav rounded-2xl px-4 sm:px-6 py-3 bg-glass-bg backdrop-blur-md transition-all duration-300 max-w-7xl mx-auto border border-primary/10",
          isScrolled ? "shadow-xl border-primary/20 bg-black/60" : "shadow-lg"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-glass-bg flex items-center justify-center transition-transform duration-200"
            >
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
                quality={100}
                style={{ objectFit: "cover" }}
              />
            </motion.div>
            <span className={cn(mono.className, "text-primary text-lg font-medium")}>
              {profile.name.first}.
            </span>
          </Link>

          <div>
            <Menu />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
