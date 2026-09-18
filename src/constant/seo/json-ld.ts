// ---------------------------------------------------------------------------
// Schema.org JSON-LD Structured Data Generators
// ---------------------------------------------------------------------------

import { PAGE_SEO } from "./page_seo";
import { SEO_PERSON } from "./seo_person";
import { SITE_CONFIG } from "./site_config";

/**
 * Generates Schema.org Person JSON-LD
 */
export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/#person`,
    name: SEO_PERSON.name,
    givenName: SEO_PERSON.givenName,
    familyName: SEO_PERSON.familyName,
    alternateName: SEO_PERSON.alternateNames,
    jobTitle: SEO_PERSON.jobTitle,
    description: SEO_PERSON.summary,
    url: SITE_CONFIG.url,
    image: SEO_PERSON.image,
    email: `mailto:${SEO_PERSON.email}`,
    telephone: SEO_PERSON.telephone,
    gender: SEO_PERSON.gender,
    address: {
      "@type": "PostalAddress",
      addressLocality: SEO_PERSON.address.addressLocality,
      addressRegion: SEO_PERSON.address.addressRegion,
      addressCountry: SEO_PERSON.address.addressCountry,
    },
    worksFor: {
      "@type": "Organization",
      name: SEO_PERSON.currentRole.company,
      url: SEO_PERSON.currentRole.website,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SEO_PERSON.alumniOf.name,
      alternateName: SEO_PERSON.alumniOf.alternateName,
    },
    sameAs: SEO_PERSON.sameAs,
    knowsAbout: SEO_PERSON.knowsAbout,
    hasCredential: SEO_PERSON.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
      },
    })),
  };
}

/**
 * Generates Schema.org WebSite JSON-LD
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    inLanguage: SITE_CONFIG.language,
  };
}

/**
 * Generates Schema.org ProfilePage JSON-LD
 */
export function getProfilePageJsonLd(path: string = "/") {
  const normalizedPath =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_CONFIG.url}${normalizedPath}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}/#webpage`,
    url,
    name: `${SEO_PERSON.name} - Profile`,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    about: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
  };
}

/**
 * Generates Schema.org CollectionPage JSON-LD
 */
export function getCollectionPageJsonLd(
  name: string,
  description: string,
  path: string,
) {
  const url = `${SITE_CONFIG.url}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}/#collection`,
    url,
    name,
    description,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    about: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generates Schema.org ContactPage JSON-LD
 */
export function getContactJsonLd() {
  const url = `${SITE_CONFIG.url}/contact`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}/#contact`,
    url,
    name: "Contact Aarab Nishchal",
    description: PAGE_SEO.contact.description,
    mainEntity: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
  };
}

/**
 * Generates Schema.org SoftwareApplication / CreativeWork JSON-LD for project pages
 */
export function getSoftwareApplicationJsonLd(project: {
  title: string;
  description?: string | null;
  slug: string;
  github?: string | null;
  demo?: string | null;
  technologies?: string[] | null;
  image?: string | null;
  type?: string | null;
  status?: string | null;
}) {
  const url = `${SITE_CONFIG.url}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}/#software`,
    name: project.title,
    description: project.description || SITE_CONFIG.description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform, Web",
    author: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    creator: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    ...(project.demo && { installUrl: project.demo }),
    ...(project.github && {
      codeRepository: project.github,
      sameAs: [project.github],
    }),
    ...(project.image && { image: project.image }),
    ...(project.technologies && {
      keywords: project.technologies.join(", "),
    }),
  };
}

/**
 * Generates Schema.org TechArticle / BlogPosting JSON-LD for blog post pages
 */
export function getArticleJsonLd(blog: {
  title: string;
  description?: string | null;
  slug: string;
  date?: string | null;
  tags?: string[] | null;
  coverImage?: string | null;
  _createdAt?: string | null;
  _updatedAt?: string | null;
}) {
  const url = `${SITE_CONFIG.url}/blogs/${blog.slug}`;
  const publishedDate =
    blog.date || blog._createdAt || new Date().toISOString();
  const modifiedDate = blog._updatedAt || publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}/#article`,
    headline: blog.title,
    description: blog.description || SITE_CONFIG.description,
    url,
    inLanguage: SITE_CONFIG.language,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(blog.coverImage && { image: blog.coverImage }),
    ...(blog.tags && { keywords: blog.tags.join(", ") }),
  };
}

/**
 * Generates Schema.org VideoGame JSON-LD for game recommendation pages
 */
export function getVideoGameJsonLd(game: {
  name: string;
  desc?: string | null;
  slug: string;
  genres?: string[] | null;
  developer?: string | null;
  publisher?: string | null;
  image?: string | null;
  steam_link?: string | null;
  website?: string | null;
}) {
  const url = `${SITE_CONFIG.url}/recommendations/games/${game.slug}`;
  const sameAs = [game.steam_link, game.website].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": `${url}/#game`,
    name: game.name,
    description: game.desc || `Personal notes and specs for ${game.name}.`,
    url,
    gamePlatform: ["PC", "Windows"],
    ...(game.developer && {
      author: {
        "@type": "Organization",
        name: game.developer,
      },
    }),
    ...(game.publisher && {
      publisher: {
        "@type": "Organization",
        name: game.publisher,
      },
    }),
    ...(game.genres && { genre: game.genres }),
    ...(game.image && { image: game.image }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
