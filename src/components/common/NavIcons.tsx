import { FC } from "react";
import { motion } from "framer-motion";

interface NavIconsProps {
  icons: React.ElementType;
  className?: string;
  href?: string;
}

export const NavIcons: FC<NavIconsProps> = ({
  icons: ReactIconsCompoents,
  className = "",
  href = "#",
}) => {
  return (
    <motion.a
      whileHover={{ scale: 1.3 }}
      rel="noreferrer noopener"
      target="_blank"
      href={href}
      className="text-slate-200 hover:text-purple-400"
    >
      <ReactIconsCompoents className={className} />
    </motion.a>
  );
};
