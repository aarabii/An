import { Container, Title } from "@/components/common";
import { ProjectCard } from "@/components/cards";
import type { SanityProject } from "@/types/project";

interface AllProjectsProps {
    projects: SanityProject[];
}

const AllProjects: React.FC<AllProjectsProps> = ({ projects }) => {
    return (
        <Container id="all-projects">
            <Title heading="All Projects" />

            {projects.length === 0 ? (
                <div className="flex min-h-48 items-center justify-center p-8 sm:p-12">
                    <p className="font-mono text-sm text-muted-foreground">
                        No projects available
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project._id || project.slug} project={project} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default AllProjects;
