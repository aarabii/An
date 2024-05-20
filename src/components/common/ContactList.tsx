import { FC } from "react";
import Link from "next/link";

interface ContactListProps {
  icon: React.ReactNode;
  link: string;
  text: string;
}

export const ContactList: FC<ContactListProps> = ({
  icon,
  link,
  text,
}) => {
  return (
    <li>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <div className="text-neutral-100">{icon}</div>

        <strong className="text-slate-100 text-md ml-3">{text}</strong>
      </Link>
    </li>
  );
};
