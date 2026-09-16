import React from "react";
import { Sparkles } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa6";

interface GamePersonalNoteProps {
  comment?: string;
}

export const GamePersonalNote: React.FC<GamePersonalNoteProps> = ({ comment }) => {
  if (!comment || !comment.trim()) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/80 p-5 sm:p-7 shadow-xs">
      {/* Editorial Accent Line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

      <div className="flex flex-col gap-3 pl-2 sm:pl-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          <span className="font-semibold text-foreground">Personal Reflection</span>
        </div>

        <div className="relative">
          <FaQuoteLeft className="absolute -top-1 -left-2 size-6 text-foreground/5 opacity-50 pointer-events-none" />
          <p className="font-para text-xs/relaxed sm:text-sm/relaxed text-muted-foreground italic whitespace-pre-line">
            &ldquo;{comment}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePersonalNote;
