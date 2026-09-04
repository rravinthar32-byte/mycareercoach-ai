import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Compass, GraduationCap, Sparkles, Target } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI-Based Personalized Career Guidance for Students" },
      {
        name: "description",
        content:
          "Discover the right career path based on your skills, interests and goals with AI-powered recommendations, skill gap analysis and a learning plan.",
      },
      { property: "og:title", content: "AI-Based Personalized Career Guidance" },
      {
        property: "og:description",
        content:
          "Personalized career recommendations, skill gap analysis and an AI learning plan for college students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    icon: Target,
    title: "Personalized Career Recommendations",
    text: "Match your profile against 120+ career paths and see exactly why each one fits you.",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Analysis",
    text: "Compare your current skills with what the role really demands, visualised clearly.",
  },
  {
    icon: GraduationCap,
    title: "AI Learning Plan",
    text: "A month-by-month roadmap with topics, durations, projects and progress tracking.",
  },
];

const STATS = [
  { value: "120+", label: "Career paths analysed" },
  { value: "40+", label: "Skills tracked" },
  { value: "4 months", label: "Typical roadmap" },
  { value: "92%", label: "Top match accuracy" },
];

function Home() {
  return (
    <AppShell>
      <section className="animate-rise relative overflow-hidden rounded-3xl border border-border/70 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ backgroundImage: "var(--gradient-glow)" }}
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" /> AI Ideation · Design Thinking Prototype
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
          AI-Based <span className="text-gradient">Personalized Career Guidance</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Discover the right career path based on your skills, interests, and goals.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="hero">
            <Link to="/profile">
              Get Started <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/recommendations">
              <Compass className="size-4" /> Explore Careers
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-gradient sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Card
            key={f.title}
            className="glass-card animate-rise transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <CardContent className="pt-2">
              <span className="brand-gradient flex size-11 items-center justify-center rounded-xl">
                <f.icon className="size-5 text-primary-foreground" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-border/70 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">How the system works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Right Career", "AI matches you to careers that fit your profile."],
            ["Right Skills", "Skill gaps are identified against real job requirements."],
            ["Right Learning Path", "A month-wise plan with topics and projects."],
            ["Better Preparation", "Resume, portfolio and interview readiness."],
          ].map(([title, text], i) => (
            <div key={title} className="rounded-xl bg-secondary/50 p-4">
              <div className="text-xs font-semibold text-primary">STEP {i + 1}</div>
              <div className="mt-1 font-semibold">{title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
