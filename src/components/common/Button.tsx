import Link from "next/link";
import React, { FC, Fragment } from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  newTab?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  href,
  className = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  onClick,
  newTab,
}) => {
  return (
    <Fragment>
      {href ? (
        newTab ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {children}
          </Link>
        ) : (
          <Link href={href} passHref className={className} onClick={onClick}>
            {children}
          </Link>
        )
      ) : (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </Fragment>
  );
};
