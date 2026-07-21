import { ReactNode } from "react";

interface CornerFrameProps {
  children: ReactNode;
}

export const CornerFrame = ({ children }: CornerFrameProps) => {
  return (
    <div className="relative inline-flex min-h-12 items-center px-4 py-2">
      {/* Top-left & Top-right corners */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
      before:absolute before:top-0 before:left-0
      before:size-3 before:border-t-2 before:border-l-2
      before:border-primary
      after:absolute after:top-0 after:right-0
      after:size-3 after:border-t-2 after:border-r-2
      after:border-primary"
      />

      {/* Bottom-left & Bottom-right corners */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
      before:absolute before:bottom-0 before:left-0
      before:size-3 before:border-b-2 before:border-l-2
      before:border-primary
      after:absolute after:right-0 after:bottom-0
      after:size-3 after:border-r-2 after:border-b-2
      after:border-primary"
      />
      {children}
    </div>
  );
};
