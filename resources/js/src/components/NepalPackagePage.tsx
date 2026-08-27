import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NEPAL_PACKAGES,
  NepalPackage,
  NepalHotelTier,
  NEPAL_VEHICLE_DETAILS
} from "../data/nepalPackages";
import {
  Compass, Calendar, Timer, MapPin, Users, Hotel,
  Check, X, ArrowRight, ArrowLeft, Star,
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldCheck, Award, FileText, Info, Building2, Sun, Sunset, Car, Utensils, Mountain, Plane
} from "lucide-react";
import { BookingPrefill } from "../types";
import SiteHeader from "./SiteHeader";
import { applyMarkup } from "../pricing";

interface NepalPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (trip: string, prefill?: BookingPrefill) => void;
}

export default function NepalPackagePage({ packageId, onNavigate, onOpenBooking }: NepalPackagePageProps) {
  // Find current package or default to first
  const pkg: NepalPackage = useMemo(() => {
    return NEPAL_PACKAGES.find((p) => p.id === packageId) || NEPAL_PACKAGES[0];
  }, [packageId]);

  // Interactive Calculator State
  const [selectedTierId, setSelectedTierId] = useState<string>(pkg.hotelTiers[0].tierId);
  const [adultCount, setAdultCount] = useState<number>(4); // Default 4 adults
  const [includeEverestFlight, setIncludeEverestFlight] = useState<boolean>(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Expand Day 1 by default
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  // Derive slab from adultCount
  const selectedPaxSlab = useMemo<"2-3 PAX" | "4-5 PAX" | "10-12 PAX" | "17-20 PAX" | "26-30 PAX">(() => {
    if (adultCount <= 3) return "2-3 PAX";
    if (adultCount <= 5) return "4-5 PAX";
    if (adultCount <= 12) return "10-12 PAX";
    if (adultCount <= 20) return "17-20 PAX";
    return "26-30 PAX";
  }, [adultCount]);

  // Active Category
  const activeTier: NepalHotelTier = useMemo(() => {
    return pkg.hotelTiers.find((t) => t.tierId === selectedTierId) || pkg.hotelTiers[0];
  }, [pkg, selectedTierId]);

  // Pricing Calculation
  const perPersonBaseRate = useMemo(() => {
    const slabData = activeTier.pricingByPax.find((p) => p.paxSlab === selectedPaxSlab);
    const rawRate = slabData ? slabData.pricePerPerson : activeTier.pricingByPax[0].pricePerPerson;
    return applyMarkup(rawRate, pkg.id);
  }, [activeTier, selectedPaxSlab, pkg.id]);

  const everestFlightCostPerPerson = pkg.optionalEverestFlight && includeEverestFlight ? pkg.optionalEverestFlight.costInr : 0;
  const perPersonTotal = perPersonBaseRate + everestFlightCostPerPerson;
  const grandTotal = perPersonTotal * adultCount;

  // Selected Vehicle
  const allocatedVehicle = useMemo(() => {
    if (adultCount <= 3) return NEPAL_VEHICLE_DETAILS[0];
    if (adultCount <= 5) return NEPAL_VEHICLE_DETAILS[1];
    if (adultCount <= 12) return NEPAL_VEHICLE_DETAILS[2];
    if (adultCount <= 20) return NEPAL_VEHICLE_DETAILS[3];
    return NEPAL_VEHICLE_DETAILS[4];
  }, [adultCount]);

  // Gallery Photos for Nepal
  const GALLERY_PHOTOS = [
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", title: "Kathmandu Durbar Square & Ancient Pagodas" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Phewa Lake Pokhara with Annapurna Range" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", title: "Sarangkot Himalayan Sunrise & Paragliding" },
    { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", title: "Historic Pashupatinath Temple & Sacred Bagmati" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", title: "Swayambhunath Stupa (Monkey Temple)" },
    { url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop", title: "Nagarkot Panoramic Himalayan Views" }
  ];

  // WhatsApp Quote
  const handleWhatsAppQuote = () => {
    const message = `Hello TRAVO Nepal Travel Desk! I am interested in booking:
🇳🇵 Tour: ${pkg.title} (${pkg.duration})
🏨 Hotel Tier: ${activeTier.categoryName} (${activeTier.hotels.join(", ")})
👥 Group Size: ${adultCount} Travelers (Slab: ${selectedPaxSlab})
🚗 Vehicle: ${allocatedVehicle.vehicleName}
✈️ Optional Everest Flight: ${includeEverestFlight ? "Yes (Included)" : "No"}
💰 Estimated Rate: ₹${perPersonTotal.toLocaleString("en-IN")} / person (Total: ₹${grandTotal.toLocaleString("en-IN")})

Please share availability and booking confirmation details.`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBookNow = () => {
    onOpenBooking(pkg.id, { paxCount: adultCount, starRating: parseInt(selectedTierId, 10) || undefined });
  };

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
              <ShieldCheck className="w-3 h-3 inline mr-1" /> Verified Himalayan Expedition
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
            {pkg.subtitle} — {pkg.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-amber-200 font-medium border-t border-white/10">
            <span className="flex items-center gap-1.5"><Plane className="w-4 h-4 text-emerald-400" /> Daily Flight Connections (KTM)</span>
            <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-amber-400" /> Private AC Dedicated Vehicle ({allocatedVehicle.vehicleName.split("(")[0].trim()})</span>
            <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-sky-400" /> Daily Breakfast Included</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-300" /> Dedicated Nepal Concierge Desk</span>
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
                    Day-Wise Itinerary & Sightseeing
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
                Explore the daily flow of your Nepal Himalayan journey from airport arrival at Kathmandu (KTM) to ancient UNESCO shrines, Pokhara lakes & Himalayan mountain viewpoints.
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
                            {pkg.destinationsCovered[(day.day - 1) % pkg.destinationsCovered.length] || "Nepal Himalayas"}
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
                            Scheduled Highlights & Experiences:
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
                              <span><strong>Stay:</strong> {activeTier.categoryName}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> Breakfast Included (CP)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Car className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Cab:</strong> Private Dedicated AC</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Nepal Travel & Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Nepal Himalayan Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">🧥 Mountain Wear & Footwear</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Warm fleece jacket / windbreaker for Sarangkot & Nagarkot</li>
                    <li>• Comfortable walking shoes / lightweight trainers for temple trails</li>
                    <li>• UV sunglasses & wide brim sun hat</li>
                    <li>• Breathable cotton layers for daytime temple walks</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">📄 Documents & Health</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Valid Original Passport / Voter ID (Indian Nationals)</li>
                    <li>• INR currency notes (₹100 & ₹500 denominations accepted)</li>
                    <li>• Motion sickness medication for hilly highway drives</li>
                    <li>• Universal power adapter & 10,000mAh+ power bank</li>
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

              {/* STEP 1: Select Adult Travelers via Dropdown */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label htmlFor="nepal-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{adultCount} {adultCount === 1 ? 'Adult' : 'Adults'} ({selectedPaxSlab})</span>
                </label>

                <select
                  id="nepal-pax-select"
                  value={adultCount}
                  onChange={(e) => setAdultCount(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm"
                >
                  <option value={1}>1 Pax (Solo Traveler — 2-3 PAX Base Slab: ₹{applyMarkup(activeTier.pricingByPax[0]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")})</option>
                  <option value={2}>2 Pax (2 Adults Double Sharing — ₹{applyMarkup(activeTier.pricingByPax[0]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={3}>3 Pax (3 Adults Triple Sharing — ₹{applyMarkup(activeTier.pricingByPax[0]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={4}>4 Pax (4 Adults / Scorpio AC — ₹{applyMarkup(activeTier.pricingByPax[1]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={5}>5 Pax (5 Adults / Scorpio AC — ₹{applyMarkup(activeTier.pricingByPax[1]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={6}>6 Pax (6 Adults Group / Hiace AC Van — ₹{applyMarkup(activeTier.pricingByPax[2]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={8}>8 Pax (8 Adults Group / Hiace AC Van — ₹{applyMarkup(activeTier.pricingByPax[2]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={10}>10 Pax (10 Adults Group / Hiace AC Van — ₹{applyMarkup(activeTier.pricingByPax[2]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={12}>12 Pax (12 Adults Group / Hiace AC Van — ₹{applyMarkup(activeTier.pricingByPax[2]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={15}>15 Pax (15 Adults Group / Coaster AC — ₹{applyMarkup(activeTier.pricingByPax[3]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={20}>20 Pax (20 Adults Group / Coaster AC — ₹{applyMarkup(activeTier.pricingByPax[3]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={25}>25 Pax (25 Adults Large Group / Sutlej Coach — ₹{applyMarkup(activeTier.pricingByPax[4]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                  <option value={30}>30 Pax (30 Adults Large Group / Sutlej Coach — ₹{applyMarkup(activeTier.pricingByPax[4]?.pricePerPerson ?? 0, pkg.id).toLocaleString("en-IN")} / pax)</option>
                </select>
              </div>

              {/* STEP 2: Select Hotel Category Star Tier */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-[#9C753B]" /> 2. Hotel Tier Category:</span>
                  <span className="text-[#9C753B] font-black">{activeTier.categoryName}</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {pkg.hotelTiers.map((tier) => (
                    <button
                      key={tier.tierId}
                      onClick={() => setSelectedTierId(tier.tierId)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedTierId === tier.tierId
                          ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                          : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="text-[9px] font-black uppercase tracking-wider opacity-90 block">{tier.badgeLabel}</span>
                      <p className="text-xs font-bold mt-0.5">{tier.categoryName}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Optional Mount Everest Scenic Flight Addon */}
              {pkg.optionalEverestFlight && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-amber-600" /> Include 1-Hr Everest Scenic Flight (+₹{pkg.optionalEverestFlight.costInr.toLocaleString("en-IN")}/pax)
                    </span>
                    <input 
                      type="checkbox" 
                      checked={includeEverestFlight} 
                      onChange={(e) => setIncludeEverestFlight(e.target.checked)}
                      className="w-4 h-4 accent-[#9C753B] rounded cursor-pointer"
                    />
                  </label>
                  {includeEverestFlight && (
                    <div className="text-[11px] text-amber-800 space-y-1 pt-1 border-t border-amber-200 font-medium">
                      <p className="flex items-center gap-1">🏔️ Guaranteed Window Seat with Everest Cockpit View</p>
                      <p className="flex items-center gap-1">⏰ Early Morning Flight from Kathmandu Airport (06:00 – 07:00 AM)</p>
                      <p className="flex items-center gap-1">📜 Signed Mount Everest Flight Certificate</p>
                    </div>
                  )}
                </div>
              )}

              {/* INCLUDED HOTELS & VEHICLE PREVIEW */}
              <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 border-b border-neutral-200/80 pb-1.5">
                  <span>Included Stay ({activeTier.categoryName})</span>
                  <span className="text-[#9C753B]">Meal Plan: CP (Breakfast)</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {activeTier.hotels.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-700">
                      <span className="font-semibold text-neutral-900">• Property {i + 1}:</span>
                      <span className="text-neutral-600 truncate max-w-[200px]">{h}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-[#9C753B] font-bold">
                    <span>🚗 Allocated Vehicle:</span>
                    <span>{allocatedVehicle.vehicleName}</span>
                  </div>
                </div>
              </div>

              {/* ITEMIZED FARE BREAKDOWN DISPLAY */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-neutral-600 font-medium">Rate Per Adult:</span>
                  <span className="text-2xl font-black text-emerald-700">₹{perPersonTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-emerald-200/80 text-neutral-700">
                  <span className="font-bold">Total Group Fare ({adultCount} Pax):</span>
                  <span className="text-base font-black text-neutral-900">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-neutral-600 font-medium">
                  <span>🏨 {activeTier.categoryName} Stay</span>
                  <span>🚗 Dedicated AC {allocatedVehicle.vehicleName.split(" ")[0]}</span>
                  <span>🍳 Daily Breakfast</span>
                  <span>🛂 State Permits & Driver Allowances</span>
                  {includeEverestFlight && (
                    <span className="col-span-2 text-amber-800 font-bold">✈️ Everest Mountain Flight: ₹{(9000 * adultCount).toLocaleString('en-IN')}</span>
                  )}
                </div>

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  Inclusive of All State Border Taxes, Fuel, Tolls & Daily Breakfast
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleBookNow}
                  className="w-full py-3.5 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Book Package Now <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppQuote}
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
                All Nepal itineraries are fulfilled via our authorized Kathmandu & Pokhara ground concierge network with verified commercial tourist vehicles and licensed local drivers.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Airport Meet & Greet at Kathmandu (KTM)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Vehicle ({allocatedVehicle.vehicleName})</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 Dedicated Nepal Ground Desk</div>
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
                Nepal Destinations Preview
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
              <span>Group: <strong>{adultCount} Adults ({selectedPaxSlab})</strong></span>
              <span>•</span>
              <span>Category: <strong>{activeTier.categoryName}</strong></span>
              {includeEverestFlight && <span>• <strong>Everest Flight Included</strong></span>}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-neutral-900">₹{perPersonTotal.toLocaleString('en-IN')}</span>
              <span className="text-xs text-neutral-500">/ adult (Total Group: ₹{grandTotal.toLocaleString('en-IN')})</span>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full sm:w-auto px-8 py-3 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            Book Package Now <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>

    </div>
  );
}
