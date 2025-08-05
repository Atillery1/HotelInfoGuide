import { useState, useEffect } from "react";
import { amenities } from "@/lib/hotelData";
import { Clock, ShoppingBag, Dumbbell, Laptop, Waves, ChevronRight, Star } from "lucide-react";

export default function AmenitiesSection() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize visibility states
    setVisibleCards(new Array(amenities.length).fill(false));

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

    // Observe all amenity cards
    const cards = document.querySelectorAll('.amenity-card');
    cards.forEach(card => observer.observe(card));

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getAmenityIcon = (iconType: string) => {
    switch (iconType) {
      case 'ShoppingBag': return ShoppingBag;
      case 'Pool': return Waves;
      case 'Dumbbell': return Dumbbell;
      case 'Laptop': return Laptop;
      default: return Star;
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500/20 to-teal-500/20',
      'from-purple-500/20 to-pink-500/20',
      'from-green-500/20 to-emerald-500/20',
      'from-orange-500/20 to-red-500/20'
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index: number) => {
    const colors = [
      'text-blue-400',
      'text-purple-400',
      'text-green-400',
      'text-orange-400'
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="amenities" className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-800"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Floating gradient orbs */}
      <div 
        className="absolute top-32 left-32 w-72 h-72 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.1}px)`,
        }}
      />
      <div 
        className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.2}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.12}px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center justify-center p-3 glass rounded-full mb-6">
            <Star className="w-8 h-8 text-teal-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Premium</span>
            <br />
            <span className="text-white">Amenities</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Elevate your stay with our world-class facilities designed for comfort, 
            productivity, and relaxation. Every amenity crafted with attention to detail.
          </p>
        </div>

        {/* Amenities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = getAmenityIcon(amenity.iconType);
            const gradientClass = getGradientClass(index);
            const iconColorClass = getIconColor(index);
            
            return (
              <div
                key={amenity.id}
                data-index={index}
                className={`amenity-card glass-strong floating transition-all duration-700 ${
                  visibleCards[index] ? 'animate-bounce-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transform: `translateY(${scrollY * 0.03}px)`
                }}
              >
                {/* Card content */}
                <div className="p-6">
                  {/* Icon header */}
                  <div className={`p-4 glass rounded-xl bg-gradient-to-br ${gradientClass} mb-6 inline-flex`}>
                    <IconComponent className={`w-8 h-8 ${iconColorClass}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      {amenity.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{amenity.hours}</span>
                    </div>
                    
                    <div className="glass p-4 rounded-xl">
                      <p className="text-white/70 text-sm mb-3">
                        📍 {amenity.location}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <button className="w-full btn-glass flex items-center justify-center space-x-2 py-3 text-white/90 hover:text-white group mt-4">
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured amenity highlight */}
        <div className="mt-20">
          <div className="glass-strong p-8 lg:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text content */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-3 glass rounded-full">
                  <Waves className="w-6 h-6 text-blue-400" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold">
                  <span className="gradient-text">Rooftop Pool</span>
                  <br />
                  <span className="text-white">Experience</span>
                </h3>
                
                <p className="text-white/70 text-lg leading-relaxed">
                  Unwind in our stunning 5th-floor rooftop pool with panoramic views of Norfolk. 
                  Perfect for morning laps or evening relaxation under the stars.
                </p>
                
                <div className="space-y-3">
                  {[
                    'Panoramic city views',
                    'Heated pool year-round',
                    'Poolside service available',
                    'Private cabanas for rent'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="btn-glass px-6 py-3 text-white hover:scale-105 transition-all duration-300">
                    Reserve Cabana
                  </button>
                  <button className="btn-glass px-6 py-3 text-white bg-gradient-to-r from-blue-500/20 to-teal-500/20">
                    View Pool Hours
                  </button>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '24/7', label: 'Access' },
                  { value: '5th', label: 'Floor' },
                  { value: '80°F', label: 'Water Temp' },
                  { value: '360°', label: 'City Views' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className={`glass p-6 text-center bg-gradient-to-br ${getGradientClass(index)}`}
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="glass-strong p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions About Our Amenities?
            </h3>
            <p className="text-white/70 mb-6">
              Our staff is here to help you make the most of your stay with personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:(757) 763-6200"
                className="btn-glass px-6 py-3 text-white hover:scale-105 transition-all duration-300"
              >
                Contact Front Desk
              </a>
              <button className="btn-glass px-6 py-3 text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                Schedule Tour
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
