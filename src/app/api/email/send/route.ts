import dns from "node:dns/promises";
import EmailTemplate from "@/components/template/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting map: identifier -> timestamp (ms)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30 seconds cooldown

function cleanupExpiredRateLimits(now: number) {
  for (const [key, timestamp] of rateLimitMap.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(key);
    }
  }
}

function checkRateLimit(key: string): { limited: boolean; remainingSeconds: number } {
  const now = Date.now();
  cleanupExpiredRateLimits(now);

  const lastRequest = rateLimitMap.get(key);
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    const remainingSeconds = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - lastRequest)) / 1000
    );
    return { limited: true, remainingSeconds };
  }

  return { limited: false, remainingSeconds: 0 };
}

function recordRateLimit(keys: string[]) {
  const now = Date.now();
  for (const key of keys) {
    rateLimitMap.set(key, now);
  }
}

export async function isEmailDomainValid(email: string) {
  const domain = email.split("@")[1]?.trim();

  if (!domain) return false;

  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Check IP-based rate limit
    const ipCheck = checkRateLimit(`ip:${ip}`);
    if (ipCheck.limited) {
      return Response.json(
        {
          error: `Please wait ${ipCheck.remainingSeconds}s before sending another message.`,
          retryAfter: ipCheck.remainingSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(ipCheck.remainingSeconds),
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return Response.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { sender_name, sender_email, sender_message, sender_reason } = body;

    if (!sender_name || !sender_email || !sender_message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Check email-based rate limit
    const emailKey = `email:${sender_email.toLowerCase().trim()}`;
    const emailCheck = checkRateLimit(emailKey);
    if (emailCheck.limited) {
      return Response.json(
        {
          error: `Please wait ${emailCheck.remainingSeconds}s before sending another message.`,
          retryAfter: emailCheck.remainingSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(emailCheck.remainingSeconds),
          },
        }
      );
    }

    // 3. Verify that the email domain has valid MX records
    const hasValidMx = await isEmailDomainValid(sender_email);
    if (!hasValidMx) {
      return Response.json(
        {
          error:
            "Invalid email domain. Please enter a valid email address with active mail servers.",
        },
        { status: 400 }
      );
    }

    // 4. Send transactional confirmation email via Resend with BCC to site owner
    const { data, error } = await resend.emails.send({
      from: "Aarab Nishchal <no-reply@aarab.me>",
      to: sender_email,
      bcc: ["hello@aarab.me", "aarab.nishchal@gmail.com"],
      replyTo: "hi@aarab.me",
      subject: "You reached me. Bold move.",
      react: EmailTemplate({
        senderName: sender_name,
        email: sender_email,
        senderEmail: sender_email,
        message: sender_message,
        reason: sender_reason,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // 5. Update rate limit timestamps on successful dispatch
    recordRateLimit([`ip:${ip}`, emailKey]);

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
