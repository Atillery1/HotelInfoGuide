import { useState } from "react";
import { Car, Phone, ExternalLink, Clock, DollarSign, MapPin, Smartphone, Building, Bus, Key } from "lucide-react";
import { transportOptions } from "@/lib/hotelData";

const transportIcons = {
  rideshare: Smartphone,
  taxi: Car,
  hotel: Building,
  public: Bus,
  rental: Key
};

const transportColors = {
  rideshare: "bg-purple-600/20 border-purple-500/30 text-purple-400",
  taxi: "bg-yellow-600/20 border-yellow-500/30 text-yellow-400",
  hotel: "bg-blue-600/20 border-blue-500/30 text-blue-400",
  public: "bg-green-600/20 border-green-500/30 text-green-400",
  rental: "bg-red-600/20 border-red-500/30 text-red-400"
};

export default function Transit() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredOptions = selectedType === "all" 
    ? transportOptions 
    : transportOptions.filter(option => option.type === selectedType);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWebsite = (website: string) => {
    window.open(`https://${website}`, "_blank");
  };

  const handleRideshareApp = (service: string) => {
    // Open app or app store
    if (service.toLowerCase() === "uber") {
      window.open("https://m.uber.com", "_blank");
    } else if (service.toLowerCase() === "lyft") {
      window.open("https://lyft.com", "_blank");
    }
  };

  const getTypeCount = (type: string) => {
    return transportOptions.filter(option => option.type === type).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Transit</h1>
              <p className="text-white/70 text-sm">Transportation Options & Pricing</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Norfolk, VA</p>
              <p className="text-xl font-semibold">93°F</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Transportation Type Filter */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Transportation Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => setSelectedType("all")}
              className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                selectedType === "all" 
                  ? "bg-white/20 border-white/30 text-white" 
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              }`}
            >
              <Car className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-medium">All</span>
              <p className="text-xs text-white/60">{transportOptions.length}</p>
            </button>

            {[
              { key: "rideshare", label: "Rideshare", icon: Smartphone },
              { key: "taxi", label: "Taxi", icon: Car },
              { key: "hotel", label: "Hotel", icon: Building },
              { key: "public", label: "Public", icon: Bus },
              { key: "rental", label: "Rental", icon: Key }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                  selectedType === key 
                    ? "bg-white/20 border-white/30 text-white" 
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs font-medium">{label}</span>
                <p className="text-xs text-white/60">{getTypeCount(key)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Transportation Options */}
        <div className="space-y-4">
          {filteredOptions.map((option) => {
            const Icon = transportIcons[option.type];
            const colorClass = transportColors[option.type];

            return (
              <div
                key={option.id}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{option.name}</h3>
                        <p className="text-white/70 text-sm capitalize">
                          {option.type.replace('rideshare', 'Ride Share')} Service
                        </p>
                      </div>
                    </div>

                    <p className="text-white/80 mb-4">{option.description}</p>

                    {/* Pricing and Timing Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-white/70">Cost</p>
                          <p className="font-semibold text-green-400">{option.cost}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-white/70">Wait Time</p>
                          <p className="font-semibold text-blue-400">{option.waitTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 md:w-48">
                    {option.phone && (
                      <button
                        onClick={() => handleCall(option.phone)}
                        className="flex items-center gap-2 px-4 py-3 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Call Now</span>
                      </button>
                    )}
                    
                    {option.website && (
                      <button
                        onClick={() => handleWebsite(option.website)}
                        className="flex items-center gap-2 px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-medium">Website</span>
                      </button>
                    )}

                    {option.type === "rideshare" && (
                      <button
                        onClick={() => handleRideshareApp(option.name)}
                        className="flex items-center gap-2 px-4 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="font-medium">Open App</span>
                      </button>
                    )}

                    {/* Special case for hotel valet */}
                    {option.type === "hotel" && (
                      <div className="px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-400 font-medium text-sm">Hotel Service</p>
                        <p className="text-white/70 text-xs">Available at front desk</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                {option.id === "hrt-bus" && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2">Route Information</h4>
                    <p className="text-white/70 text-sm">
                      Multiple bus routes serve downtown Norfolk. Check the HRT website for schedules and route maps.
                    </p>
                  </div>
                )}

                {option.id === "enterprise-rental" && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2">Rental Requirements</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Valid driver's license required</li>
                      <li>• Credit card for security deposit</li>
                      <li>• Age restrictions may apply</li>
                    </ul>
                  </div>
                )}

                {option.type === "rideshare" && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2">Service Options</h4>
                    <p className="text-white/70 text-sm">
                      Various vehicle types available including standard, premium, and shared rides. Pricing varies by demand and distance.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hotel Location & Pickup Information */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            Hotel Location & Pickup
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Hotel Address</h4>
              <p className="text-white/70 mb-4">
                100 East Main Street<br />
                Norfolk, VA 23510
              </p>
              <h4 className="font-medium mb-2">Pickup Instructions</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Rideshare: Main Street entrance</li>
                <li>• Taxi: Hotel front door</li>
                <li>• Valet: Available at front desk</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Popular Destinations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Norfolk International Airport</span>
                  <span className="text-white">~$25-35</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Norfolk Botanical Garden</span>
                  <span className="text-white">~$15-25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Virginia Beach</span>
                  <span className="text-white">~$35-50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">MacArthur Center</span>
                  <span className="text-white">~$8-12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Transportation */}
        <div className="mt-6 backdrop-blur-xl bg-red-600/10 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-400">Emergency Transportation</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Emergency Services</h4>
              <p className="text-white/70 text-sm mb-2">For medical emergencies:</p>
              <button
                onClick={() => handleCall("911")}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call 911</span>
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Hotel Assistance</h4>
              <p className="text-white/70 text-sm mb-2">24/7 front desk support:</p>
              <button
                onClick={() => handleCall("757-763-6200")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call Front Desk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}