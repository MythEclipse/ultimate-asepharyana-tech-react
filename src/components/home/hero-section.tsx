"use client";

import { IconArrowRight, IconBrandGithub, IconSparkles } from "@tabler/icons-react";

import { HeroScene } from "@/components/three/hero-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import githubStats from "@/lib/data/github-stats.json";

export function HeroSection() {
  const totalContributions = githubStats.totalContributions ??
    (githubStats as any).contributions?.reduce((sum: number, item: any) => sum + item.count, 0) ?? 0;

  return (
    <section className="relative flex min-h-[94vh] w-full flex-col items-center justify-center overflow-hidden pb-20 pt-32 transition-all duration-700">
      <div className="absolute inset-0 -z-10 opacity-90">
        <HeroScene />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/.22),transparent_62%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 animate-orbit-slow" />

      <div className="relative z-10 my-20 flex w-full justify-center px-4 text-center sm:px-6">
        <div className="flex max-w-xl flex-col items-center sm:max-w-5xl">
          <Badge variant="glass" className="mb-6 gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.24em] shadow-2xl shadow-primary/10">
            <IconSparkles className="h-3.5 w-3.5 text-primary" /> Orbital Frontend Lab
          </Badge>

          <h1 className="mb-8 text-balance text-[clamp(3rem,9vw,7.2rem)] font-black leading-[0.85] tracking-[-0.08em] text-foreground">
            Web Portfolio
            <span className="block bg-[linear-gradient(120deg,hsl(var(--foreground)),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--foreground)))] bg-[length:220%_100%] bg-clip-text pb-2 text-transparent animate-gradient-x">
              Asep Haryana
            </span>
          </h1>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <div className="glass rounded-full px-4 py-2 text-sm font-bold text-foreground shadow-xl shadow-primary/10">
              <IconBrandGithub className="mr-2 inline h-4 w-4 text-primary" />
              {totalContributions.toLocaleString()} kontribusi GitHub
            </div>
            <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/10">
              React · Tailwind · Three.js
            </div>
          </div>

          <p className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
            Halo, saya <span className="font-black text-foreground decoration-primary/40 underline decoration-2 underline-offset-8">Asep Haryana Saputra</span>. Saya membuat proyek frontend yang terasa hidup: cepat, responsif, dan punya identitas visual yang kuat.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Button href="/project" size="xl" variant="shiny" className="shadow-2xl shadow-primary/25">
              View Portfolio <IconArrowRight className="ml-2" />
            </Button>
            <Button href="mailto:superaseph@gmail.com" size="xl" variant="outline" className="glass border-hairline hover:bg-foreground/5">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="h-12 w-px bg-linear-to-b from-primary via-accent/50 to-transparent" />
      </div>
    </section>
  );
}
