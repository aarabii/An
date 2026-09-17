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
  shift?: boolean;
}

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    type: "route",
    icons: FaHouse,
    shortcut: "g",
  },
  {
    label: "Projects",
    href: "/projects",
    type: "route",
    icons: FaBriefcase,
    shortcut: "j",
  },
  {
    label: "Blogs",
    href: "/blogs",
    type: "route",
    icons: FaNewspaper,
    shortcut: "w",
  },
  {
    label: "Contact",
    href: "/contact",
    type: "route",
    icons: FaPhone,
    shortcut: "c",
    shift: true,
  },
  {
    label: "Resume",
    href: "/resume",
    type: "route",
    icons: FaRegFileLines,
    shortcut: "v",
    shift: true,
  },
] satisfies NavItem[];

export const moreNav: NavItem[] = [
  {
    label: "Bookmarks",
    href: "/bookmarks",
    type: "route",
    icons: FaFolderOpen,
    shortcut: "a",
  },
  {
    label: "Recommendations",
    href: "/recommendations",
    type: "route",
    icons: FaStar,
    shortcut: "m",
    shift: true,
  },
] satisfies NavItem[];

export const recommendationsNav: NavItem[] = [
  { label: "Games", href: "/recommendations/games", type: "route" },
  { label: "Books", href: "/recommendations/books", type: "route" },
] satisfies NavItem[];

export const homeSections: NavItem[] = [
  { label: "About", href: "#about", type: "anchor" },
  { label: "Skills", href: "#skills", type: "anchor" },
  { label: "Experience", href: "#experience", type: "anchor" },
  { label: "Projects", href: "#projects", type: "anchor" },
  { label: "Blogs", href: "#blogs", type: "anchor" },
  { label: "Contact", href: "#contact", type: "anchor" },
] satisfies NavItem[];

import { getFeaturedProjects, getFeaturedBlogs } from "@/sanity/lib/queries";

/**
 * Dynamically fetches all featured projects and returns them as navigation items.
 */
export async function getProjectNav(): Promise<NavItem[]> {
  try {
    const projects = await getFeaturedProjects();
    if (!projects || projects.length === 0) return [];
    return projects.map((project) => ({
      label: project.title,
      href: `/projects/${project.slug}`,
      type: "route",
    }));
  } catch (error) {
    console.error("Error loading dynamic project navigation:", error);
    return [];
  }
}

/**
 * Dynamically fetches all featured blogs and returns them as navigation items.
 */
export async function getBlogNav(): Promise<NavItem[]> {
  try {
    const blogs = await getFeaturedBlogs();
    if (!blogs || blogs.length === 0) return [];
    return blogs.map((blog) => ({
      label: blog.title,
      href: `/blogs/${blog.slug}`,
      type: "route",
    }));
  } catch (error) {
    console.error("Error loading dynamic blog navigation:", error);
    return [];
  }
}

/**
 * Backward compatibility aliases for dynamic navigation functions
 */
export const projectNav = getProjectNav;
export const blogNav = getBlogNav;
