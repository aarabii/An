import Image from "next/image";
import React, { FC } from "react";

interface ProjectCardsProps {
  name: string;
  description: string;
  image_url: string;
  github_link: string;
  demo: string | null;
}

export const ProjectCards: FC<ProjectCardsProps> = ({
  name,
  description,
  image_url,
  github_link,
  demo,
}) => {
  return (
    <div className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-gray-100 hover:-translate-y-2 hover:shadow-xl shadow-gray-300">
      <Image
        src=""
        className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg bg-gray-200"
        alt="image here"
      />

      <div className="">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Card</h2>
        <p className="text-gray-700 line-clamp-3">
          {description}
        </p>
      </div>
      <button className="hover:bg-gray-300 bg-gray-200 text-gray-800 mt-6 rounded p-2 px-6">
        Explore
      </button>
    </div>
  );
};
