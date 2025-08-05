import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Wifi, Car, Star, ChevronUp } from "lucide-react";

export default function Footer() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Floating gradient orbs */}
      <div 
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.03}px)`,
        }}
      />
      <div 
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${-scrollY * 0.03}px, ${scrollY * 0.05}px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Hotel info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                <span className="gradient-text">The Hilton</span>
                <br />
                <span className="text-white">Norfolk</span>
              </h3>
              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                Experience luxury hospitality in the heart of Norfolk with exceptional 
                dining, premium amenities, and personalized service.
              </p>
            </div>

            {/* Contact information */}
            <div className="glass p-6 rounded-xl space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-white/70 text-sm">100 East Main Street, Norfolk, VA 23510</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a 
                      href="tel:(757) 763-6200" 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-mono"
                    >
                      (757) 763-6200
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a 
                      href="mailto:concierge@hiltonnorfolk.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      concierge@hiltonnorfolk.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Access</h4>
            
            <div className="space-y-2">
              {[
                { name: 'Dining', href: '#restaurants', icon: '🍽️' },
                { name: 'Amenities', href: '#amenities', icon: '🏊‍♀️' },
                { name: 'WiFi Info', href: '#internet', icon: '📶' },
                { name: 'Contact', href: 'tel:(757) 763-6200', icon: '📞' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-3 p-3 glass rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Hotel stats */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Hotel Details</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '5', label: 'Floors', icon: '🏢' },
                { value: '3', label: 'Restaurants', icon: '🍽️' },
                { value: '24/7', label: 'Concierge', icon: '🔔' },
                { value: '⭐⭐⭐⭐⭐', label: 'Rating', icon: '⭐' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="glass p-4 text-center bg-gradient-to-br from-white/5 to-white/10"
                >
                  <div className="text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick services */}
            <div className="glass p-4 rounded-xl">
              <h5 className="text-white font-semibold mb-3">24/7 Services</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white/80">Front Desk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-white/80">High-Speed WiFi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-purple-400" />
                  <span className="text-white/80">Valet Parking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="glass-strong p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/80">
                © 2024 The Hilton Norfolk. All rights reserved.
              </p>
              <p className="text-white/60 text-sm mt-1">
                Experience luxury hospitality in Norfolk, Virginia
              </p>
            </div>

            {/* Rating display */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white/80 text-sm">5-Star Hotel</span>
            </div>

            {/* Back to top button */}
            <button 
              onClick={scrollToTop}
              className="btn-glass p-3 hover:scale-110 transition-all duration-300 group"
              aria-label="Back to top"
            >
              <ChevronUp className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Final note */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            Thank you for choosing The Hilton Norfolk for your stay
          </p>
        </div>
      </div>

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </footer>
  );
}
