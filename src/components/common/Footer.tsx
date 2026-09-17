import Link from "next/link";
import { PERSONAL_INFO, SOCIALS, mainNav, moreNav } from "@/constant";
import { FooterWarpText } from "./FooterWarpText";

const Footer = () => {
  const allNavLinks = [...mainNav, ...moreNav];
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative mt-auto w-full overflow-hidden bg-background text-foreground"
    >
      {/* ------------------------------------------------------------- */}
      {/* PART 1: Navigation & Social Links (Multi-Column Layout)       */}
      {/* ------------------------------------------------------------- */}
      <div className="relative border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            {/* Left Section: Navigation (Columns) */}
            <nav aria-label="Footer pages navigation">
              <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Navigation
              </h3>
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:gap-x-8"
              >
                {allNavLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group -mx-2 flex items-center rounded-sm px-2 py-1 text-sm font-para text-muted-foreground transition-colors duration-150 hover:bg-muted/50 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Section: Connect (Columns with <ICON> / @<handle>) */}
            <nav aria-label="Footer social links">
              <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Connect
              </h3>
              <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:gap-x-6"
              >
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -mx-2 flex items-center gap-2 rounded-sm px-2 py-1 text-sm font-para text-muted-foreground transition-colors duration-150 hover:bg-muted/50 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Icon
                          className="size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">/</span>
                        <span className="font-mono text-xs group-hover:underline">
                          @{social.handle}
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PART 2: Brand Signature (First Name 50%, Last Name 100%)      */}
      {/* ------------------------------------------------------------- */}
      <div className="relative border-t border-border">
        <FooterWarpText />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PART 3: Legal & Copyright Bar                                 */}
      {/* Single line on desktop; stacked rows on small devices         */}
      {/* ------------------------------------------------------------- */}
      <div className="relative border-t border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright text */}
            <p className="font-mono text-xs text-muted-foreground">
              © {currentYear} {PERSONAL_INFO.name}.
            </p>

            {/* 3 Nav Links */}
            <nav
              aria-label="Legal information"
              className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-muted-foreground"
            >
              <Link
                href="/license"
                className="rounded-sm transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                License
              </Link>
              <span className="text-border select-none" aria-hidden="true">
                |
              </span>
              <Link
                href="/privacy"
                className="rounded-sm transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Privacy Policy
              </Link>
              <span className="text-border select-none" aria-hidden="true">
                |
              </span>
              <Link
                href="/terms"
                className="rounded-sm transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
