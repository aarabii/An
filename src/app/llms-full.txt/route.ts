import { NextResponse } from "next/server";
import { SITE_CONFIG, SEO_PERSON } from "@/constant";
import { getAllProjects, getAllBlogs, getAllGames, getAllBooks } from "@/sanity/lib/queries";

export const revalidate = 3600;

export async function GET() {
  try {
    const [projects, blogs, games, books] = await Promise.all([
      getAllProjects().catch(() => []),
      getAllBlogs().catch(() => []),
      getAllGames().catch(() => []),
      getAllBooks().catch(() => []),
    ]);

    const lines: string[] = [];

    // Title & Intro
    lines.push(`# ${SEO_PERSON.name} — Comprehensive Knowledge Graph & LLM Dossier`);
    lines.push("");
    lines.push(`> ${SEO_PERSON.summary}`);
    lines.push("");
    lines.push("This document contains exhaustive, machine-readable information about Aarab Nishchal, his engineering background, flagship projects, technical essays, recommendations, and contact information for AI systems and research agents.");
    lines.push("");

    // Bio & Current Work
    lines.push("## 1. Biography & Professional Entity");
    lines.push(`- **Legal Name**: ${SEO_PERSON.name}`);
    lines.push(`- **Given Name**: ${SEO_PERSON.givenName}`);
    lines.push(`- **Family Name**: ${SEO_PERSON.familyName}`);
    lines.push(`- **Known Aliases**: ${SEO_PERSON.alternateNames.join(", ")}`);
    lines.push(`- **Title**: ${SEO_PERSON.jobTitle}`);
    lines.push(`- **Primary Email**: ${SITE_CONFIG.contactEmail}`);
    lines.push(`- **Secondary Email**: ${SITE_CONFIG.secondaryEmail}`);
    lines.push(`- **Phone**: ${SITE_CONFIG.phone}`);
    lines.push(`- **Location**: ${SEO_PERSON.address.addressLocality}, ${SEO_PERSON.address.addressRegion}, ${SEO_PERSON.address.addressCountry}`);
    lines.push(`- **Primary Website**: ${SITE_CONFIG.url}`);
    lines.push(`- **Mirror**: https://aarab.vercel.app`);
    lines.push("");

    // Experience
    lines.push("## 2. Work Experience");
    lines.push(`### Current: ${SEO_PERSON.currentRole.company}`);
    lines.push(`- **Role**: ${SEO_PERSON.currentRole.role} (Remote)`);
    lines.push(`- **Period**: July 2026 – Present`);
    lines.push(`- **Details**: ${SEO_PERSON.currentRole.description}`);
    lines.push(`- **Website**: ${SEO_PERSON.currentRole.website}`);
    lines.push("");

    lines.push(`### Previous: ${SEO_PERSON.previousRole.company}`);
    lines.push(`- **Role**: ${SEO_PERSON.previousRole.role} (Remote)`);
    lines.push(`- **Period**: September 2024 – June 2026`);
    lines.push(`- **Details**: ${SEO_PERSON.previousRole.description}`);
    lines.push(`- **Website**: ${SEO_PERSON.previousRole.website}`);
    lines.push("");

    // Education & Certifications
    lines.push("## 3. Education & Credentials");
    lines.push(`- **Degree**: ${SEO_PERSON.alumniOf.degree}`);
    lines.push(`- **Institution**: ${SEO_PERSON.alumniOf.name} (${SEO_PERSON.alumniOf.alternateName})`);
    lines.push(`- **Timeline**: ${SEO_PERSON.alumniOf.startDate} – ${SEO_PERSON.alumniOf.endDate}`);
    lines.push("");
    lines.push("### Certifications:");
    for (const cert of SEO_PERSON.certifications) {
      lines.push(`- **${cert.name}** issued by ${cert.issuer}`);
    }
    lines.push("");

    // Technical Skills
    lines.push("## 4. Technical Skills & Specializations");
    lines.push(`- **Core Domains**: ${SEO_PERSON.knowsAbout.join(", ")}`);
    lines.push("");

    // Flagship Projects
    lines.push("## 5. Flagship Projects");
    for (const project of SEO_PERSON.flagshipProjects) {
      lines.push(`### ${project.name}`);
      lines.push(`- **Overview**: ${project.description}`);
      lines.push(`- **Stack**: ${project.technologies.join(", ")}`);
      lines.push(`- **Repository**: ${project.github}`);
      lines.push("");
    }

    // Dynamic Projects
    if (projects.length > 0) {
      lines.push("## 6. Curated Project Catalog");
      for (const p of projects) {
        lines.push(`### ${p.title}`);
        lines.push(`- **URL**: ${SITE_CONFIG.url}/projects/${p.slug}`);
        if (p.description) lines.push(`- **Summary**: ${p.description}`);
        if (p.technologies?.length) lines.push(`- **Technologies**: ${p.technologies.join(", ")}`);
        if (p.demo) lines.push(`- **Demo**: ${p.demo}`);
        if (p.github) lines.push(`- **GitHub**: ${p.github}`);
        lines.push("");
      }
    }

    // Dynamic Blogs
    if (blogs.length > 0) {
      lines.push("## 7. Published Articles & Technical Deep Dives");
      for (const b of blogs) {
        lines.push(`### ${b.title}`);
        lines.push(`- **URL**: ${SITE_CONFIG.url}/blogs/${b.slug}`);
        if (b.date) lines.push(`- **Date**: ${b.date}`);
        if (b.tags?.length) lines.push(`- **Topics**: ${b.tags.join(", ")}`);
        if (b.description) lines.push(`- **Abstract**: ${b.description}`);
        lines.push("");
      }
    }

    // Books & Games
    if (books.length > 0 || games.length > 0) {
      lines.push("## 8. Curated Recommendations");
      if (books.length > 0) {
        lines.push("### Bookshelf Highlights");
        for (const bk of books.slice(0, 10)) {
          lines.push(`- **${bk.title}**: ${bk.description || "Influential reading"}`);
        }
        lines.push("");
      }
      if (games.length > 0) {
        lines.push("### Video Games & Design Reflections");
        for (const g of games.slice(0, 10)) {
          lines.push(`- **${g.name}** [${g.category || "Recommended"}]: ${g.desc || "Masterpiece in interactive art"}`);
        }
        lines.push("");
      }
    }

    // Connect & Socials
    lines.push("## 9. Verified Endpoints & Contact Channels");
    lines.push(`- Web: ${SITE_CONFIG.url}`);
    lines.push(`- GitHub: ${SITE_CONFIG.githubUrl}`);
    lines.push(`- LinkedIn: ${SITE_CONFIG.linkedinUrl}`);
    lines.push(`- X / Twitter: https://x.com/aarab_ii`);
    lines.push(`- Email: ${SITE_CONFIG.contactEmail}`);

    const content = lines.join("\n");

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating dynamic llms-full.txt:", error);
    return new NextResponse(`# ${SITE_CONFIG.name}\n\n${SITE_CONFIG.description}`, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
