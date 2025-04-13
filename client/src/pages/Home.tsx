import NewHeader from "@/components/NewHeader";
import Hero from "@/components/Hero";
import RestaurantSection from "@/components/RestaurantSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import InternetSection from "@/components/InternetSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-[#333333] font-[Raleway]">
      <NewHeader />
      <Hero />
      <RestaurantSection />
      <div className="h-3 bg-gradient-to-r from-transparent via-[#DBA53A] to-transparent w-4/5 mx-auto my-8"></div>
      <AmenitiesSection />
      <div className="h-3 bg-gradient-to-r from-transparent via-[#DBA53A] to-transparent w-4/5 mx-auto my-8"></div>
      <InternetSection />
      <Footer />
    </div>
  );
}
