import { useState, useEffect } from "react";
import { Wifi, Shield, Zap, Globe, ChevronRight } from "lucide-react";

export default function InternetSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="internet" className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-800 via-cyan-900/50 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      />
      
      {/* Floating gradient orbs */}
      <div 
        className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.12}px, ${scrollY * 0.08}px)`,
        }}
      />
      <div 
        className="absolute bottom-40 right-40 w-64 h-64 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.15}px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center justify-center p-3 glass rounded-full mb-6">
            <Wifi className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">High-Speed</span>
            <br />
            <span className="text-white">Connectivity</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Stay connected with complimentary high-speed WiFi throughout the hotel. 
            Seamless connectivity for work, entertainment, and everything in between.
          </p>
        </div>

        {/* Main WiFi info card */}
        <div className={`glass-strong floating p-8 lg:p-12 max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-bounce-in' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* WiFi details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 glass rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Wifi className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Hotel WiFi</h3>
                  <p className="text-white/60">Complimentary for all guests</p>
                </div>
              </div>

              <div className="glass p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">Network Name:</span>
                  <span className="text-white font-mono">Hilton_Guest</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">Password:</span>
                  <span className="text-white font-mono">Welcome2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-medium">Speed:</span>
                  <span className="text-cyan-400 font-semibold">Up to 100 Mbps</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Connection Steps:</h4>
                <div className="space-y-2">
                  {[
                    'Select "Hilton_Guest" from WiFi networks',
                    'Enter password: Welcome2024',
                    'Accept terms and conditions',
                    'Enjoy high-speed internet access'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white/80">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Speed test visual */}
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl text-center bg-gradient-to-br from-green-500/10 to-cyan-500/10">
                <div className="text-4xl font-bold text-white mb-2">100</div>
                <div className="text-cyan-400 font-semibold">Mbps Download</div>
                <div className="text-white/60 text-sm mt-2">Average Speed</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-white/70 text-sm">Uptime</div>
                </div>
                <div className="glass p-4 text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/70 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: "Secure Connection",
              description: "Enterprise-grade security with WPA3 encryption for your privacy and protection.",
              color: "text-green-400",
              gradient: "from-green-500/20 to-emerald-500/20"
            },
            {
              icon: Zap,
              title: "Ultra-Fast Speed",
              description: "High-bandwidth connection perfect for streaming, video calls, and large downloads.",
              color: "text-yellow-400",
              gradient: "from-yellow-500/20 to-orange-500/20"
            },
            {
              icon: Globe,
              title: "Global Access",
              description: "Connect all your devices with unlimited usage throughout your entire stay.",
              color: "text-blue-400",
              gradient: "from-blue-500/20 to-cyan-500/20"
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`glass-strong floating p-6 transition-all duration-700 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${(index + 1) * 200}ms`,
                  transform: `translateY(${scrollY * 0.04}px)`
                }}
              >
                <div className={`p-4 glass rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 inline-flex`}>
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Help section */}
        <div className="text-center">
          <div className="glass-strong p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Help with Internet Connection?
            </h3>
            <p className="text-white/70 mb-6">
              Our IT support team is available 24/7 to assist with any connectivity issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:(757) 763-6200"
                className="btn-glass px-6 py-3 text-white hover:scale-105 transition-all duration-300"
              >
                Call Support
              </a>
              <button className="btn-glass px-6 py-3 text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group">
                <span className="flex items-center space-x-2">
                  <span>Troubleshooting Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
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
