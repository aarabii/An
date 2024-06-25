"use client";

import { useRouter, usePathname } from "next/navigation";

import notFoundSvg from "@/assets/notFound.svg";
import Image from "next/image";
import { FaHouse } from "react-icons/fa6";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <div className="bg-black text-slate-100">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <Image src={notFoundSvg} alt="Not Found" className="mx-auto" />
            </div>
            <p className="gap-3 mt-2 leading-5 text-sm md:text-base text-purple-100 p-2 mb-4">
              Oops! The page `
              <code className="rounded bg-slate-500 bg-opacity-50 p-2 my-2 text-lg">
                {pathname}
              </code>
              ` you are trying to look for does not exist.
              <br />
              It might have been moved or deleted.
              <br />
            </p>
            <div className="flex flex-1 justify-center items-center text-center ">
              <button
                onClick={() => router.push("/")}
                className="bg-transparent hover:bg-purple-300 text-purple-300 hover:text-slate-800 rounded shadow hover:shadow-lg py-2 px-4 border border-purple-300 hover:border-transparent"
              >
                <FaHouse className="inline-block w-6 h-6" />
                <span className="ml-2">Take me home!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
