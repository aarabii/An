import { NextResponse } from "next/server";
import { profile } from "@/constant/profile";
import { experience } from "@/constant/experience";
import { selected_works, works } from "@/constant/projects";
import { skillsData } from "@/constant/skills";
import { socials } from "@/constant/social";
import { SITE_SEO, PAGE_SEO } from "@/constant/seo";
import { getAllPosts } from "@/lib/notion";

export const revalidate = 3600; // Revalidate dynamic llms.txt hourly

export async function GET() {
  const baseUrl = SITE_SEO.siteUrl;

  // 1. Executive Summary & Header
  let content = `# ${profile.name.full} — ${profile.work.title} & Full-Stack Developer\n\n`;
  content += `> ${SITE_SEO.defaultDescription}\n\n`;

  content += `## Executive Summary\n`;
  content += `- **Full Name**: ${profile.name.full}\n`;
  content += `- **Current Role**: ${profile.work.title} at ${profile.work.company}\n`;
  content += `- **Email**: ${profile.email}\n`;
  content += `- **Location**: ${profile.curr_location.city}, ${profile.curr_location.state}, India\n`;
  content += `- **Education**: ${profile.education.degree} in ${profile.education.major}, ${profile.education.uni} (${profile.education.batch})\n`;
  content += `- **Primary Portfolio**: ${baseUrl}\n`;
  content += `- **Personal Quote**: "${profile.quote}"\n\n`;

  // 2. About & Background
  content += `## About & Background\n`;
  profile.about.forEach((paragraph) => {
    content += `- ${paragraph}\n`;
  });
  content += `\n`;

  // 3. Technical Skills
  content += `## Technical Skills & Stack\n\n`;
  skillsData.forEach((category) => {
    const skillList = category.data.map((item) => item.title).join(", ");
    content += `### ${category.title}\n`;
    content += `- ${skillList}\n\n`;
  });

  // 4. Professional Experience
  content += `## Professional Experience\n\n`;
  experience.forEach((exp) => {
    const endStr = exp.current
      ? "Present"
      : `${exp.endDate.mm} ${exp.endDate.yyyy}`;
    content += `### ${exp.role} — [${exp.company}](${exp.companySite})\n`;
    content += `- **Duration**: ${exp.startDate.mm} ${exp.startDate.yyyy} – ${endStr}\n`;
    content += `- **Technologies**: ${exp.technologies.join(", ")}\n`;
    content += `- **Key Responsibilities & Impact**:\n`;
    exp.description.forEach((desc) => {
      content += `  - ${desc}\n`;
    });
    content += `\n`;
  });

  // 5. Featured Projects & Selected Works
  content += `## Key Projects & Portfolio Highlights\n\n`;
  content += `### Featured Projects\n`;
  selected_works.forEach((project) => {
    const liveLink = project.links.live ? ` | [Live Demo](${project.links.live})` : "";
    const githubLink = project.links.github ? ` | [GitHub Code](${project.links.github})` : "";
    content += `- **${project.name}**${liveLink}${githubLink}\n`;
    content += `  - **Description**: ${project.description}\n`;
    content += `  - **Tech Stack**: ${project.technologies.join(", ")}\n`;
  });
  content += `\n`;

  content += `### Additional Notable Works\n`;
  works.forEach((project) => {
    const liveLink = project.links.live ? ` | [Live Demo](${project.links.live})` : "";
    const githubLink = project.links.github ? ` | [GitHub Code](${project.links.github})` : "";
    content += `- **${project.name}**${liveLink}${githubLink}\n`;
    content += `  - **Description**: ${project.description}\n`;
    content += `  - **Tech Stack**: ${project.technologies.join(", ")}\n`;
  });
  content += `\n`;

  // 6. Published Articles & Blog Posts from Notion
  content += `## Published Articles & Technical Writing\n\n`;
  try {
    const posts = await getAllPosts();
    if (posts.length > 0) {
      posts.forEach((post) => {
        const postUrl = `${baseUrl}/blogs/${post.slug}`;
        const dateStr = post.date ? new Date(post.date).toLocaleDateString() : "";
        content += `- [${post.title}](${postUrl})${dateStr ? ` (${dateStr})` : ""}: ${post.description || "Technical article by Aarab Nishchal"}\n`;
      });
    } else {
      content += `- [Blog & Articles Index](${baseUrl}/blogs): Technical articles and guides on Next.js, React, and AI engineering.\n`;
    }
  } catch {
    content += `- [Blog & Articles Index](${baseUrl}/blogs): Technical articles and guides on Next.js, React, and AI engineering.\n`;
  }
  content += `\n`;

  // 7. Social Links & Profiles
  content += `## Social Profiles & Handles\n`;
  socials.forEach((social) => {
    content += `- [${social.name}](${social.url}): @${social.handle}\n`;
  });
  content += `\n`;

  // 8. Site Structure & Navigation Index
  content += `## Site Navigation & Canonical Links\n`;
  content += `- [Home](${baseUrl}${PAGE_SEO.home.path}): ${PAGE_SEO.home.description}\n`;
  content += `- [Projects](${baseUrl}${PAGE_SEO.projects.path}): ${PAGE_SEO.projects.description}\n`;
  content += `- [Blogs](${baseUrl}${PAGE_SEO.blogs.path}): ${PAGE_SEO.blogs.description}\n`;
  content += `- [Resume](${baseUrl}${PAGE_SEO.resume.path}): ${PAGE_SEO.resume.description}\n`;
  content += `- [License](${baseUrl}${PAGE_SEO.license.path}): ${PAGE_SEO.license.description}\n`;
  content += `- [Sitemap](${baseUrl}/sitemap.xml): XML index of all public URLs.\n`;
  content += `- [Robots.txt](${baseUrl}/robots.txt): Search engine and AI crawler access rules.\n`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
