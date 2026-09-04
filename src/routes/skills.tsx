import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ENJOY_AREAS,
  INTERESTS,
  PROFICIENCY,
  TECH_SKILLS,
  WORK_TYPES,
} from "@/lib/career-data";
import { useCareer } from "@/lib/career-store";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Interests | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Select your technical skills, interests, proficiency level and preferred work type so the AI can analyze your profile.",
      },
      { property: "og:title", content: "Skills & Interests | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Choose skills, interests and work preferences for AI career matching.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all duration-200",
        active
          ? "border-primary/60 bg-primary/15 text-foreground glow-ring"
          : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {active && <Check className="size-3.5 text-primary" />}
      {label}
    </button>
  );
}

function SkillsPage() {
  const { skills, setSkills } = useCareer();
  const navigate = useNavigate();

  const toggle = (key: "technical" | "interests" | "enjoys", value: string) => {
    const list = skills[key];
    setSkills({
      ...skills,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  return (
    <AppShell>
      <PageHeader
        step="Step 2 of 9"
        title="Skills & Interests"
        subtitle="Select everything that applies. The AI weighs skills, interests and preferences differently."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="glass-card animate-rise">
          <CardContent className="space-y-4 pt-2">
            <h2 className="font-semibold">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {TECH_SKILLS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={skills.technical.includes(s)}
                  onClick={() => toggle("technical", s)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-rise" style={{ animationDelay: "80ms" }}>
          <CardContent className="space-y-4 pt-2">
            <h2 className="font-semibold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={skills.interests.includes(s)}
                  onClick={() => toggle("interests", s)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-rise" style={{ animationDelay: "160ms" }}>
          <CardContent className="space-y-4 pt-2">
            <h2 className="font-semibold">Areas You Enjoy</h2>
            <div className="flex flex-wrap gap-2">
              {ENJOY_AREAS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={skills.enjoys.includes(s)}
                  onClick={() => toggle("enjoys", s)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-rise" style={{ animationDelay: "240ms" }}>
          <CardContent className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label>Skill Proficiency Level</Label>
              <div className="flex flex-wrap gap-2">
                {PROFICIENCY.map((p) => (
                  <Chip
                    key={p}
                    label={p}
                    active={skills.proficiency === p}
                    onClick={() => setSkills({ ...skills, proficiency: p })}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label>Preferred Work Type</Label>
              <div className="flex flex-wrap gap-2">
                {WORK_TYPES.map((w) => (
                  <Chip
                    key={w}
                    label={w}
                    active={skills.workType === w}
                    onClick={() => setSkills({ ...skills, workType: w })}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="hero" size="lg" onClick={() => navigate({ to: "/analysis" })}>
          <Sparkles className="size-4" /> Analyze My Profile
        </Button>
      </div>
    </AppShell>
  );
}
