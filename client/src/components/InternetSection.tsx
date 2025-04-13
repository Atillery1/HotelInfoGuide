import { Wifi, Info } from "lucide-react";

export default function InternetSection() {
  return (
    <section id="internet" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="bg-[#DBA53A]/20 text-[#DBA53A] text-sm font-bold px-3 py-1 rounded-sm border border-[#DBA53A]/30">CONNECTIVITY</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Internet Access</h2>
          <div className="w-20 h-1 bg-[#DBA53A] mx-auto"></div>
        </div>
        
        <div className="max-w-2xl mx-auto shadow-lg rounded-sm overflow-hidden border border-[#DBA53A]/30">
          <div className="bg-black text-white p-5">
            <h3 className="text-2xl font-semibold flex items-center justify-center">
              <Wifi className="text-[#DBA53A] mr-3 h-6 w-6" />
              Wi-Fi Information
            </h3>
          </div>
          <div className="p-8 bg-black text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[#DBA53A] mb-2">Network Name</h4>
                <p className="bg-gray-900 p-3 rounded-sm border border-[#DBA53A]/30 font-mono text-lg">THE MAIN</p>
              </div>
              <div>
                <h4 className="font-medium text-[#DBA53A] mb-2">Username</h4>
                <p className="bg-gray-900 p-3 rounded-sm border border-[#DBA53A]/30">Last Name <span className="text-sm italic text-gray-400">(registered on the reservation)</span></p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-[#DBA53A] mb-2">Password</h4>
              <p className="bg-gray-900 p-3 rounded-sm border border-[#DBA53A]/30">Room #</p>
            </div>
            
            <div className="mt-8 bg-black p-4 rounded-sm border border-[#DBA53A]">
              <p className="text-sm text-gray-300">
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
