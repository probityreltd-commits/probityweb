import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";
import SectionCard from "./SectionCard";

const CoverImagesSection = ({ images, setImages }) => (
  <SectionCard
    number={7}
    title="Project Cover & Main Images"
    description="Upload showcase photos. The first uploaded image serves as the cover image on listing cards and the details page hero."
  >
    <CloudinaryImageUploader images={images} setImages={setImages} />
  </SectionCard>
);

export default CoverImagesSection;
