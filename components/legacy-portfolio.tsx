import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Booking } from "@/components/sections/booking";
import { ClarityPath } from "@/components/sections/clarity-path";
import { Contact } from "@/components/sections/contact";
import { CvSection } from "@/components/sections/cv";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Toolkit } from "@/components/sections/toolkit";

// Preserved for the rebuild; intentionally not mounted by any route.
// Its original styles remain in app/globals.css.
export default function LegacyPortfolio() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content"><Hero /><About /><ClarityPath /><Experience /><Toolkit /><Projects /><Booking /><Testimonials /><CvSection /><Contact /></main><footer><span>© {new Date().getFullYear()} El Houssaine Ouahad</span><span>Data made clear.</span></footer></>;
}
