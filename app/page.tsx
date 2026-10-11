import SpaceShell from "@/components/space/space-shell";
import { SpaceHero, SpaceAbout } from "@/components/space/sections";
import { homepageStructuredData } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/serialize-json-ld";

export default function Home() {
  return (
    <SpaceShell>
      <script id="homepage-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homepageStructuredData()) }} />
      <SpaceHero />
      <SpaceAbout />
    </SpaceShell>
  );
}
