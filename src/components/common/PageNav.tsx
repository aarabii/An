"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Container } from "@/components/common";
import { cn } from "@/lib/utils";

export interface PageNavItem {
  label: string;
  href?: string;
}

export interface PageNavProps {
  items?: PageNavItem[];
  className?: string;
}

const formatSegment = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PageNav: React.FC<PageNavProps> = ({ items, className }) => {
  const pathname = usePathname();

  const breadcrumbItems = React.useMemo(() => {
    if (items && items.length > 0) return items;

    const segments = pathname.split("/").filter(Boolean);
    const generated: PageNavItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      generated.push({
        label: formatSegment(segment),
        href: isLast ? undefined : currentPath,
      });
    });

    return generated;
  }, [items, pathname]);

  return (
    <Container
      id="page-nav"
      className={cn("px-6 sm:px-10 py-4 font-mono text-xs", className)}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={item.href} />}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  );
};

export default PageNav;
