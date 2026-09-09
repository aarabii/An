import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "docs",
      "aarab_nishchal_resume.pdf"
    );

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Aarab_Nishchal_Resume.pdf"',
        "Cache-Control":
          "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
        "X-Robots-Tag": "index, follow, max-snippet:-1",
      },
    });
  } catch (error) {
    console.error("Error serving direct resume PDF:", error);
    return new NextResponse("Resume file not found", { status: 404 });
  }
}

export async function HEAD() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "docs",
      "aarab_nishchal_resume.pdf"
    );
    const stat = fs.statSync(filePath);

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(stat.size),
        "Content-Disposition": 'inline; filename="Aarab_Nishchal_Resume.pdf"',
        "Cache-Control":
          "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
        "X-Robots-Tag": "index, follow, max-snippet:-1",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
