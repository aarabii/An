import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomPortableText } from "@/components/portable-text";
import { getProjectBySlug, getAllProjectSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface ProjectDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Aarab Nishchal",
    };
  }

  const ogImage =
    typeof project.image === "string"
      ? project.image
      : project.image
        ? urlFor(project.image).width(1200).height(630).quality(85).url()
        : "/images/social_card.png";

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isWebsite = project.type === "website";

  const imageUrl =
    typeof project.image === "string"
      ? project.image
      : project.image
        ? urlFor(project.image).width(1200).height(675).quality(90).url()
        : null;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />
      <RepeatSeparator />

      {/* Project Overview */}
      <Container id="overview" className="flex flex-col gap-8">
        {/* Header Information: Title, Status, Description, Actions */}
        <div className="flex flex-col gap-4">
          {/* Title and Status */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>

            <Badge
              variant="outline"
              className="gap-1.5 text-xs font-medium capitalize"
            >
              <span
                className={cn(
                  "size-2 rounded-full",
                  project.status === "live" && "bg-success",
                  project.status === "building" && "bg-chart-1",
                  project.status === "completed" && "bg-primary",
                  project.status === "archived" && "bg-muted-foreground",
                )}
              />
              {project.status}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-para max-w-prose">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {isWebsite && project.demo ? (
              <Button
                nativeButton={false}
                variant="default"
                size="default"
                render={
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ExternalLink data-icon="inline-start" />
                Live Demo
              </Button>
            ) : project.github ? (
              <Button
                nativeButton={false}
                variant="default"
                size="default"
                render={
                  <a
                    href={`${project.github}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <BookOpen data-icon="inline-start" />
                Guide
              </Button>
            ) : null}

            {project.github && (
              <Button
                nativeButton={false}
                variant="outline"
                size="default"
                render={
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <FaGithub data-icon="inline-start" />
                GitHub Repository
              </Button>
            )}
          </div>
        </div>

        {/* Mockup Image Preview Framed */}
        {imageUrl && (
          <div className="overflow-hidden rounded-xl border border-border bg-card p-2 sm:p-3 shadow-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted select-none">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        )}

        {/* Technologies Area */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-sm">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="font-mono text-xs px-2.5 py-1 text-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Container>

      <RepeatSeparator />

      {/* Rendered Project Documentation Content */}
      {project.content && (
        <>
          <Container id="documentation">
            <article className="prose prose-invert max-w-prose mx-auto font-para">
              {Array.isArray(project.content) ? (
                <CustomPortableText value={project.content} />
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground font-para">
                  {project.content}
                </div>
              )}
            </article>
          </Container>
          <RepeatSeparator />
        </>
      )}
    </div>
  );
}
