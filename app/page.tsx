import { SiteHero } from "@/components/site-hero";
import { SiteServices } from "@/components/site-services";
import { QuoteBreak } from "@/components/quote-break";

export default function Home() {
  return (
    <main className="flex-1">
      <SiteHero />
      <SiteServices />
      <QuoteBreak />
    </main>
  );
}
