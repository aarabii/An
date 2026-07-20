interface EmailTemplateProps {
  userName: string;
  contactReason: string;
  userMessage: string;
}

export function EmailTemplate({
  userName,
  contactReason,
  userMessage,
}: EmailTemplateProps) {
  return (
    <html>
      <body>
        <p>
          <strong>Name:</strong> {userName}
        </p>
        <p>
          <strong>Reason for Contact:</strong> {contactReason}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <p>{userMessage}</p>
      </body>
    </html>
  );
}
