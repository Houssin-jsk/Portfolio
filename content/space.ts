// Public identity and navigation. Project records remain in config/site.ts.
export const space = {
  navigation: [
    { label: "Home", href: "/#home" },
    { label: "About Me", href: "/#about" },
  ],
  about: {
    introduction: "El Houssaine Ouahad is a curious, creative technology enthusiast working across Artificial Intelligence, Data, and Web Development.",
    background: "His interest in technology began in childhood. Four years studying computer maintenance and networks laid the groundwork for his later studies in Artificial Intelligence, with a Data Analyst option.",
    approach: "He enjoys questioning assumptions, connecting ideas, and exploring both conventional and unconventional possibilities. Experimenting with practical solutions and continuous self-learning keep his work open to new perspectives.",
  },
} as const;

// Add only published content with a working destination. Empty collections are intentional.
export type SpaceEntry = { slug: string; title: string; description: string; href: string; kind: string };
export const explorations: readonly SpaceEntry[] = [];
export const thoughts: readonly SpaceEntry[] = [];
