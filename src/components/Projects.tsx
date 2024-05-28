import { PROJECTS } from "@/constants/projects";
import { Title } from "./common/Title";
import { TechClip } from "./common/TechClip";
import { motion } from "framer-motion";
import { Images } from "./common/Images";

export const Projects = () => {

  return (
    <section id="project">
      <Title title="Projects" />

      <div>
        {PROJECTS.map((proj, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
            >
              <Images
                url={proj.image_url || "https://source.unsplash.com/random?technology"}
                alt={proj.name}
                height={150}
                width={150}
                className="mb-6 rounded"
              />
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">{proj.name}</h6>
              <p className="mb-4 text-neutral-400">{proj.description}</p>
              {proj.tech.map((tech, index) => (
                <TechClip key={index} name={tech} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
