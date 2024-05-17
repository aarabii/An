import { EXP } from "@/constants/exp";
import { Title } from "./common/Title";
import { TechClip } from "./common/TechClip";

export const Experience = () => {
  return (
    <section id="experience">
      <Title title="Experience" />

      <div>
        {EXP.map((exp, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <p className="mb-2 text-sm text-neutral-400">{exp.year}</p>
            </div>
            <div className="w-full max-w-xl lg:w-3/4">
              <h6 className="mb-2 font-semibold">
                {exp.role} -{" "}
                <span className="text-sm text-purple-200">{exp.company}</span>
              </h6>
              <p className="mb-4 text-neutral-400">{exp.description}</p>
              {exp.technologies.map((tec, index) => (
                <TechClip key={index} name={tec} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
