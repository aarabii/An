import { EXP } from "@/constants/exp";
import { Title } from "./common/Title";
import { TechClip } from "./common/TechClip";
import { motion } from "framer-motion";

export const Experience = () => {
  return (
    <section id="experience">
      <Title title="Experience" />

      <div>
        {EXP.map((exp, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
            >
              <p className="mb-2 text-base text-slate-200">{exp.year}</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold">
                {exp.role} -{" "}
                <span className="text-sm text-purple-200">{exp.company}</span>
              </h6>
              <p className="mb-4 text-slate-400">{exp.description}</p>
              {exp.technologies.map((tec, index) => (
                <TechClip key={index} name={tec} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
