import { IconType } from "react-icons";

export const SkillChip = ({
  LogoComponent,
  color,
  title,
}: {
  LogoComponent: IconType;
  color: string;
  title: string;
}) => {
  return (
    <div className="group flex items-center gap-3 px-4.5 py-2.5 rounded-xl border border-white/15 bg-white/8 backdrop-blur-md shadow-md transition-all duration-300  cursor-default">
      <LogoComponent
        className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color: color }}
      />
      <span className="text-sm font-medium text-white whitespace-nowrap">
        {title}
      </span>
    </div>
  );
};
