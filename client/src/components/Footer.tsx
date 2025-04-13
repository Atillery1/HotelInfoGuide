import { Hotel, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <div className="flex items-center justify-center">
              <Hotel className="text-[#DBA53A] h-6 w-6 mr-3" />
              <h2 className="text-xl font-bold">THE MAIN</h2>
            </div>
            <p className="text-sm mt-2 text-gray-300">Luxury accommodations and exceptional service</p>
          </div>
          
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm text-gray-300 flex items-center">
              <Phone className="h-4 w-4 mr-1 text-[#DBA53A]" />
              <span>For reservations: </span>
              <span className="text-white ml-1">(757) 763-6200</span>
            </p>
          </div>
          
          <div className="border-t border-gray-800 w-full max-w-xs mt-4 pt-4 text-center text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} The Main Norfolk. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
