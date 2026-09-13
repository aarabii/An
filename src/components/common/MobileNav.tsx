"use client";

import { useState } from "react";
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

import { mainNav, moreNav } from "@/constant";

export const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

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

                <nav className="flex flex-col gap-0.5 px-4 pb-4">
                    {mainNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                data-active={isActive || undefined}
                                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted data-active:bg-muted data-active:font-medium"
                            >
                                {item.icons && (
                                    <item.icons className="size-4 text-muted-foreground" />
                                )}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <Separator className="my-2" />

                    <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
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
                                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted data-active:bg-muted data-active:font-medium"
                            >
                                {item.icons && (
                                    <item.icons className="size-4 text-muted-foreground" />
                                )}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
};
