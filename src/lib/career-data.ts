export const TECH_SKILLS = [
  "Python",
  "Java",
  "SQL",
  "HTML/CSS",
  "Machine Learning",
  "Data Analysis",
  "Cloud Computing",
  "Cybersecurity",
] as const;

export const INTERESTS = [
  "Software Development",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "UI/UX Design",
] as const;

export const ENJOY_AREAS = [
  "Solving logical problems",
  "Working with data",
  "Building products",
  "Research & experimentation",
  "Designing interfaces",
  "Team collaboration",
] as const;

export const WORK_TYPES = ["On-site", "Hybrid", "Remote", "Internship first"] as const;

export const PROFICIENCY = ["Beginner", "Basic", "Good", "Advanced"] as const;
export type Proficiency = (typeof PROFICIENCY)[number];

export const PROFICIENCY_VALUE: Record<Proficiency, number> = {
  Beginner: 25,
  Basic: 45,
  Good: 70,
  Advanced: 92,
};

export type Career = {
  id: string;
  title: string;
  match: number;
  description: string;
  why: string[];
  required: string[];
  salary: string;
};

export const CAREERS: Career[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    match: 92,
    description:
      "Turns raw data into predictions and business decisions using statistics, machine learning and storytelling with data.",
    why: [
      "Strong Python foundation matches the core language of the role",
      "Interest in Data Science and Artificial Intelligence",
      "Enjoys working with data and experimentation",
      "Career goal aligned with analytics-driven roles",
    ],
    required: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
    salary: "₹6–12 LPA (entry level)",
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    match: 87,
    description:
      "Builds and deploys ML models into real production systems, combining software engineering with applied AI.",
    why: [
      "Python and ML interest overlap strongly with this role",
      "Comfort with logical problem solving",
      "Cloud Computing interest supports model deployment",
    ],
    required: ["Python", "Machine Learning", "Deep Learning", "MLOps", "Cloud Computing"],
    salary: "₹7–14 LPA (entry level)",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    match: 82,
    description:
      "Explores datasets, builds dashboards and reports that help teams understand performance and take action.",
    why: [
      "SQL and Data Analysis skills already in progress",
      "Fastest path to an internship with current skill level",
      "Strong fit for reporting and business insight work",
    ],
    required: ["SQL", "Excel", "Data Visualization", "Statistics", "Business Sense"],
    salary: "₹4–8 LPA (entry level)",
  },
  {
    id: "software-developer",
    title: "Software Developer",
    match: 76,
    description:
      "Designs, writes and maintains applications and services used by real users every day.",
    why: [
      "Programming fundamentals in Python and Java",
      "Interest in Software Development",
      "Good foundation in web basics (HTML/CSS)",
    ],
    required: ["Java", "Data Structures", "APIs", "Databases", "Version Control"],
    salary: "₹4.5–10 LPA (entry level)",
  },
];

export type SkillGapRow = {
  skill: string;
  current: number;
  currentLabel: Proficiency;
  required: number;
  topic: string;
};

export const SKILL_GAP: SkillGapRow[] = [
  {
    skill: "Python",
    current: 70,
    currentLabel: "Good",
    required: 90,
    topic: "Pandas, NumPy, clean code",
  },
  {
    skill: "SQL",
    current: 45,
    currentLabel: "Basic",
    required: 85,
    topic: "Joins, window functions, subqueries",
  },
  {
    skill: "Statistics",
    current: 25,
    currentLabel: "Beginner",
    required: 85,
    topic: "Probability, distributions, hypothesis testing",
  },
  {
    skill: "Machine Learning",
    current: 25,
    currentLabel: "Beginner",
    required: 88,
    topic: "Regression, classification, model evaluation",
  },
  {
    skill: "Data Visualization",
    current: 25,
    currentLabel: "Beginner",
    required: 80,
    topic: "Matplotlib, Seaborn, Power BI",
  },
];

export type LearningItem = {
  skill: string;
  topic: string;
  duration: string;
  progress: number;
};

export const LEARNING_PLAN: { month: string; focus: string; items: LearningItem[] }[] = [
  {
    month: "Month 1",
    focus: "Strengthen the foundation",
    items: [
      { skill: "Python", topic: "Pandas & NumPy for data handling", duration: "3 weeks", progress: 80 },
      { skill: "SQL", topic: "SQL fundamentals & joins", duration: "2 weeks", progress: 55 },
    ],
  },
  {
    month: "Month 2",
    focus: "Think like an analyst",
    items: [
      { skill: "Statistics", topic: "Descriptive stats & probability", duration: "3 weeks", progress: 20 },
      { skill: "Data Analysis", topic: "EDA on real datasets", duration: "2 weeks", progress: 10 },
    ],
  },
  {
    month: "Month 3",
    focus: "Enter machine learning",
    items: [
      { skill: "Machine Learning", topic: "Supervised learning with scikit-learn", duration: "4 weeks", progress: 0 },
      { skill: "Projects", topic: "2 beginner ML projects", duration: "2 weeks", progress: 0 },
    ],
  },
  {
    month: "Month 4",
    focus: "Show your work",
    items: [
      { skill: "Data Visualization", topic: "Seaborn & Power BI dashboards", duration: "3 weeks", progress: 0 },
      { skill: "Portfolio", topic: "GitHub portfolio + case studies", duration: "3 weeks", progress: 0 },
    ],
  },
];

export const RECOMMENDED_PROJECTS = [
  {
    title: "Sales Prediction",
    level: "Beginner",
    stack: "Python · Pandas · Linear Regression",
    outcome: "Predict monthly sales from historical retail data.",
  },
  {
    title: "Student Performance Analysis",
    level: "Beginner",
    stack: "Python · SQL · Seaborn",
    outcome: "Find the factors that influence academic scores.",
  },
  {
    title: "Customer Churn Prediction",
    level: "Intermediate",
    stack: "scikit-learn · Classification · Power BI",
    outcome: "Flag customers likely to leave and explain why.",
  },
];

export const ANALYSIS_STEPS = [
  "Reading academic profile and CGPA",
  "Mapping technical & soft skills",
  "Matching interests with career clusters",
  "Evaluating strengths and experience",
  "Comparing against 120+ career paths",
  "Generating personalized recommendations",
];
