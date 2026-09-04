import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  CheckCircle2,
  Circle,
  GraduationCap,
  Rocket,
  Target,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RECOMMENDED_PROJECTS } from "@/lib/career-data";
import { useCareer, firstName } from "@/lib/career-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Track your career goal, match score, skill progress, learning roadmap, projects and job preparation in one dashboard.",
      },
      { property: "og:title", content: "Student Dashboard | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Your complete career readiness overview in a single AI dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const COMPLETED = ["Python", "SQL Basics"];
const REMAINING = ["Statistics", "Machine Learning", "Data Visualization"];

const QUICK_LINKS = [
  { to: "/recommendations", label: "Career recommendation", icon: Target },
  { to: "/skill-gap", label: "Skill gap", icon: BarChart3 },
  { to: "/learning-plan", label: "Learning roadmap", icon: GraduationCap },
  { to: "/job-prep", label: "Job preparation", icon: Briefcase },
  { to: "/assistant", label: "AI Career Assistant", icon: Bot },
] as const;

function DashboardPage() {
  const { profile, selectedCareer } = useCareer();

  return (
    <AppShell>
      <PageHeader
        step="Step 9 of 9"
        title={`Welcome back, ${firstName(profile.name)}`}
        subtitle={`${profile.degree} · ${profile.year} · CGPA ${profile.cgpa}`}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Career Goal", value: selectedCareer.title, icon: Target },
          { label: "Career Match", value: `${selectedCareer.match}%`, icon: Rocket },
          { label: "Overall Skill Progress", value: "65%", icon: BarChart3 },
          { label: "Learning Progress", value: "45%", icon: GraduationCap },
        ].map((s, i) => (
          <Card key={s.label} className="glass-card animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
            <CardContent className="pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="size-4 text-primary" />
              </div>
              <div className="mt-2 text-xl font-bold text-gradient">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="glass-card animate-rise lg:col-span-2">
          <CardContent className="pt-2">
            <h2 className="font-semibold">Progress Overview</h2>
            <div className="mt-5 space-y-5">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Overall Skill Progress</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="mt-2 h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Learning Plan Progress</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="mt-2 h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Job Readiness</span>
                  <span className="text-muted-foreground">57%</span>
                </div>
                <Progress value={57} className="mt-2 h-2" />
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-xs font-semibold tracking-wide text-success uppercase">
                  Skills Completed
                </div>
                <ul className="mt-2 space-y-2">
                  {COMPLETED.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-success" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wide text-warning uppercase">
                  Skills Remaining
                </div>
                <ul className="mt-2 space-y-2">
                  {REMAINING.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Circle className="size-4 text-warning" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="glass-card animate-rise border-primary/50">
            <CardContent className="pt-2">
              <div className="text-xs font-semibold tracking-wide text-primary uppercase">
                Recommended Next Step
              </div>
              <div className="mt-2 text-lg font-semibold">Start Statistics Fundamentals</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your largest gap for {selectedCareer.title}. Estimated 3 weeks.
              </p>
              <Button asChild variant="hero" className="mt-4 w-full">
                <Link to="/learning-plan">
                  Open Learning Plan <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card animate-rise">
            <CardContent className="pt-2">
              <h3 className="font-semibold">Explore</h3>
              <div className="mt-3 space-y-2">
                {QUICK_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                  >
                    <l.icon className="size-4 text-primary" /> {l.label}
                    <ArrowRight className="ml-auto size-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Your Projects</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {RECOMMENDED_PROJECTS.map((p) => (
          <Card key={p.title} className="glass-card animate-rise">
            <CardContent className="pt-2">
              <Badge variant="secondary">{p.level}</Badge>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.outcome}</p>
              <div className="mt-3 text-xs text-primary">{p.stack}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
