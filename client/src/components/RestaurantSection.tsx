import RestaurantCard from "./RestaurantCard";
import { restaurants } from "@/lib/hotelData";

export default function RestaurantSection() {
  return (
    <section id="dining" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2C59] text-center mb-12">Restaurant Hours</h2>
        
        {restaurants.map((restaurant, index) => (
          <RestaurantCard 
            key={restaurant.id}
            restaurant={restaurant}
            isOpen={index === 0} // First restaurant is open by default
          />
        ))}
      </div>
    </section>
  );
}
