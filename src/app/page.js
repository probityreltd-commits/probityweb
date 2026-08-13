import Banner from "@/components/home/Banner";
import HeritageSection from "@/components/home/HeritageSection";
import OurStory from "@/components/home/OurStory";
import Portfolio from "@/components/home/Portfolio";
import PropertiesSection from "@/components/home/PropertiesSection";
export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <Portfolio></Portfolio>
      <HeritageSection></HeritageSection>
      <OurStory></OurStory>
      <PropertiesSection></PropertiesSection>
    </div>
  );
}
