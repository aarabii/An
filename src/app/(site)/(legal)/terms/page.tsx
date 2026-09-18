import type { Metadata } from "next";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { PAGE_SEO, createPageMetadata, getBreadcrumbJsonLd } from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.terms);

export default async function TermsPage() {
  const jsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ]);

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <PageNav />
      <RepeatSeparator />
      <Container id="terms">
        <Title as="h1" heading="Terms of service" />
        <div className="max-w-prose pb-16 pt-4 sm:pb-24 sm:pt-6 wrap-break-word font-para space-y-8 sm:space-y-10">
          <div>
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              <em className="not-italic">Last updated: 18 September 2026</em>
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              These terms apply to{" "}
              <strong className="font-semibold text-foreground">
                aarab.me
              </strong>
              , all subdomains of aarab.me, all pages under aarab.me/*, and
              every project published under{" "}
              <a
                href="https://github.com/aarabii"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                github.com/aarabii
              </a>{" "}
              that links to this page. If a specific project has its own terms,
              that one applies instead of this one for that project.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Acceptance
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              By using any of these sites, tools, or projects, you agree to
              these terms. If you don&apos;t agree, don&apos;t use them -
              that&apos;s the whole deal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              What these projects are
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              These are personal and independent projects built by one person
              (Aarab), not a company. Some are experiments, some are tools built
              for real use, and none of them come with any guarantee of uptime,
              support, or long-term maintenance unless stated otherwise on that
              specific project&apos;s page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              License to the code
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Unless a repository states otherwise in its own{" "}
              <code className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                LICENSE
              </code>{" "}
              file, code published under{" "}
              <a
                href="https://github.com/aarabii"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                github.com/aarabii
              </a>{" "}
              is released under the{" "}
              <a
                href="/license"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                MIT License
              </a>
              . That covers the code itself, not the hosted, running version of
              a project or the data that passes through it - those are covered
              by these terms and the{" "}
              <a
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              No warranty
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Everything here is provided{" "}
              <strong className="font-semibold text-foreground">
                &quot;as is&quot;
              </strong>
              , with no warranty of any kind, express or implied. There&apos;s
              no promise that any tool will be bug-free, secure, available at
              all times, or fit for any particular purpose. Use at your own
              risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Limitation of liability
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              To the fullest extent permitted by law, I&apos;m not liable for
              any damages, direct or indirect, arising from your use of, or
              inability to use, any of these projects - including data loss,
              downtime, or issues caused by a third-party service a project
              depends on.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Third-party services
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Many projects rely on external tools and services (databases,
              hosting, auth providers, APIs, and so on). I don&apos;t control
              those services, and I&apos;m not responsible for their behavior,
              outages, or how they handle any data that passes through them. See
              the{" "}
              <a
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                Privacy Policy
              </a>{" "}
              for more on this.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Your responsibilities
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              You agree not to use any of these projects for anything illegal,
              to abuse or attack the infrastructure behind them, or to try to
              extract data you&apos;re not supposed to have access to. Basic
              common sense applies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Changes and availability
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Any project, tool, or page covered by these terms can be changed,
              taken down, or discontinued at any time without notice. These
              terms themselves can also be updated at any time - continued use
              after an update means you&apos;ve accepted the new version.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Governing law
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              These terms are governed by the laws of India, without regard to
              conflict-of-law principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Contact
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Questions about these terms or a specific project:
            </p>
            <ul className="my-4 space-y-2 text-base leading-relaxed text-muted-foreground list-disc pl-5 marker:text-muted-foreground/60">
              <li className="pl-1">
                Email:{" "}
                <a
                  href="mailto:hi@aarab.me"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  hi@aarab.me
                </a>{" "}
                or{" "}
                <a
                  href="mailto:hello@aarab.me"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  hello@aarab.me
                </a>
              </li>
              <li className="pl-1">
                GitHub: open an issue on the relevant repo at{" "}
                <a
                  href="https://github.com/aarabii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  github.com/aarabii
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
}
