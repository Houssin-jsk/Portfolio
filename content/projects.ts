export type ProjectStatus = "Featured case study" | "Work summary" | "Project overview";

export type Project = {
  slug: string;
  name: string;
  category: string;
  problem: string;
  tools: readonly string[];
  contribution: string;
  status: ProjectStatus;
};

export const projects = [
  {
    slug: "complete-bi-project",
    name: "Complete BI Project",
    category: "Business Intelligence",
    problem: "Turn an unstructured source into a reporting experience a decision-maker can read clearly.",
    tools: ["Excel", "Power BI", "KPIs", "Reporting"],
    contribution: "Data preparation, cleaning, analysis, KPI definition, dashboard decisions, and reporting.",
    status: "Featured case study",
  },
  {
    slug: "yaa-innovations",
    name: "YAA Innovations",
    category: "Data preparation & BI",
    problem: "Prepare inconsistent Excel data and present useful indicators in a clearer form.",
    tools: ["Excel", "Power BI", "KPIs"],
    contribution: "Excel correction and preparation, KPI work, dashboard work, and data presentation.",
    status: "Work summary",
  },
  {
    slug: "loveria-cafe-erp",
    name: "Loveria Café ERP",
    category: "Business software",
    problem: "Create a consistent system for business flows, reporting, and dashboard information.",
    tools: ["ERP", "Dashboards", "Web"],
    contribution: "Team project work across business software, data flows, reporting, and interface consistency.",
    status: "Project overview",
  },
  {
    slug: "etl-data-workflow",
    name: "ETL / Data Workflow",
    category: "Data engineering",
    problem: "Build a repeatable path from source data to analysis-ready information.",
    tools: ["Python", "SQL", "Data cleaning"],
    contribution: "Source, clean, transform, analyze, and communicate workflow design.",
    status: "Project overview",
  },
  {
    slug: "data-interface",
    name: "Interactive Data Interface",
    category: "Data & web",
    problem: "Make structured information easier to explore through a practical web interface.",
    tools: ["React", "Next.js", "TypeScript"],
    contribution: "Interface structure, data presentation, and responsive implementation.",
    status: "Project overview",
  },
] as const satisfies readonly Project[];
