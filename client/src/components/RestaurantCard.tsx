import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Restaurant } from "@/lib/hotelData";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isOpen: boolean;
}

export default function RestaurantCard({ restaurant, isOpen }: RestaurantCardProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  return (
    <div className="shadow-md bg-white rounded-lg overflow-hidden mb-10 border border-[#E5E5E5]">
      <div 
        className="bg-[#0F2C59] text-white p-5 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-['Playfair_Display'] text-2xl font-semibold">
          {restaurant.name} <span className="text-sm font-[Raleway] ml-2">({restaurant.location})</span>
        </h3>
        <ChevronDown 
          className={`text-[#DBA53A] transition-transform duration-200 ${isExpanded ? 'transform rotate-0' : 'transform rotate-180'}`}
        />
      </div>
      
      <div className={`p-6 bg-[#F5F5F5] ${isExpanded ? 'block' : 'hidden'}`}>
        <h4 className="font-['Playfair_Display'] text-xl text-[#F0D195] mb-4">Hours of Operation</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {restaurant.operatingHours.map((hours, index) => (
              <div key={index}>
                <h5 className="font-semibold text-[#0F2C59] mb-2">{hours.title}</h5>
                {hours.schedule.map((time, idx) => (
                  <p key={idx}>{time}</p>
                ))}
                {hours.note && <p className="text-sm italic">{hours.note}</p>}
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {restaurant.happyHour && (
              <div>
                <h5 className="font-semibold text-[#0F2C59] mb-2">
                  Happy Hour 
                  {restaurant.happyHour.location && (
                    <span className="text-sm italic"> {restaurant.happyHour.location}</span>
                  )}
                </h5>
                {restaurant.happyHour.schedule.map((time, idx) => (
                  <p key={idx}>{time}</p>
                ))}
              </div>
            )}
            
            {restaurant.inRoomDining ? (
              <div className="bg-[#DBA53A]/10 p-4 rounded-lg border-l-4 border-[#DBA53A]">
                <h5 className="font-semibold text-[#0F2C59] mb-2">
                  In-Room Dining
                  {restaurant.inRoomDining.note && (
                    <span className="text-sm italic"> {restaurant.inRoomDining.note}</span>
                  )}
                </h5>
                {restaurant.inRoomDining.schedule.map((time, idx) => (
                  <p key={idx}>{time}</p>
                ))}
              </div>
            ) : (
              restaurant.noInRoomDining && (
                <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-500">
                  <p className="font-semibold text-red-700">{restaurant.noInRoomDining}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
