import Link from "next/link";
import Image from "next/image";
import { ExternalLink, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { SanityProject } from "@/types/project";
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: SanityProject;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const isWebsite = project.type === "website";

  const imageUrl =
    typeof project.image === "string"
      ? project.image
      : project.image
        ? urlFor(project.image).width(720).height(405).quality(85).url()
        : null;

  return (
    <Card
      className={cn(
        "group/card flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Project Image Preview */}
        <Link
          href={`/projects/${project.slug}`}
          className="block overflow-hidden rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted/40">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                No preview available
              </div>
            )}
          </div>
        </Link>

        {/* Header: Title and Status Badge */}
        <div className="flex items-start justify-between gap-3 min-w-0">
          <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl min-w-0">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm transition-colors duration-150 hover:underline underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {project.title}
            </Link>
          </h3>

          <Badge
            variant="outline"
            className="shrink-0 gap-1.5 rounded-sm font-mono text-xs capitalize"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                project.status === "live" && "bg-success",
                project.status === "building" && "bg-chart-1",
                project.status === "completed" && "bg-primary",
                project.status === "archived" && "bg-muted-foreground",
              )}
            />
            {project.status}
          </Badge>
        </div>

        {/* Content: Description and Technology Stack */}
        <div className="flex flex-col gap-3 min-w-0">
          <p className="line-clamp-2 font-para text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Split Action Links */}
      <div className="mt-6 flex w-full items-center gap-2 border-t border-border pt-4">
        {isWebsite ? (
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="flex-1"
            render={
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <ExternalLink className="size-4" />
            <span>Live Demo</span>
          </Button>
        ) : (
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="flex-1"
            render={
              <a
                href={`${project.github}#readme`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <BookOpen className="size-4" />
            <span>Guide</span>
          </Button>
        )}

        <Button
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="flex-1"
          render={
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FaGithub className="size-4" />
          <span>GitHub</span>
        </Button>
      </div>
    </Card>
  );
};

export default ProjectCard;
