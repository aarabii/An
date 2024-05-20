import { FC } from "react";
import Link from "next/link";

interface ContactSocialListProps {
  child: React.ReactNode;
  link: string;
  childClassName?: string;
}

export const ContactSocialList: FC<ContactSocialListProps> = ({
  child,
  link,
  childClassName,
}) => {
  return (
    <li className="bg-purple-700 text-fuchsia-50 hover:bg-fuchsia-50 hover:text-purple-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={childClassName}
      >
        {child}
      </Link>
    </li>
  );
};
