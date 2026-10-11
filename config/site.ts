export type ProjectCategory =
  | "Data Analysis"
  | "Business Intelligence"
  | "Artificial Intelligence"
  | "Web Development"
  | "Academic Projects";

export type Project = {
  slug: string;
  title: string;
  categories: ProjectCategory[];
  summary: string;
  problem: string;
  objective: string;
  role: string;
  methodology: string[];
  tools: string[];
  result: string;
  image?: string;
  github?: string;
  demo?: string;
};

export const siteConfig = {
  siteUrl: "https://www.ouahad.space",
  personal: {
    name: "El Houssaine Ouahad",
    age: 21,
    role: "Junior Data Analyst & AI Enthusiast",
    location: "Tangier, Morocco",
    timezone: "Africa/Casablanca",
    email: "ouahadhoussin@gmail.com",
    whatsapp: null as string | null,
    portrait: "/images/profile.png",
    cvPath: null as string | null,
    intro:
      "I turn raw data into clear insights, useful dashboards, and practical digital solutions.",
  },
  social: {
    github: "https://github.com/Houssin-jsk",
    linkedin: null as string | null,
  },
  navigation: [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#booking", label: "Book a meeting" },
    { href: "#contact", label: "Contact" },
  ],
  education: [
    {
      period: "2024",
      title: "Baccalauréat Professionnel — Maintenance Informatique et Réseaux",
      institution: "Lycée Abi Al Abbas Assabti Qualifiant",
      detail: "A practical foundation in computer maintenance, networks, and technical problem solving.",
    },
    {
      period: "2024–2026",
      title: "Technicien Spécialisé en Intelligence Artificielle — Option Data Analyst",
      institution: "ISTA NTIC Tanger / OFPPT",
      detail: "Bac+2 training focused on data analysis, BI, dashboards, Python, SQL, and applied AI.",
    },
  ],
  skills: [
    { label: "Data Analysis", items: ["Excel", "Power BI", "SQL", "Python", "Pandas", "NumPy", "Data cleaning", "Data exploration", "KPIs", "Reporting", "ETL"] },
    { label: "Artificial Intelligence", items: ["Machine Learning basics", "Applied AI", "Chatbots", "RAG concepts", "AI tools", "Data preparation for AI"] },
    { label: "Development", items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Git", "GitHub"] },
    { label: "Business & Delivery", items: ["Dashboard design", "Data visualization", "Business analysis", "Documentation", "Problem solving"] },
  ],
  projects: [
    {
      slug: "energy-consumption-bi-dashboard",
      title: "Energy Consumption BI Dashboard",
      categories: ["Business Intelligence", "Data Analysis"],
      summary: "An analytical dashboard focused on energy consumption, from source cleaning to interactive reporting.",
      problem: "Raw energy data can be difficult to compare across periods and consumption indicators.",
      objective: "Prepare reliable KPIs and make consumption patterns easy to understand in one reporting view.",
      role: "Data cleaning, KPI preparation, analysis, dashboard structure, and visual reporting.",
      methodology: ["Inspect and clean the source", "Define consumption KPIs", "Analyze patterns", "Design the interactive dashboard"],
      tools: ["Excel", "Power BI", "Data Cleaning", "KPIs", "Data Visualization"],
      result: "A clear dashboard concept that turns energy records into readable indicators and trends.",
    },
    {
      slug: "tourism-in-morocco-analysis",
      title: "Tourism in Morocco Analysis",
      categories: ["Data Analysis", "Business Intelligence", "Academic Projects"],
      summary: "An analysis of Moroccan tourism data covering trends, visitor behavior, evolution, and key indicators.",
      problem: "Tourism datasets contain many dimensions that are hard to interpret without a consistent analytical structure.",
      objective: "Reveal important trends and provide a concise view of tourism performance in Morocco.",
      role: "Data preparation, exploratory analysis, indicator selection, and visualization.",
      methodology: ["Prepare the dataset", "Explore changes over time", "Compare visitor indicators", "Communicate the findings"],
      tools: ["Python", "Pandas", "Excel", "Power BI", "Data Visualization"],
      result: "A structured analysis that makes tourism trends and important indicators easier to discuss.",
    },
    {
      slug: "moroccan-spotify-music-analysis",
      title: "Moroccan Spotify Music Analysis",
      categories: ["Data Analysis", "Academic Projects"],
      summary: "Exploratory analysis of Moroccan music data, including artists, tracks, popularity, and trends.",
      problem: "Music catalog data needs cleaning and exploration before meaningful popularity patterns emerge.",
      objective: "Understand the artists, tracks, and attributes shaping the dataset.",
      role: "Dataset exploration, cleaning, comparison, and visual explanation.",
      methodology: ["Audit the dataset", "Clean relevant fields", "Explore artists and tracks", "Visualize notable patterns"],
      tools: ["Python", "Pandas", "Data Analysis", "Visualization"],
      result: "An exploratory view of popularity and catalog patterns in Moroccan music data.",
    },
    {
      slug: "baamrani-parfume-landing-page",
      title: "Baamrani Parfume Landing Page",
      categories: ["Web Development"],
      summary: "A modern perfume brand landing page focused on visual identity, product presentation, and conversion.",
      problem: "A product-led brand needs a focused page that communicates atmosphere and product value quickly.",
      objective: "Create a responsive, polished landing experience with clear product hierarchy.",
      role: "Interface design and front-end implementation.",
      methodology: ["Define the content hierarchy", "Build responsive sections", "Refine visual rhythm", "Test mobile interaction"],
      tools: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      result: "A conversion-oriented landing page concept with a distinct perfume-brand presentation.",
    },
    {
      slug: "gluti-safe-organization",
      title: "Gluti Safe Organization",
      categories: ["Web Development", "Academic Projects"],
      summary: "A digital platform concept for organizing and managing information in a clear and safe way.",
      problem: "Important information becomes less useful when its organization and access patterns are unclear.",
      objective: "Design a simple digital structure for finding and managing information confidently.",
      role: "Information structure, interface concept, and data organization.",
      methodology: ["Map information needs", "Organize content", "Design core views", "Review clarity and safety"],
      tools: ["Web Development", "UI Design", "Data Organization"],
      result: "A platform concept centered on clarity, structure, and safe information handling.",
    },
    {
      slug: "applied-ai-project",
      title: "Applied AI Project",
      categories: ["Artificial Intelligence", "Academic Projects"],
      summary: "An academic AI project exploring data preparation and practical intelligent solutions.",
      problem: "AI outcomes depend on well-prepared data and a clearly defined use case.",
      objective: "Apply foundational AI concepts to a practical digital problem.",
      role: "Data preparation, experimentation, analysis, and documentation.",
      methodology: ["Define the use case", "Prepare the data", "Test an AI approach", "Review and document the output"],
      tools: ["Python", "AI", "Data Analysis"],
      result: "A learning project demonstrating an applied approach to AI without overstating production experience.",
    },
    {
      slug: "appointment-booking-platform",
      title: "Appointment Booking Platform",
      categories: ["Web Development"],
      summary: "A responsive booking experience where visitors can choose an available slot and request a meeting.",
      problem: "Email-based scheduling creates avoidable back-and-forth and timezone ambiguity.",
      objective: "Offer clear Morocco-time availability while protecting private calendar information.",
      role: "Product design, front-end implementation, API validation, and database-ready architecture.",
      methodology: ["Configure working hours", "Generate valid slots", "Validate booking requests", "Prevent duplicate reservations"],
      tools: ["React.js", "Next.js", "Calendar System", "Responsive UI"],
      result: "A mobile-first booking flow with server validation and Supabase-ready persistence.",
    },
  ] as Project[],
  availability: {
    slotMinutes: 30,
    workingDays: [1, 2, 3, 4, 5],
    startTime: "09:00",
    endTime: "17:00",
    unavailableDates: [] as string[],
    minimumNoticeHours: 2,
  },
} as const;

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Data Analysis",
  "Business Intelligence",
  "Artificial Intelligence",
  "Web Development",
  "Academic Projects",
];
