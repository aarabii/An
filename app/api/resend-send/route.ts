import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail } from "@/lib/validators";
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

const resend = new Resend(process.env.RESEND_API_KEY);

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
    maxRequests: 10,
    windowMs: 60 * 60 * 1000,
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

  const heyMsgs = [
    "Hey",
    "Hello",
    "Hi",
    "Hey there",
    "Hello there",
    "Yo",
    "Howdy",
    "What's up?",
    "Hey hey",
    "Hi there",
    "Greetings",
    "Well, hello",
    "Hey stranger",
    "Oh, hey",
    "Sup?",
    "Hola",
    "Namaste",
    "Look who's here",
    "Fancy seeing you here",
    "You made it",
  ];

  const heyMsg = heyMsgs[Math.floor(Math.random() * heyMsgs.length)];

  if (!isValidEmail(cleanEmail)) {
    return NextResponse.json(
      { error: "Email format is not valid" },
      { status: 400 },
    );
  }

  try {
    const fromAddress =
      process.env.RESEND_FROM_EMAIL ||
      "Aarab Nishchal <no-reply@contact.aarab.me>";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [cleanEmail],
      subject: `Your message made it through ${cleanName}`,
      template: {
        id: "d3f112a6-877b-4c29-84f8-6a424df26550",
        variables: {
          USER_NAME: cleanName,
          Reason: cleanReason,
          Message: cleanMsg,
          Hey: heyMsg,
        },
      },
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email via Resend" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      },
    );
  } catch (err) {
    console.error(
      "Resend unexpected error:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
