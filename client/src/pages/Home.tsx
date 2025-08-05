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

  // Scroll reveal animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white overflow-x-hidden">
      <NewHeader />
      <main className="relative">
        <Hero />
        <RestaurantSection />
        <AmenitiesSection />
        <InternetSection />
        <Footer />
      </main>
    </div>
  );
}
