import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const ActionBtn = () => {
  return (
    <div className="flex items-center justify-center gap-6 pt-2">
      <Button
        nativeButton={false}
        variant="ghost"
        render={<Link href="#contact" />}
        className="group relative h-auto p-0 bg-transparent hover:bg-transparent text-primary/80 hover:text-primary font-medium text-sm sm:text-base tracking-wide transition-colors rounded-none focus-visible:ring-0"
      >
        <span>Contact Me</span>
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </Button>

      <span className="text-primary/20 font-light select-none">|</span>

      <Button
        nativeButton={false}
        variant="ghost"
        render={
          <Link href="/resume" target="_blank" rel="noopener noreferrer" />
        }
        className="group relative h-auto p-0 bg-transparent hover:bg-transparent text-primary/80 hover:text-primary font-medium text-sm sm:text-base tracking-wide transition-colors rounded-none gap-1 focus-visible:ring-0"
      >
        <span>View Resume</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </Button>
    </div>
  );
};
