import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSun, Droplet, Thermometer, Wind, CloudSnow } from "lucide-react";
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
        second: '2-digit',
        hour12: true 
      }));
      
      // Format date as Month Day, Year
      setCurrentDate(now.toLocaleDateString([], { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
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
          { description: "Clear sky", icon: isNight ? "clear-night" : "clear-day" },
          { description: "Partly cloudy", icon: isNight ? "partly-cloudy-night" : "partly-cloudy-day" },
          { description: "Cloudy", icon: "cloudy" },
          { description: "Light rain", icon: "rain" },
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
        return <Sun className="h-8 w-8 text-yellow-400" />;
      case "clear-night":
        return <Sun className="h-8 w-8 text-yellow-200" />;
      case "partly-cloudy-day":
        return <CloudSun className="h-8 w-8 text-gray-400" />;
      case "partly-cloudy-night":
        return <CloudSun className="h-8 w-8 text-gray-300" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      case "snow":
        return <CloudSnow className="h-8 w-8 text-blue-100" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  };

  return (
    <header className="bg-[#0F2C59] text-white py-3 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Restaurant Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={mainLogo} 
              alt="THE MAIN" 
              className="h-16 w-16 mr-3"
            />
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold">THE MAIN</h1>
              <p className="text-xs text-[#DBA53A]">Luxury Hotel & Conference Center</p>
            </div>
          </div>
          
          {/* Date, Time and Weather */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold mr-2">{currentTime}</span>
              <span className="text-[#DBA53A]">{currentDate}</span>
            </div>
            
            {/* Weather Information */}
            <div className="flex items-center">
              {loading ? (
                <p>Loading weather...</p>
              ) : error ? (
                <p>{error}</p>
              ) : weather && (
                <div className="flex items-center bg-[#1A3A6B] p-2 rounded-md">
                  <div className="mr-3">
                    {renderWeatherIcon()}
                  </div>
                  <div>
                    <p className="font-bold flex items-center">
                      <Thermometer className="h-4 w-4 mr-1 text-red-400" />
                      {weather.temperature}°F <span className="ml-2 font-normal">{weather.description}</span>
                    </p>
                    <div className="flex text-xs text-gray-300">
                      <p className="flex items-center mr-3">
                        <Droplet className="h-3 w-3 mr-1 text-blue-300" />
                        {weather.humidity}% humidity
                      </p>
                      <p className="flex items-center">
                        <Wind className="h-3 w-3 mr-1 text-blue-100" />
                        {weather.windSpeed} mph
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4">
          <ul className="flex flex-wrap justify-center md:justify-center space-x-1 md:space-x-6">
            <li><a href="#dining" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">DINING</a></li>
            <li><a href="#amenities" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">AMENITIES</a></li>
            <li><a href="#internet" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">INTERNET</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}