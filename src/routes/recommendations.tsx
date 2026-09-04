import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Briefcase, Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CAREERS } from "@/lib/career-data";
import { useCareer } from "@/lib/career-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Career Recommendations | CareerAI Guidance" },
      {
        name: "description",
        content:
          "See your top matching careers with match percentages, why each fits you, required skills and role descriptions.",
      },
      { property: "og:title", content: "Career Recommendations | CareerAI Guidance" },
      {
        property: "og:description",
        content: "AI-matched careers ranked by fit, with reasons and required skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const { selectedCareer, setSelectedCareerId } = useCareer();
  const navigate = useNavigate();

  return (
    <AppShell>
      <PageHeader
        step="Step 4 of 9"
        title="Career Recommendations"
        subtitle="Select a career to run the skill gap analysis against it."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {CAREERS.map((c, i) => {
          const active = c.id === selectedCareer.id;
          return (
            <Card
              key={c.id}
              onClick={() => setSelectedCareerId(c.id)}
              className={cn(
                "glass-card animate-rise cursor-pointer transition-all duration-300 hover:-translate-y-1",
                active && "border-primary/60 glow-ring",
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardContent className="pt-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        #{i + 1}
                      </span>
                      <h2 className="text-lg font-semibold">{c.title}</h2>
                      {active && (
                        <Badge className="bg-primary/20 text-primary">
                          <BadgeCheck className="mr-1 size-3" /> Selected
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-bold text-gradient">{c.match}%</div>
                    <div className="text-[11px] text-muted-foreground">Match</div>
                  </div>
                </div>

                <Progress value={c.match} className="mt-4 h-2" />

                <div className="mt-5">
                  <div className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Why it matches you
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {c.why.map((w) => (
                      <li key={w} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Required skills
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.required.map((r) => (
                      <Badge key={r} variant="secondary" className="font-normal">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="size-3.5" /> {c.salary}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="hero" size="lg" onClick={() => navigate({ to: "/skill-gap" })}>
          View Skill Gap for {selectedCareer.title} <ArrowRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}
