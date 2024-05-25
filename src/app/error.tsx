"use client";

import type { ErrorProps as NextErrorProps } from "next/error";
import { useRouter } from "next/navigation";

interface ErrorProps extends NextErrorProps {
  error: Error;
}

export default function Error({ statusCode, error }: ErrorProps) {
  const router = useRouter();
  return (
    <div className="overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex items-center justify-center h-screen">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-500">
            {statusCode ? statusCode : <span className="text-5xl">Error</span>}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-slate-50">
            Something went wrong.
          </p>
          <p className="mb-4 text-lg font-light bg-purple-200 bg-opacity-30 rounded text-gray-100">
            {error.message}
          </p>
          <div className="flex flex-row-reverse items-center mt-6 gap-x-3">
            <button
              onClick={() => router.push("/")}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-slate transition-colors duration-200 rounded-lg shrink-0 sm:w-auto  hover:bg-purple-500 bg-purple-600"
            >
              Take me home
            </button>
            <button
              onClick={() => {
                window.close();
              }}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm  transition-colors duration-200  border rounded-lg gap-x-2 sm:w-auto  bg-gray-900 hover:bg-gray-100 hover:text-gray-800 text-gray-200 border-gray-700"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>

              <span>Go back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
