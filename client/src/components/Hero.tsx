import { Utensils, Bell } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#F5F5F5] py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F2C59] mb-6">Hotel Information Guide</h2>
        <p className="text-[#888888] max-w-2xl mx-auto mb-8 text-base md:text-lg">Welcome to The Hilton. Discover our dining options, amenities, and everything you need for a comfortable stay.</p>
        <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-3 md:space-y-0">
          <a href="#dining" className="bg-[#0F2C59] hover:bg-[#1A3A6B] text-white font-medium py-3 px-6 rounded transition-colors duration-200">
            <Utensils className="inline-block mr-2 h-5 w-5" />Dining Options
          </a>
          <a href="#amenities" className="bg-[#DBA53A] hover:bg-[#F0D195] text-white font-medium py-3 px-6 rounded transition-colors duration-200">
            <Bell className="inline-block mr-2 h-5 w-5" />Our Amenities
          </a>
        </div>
      </div>
    </section>
  );
}
