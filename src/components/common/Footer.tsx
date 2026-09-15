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
      <div className="relative before:absolute before:top-0 before:left-1/2 before:z-1 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border before:content-['']">
        <div className="grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-10">
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
                    className="group -mx-2.5 flex items-center rounded-sm px-2.5 py-1 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/40 hover:pl-4 hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <span className="font-para">{item.label}</span>
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
                      className="group -mx-2.5 flex items-center gap-2 rounded-sm px-2 py-1 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/40 hover:pl-4 hover:text-foreground underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <Icon
                        className="size-3.5 shrink-0 text-muted-foreground/70 transition-colors duration-200 group-hover:text-foreground"
                        aria-hidden="true"
                      />
                      /
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

      {/* ------------------------------------------------------------- */}
      {/* PART 2: Brand Signature (First Name 50%, Last Name 100%)      */}
      {/* ------------------------------------------------------------- */}
      <div className="relative before:absolute before:top-0 before:left-1/2 before:z-1 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border before:content-['']">
        <FooterWarpText />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PART 3: Legal & Copyright Bar                                 */}
      {/* Single line on desktop; stacked rows on small devices         */}
      {/* ------------------------------------------------------------- */}
      <div className="relative before:absolute before:top-0 before:left-1/2 before:z-1 before:h-px before:w-screen before:-translate-x-1/2 before:bg-border before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-1 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border after:content-['']">
        <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {/* Copyright text */}
          <p className="font-mono text-xs text-muted-foreground/80 whitespace-nowrap">
            © {currentYear} {PERSONAL_INFO.name}.
          </p>

          {/* 3 Nav Links */}
          <nav
            aria-label="Legal information"
            className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-muted-foreground"
          >
            <Link
              href="/license"
              className="transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
            >
              License
            </Link>
            <span className="text-border select-none" aria-hidden="true">
              |
            </span>
            <Link
              href="/privacy"
              className="transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
            >
              Privacy Policy
            </Link>
            <span className="text-border select-none" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms"
              className="transition-colors duration-150 hover:text-foreground hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
