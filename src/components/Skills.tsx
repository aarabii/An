import React from "react";
import Icons from "./common/Icons";

import { FaReact } from "react-icons/fa6";

export const Skills = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h2 className="my-20 text-center text-4xl">Skills</h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
        <Icons icons={FaReact} className="text-cyan-400" />
      </div>
    </div>
  );
};
