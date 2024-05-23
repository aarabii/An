"use client";

import type { ErrorProps as NextErrorProps } from "next/error";

interface ErrorProps extends NextErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ statusCode, error, reset }: ErrorProps) {
  return (
    <div className="overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-300">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </h1>
          <code className="text-xl md:text-3xl bg-neutral-800 text-neutral-300 p-4 rounded-lg whitespace-pre-wrap">
            {error.message}
          </code>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <button
              onClick={reset}
              className="px-4 py-2 text-neutral-300 bg-cyan-600 rounded-md"
            >
              Restart
            </button>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 text-neutral-300 bg-red-600 rounded-md"
            >
              Close Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
