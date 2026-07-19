import { BrainCircuit, ChartNoAxesCombined, Database, GitBranch, Table2, Workflow } from "lucide-react";
import {
  siGithub, siNextdotjs, siNumpy, siPandas, siPython, siReact, siTypescript,
} from "simple-icons/icons";
import type { SkillIcon } from "@/content/skills";

const iconMap = {
  python: siPython, pandas: siPandas,
  numpy: siNumpy, github: siGithub, react: siReact, next: siNextdotjs, typescript: siTypescript,
} as const;

export function BrandIcon({ icon }: { icon: SkillIcon }) {
  if (icon === "excel") return <Table2 aria-hidden="true" />;
  if (icon === "powerbi") return <ChartNoAxesCombined aria-hidden="true" />;
  if (icon === "database") return <Database aria-hidden="true" />;
  if (icon === "workflow") return <Workflow aria-hidden="true" />;
  if (icon === "git") return <GitBranch aria-hidden="true" />;
  if (icon === "ai") return <BrainCircuit aria-hidden="true" />;
  const brand = iconMap[icon];
  return <svg role="img" aria-hidden="true" viewBox="0 0 24 24"><path d={brand.path} /></svg>;
}
