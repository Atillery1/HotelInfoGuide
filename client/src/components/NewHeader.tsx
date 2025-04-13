import { useEffect, useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";

// Import the logo
import mainLogo from "../assets/main-logo.png";

export default function NewHeader() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [infoExpanded, setInfoExpanded] = useState<boolean>(false);

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

  return (
    <header className="bg-black text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2">
        {/* Main header content */}
        <div className="flex flex-col items-center">
          {/* Logo and Hotel Name - Centered on mobile */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src={mainLogo} 
              alt="THE MAIN" 
              className="h-16 w-16 mr-3"
            />
            <div className="text-center">
              <h1 className="font-bold text-2xl tracking-wide">THE MAIN</h1>
              <div 
                className="flex items-center justify-center text-xs text-[#DBA53A] font-semibold cursor-pointer"
                onClick={toggleInfo}
              >
                <span>CONTACT INFO</span>
                <span className="ml-1 text-xs">{infoExpanded ? "▲" : "▼"}</span>
              </div>
            </div>
          </div>
          
          {/* Contact Information - Expandable */}
          <div 
            className={`w-full max-w-sm bg-gray-900 rounded-lg mb-3 overflow-hidden transition-all duration-300 ${
              infoExpanded 
                ? "max-h-24 p-2 opacity-100" 
                : "max-h-0 p-0 opacity-0"
            }`}
          >
            <div className="flex items-start text-xs mb-1">
              <MapPin className="h-3.5 w-3.5 text-[#DBA53A] mr-1 mt-0.5 flex-shrink-0" />
              <p>{hotelAddress}</p>
            </div>
            <div className="flex items-center text-xs">
              <Phone className="h-3.5 w-3.5 text-[#DBA53A] mr-1 flex-shrink-0" />
              <p>{hotelPhone}</p>
            </div>
          </div>
          
          {/* Time display - Centered */}
          <div className="flex justify-center w-full mb-3">
            <div className="flex items-center justify-center bg-gray-900 px-4 py-2 rounded-full shadow">
              <Clock className="h-4 w-4 text-[#DBA53A] mr-2" />
              <div className="text-center">
                <p className="font-bold text-sm">{currentTime}</p>
                <p className="text-xs text-gray-300">{currentDate}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="w-full">
            <ul className="flex justify-between bg-gray-900 rounded-lg overflow-hidden shadow-md">
              <li className="flex-1">
                <a 
                  href="#dining" 
                  className="flex flex-col items-center py-2 hover:bg-[#DBA53A]/20 transition-colors duration-200"
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase">Dining</span>
                </a>
              </li>
              <li className="flex-1 border-l border-r border-gray-700">
                <a 
                  href="#amenities" 
                  className="flex flex-col items-center py-2 hover:bg-[#DBA53A]/20 transition-colors duration-200"
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase">Amenities</span>
                </a>
              </li>
              <li className="flex-1">
                <a 
                  href="#internet" 
                  className="flex flex-col items-center py-2 hover:bg-[#DBA53A]/20 transition-colors duration-200"
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase">Internet</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}