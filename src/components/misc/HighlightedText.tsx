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
                    <strong
                        key={i}
                        className="font-semibold text-foreground underline decoration-border underline-offset-4"
                    >
                        {part}
                    </strong>
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
