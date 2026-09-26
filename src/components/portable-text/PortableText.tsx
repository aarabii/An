import Image from "next/image";
import {
    PortableText as BasePortableText,
    type PortableTextComponents,
} from "next-sanity";

import { urlFor } from "@/sanity/lib/image";

interface PortableTextProps {
    value?: React.ComponentProps<typeof BasePortableText>["value"];
    className?: string;
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const imageUrl = urlFor(value).width(900).quality(85).url();
            return (
                <figure className="my-8 overflow-hidden rounded-xl border border-border/60 bg-card/40 p-2">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={value.alt || "Article illustration"}
                            fill
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        code: ({ value }) => {
            if (!value?.code) return null;
            return (
                <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-muted/40 font-mono text-xs sm:text-sm">
                    {value.filename && (
                        <div className="flex items-center justify-between border-b border-border/40 bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
                            <span>{value.filename}</span>
                            {value.language && (
                                <span className="uppercase text-[10px] tracking-wider opacity-70">
                                    {value.language}
                                </span>
                            )}
                        </div>
                    )}
                    <pre className="overflow-x-auto p-4 leading-relaxed font-mono">
                        <code>{value.code}</code>
                    </pre>
                </div>
            );
        },
    },
    block: {
        h1: ({ children }) => (
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-6 mb-2">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="font-heading text-base sm:text-lg font-semibold tracking-tight text-foreground mt-4 mb-2">
                {children}
            </h4>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground my-5 font-para">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => (
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground/90 font-para my-3.5">
                {children}
            </p>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
            <em className="italic text-foreground/90">{children}</em>
        ),
        code: ({ children }) => (
            <code className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-xs text-foreground border border-border/40">
                {children}
            </code>
        ),
        link: ({ value, children }) => {
            const isExternal =
                value?.href?.startsWith("http://") ||
                value?.href?.startsWith("https://");
            return (
                <a
                    href={value?.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc pl-5 my-4 space-y-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground font-para">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal pl-5 my-4 space-y-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground font-para">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
};

export function CustomPortableText({ value, className }: PortableTextProps) {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
        <div className={className}>
            <BasePortableText value={value} components={components} />
        </div>
    );
}

export default CustomPortableText;
