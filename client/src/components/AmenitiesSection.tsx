import AmenityCard from "./AmenityCard";
import { amenities } from "@/lib/hotelData";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2C59] text-center mb-12">Amenities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </div>
      </div>
    </section>
  );
}
