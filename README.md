# 🚀 Aarab Nishchal — Developer Portfolio & Dynamic Blog

Welcome to the official source code for **Aarab Nishchal's Developer Portfolio & Dynamic Blog**. Built with Next.js 16, React 19, Tailwind CSS v4, Motion, GSAP, and a Notion-powered CMS, this portfolio is designed to be sleek, fast, highly customizable, and expressive.

Whether you're looking for design inspiration, interested in how the Notion CMS integration works under the hood, or want to clone and adapt this template for your own developer journey, this README has everything you need!

---

## ✨ Features

- **⚡ Modern Next.js 16 & React 19 Architecture**: Takes advantage of App Router, Server Components, and optimized client-side hydration.
- **📝 Dynamic Notion CMS for Blogs**: Write posts directly in Notion! They get fetched live via the Notion HQ API and converted to clean, high-performance Markdown on your site.
- **📧 Nodemailer + React Email Contact System**: Receive contact form submissions straight to your inbox with custom-designed HTML emails, input validation, and built-in rate-limiting.
- **⚙️ Centralized Configuration (`constant/`)**: Zero back-end code editing required for customization. Easily update your profile, bio, projects, work experience, skills, social links, and SEO from dedicated TypeScript configuration files.
- **🎨 Interactive Motion & Shaders**: Fluid page transitions and visual flair powered by **Motion (Framer Motion)**, **GSAP**, and **Paper Design Shaders**.
- **🔍 SEO & LLM Ready**: Automated OpenGraph tags, dynamic XML sitemap generation, structured metadata, and an `/llms.txt` endpoint for AI agents.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Actions, Dynamic Metadata |
| **Core Library** | [React 19](https://react.dev/) | UI rendering & component architecture |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking and autocompletion |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS styling |
| **Animations** | [Motion](https://motion.dev/) / [GSAP](https://gsap.com/) | Fluid layout animations & micro-interactions |
| **Shaders** | [@paper-design/shaders-react](https://paper.design/) | WebGL shader visual effects |
| **CMS** | [@notionhq/client](https://developers.notion.com/) & `notion-to-md` | Headless blogging using Notion |
| **Email Service** | [Nodemailer](https://nodemailer.com/) & [React Email](https://react.email/) | Transactional email delivery via Gmail SMTP |
| **UI Components** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) | Iconography |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Toast notification system |

---

## 🚀 Quick Start (Run Locally)

Follow these steps to run the portfolio locally on your machine:

### 1. Prerequisites
Make sure you have **Node.js 18+** installed. You can check with `node -v`.

### 2. Clone the Repository
```bash
git clone https://github.com/aarabii/an-v6.git
cd an-v6
```

### 3. Install Dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```
*(If `.env.example` is not present, manually create `.env.local` with the variables listed in the [Environment Variables](#-environment-variables) section below).*

### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your local site!

---

## ⚙️ How to Personalize for Yourself (`constant/` Folder)

You don't need to dive deep into complex UI components to change your information! All personal data, projects, work experience, and social handles live inside the `constant/` directory:

```
constant/
├── profile.ts      # Bio, location, education, rotating hero headlines
├── projects.ts     # Selected & featured projects, tech tags, links
├── experience.ts   # Work experience timeline & job roles
├── skills.ts       # Categorized skills & technology badges
├── social.ts       # Social media platforms, URLs, handles & icons
├── seo.ts          # Default SEO title, OpenGraph images, site URL
└── index.ts        # Barrel export for all constants
```

### Quick Editing Checklist:
1. **`constant/profile.ts`**: Update your name, email, current work title, college/education, location, bio paragraphs, and hero rotating quotes (`hero_titles`).
2. **`constant/projects.ts`**: Update `selected_works` and `works` arrays with your own projects, tech stack badges, and GitHub/live links.
3. **`constant/experience.ts`**: Edit your work history, company names, job titles, start/end dates, and key achievements.
4. **`constant/skills.ts`**: Add or remove your core skills and tech categories.
5. **`constant/social.ts`**: Set your GitHub, LinkedIn, X (Twitter), LeetCode, and other social media profile links.
6. **`constant/seo.ts`**: Set `SITE_SEO.siteName`, `SITE_SEO.siteTitle`, and `SITE_SEO.siteUrl` to match your domain.

---

## 📝 Connecting Notion for Dynamic Blogs

This portfolio uses **Notion** as a headless CMS. You write your articles in Notion, and they render seamlessly on your site at `/blogs`.

Here is how to set up Notion integration step-by-step:

### Step 1: Create a Notion Integration
1. Visit [Notion My Integrations](https://www.notion.so/my-integrations).
2. Click **"+ New integration"**.
3. Select your workspace, enter an integration name (e.g., `My Portfolio Blog`), and click **Submit**.
4. Copy the **Internal Integration Secret** (it starts with `secret_` or `ntn_`).
5. Save this token as `NOTION_API_KEY` in your `.env.local` file.

### Step 2: Create Your Notion Database
1. Open Notion and create a new **Full Page Database** (or inline database on a new page).
2. Set up the following database properties (**property names are case-sensitive**):

| Property Name | Property Type in Notion | Description |
| :--- | :--- | :--- |
| **Title** | `Title` | The blog post title |
| **Slug** | `Text` (Rich Text) | URL slug for post (e.g. `building-my-portfolio`) |
| **Description** | `Text` (Rich Text) | Short excerpt/description displayed on blog list |
| **Keywords** | `Multi-select` | Tags or keywords for SEO & topics |
| **Date** | `Date` | Publication date |
| **Published** | `Checkbox` | Must be **checked** (`true`) for the post to show live |
| **Cover** | `Files & media` or Notion Page Cover | Post cover thumbnail image |

### Step 3: Connect Database to Your Integration
1. Open your Notion Blog Database page.
2. Click the three dots `...` (or **Share** button) in the top-right corner.
3. Select **Add connections** (or **Connections**).
4. Search for your integration name (e.g., `My Portfolio Blog`) and grant it access.

### Step 4: Find Your Database ID
1. Copy the URL of your Notion Database page.
2. The URL looks like this:
   `https://www.notion.so/myworkspace/3a648e834e80803086e9d7281e46a56e?v=...`
3. The 32-character string between `myworkspace/` and `?v=` is your `NOTION_DATABASE_ID`.
4. Add `NOTION_DATABASE_ID=3a648e834e80803086e9d7281e46a56e` to `.env.local`.

### Step 5: Write Your First Blog!
1. Add a new row to your Notion database.
2. Give it a **Title**, a unique **Slug** (e.g. `hello-world`), a **Description**, a **Date**, and check the **Published** box.
3. Open the page inside Notion and write your article content using standard Notion blocks (headings, code blocks, lists, callouts, images).
4. Refresh your portfolio's `/blogs` page — your article is now live! 🎉

---

## 📧 Connecting Gmail for Contact Form Submissions

The contact form uses **Nodemailer** with Gmail SMTP to send notification emails when a visitor sends you a message.

To connect your Gmail account securely:

### Step 1: Enable 2-Step Verification
1. Go to your [Google Account Settings](https://myaccount.google.com/).
2. Navigate to **Security**.
3. Under *"How you sign in to Google"*, make sure **2-Step Verification** is turned **ON**.

### Step 2: Generate a Gmail App Password
1. Search for **"App passwords"** in the Google Account search bar (or go directly to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
2. Enter an app name (e.g., `Portfolio Contact Form`).
3. Click **Create**.
4. Google will generate a 16-character passcode (e.g. `abcd efgh ijkl mnop`). Copy this passcode.

### Step 3: Add Credentials to `.env.local`
Add your email address and the generated App Password to `.env.local`:
```env
email_from=your.email@gmail.com
email_password=abcdefghijklmnop
```

Now, when visitors submit the contact form on your site, Nodemailer will send the message using your Gmail SMTP server!

---

## 🔒 Environment Variables Reference

Create a `.env.local` file in the project root with the following variables:

```env
# Email Configuration (Nodemailer + Gmail SMTP)
email_from=your.email@gmail.com
email_password=your_16_char_google_app_password

# Notion CMS Integration
NOTION_API_KEY=your_notion_integration_secret_token
NOTION_DATABASE_ID=your_32_character_notion_database_id

# Public Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=https://aarab.vercel.app
```

---

## 📄 License & Terms of Usage

This project is licensed under a **Custom Portfolio License** (see [LICENSE](file:///d:/NextJS/an-v6/LICENSE)).

### 💚 What You CAN Do:
- **Clone & Fork**: Feel free to clone or fork this repository for your own personal use.
- **Customize**: Modify the content, styling, components, or layout to create your personal portfolio or personal blog.
- **Deploy**: Host your customized version anywhere (Vercel, Netlify, Cloudflare Pages, custom domain).

### 🚫 What You CANNOT Do:
- **No Resale or Redistribution**: You may **NOT** sell, bundle, or redistribute this codebase (modified or unmodified) as a commercial template, theme, boilerplate, or starter kit on marketplaces like ThemeForest, Gumroad, etc.
- **No Client Work Resale**: You may **NOT** clone this project, make cosmetic changes, and sell/deliver it to paid clients as a custom-built website.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/aarabii">Aarab Nishchal</a>
</p>
