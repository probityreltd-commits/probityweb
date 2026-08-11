import Image from "next/image";
import UnderConstruction from "@/components/underConstruction/UnderConstruction";

export default function Home() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <UnderConstruction></UnderConstruction>;
  }
  return <div className="">This is Home page now</div>;
}
