import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  FileText,
  FolderGit2,
  MessageSquare,
  Mic,
  Code2,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export const Route = createFileRoute("/job-prep")({
  head: () => ({
    meta: [
      { title: "Job & Internship Preparation | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Resume improvements, portfolio projects, interview practice, technical questions and internship recommendations tailored to you.",
      },
      { property: "og:title", content: "Job & Internship Preparation | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Get interview, resume and internship ready with personalized AI guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobPrepPage,
});

const AREAS = [
  {
    icon: FileText,
    title: "Resume Improvement",
    score: 62,
    points: [
      "Add a 2-line summary mentioning Data Science goal",
      "Quantify project outcomes (accuracy, dataset size)",
      "Move skills section above education",
    ],
  },
  {
    icon: FolderGit2,
    title: "Portfolio Projects",
    score: 40,
    points: [
      "Publish 3 projects on GitHub with clean READMEs",
      "Add a short case study for each project",
      "Include a live dashboard link",
    ],
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    score: 55,
    points: [
      "Practice 20 SQL query questions",
      "Prepare 3 STAR stories from college projects",
      "Do 2 mock interviews per week",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication Skills",
    score: 70,
    points: [
      "Explain a project in 90 seconds without jargon",
      "Join a technical presentation club",
      "Record and review your answers",
    ],
  },
];

const QUESTIONS = [
  "Explain the difference between supervised and unsupervised learning.",
  "How would you handle missing values in a dataset?",
  "Write a SQL query to find the second highest salary.",
  "What is overfitting and how do you prevent it?",
  "Explain p-value in simple terms.",
];

const INTERNSHIPS = [
  { role: "Data Analyst Intern", org: "FinTech startup", mode: "Hybrid · 3 months", fit: "High" },
  { role: "ML Research Intern", org: "College AI Lab", mode: "On-site · 6 months", fit: "Medium" },
  { role: "BI Intern", org: "E-commerce company", mode: "Remote · 2 months", fit: "High" },
];

function JobPrepPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <PageHeader
        step="Step 7 of 9"
        title="Job & Internship Preparation"
        subtitle="Personalized preparation recommendations based on your profile and target role."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {AREAS.map((a, i) => (
          <Card key={a.title} className="glass-card animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
            <CardContent className="pt-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="brand-gradient flex size-10 items-center justify-center rounded-xl">
                    <a.icon className="size-5 text-primary-foreground" />
                  </span>
                  <h2 className="font-semibold">{a.title}</h2>
                </div>
                <span className="text-sm font-semibold text-gradient">{a.score}%</span>
              </div>
              <Progress value={a.score} className="mt-4 h-1.5" />
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {a.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="glass-card animate-rise">
          <CardContent className="pt-2">
            <h2 className="flex items-center gap-2 font-semibold">
              <Code2 className="size-4 text-primary" /> Technical Interview Questions
            </h2>
            <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
              {QUESTIONS.map((q, i) => (
                <li key={q} className="rounded-lg bg-secondary/40 px-3 py-2">
                  {i + 1}. {q}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="glass-card animate-rise">
          <CardContent className="pt-2">
            <h2 className="flex items-center gap-2 font-semibold">
              <Building2 className="size-4 text-primary" /> Internship Recommendations
            </h2>
            <div className="mt-4 space-y-3">
              {INTERNSHIPS.map((it) => (
                <div key={it.role} className="rounded-xl bg-secondary/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{it.role}</span>
                    <Badge variant="secondary">{it.fit} fit</Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {it.org} · {it.mode}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={() => toast.success("Resume review tips generated")}>
          <FileText className="size-4" /> Improve Resume
        </Button>
        <Button variant="outline" onClick={() => toast.success("Mock interview session started")}>
          <Mic className="size-4" /> Practice Interview
        </Button>
        <Button variant="outline" onClick={() => navigate({ to: "/learning-plan" })}>
          <FolderGit2 className="size-4" /> View Projects
        </Button>
        <Button variant="hero" onClick={() => navigate({ to: "/assistant" })}>
          Ask CareerAI Assistant <ArrowRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}
