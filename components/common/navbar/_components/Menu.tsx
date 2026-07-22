"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu as MenuIcon, X, Download } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { socials } from "@/constant";

const RESUME_PATH = "/docs/aarab_nishchal_resume.pdf";

export interface MenuItem {
  label: string;
  link: string;
  ariaLabel?: string;
  isDownload?: boolean;
}

const SECTION_ITEMS: MenuItem[] = [
  { label: "Home", link: "/#hero" },
  { label: "About", link: "/#about" },
  { label: "Skills", link: "/#skills" },
  { label: "Experience", link: "/#experience" },
  { label: "Work", link: "/#work" },
  { label: "Contact", link: "/#contact" },
];

const BASE_PAGE_ITEMS: MenuItem[] = [
  { label: "Resume", link: "/resume" },
  { label: "Gallery", link: "/gallery" },
  { label: "Projects", link: "/projects" },
  { label: "Blog", link: "/blog" },
];

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSectionClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    setOpen(false);

    const targetId = link.replace("/#", "");

    if (pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.history.pushState(null, "", `#${targetId}`);
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const filteredPageItems: MenuItem[] = BASE_PAGE_ITEMS.reduce<MenuItem[]>(
    (acc, item) => {
      if (item.link === "/resume") {
        if (pathname === "/resume") {
          acc.push({
            label: "Download Resume",
            link: RESUME_PATH,
            isDownload: true,
          });
        } else {
          acc.push(item);
        }
      } else {
        if (pathname !== item.link) {
          acc.push(item);
        }
      }
      return acc;
    },
    [],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Navbar Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-primary/20 bg-glass-bg hover:border-accent/40 text-foreground transition-all duration-200 shadow-md backdrop-blur-md cursor-pointer group"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="text-xs sm:text-sm font-medium tracking-wide">
          {open ? "Close" : "Menu"}
        </span>
        {open ? (
          <X className="w-4 h-4 text-accent transition-transform duration-200 rotate-90" />
        ) : (
          <MenuIcon className="w-4 h-4 group-hover:text-accent transition-colors" />
        )}
      </button>

      {/* Sheet Content Side Drawer */}
      <SheetContent
        side="right"
        showCloseButton={false}
        className="z-999 border-l border-sidebar-border bg-sidebar/95 backdrop-blur-2xl text-sidebar-foreground w-full max-w-sm sm:max-w-md h-full flex flex-col p-0 gap-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Main navigation and section links</SheetDescription>
        </SheetHeader>

        {/* Sidebar Header */}
        <div className="flex flex-row items-center justify-between p-4 pt-16 sm:pt-6 border-b border-sidebar-border shrink-0">
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">
            Navigation
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-secondary hover:text-foreground hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-accent" />
          </button>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 gap-6 flex flex-col min-h-0">
          {/* Sections Group */}
          <div className="p-0 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-widest text-accent/80 uppercase font-semibold px-2 mb-1">
              Sections
            </span>
            <ul className="flex w-full min-w-0 flex-col gap-1">
              {SECTION_ITEMS.map((item, idx) => (
                <li key={item.label} className="group/menu-item relative">
                  <a
                    href={item.link}
                    onClick={(e) => handleSectionClick(e, item.link)}
                    className="h-auto py-2 px-3 hover:bg-sidebar-accent/10 hover:text-accent rounded-lg border border-transparent hover:border-accent/20 transition-all duration-200 group flex items-center justify-between"
                  >
                    <span className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-sidebar-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-200">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-accent/80 font-medium">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages Group */}
          {filteredPageItems.length > 0 && (
            <div className="p-0 pt-4 border-t border-sidebar-border flex flex-col gap-2">
              <span className="text-[11px] font-mono tracking-widest text-accent/80 uppercase font-semibold px-2 mb-1">
                Pages
              </span>
              <ul className="flex w-full min-w-0 flex-col gap-1">
                {filteredPageItems.map((item, idx) => (
                  <li key={item.label} className="group/menu-item relative">
                    {item.isDownload ? (
                      <a
                        href={item.link}
                        download="Aarab_Nishchal_Resume.pdf"
                        onClick={() => setOpen(false)}
                        className="h-auto py-2 px-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent rounded-xl transition-all duration-200 flex items-center justify-between"
                      >
                        <span className="text-base sm:text-xl font-semibold uppercase tracking-tight flex items-center gap-2">
                          <Download className="w-4 h-4 text-accent" />
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-accent">
                          {String(SECTION_ITEMS.length + idx + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={item.link}
                        onClick={() => setOpen(false)}
                        className="h-auto py-2 px-3 hover:bg-sidebar-accent/10 hover:text-accent rounded-lg border border-transparent hover:border-accent/20 transition-all duration-200 group flex items-center justify-between"
                      >
                        <span className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-sidebar-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-200">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-accent/80 font-medium">
                          {String(SECTION_ITEMS.length + idx + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 sm:p-6 border-t border-sidebar-border flex flex-col gap-2.5 shrink-0">
          <span className="text-[11px] font-mono tracking-widest text-accent/80 uppercase font-semibold px-1">
            Socials
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-2.5 py-1 text-xs font-medium text-secondary hover:text-accent transition-colors duration-200 group inline-block"
              >
                <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none" />

                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
