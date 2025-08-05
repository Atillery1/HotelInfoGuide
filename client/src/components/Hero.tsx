import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, MapPin, Star } from "lucide-react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal animation on mount
    setIsVisible(true);

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector('#restaurants');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container">
      {/* Dynamic background layers with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full blur-3xl"
        style={{
          transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.3}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(-50%, -50%) translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`,
        }}
      />

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main content glass card */}
        <div className={`glass-strong p-8 sm:p-12 lg:p-16 mx-auto max-w-4xl transition-all duration-1000 ${
          isVisible ? 'animate-bounce-in' : 'opacity-0 translate-y-10'
        }`}>
          {/* Sparkle icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 glass rounded-full animate-pulse">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          {/* Welcome text */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Welcome to</span>
              <br />
              <span className="text-white">The Hilton</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-2 text-lg sm:text-xl text-white/80">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Norfolk, Virginia</span>
            </div>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Experience luxury hospitality with modern amenities, exceptional dining, 
              and personalized service in the heart of Norfolk.
            </p>

            {/* Rating display */}
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white/80 ml-2">5-Star Experience</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
              <button 
                onClick={scrollToContent}
                className="btn-glass px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-all duration-300 group"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Services</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </button>
              
              <a 
                href="tel:(757) 763-6200"
                className="btn-glass px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border-blue-500/30"
              >
                Call Front Desk
              </a>
            </div>
          </div>
        </div>

        {/* Floating info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {[
            {
              title: "Premium Dining",
              description: "3 restaurants & room service",
              icon: "🍽️",
              gradient: "from-orange-500/20 to-red-500/20"
            },
            {
              title: "Luxury Amenities", 
              description: "Pool, fitness & business center",
              icon: "🏊‍♀️",
              gradient: "from-blue-500/20 to-teal-500/20"
            },
            {
              title: "Prime Location",
              description: "Heart of downtown Norfolk",
              icon: "📍",
              gradient: "from-purple-500/20 to-pink-500/20"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`glass floating p-6 text-center transition-all duration-700 ${
                isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
              } bg-gradient-to-br ${item.gradient}`}
              style={{ 
                animationDelay: `${(index + 1) * 200}ms`,
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'animate-bounce' : 'opacity-0'
        }`}>
          <button 
            onClick={scrollToContent}
            className="p-3 glass rounded-full hover:scale-110 transition-transform duration-300 group"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/20 pointer-events-none" />
      
      {/* Edge glow effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
