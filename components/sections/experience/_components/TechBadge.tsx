import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge = ({ name, className }: TechBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-foreground",
        className,
      )}
    >
      {name}
    </span>
  );
};
