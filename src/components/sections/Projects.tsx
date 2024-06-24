import { PROJECT_DATA } from "@/constant/projects";

import { Title } from "../ui/Title";
import { ProjectCard } from "../ui/card/ProjectCard";

export const Projects = () => {
  return (
    <section id="project" className="py-8">
      <Title title="Projects" />

      <div className="grid gap-8 lg:grid-cols-3">
        {PROJECT_DATA.map((proj, index) => (
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
