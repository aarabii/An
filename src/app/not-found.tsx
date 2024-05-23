"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-hidden">
      <div className="top-0 fixed -z-10 h-screen w-screen">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <div className="mx-auto container ps-8 text-neutral-300">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-7xl font-bold text-center text-neutral-300">
            404
          </h1>
          <p className="text-2xl text-center text-neutral-300">
            Page not found
          </p>

          <code>
            <p className="text-xl text-center text-neutral-300">{pathname}</p>
            don&apos;t exist in this site.
          </code>

          <div className="mt-4">
            <a
              href="/"
              className="px-4 py-2 text-neutral-300 bg-cyan-600 rounded-md"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
