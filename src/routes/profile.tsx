import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, UserRound } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCareer } from "@/lib/career-store";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile | CareerAI Guidance" },
      {
        name: "description",
        content:
          "Enter your degree, year of study, CGPA, technical and soft skills, experience and career goal to start your AI career analysis.",
      },
      { property: "og:title", content: "Student Profile | CareerAI Guidance" },
      {
        property: "og:description",
        content: "Build your academic and skill profile for personalized career guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, setProfile } = useCareer();
  const navigate = useNavigate();

  const field = (key: keyof typeof profile) => ({
    value: profile[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setProfile({ ...profile, [key]: e.target.value }),
  });

  return (
    <AppShell>
      <PageHeader
        step="Step 1 of 9"
        title="Student Profile"
        subtitle="Tell the system about your academics and background. Sample data is pre-filled for the demo."
      />

      <Card className="glass-card animate-rise mx-auto max-w-3xl">
        <CardContent className="pt-2">
          <div className="flex items-center gap-3 border-b border-border/70 pb-5">
            <span className="brand-gradient flex size-10 items-center justify-center rounded-xl">
              <UserRound className="size-5 text-primary-foreground" />
            </span>
            <div>
              <div className="font-semibold">Academic & Background Details</div>
              <div className="text-xs text-muted-foreground">All fields are editable</div>
            </div>
          </div>

          <form
            className="mt-6 grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile saved");
              navigate({ to: "/skills" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required {...field("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree / Department</Label>
              <Input id="degree" required {...field("degree")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Input id="year" required {...field("year")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cgpa">Current CGPA</Label>
              <Input id="cgpa" required {...field("cgpa")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tech">Technical Skills</Label>
              <Input id="tech" {...field("technicalSkills")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="soft">Soft Skills</Label>
              <Input id="soft" {...field("softSkills")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="exp">Previous Experience</Label>
              <Textarea id="exp" rows={3} {...field("experience")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="goal">Career Goal</Label>
              <Textarea id="goal" rows={2} {...field("careerGoal")} />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Continue to Skills &amp; Interests <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
