"use client";

import { IconCode, IconSatellite } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Section } from "@/components/ui/section";
import { TECH_STACK } from "@/lib/data/tech-stack";

export function TechArsenal() {
  return (
    <Section className="w-full py-24" glow>
      <div className="mb-16 flex flex-col gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div>
          <Badge variant="glass" className="mb-4 gap-2 px-4 py-2 uppercase tracking-[0.22em]">
            <IconSatellite className="h-3.5 w-3.5 text-primary" /> Capabilities
          </Badge>
          <h2 className="text-balance text-4xl font-black tracking-[-0.05em] text-foreground md:text-6xl">
            Beginner <span className="text-gradient">Tech Stack</span>
          </h2>
        </div>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
          Core tools yang sedang saya eksplorasi lewat practice projects — divisualkan sebagai command deck interaktif.
        </p>
      </div>

      <BentoGrid className="px-0">
        {TECH_STACK.slice(0, 6).map((item, index) => (
          <BentoGridItem
            key={item.name}
            className={index === 0 || index === 3 ? "md:col-span-2" : ""}
            title={item.name}
            description={item.description}
            icon={<IconCode className="mb-2 h-5 w-5 text-primary" />}
            header={
              <div className="group/header relative flex h-full min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-background/35 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/.28),transparent_42%),linear-gradient(135deg,hsl(var(--accent)/.12),transparent)] opacity-80 transition duration-500 group-hover/header:opacity-100" />
                <div className="absolute inset-x-8 top-1/2 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent" />
                <div className="relative rounded-3xl border border-primary/15 bg-background/45 p-5 shadow-2xl shadow-primary/15 transition duration-500 group-hover/header:scale-110 group-hover/header:rotate-3">
                  <img src={item.image} alt={item.name} loading="lazy" className="h-14 w-14 object-contain drop-shadow-2xl" />
                </div>
              </div>
            }
          />
        ))}
      </BentoGrid>
    </Section>
  );
}
