import { SiteHero } from "@/components/site-hero";
import { SiteServices } from "@/components/site-services";
import { QuoteBreak } from "@/components/quote-break";
import { SiteProcess } from "@/components/site-process";
import { SiteLookbook } from "@/components/site-lookbook";

export default function Home() {
  return (
    <main className="flex-1">
      <SiteHero />
      <SiteServices />
      <QuoteBreak />
      <SiteProcess />
      <SiteLookbook />
    </main>
  );
}
