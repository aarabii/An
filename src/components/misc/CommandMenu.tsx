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
import { FaRegFileLines, FaNewspaper, FaGamepad } from "react-icons/fa6";

import {
  mainNav,
  moreNav,
  homeSections,
  recommendationsNav,
  type NavItem,
} from "@/constant";
import { useIsMac } from "@/hooks/useIsMac";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: "dialog" | "inline";
  projectNav?: NavItem[];
  blogNav?: NavItem[];
}

export const CommandMenu = ({
  open,
  onOpenChange,
  mode = "inline",
  projectNav = [],
  blogNav = [],
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
                const el = document.getElementById(item.href.replace("#", ""));
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

          <CommandSeparator />

          {recommendationsNav.map((item) => (
            <CommandItem
              onSelect={() => handleNavigate(item.href)}
              key={item.href}
            >
              <FaGamepad className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Recommendations
              </span>/ <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {projectNav.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projectNav.map((item) => (
                <CommandItem
                  onSelect={() => handleNavigate(item.href)}
                  key={item.href}
                >
                  <FaRegFileLines className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">projects</span>/{" "}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {blogNav.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Blogs">
              {blogNav.map((item) => (
                <CommandItem
                  onSelect={() => handleNavigate(item.href)}
                  key={item.href}
                >
                  <FaNewspaper className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">blogs</span>/{" "}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </>
  );

  if (mode === "dialog") {
    return (
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <Command className="border-none shadow-none">{commandContent}</Command>
      </CommandDialog>
    );
  }

  return (
    <Command className="max-w-sm rounded-lg border border-border shadow-sm">
      {commandContent}
    </Command>
  );
};
