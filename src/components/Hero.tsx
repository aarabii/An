import data from "@/constants/details.json";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// In future if i want to use Image on my HERO section

// import Image from "next/image";
// import profilePic from "@/assets/logo/logo512.png";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="h-full pb-40">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col justify-between items-center text-center lg:text-left lg:items-start mt-10 lg:mt-0">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 font-argine font-thin tracking-tight lg:mt-8 lg:text-8xl text-5xl"
            >
              {data.name}
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-transparent bg-clip-text text-4xl tracking-tight"
            >
              {data.role[0]}
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="mt-2 sm:mt-4 max-w-xl pt-8 font-light lg:text-xl tracking-wider leading-relaxed"
            >
              {data.bio}
            </motion.p>

            <motion.button
              variants={container(1.2)}
              initial="hidden"
              animate="visible"
              onClick={() => router.push("/resume")}
              className="mt-8 px-6 py-3 bg-purple-700 bg-opacity-60 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 transition duration-300"
            >
              View Resume
            </motion.button>
          </div>
        </div>
        {/* <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};
