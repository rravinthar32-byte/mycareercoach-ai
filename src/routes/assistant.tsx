import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bot, Send, UserRound } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCareer, firstName } from "@/lib/career-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "CareerAI Assistant | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Ask the CareerAI Assistant which career suits you, what to learn next, and whether you are ready for an internship.",
      },
      { property: "og:title", content: "CareerAI Assistant | CareerAI Guidance" },
      {
        property: "og:description",
        content: "A chat assistant that answers career questions using your student profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "Which career is best for me?",
  "What skills should I learn next?",
  "How can I become a Data Scientist?",
  "What projects should I build?",
  "Am I ready for an internship?",
];

function answerFor(q: string, name: string, career: string): string {
  const t = q.toLowerCase();
  if (t.includes("best") || t.includes("which career"))
    return `Based on your profile, ${name}, your strongest match is ${career} at 92%. Your Python foundation, interest in Data Science and AI, and your enjoyment of working with data all point the same way. Machine Learning Engineer (87%) is a close second if you enjoy engineering and deployment more than analysis.`;
  if (t.includes("skill") && t.includes("next"))
    return `Learn SQL properly first (joins, subqueries, window functions) — it is the fastest win at your current Basic level. Right after that, start Statistics fundamentals, since it is your biggest gap (25% vs the 85% required for ${career}).`;
  if (t.includes("become") || t.includes("how can i"))
    return `Follow your 4-month roadmap: Month 1 strengthen Python + SQL, Month 2 Statistics and EDA, Month 3 machine learning with scikit-learn plus two projects, Month 4 data visualization and a portfolio. Apply for a Data Analyst internship after Month 2 — it is a realistic stepping stone to ${career}.`;
  if (t.includes("project"))
    return `Start with Sales Prediction (regression basics), then Student Performance Analysis (EDA + SQL), then Customer Churn Prediction (classification + a Power BI dashboard). Each project should have a clean GitHub README with the problem, dataset, approach and results.`;
  if (t.includes("internship") || t.includes("ready"))
    return `You are about 65% ready. For a Data Analyst internship you are close — finish SQL and one portfolio project and you can start applying in ~4 weeks. For a ${career} internship, complete Statistics and one ML project first.`;
  if (t.includes("resume"))
    return `Add a two-line summary stating your ${career} goal, move skills above education, and quantify results in every project line (dataset size, accuracy, time saved).`;
  return `Here is how I read your profile, ${name}: your target is ${career}, your strengths are Python and data curiosity, and your gaps are Statistics, Machine Learning and Data Visualization. Ask me about skills, projects, internships or your roadmap and I will answer against that profile.`;
}

function AssistantPage() {
  const { profile, selectedCareer } = useCareer();
  const navigate = useNavigate();
  const name = firstName(profile.name);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: `Hi ${name}! I'm your CareerAI Assistant. I've read your profile (${profile.degree}, ${profile.year}, CGPA ${profile.cgpa}) and your goal of becoming a ${selectedCareer.title}. Ask me anything.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: answerFor(text, name, selectedCareer.title) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <AppShell>
      <PageHeader
        step="Step 8 of 9"
        title="CareerAI Assistant"
        subtitle="Answers are personalized to your profile, skills and selected career."
      />

      <Card className="glass-card animate-rise mx-auto max-w-3xl">
        <CardContent className="pt-2">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <span className="brand-gradient glow-ring flex size-10 items-center justify-center rounded-xl">
              <Bot className="size-5 text-primary-foreground" />
            </span>
            <div>
              <div className="font-semibold">CareerAI Assistant</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" /> Online
              </div>
            </div>
          </div>

          <div className="mt-5 max-h-[420px] space-y-4 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    m.role === "ai" ? "brand-gradient" : "bg-secondary",
                  )}
                >
                  {m.role === "ai" ? (
                    <Bot className="size-4 text-primary-foreground" />
                  ) : (
                    <UserRound className="size-4" />
                  )}
                </span>
                <div
                  className={cn(
                    "animate-rise max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    m.role === "ai"
                      ? "bg-secondary/60 text-foreground"
                      : "bg-primary/20 text-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bot className="size-4 text-primary" /> CareerAI is thinking…
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about careers, skills, projects or internships…"
            />
            <Button type="submit" variant="hero" size="icon" aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" size="lg" onClick={() => navigate({ to: "/dashboard" })}>
          Go to Student Dashboard <ArrowRight className="size-4" />
        </Button>
      </div>
    </AppShell>
  );
}
