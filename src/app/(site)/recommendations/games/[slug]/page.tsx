import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, PageNav, JsonLd } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getGameBySlug, getAllGameSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import GameHero from "./_components/GameHero";
import GamePersonalNote from "./_components/GamePersonalNote";
import GamePcRequirements from "./_components/GamePcRequirements";
import {
  SITE_CONFIG,
  createPageMetadata,
  getVideoGameJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

interface GameDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return createPageMetadata({
      title: "Game Not Found",
      description: "The requested game recommendation could not be found.",
      path: `/recommendations/games/${slug}`,
      noIndex: true,
    });
  }

  const ogImageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(1200).height(630).quality(85).url()
        : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;

  return createPageMetadata({
    title: `${game.name} | Game Recommendations`,
    description:
      game.desc ||
      `Explore personal review, ranking, PC benchmarks, and gameplay reflections on ${game.name} by Aarab Nishchal.`,
    path: `/recommendations/games/${slug}`,
    ogImage: ogImageUrl,
    ogImageAlt: game.name,
    keywords: [
      game.name,
      ...(game.genres || []),
      "Game Recommendation",
      "PC Gaming Review",
      "Interactive Art",
    ],
    category: "Video Games",
  });
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const gameImageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).url()
        : null;

  const jsonLd = [
    getVideoGameJsonLd({
      name: game.name,
      desc: game.desc,
      slug,
      genres: game.genres,
      developer: game.developer,
      publisher: game.publisher,
      image: gameImageUrl,
      steam_link: game.steam_link,
      website: game.website,
    }),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Recommendations", url: "/recommendations" },
      { name: "Games", url: "/recommendations/games" },
      { name: game.name, url: `/recommendations/games/${slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Recommendations", href: "/recommendations" },
          { label: "Games", href: "/recommendations/games" },
          { label: game.name },
        ]}
      />

      <RepeatSeparator />

      {/* Main Container */}
      <Container id="game-showcase" className="flex flex-col gap-8">
        {/* Hero Section: Title, Cover, Credits, Genres, Links */}
        <GameHero game={game} />

        {/* Short Description */}
        {game.desc && (
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-sm font-semibold tracking-tight uppercase text-muted-foreground">
              Overview & Premise
            </h2>
            <p className="font-para text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {game.desc}
            </p>
          </div>
        )}

        {/* Custom Comments / Personal Review */}
        {game.customeCmt && <GamePersonalNote comment={game.customeCmt} />}

        {/* PC System Requirements */}
        {game.pc_req && <GamePcRequirements pcReq={game.pc_req} />}
      </Container>
    </div>
  );
}
