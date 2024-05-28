import aboutImage from "@/assets/pic/aboutPic.png";
import data from "@/constants/details.json";
import { Title } from "./common/Title";
import { motion } from "framer-motion";
import { Images } from "./common/Images";

export const About = () => {
  return (
    <section id="about">
      <Title title="About" subTitle="Me" />

      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex items-center justify-center ">
            <div className=" border-neutral-400 border-2 rounded-2xl">
              <figure className="relative max-w-sm transition-all duration-500 cursor-pointer filter grayscale blur-sm  hover:grayscale-0 hover:blur-none">
                <Images
                  width={500}
                  height={500}
                  url={aboutImage}
                  alt="about Image"
                  className="rounded-2xl"
                />
              </figure>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="flex justify-center lg:justify-start">
            <p className="my-2 max-w-xl py-6 text-lg tracking-wider">
              {data.about}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
