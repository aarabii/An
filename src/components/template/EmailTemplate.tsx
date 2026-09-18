import { Body, Container, Head, Html, Preview, Tailwind } from "react-email";

import { emailTailwindConfig, EmailFonts } from "./EmailFonts";
import { Emailhead } from "./_components/EmailHead";
import { EmailBody } from "./_components/EmailBody";
import { EmailSocial } from "./_components/EmailSocial";
import { EmailSignOff } from "./_components/EmailSignOff";
import { EmailNavigation } from "./_components/EmailNavigation";
import { EmailFooter } from "./_components/EmailFooter";

export interface EmailTemplateProps {
  senderName: string;
  email?: string;
  senderEmail?: string;
  reason?: string;
  message?: string;
}

export const EmailTemplate = ({
  senderName,
  email,
  senderEmail,
  reason,
  message,
}: EmailTemplateProps) => {
  const recipientName = senderName?.trim() || "there";
  const displayEmail = email?.trim() || senderEmail?.trim() || "Not provided";
  const displayReason = reason?.trim() || "General Inquiry";
  const displayMessage = message?.trim() || "";

  return (
    <Html lang="en" dir="ltr">
      <Tailwind config={emailTailwindConfig}>
        <Head>
          <EmailFonts />
        </Head>

        <Body className="bg-background text-foreground font-sans m-0 p-0">
          <Preview>Your message just landed | Aarab Nishchal</Preview>

          <Container className="bg-surface mx-auto max-w-155 my-8 border border-solid border-border rounded-lg overflow-hidden">
            {/* Top Brand Header */}
            <Emailhead />
            {/* Conversational Body */}
            <EmailBody
              recipientName={recipientName}
              displayEmail={displayEmail}
              displayMessage={displayMessage}
              displayReason={displayReason}
            />
            {/* Social Text Links from social.ts */}
            <EmailSocial />
            {/* Sign-off */}
            <EmailSignOff />
            {/* Navigation / Exploration Section */}
            <EmailNavigation />
            {/* Footer */}
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
