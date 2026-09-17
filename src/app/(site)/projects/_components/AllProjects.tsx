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
        <div className="flex min-h-48 items-center justify-center py-12 text-center">
          <p className="font-para text-sm text-muted-foreground">
            No projects available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default AllProjects;
