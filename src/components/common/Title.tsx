import { FC } from "react";

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <h2 className="mb-10 font-nasalization text-center text-4xl">
      {title}
      {subTitle && <span className="text-neutral-500"> Me</span>}
    </h2>
  );
};
