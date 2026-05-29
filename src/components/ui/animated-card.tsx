import * as React from "react";

import { cn } from "@/lib/utils/index";

type AnimatedCardProps = React.HTMLAttributes<HTMLDivElement> & {
  intensity?: "subtle" | "loud";
  children?: React.ReactNode;
};

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, intensity = "subtle", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-white/10 bg-card/70 shadow-[0_18px_80px_-48px_hsl(var(--primary))] backdrop-blur-xl transition-all duration-500",
          "before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,hsl(var(--primary)/.45)_80deg,hsl(var(--accent)/.35)_150deg,transparent_230deg)] before:opacity-0 before:blur-xl before:transition-opacity before:duration-500",
          "after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(1.5rem-1px)] after:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,0%),hsl(var(--primary)/.16),transparent_34%)] after:opacity-0 after:transition-opacity after:duration-500",
          "hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_110px_-58px_hsl(var(--accent))] hover:before:opacity-100 hover:after:opacity-100",
          intensity === "loud" && "shadow-[0_28px_120px_-56px_hsl(var(--primary))] hover:scale-[1.01]",
          className,
        )}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
        }}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(110deg,transparent_20%,hsl(var(--foreground)/.08)_45%,transparent_65%)] bg-size-[220%_100%] opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    );
  },
);

AnimatedCard.displayName = "AnimatedCard";
