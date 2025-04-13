import { useEffect, useState } from "react";
import { Clock, MapPin, Phone, Menu, X, Info } from "lucide-react";

// Import the logo
import mainLogo from "../assets/main-logo.png";

export default function NewHeader() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [infoExpanded, setInfoExpanded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Hotel contact information
  const hotelAddress = "100 East Main Street, Norfolk, VA 23510";
  const hotelPhone = "(757) 763-6200";

  // Update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time with AM/PM
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
      
      // Format date as Month Day, Year - shorter format for mobile
      setCurrentDate(now.toLocaleDateString([], { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      }));
    };
    
    // Initial call
    updateTime();
    
    // Set interval to update every second
    const timeInterval = setInterval(updateTime, 1000);
    
    // Clean up
    return () => clearInterval(timeInterval);
  }, []);

  const toggleInfo = () => {
    setInfoExpanded(!infoExpanded);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-b from-[#0A1F3F] to-[#0F2C59] text-white py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-3">
        {/* Main header content */}
        <div className="flex flex-col items-center">
          {/* Top bar with logo, menu button and info button */}
          <div className="w-full flex items-center justify-between mb-2">
            {/* Logo and Hotel Name */}
            <div className="flex items-center">
              <img 
                src={mainLogo} 
                alt="THE MAIN" 
                className="h-12 w-12 mr-2"
              />
              <div>
                <h1 className="font-bold text-xl tracking-wide leading-tight">THE MAIN</h1>
                <p className="text-xs text-[#DBA53A] font-semibold">NORFOLK, VA</p>
              </div>
            </div>
            
            {/* Mobile Controls */}
            <div className="flex items-center">
              {/* Info toggle */}
              <button 
                onClick={toggleInfo}
                className="p-2 mr-1 rounded-full hover:bg-[#162d4c] transition-colors"
                aria-label="Toggle contact information"
              >
                <Info className="h-5 w-5 text-[#DBA53A]" />
              </button>
              
              {/* Menu toggle */}
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-[#162d4c] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-[#DBA53A]" />
                ) : (
                  <Menu className="h-5 w-5 text-[#DBA53A]" />
                )}
              </button>
            </div>
          </div>
          
          {/* Current Time Display - Always visible */}
          <div className="w-full bg-[#162d4c]/70 px-3 py-2 rounded-lg shadow-inner mb-2 flex justify-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-[#DBA53A] mr-2" />
              <div className="text-center">
                <p className="font-bold text-base">{currentTime}</p>
                <p className="text-xs text-gray-300">{currentDate}</p>
              </div>
            </div>
          </div>
          
          {/* Contact Information - Expandable */}
          <div 
            className={`w-full bg-[#162d4c]/80 rounded-lg mb-2 overflow-hidden transition-all duration-300 ${
              infoExpanded 
                ? "max-h-24 py-3 px-4 opacity-100" 
                : "max-h-0 py-0 px-4 opacity-0"
            }`}
          >
            <div className="flex items-start text-sm mb-2">
              <MapPin className="h-4 w-4 text-[#DBA53A] mr-2 mt-0.5 flex-shrink-0" />
              <p>{hotelAddress}</p>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-[#DBA53A] mr-2 flex-shrink-0" />
              <p>{hotelPhone}</p>
            </div>
          </div>
          
          {/* Navigation - Expandable on mobile */}
          <nav className={`w-full transition-all duration-300 ${menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            <ul className="flex flex-col bg-[#0A1F3F]/90 rounded-lg overflow-hidden shadow-md mt-1">
              <li className="border-b border-gray-700/50">
                <a 
                  href="#dining" 
                  className="flex items-center py-3 px-4 hover:bg-[#DBA53A]/20 transition-colors"
                  onClick={toggleMenu}
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase mr-2">Dining</span>
                  <span className="text-xs text-gray-300">Restaurants & Room Service</span>
                </a>
              </li>
              <li className="border-b border-gray-700/50">
                <a 
                  href="#amenities" 
                  className="flex items-center py-3 px-4 hover:bg-[#DBA53A]/20 transition-colors"
                  onClick={toggleMenu}
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase mr-2">Amenities</span>
                  <span className="text-xs text-gray-300">Pool, Fitness & More</span>
                </a>
              </li>
              <li>
                <a 
                  href="#internet" 
                  className="flex items-center py-3 px-4 hover:bg-[#DBA53A]/20 transition-colors"
                  onClick={toggleMenu}
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase mr-2">Internet</span>
                  <span className="text-xs text-gray-300">Wi-Fi Information</span>
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Bottom Navigation Pills - Visible when menu is closed */}
          {!menuOpen && (
            <div className="w-full grid grid-cols-3 gap-2 mt-1">
              <a 
                href="#dining" 
                className="bg-[#0A1F3F]/80 text-center py-2 px-1 rounded-lg shadow hover:bg-[#162d4c] transition-colors"
              >
                <span className="text-[#DBA53A] font-bold text-xs uppercase">Dining</span>
              </a>
              <a 
                href="#amenities" 
                className="bg-[#0A1F3F]/80 text-center py-2 px-1 rounded-lg shadow hover:bg-[#162d4c] transition-colors"
              >
                <span className="text-[#DBA53A] font-bold text-xs uppercase">Amenities</span>
              </a>
              <a 
                href="#internet" 
                className="bg-[#0A1F3F]/80 text-center py-2 px-1 rounded-lg shadow hover:bg-[#162d4c] transition-colors"
              >
                <span className="text-[#DBA53A] font-bold text-xs uppercase">Internet</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}