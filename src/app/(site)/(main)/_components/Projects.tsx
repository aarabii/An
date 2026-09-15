import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, Title } from "@/components/common";
import { ProjectCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/sanity/lib/queries";

const Projects = async () => {
  const projects = await getFeaturedProjects();

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Container id="projects">
      <Title heading="Things I've Built">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          className="group p-2"
          render={<Link className="flex items-center gap-1" href="/projects" />}
        >
          View all projects
          <ArrowUpRight
            data-icon="inline-end"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Button>
      </Title>

      <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project._id || project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
};

export default Projects;
