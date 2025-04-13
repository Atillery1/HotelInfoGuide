import { useEffect, useState } from "react";
import { Clock, Utensils, Check, X, Coffee, UtensilsCrossed } from "lucide-react";
import { restaurants } from "@/lib/hotelData";
import { 
  isRestaurantOpen, 
  isRoomServiceAvailable, 
  getCurrentRoomServiceMenu, 
  getCurrentMealPeriod 
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function RestaurantStatusSection() {
  // State to track open status for real-time updates
  const [openStatuses, setOpenStatuses] = useState<Record<string, boolean>>({});
  const [currentMeals, setCurrentMeals] = useState<Record<string, string>>({});
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
      const newCurrentMeals: Record<string, string> = {};
      const newRoomServiceStatuses: Record<string, boolean> = {};
      const newRoomServiceMenus: Record<string, string> = {};
      
      restaurants.forEach(restaurant => {
        newOpenStatuses[restaurant.id] = isRestaurantOpen(restaurant);
        newCurrentMeals[restaurant.id] = getCurrentMealPeriod(restaurant);
        newRoomServiceStatuses[restaurant.id] = isRoomServiceAvailable(restaurant);
        newRoomServiceMenus[restaurant.id] = getCurrentRoomServiceMenu(restaurant);
      });
      
      setOpenStatuses(newOpenStatuses);
      setCurrentMeals(newCurrentMeals);
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
  
  // Helper function to get meal icon
  const getMealIcon = (mealType: string) => {
    switch(mealType.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="h-3 w-3 mr-1" />;
      case 'brunch':
        return <Coffee className="h-3 w-3 mr-1" />;
      case 'lunch':
      case 'dinner':
      case 'late night menu':
        return <UtensilsCrossed className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };
  
  // Helper function to get meal badge color
  const getMealBadgeClass = (mealType: string) => {
    switch(mealType.toLowerCase()) {
      case 'breakfast':
        return "bg-amber-50 text-amber-800 border-amber-200";
      case 'brunch':
        return "bg-orange-50 text-orange-800 border-orange-200";
      case 'lunch':
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case 'dinner':
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case 'late night menu':
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };
  
  return (
    <section className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-black rounded-sm shadow-md p-6 border border-[#DBA53A]/30">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              Current Restaurant Status
            </h2>
            <div className="flex items-center justify-center text-sm text-gray-400">
              <Clock className="mr-1 h-4 w-4 text-[#DBA53A]" /> 
              <span>Last updated: {currentTime}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-black p-4 rounded-sm border border-[#DBA53A]/30">
              <h3 className="font-semibold text-[#DBA53A] mb-3 text-center">
                Currently Open <span className="ml-2 bg-black text-[#DBA53A] px-2 py-0.5 rounded-sm border border-[#DBA53A] text-xs">{openCount} of {restaurants.length}</span>
              </h3>
              <ul className="space-y-3">
                {restaurants.map(restaurant => (
                  <li key={restaurant.id} className={`p-3 rounded-sm ${openStatuses[restaurant.id] ? 'border border-[#DBA53A]' : 'border border-gray-700'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <span className="font-medium text-white">{restaurant.name}</span>
                        <span className="text-xs text-gray-400 ml-1">({restaurant.location})</span>
                      </div>
                      <div>
                        {openStatuses[restaurant.id] ? (
                          <Badge variant="outline" className="bg-[#DBA53A]/20 text-[#DBA53A] border-[#DBA53A]/50 rounded-sm">
                            <Check className="mr-1 h-3 w-3" /> Open
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-black text-gray-400 border-gray-700 rounded-sm">
                            <X className="mr-1 h-3 w-3" /> Closed
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {openStatuses[restaurant.id] && currentMeals[restaurant.id] && (
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="text-xs bg-black text-[#DBA53A] border-[#DBA53A]/30 rounded-sm">
                          {getMealIcon(currentMeals[restaurant.id])}
                          Currently serving: {currentMeals[restaurant.id]}
                        </Badge>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black p-4 rounded-sm border border-[#DBA53A]/30">
              <h3 className="font-semibold text-[#DBA53A] mb-3 text-center">
                <Utensils className="inline-block mr-1 h-4 w-4 text-[#DBA53A]" /> 
                Room Service <span className="ml-2 bg-black text-[#DBA53A] px-2 py-0.5 rounded-sm border border-[#DBA53A] text-xs">{roomServiceCount} available</span>
              </h3>
              
              {roomServiceCount > 0 ? (
                <ul className="space-y-3">
                  {restaurants.map(restaurant => {
                    // Skip restaurants without room service
                    if (restaurant.noInRoomDining || !restaurant.inRoomDining) {
                      return null;
                    }
                    
                    return (
                      <li key={restaurant.id} className={`p-3 rounded-sm ${roomServiceStatuses[restaurant.id] ? 'border border-[#DBA53A]' : 'border border-gray-700'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="font-medium text-white">{restaurant.name}</span>
                          {roomServiceStatuses[restaurant.id] ? (
                            <Badge className="bg-[#DBA53A]/20 text-[#DBA53A] border-[#DBA53A]/50 rounded-sm">
                              Available Now
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-black text-gray-400 border-gray-700 rounded-sm">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        
                        {roomServiceStatuses[restaurant.id] && (
                          <div className="mt-2 flex items-center">
                            <Badge variant="outline" className="text-xs bg-black text-[#DBA53A] border-[#DBA53A]/30 rounded-sm">
                              {getMealIcon(roomServiceMenus[restaurant.id])}
                              Menu: {roomServiceMenus[restaurant.id]}
                            </Badge>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No room service available at this time</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 italic text-center">
            Restaurant and room service availability updates in real time based on current operating hours.
          </div>
        </div>
      </div>
    </section>
  );
}