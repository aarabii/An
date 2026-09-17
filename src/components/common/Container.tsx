import { cn } from "@/lib/utils";

interface ContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-6xl px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6 font-para",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Container;
