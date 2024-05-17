import { PROJECTS } from "@/constants/projects";
import Image from "next/image";

export const Projects = () => {
  return (
    <section id="project">
      <h2 className="my-20 text-center text-4xl">Project</h2>

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
                <span
                  key={index}
                  className="inline-block bg-purple-800 text-neutral-200 rounded px-2 py-1 text-sm mr-2 mt-4"
                >{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
