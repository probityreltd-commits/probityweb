import Banner from "@/components/home/Banner";
import HeritageSection from "@/components/home/HeritageSection";
import OurStory from "@/components/home/OurStory";
import Portfolio from "@/components/home/Portfolio";
import PropertiesSection from "@/components/home/PropertiesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <Portfolio></Portfolio>
      <HeritageSection></HeritageSection>
      <OurStory></OurStory>
      <PropertiesSection></PropertiesSection>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
