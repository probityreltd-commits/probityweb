import AboutHero from "@/components/about/AboutHero";
import FoundingVision from "@/components/about/FoundingVision";
import Milestones from "@/components/about/Milestones";
import OurStory from "@/components/home/OurStory";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/about/Services";
import FAQSection from "@/components/about/FAQSection";

export const metadata = {
  title: "About Us | NESTORA Real Estate",
  description: "A legacy of delivering excellence in modern home building.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#f5f1ff] dark:bg-[#070913] text-zinc-800 dark:text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
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
