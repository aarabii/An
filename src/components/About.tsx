import Image from "next/image";
import aboutImage from "@/assets/pic/aboutPic.png";
import data from "@/constants/details.json";

export const About = () => {
  return (
    <section id="about">
      <h2 className="mb-20 text-center text-4xl">
        About
        <span className="text-neutral-500"> Me</span>
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex items-center justify-center ">
            <div className=" border-neutral-400 border-2 rounded-2xl">
              <figure className="relative max-w-sm transition-all duration-500 cursor-pointer filter grayscale blur-sm  hover:grayscale-0 hover:blur-none">
                <Image
                  width={500}
                  height={500}
                  src={aboutImage}
                  alt="about Image"
                  className="rounded-2xl"
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:justify-start">
            <p className="my-2 max-w-xl py-6 text-lg tracking-wider">{data.about}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
