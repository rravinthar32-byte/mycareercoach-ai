import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Target } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SKILL_GAP } from "@/lib/career-data";
import { useCareer } from "@/lib/career-store";

export const Route = createFileRoute("/skill-gap")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Compare your current skill levels with what your target career requires and see exactly which skills to improve.",
      },
      { property: "og:title", content: "Skill Gap Analysis | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Visual current vs required skill comparison for your chosen career path.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillGapPage,
});

function SkillGapPage() {
  const { selectedCareer } = useCareer();
  const navigate = useNavigate();
  const weak = SKILL_GAP.filter((s) => s.required - s.current >= 40);
  const overall = Math.round(
    SKILL_GAP.reduce((a, s) => a + (s.current / s.required) * 100, 0) / SKILL_GAP.length,
  );

  return (
    <AppShell>
      <PageHeader
        step="Step 5 of 9"
        title="Skill Gap Analysis"
        subtitle={`Your current skills compared with what a ${selectedCareer.title} needs.`}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="glass-card animate-rise lg:col-span-2">
          <CardContent className="pt-2">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-primary" />
              <h2 className="font-semibold">Target Career: {selectedCareer.title}</h2>
            </div>

            <div className="mt-6 space-y-6">
              {SKILL_GAP.map((s) => (
                <div key={s.skill}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{s.skill}</span>
                    <span className="text-xs text-muted-foreground">
                      Current: <span className="text-foreground">{s.currentLabel}</span> ·
                      Required: <span className="text-foreground">{s.required}%</span>
                    </span>
                  </div>
                  <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-secondary/70">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary/25"
                      style={{ width: `${s.required}%` }}
                    />
                    <div
                      className="brand-gradient absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                      style={{ width: `${s.current}%` }}
                    />
                  </div>
                  <div className="mt-1.5 text-xs text-muted-foreground">{s.topic}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary/40 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Legend:</span>
              <span className="flex items-center gap-1.5">
                <span className="brand-gradient size-3 rounded-full" /> Current level
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-primary/25" /> Required level
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="glass-card animate-rise" style={{ animationDelay: "80ms" }}>
            <CardContent className="pt-2 text-center">
              <div className="text-xs text-muted-foreground">Overall Readiness</div>
              <div className="mt-1 text-4xl font-bold text-gradient">{overall}%</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Based on {SKILL_GAP.length} core skills for this role.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card animate-rise" style={{ animationDelay: "160ms" }}>
            <CardContent className="pt-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-warning" />
                <h3 className="font-semibold">Skills You Need to Improve</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {weak.map((s) => (
                  <li key={s.skill} className="rounded-xl border border-warning/30 bg-warning/10 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{s.skill}</span>
                      <Badge variant="secondary">+{s.required - s.current}% needed</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{s.topic}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="hero" size="lg" onClick={() => navigate({ to: "/learning-plan" })}>
          Generate Learning Plan <ArrowRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}
