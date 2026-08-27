import React, { useState, useEffect, useRef } from "react";
import { TRIPS_LIST, TRIPS_DATA } from "../data";
import { 
  Compass, Calendar, Timer, Users, ChevronDown, Flame, 
  ChevronLeft, ChevronRight, Sparkles, MapPin, Menu, X,
  User, Heart, Ticket, Coins, LogOut, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface HeroSectionProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
  onExploreClick: () => void;
}

export default function HeroSection({
  currentView,
  onNavigate,
  onOpenBooking,
  onExploreClick
}: HeroSectionProps) {
  const { user, isLoggedIn, wishlist, logout, openAuthModal } = useCustomerAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  const currentTrip = (currentView === "home" || isSubPage) ? trips[activeIndex] : (TRIPS_DATA[currentView] || trips[0]);

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
          className="flex items-center space-x-2.5 group focus:outline-none"
        >
          {/* Logo with requested brand style */}
          <div className="px-4 py-2 bg-brand-sand text-neutral-900 font-black tracking-[0.18em] text-sm md:text-base rounded-md border border-brand-sand/30 flex items-center justify-center font-display shadow transition-transform group-hover:scale-105 active:scale-95">
            TRAVO
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white font-black font-mono drop-shadow">
            EXPEDITIONS
          </span>
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

        {/* Action Button & User Profile & Mobile Burger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Wishlist Button */}
          <button
            onClick={() => onNavigate("customer-dashboard")}
            className="p-2 sm:px-3 sm:py-2 text-white bg-black/35 hover:bg-black/55 rounded-full border border-white/20 transition-all flex items-center gap-1.5 relative group"
            title="View Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-400' : 'text-white'}`} />
            {wishlist.length > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Customer Auth Profile or Sign In Button */}
          {isLoggedIn && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-black/45 hover:bg-black/65 border border-white/25 rounded-full backdrop-blur-md transition-all active:scale-95 text-left"
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full object-cover border border-[#9C753B]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#9C753B] text-white text-[10px] font-black flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left pr-1">
                  <p className="text-[11px] font-black text-white leading-none line-clamp-1">{user.name.split(" ")[0]}</p>
                  <p className="text-[9px] font-mono text-amber-300 font-bold leading-none mt-0.5">{user.membershipTier.split(" ")[0]}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white text-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 text-left font-sans"
                  >
                    {/* User Header in Dropdown */}
                    <div className="p-4 bg-neutral-900 text-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                          {user.membershipTier}
                        </span>
                        <span className="text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                          <Coins className="w-3 h-3 text-amber-400" />
                          {(user.travoCoins !== undefined ? user.travoCoins : (user.walletBalance || 0)).toLocaleString("en-IN")} Coins
                        </span>
                      </div>
                      <h4 className="text-sm font-black truncate">{user.name}</h4>
                      <p className="text-[11px] text-neutral-400 font-mono truncate">{user.email}</p>
                    </div>

                    {/* Menu Links */}
                    <div className="p-2 space-y-0.5 text-xs font-bold text-neutral-700">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate("customer-dashboard-bookings");
                        }}
                        className="w-full p-2.5 hover:bg-neutral-100 rounded-xl flex items-center justify-between transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Ticket className="w-4 h-4 text-[#9C753B]" />
                          <span>My Bookings</span>
                        </div>
                        <span className="text-[10px] font-black text-neutral-400">View</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate("customer-dashboard-wishlist");
                        }}
                        className="w-full p-2.5 hover:bg-neutral-100 rounded-xl flex items-center justify-between transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>Saved Wishlist</span>
                        </div>
                        <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-black rounded-full">
                          {wishlist.length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate("customer-dashboard-wallet");
                        }}
                        className="w-full p-2.5 hover:bg-neutral-100 rounded-xl flex items-center justify-between transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span>Travo Coins</span>
                        </div>
                        <span className="text-[10px] font-mono font-black text-[#9C753B]">
                          {(user.travoCoins !== undefined ? user.travoCoins : (user.walletBalance || 0)).toLocaleString("en-IN")}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate("customer-dashboard-profile");
                        }}
                        className="w-full p-2.5 hover:bg-neutral-100 rounded-xl flex items-center gap-2.5 transition-colors text-left"
                      >
                        <User className="w-4 h-4 text-neutral-500" />
                        <span>Traveler Profile & ID</span>
                      </button>
                    </div>

                    {/* Sign out item */}
                    <div className="p-2 border-t border-neutral-100">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full p-2 hover:bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-xs font-bold transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("Sign in to manage your bookings and explore expeditions")}
              className="px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-black text-white bg-[#9C753B] hover:bg-[#7C552B] transition-all rounded-full hover:scale-105 active:scale-95 shadow flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Join</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white bg-black/35 hover:bg-black/55 rounded-xl border border-white/25 transition-all active:scale-90"
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
            <div className="px-6 py-6 space-y-3 text-left flex flex-col font-display">
              
              {/* Mobile user banner */}
              {isLoggedIn && user ? (
                <div 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate("customer-dashboard");
                  }}
                  className="p-3.5 bg-neutral-900 text-white rounded-2xl flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#9C753B]" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#9C753B] text-white font-bold flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-black">{user.name}</p>
                      <p className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                        {user.membershipTier} • {(user.travoCoins !== undefined ? user.travoCoins : (user.walletBalance || 0)).toLocaleString("en-IN")} Coins
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#9C753B]">Dashboard ➔</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal("Sign in to access your bookings and travel perks");
                  }}
                  className="w-full py-3 bg-[#9C753B] text-white font-black uppercase text-xs tracking-wider rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Sign In / Create Account
                </button>
              )}

              {[
                { name: "🏠 HOME", view: "home" },
                { name: "🗺️ TRIP CATALOGUE", view: "trips" },
                { name: "🧳 MY BOOKINGS & VOUCHERS", view: "customer-dashboard" },
                { name: "❤️ SAVED WISHLIST", view: "customer-dashboard" },
                { name: "🏔️ EXPEDITION TEAM", view: "team" },
                { name: "📖 OUR STORY", view: "about" },
                { name: "📞 CONTACT US", view: "contact" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(item.view as any);
                  }}
                  className={`text-xs uppercase font-black tracking-widest py-2.5 border-b border-neutral-100 flex items-center justify-between text-left ${
                    currentView === item.view ? "text-[#9C753B]" : "text-neutral-700 hover:text-[#9C753B]"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}
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
              {currentTrip.experienceMoments && currentTrip.experienceMoments.length > 0
                ? currentTrip.experienceMoments.slice(0, 3).map(m => m.title).join(" • ")
                : `${currentTrip.subtitle} — Handcrafted boutique itinerary with private sanitized vehicle transfers, verified star hotels, and dedicated local captain guidance.`}
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
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Expedition Route</p>
                  <p className="text-sm font-extrabold text-neutral-900">
                    {currentTrip.routeStops && currentTrip.routeStops.length > 1
                      ? `${currentTrip.routeStops[0].name} to ${currentTrip.routeStops[currentTrip.routeStops.length - 1].name}`
                      : `${currentTrip.name} Circuit`}
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
