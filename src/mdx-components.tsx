import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        h1: (props) => (
            <h1
                className="mt-8 mb-4 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2"
                {...props}
            />
        ),
        h2: (props) => (
            <h2
                className="mt-6 mb-3 font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground"
                {...props}
            />
        ),
        h3: (props) => (
            <h3
                className="mt-4 mb-2 font-heading text-base sm:text-lg font-semibold tracking-tight text-foreground"
                {...props}
            />
        ),
        h4: (props) => (
            <h4
                className="mt-4 mb-2 font-heading text-sm sm:text-base font-semibold tracking-tight text-foreground"
                {...props}
            />
        ),
        h5: (props) => (
            <h5
                className="mt-3 mb-2 font-heading text-sm font-semibold tracking-tight text-foreground/90"
                {...props}
            />
        ),
        h6: (props) => (
            <h6
                className="mt-3 mb-2 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                {...props}
            />
        ),
        p: (props) => (
            <p
                className="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground font-para"
                {...props}
            />
        ),
        ul: (props) => (
            <ul
                className="mb-4 list-disc pl-5 space-y-1 text-sm sm:text-base text-muted-foreground font-para"
                {...props}
            />
        ),
        ol: (props) => (
            <ol
                className="mb-4 list-decimal pl-5 space-y-1 text-sm sm:text-base text-muted-foreground font-para"
                {...props}
            />
        ),
        li: (props) => <li className="leading-relaxed" {...props} />,
        strong: (props) => (
            <strong className="font-semibold text-foreground" {...props} />
        ),
        em: (props) => <em className="italic text-foreground/90" {...props} />,
        del: (props) => (
            <del className="text-muted-foreground/70 line-through" {...props} />
        ),
        mark: (props) => (
            <mark
                className="rounded bg-primary/20 px-1 py-0.5 text-foreground"
                {...props}
            />
        ),
        a: (props) => (
            <Link
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        ),
        blockquote: (props) => (
            <blockquote
                className="my-4 border-l-2 border-primary/50 pl-4 italic text-muted-foreground"
                {...props}
            />
        ),
        code: (props) => (
            <code
                className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-xs text-foreground"
                {...props}
            />
        ),
        pre: (props) => (
            <pre
                className="my-4 overflow-x-auto rounded-lg border border-border/70 bg-card/90 p-4 font-mono text-xs text-foreground/90 shadow-sm"
                {...props}
            />
        ),
        hr: (props) => <hr className="my-6 border-border/50" {...props} />,

        // Tables
        table: (props) => (
            <div className="mb-4 overflow-x-auto rounded-lg border border-border/60">
                <table
                    className="w-full border-collapse text-sm sm:text-base"
                    {...props}
                />
            </div>
        ),
        thead: (props) => (
            <thead className="bg-muted/60 text-foreground" {...props} />
        ),
        tbody: (props) => (
            <tbody className="divide-y divide-border/50" {...props} />
        ),
        tr: (props) => (
            <tr className="hover:bg-muted/30 transition-colors" {...props} />
        ),
        th: (props) => (
            <th
                className="px-3 py-2 text-left font-semibold text-foreground whitespace-nowrap"
                {...props}
            />
        ),
        td: (props) => (
            <td
                className="px-3 py-2 align-top text-muted-foreground font-para"
                {...props}
            />
        ),

        // Images
        img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                className="my-4 rounded-lg border border-border/50 shadow-sm max-w-full h-auto"
                loading="lazy"
                {...props}
            />
        ),

        // Task lists (GFM checkboxes render as <input type="checkbox">)
        input: (props) => (
            <input
                className="mr-2 h-4 w-4 rounded border-border/60 accent-primary align-middle disabled:opacity-70"
                disabled
                {...props}
            />
        ),

        ...components,
    };
}
