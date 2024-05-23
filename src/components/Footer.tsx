import Image from "next/image";
import data from "@/constants/details.json";
import logo from "@/assets/logo/an_white_bg_removed.png";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      className=" bg-slate-500 m-4 bg-opacity-20 rounded-lg shadow-inner shadow-gray-800/50"
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 text-center md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="./"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              className="h-8 w-8"
              alt="Aarab Logo"
              width={50}
              height={50}
            />
            <span className="self-center text-2xl font-fezeline whitespace-nowrap text-slate-100">
              Aarab Nishchal
            </span>
          </a>
          <ul className="flex flex-wrap items-center text-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
            <li>
              <a
                href={`${data.socials.links.github}/An/issues/new?assignees=&labels=&projects=&template=bug_report.md`}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Report a bug
              </a>
            </li>
            <li>
              <a
                href={`${data.socials.links.github}/An`}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Become a contributor
              </a>
            </li>
            <li>
              <a
                href="https://github.com/losier/An/blob/master/LICENSE.txt"
                rel="noopener noreferrer"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Licensing (MIT)
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-neutral-950 sm:mx-auto" />
        <span className="block text-sm text-slate-200 sm:text-center">
          Made with ❤️ by <code className="font-bold">Aarab Nishchal</code>. All
          Rights Reserved.
        </span>
      </div>
    </motion.footer>
  );
};
