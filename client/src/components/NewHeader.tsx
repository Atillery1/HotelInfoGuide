import { useEffect, useState } from "react";
import { Clock, MapPin, Phone, Menu, X, Info, Wifi, Car, Utensils, Dumbbell } from "lucide-react";

// Import the logo
import mainLogo from "../assets/main-logo.png";

export default function NewHeader() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [infoExpanded, setInfoExpanded] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hotel contact information
  const hotelAddress = "100 East Main Street, Norfolk, VA 23510";
  const hotelPhone = "(757) 763-6200";

  // Handle scroll for floating header behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // iOS-style header behavior: hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      
      // Format date - iOS style
      setCurrentDate(now.toLocaleDateString([], { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      }));
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const toggleInfo = () => {
    setInfoExpanded(!infoExpanded);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigation = [
    { name: 'Restaurants', href: '#restaurants', icon: Utensils },
    { name: 'Amenities', href: '#amenities', icon: Dumbbell },
    { name: 'WiFi', href: '#internet', icon: Wifi },
    { name: 'Parking', href: '#parking', icon: Car },
  ];

  return (
    <>
      {/* Main floating header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Top status bar - iOS style */}
        <div className="glass-strong border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 text-sm">
              {/* Left side - Time and date */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white/90">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{currentTime}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80">{currentDate}</span>
                </div>
              </div>

              {/* Right side - Hotel info toggle */}
              <button
                onClick={toggleInfo}
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 btn-glass !p-2"
              >
                <Info className={`w-4 h-4 transition-transform duration-300 ${infoExpanded ? 'rotate-180' : ''}`} />
                <span className="hidden sm:inline font-medium">Hotel Info</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center animate-fade-scale">
                <img 
                  src={mainLogo} 
                  alt="The Hilton" 
                  className="h-8 w-auto sm:h-10 filter drop-shadow-lg"
                />
                <div className="ml-3 hidden sm:block">
                  <h1 className="text-xl font-bold gradient-text">The Hilton</h1>
                  <p className="text-xs text-white/60">Norfolk</p>
                </div>
              </div>

              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center space-x-2">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2 btn-glass text-white/90 hover:text-white"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden btn-glass !p-3"
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable hotel info panel */}
        <div className={`overflow-hidden transition-all duration-500 ease-out glass-strong border-t border-white/10 ${
          infoExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white/90 font-medium">Address</p>
                      <p className="text-white/70 text-sm">{hotelAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/90 font-medium">Phone</p>
                      <a 
                        href={`tel:${hotelPhone}`} 
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-mono"
                      >
                        {hotelPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">Quick Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass !bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl">
                    <div className="text-2xl font-bold text-white">5</div>
                    <div className="text-white/70 text-xs">Floors</div>
                  </div>
                  <div className="glass !bg-gradient-to-br from-green-500/20 to-teal-500/20 p-3 rounded-xl">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-white/70 text-xs">Concierge</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        menuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 backdrop-blur-xl bg-black/50 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />
        
        {/* Menu panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] glass-strong border-l border-white/20 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 w-full p-4 btn-glass text-left"
                  >
                    <IconComponent className="w-5 h-5 text-white/80" />
                    <span className="text-white/90 font-medium">{item.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile contact info */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="space-y-4">
                <h4 className="font-semibold gradient-text">Contact</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80">{hotelAddress}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-green-400" />
                    <a 
                      href={`tel:${hotelPhone}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      {hotelPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="h-20 sm:h-24"></div>
    </>
  );
}