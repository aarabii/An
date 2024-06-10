import { FC } from "react";

interface TechClipProps {
  name: string;
  keyValue?: number;
}

export const TechClip: FC<TechClipProps> = ({ keyValue, name }) => {
  return (
    <span
      key={keyValue}
      className="bg-purple-800 text-slate-200 px-2 py-1 text-sm mr-2 mt-4 inline-flex items-center rounded font-semibold capitalize"
    >
      {name}
    </span>
  );
};
