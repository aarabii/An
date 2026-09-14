import { Container, Title } from "@/components/common";
import { PROJECTS } from "@/constant/projects";
import { ProjectCard } from "@/components/cards";

const AllProjects = () => {
    return (
        <Container id="all-projects">
            <Title heading="All Projects" />

            <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </Container>
    );
};

export default AllProjects;
