# An (v7) — Personal Space on the Web

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-v6-f03e2f?style=flat-square&logo=sanity)](https://www.sanity.io/)
[![Bun](https://img.shields.io/badge/Bun-1.3-black?style=flat-square&logo=bun)](https://bun.sh/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**[aarab.me](https://aarab.me)** · Personal portfolio, engineering deep dives, project showcases, curated recommendations, and interactive experiences.

</div>

---

## ✦ Overview

**An (v7)** is the personal portfolio and digital garden of **Aarab Nishchal** (AI Engineer & Full-Stack Developer). Built with Next.js 16 App Router (Turbopack), React 19, Tailwind CSS 4, and Sanity CMS, it combines minimalist editorial design with performant interactive WebGPU visual shaders and real-time content management.

### Key Highlights

- **⚡ Modern Core:** Next.js 16 (App Router) paired with Turbopack for ultra-fast dev cycles and incremental builds.
- **🎨 Editorial Aesthetic:** Custom design system built with Tailwind CSS 4 and OKLCH color spaces, paired with `@base-ui/react` and `shadcn/ui` primitives.
- **✨ Visual Shaders:** Dynamic WebGPU/Canvas background effects (`AeroShards`) and interactive kinetic text shaders (`WarpText`) via `vgpu`.
- **📝 Headless CMS:** Sanity Studio v6 embedded at `/studio` with schemas for projects, blogs, bookmarks, books, and video games.
- **🔄 On-Demand ISR:** Instant content revalidation powered by Next.js `revalidateTag` and Sanity webhooks with constant-time cryptographic signature checks.
- **⌘ Command Palette:** Keyboard-first navigation (`⌘K` / `Ctrl+K`) powered by `cmdk` with deep-linking and search.
- **📬 Contact API:** Transactional email pipeline built with Resend and React Email, including DNS MX validation and rate limiting.
- **🎮 404 Mini-Game:** Custom memory puzzle interactive tile game with real-time stats and local high-score tracking.
- **🤖 LLM & Agent Readiness:** Dedicated machine-readable endpoints (`/llms.txt`, `/llms-full.txt`) providing a complete knowledge graph dossier for autonomous AI agents.
- **🌐 SEO & Schema.org:** Dynamic JSON-LD structured data (`ProfilePage`, `CollectionPage`, `SoftwareApplication`, `VideoGame`), dynamic XML sitemaps, OpenGraph cards, and strict robots configuration.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19.2.8](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) · [tw-animate-css](https://github.com) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) · [@base-ui/react](https://base-ui.com/) |
| **CMS** | [Sanity Studio v6](https://www.sanity.io/) · [`next-sanity`](https://github.com/sanity-io/next-sanity) · Sanity TypeGen |
| **3D & Canvas** | [vgpu](https://www.npmjs.com/package/vgpu) (WebGPU canvas shaders) |
| **Icons** | [Lucide React](https://lucide.dev/) · [React Icons](https://react-icons.github.io/react-icons/) |
| **Email** | [Resend](https://resend.com/) · [React Email](https://react.email/) |
| **Runtime / Package Manager** | [Bun 1.3](https://bun.sh/) (or Node.js >= 22.23.2) |

---

## 📁 Project Structure

```
v7/
├── public/                    # Static assets (favicons, manifest, resume PDF)
│   ├── .well-known/           # security.txt
│   ├── icons/                 # Brand and platform icons
│   └── resume/                # Downloadable resume assets
├── src/
│   ├── app/
│   │   ├── (sanity)/studio/   # Embedded Sanity Studio route (/studio)
│   │   ├── (site)/            # Public website route group
│   │   │   ├── (legal)/       # License, Privacy, and Terms pages
│   │   │   ├── (main)/        # Homepage sections (Hero, About, Projects, Experience)
│   │   │   ├── blogs/         # Technical articles listing & dynamic [slug] pages
│   │   │   ├── bookmarks/     # Curated high-signal developer bookmarks
│   │   │   ├── contact/       # Contact form & social channels
│   │   │   ├── projects/      # Curated projects catalog & GitHub sync
│   │   │   ├── recommendations/ # Bookshelf & Video Games showcase
│   │   │   ├── resume/        # Interactive digital resume
│   │   │   └── s/[slug]/      # Crawler-protected confidential documents
│   │   ├── api/
│   │   │   ├── email/send/    # Resend transactional email endpoint
│   │   │   ├── github/repos/  # GitHub REST API repository sync with caching
│   │   │   └── revalidate/    # Constant-time authenticated Sanity webhook handler
│   │   ├── globals.css        # Tailwind 4 theme, OKLCH tokens & base styles
│   │   ├── llms.txt/          # Machine-readable LLM summary
│   │   ├── llms-full.txt/     # Complete LLM entity dossier & knowledge graph
│   │   ├── robots.ts          # Dynamic robots.txt with route permissions
│   │   └── sitemap.ts         # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── bg/                # WebGPU/Canvas background shaders (AeroShards)
│   │   ├── cards/             # Reusable card components (Blog, Project, Game, Book)
│   │   ├── common/            # Navbar, Footer, Container, PageNav, JsonLd
│   │   ├── misc/              # CommandMenu, ContactForm, TopBanner, WarpText
│   │   ├── not-found-game/    # Interactive 404 memory tile mini-game
│   │   ├── portable-text/     # Custom Sanity Portable Text renderer
│   │   ├── template/          # React Email templates
│   │   └── ui/                # Base UI & Radix-style UI primitives
│   ├── constant/              # Static configurations (SEO, navigation, socials, skills)
│   ├── hooks/                 # Custom React hooks (useCommand, useIsMac)
│   ├── lib/                   # Utility helpers (date formatting, cn)
│   ├── sanity/
│   │   ├── lib/               # Sanity client, image URL builder, and queries
│   │   │   └── queries/       # GROQ queries with reusable fragments
│   │   └── schemaTypes/       # Content schemas (post, project, game, book, bookmark)
│   └── types/                 # Shared TypeScript interfaces
├── next.config.ts             # Security headers, CSP, remote images, and redirects
├── sanity.config.ts           # Studio configuration & desk structure
└── package.json               # Dependencies & build scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** (version 1.3+ recommended) or **Node.js** `>= 22.23.2`

### 1. Clone & Install

```bash
git clone https://github.com/aarabii/An.git
cd An
bun install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-09-15"
SANITY_WEBHOOK_SECRET="your_webhook_secret"

# Resend Email Service
RESEND_API_KEY="re_your_resend_api_key"
```

### 3. Start Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Starts the Next.js development server with Turbopack |
| `bun run build` | Compiles an optimized production build with TypeScript checks |
| `bun run start` | Runs the compiled production server |
| `bun run lint` | Runs ESLint across the codebase |
| `bun run typegen` | Extracts Sanity schemas and regenerates `sanity.types.ts` |

---

## 🛡 Security & Performance

- **Strict Content Security Policy (CSP):** Configured in `next.config.ts` along with HSTS, `nosniff`, `SAMEORIGIN`, and restrictive permissions policies.
- **Constant-Time Verification:** Webhook payloads use Node.js `crypto.timingSafeEqual` to safeguard against timing attacks.
- **Direct Asset Optimization:** Next.js Image component paired with Sanity LQIP blur placeholders and responsive `sizes`.
- **Tree-Shaking:** Configured `optimizePackageImports` for `react-icons` and `lucide-react` in `next.config.ts`.
- **Graceful Client Fallbacks:** WebGL/WebGPU shaders are dynamically imported with SSR disabled and automatically pause on `prefers-reduced-motion: reduce`.

---

## 👤 Author

**Aarab Nishchal**

- Website: [https://aarab.me](https://aarab.me)
- GitHub: [@aarabii](https://github.com/aarabii)
- LinkedIn: [aarab-nishchal](https://linkedin.com/in/aarab-nishchal)
- X (Twitter): [@aarab_ii](https://x.com/aarab_ii)
- Email: [hello@aarab.me](mailto:hello@aarab.me)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
