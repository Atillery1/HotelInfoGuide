import { MapPin, Phone, Mail, Calendar, ArrowUpCircle, Facebook, Instagram, Twitter } from "lucide-react";
import mainLogo from "../assets/main-logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-[#0F2C59] to-[#0A1F3F] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Back to top button - Mobile friendly */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={scrollToTop}
            className="bg-[#DBA53A]/20 hover:bg-[#DBA53A]/30 text-[#DBA53A] rounded-full p-2 flex items-center transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="h-6 w-6 mr-2" />
            <span className="text-sm font-medium">Back to top</span>
          </button>
        </div>
        
        {/* Hotel Logo and Name */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={mainLogo} 
            alt="THE MAIN" 
            className="h-16 w-16 mb-2"
          />
          <h2 className="text-xl font-bold">THE MAIN</h2>
          <p className="text-sm text-[#DBA53A] font-medium">NORFOLK, VA</p>
        </div>
        
        {/* Contact Information Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
          <div className="bg-[#162d4c]/50 rounded-lg p-3 flex items-start">
            <MapPin className="text-[#DBA53A] h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Address</h3>
              <p className="text-xs text-gray-300">100 East Main Street<br />Norfolk, VA 23510</p>
            </div>
          </div>
          
          <div className="bg-[#162d4c]/50 rounded-lg p-3 flex items-start">
            <Phone className="text-[#DBA53A] h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Phone</h3>
              <p className="text-xs text-gray-300">(757) 763-6200</p>
            </div>
          </div>
          
          <div className="bg-[#162d4c]/50 rounded-lg p-3 flex items-start">
            <Mail className="text-[#DBA53A] h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Email</h3>
              <p className="text-xs text-gray-300">info@themain.com</p>
            </div>
          </div>
          
          <div className="bg-[#162d4c]/50 rounded-lg p-3 flex items-start">
            <Calendar className="text-[#DBA53A] h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Reservations</h3>
              <p className="text-xs text-gray-300">Book online or call<br />(757) 763-6200</p>
            </div>
          </div>
        </div>
        
        {/* Social Links - Mobile Friendly */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200 bg-[#162d4c]/50 p-3 rounded-full">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200 bg-[#162d4c]/50 p-3 rounded-full">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200 bg-[#162d4c]/50 p-3 rounded-full">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-6">
          {['Restaurants', 'Amenities', 'Internet', 'Contact'].map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="text-xs text-gray-300 hover:text-[#DBA53A] py-1"
            >
              {link}
            </a>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700/50 mt-6 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} THE MAIN Norfolk. All rights reserved.</p>
          <p className="mt-1 text-[10px]">This hotel information guide is maintained for hotel guests.</p>
        </div>
      </div>
    </footer>
  );
}
