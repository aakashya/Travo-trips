import React, { useState, useEffect } from "react";
import { TRIPS_LIST, TRIPS_DATA } from "../data";
import { 
  Compass, Calendar, Timer, Users, ChevronDown, Flame, 
  ChevronLeft, ChevronRight, Sparkles, MapPin, Menu, X 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  currentView: "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact";
  onNavigate: (view: "home" | "manali" | "valley-of-flowers" | "book-now" | "trips" | "team" | "about" | "contact") => void;
  onOpenBooking: (tripId: string) => void;
  onExploreClick: () => void;
}

export default function HeroSection({
  currentView,
  onNavigate,
  onOpenBooking,
  onExploreClick
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // For the homepage and other subpages, we display both trips in a beautiful slider as background
  const trips = TRIPS_LIST;
  const isSubPage = ["trips", "team", "about", "contact"].includes(currentView);
  const currentTrip = (currentView === "home" || isSubPage) ? trips[activeIndex] : TRIPS_DATA[currentView];

  // Auto-slide on homepage
  useEffect(() => {
    if (currentView !== "home") return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trips.length);
    }, 8000); // changes slide every 8s
    return () => clearInterval(interval);
  }, [currentView, trips.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + trips.length) % trips.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % trips.length);
  };

  return (
    <section className={`relative w-full overflow-hidden bg-[#FAF9F6] flex flex-col justify-between text-white transition-all duration-700 ${isSubPage ? 'h-[45vh] min-h-[350px]' : 'h-screen'}`}>
      {/* Background Image with smooth parallax & fade transition */}
      <div 
        key={currentTrip.id}
        className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-all duration-1000 ease-out saturate-[1.1] brightness-[0.8] contrast-[1.05] animate-[fadeIn_0.8s_ease-out]"
        style={{
          backgroundImage: `url(${currentTrip.heroImage})`,
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.05)`,
        }}
      />

      {/* Cinematic Overlays - Lighter, softer gradients for a brighter ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-black/45 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(250,249,246,0.2)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Ambient Starry Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-brand-sand rounded-full animate-[pulse_4s_infinite]" />
        <div className="absolute top-[10%] right-[40%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[50%] left-[30%] w-1 h-1 bg-brand-sand rounded-full animate-pulse" />
      </div>

      {/* Main Top Header Navigation inside section */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-auto">
        <button 
          onClick={() => { setIsMobileMenuOpen(false); onNavigate("home"); }} 
          className="flex items-center group focus:outline-none"
        >
          <div className="h-14 w-36 md:w-44 overflow-hidden rounded-md border border-white/20 bg-brand-sand-light shadow-lg shadow-black/20 transition-transform group-hover:scale-105 active:scale-95 flex items-center justify-center p-1">
            <img
              src="/images/travo-logo.jpeg"
              alt="TRAVO"
              className="h-full w-full object-contain object-center"
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
            className="md:hidden p-2.5 text-white bg-black/25 hover:bg-black/45 rounded-xl border border-white/25 transition-all active:scale-90"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[76px] left-0 right-0 z-40 bg-[#FAF9F6] border-b border-neutral-200 text-neutral-900 shadow-xl overflow-hidden md:hidden flex flex-col pointer-events-auto"
          >
            <div className="px-6 py-6 space-y-4 text-left flex flex-col font-display">
              {[
                { name: "🏠 HOME", view: "home" },
                { name: "🗺️ TRIP CATALOGUE", view: "trips" },
                { name: "🏔️ EXPEDITION TEAM", view: "team" },
                { name: "📖 OUR STORY", view: "about" },
                { name: "📞 CONTACT US", view: "contact" }
              ].map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(item.view as any);
                  }}
                  className={`text-xs uppercase font-black tracking-widest py-3 border-b border-neutral-100 flex items-center justify-between text-left ${
                    currentView === item.view ? "text-[#9C753B]" : "text-neutral-700 hover:text-[#9C753B]"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking("manali");
                }}
                className="w-full py-4 text-center bg-[#9C753B] text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-md mt-2"
              >
                Book Expeditions Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Body & Glassmorphism Booking Card */}
      {isSubPage ? (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-4 my-auto py-12 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-[10px] font-black uppercase tracking-widest text-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-sand animate-pulse" /> 
            {currentView === "trips" && "30+ Active Destinations"}
            {currentView === "team" && "Certified Rescue Captains"}
            {currentView === "about" && "Founded by Backpackers"}
            {currentView === "contact" && "24/7 Dispatch Center"}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase font-display drop-shadow-xl text-white">
            {currentView === "trips" && "Expedition Catalogue"}
            {currentView === "team" && "Meet The Captains"}
            {currentView === "about" && "The TRAVO Story"}
            {currentView === "contact" && "Get in Touch"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed font-light drop-shadow">
            {currentView === "trips" && "From misty tea valleys in Munnar to stark high-altitude deserts in Spiti, explore our hand-curated small-group departure dates."}
            {currentView === "team" && "Meet the NIM-certified mountaineers, wilderness first-responders, and local survival specialists leading your next safe escape."}
            {currentView === "about" && "How three freezing solo backpackers around a Kasol bonfire decided to build India's most intimate premium road-trip travel club."}
            {currentView === "contact" && "Have a question about group composition, custom corporate departures, or road safety? Our coordination team is active 24/7."}
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 flex-grow mb-12 my-auto">
          
          {/* Left Side: Dramatic Typography Hero Text */}
          <div className="w-full lg:w-3/5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-brand-sand">
              <Sparkles className="w-3.5 h-3.5 text-brand-sand" /> 
              {currentView === "home" ? "ACTIVE HIMALAYAN EXPEDITIONS" : "HIGH-ALTITUDE GROUP BATCH"}
            </div>
            
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight select-none uppercase font-display drop-shadow-lg text-white">
              {currentTrip.name.split(" ").slice(0, 2).join(" ")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-200">
                {currentTrip.name.split(" ").slice(2).join(" ") || "EXPEDITION"}
              </span>
            </h1>

            <p className="text-lg md:text-xl font-bold text-white border-l-4 border-brand-sand pl-4 py-1 italic drop-shadow-md">
              "{currentTrip.subtitle}"
            </p>

            <p className="text-xs md:text-sm text-gray-100 max-w-lg leading-relaxed font-normal drop-shadow">
              {currentTrip.id === "manali" 
                ? "Snow adventures, Old Manali café hopping, riverside dome camping beside Parvati River, DJ dancing night under star systems, and spiritual hot spring baths."
                : "Explore the UNESCO World Heritage floral meadows, climb to 14,203 ft to the world's highest Gurudwara, pay devotions at Badrinath Temple, and plunge in Tapt Kund hot springs."}
            </p>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              {currentView === "home" ? (
                <button
                  onClick={() => onNavigate(currentTrip.id as any)}
                  className="px-8 py-4 bg-[#9C753B] hover:bg-[#7C552B] text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Explore Full Details</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenBooking(currentTrip.id)}
                  className="px-8 py-4 bg-[#9C753B] hover:bg-[#7C552B] text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all"
                >
                  Secure Your Seat
                </button>
              )}
              <button
                onClick={onExploreClick}
                className="px-6 py-4 border border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow"
              >
                <span>Scroll to Story</span>
              </button>
            </div>
          </div>

          {/* Right Side: Floating Frosted Light Glassmorphism Summary Card */}
          <div className="w-full sm:w-4/5 lg:w-[380px] p-[1px] rounded-3xl bg-gradient-to-b from-white/60 via-white/20 to-transparent shadow-2xl backdrop-blur-xl">
            <div className="p-6 rounded-3xl bg-white/90 text-left space-y-5 border border-white/40">
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

      {/* Carousel Dots & Controls (Only shown on Home screen) */}
      {currentView === "home" && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full bg-white/20 hover:bg-[#9C753B] border border-white/30 transition-all text-white active:scale-90"
            title="Previous Trip"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {trips.map((trip, idx) => (
              <button
                key={trip.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-8 bg-[#9C753B]" : "w-2.5 bg-white/50 hover:bg-white/85"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-white/20 hover:bg-[#9C753B] border border-white/30 transition-all text-white active:scale-90"
            title="Next Trip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Indicator */}
      {!isSubPage && (
        <div 
          onClick={onExploreClick}
          className="relative z-20 pb-6 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-brand-sand transition-colors animate-bounce"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-200 drop-shadow">
            Scroll to unveil story
          </span>
          <ChevronDown className="w-4 h-4 text-brand-sand" />
        </div>
      )}
    </section>
  );
}
