import { PROJECTS } from "@/constants/projects";
import { Title } from "./common/Title";
import { ProjectCard } from "./common/ProjectCard";

export const Projects = () => {
  return (
    <section id="project" className="py-8">
      <Title title="Projects" />

      <div className="grid gap-8 lg:grid-cols-3">
        {PROJECTS.map((proj, index) => (
          <ProjectCard
            key={index}
            title={proj.name}
            desc={proj.description}
            git={proj.github_link}
            hostedAt={proj.demo}
            tech={proj.tech}
          />
        ))}
      </div>
    </section>
  );
};
