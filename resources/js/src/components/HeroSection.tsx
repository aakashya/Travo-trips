import React, { useState, useEffect } from "react";
import { TRIPS_LIST, TRIPS_DATA } from "../data";
import { 
  Compass, Calendar, Timer, Users, ChevronDown,
  ChevronRight, Sparkles, Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  currentView: "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact";
  onNavigate: (view: "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact") => void;
  onOpenBooking: (tripId: string) => void;
  onExploreClick: () => void;
}

const SHARED_HEADER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=1800&auto=format&fit=crop";

export default function HeroSection({
  currentView,
  onNavigate,
  onOpenBooking,
  onExploreClick
}: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const trips = TRIPS_LIST;
  const isSubPage = ["trips", "team", "about", "contact", "book-now"].includes(currentView);
  const currentTrip = (currentView === "home" || isSubPage) ? trips[0] : TRIPS_DATA[currentView];
  const headerImage = isSubPage ? SHARED_HEADER_IMAGE : currentTrip.heroImage;
  const heroHeightClass = isSubPage
    ? "h-[46svh] min-h-[360px] sm:h-[45vh]"
    : currentView === "home"
      ? "h-[100svh] min-h-[520px]"
      : "h-auto min-h-[100svh] lg:h-screen";

  return (
    <section className={`relative w-full overflow-hidden bg-[#FAF9F6] flex flex-col justify-between text-white transition-all duration-700 ${heroHeightClass}`}>
      {currentView === "home" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="/images/hero/travo-hero-mobile-720p.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source
            src="/images/hero/travo-hero-720p.m4v"
            type="video/mp4"
            media="(min-width: 768px) and (max-width: 1023px)"
          />
          <source src="/images/hero/travo-hero.m4v" type="video/mp4" />
        </video>
      ) : (
        <div
          key={currentTrip.id}
          className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-all duration-1000 ease-out saturate-[1.1] brightness-[0.8] contrast-[1.05] animate-[fadeIn_0.8s_ease-out]"
          style={{
            backgroundImage: `url(${headerImage})`,
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.05)`,
          }}
        />
      )}

      <div className={`absolute inset-0 pointer-events-none ${currentView === "home" ? "bg-gradient-to-b from-black/55 via-black/20 to-black/65" : "bg-gradient-to-t from-[#FAF9F6] via-transparent to-black/45"}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,rgba(0,0,0,0.42)_100%)] pointer-events-none" />

      {/* Ambient Starry Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-brand-sand rounded-full animate-[pulse_4s_infinite]" />
        <div className="absolute top-[10%] right-[40%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[50%] left-[30%] w-1 h-1 bg-brand-sand rounded-full animate-pulse" />
      </div>

      {/* Main Top Header Navigation inside section */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between pointer-events-auto">
        <button 
          onClick={() => { setIsMobileMenuOpen(false); onNavigate("home"); }} 
          className="flex items-center group focus:outline-none"
        >
          <div className="h-12 w-32 sm:h-14 sm:w-40 md:w-48 overflow-hidden transition-transform group-hover:scale-105 active:scale-95 flex items-center justify-center">
            <img
              src="/images/logo/travo-logo-white.png"
              alt="TRAVO logo"
              className="h-full w-full scale-125 object-cover object-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
              decoding="async"
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-black tracking-widest text-white drop-shadow-md">
          <button 
            onClick={() => onNavigate("home")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "home" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
          >
            HOME
          </button>
          <button 
            onClick={() => onNavigate("trips")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "trips" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
          >
            TRIPS
          </button>
          <button 
            onClick={() => onNavigate("team")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "team" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
          >
            TEAM
          </button>
          <button 
            onClick={() => onNavigate("about")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "about" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
          >
            ABOUT US
          </button>
          <button 
            onClick={() => onNavigate("contact")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "contact" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
          >
            CONTACT US
          </button>
        </nav>

        {/* Action Button & Mobile Burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenBooking(currentTrip.id || "manali")}
            className="hidden sm:inline-block px-5 py-2.5 text-[10px] uppercase tracking-widest font-black text-white bg-[#9C753B] hover:bg-[#7C552B] transition-all rounded-full hover:scale-105 active:scale-95 shadow"
          >
            Book Now
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-11 h-11 text-white bg-black/30 hover:bg-black/50 rounded-xl border border-white/30 transition-all active:scale-90 flex items-center justify-center"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-[100] min-h-[100dvh] overflow-y-auto bg-[#0B0D11] text-white md:hidden pointer-events-auto"
            aria-label="Mobile navigation"
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#9C753B]/25 blur-3xl" />
              <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-brand-sand/10 blur-3xl" />
            </div>

            <div className="relative min-h-[100dvh] px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onNavigate("home"); }}
                  className="h-12 w-36 overflow-hidden flex items-center justify-center"
                  aria-label="Go to TRAVO home"
                >
                  <img
                    src="/images/logo/travo-logo-white.png"
                    alt="TRAVO logo"
                    className="h-full w-full scale-125 object-cover object-center"
                  />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center active:scale-90 transition-transform"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center py-8">
                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] font-black text-brand-sand">Explore TRAVO</p>
                <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                    { name: "Home", detail: "Start your journey", view: "home" },
                    { name: "Trips", detail: "Browse departures", view: "trips" },
                    { name: "Team", detail: "Meet the people", view: "team" },
                    { name: "About Us", detail: "Read our story", view: "about" },
                    { name: "Contact Us", detail: "Talk to our team", view: "contact" }
                  ].map((item, index) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(item.view as any);
                  }}
                      className={`w-full min-h-16 py-3 flex items-center justify-between gap-4 text-left transition-colors ${
                    currentView === item.view ? "text-brand-sand" : "text-white hover:text-brand-sand"
                  }`}
                >
                      <span className="flex items-center gap-4 min-w-0">
                        <span className="text-[10px] font-mono text-white/35">0{index + 1}</span>
                        <span>
                          <span className="block text-2xl font-black uppercase tracking-tight font-display leading-none">{item.name}</span>
                          <span className="block mt-1 text-[10px] uppercase tracking-widest text-white/45">{item.detail}</span>
                        </span>
                      </span>
                  <ChevronRight className="w-5 h-5 shrink-0 text-brand-sand" />
                </button>
              ))}

                </div>
              </div>

              <div className="space-y-4 pt-5 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking("manali");
                }}
                  className="w-full min-h-14 py-4 text-center bg-[#9C753B] text-white font-black uppercase text-xs tracking-[0.18em] rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                  Book Your Journey
              </button>
                <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-wider text-white/45">
                  <a href="tel:+919996965697" className="py-2">+91 9996965697</a>
                  <a href="mailto:expeditions@travotrips.com" className="py-2">Email Us</a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Center Body & Glassmorphism Booking Card */}
      {currentView === "home" ? (
        <div className="relative z-10 flex w-full flex-grow items-center justify-center px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10 text-center">
          <div className="max-w-4xl animate-[fadeIn_0.8s_ease-out]">
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-4xl lg:text-5xl">
              <span className="block">Go beyond the map.</span>
              <span className="block text-brand-sand">Come home with a story.</span>
            </h1>
          </div>
        </div>
      ) : isSubPage ? (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4 my-auto py-8 sm:py-12 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-[10px] font-black uppercase tracking-widest text-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-sand animate-pulse" /> 
            {currentView === "trips" && "Active Group Journeys"}
            {currentView === "team" && "Founder-Led Journeys"}
            {currentView === "about" && "Founded by Backpackers"}
            {currentView === "contact" && "24/7 Dispatch Center"}
            {currentView === "book-now" && "Secure Your Journey"}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase font-display drop-shadow-xl text-white">
            {currentView === "trips" && "Expedition Catalogue"}
            {currentView === "team" && "Meet The Team"}
            {currentView === "about" && "The TRAVO Story"}
            {currentView === "contact" && "Get in Touch"}
            {currentView === "book-now" && "Book Your Journey"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed font-light drop-shadow">
            {currentView === "trips" && "Explore our active Manali, Valley of Flowers, and Udaipur small-group journeys."}
            {currentView === "team" && "Meet the people bringing together vision, operations, and technology to build every TRAVO experience."}
            {currentView === "about" && "How three freezing solo backpackers around a Kasol bonfire decided to build India's most intimate premium road-trip travel club."}
            {currentView === "contact" && "Have questions about our itineraries, group composition, or custom corporate bookings?"}
            {currentView === "book-now" && "Reserve your place on an upcoming TRAVO journey and complete your booking details securely."}
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 flex-grow mb-8 lg:mb-12 my-auto">
          
          {/* Left Side: Dramatic Typography Hero Text */}
          <div className="w-full lg:w-3/5 text-left space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-brand-sand">
              <Sparkles className="w-3.5 h-3.5 text-brand-sand" /> 
              {currentView === "home" ? "ACTIVE HIMALAYAN EXPEDITIONS" : "HIGH-ALTITUDE GROUP BATCH"}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight select-none uppercase font-display drop-shadow-lg text-white">
              {currentTrip.name.split(" ").slice(0, 2).join(" ")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-200">
                {currentTrip.name.split(" ").slice(2).join(" ") || "EXPEDITION"}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-bold text-white border-l-4 border-brand-sand pl-4 py-1 italic drop-shadow-md">
              "{currentTrip.subtitle}"
            </p>

            <p className="text-xs md:text-sm text-gray-100 max-w-lg leading-relaxed font-normal drop-shadow">
              {currentTrip.id === "manali" 
                ? "Snow adventures, Old Manali café hopping, riverside dome camping beside Parvati River, DJ dancing night under star systems, and spiritual hot spring baths."
                : "Explore the UNESCO World Heritage floral meadows, climb to 14,203 ft to the world's highest Gurudwara, pay devotions at Badrinath Temple, and plunge in Tapt Kund hot springs."}
            </p>

            {/* Action buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              {currentView === "home" ? (
                <button
                  onClick={() => onNavigate(currentTrip.id as any)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#9C753B] hover:bg-[#7C552B] text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Full Details</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenBooking(currentTrip.id)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#9C753B] hover:bg-[#7C552B] text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all"
                >
                  Secure Your Seat
                </button>
              )}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-4 border border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Scroll to Story</span>
              </button>
            </div>
          </div>

          {/* Right Side: Floating Frosted Light Glassmorphism Summary Card */}
          <div className="w-full sm:w-4/5 lg:w-[380px] p-[1px] rounded-3xl bg-gradient-to-b from-white/60 via-white/20 to-transparent shadow-2xl backdrop-blur-xl">
            <div className="p-4 sm:p-6 rounded-3xl bg-white/90 text-left space-y-4 sm:space-y-5 border border-white/40">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Trip Specifications
                </span>
                <span className="px-2.5 py-1 rounded text-[9px] font-black bg-[#9C753B]/10 text-[#9C753B] border border-[#9C753B]/30 uppercase animate-pulse">
                  Deluxe Batch
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '25s' }} />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Expedition Highway</p>
                  <p className="text-sm font-extrabold text-neutral-900">
                    {currentTrip.id === "manali" ? "Delhi to Manikaran Loop" : "Delhi to Hemkund Route"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Upcoming Departure</p>
                  <p className="text-sm font-extrabold text-neutral-900">{currentTrip.upcomingDeparture}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Journey Span</p>
                  <p className="text-sm font-extrabold text-neutral-900 font-mono">{currentTrip.duration}</p>
                </div>
              </div>

              {/* Trip Type */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Experience Type</p>
                  <p className="text-sm font-extrabold text-neutral-900">Cozy Group (Age 18-35)</p>
                </div>
              </div>

              {/* Pricing Tag Extra */}
              <div className="bg-brand-sand/10 p-4 rounded-2xl flex justify-between items-center border border-brand-sand/20">
                <div>
                  <p className="text-[9px] text-neutral-500 uppercase font-black">Starting Point Fare</p>
                  <p className="text-lg font-black text-neutral-900">{currentTrip.price} <span className="text-[10px] font-normal text-neutral-500">/ user</span></p>
                </div>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 uppercase">
                  Tolls Incl.
                </span>
              </div>

              {/* Direct CTA */}
              <button
                onClick={() => onOpenBooking(currentTrip.id)}
                className="w-full py-3.5 text-center bg-[#9C753B] hover:bg-[#7C552B] transition-all font-black text-xs uppercase tracking-widest text-white rounded-2xl shadow active:scale-[0.98]"
              >
                Book {currentTrip.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Indicator */}
      {!isSubPage && (
        <div 
          onClick={onExploreClick}
          className="relative z-20 pb-6 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-brand-sand transition-colors animate-bounce"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-200 drop-shadow">
            {currentView === "home" ? "Scroll to explore trips" : "Scroll to unveil story"}
          </span>
          <ChevronDown className="w-4 h-4 text-brand-sand" />
        </div>
      )}
    </section>
  );
}
