import type { Metadata } from "next";

import { Container, PageNav, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";

export const metadata: Metadata = {
  title: "Privacy Policy | Aarab Nishchal",
};

export default async function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageNav />
      <RepeatSeparator />
      <Container id="Privacy Policy">
        <Title heading="Privacy Policy" />

        <div className="max-w-prose pb-16 pt-4 sm:pb-24 sm:pt-6 break-words font-para space-y-8 sm:space-y-10">
          <div>
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              <em className="not-italic">Last updated: 18 September 2026</em>
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              This policy applies to{" "}
              <strong className="font-semibold text-foreground">aarab.me</strong>
              , all subdomains of aarab.me, all pages under aarab.me/*, and every
              project published under{" "}
              <a
                href="https://github.com/aarabii"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                github.com/aarabii
              </a>{" "}
              that links to this page. If a specific project has its own privacy
              policy, that one applies instead of this one for that project.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Who this is
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              These sites and projects are built and maintained by Aarab, an
              individual developer. There is no company behind this, just one
              person building things.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              What data gets collected
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              None of these projects, tools, or web apps are built to collect
              personal data for their own sake, and nothing is sold to anyone.{" "}
              <strong className="font-semibold text-foreground">
                If a project stores any data, it&apos;s only what that specific
                project needs to function
              </strong>{" "}
              - for example, an account system needs an email, a scheduler needs
              event details, and so on. What gets stored depends entirely on what
              the individual project does.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              The main site at aarab.me does not collect anything directly. That
              said, infrastructure and analytics tools used to run and monitor the
              site, such as{" "}
              <strong className="font-semibold text-foreground">Vercel</strong> and{" "}
              <strong className="font-semibold text-foreground">
                Google Search Console
              </strong>
              , do their own standard collection in the background (things like
              page views, general location, browser and device info). That data is
              handled by those providers under their own policies, not by me
              directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Third-party services
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Most projects rely on external databases, APIs, or hosting tools to
              work at all (databases, auth providers, email services, hosting
              platforms, and similar). If your data passes through one of those,{" "}
              <strong className="font-semibold text-foreground">
                how that data is handled from that point on is the responsibility
                of that third party
              </strong>
              , not mine. I don&apos;t control their servers, their retention
              policies, or what they do internally.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Before signing up for or using any project on any of these sites,
              you should check the privacy policy and terms of whatever
              third-party tool or service that specific project uses. If a
              project&apos;s page doesn&apos;t list which services it depends on
              and you want to know, ask.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              What I try to do on my end
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              I try to send as little data as possible to any third-party tool a
              project relies on - only what&apos;s actually needed for the feature
              to work. I&apos;m not trying to build a data profile on anyone, and
              there&apos;s no advertising or resale of user data happening on my
              end.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Your responsibility
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              If you&apos;re concerned about your data, the honest answer is: read
              the privacy policy of the specific third-party tools each project
              uses before you sign up or use it. I&apos;ll flag the major ones
              where I can, but I can&apos;t guarantee I&apos;ll always remember to,
              and their policies can change independently of anything I do.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Changes to this policy
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              This page can be updated at any time without prior notice. Continued
              use of any project after an update means you&apos;ve accepted the
              current version.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Contact
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              Questions about this policy or about a specific project&apos;s data
              handling:
            </p>
            <ul className="my-4 space-y-2 text-base leading-relaxed text-muted-foreground list-disc pl-5 marker:text-muted-foreground/60">
              <li className="pl-1">
                Email:{" "}
                <a
                  href="mailto:hi@aarab.me"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  hi@aarab.me
                </a>{" "}
                or{" "}
                <a
                  href="mailto:hello@aarab.me"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  hello@aarab.me
                </a>
              </li>
              <li className="pl-1">
                GitHub: open an issue on the relevant repo at{" "}
                <a
                  href="https://github.com/aarabii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4 decoration-border transition-colors duration-150 hover:text-muted-foreground hover:decoration-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
                >
                  github.com/aarabii
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
}
