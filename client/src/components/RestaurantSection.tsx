import RestaurantCard from "./RestaurantCard";
import RestaurantStatusSection from "./RestaurantStatusSection";
import { restaurants } from "@/lib/hotelData";
import { isRestaurantOpen } from "@/lib/utils";
import { Utensils } from "lucide-react";

export default function RestaurantSection() {
  // Check which restaurants are open with actual logic
  const openStatuses: Record<string, boolean> = {};
  restaurants.forEach(restaurant => {
    openStatuses[restaurant.id] = isRestaurantOpen(restaurant);
  });

  return (
    <section id="dining" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="bg-[#DBA53A]/20 text-[#DBA53A] text-sm font-bold px-3 py-1 rounded-sm border border-[#DBA53A]/30">DINING OPTIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Dining at THE MAIN</h2>
          <div className="w-20 h-1 bg-[#DBA53A] mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Experience exceptional culinary offerings at our three distinctive restaurants, each with its unique atmosphere and menu.
          </p>
        </div>
        
        {/* Restaurant Status Section - Now embedded in the Dining section */}
        <div className="mb-12">
          <RestaurantStatusSection />
        </div>
        
        {/* Detailed Restaurant Cards Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#DBA53A] flex items-center justify-center mb-6">
            <Utensils className="mr-2 h-5 w-5 text-[#DBA53A]" />
            Restaurant Details & Operating Hours
          </h3>
          
          <div className="space-y-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard 
                key={restaurant.id}
                restaurant={restaurant}
                isOpen={openStatuses[restaurant.id] || false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
