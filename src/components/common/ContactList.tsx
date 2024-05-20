import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ContactListProps {
  icon: React.ReactNode;
  link: string;
  text: string;
  initial: number;
}

export const ContactList: FC<ContactListProps> = ({
  icon,
  link,
  text,
  initial,
}) => {
  return (
    <motion.li
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: initial }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <div className="text-neutral-100">{icon}</div>

        <strong className="text-slate-100 text-md ml-3">{text}</strong>
      </Link>
    </motion.li>
  );
};
