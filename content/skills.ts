export type SkillIcon =
  | "excel" | "powerbi" | "database" | "python" | "pandas" | "numpy"
  | "workflow" | "git" | "github" | "react" | "next" | "typescript" | "ai";

export const skillGroups = [
  { label: "Data & BI", skills: [
    { name: "Excel", icon: "excel" }, { name: "Power BI", icon: "powerbi" },
    { name: "SQL", icon: "database" }, { name: "ETL", icon: "workflow" },
  ] },
  { label: "Python & Data", skills: [
    { name: "Python", icon: "python" }, { name: "Pandas", icon: "pandas" },
    { name: "NumPy", icon: "numpy" }, { name: "Applied AI", icon: "ai" },
  ] },
  { label: "Engineering", skills: [
    { name: "Git", icon: "git" }, { name: "GitHub", icon: "github" },
    { name: "React", icon: "react" }, { name: "Next.js", icon: "next" },
    { name: "TypeScript", icon: "typescript" },
  ] },
] as const satisfies ReadonlyArray<{ label: string; skills: ReadonlyArray<{ name: string; icon: SkillIcon }> }>;
