import {
  Building2,
  Zap,
  Users,
  Trees,
  Camera,
  LogOut,
  Flame,
  ShieldCheck,
  Shield,
  ArrowUp,
} from "lucide-react";

// Predefined Amenities with Lucide Icons
export const PREDEFINED_AMENITIES = [
  // Lift Options
  { id: "1 Lift", label: "1 Lift", icon: Building2 },
  { id: "2 Lift", label: "2 Lift", icon: Building2 },
  { id: "3 Lift", label: "3 Lift", icon: Building2 },

  // Stair Options
  { id: "1 Stair", label: "1 Stair", icon: ArrowUp },
  { id: "2 Stair", label: "2 Stair", icon: ArrowUp },
  { id: "3 Stair", label: "3 Stair", icon: ArrowUp },

  // Other Amenities
  { id: "Generator", label: "Generator", icon: Zap },
  {
    id: "Community Hall room",
    label: "Community Hall room",
    icon: Users,
  },
  { id: "Garden", label: "Garden", icon: Trees },
  { id: "CC Camera", label: "CC Camera", icon: Camera },
  { id: "Emergency Exit", label: "Emergency Exit", icon: LogOut },
  { id: "Fire Protection", label: "Fire Protection", icon: Flame },
  {
    id: "Lightning Protection",
    label: "Lightning Protection",
    icon: Shield,
  },
  {
    id: "Security Guard",
    label: "Security Guard",
    icon: ShieldCheck,
  },
];

export const initialFormData = {
  title: "",
  slug: "",
  locationName: "",
  mapLocation: "",
  propertyType: "",
  address: "",
  description: "",
  status: "UNDER CONSTRUCTION",
  handoverDate: "",
  landArea: "",
  buildingHeight: "",
  apartments: "",
  carParking: "",
  motorbikeParking: "",
  unitsPerFloor: "",
  apartmentSizes: "",
  projectBrochure: "",
};
