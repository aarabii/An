import React, { useState, useRef, useEffect } from "react";

interface ToolTipProps {
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
  className?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  content,
  placement = "bottom",
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => setIsVisible(true);
  const handleMouseOut = () => setIsVisible(false);

  useEffect(() => {
    if (tooltipRef.current && isVisible) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const arrowElement = tooltipRef.current.querySelector(".tooltip-arrow");

      if (arrowElement && arrowElement instanceof HTMLElement) {
        // Type Guard
        const arrow = arrowElement.style;

        const adjustArrowPosition = () => {
          switch (placement) {
            case "top":
              arrow.bottom = "100%";
              arrow.left = "50%";
              arrow.transform = "translateX(-50%)";
              break;
            case "right":
              arrow.left = "100%";
              arrow.top = "50%";
              arrow.transform = "translateY(-50%)";
              break;
            case "left":
              arrow.right = "100%";
              arrow.top = "50%";
              arrow.transform = "translateY(-50%)";
              break;
            default: // bottom
              arrow.top = "100%";
              arrow.left = "50%";
              arrow.transform = "translateX(-50%)";
          }
        };
        adjustArrowPosition();
        window.addEventListener("resize", adjustArrowPosition);

        return () => {
          window.removeEventListener("resize", adjustArrowPosition);
        };
      }
    }
  }, [isVisible, placement]);

  if (content.trim() === "") {
    return <>{children}</>;
  }

  return (
    <div
      className={className}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
      <div
        ref={tooltipRef}
        role="tooltip"
        className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: placement === "bottom" ? "100%" : undefined,
          bottom: placement === "top" ? "100%" : undefined,
          left: placement === "right" ? "100%" : undefined,
          right: placement === "left" ? "100%" : undefined,
        }} // Dynamically set position based on placement
      >
        {content}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};
