import AmenityCard from "./AmenityCard";
import { amenities } from "@/lib/hotelData";
import { Clock, Coffee, Bath, Waves, Dumbbell, ShoppingBag, Laptop } from "lucide-react";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="bg-[#DBA53A]/20 text-[#DBA53A] text-sm font-bold px-3 py-1 rounded-full">EXPLORE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F2C59] mt-3 mb-4">Hotel Amenities</h2>
          <div className="w-20 h-1 bg-[#DBA53A] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Enhance your stay with our premier hotel amenities, designed to provide comfort, convenience, and luxury throughout your visit.
          </p>
        </div>
        
        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {amenities.map((amenity) => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </div>
        
        {/* Quick Amenity Highlights */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#0F2C59] text-white py-3 px-5">
            <h3 className="text-xl font-bold">Additional Hotel Features</h3>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 rounded-lg bg-blue-50">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm">24-Hour Front Desk</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-green-50">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Coffee className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm">In-Room Coffee</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-purple-50">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Bath className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm">Private Bathrooms</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-cyan-50">
              <div className="bg-cyan-100 p-2 rounded-full mr-3">
                <Waves className="h-5 w-5 text-cyan-600" />
              </div>
              <span className="text-sm">Indoor Pool Access</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-rose-50">
              <div className="bg-rose-100 p-2 rounded-full mr-3">
                <Dumbbell className="h-5 w-5 text-rose-600" />
              </div>
              <span className="text-sm">Fitness Center Access</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-blue-50">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm">Market Pantry Access</span>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-amber-50">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <Laptop className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm">Business Center</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
