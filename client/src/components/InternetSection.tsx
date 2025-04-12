import { Wifi, Info } from "lucide-react";

export default function InternetSection() {
  return (
    <section id="internet" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2C59] text-center mb-12">Internet Connection</h2>
        
        <div className="max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden border border-[#E5E5E5]">
          <div className="bg-[#0F2C59] text-white p-5">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold flex items-center">
              <Wifi className="text-[#DBA53A] mr-3 h-6 w-6" />
              Wi-Fi Information
            </h3>
          </div>
          <div className="p-8 bg-[#F5F5F5]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[#1A3A6B] mb-2">Network Name</h4>
                <p className="bg-white p-3 rounded border border-[#E5E5E5] font-mono text-lg">HILTON HONORS</p>
              </div>
              <div>
                <h4 className="font-medium text-[#1A3A6B] mb-2">Username</h4>
                <p className="bg-white p-3 rounded border border-[#E5E5E5]">Last Name <span className="text-sm italic">(registered on the reservation)</span></p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-[#1A3A6B] mb-2">Password</h4>
              <p className="bg-white p-3 rounded border border-[#E5E5E5]">Room #</p>
            </div>
            
            <div className="mt-8 bg-[#DBA53A]/10 p-4 rounded-lg">
              <p className="text-sm text-[#333333]">
                <Info className="inline-block text-[#DBA53A] mr-2 h-4 w-4" />
                For assistance with connecting to the internet, please contact the front desk by dialing 0 from your room phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
