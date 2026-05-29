import { cn } from "@/lib/utils/index";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card/70 p-4 shadow-[0_18px_80px_-54px_hsl(var(--primary))] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_110px_-62px_hsl(var(--accent))]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/.18),transparent_30%),radial-gradient(circle_at_90%_15%,hsl(var(--accent)/.12),transparent_32%)] before:opacity-70",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(1.5rem-1px)] after:ring-1 after:ring-inset after:ring-white/10",
        className,
      )}
    >
      <div className="relative z-10">{header}</div>
      <div className="relative z-10 transition duration-300 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 text-base font-black tracking-tight text-foreground">
          {title}
        </div>
        <div className="text-xs font-medium leading-relaxed text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};
