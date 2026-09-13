import type { IconType } from "react-icons";

export type NavType = "anchor" | "route" | "external";

import {
    FaHouse,
    FaBriefcase,
    FaNewspaper,
    FaPhone,
    FaRegFileLines,
    FaFolderOpen,
    FaStar,
} from "react-icons/fa6";

export interface NavItem {
    label: string;
    href: string;
    type: NavType;
    icons?: IconType;
    shortcut?: string;
}

export const mainNav: NavItem[] = [
    {
        label: "Home",
        href: "/",
        type: "route",
        icons: FaHouse,
        shortcut: "backspace",
    },
    {
        label: "Projects",
        href: "/projects",
        type: "route",
        icons: FaBriefcase,
        shortcut: "p",
    },
    {
        label: "Blogs",
        href: "/blogs",
        type: "route",
        icons: FaNewspaper,
        shortcut: "b",
    },
    {
        label: "Contact",
        href: "/contact",
        type: "route",
        icons: FaPhone,
        shortcut: "c",
    },
    {
        label: "Resume",
        href: "/resume",
        type: "route",
        icons: FaRegFileLines,
        shortcut: "/",
    },
];

export const moreNav: NavItem[] = [
    {
        label: "Resources",
        href: "/resources",
        type: "route",
        icons: FaFolderOpen,
        shortcut: "r",
    },
    {
        label: "Recommendations",
        href: "/recommendations",
        type: "route",
        icons: FaStar,
        shortcut: "s",
    },
];

export const homeSections: NavItem[] = [
    { label: "About", href: "#about", type: "anchor" },
    { label: "Skills", href: "#skills", type: "anchor" },
    { label: "Experience", href: "#experience", type: "anchor" },
    { label: "Projects", href: "#projects", type: "anchor" },
    { label: "Blogs", href: "#blogs", type: "anchor" },
    { label: "Contact", href: "#contact", type: "anchor" },
];
