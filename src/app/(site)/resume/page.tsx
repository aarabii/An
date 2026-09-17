import type { Metadata } from "next";
import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";

import { Container, PageNav, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume | Aarab Nishchal",
  description:
    "Curriculum Vitae and professional background of Aarab Nishchal — AI Engineer & Software Developer.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <PageNav />

      {/* RepeatSeparator on top of Title */}
      <RepeatSeparator />

      {/* Main Content Container */}
      <Container id="resume">
        <Title heading="Resume" />

        {/* Small subtitle text */}
        <div className="max-w-prose mb-8 md:mb-12">
          <p className="font-para text-sm text-muted-foreground leading-relaxed">
            A digital copy of my resume. You can inspect the document below or
            download the official PDF version for print and offline review.
          </p>
        </div>

        {/* Document Card containing WebP image and Download action */}
        <Card className="gap-0 overflow-hidden rounded-lg border border-border bg-card p-0 shadow-sm">
          {/* Document Toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground">
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate font-medium text-foreground">
                aarab_nishchal_resume.pdf
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                render={
                  <a
                    href="/resume/aarab_nishchal_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ExternalLink className="size-4" />
                <span className="hidden sm:inline">Open in Tab</span>
                <span className="sm:hidden">Open</span>
              </Button>

              <Button
                nativeButton={false}
                variant="default"
                size="sm"
                render={
                  <a
                    href="/resume/aarab_nishchal_resume.pdf"
                    download="aarab_nishchal_resume.pdf"
                  />
                }
              >
                <Download className="size-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* WebP Resume Display */}
          <div className="relative w-full">
            <Image
              src="/resume/aarab_nishchal_resume.webp"
              alt="Aarab Nishchal - Resume"
              width={2481}
              height={3508}
              priority
              className="h-auto w-full object-contain block select-none"
              sizes="(max-width: 768px) 100vw, 712px"
            />
          </div>
        </Card>
      </Container>
    </div>
  );
}
