import { useState, useEffect } from "react";
import { restaurants } from "@/lib/hotelData";
import { isRestaurantOpen } from "@/lib/utils";
import { Clock, MapPin, ChevronRight, Utensils, Coffee, Wine } from "lucide-react";

export default function RestaurantSection() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize visibility states
    setVisibleCards(new Array(restaurants.length).fill(false));

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all restaurant cards
    const cards = document.querySelectorAll('.restaurant-card');
    cards.forEach(card => observer.observe(card));

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getStatusColor = (restaurant: any) => {
    return isRestaurantOpen(restaurant) ? 'status-open' : 'status-closed';
  };

  const getRestaurantIcon = (name: string) => {
    if (name.toLowerCase().includes('grain')) return Wine;
    if (name.toLowerCase().includes('varia')) return Coffee;
    return Utensils;
  };

  return (
    <section id="restaurants" className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-800 via-purple-900/50 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Floating gradient orbs */}
      <div 
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)`,
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.1}px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center justify-center p-3 glass rounded-full mb-6">
            <Utensils className="w-8 h-8 text-orange-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Dining</span>
            <br />
            <span className="text-white">Experiences</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional culinary experiences from casual dining to rooftop elegance, 
            all crafted with locally-sourced ingredients and innovative techniques.
          </p>
        </div>

        {/* Restaurant cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => {
            const IconComponent = getRestaurantIcon(restaurant.name);
            const isOpen = isRestaurantOpen(restaurant);
            
            return (
              <div
                key={restaurant.id}
                data-index={index}
                className={`restaurant-card glass-strong floating transition-all duration-700 ${
                  visibleCards[index] ? 'animate-bounce-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transform: `translateY(${scrollY * 0.05}px)`
                }}
              >
                {/* Card header */}
                <div className="p-6 pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 glass rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                        <IconComponent className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                        <div className="flex items-center space-x-2 text-white/60">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{restaurant.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(restaurant)}`}>
                      {isOpen ? 'Open Now' : 'Closed'}
                    </div>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="px-6 py-4 space-y-3">
                  {restaurant.operatingHours.map((hours, hourIndex) => (
                    <div key={hourIndex} className="glass p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white text-sm">{hours.title}</span>
                      </div>
                      
                      <div className="space-y-1">
                        {hours.schedule.map((schedule, schedIndex) => (
                          <p key={schedIndex} className="text-white/70 text-sm leading-relaxed">
                            {schedule}
                          </p>
                        ))}
                        {hours.note && (
                          <p className="text-yellow-400 text-xs italic mt-2">
                            Note: {hours.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Happy Hour section */}
                  {restaurant.happyHour && (
                    <div className="glass p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Wine className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold text-white text-sm">Happy Hour</span>
                        {restaurant.happyHour.location && (
                          <span className="text-purple-400 text-xs">
                            • {restaurant.happyHour.location}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {restaurant.happyHour.schedule.map((schedule, schedIndex) => (
                          <p key={schedIndex} className="text-white/70 text-sm">
                            {schedule}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Room Service section */}
                  {restaurant.inRoomDining && (
                    <div className="glass p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Coffee className="w-4 h-4 text-green-400" />
                        <span className="font-semibold text-white text-sm">In-Room Dining</span>
                      </div>
                      
                      {restaurant.inRoomDining.note && (
                        <p className="text-green-400 text-xs mb-2">
                          {restaurant.inRoomDining.note}
                        </p>
                      )}
                      
                      <div className="space-y-1">
                        {restaurant.inRoomDining.schedule.map((schedule, schedIndex) => (
                          <p key={schedIndex} className="text-white/70 text-sm">
                            {schedule}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No room service notice */}
                  {restaurant.noInRoomDining && (
                    <div className="glass p-4 rounded-xl bg-gradient-to-br from-gray-500/10 to-slate-500/10 border-gray-500/20">
                      <p className="text-white/60 text-sm italic">
                        {restaurant.noInRoomDining}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card footer with action */}
                <div className="p-6 pt-0">
                  <button className="w-full btn-glass flex items-center justify-center space-x-2 py-3 text-white/90 hover:text-white group">
                    <span>View Menu</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="glass-strong p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Assistance with Dining?
            </h3>
            <p className="text-white/70 mb-6">
              Our concierge team is available 24/7 to help with reservations and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:(757) 763-6200"
                className="btn-glass px-6 py-3 text-white hover:scale-105 transition-all duration-300"
              >
                Call Concierge
              </a>
              <button className="btn-glass px-6 py-3 text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                Make Reservation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
