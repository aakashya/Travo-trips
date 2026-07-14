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
import { TRIPS_DATA, TRIPS_LIST } from "./data";
import { Flame, Compass, Calendar, Timer, ArrowRight, ShieldCheck, Star, Users, MapPin, Sparkles } from "lucide-react";

export type AppView = "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTripIdForBooking, setSelectedTripIdForBooking] = useState<string>("manali");

  const handleOpenBooking = (tripId: string) => {
    setSelectedTripIdForBooking(tripId || "manali");
    setCurrentView("book-now");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleNavigate = (view: AppView) => {
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

  const activeTrip = ["manali", "valley-of-flowers"].includes(currentView) ? (TRIPS_DATA as any)[currentView] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-brand-sand/30 selection:text-brand-charcoal antialiased overflow-x-hidden">
      
      {/* 1. Universal Cinematic Hero Section / Carousel */}
      {currentView !== "book-now" && (
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
          
          {/* A. TRAVO Philosphy Story Intro (General Mode) */}
          <StoryIntro tripId="general" />

          {/* B. Active Expeditions Grid Showcase with 30+ Trips and Categories */}
          <div id="explore-expeditions" className="scroll-mt-20">
            <TripsShowcase 
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
            />
          </div>

          {/* C. The TRAVO Trust Promise (Why Travelers Choose Us) */}
          <section className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden text-neutral-900 border-b border-neutral-200">
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-sand/[0.05] rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white px-3.5 py-1.5 bg-[#9C753B] rounded-full inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" /> THE TRAVO PROMISE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
                  Crafting Premium <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
                    Road-Trip Journeys
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  We don't do mass-market crowded buses. We focus strictly on luxury, intimacy, safety, and pristine group vibes.
                </p>
              </div>

              {/* Pillars grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Curated Group Vibe",
                    desc: "Strict age bracket (18-35). Handpicked co-travelers joining as strangers and returning as a tight-knit family.",
                    icon: <Users className="w-5 h-5 text-[#9C753B]" />
                  },
                  {
                    title: "Comfort On Roads",
                    desc: "Traverse high passes exclusively in sanitized, luxury AC Tempo Travellers with custom audio systems and pushback comfort.",
                    icon: <Compass className="w-5 h-5 text-[#9C753B] animate-spin" style={{ animationDuration: '30s' }} />
                  },
                  {
                    title: "Expert Certified Captains",
                    desc: "Supervised from departure to return by professional, certified captains equipped with first-aid tools and deep local knowledge.",
                    icon: <Star className="w-5 h-5 text-[#9C753B]" />
                  },
                  {
                    title: "100% Honest Budgets",
                    desc: "Absolutely zero surprise taxes or hidden tourist fees en route. All state green taxes, tolls, and driver allowances included.",
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

          {/* D. Shared General Footer CTA */}
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
            bgImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
            isHomeView={true}
            onNavigate={handleNavigate}
          />

        </div>
      )}

      {/* Render Trip-Specific Detail Pages */}
      {currentView !== "home" && activeTrip && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          
          {/* A. Trip Story Philosophy Chapters */}
          <StoryIntro 
            tripId={activeTrip.id}
            tripName={activeTrip.name}
          />

          {/* B. Interactive Road Route Map with traveling van */}
          <RouteJourney 
            stops={activeTrip.routeStops}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
          />

          {/* C. Day-Wise Story Timeline Serpentine road */}
          <StoryTimeline 
            items={activeTrip.timelineItems}
            tripId={activeTrip.id}
          />

          {/* D. Bento Moments Highlights panel */}
          <ExperienceCards 
            experienceMoments={activeTrip.experienceMoments}
          />

          {/* E. Inclusions and Exclusions panel */}
          <Inclusions 
            inclusions={activeTrip.inclusions}
            exclusions={activeTrip.exclusions}
          />

          {/* F. Packing Checklist interactive widget */}
          <Checklist 
            packingChecklist={activeTrip.packingChecklist}
            tripId={activeTrip.id}
          />

          {/* G. Accordions FAQs travel charter */}
          <TermsAccordion 
            termsAccordion={activeTrip.termsAccordion}
            tripName={activeTrip.name}
          />

          {/* H. Specific trip footer starlit camp CTA */}
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

      {/* Render Standalone Trips Catalogue Page */}
      {currentView === "trips" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <TripsShowcase 
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
            bgImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Expedition Captains Team Page */}
      {currentView === "team" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <TeamPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
            bgImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render About Us Origin Story Page */}
      {currentView === "about" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <AboutPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
            bgImage="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop"
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Contact Us Form & FAQ Page */}
      {currentView === "contact" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <ContactPage />
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
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

      {/* Floating securing ticket booking form */}
      <BookingForm 
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedTripId={selectedTripIdForBooking}
      />

    </div>
  );
}
