import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";

import { EmailTemplate } from "@/components/template/Email";

export async function POST(request: Request) {
  const body = await request.json();
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

  const htmlContent = await pretty(
    await render(
      EmailTemplate({
        userName: senderName,
        contactReason: reasonToContact,
        userMessage: senderMsg,
      })
    )
  );

  const message = {
    from: `"Aarab Nishchal - Contact Team" <${process.env.email_from}>`,
    to: `${senderName} <${senderEmail}>`,
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
      {
        message: `Email has been sent to ${senderEmail} successfully`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Error sending email to ${senderEmail}:`, err);
    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      { status: 500 }
    );
  }
}
