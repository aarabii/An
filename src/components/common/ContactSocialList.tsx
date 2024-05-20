import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ContactSocialListProps {
  child: React.ReactNode;
  link: string;
  childClassName?: string;
  intitial: number;
}

export const ContactSocialList: FC<ContactSocialListProps> = ({
  child,
  link,
  childClassName,
  intitial,
}) => {
  return (
    <motion.li
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: intitial }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.2,
      }}
      className="bg-purple-700 text-fuchsia-50 hover:bg-fuchsia-50 hover:text-purple-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={childClassName}
      >
        {child}
      </Link>
    </motion.li>
  );
};
