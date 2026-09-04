import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CAREERS, type Career } from "./career-data";

export type Profile = {
  name: string;
  degree: string;
  year: string;
  cgpa: string;
  technicalSkills: string;
  softSkills: string;
  experience: string;
  careerGoal: string;
};

export type SkillsData = {
  technical: string[];
  interests: string[];
  proficiency: string;
  enjoys: string[];
  workType: string;
};

type Ctx = {
  profile: Profile;
  setProfile: (p: Profile) => void;
  skills: SkillsData;
  setSkills: (s: SkillsData) => void;
  selectedCareer: Career;
  setSelectedCareerId: (id: string) => void;
  analyzed: boolean;
  setAnalyzed: (v: boolean) => void;
};

const defaultProfile: Profile = {
  name: "Ravinthar S",
  degree: "B.E. Computer Science and Engineering",
  year: "3rd Year",
  cgpa: "8.4",
  technicalSkills: "Python, SQL, HTML/CSS, Basic Data Analysis",
  softSkills: "Teamwork, Communication, Problem Solving",
  experience: "College data analytics workshop, 2 mini projects, NPTEL Python certification",
  careerGoal: "Become a Data Scientist in a product company",
};

const defaultSkills: SkillsData = {
  technical: ["Python", "SQL", "Data Analysis"],
  interests: ["Data Science", "Artificial Intelligence"],
  proficiency: "Basic",
  enjoys: ["Working with data", "Solving logical problems"],
  workType: "Hybrid",
};

const CareerContext = createContext<Ctx | null>(null);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [skills, setSkills] = useState<SkillsData>(defaultSkills);
  const [selectedCareerId, setSelectedCareerId] = useState("data-scientist");
  const [analyzed, setAnalyzed] = useState(false);

  const value = useMemo<Ctx>(
    () => ({
      profile,
      setProfile,
      skills,
      setSkills,
      selectedCareer: CAREERS.find((c) => c.id === selectedCareerId) ?? CAREERS[0],
      setSelectedCareerId,
      analyzed,
      setAnalyzed,
    }),
    [profile, skills, selectedCareerId, analyzed],
  );

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
}

export function useCareer() {
  const ctx = useContext(CareerContext);
  if (!ctx) throw new Error("useCareer must be used inside CareerProvider");
  return ctx;
}

export function firstName(name: string) {
  return name.trim().split(" ")[0] || "Student";
}
