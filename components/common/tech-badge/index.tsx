import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge = ({ name, className }: TechBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-all duration-300 hover:border-accent/50 hover:bg-primary/0 hover:text-primary hover:scale-[1.02]",
        className,
      )}
    >
      {name}
    </span>
  );
};
