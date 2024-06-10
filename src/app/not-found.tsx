"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import notFoundImage from "@/assets/pic/notFound.svg";
import Image from "next/image";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className=" overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:self-center">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-purple-400">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-50 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-400">
            Sorry, the page you are looking for{" "}
            <code className="px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-600 text-gray-100 border-gray-500 tracking-notFoundSpacing">
              {pathname}
            </code>{" "}
            doesn&apos;t exist.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => {
                router.back();
              }}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm  transition-colors duration-200  border rounded-lg gap-x-2 sm:w-auto  bg-gray-900 hover:bg-gray-100 hover:text-gray-800 text-gray-200 border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-slate transition-colors duration-200 rounded-lg shrink-0 sm:w-auto  hover:bg-purple-500 bg-purple-600"
            >
              Take me home
            </button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            src={notFoundImage}
            alt="404-not-found-image"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
