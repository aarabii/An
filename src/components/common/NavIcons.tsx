import { FC } from "react";
import { motion } from "framer-motion";

interface NavIconsProps {
  icons: React.ElementType;
  link?: string;
}

export const NavIcons: FC<NavIconsProps> = ({
  icons: ReactIconsCompoents,
  link,
}) => {
  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      href={link}
      className="text-slate-50 text-3xl hover:text-purple-500"
    >
      <ReactIconsCompoents />
    </motion.a>
  );
};
