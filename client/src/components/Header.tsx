import { Hotel } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#0F2C59] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Hotel className="text-[#DBA53A] h-8 w-8 mr-3" />
          <h1 className="font-['Playfair_Display'] text-2xl font-bold tracking-wide">THE HILTON</h1>
        </div>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-6">
            <li><a href="#dining" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">DINING</a></li>
            <li><a href="#amenities" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">AMENITIES</a></li>
            <li><a href="#internet" className="px-3 py-2 text-sm md:text-base hover:text-[#DBA53A] transition-colors duration-200">INTERNET</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
