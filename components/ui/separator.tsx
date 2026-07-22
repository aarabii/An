"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { profile } from "@/constant/profile";
import { cn } from "@/lib/utils";

interface ExtraSeparatorProps {
  label?: React.ReactNode;
  signatureText?: string;
  showSignature?: boolean;
}

export type SeparatorProps = SeparatorPrimitive.Props & ExtraSeparatorProps;

function Separator({
  className,
  orientation = "horizontal",
  label,
  signatureText,
  showSignature,
  children,
  ...props
}: SeparatorProps) {
  const content =
    label ??
    children ??
    (signatureText || showSignature
      ? signatureText || profile.name.full
      : null);

  if (orientation === "horizontal" && content) {
    return (
      <div className="flex w-full items-center gap-4 py-2 select-none">
        <SeparatorPrimitive
          data-slot="separator"
          orientation="horizontal"
          className={cn("h-px flex-1 bg-primary/80", className)}
          {...props}
        />
        <span className="shrink-0 font-signature text-2xl tracking-wider text-primary sm:text-3xl">
          {content}
        </span>
        <SeparatorPrimitive
          data-slot="separator"
          orientation="horizontal"
          className={cn("h-px flex-1 bg-primary/80", className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-horizontal:bg-primary/80 data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
