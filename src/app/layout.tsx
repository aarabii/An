import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import data from "@/constants/details.json";

export const metadata: Metadata = {
  title: {
    template: "%s | Aarab Nishchal",
    default: "Aarab Nishchal",
  },
  description: data.desc,
  icons: [
    {
      rel: "icon",
      href: "/logo.svg",
      sizes: "any",
      url: "https://aarab.vercel.app/logo.svg",
    },
  ],
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://aarab.vercel.app"),
  keywords: [
    "Aarab",
    "Nishchal",
    "aarab nishchal",
    "react",
    "reactJs",
    "react portfolio",
    "portfolio",
    "portfolio website",
    "losier",
    "twexy",
    "caya",
  ],
  openGraph: {
    title: data.name,
    description: data.desc,
    url: "https://aarab.vercel.app",
    type: "website",
    images: [
      {
        url: "https://aarab.vercel.app/logo.svg",
        width: 800,
        height: 600,
        alt: `${data.name}'s Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${data.socials.username.twitter}`,
    title: data.name,
    description: data.desc,
    images: "https://aarab.vercel.app/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />        
        <link rel="canonical" href="https://aarab.vercel.app" />
        <link rel="author" href="/humans.txt" />
        <link rel="security" href="/.well-known/security.txt" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: data.name,
            givenName: data.first_name,
            familyName: data.last_name,
            jobTitle: data.jobTitle,
            worksFor: {
              "@type": "Organization",
              name: data.workFor,
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: data.location.city,
              addressRegion: data.location.state,
              addressCountry: data.location.country,
            },
            birthDate: `${data.DOB.yyyy}-${String(data.DOB.mm).padStart(
              2,
              "0"
            )}-${String(data.DOB.dd).padStart(2, "0")}`,
            email: data.email,
            sameAs: [
              data.socials.links.instagram,
              data.socials.links.linkedin,
              data.socials.links.github,
              data.socials.links.twitter,
              data.socials.links.facebook,
              data.socials.links.telegram,
              data.socials.links.snapchat,
            ],
          })}
        </script>
      </Head>
      <body>{children}</body>
    </html>
  );
}
