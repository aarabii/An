"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { RiMenu4Fill, RiCloseLargeFill } from "react-icons/ri";

import { quentine } from "@/app/fonts";

import { Button } from "../ui/button";
import { createBlurDataURL } from "@/lib/BlurDataURL";
import { selfData } from "@/constant";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Optimize state updates to avoid unnecessary re-renders
      if (currentScrollY > 100 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 100 && isScrolled) {
        setIsScrolled(false);
      }

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        if (!isVisible) setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (isVisible) {
          setIsVisible(false);
          setIsMenuOpen(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, isVisible]);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-2"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className={`floating-nav rounded-2xl px-4 sm:px-6 py-3 bg-glass-bg transition-all duration-300 max-w-7xl mx-auto ${
          isScrolled ? "shadow-xl" : "shadow-lg"
        }`}
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
              className={`${quentine.className} text-primary-foreground text-xl sm:text-base`}
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
              {isResumePage ? (
                <a href="/docs/Aarab_Nishchal_Resume.pdf" download="Aarab_Nishchal_Resume.pdf">
                  Download Resume
                </a>
              ) : (
                <Link href="/resume">
                  Resume
                </Link>
              )}
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <RiCloseLargeFill
                size={20}
                className="transition-transform duration-200"
              />
            ) : (
              <RiMenu4Fill
                size={20}
                className="transition-transform duration-200"
              />
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
                {isResumePage ? (
                  <a
                    href="/docs/Aarab_Nishchal_Resume.pdf"
                    download="Aarab_Nishchal_Resume.pdf"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center"
                  >
                    Download Resume
                  </a>
                ) : (
                  <Link
                    href="/resume"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center"
                  >
                    Resume
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
