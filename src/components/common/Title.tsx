import { cn } from "@/lib/utils";

interface TitleProps {
    heading?: string;
    classname?: string;
}

const Title: React.FC<TitleProps> = ({ heading, classname }) => {
    return (
        <div
            className={cn(
                "after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-1 text-3xl font-heading transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black] px-5",
                classname,
            )}
        >
            <h2 className="">{heading}</h2>
        </div>
    );
};

export default Title;
