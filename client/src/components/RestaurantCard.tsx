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
    <div className="shadow-lg bg-black rounded-sm overflow-hidden mb-10 border border-[#DBA53A]/30">
      <div 
        className="bg-black text-white p-5 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-2xl font-semibold">
          {restaurant.name} <span className="text-sm ml-2 text-gray-400">({restaurant.location})</span>
        </h3>
        <ChevronDown 
          className={`text-[#DBA53A] transition-transform duration-200 ${isExpanded ? 'transform rotate-0' : 'transform rotate-180'}`}
        />
      </div>
      
      <div className={`p-6 bg-gray-900 text-white ${isExpanded ? 'block' : 'hidden'}`}>
        <h4 className="text-xl text-[#DBA53A] mb-4 font-bold">Hours of Operation</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {restaurant.operatingHours.map((hours, index) => (
              <div key={index}>
                <h5 className="font-semibold text-[#DBA53A] mb-2">{hours.title}</h5>
                {hours.schedule.map((time, idx) => (
                  <p key={idx} className="text-gray-300">{time}</p>
                ))}
                {hours.note && <p className="text-sm italic text-gray-400">{hours.note}</p>}
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {restaurant.happyHour && (
              <div>
                <h5 className="font-semibold text-[#DBA53A] mb-2">
                  Happy Hour 
                  {restaurant.happyHour.location && (
                    <span className="text-sm italic text-gray-400"> {restaurant.happyHour.location}</span>
                  )}
                </h5>
                {restaurant.happyHour.schedule.map((time, idx) => (
                  <p key={idx} className="text-gray-300">{time}</p>
                ))}
              </div>
            )}
            
            {restaurant.inRoomDining ? (
              <div className="bg-black p-4 rounded-sm border border-[#DBA53A]/40">
                <h5 className="font-semibold text-[#DBA53A] mb-2">
                  In-Room Dining
                  {restaurant.inRoomDining.note && (
                    <span className="text-sm italic text-gray-400"> {restaurant.inRoomDining.note}</span>
                  )}
                </h5>
                {restaurant.inRoomDining.schedule.map((time, idx) => (
                  <p key={idx} className="text-gray-300">{time}</p>
                ))}
              </div>
            ) : (
              restaurant.noInRoomDining && (
                <div className="bg-black p-4 rounded-sm border border-gray-700">
                  <p className="font-semibold text-gray-400">{restaurant.noInRoomDining}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
