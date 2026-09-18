import { Section, Text, Row, Column } from "react-email";

export interface EmailBodyProps {
  recipientName: string;
  displayEmail: string;
  displayMessage: string;
  displayReason: string;
}

export const EmailBody = ({
  recipientName,
  displayEmail,
  displayMessage,
  displayReason,
}: EmailBodyProps) => {
  return (
    <>
      <Section className="px-7 py-2">
        <Text className="font-sans text-[15px] font-semibold text-foreground m-0 mb-4">
          Hey {recipientName},
        </Text>

        <Text className="font-sans text-[14px] leading-6 text-foreground-secondary m-0 mb-4">
          Your message just landed. I read it, I didn&apos;t ignore it, and
          I&apos;m not a chatbot pretending to be excited about your email
          (I&apos;m a person, genuinely pretending to be excited about your
          email).
        </Text>

        <Text className="font-sans text-[14px] leading-6 text-foreground-secondary m-0 mb-5">
          Here&apos;s the deal: I go through these in order, not by who flatters
          me the most. So sit tight, I&apos;ll get back to you within a day or
          two. If it&apos;s been longer than that, either I&apos;m buried in
          work or something broke, and either way, feel free to poke me again.
        </Text>
      </Section>

      {/* Message Details / Transmission Summary Card */}
      <Section className="px-7 py-1">
        <Section className="bg-card border border-solid border-border rounded-md p-5">
          <Row align="left">
            <Column className="w-full">
              <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted m-0 mb-3">
                YOUR SUBMISSION DETAILS
              </Text>
            </Column>
          </Row>

          <Section className="mb-2">
            <Row align="left">
              <Column className="w-25 align-top">
                <Text className="font-mono text-[12px] text-muted m-0">
                  NAME:
                </Text>
              </Column>
              <Column className="align-top">
                <Text className="font-sans text-[13px] font-semibold text-foreground m-0">
                  {recipientName}
                </Text>
              </Column>
            </Row>
          </Section>

          <Section className="mb-2">
            <Row align="left">
              <Column className="w-25 align-top">
                <Text className="font-mono text-[12px] text-muted m-0">
                  EMAIL:
                </Text>
              </Column>
              <Column className="align-top">
                <Text className="font-mono text-[12px] text-foreground m-0">
                  {displayEmail}
                </Text>
              </Column>
            </Row>
          </Section>

          <Section className={displayMessage ? "mb-3" : "mb-0"}>
            <Row align="left">
              <Column className="w-25 align-top">
                <Text className="font-mono text-[12px] text-muted m-0">
                  TOPIC:
                </Text>
              </Column>
              <Column className="align-top">
                <Text className="font-sans text-[13px] font-medium text-accent m-0">
                  {displayReason}
                </Text>
              </Column>
            </Row>
          </Section>

          {displayMessage && (
            <Section className="pt-3 border-t border-solid border-border-subtle">
              <Text className="font-mono text-[11px] text-muted uppercase tracking-wider m-0 mb-1">
                MESSAGE COPY:
              </Text>
              <Text className="font-sans text-[13px] leading-5 text-foreground-secondary italic bg-card-subtle p-3 rounded border border-solid border-border-subtle m-0">
                &ldquo;{displayMessage}&rdquo;
              </Text>
            </Section>
          )}
        </Section>
      </Section>

      {/* Next Steps / Snooping Prompt */}
      <Section className="px-7 pt-5 pb-2">
        <Text className="font-sans text-[14px] leading-6 text-foreground-secondary m-0">
          In the meantime, snoop around the site if you haven&apos;t already.
          There&apos;s more where this came from.
        </Text>
      </Section>
    </>
  );
};
