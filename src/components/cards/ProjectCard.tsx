import Link from "next/link";
import Image from "next/image";
import { ExternalLink, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { SanityProject } from "@/types/project";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
        "group/card flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90",
        className,
      )}
    >
      {/* Project Image Preview */}
      <div className="px-4">
        <Link
          href={`/projects/${project.slug}`}
          className="block overflow-hidden rounded-md"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border/50 bg-muted/40">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-300 ease-out group-hover/card:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                No preview available
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Header: Title and Status Badge */}
      <CardHeader className="gap-2">
        <CardTitle className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover/card:text-primary">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline underline-offset-4"
          >
            {project.title}
          </Link>
        </CardTitle>

        <CardAction>
          <Badge
            variant="outline"
            className="gap-1.5 text-[0.625rem] font-medium capitalize"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                project.status === "live" &&
                  "bg-success shadow-[0_0_6px_0_rgba(16,185,129,0.7)]",
                project.status === "building" && "bg-amber-500",
                project.status === "completed" && "bg-primary",
                project.status === "archived" && "bg-muted-foreground",
              )}
            />
            {project.status}
          </Badge>
        </CardAction>
      </CardHeader>

      {/* Content: Description and Technology Stack */}
      <CardContent className="flex flex-1 flex-col justify-between gap-3">
        <CardDescription className="line-clamp-2 min-h-10 text-xs/relaxed text-muted-foreground">
          {project.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-md font-mono text-[0.625rem] text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge
              variant="outline"
              className="rounded-md font-mono text-[0.625rem] text-muted-foreground/60"
            >
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer: Split Action Links */}
      <CardFooter className="mt-auto border-t pt-3">
        <div className="flex w-full items-center gap-2">
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
              <ExternalLink data-icon="inline-start" />
              Live Demo
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
              <BookOpen data-icon="inline-start" />
              Guide
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
            <FaGithub data-icon="inline-start" />
            GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
