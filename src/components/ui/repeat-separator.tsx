import { cn } from "@/lib/utils";

type RepeatSeparatorProps = {
    className?: string;
};

const RepeatSeparator = ({ className }: RepeatSeparatorProps) => {
    const separatorClasses =
        "relative left-1/2 flex h-6 w-screen shrink-0 -translate-x-1/2 border-y border-border before:absolute before:inset-0 before:-z-10 before:bg-[repeating-linear-gradient(315deg,transparent_0,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_50%)] before:bg-[size:10px_10px] opacity-50";

    return <div className={cn(separatorClasses, className)} />;
};

export default RepeatSeparator;
