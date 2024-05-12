import data from "@/constants/details.json";

// In future if i want to use Image on my HERO section

// import Image from "next/image";
// import profilePic from "@/assets/logo/logo512.png";

export const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pd-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-argine font-argine font-thin tracking-tight lg:mt-16 lg:text-8xl">
              {data.name}
            </h1>
            <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-transparent bg-clip-text text-4xl tracking-tight">
              {data.role[0]}
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tight">
              {data.bio}
            </p>
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
