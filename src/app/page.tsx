import { Hero } from "@/components/Hero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { ContentSection } from "@/components/ContentSection";
import { CtaSection } from "@/components/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-8 p-6">{/* Content */}</div>
    </>
  );
}
