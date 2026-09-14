"use client";

import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
} from "react";
import AeroShards from "@/components/bg/AeroShards";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface FitTextProps {
    text: string;
    as?: "p" | "span" | "h2";
    maxFontSize: number;
    minFontSize?: number;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Automatically calculates and applies the exact font size
 * so the text stays strictly on a single line without wrapping.
 */
const FitText: React.FC<FitTextProps> = ({
    text,
    as = "p",
    maxFontSize,
    minFontSize = 9,
    className,
    style,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const probeRef = useRef<HTMLSpanElement>(null);
    const [fontSize, setFontSize] = useState<number>(maxFontSize);

    const updateFontSize = useCallback(() => {
        if (!containerRef.current || !probeRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth <= 0) return;

        // Reserve a 4% buffer so text never touches container edges
        const availableWidth = containerWidth * 0.94;

        // Measure natural text width rendered at 100px base reference
        const probeWidth =
            probeRef.current.getBoundingClientRect().width ||
            probeRef.current.scrollWidth;
        if (probeWidth <= 0) return;

        // Calculate exact font size in pixels
        const idealSize = (availableWidth / probeWidth) * 100;
        const clampedSize = Math.max(
            minFontSize,
            Math.min(maxFontSize, idealSize)
        );

        setFontSize(Number(clampedSize.toFixed(2)));
    }, [maxFontSize, minFontSize]);

    useIsomorphicLayoutEffect(() => {
        updateFontSize();
    }, [text, updateFontSize]);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(() => {
            updateFontSize();
        });
        observer.observe(containerRef.current);

        if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(updateFontSize);
        }

        return () => observer.disconnect();
    }, [updateFontSize]);

    const Tag = as;

    return (
        <div
            ref={containerRef}
            className="w-full flex items-center justify-center overflow-hidden"
        >
            {/* Invisible probe used strictly to calculate natural text width at 100px */}
            <span
                ref={probeRef}
                aria-hidden="true"
                className={cn(
                    "invisible absolute pointer-events-none whitespace-nowrap select-none",
                    className
                )}
                style={{ fontSize: "100px", lineHeight: 1 }}
            >
                {text}
            </span>

            {/* Rendered tag with dynamically computed font size */}
            <Tag
                className={cn(
                    "whitespace-nowrap leading-tight transition-[font-size] duration-200",
                    className
                )}
                style={{ fontSize: `${fontSize}px`, ...style }}
            >
                {text}
            </Tag>
        </div>
    );
};

export interface TopBannerProps {
    className?: string;
    heightClassName?: string;
    topTag?: "p" | "span";
    topText?: string;
    mainText?: string;
    backgroundColor?: string;
    shardColor?: string;
    accentColor?: string;
}

const DEFAULT_TOP_TEXT =
    "Everyone is building a version of themselves to be seen.";
const DEFAULT_MAIN_TEXT =
    "I am building the version that refuses to be seen and still wins.";

export const TopBanner: React.FC<TopBannerProps> = ({
    className,
    heightClassName = "h-36 sm:h-40 md:h-44",
    topTag = "p",
    topText = DEFAULT_TOP_TEXT,
    mainText = DEFAULT_MAIN_TEXT,
    backgroundColor = "#000000",
    shardColor = "#896ABD",
    accentColor = "#A855F7",
}) => {
    const [gpuFailed, setGpuFailed] = useState(false);

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden border-b border-border bg-background select-none",
                heightClassName,
                className
            )}
        >
            {/* Clear, unobstructed AeroShards WebGPU Canvas Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {!gpuFailed ? (
                    <AeroShards
                        backgroundColor={backgroundColor}
                        shardColor={shardColor}
                        accentColor={accentColor}
                        placement="full"
                        flow="stream"
                        material="pearl"
                        detail="balanced"
                        scale={1.2}
                        spread={0.9}
                        depth={1.1}
                        speed={1.1}
                        spin={1.0}
                        density={1.6}
                        shardSize={1.35}
                        stretch={1.3}
                        turbulence={1.0}
                        glow={1.8}
                        bloom={0.8}
                        edgeSoftness={2}
                        grain={0.02}
                        chromaticAberration={0.006}
                        interaction="none"
                        onError={() => setGpuFailed(true)}
                    />
                ) : (
                    <div className="absolute inset-0 bg-card" />
                )}
            </div>

            {/* Foreground Content using theme tokens from globals.css */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                <div className="w-full flex flex-col items-center justify-center gap-1.5 sm:gap-2">
                    {/* Top line (span or p tag) */}
                    <FitText
                        as={topTag}
                        text={topText}
                        maxFontSize={15}
                        minFontSize={9}
                        className="font-para text-muted-foreground tracking-normal text-center drop-shadow-md"
                    />

                    {/* Main line (h2 tag) */}
                    <FitText
                        as="h2"
                        text={mainText}
                        maxFontSize={28}
                        minFontSize={12}
                        className="font-heading font-bold text-foreground tracking-tight text-center drop-shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBanner;
