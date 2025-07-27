"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Menu, X } from "lucide-react";

import { quentin } from "@/app/fonts";

import { Button } from "../ui/button";
import { createBlurDataURL } from "@/lib/BlurDataURL";
import { selfData } from "@/constant/self";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 100);

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out border-primary/30 ${
        isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-2"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className={`floating-nav rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 max-w-7xl mx-auto ${
          isScrolled ? "shadow-xl" : "shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet to-fuchsia flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={40}
                height={40}
                placeholder="blur"
                loading="lazy"
                quality={100}
                blurDataURL={`${createBlurDataURL({
                  width: 40,
                  height: 40,
                })}`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <span
              className={`${quentin.className} text-primary-foreground text-xl sm:text-base`}
            >
              {selfData.name}
            </span>
          </Link>

          <div className="hidden sm:block">
            <Button
              variant="outline"
              asChild
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Link href="/resume">Resume</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X size={20} className="transition-transform duration-200" />
            ) : (
              <Menu size={20} className="transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 border-t border-border/50 mt-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Link
                  href="/resume"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center"
                >
                  Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
