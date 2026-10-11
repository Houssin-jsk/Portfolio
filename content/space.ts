// Preview content only. Existing project records remain in config/site.ts.
export const space = {
  navigation: [
    { label: "About", href: "/design-preview#about" },
    { label: "Creations", href: "/design-preview#creations" },
    { label: "Discover", href: "/design-preview#discover" },
    { label: "Contact", href: "/design-preview#contact" },
  ],
  about: {
    introduction: "El Houssaine Ouahad is a curious, creative technology enthusiast working across Artificial Intelligence, Data, and Web Development.",
    background: "His interest in technology began in childhood. Four years studying computer maintenance and networks laid the groundwork for his later studies in Artificial Intelligence, with a Data Analyst option.",
    approach: "He questions assumptions, connects ideas, and experiments with practical solutions. Continuous self-learning keeps his work open to new possibilities.",
  },
} as const;

// Add only published content with a working destination. Empty collections are intentional.
export type SpaceEntry = { slug: string; title: string; description: string; href: string; kind: string };
export const explorations: readonly SpaceEntry[] = [];
export const thoughts: readonly SpaceEntry[] = [];
