import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile" },
  { to: "/skills", label: "Skills" },
  { to: "/analysis", label: "AI Analysis" },
  { to: "/recommendations", label: "Careers" },
  { to: "/skill-gap", label: "Skill Gap" },
  { to: "/learning-plan", label: "Learning Plan" },
  { to: "/job-prep", label: "Job Prep" },
  { to: "/assistant", label: "Assistant" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="brand-gradient glow-ring flex size-9 items-center justify-center rounded-xl">
              <Brain className="size-5 text-primary-foreground" />
            </span>
            <span className="text-sm leading-tight font-semibold">
              Career<span className="text-gradient">AI</span>
              <span className="block text-[11px] font-normal text-muted-foreground">
                Guidance System
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === item.to && "bg-secondary text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        {open && (
          <div className="grid grid-cols-2 gap-1 border-t border-border/70 px-4 py-3 sm:grid-cols-3 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === item.to && "bg-secondary text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>

      <footer className="border-t border-border/70 py-8 text-center text-xs text-muted-foreground">
        Right Career → Right Skills → Right Learning Path → Better Career Preparation
      </footer>
    </div>
  );
}

export function PageHeader({
  step,
  title,
  subtitle,
}: {
  step?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="animate-rise mb-8">
      {step && (
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
          {step}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
