"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

import Container from "./Container";
import { MobileNav } from "../mics/MobileNav";
import { CommandMenu } from "@/components/mics/CommandMenu";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { PERSONAL_INFO } from "@/constant";
import { useIsMac } from "@/hooks/useIsMac";
import { useCommand } from "@/hooks/useCommand";

const Navbar = () => {
    const [commandOpen, setCommandOpen] = useState(false);
    const isMac = useIsMac();

    const toggleCommand = useCallback(() => {
        setCommandOpen((prev) => !prev);
    }, []);

    useCommand({ onCmdOpn: toggleCommand });

    return (
        <>
            <nav className="bg-background sticky top-0 isolate z-50 pt-1">
                <Container>
                    <div className="before:bg-border after:bg-border relative flex w-full items-center justify-between gap-2 px-4 py-3 before:absolute before:top-0 before:left-1/2 before:z-1 before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-1 after:h-px after:w-screen after:-translate-x-1/2 after:content-['']">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/images/logo.svg"
                                alt={`${PERSONAL_INFO.firstName} logo`}
                                width={24}
                                height={24}
                                className="size-6"
                            />
                            <span className="font-heading text-lg uppercase tracking-wide">
                                {PERSONAL_INFO.firstName}.
                            </span>
                        </Link>

                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href="/resume"
                                className="text-sm font-light underline-offset-5 hover:underline"
                            >
                                Resume
                            </Link>

                            <span className="bg-border h-4 w-px" />

                            <Button
                                onClick={() => setCommandOpen(true)}
                                variant="outline"
                                size="sm"
                                className="cursor-pointer rounded-full"
                            >
                                <Search data-icon="inline-start" />
                                {isMac ? "⌘" : "Ctrl"} + K
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <MobileNav />
                        </div>
                    </div>
                </Container>
            </nav>

            <CommandMenu
                open={commandOpen}
                onOpenChange={setCommandOpen}
                mode="dialog"
            />
        </>
    );
};

export default Navbar;
