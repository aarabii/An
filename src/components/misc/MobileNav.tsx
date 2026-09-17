"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { mainNav, moreNav, projectNav } from "@/constant";

export const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Lock page scroll only when the mobile sidebar menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Auto-close menu if resized to desktop viewport
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        aria-label="Open navigation menu"
                    />
                }
            >
                <Menu size={18} />
            </SheetTrigger>

            <SheetContent side="right" showCloseButton>
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription className="sr-only">
                        Site navigation links
                    </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-1 px-6 pb-6">
                    {mainNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                data-active={isActive || undefined}
                                className="flex items-center gap-3 rounded-md px-3 py-3 font-para text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground data-active:bg-accent data-active:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                {item.icons && (
                                    <item.icons className="size-4 text-muted-foreground" />
                                )}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <Separator className="my-2" />

                    <p className="px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        More
                    </p>

                    {moreNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                data-active={isActive || undefined}
                                className="flex items-center gap-3 rounded-md px-3 py-3 font-para text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground data-active:bg-accent data-active:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                {item.icons && (
                                    <item.icons className="size-4 text-muted-foreground" />
                                )}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <Separator className="my-2" />

                    <p className="px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Projects
                    </p>

                    {projectNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                data-active={isActive || undefined}
                                className="flex items-center gap-3 rounded-md px-3 py-3 font-para text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground data-active:bg-accent data-active:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <span className="text-muted-foreground">
                                    projects
                                </span>
                                / <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
};
