import React from "react";
import Icons from "./common/Icons";

import { FaHtml5 } from "react-icons/fa6";
import { FaCss3 } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaPython } from "react-icons/fa6";
import { FaReact } from "react-icons/fa6";
import { SiNextdotjs } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import { SiDjango } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { SiAdobelightroom } from "react-icons/si";
import { SiAdobeillustrator } from "react-icons/si";
import { SiCanva } from "react-icons/si";
import { Title } from "./common/Title";

export const Skills = () => {
  const skills = [
    { icon: FaHtml5, color: "text-orange-500" },
    { icon: FaCss3, color: "text-blue-500" },
    { icon: IoLogoJavascript, color: "text-yellow-400" },
    { icon: SiTypescript, color: "text-blue-600" },
    { icon: FaPython, color: "text-yellow-500" },
    { icon: FaReact, color: "text-cyan-400" },
    { icon: SiNextdotjs, color: "text-gray-800" },
    { icon: SiTailwindcss, color: "text-sky-400" },
    { icon: FaNodeJs, color: "text-green-500" },
    { icon: SiPostman, color: "text-orange-600" },
    { icon: FaAws, color: "text-yellow-300" },
    { icon: IoLogoFirebase, color: "text-yellow-400 text-orange-500" }, // Combined colors for Firebase
    { icon: SiDjango, color: "text-green-500" },
    { icon: DiMongodb, color: "text-green-600" },
    { icon: GrMysql, color: "text-blue-500" },
    { icon: SiAdobelightroom, color: "text-purple-500" },
    { icon: SiAdobeillustrator, color: "text-orange-500" },
    { icon: SiCanva, color: "text-cyan-400" },
  ];

  return (
    <div className="border-b border-neutral-800 pb-24">
      <Title title="Skills" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 justify-items-center">
        {skills.map((skill, index) => (
          <Icons key={index} icons={skill.icon} className={skill.color} />
        ))}
      </div>
    </div>
  );
};
