import Link from "next/link";
import { ArrowUpRight, BookOpen, Bookmark } from "lucide-react";
import { Container, Title } from "@/components/common";

const ILove = () => {
  return (
    <Container id="a-few-things-i-love">
      <Title heading="A Few Things I Love..." />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LinkCard
          href="/recommendations"
          icon={BookOpen}
          label="Things worth sharing"
          // hint="Books, games, and things worth your time."
        />
        <LinkCard
          href="/bookmarks"
          icon={Bookmark}
          label="Things I didn't want to lose"
          // hint="Links I keep coming back to."
        />
      </div>
    </Container>
  );
};

const LinkCard = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { "data-icon"?: string }
  >;
  label: string;
}) => {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
        <Icon className="size-5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-heading text-base font-medium text-foreground">
          {label}
        </span>
      </div>

      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
    </Link>
  );
};

export default ILove;
