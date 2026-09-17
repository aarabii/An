import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getGameBySlug, getAllGameSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import GameHero from "./_components/GameHero";
import GamePersonalNote from "./_components/GamePersonalNote";
import GamePcRequirements from "./_components/GamePcRequirements";

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
    return {
      title: "Game Not Found | Recommendations",
    };
  }

  const ogImage =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(1200).height(630).quality(85).url()
        : "/images/social_card.png";

  return {
    title: `${game.name} | Game Recommendations`,
    description:
      game.desc || `Game recommendations and personal review for ${game.name}.`,
    openGraph: {
      title: game.name,
      description:
        game.desc || `Explore game details, notes, and specs for ${game.name}.`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: game.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: game.name,
      description: game.desc,
      images: [ogImage],
    },
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen">
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
