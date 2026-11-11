import { SiteHero } from "@/components/site-hero";
import { SiteServices } from "@/components/site-services";

export default function Home() {
  return (
    <main className="flex-1">
      <SiteHero />
      <SiteServices />
    </main>
  );
}
