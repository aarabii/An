import { FC } from "react";

interface TechClipProps {
  name: string;
  key: number;
}

export const TechClip: FC<TechClipProps> = ({ key, name }) => {
  return (
    <span
      key={key}
      className="inline-block bg-purple-800 text-neutral-200 rounded px-2 py-1 text-sm mr-2 mt-4"
    >
      {name}
    </span>
  );
};
