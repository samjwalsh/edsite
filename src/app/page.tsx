import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-8 p-6">{/* Content */}</div>
    </>
  );
}
