"use client";

import { useRouter } from "next/navigation";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";

import { IoDocumentText } from "react-icons/io5";

import { mainNav, moreNav, homeSections, projectNav } from "@/constant";
import { useIsMac } from "@/hooks/useIsMac";

interface CommandMenuProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    mode?: "dialog" | "inline";
}

export const CommandMenu = ({
    open,
    onOpenChange,
    mode = "inline",
}: CommandMenuProps) => {
    const router = useRouter();
    const isMac = useIsMac();

    const handleNavigate = (href: string) => {
        onOpenChange?.(false);
        router.push(href);
    };

    const commandContent = (
        <>
            <CommandInput placeholder="Type a command or search..." />

            <CommandSeparator />

            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Home">
                    {homeSections.map((item) => (
                        <CommandItem
                            onSelect={() => {
                                onOpenChange?.(false);
                                const el = document.getElementById(
                                    item.href.replace("#", ""),
                                );
                                el?.scrollIntoView({ behavior: "smooth" });
                            }}
                            key={item.href}
                        >
                            {item.label}
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Navigation">
                    {mainNav.map((item) => (
                        <CommandItem
                            onSelect={() => handleNavigate(item.href)}
                            key={item.href}
                        >
                            {item.icons && <item.icons />}
                            <span>{item.label}</span>

                            <CommandShortcut>
                                <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>

                                {item.shift && (
                                    <>
                                        <span>+</span>
                                        <Kbd>Shift</Kbd>
                                    </>
                                )}
                                <span>+</span>

                                <Kbd>{item.shortcut?.toUpperCase()}</Kbd>
                            </CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="More">
                    {moreNav.map((item) => (
                        <CommandItem
                            onSelect={() => handleNavigate(item.href)}
                            key={item.href}
                        >
                            {item.icons && <item.icons />}
                            <span>{item.label}</span>

                            <CommandShortcut>
                                <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>

                                {item.shift && (
                                    <>
                                        <span>+</span>
                                        <Kbd>Shift</Kbd>
                                    </>
                                )}
                                <span>+</span>

                                <Kbd>{item.shortcut?.toUpperCase()}</Kbd>
                            </CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Projects">
                    {projectNav.map((item) => (
                        <CommandItem
                            onSelect={() => handleNavigate(item.href)}
                            key={item.href}
                        >
                            <IoDocumentText className="text-foreground/80" />
                            <span className="text-foreground/80">projects</span>
                            / <span>{item.label}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </>
    );

    if (mode === "dialog") {
        return (
            <CommandDialog open={open} onOpenChange={onOpenChange}>
                <Command className="border-none shadow-none">
                    {commandContent}
                </Command>
            </CommandDialog>
        );
    }

    return (
        <Command className="max-w-sm rounded-lg border">
            {commandContent}
        </Command>
    );
};
