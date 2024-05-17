import { EXP } from "@/constants/exp";

export const Experience = () => {
  return (
    <section id="experience">
      <h2 className="my-20 text-center text-4xl">Experience</h2>

      <div>
        {EXP.map((exp, index) => (
          <div
            key={index}
            className="mb-8 flex flex-wrap lg:justify-center"
          >
            <div className="w-full lg:w-1/4">
                <p className="mb-2 text-sm text-neutral-400">
                    {exp.year}
                </p>

            </div>
            <div className="w-full max-w-xl lg:w-3/4">
                <h6 className="mb-2 font-semibold">
                    {exp.role} - <span className="text-sm text-purple-200">{exp.company}</span>
                </h6>
                <p className="mb-4 text-neutral-400">{exp.description}</p>
                {exp.technologies.map((tec, index) => (
                    <span
                        key={index}
                        className=" inline-block bg-neutral-300 text-purple-800 rounded px-2 py-1 text-sm mr-2 mt-4"
                    >
                        {tec}
                    </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
