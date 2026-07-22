import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";
import { isValidEmail } from "@/lib/validators";

import { EmailTemplate } from "@/Template/Email";
import { rateLimit } from "@/lib/rate-limit";

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

const ALLOWED_ORIGINS = [
  "https://aarab.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://aarab.me",
  "https://www.aarab.me",
];

export async function POST(request: NextRequest) {
  const origin =
    request.headers.get("origin") || request.headers.get("referer") || "";
  const isAllowed = ALLOWED_ORIGINS.some((allowed) =>
    origin.startsWith(allowed),
  );

  if (!isAllowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { success: withinLimit, remaining } = rateLimit(ip, {
    maxRequests: 10, // 3 req
    windowMs: 60 * 60 * 1000, // 1 hour
  });

  if (!withinLimit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "3600" },
      },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { senderName, senderEmail, reasonToContact, senderMsg } = body;

  if (
    !senderName ||
    !senderEmail ||
    !reasonToContact ||
    !senderMsg ||
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof reasonToContact !== "string" ||
    typeof senderMsg !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  if (senderName.length > 100) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (senderEmail.length > 254) {
    return NextResponse.json({ error: "Email is too long" }, { status: 400 });
  }
  if (reasonToContact.length > 100) {
    return NextResponse.json({ error: "Reason is too long" }, { status: 400 });
  }
  if (senderMsg.length > 2000) {
    return NextResponse.json(
      { error: "Message is too long (max 2000 characters)" },
      { status: 400 },
    );
  }

  const cleanName = sanitize(senderName);
  const cleanEmail = sanitize(senderEmail);
  const cleanReason = sanitize(reasonToContact);
  const cleanMsg = sanitize(senderMsg);

  if (!isValidEmail(cleanEmail)) {
    return NextResponse.json(
      { error: "Email format is not valid" },
      { status: 400 },
    );
  }

  const htmlContent = await pretty(
    await render(
      EmailTemplate({
        userName: cleanName,
        contactReason: cleanReason,
        userMessage: cleanMsg,
      }),
    ),
  );

  const message = {
    from: `"Aarab Nishchal - Contact" <${process.env.email_from}>`,
    to: `${cleanName} <${cleanEmail}>`,
    subject: "Your message has landed! 🚀 We'll get back to you shortly",
    html: htmlContent,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email_from,
      pass: process.env.email_password,
    },
  });

  try {
    await transporter.sendMail(message);
    return NextResponse.json(
      { message: "Email sent successfully" },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      },
    );
  } catch (err) {
    console.error(
      "Email send error:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
