import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Users, Hotel, Ship, 
  Check, X, ArrowRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldAlert, ShieldCheck, Award, FileText, Info, Camera, Building2, Heart
} from "lucide-react";
import { ANDAMAN_PACKAGES, AndamanPackage, AndamanHotelCategory, buildPricingMap } from "../data/andamanPackages";
import { BookingPrefill } from "../types";
import { applyMarkup } from "../pricing";
import SiteHeader from "./SiteHeader";

interface AndamanPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string, prefill?: BookingPrefill) => void;
}

export default function AndamanPackagePage({ packageId, onNavigate, onOpenBooking }: AndamanPackagePageProps) {
  // Find current package or default to first
  const pkg: AndamanPackage = ANDAMAN_PACKAGES.find(p => p.id === packageId) || ANDAMAN_PACKAGES[0];

  // Interactive Calculator State
  const [selectedPax, setSelectedPax] = useState<number>(4); // Default 4 adults as in quotes
  const [selectedStarRating, setSelectedStarRating] = useState<2 | 3 | 4 | 5>(3); // Default 3★ Deluxe
  const [selectedPlanType, setSelectedPlanType] = useState<"CP" | "MAP">(pkg.planType || "CP");
  const [isHoneymoonSpecial, setIsHoneymoonSpecial] = useState<boolean>(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Expand Day 1 by default
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  // Get pricing for current group size and star tier
  const activeCategory: AndamanHotelCategory = pkg.categories.find(c => c.starRating === selectedStarRating) || pkg.categories[0];
  
  // Dynamic pricing calculation with buildPricingMap
  const computedPricingMap = buildPricingMap(pkg.nightsCount, selectedStarRating, selectedPlanType);
  const pricingObj = computedPricingMap[selectedPax] || activeCategory.pricing[selectedPax] || computedPricingMap[2];

  const honeymoonFee = (selectedPax === 2 && isHoneymoonSpecial) ? 4500 : 0;
  const totalPrice = pricingObj ? applyMarkup(pricingObj.totalPrice, pkg.id) + honeymoonFee : 0;
  const perPersonPrice = selectedPax > 0 ? Math.round(totalPrice / selectedPax) : 0;

  // Carry the customer's current selections over to the Book Now page
  const bookingPrefill: BookingPrefill = {
    paxCount: selectedPax,
    starRating: selectedStarRating,
    planType: selectedPlanType
  };

  // Available pax options (1 to 12 Pax matching official rate sheets)
  const PAX_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  // Gallery Photos for Andaman Islands
  const GALLERY_PHOTOS = [
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", title: "Radhanagar Beach Sunset (Asia's #7 Beach)" },
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", title: "Elephant Beach Snorkeling & Coral Reefs" },
    { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", title: "Historic Cellular Jail National Memorial" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Inter-Island Private Cruise (Nautika / Makruzz)" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", title: "Neil Island Natural Bridge & Coral Beach" },
    { url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop", title: "Chidiya Tapu Sunset Point" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-28">

      {/* HERO BANNER SECTION — the site's own header sits on top of this image, like every other page */}
      <section className="relative bg-neutral-900 text-white min-h-[460px] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[1.2] brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />
        </div>

        <SiteHeader currentView={packageId} onNavigate={onNavigate} variant="transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4 px-6 sm:px-12 pb-6 sm:pb-12 mt-auto">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#9C753B] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
              {pkg.badge}
            </span>
            <span className="px-3 py-1 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-600/30">
              <ShieldCheck className="w-3 h-3 inline mr-1" /> Verified Island Expedition
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
              <Timer className="w-3 h-3 inline mr-1 text-amber-400" /> {pkg.duration}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
              <MapPin className="w-3 h-3 inline mr-1 text-emerald-400" /> {pkg.destinationsCovered.join(" • ")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white max-w-4xl">
            {pkg.title}
          </h1>

          <p className="text-sm text-neutral-200 max-w-2xl font-light leading-relaxed">
            {pkg.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-amber-200 font-medium border-t border-white/10">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Daily Flight Connections (IXZ)</span>
            <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-amber-400" /> Nautika / Makruzz High-Speed Ferries</span>
            <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-sky-400" /> {pkg.planType === "CP" ? "Breakfast Included" : "Breakfast & Dinner Included"} & Private AC Cabs</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-300" /> Dedicated Island Concierge Support</span>
          </div>

        </div>
      </section>

      {/* 3. MAIN SPLIT LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ======================================================================= */}
          {/* LEFT COLUMN: DAY-WISE ITINERARY, INCLUSIONS, PACKING & GALLERY */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header for Left Column */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                    COMPLETE TRIP TIMELINE
                  </span>
                  <h2 className="text-2xl font-black font-display uppercase text-neutral-900 mt-0.5">
                    Day-Wise Itinerary & Activities
                  </h2>
                </div>

                <button 
                  onClick={() => setExpandedAll(!expandedAll)}
                  className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-all"
                >
                  {expandedAll ? "Collapse All Days" : "Expand All Days"}
                </button>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Explore the daily flow of your Andaman getaway from airport arrival at Port Blair (IXZ) to island ferry transfers across Havelock & Neil Island.
              </p>
            </div>

            {/* Day-Wise Cards Timeline */}
            <div className="space-y-4">
              {pkg.itinerary.map((day) => {
                const isExpanded = expandedAll || expandedDay === day.day;

                return (
                  <div 
                    key={day.day}
                    className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:border-[#9C753B]/50 transition-all duration-300"
                  >
                    {/* Day Card Header */}
                    <button
                      onClick={() => {
                        if (expandedAll) setExpandedAll(false);
                        setExpandedDay(isExpanded ? null : day.day);
                      }}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 bg-[#FAF9F6] border-b border-neutral-100 hover:bg-neutral-100/80 transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="px-3 py-2 bg-[#9C753B] text-white font-black text-xs rounded-2xl shadow-md shrink-0 text-center font-mono">
                          <p className="text-[9px] uppercase tracking-wider opacity-80">DAY</p>
                          <p className="text-base font-black leading-tight">{day.day}</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C753B]">
                            {pkg.destinationsCovered[(day.day - 1) % pkg.destinationsCovered.length] || "Andaman Islands"}
                          </span>
                          <h3 className="text-base sm:text-lg font-black font-display uppercase text-neutral-900 leading-tight">
                            {day.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 shrink-0">
                        <span className="hidden sm:inline">{isExpanded ? "Hide Details" : "View Details"}</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-[#9C753B]" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {/* Day Card Expanded Body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-5 sm:p-6 space-y-4 bg-white"
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Scheduled Activities & Experience Highlights:
                          </p>

                          <ul className="space-y-3">
                            {day.activities.map((act, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-xs text-neutral-800 leading-relaxed font-medium">
                                <span className="p-1 bg-emerald-100 rounded-full text-emerald-700 shrink-0 mt-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Day Logistics Footer Bar */}
                          <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-neutral-600 bg-neutral-50 p-3.5 rounded-2xl">
                            <div className="flex items-center gap-2 font-medium">
                              <Hotel className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Stay:</strong> Included Hotel</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> {pkg.planType === "CP" ? "Breakfast Included" : "Breakfast & Dinner"}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Car className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Cab:</strong> Private AC Vehicle</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Beach Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Andaman Island Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">👕 Beachwear & Essentials</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Light cotton clothes & breathable T-shirts</li>
                    <li>• Swimwear, rash guards & water shorts</li>
                    <li>• Sun hat, UV-protection sunglasses & flip-flops</li>
                    <li>• Waterproof pouch for smartphones</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">📄 Documents & Health</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Valid Original Govt Photo ID (Aadhaar/Passport)</li>
                    <li>• High SPF 50+ Sunscreen & Aloe Vera Gel</li>
                    <li>• Motion Sickness tablets for Ferry Cruises</li>
                    <li>• Personal medications & power bank 10,000mAh+</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>


          {/* ======================================================================= */}
          {/* RIGHT COLUMN: REAL-TIME FARE CALCULATOR & BOOKING ACTIONS (STICKY) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Real-Time Fare Calculator Box */}
            <div className="bg-white border-2 border-[#9C753B] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#9C753B] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                INSTANT FARE
              </div>

              {/* Calculator Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#9C753B]" /> REAL-TIME FARE CALCULATOR
                </span>
                <h2 className="text-2xl font-black font-display uppercase text-neutral-900">
                  Custom Pricing Engine
                </h2>
                <p className="text-xs text-neutral-500 font-light">
                  Select group size & hotel star tier for real-time quotation:
                </p>
              </div>

              {/* STEP 0: Package Variant Type Selection */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> Package Category Type:</span>
                  <span className="text-[#9C753B] font-black">{isHoneymoonSpecial ? "Honeymoon / Couple" : "Standard Family/Group"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsHoneymoonSpecial(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      !isHoneymoonSpecial
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                        : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span className="text-[10px] font-bold block">Standard Package</span>
                    <span className="text-[9px] opacity-80 block">For 1 - 12 Passengers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsHoneymoonSpecial(true);
                      setSelectedPax(2);
                      setSelectedPlanType("CP"); // Honeymoon packages are CP Plan only as per rate sheets
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isHoneymoonSpecial
                        ? "bg-rose-900 text-white border-rose-900 shadow-sm"
                        : "bg-rose-50/60 border-rose-200 text-rose-900 hover:bg-rose-100/60"
                    }`}
                  >
                    <span className="text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" /> Honeymoon Special
                    </span>
                    <span className="text-[9px] opacity-80 block">Breakfast Included • Romantic Couple Extras</span>
                  </button>
                </div>
              </div>

              {/* STEP 0.5: Meal Plan Selection (CP vs MAP) */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-[#9C753B]" /> Meal Plan Option:</span>
                  <span className="text-[#9C753B] font-black">{selectedPlanType === "CP" ? "Breakfast Included" : "Breakfast + Dinner Included"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanType("CP")}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedPlanType === "CP"
                        ? "bg-[#9C753B] text-white border-[#9C753B] shadow-sm"
                        : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span className="text-[10px] font-bold block">Breakfast Included</span>
                  </button>

                  <button
                    type="button"
                    disabled={isHoneymoonSpecial}
                    onClick={() => {
                      if (!isHoneymoonSpecial) {
                        setSelectedPlanType("MAP");
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isHoneymoonSpecial
                        ? "opacity-40 cursor-not-allowed bg-neutral-100 border-neutral-200 text-neutral-400"
                        : selectedPlanType === "MAP"
                          ? "bg-[#9C753B] text-white border-[#9C753B] shadow-sm"
                          : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span className="text-[10px] font-bold block">{isHoneymoonSpecial ? "N/A for Honeymoon" : "Breakfast + Dinner Included"}</span>
                  </button>
                </div>
              </div>

              {/* STEP 1: Select Adult Travelers via Dropdown */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label htmlFor="andaman-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{selectedPax} {selectedPax === 1 ? 'Adult' : 'Adults'}</span>
                </label>

                <select
                  id="andaman-pax-select"
                  value={selectedPax}
                  onChange={(e) => {
                    const pax = parseInt(e.target.value, 10);
                    setSelectedPax(pax);
                    if (pax !== 2 && isHoneymoonSpecial) {
                      setIsHoneymoonSpecial(false);
                    }
                  }}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm"
                >
                  <option value={1}>1 Pax (Solo Traveler Private Cab)</option>
                  <option value={2}>2 Pax (Double Sharing Private Tour)</option>
                  <option value={3}>3 Pax (Triple Sharing / 1 Room + Extra Bed)</option>
                  <option value={4}>4 Pax (4 Adults / 2 Double Rooms + Dedicated Cab)</option>
                  <option value={5}>5 Pax (5 Adults / 2 Rooms + Extra Bed)</option>
                  <option value={6}>6 Pax (6 Adults Group Rate / 3 Rooms)</option>
                  <option value={7}>7 Pax (7 Adults / 3 Rooms + Extra Bed)</option>
                  <option value={8}>8 Pax (8 Adults Group / 4 Rooms)</option>
                  <option value={9}>9 Pax (9 Adults / 4 Rooms + Extra Bed)</option>
                  <option value={10}>10 Pax (10 Adults Group / 5 Rooms)</option>
                  <option value={12}>12 Pax (12 Adults Group / 6 Rooms)</option>
                </select>
              </div>

              {/* STEP 2: Select Hotel Category Star Tier */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-[#9C753B]" /> 2. Hotel Tier Category:</span>
                  <span className="text-[#9C753B] font-black">{selectedStarRating}★ {activeCategory.badgeLabel}</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { star: 2, label: "2★ Standard", badge: "BUDGET" },
                    { star: 3, label: "3★ Deluxe", badge: "POPULAR" },
                    { star: 4, label: "4★ Premium", badge: "RECOMMENDED" },
                    { star: 5, label: "5★ Luxury", badge: "LUXURY" }
                  ].map((tier) => (
                    <button
                      key={tier.star}
                      onClick={() => setSelectedStarRating(tier.star as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedStarRating === tier.star
                          ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                          : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="text-[9px] font-black uppercase tracking-wider opacity-90 block">{tier.badge}</span>
                      <p className="text-xs font-bold mt-0.5">{tier.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Honeymoon Special Option (Available for 2 Adults) */}
              {selectedPax === 2 && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" /> Include Honeymoon Inclusions Package (+₹4,500)
                    </span>
                    <input 
                      type="checkbox" 
                      checked={isHoneymoonSpecial} 
                      onChange={(e) => setIsHoneymoonSpecial(e.target.checked)}
                      className="w-4 h-4 accent-[#9C753B] rounded cursor-pointer"
                    />
                  </label>
                  {isHoneymoonSpecial && (
                    <div className="text-[11px] text-amber-800 space-y-1 pt-1 border-t border-amber-200 font-medium">
                      <p className="flex items-center gap-1">🍷 Beachside Romantic Candlelight Dinner</p>
                      <p className="flex items-center gap-1">🌺 Flower Bed Decoration on Arrival Night</p>
                      <p className="flex items-center gap-1">🎂 Honeymoon Cake & Sparkling Drink</p>
                      <p className="flex items-center gap-1">📸 Complimentary Beachside Couples Photography Session</p>
                    </div>
                  )}
                </div>
              )}

              {/* INCLUDED HOTELS LIST PREVIEW */}
              <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 border-b border-neutral-200/80 pb-1.5">
                  <span>Included Stay ({activeCategory.categoryName})</span>
                  <span className="text-[#9C753B]">Ferry: {activeCategory.ferryType}</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {activeCategory.hotels.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-700">
                      <span className="font-semibold text-neutral-900">• {h.location}:</span>
                      <span className="text-neutral-600 truncate max-w-[170px]">{h.hotelName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ITEMIZED FARE BREAKDOWN DISPLAY */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-neutral-600 font-medium">Rate Per Adult:</span>
                  <span className="text-2xl font-black text-emerald-700">₹{perPersonPrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-emerald-200/80 text-neutral-700">
                  <span className="font-bold">Total Group Fare ({selectedPax} Pax):</span>
                  <span className="text-base font-black text-neutral-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>

                {pricingObj && (
                  <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-neutral-600 font-medium">
                    <span>🏨 Hotel: ₹{pricingObj.selectedHotelCost.toLocaleString('en-IN')}</span>
                    <span>🚗 Private Cab: ₹{pricingObj.carCost.toLocaleString('en-IN')}</span>
                    <span>🚢 Ferries: ₹{pricingObj.shipCost.toLocaleString('en-IN')}</span>
                    <span>🎟️ Tickets/Permits: ₹{pricingObj.ticketsCost.toLocaleString('en-IN')}</span>
                    {isHoneymoonSpecial && selectedPax === 2 && (
                      <span className="col-span-2 text-amber-800 font-bold">💍 Honeymoon Extras: ₹4,500</span>
                    )}
                  </div>
                )}

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  Inclusive of All Taxes, AC Cabs, Hotels & High-Speed Cruise Tickets
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onOpenBooking(pkg.id, bookingPrefill)}
                  className="w-full py-3.5 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Book Package Now <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate("contact")}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#9C753B]" /> Request Custom Itinerary Quote
                </button>
              </div>

            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  PACKAGE COVERAGE
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Inclusions & Exclusions
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                  <h4 className="text-xs font-black uppercase text-emerald-800 tracking-wider flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> What's Included
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-700 font-medium">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200/80 space-y-3">
                  <h4 className="text-xs font-black uppercase text-red-800 tracking-wider flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" /> What's Excluded
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-700 font-medium">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* GROUND LOGISTICS GUARANTEE CARD */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 space-y-3 border border-neutral-800 shadow-md">
              <div className="flex items-center gap-2 text-sky-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Verified Ground Logistics
                </h4>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                All Andaman itineraries are fulfilled via our verified island ground concierge network. Drivers, hotel vouchers & ferry tickets carry official concierge confirmation.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Airport Pickup at Port Blair (IXZ)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Pre-booked Nautika / Makruzz Seats</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 Dedicated Island Ground Captain</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Full-width destination gallery */}
      <section className="w-full bg-white border-y border-neutral-200 py-8 sm:py-10 mb-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center border-b border-neutral-200 pb-4">
            <div className="mx-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                VISUAL GALLERY
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-neutral-900">
                Andaman Destinations Preview
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {GALLERY_PHOTOS.map((photo, index) => (
              <figure
                key={index}
                className="relative h-40 sm:h-72 lg:h-[26rem] rounded-xl sm:rounded-2xl overflow-hidden group border border-neutral-200"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent flex items-end p-4">
                  <figcaption className="text-xs text-white font-bold leading-snug">{photo.title}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FIXED STICKY BOTTOM BOOKING BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 p-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
              <span>Group: <strong>{selectedPax} Adults</strong></span>
              <span>•</span>
              <span>Category: <strong>{selectedStarRating}★ {activeCategory.badgeLabel}</strong></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-neutral-900">₹{perPersonPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-neutral-500">/ adult (Total Group: ₹{totalPrice.toLocaleString('en-IN')})</span>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking(pkg.id, bookingPrefill)}
            className="w-full sm:w-auto px-8 py-3 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            Book Package Now <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>

    </div>
  );
}

// Helper inline components for clean icons
function Utensils(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V2" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function Car(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
