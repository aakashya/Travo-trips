import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronRight, Menu, X,
  User, Heart, Ticket, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import TravoCoinIcon from "./TravoCoinIcon";

// Same shared background used behind the header on Trips/Team/About/Contact.
const SHARED_HEADER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=1800&auto=format&fit=crop";

interface SiteHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  /** "transparent" sits on top of a hero image/video (homepage & trip pages). "solid" is a self-contained dark bar for pages with no hero behind it (e.g. the account dashboard). */
  variant?: "transparent" | "solid";
}

// The one and only site header — used inside HeroSection (transparent, over the hero
// image/video) and standalone on pages with no hero, like the account dashboard (solid).
export default function SiteHeader({ currentView, onNavigate, variant = "transparent" }: SiteHeaderProps) {
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

  const isSolid = variant === "solid";

  return (
    // Its own positioning context, so the mobile dropdown always lands right below
    // the header bar — regardless of whether it's sitting inside a full-height hero
    // (transparent) or standing alone at the top of a flat page (solid). z-40 (not z-30)
    // so this stacking context always paints above page content with its own sticky
    // sub-headers (e.g. the account dashboard's tab bar, also sticky at the top).
    <div className="relative z-40">
      <header
        className={
          isSolid
            ? "sticky top-0 z-40 w-full relative overflow-hidden border-b border-white/10 text-white shadow-xl"
            : "relative w-full pointer-events-auto"
        }
      >
        {isSolid && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${SHARED_HEADER_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md" />
          </>
        )}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 ${isSolid ? "lg:px-8 py-3" : "py-4 sm:py-5"} flex items-center justify-between`}>
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

          {/* Action Buttons, User Profile & Mobile Burger */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Wishlist Button — desktop only; on mobile this lives inside the full-page menu
                instead, where there's room for it (crammed alongside the profile pill and
                hamburger button, it was overflowing off narrower phone screens). */}
            <button
              onClick={() => onNavigate("customer-dashboard-wishlist")}
              className="hidden md:flex p-2 sm:px-3 sm:py-2 text-white bg-black/35 hover:bg-black/55 rounded-full border border-white/20 transition-all items-center gap-1.5 relative group"
              title="View Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-400' : 'text-white'}`} />
              {wishlist.length > 0 && (
                <span className="text-[11px] font-black text-white">{wishlist.length}</span>
              )}
            </button>

            {/* Customer Auth Profile or Sign In Button — desktop only, same reason as above */}
            {isLoggedIn && user ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#9C753B] hover:bg-[#85632f] border border-white/25 rounded-full transition-all active:scale-95 text-left"
                >
                  <User className="w-4 h-4 text-white shrink-0" fill="currentColor" />
                  <div className="hidden sm:block text-left pr-1">
                    <p className="text-[11px] font-black text-white leading-none line-clamp-1">{user.name.split(" ")[0]}</p>
                  </div>
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
                            <TravoCoinIcon className="w-4 h-4" />
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
                className="hidden md:flex px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest font-black text-white bg-[#9C753B] hover:bg-[#7C552B] transition-all rounded-full hover:scale-105 active:scale-95 shadow items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-11 h-11 text-white bg-black/30 hover:bg-black/50 rounded-xl border border-white/30 transition-all active:scale-90 flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — a true full-screen takeover (not a partial-height dropdown), so it fully
          covers everything behind it, including the sticky mobile "Book Now" bar some trip
          pages pin to the bottom of the screen (see FooterCTA's showMobileBookingBar) which
          would otherwise show through underneath a shorter panel. Rendered via a portal straight
          into <body> — this component's own wrapper div below (`relative z-40`) creates a CSS
          stacking context, which would otherwise trap even a high z-index in here to that
          context, letting a same-z-index fixed element elsewhere (like that booking bar) that
          simply comes later in the DOM paint over it regardless of this menu's own z-index. */}
      {createPortal(
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#FAF9F6] text-neutral-900 md:hidden flex flex-col pointer-events-auto"
          >
            {/* Its own top bar — logo + close — so the menu is self-contained regardless of
                what header variant (transparent/solid) is showing underneath. */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onNavigate("home"); }}
                className="flex items-center focus:outline-none"
              >
                <div className="h-9 w-32 flex items-center justify-start">
                  <img
                    src="/images/logo/travo-logo-website.png"
                    alt="TRAVO logo"
                    className="h-full w-full object-contain object-left"
                    decoding="async"
                  />
                </div>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 text-left flex flex-col font-display">

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
                    <div className="w-10 h-10 rounded-full bg-[#9C753B] text-white flex items-center justify-center shrink-0">
                      <User className="w-6 h-6" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-xs font-black">{user.name}</p>
                      <p className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                        <TravoCoinIcon className="w-3 h-3" />
                        {(user.travoCoins !== undefined ? user.travoCoins : (user.walletBalance || 0)).toLocaleString("en-IN")} Coins
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
                    onNavigate(item.view);
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

            {/* Bottom action bar — account access, always reachable without scrolling back up */}
            <div className="shrink-0 px-6 py-4 border-t border-neutral-200 bg-white">
              {isLoggedIn && user ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate("customer-dashboard-profile");
                    }}
                    className="py-3 bg-[#9C753B] text-white font-black uppercase text-[11px] tracking-wider rounded-xl shadow flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" /> My Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="py-3 bg-white border border-red-200 text-red-600 font-black uppercase text-[11px] tracking-wider rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal("Sign in to manage your bookings and explore expeditions");
                  }}
                  className="w-full py-3 bg-[#9C753B] text-white font-black uppercase text-xs tracking-wider rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Login
                </button>
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
