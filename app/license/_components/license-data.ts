import { profile } from "@/constant";

export interface LicenseSectionItem {
  term: string;
  desc: string;
}

export interface LicenseSection {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: "success" | "danger";
  items?: LicenseSectionItem[];
  points?: string[];
  examples?: string[];
}

export interface LicenseFAQ {
  q: string;
  a: string;
}

export const RAW_LICENSE_TEXT = `# Custom Portfolio License

Copyright (c) 2026 Aarab Nishchal

This license governs the use, modification, and distribution of this
software and its associated source code, design, and documentation
(collectively, the "Software"), authored and owned by Aarab Nishchal
(the "Author").

By cloning, forking, downloading, or otherwise using the Software, you
("User") agree to be bound by the terms below.

---

## 1. Definitions

- "Software" means the source code, styles, components, assets, and
  documentation contained in this repository.
- "Personal Use" means using the Software, modified or unmodified,
  to build and publish your own individual or organizational portfolio,
  website, or project for yourself.
- "Resale" means distributing, sublicensing, selling, or offering
  the Software — in original or modified form — as a standalone
  product, template, theme, boilerplate, starter kit, or paid
  deliverable to a third party, where the Software (or a substantial
  part of it) is the thing being sold.

---

## 2. Grant of Permission

Subject to the restrictions in Section 3, the Author grants you a
worldwide, royalty-free, non-exclusive license to:

1. Clone and fork this repository.
2. Modify the Software in any way — content, styling, structure,
   functionality — to fit your own use case.
3. Deploy and publish your modified version as your own personal
   or organizational portfolio, including on your own domain, on
   platforms like Vercel/Netlify/GitHub Pages, or as part of a resume
   or job application.
4. Use it privately for learning, experimentation, or internal
   non-commercial tooling.

Example (allowed): A developer forks this repo, replaces the name,
photos, projects, and color scheme, and publishes it as their own
personal portfolio at their-name.dev.

Example (allowed): A freelancer forks this repo, customizes it,
and uses it as their own public portfolio to attract clients.

---

## 3. Restrictions

You may NOT, under any circumstances:

1. Resell or redistribute the Software, in original or modified
   form, as a paid or free template, theme, boilerplate, or starter
   kit intended for others to use as their own portfolio base.
2. Build client deliverables from this Software for payment —
   e.g., a freelancer or agency cloning this repo, making cosmetic
   changes, and delivering/selling it to a client as "their" custom
   portfolio build.
3. Sublicense the Software to a third party under different terms.
4. Remove or alter this license file, copyright notice, or any
   embedded attribution from the Software, in either public or private
   distributions.
5. Claim original authorship of the underlying codebase, design
   system, or structure.

Example (not allowed): A freelancer clones this repo, changes the
name and content, and sells it to a client as a custom-built portfolio
website.

Example (not allowed): Someone forks this repo and publishes it on
a marketplace (e.g., ThemeForest, Gumroad, a template store) as a free
or paid "portfolio template."

Example (not allowed): A company uses this codebase as the base for
a commercial SaaS product or template-selling business.

---

## 4. Attribution

Attribution is not required in your deployed/published site, but:

- If you keep this LICENSE.md file present in your repository (which
  is required per Section 3.4), that satisfies attribution.
- A credit link (e.g., "Based on a template by Aarab Nishchal") in your
  footer or README is appreciated but optional.

---

## 5. Termination

Any use in violation of Section 3 automatically terminates your rights
under this license as of the date of that violation. Upon termination,
you must cease all use, distribution, and public deployment of the
Software and any derivative built from it.

---

## 6. No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY CLAIM,
DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR
OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 7. Governing Terms

This license does not grant any trademark rights to the Author's name,
brand, or personal identity. Any images, personal photos, resume
content, or written copy specific to the Author (as opposed to the
underlying code/design system) are not licensed for reuse and must
be replaced by the User with their own content.

---

## 8. Contact

For licensing questions, commercial use exceptions, or written
permission requests, contact: ${profile.email}`;

