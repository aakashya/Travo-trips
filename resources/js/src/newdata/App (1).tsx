import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import StoryIntro from "./components/StoryIntro";
import RouteJourney from "./components/RouteJourney";
import StoryTimeline from "./components/StoryTimeline";
import ExperienceCards from "./components/ExperienceCards";
import Inclusions from "./components/Inclusions";
import Checklist from "./components/Checklist";
import TermsAccordion from "./components/TermsAccordion";
import FooterCTA from "./components/FooterCTA";
import BookingForm from "./components/BookingForm";
import GallerySection from "./components/GallerySection";
import UpcomingCalendar from "./components/UpcomingCalendar";
import BookNowPage from "./components/BookNowPage";
import TripsShowcase from "./components/TripsShowcase";
import TeamPage from "./components/TeamPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AndamanPackagePage from "./components/AndamanPackagePage";
import GoaPackagePage from "./components/GoaPackagePage";
import NepalPackagePage from "./components/NepalPackagePage";
import KeralaPackagePage from "./components/KeralaPackagePage";
import BhutanPackagePage from "./components/BhutanPackagePage";
import SikkimPackagePage from "./components/SikkimPackagePage";
import CustomerDashboard from "./components/CustomerDashboard";
import CustomerAuthModal from "./components/CustomerAuthModal";
import AdminLogin from "./admin/AdminLogin";
import DashboardLayout from "./admin/DashboardLayout";
import { TRIPS_DATA } from "./data";
import { useCustomerAuth } from "./context/CustomerAuthContext";
import { Compass, ShieldCheck, Star, Users, Sparkles, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function App() {
  const { isAuthModalOpen, closeAuthModal, authModalReason } = useCustomerAuth();
  const [currentView, setCurrentView] = useState<string>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTripIdForBooking, setSelectedTripIdForBooking] = useState<string>("andaman-dream-4d3n");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenBooking = (tripIdOrObj: any) => {
    if (typeof tripIdOrObj === "string") {
      setSelectedTripIdForBooking(tripIdOrObj || "andaman-dream-4d3n");
    } else if (tripIdOrObj?.id) {
      setSelectedTripIdForBooking(tripIdOrObj.id);
    }
    setCurrentView("book-now");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    // Smooth scroll to top when changing page views
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleExploreClick = () => {
    const target = document.getElementById("explore-expeditions") || document.getElementById("chapter-intro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Layout check logic:
  // 1. Scenic Highway Layout is ONLY for Manali, Valley of Flowers, and Udaipur
  const isHighwayLayout = currentView === "manali" || currentView === "valley-of-flowers" || currentView === "udaipur";
  
  // 2. The 2nd Layout (Package Page style) for Andaman, Goa, Nepal, Kerala, Bhutan, and Sikkim
  const isAndamanView = currentView.startsWith("andaman-");
  const isGoaView = currentView.startsWith("goa-");
  const isNepalView = currentView.startsWith("nepal-");
  const isKeralaView = currentView.startsWith("kerala-");
  const isBhutanView = currentView.startsWith("bhutan-");
  const isSikkimView = currentView.startsWith("sikkim-");
  const isPackageLayout = isAndamanView || isGoaView || isNepalView || isKeralaView || isBhutanView || isSikkimView;

  const activeTrip = TRIPS_DATA[currentView] || null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-brand-sand/30 selection:text-brand-charcoal antialiased overflow-x-hidden">
      
      {/* 1. Top Hero Section - Shown on Homepage, Content Subpages, and Scenic Highway Trips (NOT on 2nd layout package pages, book-now, customer dashboard, or admin) */}
      {!isPackageLayout && currentView !== "book-now" && !currentView.startsWith("customer-dashboard") && currentView !== "admin-login" && currentView !== "admin-dashboard" && (
        <HeroSection 
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenBooking={(tripId) => handleOpenBooking(tripId)}
          onExploreClick={handleExploreClick}
        />
      )}

      {/* Render Homepage Content */}
      {currentView === "home" && (
        <div className="animate-[fadeIn_0.6s_ease-out]">
          
          {/* A. TRAVO Philosophy Story Intro */}
          <StoryIntro tripId="general" />

          {/* B. Expeditions Showcase Cards */}
          <div id="explore-expeditions" className="scroll-mt-20">
            <TripsShowcase 
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>

          {/* C. The TRAVO Trust Promise */}
          <section className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden text-neutral-900 border-b border-neutral-200">
            <div className="max-w-7xl mx-auto space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white px-3.5 py-1.5 bg-[#9C753B] rounded-full inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" /> THE TRAVO PROMISE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
                  Crafting Premium <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
                    Road & Island Getaways
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  We focus strictly on luxury, intimacy, safety, verified logistics, and 100% transparent group pricing.
                </p>
              </div>

              {/* Pillars grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Curated Group Vibe",
                    desc: "Handpicked co-travelers joining as strangers and returning as a tight-knit family.",
                    icon: <Users className="w-5 h-5 text-[#9C753B]" />
                  },
                  {
                    title: "Comfort On Roads & Sea",
                    desc: "Traverse high passes in luxury AC vehicles and cross tropical seas in private high-speed catamarans.",
                    icon: <Compass className="w-5 h-5 text-[#9C753B]" />
                  },
                  {
                    title: "Expert Certified Captains",
                    desc: "Supervised from departure to return by professional, certified captains equipped with deep local knowledge.",
                    icon: <Star className="w-5 h-5 text-[#9C753B]" />
                  },
                  {
                    title: "100% Honest Budgets",
                    desc: "Zero surprise taxes or hidden tourist fees en route. All state permits, tolls, ferry passes, and GST included.",
                    icon: <Sparkles className="w-5 h-5 text-[#9C753B]" />
                  }
                ].map((pillar, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white border border-neutral-200 hover:border-[#9C753B]/30 hover:shadow-lg transition-all duration-300 space-y-4 text-left">
                    <div className="p-3 bg-neutral-100 rounded-2xl w-max border border-neutral-200">
                      {pillar.icon}
                    </div>
                    <h3 className="text-base font-black text-neutral-900 uppercase tracking-wider font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Upcoming Trips Calendar Section */}
          <UpcomingCalendar 
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />

          {/* Interactive Cinematic Gallery Section */}
          <GallerySection />

          {/* Shared General Footer CTA */}
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("andaman-dream-4d3n")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹12,350"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            isHomeView={true}
            onNavigate={handleNavigate}
          />

        </div>
      )}

      {/* 2. SCENIC HIGHWAY LAYOUT: Strictly for Manali, Valley of Flowers, and Udaipur */}
      {isHighwayLayout && activeTrip && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <StoryIntro 
            tripId={activeTrip.id}
            tripName={activeTrip.name}
          />
          <RouteJourney 
            stops={activeTrip.routeStops}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
          />
          <StoryTimeline 
            items={activeTrip.timelineItems}
            tripId={activeTrip.id}
          />
          <ExperienceCards 
            experienceMoments={activeTrip.experienceMoments}
          />
          <Inclusions 
            inclusions={activeTrip.inclusions}
            exclusions={activeTrip.exclusions}
          />
          <Checklist 
            packingChecklist={activeTrip.packingChecklist}
            tripId={activeTrip.id}
          />
          <TermsAccordion 
            termsAccordion={activeTrip.termsAccordion}
            tripName={activeTrip.name}
          />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking(activeTrip.id)}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
            price={activeTrip.price}
            bgImage={activeTrip.heroImage}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* 3. 2ND LAYOUT (HOLIDAY PACKAGE STYLE): For Andaman, Goa, Nepal, Kerala, Bhutan, and Sikkim */}
      {isAndamanView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <AndamanPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {isGoaView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <GoaPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {isNepalView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <NepalPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {isKeralaView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <KeralaPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {isBhutanView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <BhutanPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {isSikkimView && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <SikkimPackagePage 
            packageId={currentView}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        </div>
      )}

      {/* Render Standalone Trips Catalogue Page */}
      {currentView === "trips" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <TripsShowcase 
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("andaman-dream-4d3n")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹12,350"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Expedition Captains Team Page */}
      {currentView === "team" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <TeamPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("andaman-dream-4d3n")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹12,350"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render About Us Origin Story Page */}
      {currentView === "about" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <AboutPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("andaman-dream-4d3n")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹12,350"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Contact Us Page */}
      {currentView === "contact" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <ContactPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("andaman-dream-4d3n")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹12,350"
            bgImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Book Now page */}
      {currentView === "book-now" && (
        <BookNowPage 
          onNavigate={handleNavigate} 
          initialTripId={selectedTripIdForBooking} 
        />
      )}

      {/* Render Customer Account Dashboard Hub (Bookings, Wishlist, Wallet/Coins, Profile/Travel ID, Support) */}
      {currentView.startsWith("customer-dashboard") && (
        <div className="animate-[fadeIn_0.4s_ease-out]">
          <CustomerDashboard 
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            initialTab={
              currentView === "customer-dashboard-wallet" ? "wallet" :
              currentView === "customer-dashboard-profile" ? "profile" :
              currentView === "customer-dashboard-wishlist" ? "wishlist" :
              currentView === "customer-dashboard-support" ? "support" : "bookings"
            }
          />
        </div>
      )}

      {/* Floating securing ticket booking form modal */}
      {currentView !== "admin-login" && currentView !== "admin-dashboard" && (
        <BookingForm 
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          selectedTripId={selectedTripIdForBooking}
          onNavigateToDashboard={() => handleNavigate("customer-dashboard")}
        />
      )}

      {/* Global Customer Auth Modal (Login / Sign Up / Quick Switch) */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        customMessage={authModalReason}
        onLoginSuccess={() => showToast("Signed in successfully! Welcome to TRAVO.", "success")}
      />

      {/* Render Admin Login View */}
      {currentView === "admin-login" && (
        <AdminLogin 
          onLoginSuccess={() => handleNavigate("admin-dashboard")}
          onCancel={() => handleNavigate("home")}
          onToast={showToast}
        />
      )}

      {/* Render Admin Business Dashboard Shell */}
      {currentView === "admin-dashboard" && (
        <DashboardLayout 
          onLogout={() => handleNavigate("home")}
          onToast={showToast}
        />
      )}

      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 p-4 bg-neutral-900 border border-white/10 text-white rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm animate-bounce text-left">
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-brand-sand shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          
          <div className="text-xs">
            <p className="font-bold uppercase tracking-wider text-[10px] text-gray-400">System Notification</p>
            <p className="font-medium text-white/95 mt-0.5 leading-snug">{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
