import type { Metadata } from "next";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { Separator } from "@/components/ui/separator";
import { PAGE_SEO, createPageMetadata, getBreadcrumbJsonLd } from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.license);

export default async function LicensePage() {
  const jsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "License", url: "/license" },
  ]);

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <PageNav />
      <RepeatSeparator />
      <Container id="license">
        <Title heading="License" />
        <div className="max-w-prose pb-16 pt-4 sm:pb-24 sm:pt-6 wrap-break-word font-para">
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            This license applies to the source code of projects published under{" "}
            <a
              href="https://github.com/aarabii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
            >
              github.com/aarabii
            </a>
            , unless a specific repository states a different license in its own{" "}
            <code className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              LICENSE
            </code>{" "}
            file. A repo&apos;s own license file always takes priority over this
            page.
          </p>

          <Separator className="my-8 sm:my-10" />

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              MIT License
            </h2>

            <p className="font-mono text-xs sm:text-sm text-muted-foreground">
              Copyright (c) 2026 Aarab
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the &quot;Software&quot;), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                The Software is provided &quot;as is&quot;, without warranty of
                any kind, express or implied
              </strong>
              , including but not limited to the warranties of merchantability,
              fitness for a particular purpose, and noninfringement. In no event
              shall the author be liable for any claim, damages, or other
              liability, whether in an action of contract, tort, or otherwise,
              arising from, out of, or in connection with the Software or the
              use or other dealings in the Software.
            </p>
          </div>

          <Separator className="my-8 sm:my-10" />

          <div className="rounded-lg border border-border/80 bg-muted/30 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              <em className="font-medium text-foreground not-italic">Note:</em>{" "}
              this license covers the code itself. It does not cover the content
              of the Privacy Policy or Terms of Service, which apply separately
              to how the hosted, running versions of these projects are used.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
