import { Hotel } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F2C59] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Hotel className="text-[#DBA53A] h-6 w-6 mr-3" />
              <h2 className="font-['Playfair_Display'] text-xl font-bold">THE HILTON</h2>
            </div>
            <p className="text-sm mt-2 text-[#E5E5E5]">Luxury accommodations and exceptional service</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#DBA53A] transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <p className="text-sm text-[#E5E5E5]">For reservations: <span className="text-white">1-800-HILTON</span></p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-[#E5E5E5]">
          <p>&copy; {new Date().getFullYear()} Hilton Hotels & Resorts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
