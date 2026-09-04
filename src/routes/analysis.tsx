import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ANALYSIS_STEPS } from "@/lib/career-data";
import { useCareer, firstName } from "@/lib/career-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "AI Profile Analysis | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Watch the AI analyze your skills, interests, strengths, experience and career goals to build career recommendations.",
      },
      { property: "og:title", content: "AI Profile Analysis | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Real-time AI analysis of your student profile across 120+ career paths.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const navigate = useNavigate();
  const { profile, setAnalyzed } = useCareer();
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setStep(0);
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= ANALYSIS_STEPS.length) {
          clearInterval(timer);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(timer);
  }, [runId]);

  const done = step >= ANALYSIS_STEPS.length;
  useEffect(() => {
    if (done) setAnalyzed(true);
  }, [done, setAnalyzed]);

  const percent = Math.round((step / ANALYSIS_STEPS.length) * 100);

  return (
    <AppShell>
      <PageHeader step="Step 3 of 9" title="AI Analysis" />

      <Card className="glass-card animate-rise mx-auto max-w-2xl">
        <CardContent className="pt-4 text-center">
          <div className="relative mx-auto flex size-24 items-center justify-center">
            {!done && (
              <>
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-primary/30" />
                <span
                  className="animate-pulse-ring absolute inset-0 rounded-full bg-accent/25"
                  style={{ animationDelay: "0.8s" }}
                />
              </>
            )}
            <span
              className={cn(
                "relative flex size-20 items-center justify-center rounded-full",
                done ? "bg-success/20" : "brand-gradient glow-ring",
              )}
            >
              {done ? (
                <CheckCircle2 className="size-10 text-success" />
              ) : (
                <BrainCircuit className="size-9 text-primary-foreground" />
              )}
            </span>
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            {done
              ? "Your profile analysis is complete."
              : `Analyzing ${firstName(profile.name)}'s profile…`}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {done
              ? "The AI matched your skills, interests and goals to the best-fitting career paths."
              : "Evaluating skills, interests, strengths, experience and career goals."}
          </p>

          <Progress value={percent} className="mt-6 h-2" />
          <div className="mt-2 text-xs text-muted-foreground">{percent}% complete</div>

          <ul className="mt-7 space-y-2 text-left">
            {ANALYSIS_STEPS.map((s, i) => {
              const state = i < step ? "done" : i === step ? "active" : "idle";
              return (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-300",
                    state === "done" && "border-success/30 bg-success/10 text-foreground",
                    state === "active" && "border-primary/40 bg-primary/10 text-foreground",
                    state === "idle" && "border-border/60 bg-secondary/30 text-muted-foreground",
                  )}
                >
                  {state === "done" ? (
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                  ) : state === "active" ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                  ) : (
                    <span className="size-4 shrink-0 rounded-full border border-border" />
                  )}
                  {s}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              variant="hero"
              size="lg"
              disabled={!done}
              onClick={() => navigate({ to: "/recommendations" })}
            >
              View Career Recommendations <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setRunId((r) => r + 1)}>
              <RotateCcw className="size-4" /> Re-run analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
