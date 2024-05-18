import { FC } from "react";

interface TechClipProps {
  name: string;
  keyValue?: number;
}

export const TechClip: FC<TechClipProps> = ({ keyValue, name }) => {
  return (
    <span
      key={keyValue}
      className="inline-block bg-purple-800 text-neutral-200 rounded px-2 py-1 text-sm mr-2 mt-4"
    >
      {name}
    </span>
  );
};
