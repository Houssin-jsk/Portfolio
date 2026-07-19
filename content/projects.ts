export type ProjectStatus = "case-study" | "overview";

export const projects = [
  { name: "Complete BI Project", status: "case-study" },
  { name: "YAA Innovations", status: "overview" },
  { name: "Loveria Café ERP", status: "overview" },
] as const satisfies ReadonlyArray<{ name: string; status: ProjectStatus }>;
