"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

import { MobileNav } from "../misc/MobileNav";
import { CommandMenu } from "@/components/misc/CommandMenu";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, type NavItem } from "@/constant";
import { useIsMac } from "@/hooks/useIsMac";
import { useCommand } from "@/hooks/useCommand";

import NAV_ICON from "@/app/icon.svg";

interface NavbarClientProps {
  projectNav: NavItem[];
  blogNav: NavItem[];
}

export const NavbarClient = ({
  projectNav = [],
  blogNav = [],
}: NavbarClientProps) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const isMac = useIsMac();

  const toggleCommand = useCallback(() => {
    setCommandOpen((prev) => !prev);
  }, []);

  useCommand({ onCmdOpn: toggleCommand });

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-xs supports-backdrop-filter:bg-background/80">
        <section
          id="nav"
          className="mx-auto max-w-4xl px-2 sm:px-4 lg:px-6 font-para"
        >
          <div className="flex h-16 w-full items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Image
                src={NAV_ICON.src}
                alt={`${PERSONAL_INFO.firstName} logo`}
                width={24}
                height={24}
                className="size-6"
              />
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {PERSONAL_INFO.firstName}.
              </span>
            </Link>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/resume"
                className="rounded-sm font-para text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Resume
              </Link>

              <span className="h-4 w-px bg-border" />

              <Button
                onClick={() => setCommandOpen(true)}
                variant="outline"
                size="sm"
                className="gap-2 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                <Search className="size-3.5" />
                <span>{isMac ? "⌘" : "Ctrl"} + K</span>
              </Button>
            </div>

            <div className="md:hidden">
              <MobileNav projectNav={projectNav} blogNav={blogNav} />
            </div>
          </div>
        </section>
      </nav>

      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        mode="dialog"
        projectNav={projectNav}
        blogNav={blogNav}
      />
    </>
  );
};

export default NavbarClient;
