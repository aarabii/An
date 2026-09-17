"use client";

import React from "react";
import { Monitor, Cpu, Info } from "lucide-react";

import type {
  PCRequirements,
  GameRequirement,
  GameRequirementItem,
} from "@/types/game";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface GamePcRequirementsProps {
  pcReq?: PCRequirements;
}

const normalizeRequirements = (
  reqs?: Record<string, string> | GameRequirementItem[] | null
): GameRequirementItem[] => {
  if (!reqs) return [];
  if (Array.isArray(reqs)) return reqs;
  return Object.entries(reqs).map(([key, value]) => ({ key, value }));
};

function RequirementPanel({ requirement }: { requirement: GameRequirement }) {
  const items = normalizeRequirements(requirement.requirements);
  const notes = requirement.notes || [];

  if (items.length === 0 && notes.length === 0) {
    return (
      <div className="p-4 text-center font-mono text-xs text-muted-foreground">
        No specific hardware criteria detailed.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
          <dl className="divide-y divide-border/40">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-1 px-4 py-2.5 sm:gap-4 hover:bg-secondary/20 transition-colors"
              >
                <dt className="font-mono text-xs font-medium text-foreground/80 sm:col-span-4">
                  {item.key}
                </dt>
                <dd className="font-mono text-xs text-muted-foreground sm:col-span-8">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {notes.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-lg border border-border/40 bg-secondary/20 p-3.5">
          <div className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
            <Info className="size-3" /> Additional Notes
          </div>
          <ul className="list-inside list-disc space-y-1 font-para text-xs text-muted-foreground">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const GamePcRequirements: React.FC<GamePcRequirementsProps> = ({ pcReq }) => {
  if (!pcReq) return null;

  const hasMin = !!pcReq.min && (
    (Array.isArray(pcReq.min.requirements) && pcReq.min.requirements.length > 0) ||
    (typeof pcReq.min.requirements === "object" && pcReq.min.requirements !== null && Object.keys(pcReq.min.requirements).length > 0) ||
    (pcReq.min.notes && pcReq.min.notes.length > 0)
  );

  const hasRec = !!pcReq.rec && (
    (Array.isArray(pcReq.rec.requirements) && pcReq.rec.requirements.length > 0) ||
    (typeof pcReq.rec.requirements === "object" && pcReq.rec.requirements !== null && Object.keys(pcReq.rec.requirements).length > 0) ||
    (pcReq.rec.notes && pcReq.rec.notes.length > 0)
  );

  if (!hasMin && !hasRec) return null;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Monitor className="size-4 text-muted-foreground" />
        <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
          System Requirements
        </h3>
      </div>

      {hasMin && hasRec ? (
        <Tabs defaultValue="min" className="w-full">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="min" className="gap-1.5 font-mono text-xs">
              <Cpu className="size-3.5" /> Minimum
            </TabsTrigger>
            <TabsTrigger value="rec" className="gap-1.5 font-mono text-xs">
              <Monitor className="size-3.5" /> Recommended
            </TabsTrigger>
          </TabsList>

          <TabsContent value="min" className="mt-4">
            <RequirementPanel requirement={pcReq.min!} />
          </TabsContent>

          <TabsContent value="rec" className="mt-4">
            <RequirementPanel requirement={pcReq.rec!} />
          </TabsContent>
        </Tabs>
      ) : hasMin ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Minimum Requirements
          </span>
          <RequirementPanel requirement={pcReq.min!} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Recommended Requirements
          </span>
          <RequirementPanel requirement={pcReq.rec!} />
        </div>
      )}
    </div>
  );
};

export default GamePcRequirements;
