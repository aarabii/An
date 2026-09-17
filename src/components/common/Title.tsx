import { cn } from "@/lib/utils";

interface TitleProps {
  heading?: string;
  children?: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ heading, children, className }) => {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-screen items-center justify-between gap-2 overflow-visible py-2 font-heading transition-shadow duration-150 after:absolute after:bottom-0 after:left-1/2 after:z-1 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border after:content-[''] data-[affix=true]:shadow-sm my-2 sm:my-4 lg:my-6",
        className,
      )}
    >
      <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default Title;
