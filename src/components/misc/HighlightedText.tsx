export function HighlightedText({
    text,
    highlights,
}: {
    text: string;
    highlights: string[];
}) {
    if (highlights.length === 0) return <>{text}</>;

    const pattern = new RegExp(
        `(${highlights.map(escapeRegExp).join("|")})`,
        "g",
    );
    const parts = text.split(pattern);

    return (
        <>
            {parts.map((part, i) =>
                highlights.includes(part) ? (
                    <b
                        key={i}
                        className="font-mono text-primary/90 underline underline-offset-2"
                    >
                        {part}
                    </b>
                ) : (
                    part
                ),
            )}
        </>
    );
}

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
