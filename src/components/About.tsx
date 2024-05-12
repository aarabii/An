import Image from "next/image";
import aboutImage from "@/assets/pic/aboutPic.png";
import data from "@/constants/details.json";

export const About = () => {
  return (
    <div className="border-b bordeer-neutral-900 pb-4">
      <h2 className="my-20 text-center text-4xl">
        About
        <span className="text-neutral-500"> Me</span>
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex items-center justify-center">
            <Image width={500} height={500} src={aboutImage} alt="about Image" className="rounded-2xl" />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:justify-start">
            <p className="my-2 max-w-xl py-6">{data.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
