import React, { useEffect, useState } from "react";
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
import { PUBLISHED_CATALOGUE_TRIPS } from "./catalogueTrips";
import { Flame, Compass, Calendar, Timer, ArrowRight, ShieldCheck, Star, Users, MapPin, Sparkles } from "lucide-react";

export type AppView = "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact";

const VIEW_PATHS: Record<AppView, string> = {
  home: "/",
  trips: "/trips",
  manali: "/trips/manali",
  "valley-of-flowers": "/trips/valley-of-flowers",
  "book-now": "/book-now",
  team: "/team",
  about: "/about-us",
  contact: "/contact-us",
};

const VIEW_TITLES: Record<AppView, string> = {
  home: "TRAVO | Curated Group Journeys",
  trips: "Trips | TRAVO",
  manali: "Manali Kasol Escape | TRAVO",
  "valley-of-flowers": "Valley of Flowers | TRAVO",
  "book-now": "Book Your Journey | TRAVO",
  team: "Our Team | TRAVO",
  about: "About Us | TRAVO",
  contact: "Contact Us | TRAVO",
};

const FOOTER_BG_IMAGE = "https://unsplash.com/photos/dgyl6znQ3Q4/download?force=true&w=1800";

const normalizePath = (pathname: string) => {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
};

const getViewFromPath = (pathname: string): AppView => {
  const normalizedPath = normalizePath(pathname);
  const matchingView = (Object.keys(VIEW_PATHS) as AppView[]).find(
    (view) => VIEW_PATHS[view] === normalizedPath,
  );

  return matchingView || "home";
};

const getBookingTripFromUrl = () => {
  return new URLSearchParams(window.location.search).get("trip") || "manali";
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => getViewFromPath(window.location.pathname));
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTripIdForBooking, setSelectedTripIdForBooking] = useState<string>(() => getBookingTripFromUrl());

  useEffect(() => {
    const syncViewWithUrl = () => {
      const nextView = getViewFromPath(window.location.pathname);
      setCurrentView(nextView);

      if (nextView === "book-now") {
        setSelectedTripIdForBooking(getBookingTripFromUrl());
      }

      window.scrollTo({ top: 0, behavior: "instant" });
    };

    const normalizedPath = normalizePath(window.location.pathname);
    const isKnownPath = Object.values(VIEW_PATHS).includes(normalizedPath);

    if (!isKnownPath) {
      window.history.replaceState({ view: "home" }, "", VIEW_PATHS.home);
      setCurrentView("home");
    }

    window.addEventListener("popstate", syncViewWithUrl);
    return () => window.removeEventListener("popstate", syncViewWithUrl);
  }, []);

  useEffect(() => {
    document.title = VIEW_TITLES[currentView];
  }, [currentView]);

  const handleOpenBooking = (tripId: string) => {
    const selectedTripId = tripId || "manali";
    const bookingUrl = `${VIEW_PATHS["book-now"]}?trip=${encodeURIComponent(selectedTripId)}`;

    setSelectedTripIdForBooking(selectedTripId);
    window.history.pushState({ view: "book-now", tripId: selectedTripId }, "", bookingUrl);
    setCurrentView("book-now");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleNavigate = (view: AppView) => {
    const targetPath = VIEW_PATHS[view];

    if (`${window.location.pathname}${window.location.search}` !== targetPath) {
      window.history.pushState({ view }, "", targetPath);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleExploreClick = () => {
    const target = document.getElementById("explore-expeditions") || document.getElementById("chapter-intro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeTrip = ["manali", "valley-of-flowers"].includes(currentView) ? (TRIPS_DATA as any)[currentView] : null;
  const bookingTrip = TRIPS_DATA[selectedTripIdForBooking]
    || PUBLISHED_CATALOGUE_TRIPS.find((trip) => trip.id === selectedTripIdForBooking)
    || TRIPS_DATA["manali"];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-brand-sand/30 selection:text-brand-charcoal antialiased overflow-x-hidden">
      
      {/* 1. Universal Cinematic Hero Section / Carousel */}
      <HeroSection
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={(tripId) => handleOpenBooking(tripId)}
        onExploreClick={handleExploreClick}
      />

      {/* Render Homepage Content */}
      {currentView === "home" && (
        <div className="animate-[fadeIn_0.6s_ease-out]">
          
          {/* A. Active Expeditions Catalogue */}
          <div id="explore-expeditions" className="scroll-mt-20">
            <TripsShowcase 
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
              isHomePage={true}
            />
          </div>

          {/* B. The TRAVO Trust Promise (Why Travelers Choose Us) */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white relative overflow-hidden text-neutral-900 border-b border-neutral-200">
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

          {/* C. Upcoming Trips Calendar Section */}
          <UpcomingCalendar 
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />

          {/* D. TRAVO Philosophy Story Intro (General Mode) */}
          <StoryIntro tripId="general" />

          {/* E. Interactive Cinematic Gallery Section */}
          <GallerySection />

          {/* D. Shared General Footer CTA */}
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="₹9,999"
            bgImage={FOOTER_BG_IMAGE}
            isHomeView={true}
            onNavigate={handleNavigate}
          />

        </div>
      )}

      {/* Render Trip-Specific Detail Pages */}
      {currentView !== "home" && activeTrip && (
        <div className="animate-[fadeIn_0.5s_ease-out]">

          {/* A. Interactive Road Route Map with traveling van */}
          <RouteJourney 
            stops={activeTrip.routeStops}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
          />

          {/* B. Day-Wise Story Timeline Serpentine road */}
          <StoryTimeline 
            items={activeTrip.timelineItems}
            tripId={activeTrip.id}
          />

          {/* C. Bento Moments Highlights panel */}
          <ExperienceCards 
            experienceMoments={activeTrip.experienceMoments}
          />

          {/* D. Inclusions and Exclusions panel */}
          <Inclusions 
            inclusions={activeTrip.inclusions}
            exclusions={activeTrip.exclusions}
          />

          {/* E. Packing Checklist interactive widget */}
          <Checklist 
            packingChecklist={activeTrip.packingChecklist}
            tripId={activeTrip.id}
          />

          {/* F. Accordions FAQs travel charter */}
          <TermsAccordion 
            termsAccordion={activeTrip.termsAccordion}
            tripName={activeTrip.name}
          />

          {/* G. Specific trip footer starlit camp CTA */}
          <FooterCTA 
            onOpenBooking={() => handleOpenBooking(activeTrip.id)}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
            price={activeTrip.price}
            bgImage={FOOTER_BG_IMAGE}
            showMobileBookingBar={true}
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
            bgImage={FOOTER_BG_IMAGE}
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
            bgImage={FOOTER_BG_IMAGE}
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
            bgImage={FOOTER_BG_IMAGE}
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
            bgImage={FOOTER_BG_IMAGE}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Render Book Now page */}
      {currentView === "book-now" && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <BookNowPage
            onNavigate={handleNavigate}
            initialTripId={selectedTripIdForBooking}
          />
          <FooterCTA
            onOpenBooking={() => handleOpenBooking(bookingTrip.id)}
            tripId={bookingTrip.id}
            tripName={bookingTrip.name}
            price={bookingTrip.price}
            bgImage={FOOTER_BG_IMAGE}
            onNavigate={handleNavigate}
          />
        </div>
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
