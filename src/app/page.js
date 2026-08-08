import Image from "next/image";
import UnderConstruction from "@/components/underConstruction/UnderConstruction";

export default function Home() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <UnderConstruction></UnderConstruction>;
  }
  return (
    <div className="text-2xl font-bold text-red-700">This is Home page</div>
  );
}
