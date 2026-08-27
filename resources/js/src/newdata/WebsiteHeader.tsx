import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, Heart, Ticket, Coins, LogOut, ChevronDown, 
  Menu, X, ChevronRight, User 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface WebsiteHeaderProps {
  currentView?: string;
  onNavigate: (view: string) => void;
  variant?: "transparent" | "dark" | "solid";
  className?: string;
}

export default function WebsiteHeader({
  currentView = "",
  onNavigate,
  variant = "dark",
  className = ""
}: WebsiteHeaderProps) {
  const { user, isLoggedIn, wishlist, logout, openAuthModal } = useCustomerAuth();
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

  const baseStyles = variant === "transparent" 
    ? "relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-auto"
    : "sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl w-full";

  const containerStyles = variant === "transparent"
    ? ""
    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between";

  return (
    <header className={`${baseStyles} ${className}`}>
      <div className={containerStyles || "w-full flex items-center justify-between"}>
        {/* Brand Logo */}
        <button 
          onClick={() => { setIsMobileMenuOpen(false); onNavigate("home"); }} 
          className="flex items-center space-x-2.5 group focus:outline-none text-left"
          id="website-header-logo-btn"
        >
          <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-brand-sand text-neutral-900 font-black tracking-[0.18em] text-sm md:text-base rounded-md border border-brand-sand/30 flex items-center justify-center font-display shadow transition-transform group-hover:scale-105 active:scale-95">
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
            id="nav-link-home"
          >
            HOME
          </button>
          <button 
            onClick={() => onNavigate("trips")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "trips" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
            id="nav-link-trips"
          >
            TRIPS
          </button>
          <button 
            onClick={() => onNavigate("team")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "team" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
            id="nav-link-team"
          >
            TEAM
          </button>
          <button 
            onClick={() => onNavigate("about")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "about" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
            id="nav-link-about"
          >
            ABOUT US
          </button>
          <button 
            onClick={() => onNavigate("contact")}
            className={`hover:text-brand-sand transition-colors py-1 ${currentView === "contact" ? "text-brand-sand border-b-2 border-brand-sand" : ""}`}
            id="nav-link-contact"
          >
            CONTACT US
          </button>
        </nav>

        {/* Action Buttons & User Profile & Mobile Burger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Wishlist Button */}
          <button
            onClick={() => onNavigate("customer-dashboard-wishlist")}
            className="p-2 sm:px-3 sm:py-2 text-white bg-black/35 hover:bg-black/55 rounded-full border border-white/20 transition-all flex items-center gap-1.5 relative group"
            title="View Wishlist"
            id="header-wishlist-btn"
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
                id="header-user-menu-btn"
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
              id="header-sign-in-btn"
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
            id="header-mobile-toggle-btn"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 z-50 bg-[#FAF9F6] border-b border-neutral-200 text-neutral-900 shadow-2xl overflow-hidden md:hidden flex flex-col pointer-events-auto"
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
                { name: "🧳 MY BOOKINGS & VOUCHERS", view: "customer-dashboard-bookings" },
                { name: "❤️ SAVED WISHLIST", view: "customer-dashboard-wishlist" },
                { name: "🪙 TRAVO COINS & WALLET", view: "customer-dashboard-wallet" },
                { name: "👤 TRAVELER PROFILE & ID", view: "customer-dashboard-profile" },
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
    </header>
  );
}
