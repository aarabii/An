"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <nav
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-2",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div
        className={cn(
          "floating-nav rounded-2xl px-4 sm:px-6 py-3 bg-glass-bg transition-all duration-300 max-w-7xl mx-auto border border-primary/10",
          isScrolled ? "shadow-xl" : "shadow-lg"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-glass-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
                quality={100}
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className={cn(mono.className, "text-primary text-lg")}>
              {profile.name.first}.
            </span>
          </Link>

          <div>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};
