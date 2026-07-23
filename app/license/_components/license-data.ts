import { profile } from "@/constant";

export interface HumanLicenseRule {
  title: string;
  items: string[];
}

export const HUMAN_LICENSE_SUMMARY: {
  allowed: HumanLicenseRule;
  prohibited: HumanLicenseRule;
  terms: HumanLicenseRule;
} = {
  allowed: {
    title: "Allowed",
    items: [
      "Fork, clone, and customize the source code freely for your personal website or portfolio.",
      "Modify styles, components, layout, and content to fit your own identity.",
      "Deploy to your custom domain, Vercel, Netlify, GitHub Pages, or any host.",
      "Use the repository for personal learning, experimentation, or non-commercial projects.",
    ],
  },
  prohibited: {
    title: "Prohibited",
    items: [
      "Reselling or distributing this codebase as a paid or free starter kit, template, or theme.",
      "Building client sites for payment using this repository as a deliverable.",
      "Removing or altering the LICENSE file in your repository.",
      "Claiming original authorship of the core design system or codebase structure.",
    ],
  },
  terms: {
    title: "Terms & Attribution",
    items: [
      "Attribution on your live deployed site is optional (footer credit link appreciated!).",
      "Keeping the LICENSE file in your repository satisfies all mandatory credit requirements.",
      "Personal bio, photos, resume details, and project content must be replaced with your own.",
      "No trademark rights granted to Aarab Nishchal's name, logo, or brand identity.",
    ],
  },
};

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
