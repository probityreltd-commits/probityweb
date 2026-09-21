import AboutHero from "@/components/about/AboutHero";
import FoundingVision from "@/components/about/FoundingVision";
import Milestones from "@/components/about/Milestones";
import OurStory from "@/components/home/OurStory";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/about/Services";
import FAQSection from "@/components/about/FAQSection";

export const metadata = {
  title: "About Probity Real Estate Ltd. | Trusted Builder in Bogura",
  description:
    "Know Probity Real Estate Ltd., a trusted real estate company in Bogura. See our story, our values and why families choose us for a safe home.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-100">
      <AboutHero />
      <FoundingVision />
      <Milestones />
      <OurStory />
      <WhyChooseUs />
      <Services />
      <FAQSection />
    </main>
  );
}
