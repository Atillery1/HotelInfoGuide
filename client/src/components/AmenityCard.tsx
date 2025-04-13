import { MapPin, Clock, ShoppingBag, Dumbbell, Waves, Laptop } from "lucide-react";
import { Amenity } from "@/lib/hotelData";

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  // Function to get background gradient and colors based on amenity type
  const getStyles = () => {
    switch (amenity.iconType) {
      case "ShoppingBag":
        return {
          gradient: "from-blue-50 to-blue-100",
          iconColor: "text-blue-500",
          accentColor: "bg-blue-500",
          hoverColor: "group-hover:border-blue-500"
        };
      case "Pool":
        return {
          gradient: "from-cyan-50 to-cyan-100",
          iconColor: "text-cyan-500",
          accentColor: "bg-cyan-500",
          hoverColor: "group-hover:border-cyan-500"
        };
      case "Dumbbell":
        return {
          gradient: "from-red-50 to-red-100",
          iconColor: "text-red-500",
          accentColor: "bg-red-500",
          hoverColor: "group-hover:border-red-500"
        };
      case "Laptop":
        return {
          gradient: "from-amber-50 to-amber-100",
          iconColor: "text-amber-500",
          accentColor: "bg-amber-500",
          hoverColor: "group-hover:border-amber-500"
        };
      default:
        return {
          gradient: "from-gray-50 to-gray-100",
          iconColor: "text-gray-500",
          accentColor: "bg-gray-500",
          hoverColor: "group-hover:border-gray-500"
        };
    }
  };

  // Function to render the appropriate icon based on iconType
  const getIcon = () => {
    const styles = getStyles();
    
    if (amenity.iconType === "ShoppingBag") {
      return (
        <div className={`rounded-full p-6 ${styles.gradient} shadow-inner`}>
          <ShoppingBag className={`h-12 w-12 ${styles.iconColor}`} />
        </div>
      );
    } else if (amenity.iconType === "Pool") {
      return (
        <div className={`rounded-full p-6 ${styles.gradient} shadow-inner`}>
          <Waves className={`h-12 w-12 ${styles.iconColor}`} />
        </div>
      );
    } else if (amenity.iconType === "Dumbbell") {
      return (
        <div className={`rounded-full p-6 ${styles.gradient} shadow-inner`}>
          <Dumbbell className={`h-12 w-12 ${styles.iconColor}`} />
        </div>
      );
    } else if (amenity.iconType === "Laptop") {
      return (
        <div className={`rounded-full p-6 ${styles.gradient} shadow-inner`}>
          <Laptop className={`h-12 w-12 ${styles.iconColor}`} />
        </div>
      );
    }
    return null;
  };

  const styles = getStyles();

  return (
    <div className={`group shadow-lg bg-white rounded-lg overflow-hidden border-2 border-transparent ${styles.hoverColor} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}>
      <div className={`h-48 bg-gradient-to-br ${styles.gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-20 ${styles.accentColor}`}></div>
        <div className={`absolute -left-8 -bottom-8 w-16 h-16 rounded-full opacity-10 ${styles.accentColor}`}></div>
        
        {/* Main icon */}
        {getIcon()}
        
        {/* Amenity name */}
        <h3 className="font-bold text-2xl mt-4 text-gray-800">{amenity.name}</h3>
      </div>
      
      <div className="p-5">
        <div className="mb-4 flex justify-between items-center">
          <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${styles.accentColor}`}>HOTEL AMENITY</span>
          <div className={`h-1 w-1/4 rounded ${styles.accentColor}`}></div>
        </div>
        
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <MapPin className={`flex-shrink-0 ${styles.iconColor} mr-2 h-5 w-5 mt-0.5`} /> 
            <div>
              <span className="font-semibold text-gray-700">Location:</span>
              <p className="text-gray-600">{amenity.location}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Clock className={`flex-shrink-0 ${styles.iconColor} mr-2 h-5 w-5 mt-0.5`} /> 
            <div>
              <span className="font-semibold text-gray-700">Hours:</span>
              <p className="text-gray-600">{amenity.hours}</p>
            </div>
          </li>
        </ul>
        
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
          {amenity.description}
        </div>
      </div>
    </div>
  );
}
