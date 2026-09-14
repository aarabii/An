import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, Title } from "@/components/common";
import { FEATURED_PROJECTS } from "@/constant/projects";
import { ProjectCard } from "@/components/cards";
import { Button } from "@/components/ui/button";

const Projects = () => {
    return (
        <Container id="projects">
            <Title heading="Projects">
                <Button
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                    className="group p-2"
                    render={
                        <Link
                            className="flex items-center gap-1"
                            href="/projects"
                        />
                    }
                >
                    View all projects
                    <ArrowUpRight
                        data-icon="inline-end"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </Button>
            </Title>

            <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
                {FEATURED_PROJECTS.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </Container>
    );
};

export default Projects;
