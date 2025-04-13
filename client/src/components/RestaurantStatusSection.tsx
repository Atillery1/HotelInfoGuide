import { useEffect, useState } from "react";
import { Clock, Utensils, Check, X } from "lucide-react";
import { restaurants } from "@/lib/hotelData";
import { isRestaurantOpen, isRoomServiceAvailable, getCurrentRoomServiceMenu } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function RestaurantStatusSection() {
  // State to track open status for real-time updates
  const [openStatuses, setOpenStatuses] = useState<Record<string, boolean>>({});
  const [roomServiceStatuses, setRoomServiceStatuses] = useState<Record<string, boolean>>({});
  const [roomServiceMenus, setRoomServiceMenus] = useState<Record<string, string>>({});
  
  // Current time display
  const [currentTime, setCurrentTime] = useState<string>("");
  
  // Update statuses every minute
  useEffect(() => {
    const updateStatuses = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      const newOpenStatuses: Record<string, boolean> = {};
      const newRoomServiceStatuses: Record<string, boolean> = {};
      const newRoomServiceMenus: Record<string, string> = {};
      
      restaurants.forEach(restaurant => {
        newOpenStatuses[restaurant.id] = isRestaurantOpen(restaurant);
        newRoomServiceStatuses[restaurant.id] = isRoomServiceAvailable(restaurant);
        newRoomServiceMenus[restaurant.id] = getCurrentRoomServiceMenu(restaurant);
      });
      
      setOpenStatuses(newOpenStatuses);
      setRoomServiceStatuses(newRoomServiceStatuses);
      setRoomServiceMenus(newRoomServiceMenus);
    };
    
    // Initial update
    updateStatuses();
    
    // Set up interval
    const intervalId = setInterval(updateStatuses, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Count open restaurants and available room service
  const openCount = Object.values(openStatuses).filter(Boolean).length;
  const roomServiceCount = Object.values(roomServiceStatuses).filter(Boolean).length;
  
  return (
    <section className="py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#E5E5E5]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2C59] mb-2 md:mb-0">
              Current Restaurant Status
            </h2>
            <div className="flex items-center text-sm text-[#888888]">
              <Clock className="mr-1 h-4 w-4 text-[#DBA53A]" /> 
              <span>Last updated: {currentTime}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E5E5E5]">
              <h3 className="font-semibold text-[#0F2C59] mb-3">
                Currently Open <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">{openCount} of {restaurants.length}</span>
              </h3>
              <ul className="space-y-2">
                {restaurants.map(restaurant => (
                  <li key={restaurant.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{restaurant.name}</span>
                      <span className="text-xs text-[#888888] ml-1">({restaurant.location})</span>
                    </div>
                    <div>
                      {openStatuses[restaurant.id] ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <Check className="mr-1 h-3 w-3" /> Open
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          <X className="mr-1 h-3 w-3" /> Closed
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#E5E5E5]">
              <h3 className="font-semibold text-[#0F2C59] mb-3">
                <Utensils className="inline-block mr-1 h-4 w-4 text-[#DBA53A]" /> 
                Room Service Availability <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">{roomServiceCount} available</span>
              </h3>
              
              {roomServiceCount > 0 ? (
                <ul className="space-y-3">
                  {restaurants.map(restaurant => {
                    // Skip restaurants without room service
                    if (restaurant.noInRoomDining || !restaurant.inRoomDining) {
                      return null;
                    }
                    
                    return (
                      <li key={restaurant.id} className={`p-2 rounded ${roomServiceStatuses[restaurant.id] ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{restaurant.name}</span>
                          {roomServiceStatuses[restaurant.id] ? (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Available Now
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[#888888]">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        
                        {roomServiceStatuses[restaurant.id] && (
                          <div className="text-xs text-[#555555] mt-1">
                            Currently serving: <span className="font-semibold">{roomServiceMenus[restaurant.id]}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[#888888]">No room service available at this time</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-[#888888] italic text-center">
            Restaurant and room service availability updates in real time based on current operating hours.
          </div>
        </div>
      </div>
    </section>
  );
}