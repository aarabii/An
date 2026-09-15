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
        "container mx-auto md:max-w-178 px-2 font-sans md:px-0",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Container;
