import type { Metadata } from "next";
import { SiteLookbook } from "@/components/site-lookbook";

export const metadata: Metadata = {
  title: "Lookbook — Oge Atelier",
  description:
    "Selected looks from the Oge Atelier workroom in Lagos — women, men, kids, bridal and traditional.",
};

export default function LookbookPage() {
  return (
    <main className="flex-1">
      <SiteLookbook />
    </main>
  );
}
