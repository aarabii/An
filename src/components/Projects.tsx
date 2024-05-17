import { PROJECTS } from "@/constants/projects";
import Image from "next/image";
import { Title } from "./common/Title";
import { TechClip } from "./common/TechClip";

export const Projects = () => {
  return (
    <section id="project">
      <Title title="Projects" />

      <div>
        {PROJECTS.map((proj, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <Image
                src="https://source.unsplash.com/random?technology"
                alt={proj.name}
                height={150}
                width={150}
                loading="lazy"
                className="mb-6 rounded"
              />
            </div>

            <div className="w-full max-w-xl lg:w-3/4">
              <h6 className="mb-2 font-semibold">{proj.name}</h6>
              <p className="mb-4 text-neutral-400">{proj.description}</p>
              {proj.tech.map((tech, index) => (
                <TechClip key={index} name={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
