import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge = ({ name, className }: TechBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 shadow-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.14] hover:text-white hover:scale-[1.02]",
        className,
      )}
    >
      {name}
    </span>
  );
};
