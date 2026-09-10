import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";
import SectionCard from "./SectionCard";

const GalleryImagesSection = ({ images, setImages }) => (
  <SectionCard
    number={8}
    title="Gallery Images (Property Details Page)"
    description="A separate photo collection — shown only in the image gallery on the property details page, independent from the cover image above."
  >
    <CloudinaryImageUploader images={images} setImages={setImages} />
  </SectionCard>
);

export default GalleryImagesSection;
