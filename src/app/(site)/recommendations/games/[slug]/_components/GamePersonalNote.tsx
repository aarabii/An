import React from "react";
import { Sparkles, Quote } from "lucide-react";

interface GamePersonalNoteProps {
  comment?: string;
}

export const GamePersonalNote: React.FC<GamePersonalNoteProps> = ({ comment }) => {
  if (!comment || !comment.trim()) return null;

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="size-3.5 text-chart-1" />
          <span className="font-medium text-foreground">Personal Reflection</span>
        </div>

        <div className="relative pl-6">
          <Quote className="absolute top-0 left-0 size-4 text-muted-foreground/30 pointer-events-none" />
          <p className="font-serif text-sm sm:text-base leading-relaxed text-foreground/90 italic whitespace-pre-line">
            &ldquo;{comment}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePersonalNote;
