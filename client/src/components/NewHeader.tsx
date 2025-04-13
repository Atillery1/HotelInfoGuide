import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSun, Droplet, Thermometer, Wind, CloudSnow, Clock } from "lucide-react";
import axios from "axios";

// Import the logo
import mainLogo from "../assets/main-logo.png";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export default function NewHeader() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch weather data for Norfolk, VA
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // Since we need an API key for actual weather API, we'll simulate weather data
        // In a real application, you would use: 
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Norfolk,VA,US&units=imperial&appid=${API_KEY}`);
        
        // Simulating weather data based on current time
        const hour = new Date().getHours();
        const isNight = hour < 6 || hour > 18;
        const temp = Math.round(65 + Math.sin(Date.now() / 3600000) * 15); // Simulated temperature between 50-80°F
        
        // Randomly select a weather condition based on the current hour
        const conditions = [
          { description: "Clear", icon: isNight ? "clear-night" : "clear-day" },
          { description: "Partly Cloudy", icon: isNight ? "partly-cloudy-night" : "partly-cloudy-day" },
          { description: "Cloudy", icon: "cloudy" },
          { description: "Rain", icon: "rain" },
        ];
        
        const randomIndex = Math.floor(Math.sin(Date.now() / 7200000) * 2 + 2) % conditions.length;
        const condition = conditions[randomIndex];
        
        setWeather({
          temperature: temp,
          description: condition.description,
          humidity: Math.round(60 + Math.sin(Date.now() / 5400000) * 20), // Simulated humidity between 40-80%
          windSpeed: Math.round(5 + Math.sin(Date.now() / 4500000) * 5), // Simulated wind between 0-10 mph
          icon: condition.icon
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(weatherInterval);
  }, []);

  // Render the appropriate weather icon
  const renderWeatherIcon = () => {
    if (!weather) return null;
    
    switch (weather.icon) {
      case "clear-day":
        return <Sun className="h-6 w-6 text-yellow-400" />;
      case "clear-night":
        return <Sun className="h-6 w-6 text-yellow-200" />;
      case "partly-cloudy-day":
        return <CloudSun className="h-6 w-6 text-gray-400" />;
      case "partly-cloudy-night":
        return <CloudSun className="h-6 w-6 text-gray-300" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />;
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      case "snow":
        return <CloudSnow className="h-6 w-6 text-blue-100" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-400" />;
    }
  };

  return (
    <header className="bg-gradient-to-b from-[#0A1F3F] to-[#0F2C59] text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2">
        {/* Main header content */}
        <div className="flex flex-col items-center">
          {/* Logo and Hotel Name - Centered on mobile */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src={mainLogo} 
              alt="THE MAIN" 
              className="h-14 w-14 mr-3"
            />
            <div className="text-center">
              <h1 className="font-bold text-2xl tracking-wide">THE MAIN</h1>
              <p className="text-xs text-[#DBA53A] font-semibold">NORFOLK, VA</p>
            </div>
          </div>
          
          {/* Time and Weather - More compact for mobile */}
          <div className="flex justify-center w-full mb-3">
            <div className="flex items-center justify-between w-full max-w-sm bg-[#162d4c]/70 px-3 py-2 rounded-lg shadow">
              {/* Time and Date */}
              <div className="flex items-center mr-2">
                <Clock className="h-4 w-4 text-[#DBA53A] mr-1" />
                <div>
                  <p className="font-bold text-sm">{currentTime}</p>
                  <p className="text-xs text-gray-300">{currentDate}</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="h-10 w-px bg-gray-600/50"></div>
              
              {/* Weather */}
              {loading ? (
                <p className="text-xs">Loading...</p>
              ) : error ? (
                <p className="text-xs text-red-300">{error}</p>
              ) : weather && (
                <div className="flex items-center ml-2">
                  {renderWeatherIcon()}
                  <div className="ml-1">
                    <p className="font-bold text-sm flex items-center">
                      {weather.temperature}°F
                    </p>
                    <p className="text-xs text-gray-300">{weather.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="w-full">
            <ul className="flex justify-between bg-[#0A1F3F]/80 rounded-lg overflow-hidden shadow-md">
              <li className="flex-1">
                <a 
                  href="#dining" 
                  className="flex flex-col items-center py-2 hover:bg-[#DBA53A]/20 transition-colors duration-200"
                >
                  <span className="text-[#DBA53A] font-bold text-sm uppercase">Dining</span>
                </a>
              </li>
              <li className="flex-1 border-l border-r border-gray-700/50">
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