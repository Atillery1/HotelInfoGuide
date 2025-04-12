import { MapPin, Clock, ShoppingBag, Dumbbell, Waves } from "lucide-react";
import { Amenity } from "@/lib/hotelData";

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  // Function to render the appropriate icon based on iconType
  const getIcon = () => {
    if (amenity.iconType === "ShoppingBag") {
      return <ShoppingBag className="text-6xl text-[#0F2C59]" />;
    } else if (amenity.iconType === "Pool") {
      return <Waves className="text-6xl text-[#0F2C59]" />;
    } else if (amenity.iconType === "Dumbbell") {
      return <Dumbbell className="text-6xl text-[#0F2C59]" />;
    }
    return null;
  };

  return (
    <div className="shadow-md bg-white rounded-lg overflow-hidden border border-[#E5E5E5] hover:border-[#DBA53A] transition-all duration-200 transform hover:-translate-y-1">
      <div className="h-40 bg-[#E5E5E5] flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F2C59] mb-3">{amenity.name}</h3>
        <ul className="space-y-2">
          <li>
            <MapPin className="inline-block text-[#DBA53A] mr-2 h-4 w-4" /> 
            Location: {amenity.location}
          </li>
          <li>
            <Clock className="inline-block text-[#DBA53A] mr-2 h-4 w-4" /> 
            {amenity.hours}
          </li>
        </ul>
        <p className="mt-4 text-sm text-[#888888]">{amenity.description}</p>
      </div>
    </div>
  );
}
