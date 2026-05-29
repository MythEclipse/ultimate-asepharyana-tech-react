"use client";


import { lazy, Suspense } from "react";

import { AnimatedCard } from "@/components/ui/animated-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NoSSR } from "@/components/ui/no-ssr";
import { Section } from "@/components/ui/section";
import { useGitHubStats } from "@/lib/hooks/use-github-stats";

const ActivityLoader = () => (
  <Card className="col-span-1 lg:col-span-2 w-full p-8 flex flex-col items-center justify-center min-h-90 border border-border/10 bg-background">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      <p className="text-base font-medium text-foreground">Loading activity...</p>
    </div>
  </Card>
);

const ChartSkeleton = () => (
  <div className="h-100 w-full flex items-center justify-center opacity-50">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary/80 animate-spin" />
  </div>
);

const SkillsRadarChart = lazy(
  () => import("@/components/d3/skills-radar-chart").then((mod) => ({ default: mod.SkillsRadarChart })),
);

const ActivityHeatmap = lazy(
  () => import("@/components/d3/activity-heatmap").then((mod) => ({ default: mod.ActivityHeatmap })),
);

export function ActivitySection() {
  const { data, isLoading } = useGitHubStats();
  const contributions = data?.contributions ?? [];
  const languages = data?.languages ?? [];

  return (
    <Section className="py-24 w-full relative">
      <div className="w-full flex flex-col items-center mb-24 relative text-center">
        <Badge variant="glow" className="mb-4">Activity Matrix</Badge>
        <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">Development <span className="text-foreground">Activity</span></h2>
      </div>

      <NoSSR fallback={<ActivityLoader />}>
        {isLoading ? (
          <ActivityLoader />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <AnimatedCard className="p-8" intensity="loud">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
              <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Intelligence Radar</span>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-foreground">Core Expertise</h3>
              </div>
              <div className="flex min-h-100 w-full items-center justify-center">
                {languages.length ? <Suspense fallback={<ChartSkeleton />}><SkillsRadarChart data={languages} /></Suspense> : (<div className="space-y-2 text-center"><p className="text-sm font-medium italic text-muted-foreground">Live statistics currently unavailable. Please try again later.</p><Badge variant="outline" className="text-[10px] opacity-50">Public API Fallback Active</Badge></div>)}
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-8" intensity="loud">
              <div className="absolute left-6 top-8 h-20 w-20 rounded-full bg-accent/10 blur-3xl" />
              <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">Development Pulse</span>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-foreground">Technical Consistency</h3>
              </div>
              <div className="flex min-h-100 w-full items-center justify-center">
                {contributions.length ? <Suspense fallback={<ChartSkeleton />}><ActivityHeatmap data={contributions} /></Suspense> : (<div className="space-y-2 text-center"><p className="text-sm font-medium italic text-muted-foreground">No contribution data detected in public manifest.</p><Badge variant="outline" className="text-[10px] opacity-50">1-Year Scraper Syncing...</Badge></div>)}
              </div>
            </AnimatedCard>
          </div>
        )}
      </NoSSR>
    </Section>
  );
}