export const SECTIONS_DATA: LicenseSection[] = [
  {
    id: "definitions",
    num: "01",
    title: "Definitions",
    subtitle: "Core terms governing this agreement",
    items: [
      {
        term: "Software",
        desc: "The source code, styles, React/Next.js components, design assets, and documentation contained in this repository.",
      },
      {
        term: "Personal Use",
        desc: "Using the Software (modified or unmodified) to build and publish your own individual or organizational portfolio, website, or resume for yourself.",
      },
      {
        term: "Resale",
        desc: "Distributing, sublicensing, selling, or offering the Software — in original or modified form — as a standalone product, template, theme, starter kit, or paid client deliverable.",
      },
    ],
  },
  {
    id: "permissions",
    num: "02",
    title: "Grant of Permission",
    subtitle: "What you are explicitly allowed to do",
    badge: "Allowed",
    badgeType: "success",
    points: [
      "Clone and fork this repository freely.",
      "Modify the Software in any way — content, styling, structure, and functionality — to fit your personal portfolio.",
      "Deploy and publish your modified version as your personal site on Vercel, Netlify, GitHub Pages, or a custom domain.",
      "Use the codebase privately for learning, experimentation, or internal non-commercial tooling.",
    ],
    examples: [
      "A developer forks this repo, replaces the name, photos, projects, and color scheme, and publishes it as their own portfolio.",
      "A freelancer customizes this template to showcase their own projects and skills to land clients.",
    ],
  },
  {
    id: "restrictions",
    num: "03",
    title: "Restrictions & Limitations",
    subtitle: "What is strictly prohibited",
    badge: "Prohibited",
    badgeType: "danger",
    points: [
      "Do NOT resell or redistribute the Software as a paid or free template, boilerplate, or starter kit.",
      "Do NOT build client deliverables from this Software for payment (e.g. agencies selling customized clones to clients).",
      "Do NOT sublicense the Software to third parties under altered terms.",
      "Do NOT remove or alter the LICENSE file or copyright notice in your repository.",
      "Do NOT claim original authorship of the underlying codebase or design system.",
    ],
    examples: [
      "Cloning this repo, changing colors, and selling it on Fiverr/Upwork as a custom client project.",
      "Publishing this repo on marketplaces like ThemeForest, Gumroad, or GitHub as a template starter kit.",
      "Using this codebase as the foundation for a commercial SaaS template store.",
    ],
  },
  {
    id: "attribution",
    num: "04",
    title: "Attribution Guidelines",
    subtitle: "How credit and copyright attribution works",
    points: [
      "Attribution on your live deployed website is OPTIONAL (a credit link in your footer is appreciated!).",
      "Retaining the LICENSE file in your public repository satisfies all mandatory attribution requirements.",
      "You must not claim to have created the base architecture from scratch.",
    ],
  },
  {
    id: "termination",
    num: "05",
    title: "Termination of Rights",
    subtitle: "Conditions causing automatic license termination",
    points: [
      "Any violation of Section 3 (Restrictions) automatically revokes all rights granted under this license.",
      "Upon termination, you must immediately cease all public deployment, distribution, and use of the Software.",
    ],
  },
  {
    id: "warranty",
    num: "06",
    title: "No Warranty & Liability",
    subtitle: "Provided AS IS without guarantees",
    points: [
      'The Software is provided "AS IS", without warranty of any kind, express or implied.',
      "In no event shall the Author (Aarab Nishchal) be liable for any claim, damages, or liabilities arising from the use of this code.",
    ],
  },
  {
    id: "governing",
    num: "07",
    title: "Governing Terms & Assets",
    subtitle: "Protection of personal identity and media",
    points: [
      "This license does NOT grant rights to the Author's personal name, brand, logo, or identity.",
      "All personal photos, resume details, and bio content specific to Aarab Nishchal MUST be replaced before publishing.",
    ],
  },
  {
    id: "contact",
    num: "08",
    title: "Contact & Exceptions",
    subtitle: "Commercial licensing and permissions",
    points: [
      "For commercial use exceptions, licensing inquiries, or written permission requests, reach out directly.",
      `Email: ${profile.email}`,
    ],
  },
];

export const FAQS: LicenseFAQ[] = [
  {
    q: "Can I use this codebase for my own developer portfolio?",
    a: "Yes, absolutely! You can fork, clone, edit, and publish your own version of this portfolio on your custom domain, Vercel, Netlify, or any hosting platform.",
  },
  {
    q: "Do I need to pay anything or add a credit link to my site?",
    a: "No payment is required — this license is 100% royalty-free for personal use. Adding a credit link in your footer (e.g. 'Based on template by Aarab Nishchal') is completely optional, though always appreciated!",
  },
  {
    q: "Can I sell a modified version of this website to a client?",
    a: "No. You cannot build client projects for money using this template, nor can you sell it as a template or theme on Gumroad, ThemeForest, or any platform.",
  },
  {
    q: "Can I keep my fork private or open-source on GitHub?",
    a: "Either is fine! As long as you keep the LICENSE file inside your repository, you are fully compliant.",
  },
  {
    q: "Can I use the design system or components in my open-source project?",
    a: "Yes! You can adapt individual components or styling patterns for your personal open-source projects.",
  },
];
