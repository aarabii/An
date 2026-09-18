import { NextResponse } from "next/server";
import { SITE_CONFIG, SEO_PERSON } from "@/constant";
import { getAllProjects, getAllBlogs } from "@/sanity/lib/queries";

export const revalidate = 3600;

export async function GET() {
  try {
    const [projects, blogs] = await Promise.all([
      getAllProjects().catch(() => []),
      getAllBlogs().catch(() => []),
    ]);

    const lines: string[] = [];

    // Header
    lines.push(`# ${SEO_PERSON.name}`);
    lines.push("");
    lines.push(`> ${SEO_PERSON.summary}`);
    lines.push("");

    // Identity & Entity Knowledge
    lines.push("## Professional Summary");
    lines.push(`- **Full Name**: ${SEO_PERSON.name}`);
    lines.push(`- **Job Title**: ${SEO_PERSON.jobTitle}`);
    lines.push(
      `- **Current Role**: ${SEO_PERSON.currentRole.role} at [${SEO_PERSON.currentRole.company}](${SEO_PERSON.currentRole.website}) (${SEO_PERSON.currentRole.description})`
    );
    lines.push(
      `- **Previous Role**: ${SEO_PERSON.previousRole.role} at [${SEO_PERSON.previousRole.company}](${SEO_PERSON.previousRole.website}) (${SEO_PERSON.previousRole.description})`
    );
    lines.push(
      `- **Education**: ${SEO_PERSON.alumniOf.degree}, ${SEO_PERSON.alumniOf.name} (${SEO_PERSON.alumniOf.startDate} - ${SEO_PERSON.alumniOf.endDate})`
    );
    lines.push(
      `- **Location**: ${SEO_PERSON.address.addressLocality}, ${SEO_PERSON.address.addressRegion}, ${SEO_PERSON.address.addressCountry}`
    );
    lines.push(`- **Canonical Website**: ${SITE_CONFIG.url}`);
    lines.push(`- **Primary Contact**: ${SITE_CONFIG.contactEmail}`);
    lines.push("");

    // Core Technical Stack
    lines.push("## Technical Proficiencies & Skills");
    lines.push(`- **Core Domains**: ${SEO_PERSON.knowsAbout.join(", ")}`);
    lines.push(
      `- **Certifications**: ${SEO_PERSON.certifications.map((c) => `${c.name} (${c.issuer})`).join(", ")}`
    );
    lines.push("");

    // Verified Links & Social Footprint
    lines.push("## Verified Social Profiles & Links");
    lines.push(`- **GitHub**: ${SITE_CONFIG.githubUrl}`);
    lines.push(`- **LinkedIn**: ${SITE_CONFIG.linkedinUrl}`);
    lines.push(`- **X (Twitter)**: https://x.com/aarab_ii`);
    lines.push(`- **LeetCode**: https://leetcode.com/u/aarabii`);
    lines.push(`- **Portfolio Vercel Mirror**: https://aarab.vercel.app`);
    lines.push("");

    // Flagship Systems
    lines.push("## Flagship Systems & Architectures");
    for (const project of SEO_PERSON.flagshipProjects) {
      lines.push(`### ${project.name}`);
      lines.push(`- **Description**: ${project.description}`);
      lines.push(`- **Technologies**: ${project.technologies.join(", ")}`);
      lines.push(`- **Source Code**: ${project.github}`);
      lines.push("");
    }

    // Dynamic Live Projects from Sanity
    if (projects.length > 0) {
      lines.push("## Curated Projects & Live Demos");
      for (const p of projects) {
        const url = `${SITE_CONFIG.url}/projects/${p.slug}`;
        const tech = p.technologies?.length ? ` (${p.technologies.join(", ")})` : "";
        lines.push(`- [${p.title}](${url})${tech}: ${p.description || "Production project"}`);
        if (p.demo) lines.push(`  - Live Demo: ${p.demo}`);
        if (p.github) lines.push(`  - Source Repository: ${p.github}`);
      }
      lines.push("");
    }

    // Dynamic Live Blogs from Sanity
    if (blogs.length > 0) {
      lines.push("## Technical Articles & Publications");
      for (const b of blogs) {
        const url = `${SITE_CONFIG.url}/blogs/${b.slug}`;
        const date = b.date ? ` [${b.date}]` : "";
        lines.push(`- [${b.title}](${url})${date}: ${b.description || "Engineering deep dive"}`);
      }
      lines.push("");
    }

    // Main Navigation Sections
    lines.push("## Site Architecture & Exploration");
    lines.push(`- [Projects](${SITE_CONFIG.url}/projects): All curated full-stack systems and GitHub repositories`);
    lines.push(`- [Blogs](${SITE_CONFIG.url}/blogs): Technical breakdowns on AI engineering and systems design`);
    lines.push(`- [Resume](${SITE_CONFIG.url}/resume): Interactive CV, verifiable background, and PDF download`);
    lines.push(`- [Contact](${SITE_CONFIG.url}/contact): Get in touch for engineering consulting and roles`);
    lines.push(`- [Recommendations](${SITE_CONFIG.url}/recommendations): Curated books and transformative video games`);
    lines.push(`- [Bookmarks](${SITE_CONFIG.url}/bookmarks): High-signal developer utilities and research`);
    lines.push(`- [Full LLM Context](${SITE_CONFIG.url}/llms-full.txt): Comprehensive deep context for LLMs`);

    const content = lines.join("\n");

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating dynamic llms.txt:", error);
    return new NextResponse(`# ${SITE_CONFIG.name}\n\n${SITE_CONFIG.description}\n\nVisit: ${SITE_CONFIG.url}`, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
