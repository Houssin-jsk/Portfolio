import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { CaseStudy } from "@/components/sections/case-study";
import { ClarityPath } from "@/components/sections/clarity-path";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Toolkit } from "@/components/sections/toolkit";

export default function Home() {
  return <><SiteHeader /><main><Hero /><About /><ClarityPath /><CaseStudy /><Projects /><Toolkit /><Experience /><Contact /></main><footer><span>© {new Date().getFullYear()} El Houssaine Ouahad</span><span>Data made clear.</span></footer></>;
}
