import { useState, useEffect } from "react";
import { Phone, Globe, Clock, Utensils, MapPin, Search } from "lucide-react";
import { restaurants } from "@/lib/hotelData";
import { isRestaurantOpen, getCurrentMealPeriod } from "@/lib/utils";

export default function Dining() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    let filtered = restaurants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter(restaurant => {
        const isOpen = isRestaurantOpen(restaurant);
        if (statusFilter === "Open") return isOpen;
        if (statusFilter === "Closed") return !isOpen;
        if (statusFilter === "Busy") return isOpen; // You can implement busy logic
        return true;
      });
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, statusFilter]);

  const getStatusIndicator = (restaurant: any) => {
    const isOpen = isRestaurantOpen(restaurant);
    const currentMeal = getCurrentMealPeriod(restaurant);
    
    if (isOpen) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">Open</span>
          {currentMeal && (
            <span className="text-white/70 text-sm">• {currentMeal}</span>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-red-400 font-medium">Closed</span>
      </div>
    );
  };

  const handleCall = (restaurant: any) => {
    window.location.href = "tel:757-763-6200";
  };

  const handleWebsite = (restaurant: any) => {
    // You can add specific restaurant websites here
    window.open("https://hiltonnorfolk.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dining</h1>
              <p className="text-white/70 text-sm">Hotel Restaurant & In-Room Dining</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Norfolk, VA</p>
              <p className="text-xl font-semibold">93°F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Busy">Busy</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <p className="text-white/70 text-sm">
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Restaurant Cards */}
        <div className="space-y-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
            >
              {/* Restaurant Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">
                    {restaurant.name}
                    <span className="text-lg font-normal text-white/70 ml-2">
                      ({restaurant.location})
                    </span>
                  </h2>
                  {getStatusIndicator(restaurant)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCall(restaurant)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Call</span>
                  </button>
                  <button
                    onClick={() => handleWebsite(restaurant)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Website</span>
                  </button>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Operating Hours
                  </h3>
                  <div className="space-y-3">
                    {restaurant.operatingHours.map((hours, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3">
                        <h4 className="font-medium text-white mb-2">{hours.title}</h4>
                        {hours.schedule.map((time, timeIdx) => (
                          <p key={timeIdx} className="text-white/70 text-sm">
                            {time}
                          </p>
                        ))}
                        {hours.note && (
                          <p className="text-yellow-400 text-xs mt-1 italic">
                            {hours.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Services */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-purple-400" />
                    Special Services
                  </h3>
                  <div className="space-y-3">
                    {/* Happy Hour */}
                    {restaurant.happyHour && (
                      <div className="bg-white/5 rounded-lg p-3">
                        <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                          Happy Hour
                          {restaurant.happyHour.location && (
                            <span className="text-sm text-white/70 italic">
                              ({restaurant.happyHour.location})
                            </span>
                          )}
                        </h4>
                        {restaurant.happyHour.schedule.map((time, idx) => (
                          <p key={idx} className="text-white/70 text-sm">
                            {time}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* In-Room Dining */}
                    {restaurant.inRoomDining ? (
                      <div className="bg-white/5 rounded-lg p-3">
                        <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                          In-Room Dining
                          {restaurant.inRoomDining.note && (
                            <span className="text-sm text-white/70 italic">
                              ({restaurant.inRoomDining.note})
                            </span>
                          )}
                        </h4>
                        {restaurant.inRoomDining.schedule.map((time, idx) => (
                          <p key={idx} className="text-white/70 text-sm">
                            {time}
                          </p>
                        ))}
                      </div>
                    ) : restaurant.noInRoomDining && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-red-400 font-medium text-sm">
                          {restaurant.noInRoomDining}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Restaurant Description */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/80 leading-relaxed">
                  {restaurant.id === 'saltine' && 
                    "Fresh seafood, seasonal shellfish, and spirits in an elegant 1st floor brasserie setting."}
                  {restaurant.id === 'varia' && 
                    "Trattoria-style Italian fare with a curated wine selection, featuring a combination lounge, piano bar, and tasting room."}
                  {restaurant.id === 'grain' && 
                    "Indoor-outdoor rooftop beer garden with patio, fire pit, and stunning Elizabeth River views."}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-400" />
            Restaurant Reservations & Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 mb-2">Main Hotel Line:</p>
              <p className="text-xl font-semibold text-green-400">757-763-6200</p>
            </div>
            <div>
              <p className="text-white/70 mb-2">For Reservations:</p>
              <p className="text-white">Call or visit restaurant directly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}