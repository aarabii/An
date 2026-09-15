import Link from "next/link";
import { ArrowUpRight, BookOpen, Bookmark } from "lucide-react";
import { Container, Title } from "@/components/common";

const ILove = () => {
  return (
    <Container id="a-few-things-i-love">
      <Title heading="A Few Things I Love..." />
      <div className="grid grid-cols-1 gap-4 p-5 sm:p-8 md:grid-cols-2">
        <LinkCard
          href="/recommendations"
          icon={BookOpen}
          label="Recommendations"
          hint="Books, games, and things worth your time."
        />
        <LinkCard
          href="/bookmarks"
          icon={Bookmark}
          label="Bookmarks"
          hint="Links I keep coming back to."
        />
      </div>
    </Container>
  );
};

const LinkCard = ({
  href,
  icon: Icon,
  label,
  hint,
}: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { "data-icon"?: string }>;
  label: string;
  hint: string;
}) => {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 rounded-lg border border-border bg-card/60 p-5 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/50 transition-colors duration-200 group-hover:border-foreground/20 group-hover:bg-secondary">
        <Icon className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-heading text-sm text-foreground">{label}</span>
        <span className="font-para text-xs text-muted-foreground">
          {hint}
        </span>
      </div>

      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
    </Link>
  );
};

export default ILove;
