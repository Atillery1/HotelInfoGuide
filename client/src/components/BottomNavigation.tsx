import { Home, UtensilsCrossed, MapPin, Car, MessageSquare, Phone } from "lucide-react";
import { useLocation } from "wouter";

const navigationItems = [
  { 
    id: "home", 
    label: "Home", 
    icon: Home, 
    path: "/" 
  },
  { 
    id: "dining", 
    label: "Dining", 
    icon: UtensilsCrossed, 
    path: "/dining" 
  },
  { 
    id: "explore", 
    label: "Explore", 
    icon: MapPin, 
    path: "/explore" 
  },
  { 
    id: "transit", 
    label: "Transit", 
    icon: Car, 
    path: "/transit" 
  },
  { 
    id: "feedback", 
    label: "Feedback", 
    icon: MessageSquare, 
    path: "/feedback" 
  }
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const handleCall = () => {
    window.location.href = "tel:757-763-6200";
  };

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-t border-white/10">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around items-center py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setLocation(item.path)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "text-blue-400 bg-blue-600/20" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-blue-400" : ""}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Floating Action Button */}
      <button
        onClick={handleCall}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        title="Call Front Desk"
      >
        <Phone className="w-6 h-6 text-white" />
      </button>

      {/* Page content padding to account for bottom nav */}
      <div className="pb-20" />
    </>
  );
}