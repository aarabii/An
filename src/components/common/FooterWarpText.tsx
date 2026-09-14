"use client";

import { useState, useRef, useEffect } from "react";
import WarpText from "@/components/misc/WarpText";
import { PERSONAL_INFO } from "@/constant";

interface FooterWarpTextProps {
    firstName?: string;
    lastName?: string;
    className?: string;
}

export const FooterWarpText = ({
    firstName = PERSONAL_INFO.firstName.toUpperCase(),
    lastName = PERSONAL_INFO.lastName.toUpperCase(),
    className,
}: FooterWarpTextProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "250px 0px",
                threshold: 0,
            },
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative flex w-full flex-col overflow-hidden px-4 py-6 sm:px-6 sm:py-8 select-none ${className ?? ""}`}
            aria-label={`${firstName} ${lastName}`}
            role="img"
        >
            {isVisible ? (
                <>
                    {/* First Name — Top Left, takes 50% width, font size auto-calculated */}
                    <div className="w-1/2 self-start min-h-[65px] sm:min-h-[90px] md:min-h-[115px]">
                        <WarpText
                            text={firstName}
                            align="left"
                            maxWidthRatio={0.96}
                            maxHeightRatio={0.9}
                            fontSize="clamp(2rem, 9vw, 6.5rem)"
                            fontWeight={800}
                            fontFamily="var(--font-heading)"
                            letterSpacing="-0.04em"
                            lineHeight={0.9}
                            color="#f8f5ff"
                            warpStrength={0.06}
                            warpScale={1.5}
                            speed={0.4}
                            pointerInfluence={0.35}
                            pointerStrength={0.3}
                            refraction={0.014}
                            ripple
                            className="min-h-[65px] sm:min-h-[90px] md:min-h-[115px] w-full"
                        />
                    </div>

                    {/* Last Name — Directly below, takes 100% width, stretched to fill area if needed */}
                    <div className="w-full min-h-[80px] sm:min-h-[115px] md:min-h-[150px]">
                        <WarpText
                            text={lastName}
                            align="left"
                            maxWidthRatio={0.98}
                            maxHeightRatio={0.9}
                            stretch={true}
                            fontSize="clamp(3rem, 15vw, 11rem)"
                            fontWeight={800}
                            fontFamily="var(--font-heading)"
                            letterSpacing="-0.03em"
                            lineHeight={0.9}
                            color="#f8f5ff"
                            warpStrength={0.06}
                            warpScale={1.5}
                            speed={0.4}
                            pointerInfluence={0.35}
                            pointerStrength={0.3}
                            refraction={0.014}
                            ripple
                            className="min-h-[80px] sm:min-h-[115px] md:min-h-[150px] w-full"
                        />
                    </div>
                </>
            ) : (
                <div
                    className="min-h-[145px] sm:min-h-[205px] md:min-h-[265px] w-full"
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default FooterWarpText;
