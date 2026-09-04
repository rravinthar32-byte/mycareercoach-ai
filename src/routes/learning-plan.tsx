import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock, FolderGit2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LEARNING_PLAN, RECOMMENDED_PROJECTS } from "@/lib/career-data";
import { useCareer } from "@/lib/career-store";

export const Route = createFileRoute("/learning-plan")({
  head: () => ({
    meta: [
      { title: "Personalized Learning Plan | CareerAI Guidance" },
      {
        name: "description",
        content:
          "A month-by-month learning roadmap with topics, durations, progress tracking and recommended portfolio projects.",
      },
      { property: "og:title", content: "Personalized Learning Plan | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Four-month AI-generated roadmap to close your skill gaps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningPlanPage,
});

function LearningPlanPage() {
  const { selectedCareer } = useCareer();
  const navigate = useNavigate();

  return (
    <AppShell>
      <PageHeader
        step="Step 6 of 9"
        title="Personalized Learning Plan"
        subtitle={`A 4-month roadmap generated for your ${selectedCareer.title} goal.`}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {LEARNING_PLAN.map((m, i) => (
          <Card
            key={m.month}
            className="glass-card animate-rise"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="pt-2">
              <div className="flex items-center gap-3">
                <span className="brand-gradient flex size-10 items-center justify-center rounded-xl">
                  <CalendarDays className="size-5 text-primary-foreground" />
                </span>
                <div>
                  <div className="font-semibold">{m.month}</div>
                  <div className="text-xs text-muted-foreground">{m.focus}</div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {m.items.map((item) => (
                  <div key={item.skill} className="rounded-xl bg-secondary/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium">{item.skill}</span>
                      <Badge variant="secondary" className="font-normal">
                        <Clock className="mr-1 size-3" /> {item.duration}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.topic}</p>
                    <Progress value={item.progress} className="mt-3 h-1.5" />
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {item.progress}% complete
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-12 flex items-center gap-2 text-xl font-semibold">
        <FolderGit2 className="size-5 text-primary" /> Recommended Projects
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {RECOMMENDED_PROJECTS.map((p, i) => (
          <Card
            key={p.title}
            className="glass-card animate-rise transition-transform duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="pt-2">
              <Badge variant="secondary">{p.level}</Badge>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.outcome}</p>
              <div className="mt-3 text-xs text-primary">{p.stack}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="hero" size="lg" onClick={() => navigate({ to: "/job-prep" })}>
          Prepare for Jobs <ArrowRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}
