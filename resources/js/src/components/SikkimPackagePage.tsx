import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Users, Hotel, 
  Check, X, ArrowRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldCheck, Award, FileText, Info, Building2, Sun, Sunset, Car, Utensils, Mountain, CloudSnow
} from "lucide-react";
import { SIKKIM_PACKAGES, SikkimPackage } from "../data/sikkimPackages";
import { BookingPrefill } from "../types";
import SiteHeader from "./SiteHeader";
import { applyMarkup } from "../pricing";

interface SikkimPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (trip: string, prefill?: BookingPrefill) => void;
}

export default function SikkimPackagePage({ packageId, onNavigate, onOpenBooking }: SikkimPackagePageProps) {
  const pkg: SikkimPackage = useMemo(() => {
    return SIKKIM_PACKAGES.find(p => p.id === packageId) || SIKKIM_PACKAGES[0];
  }, [packageId]);

  // Interactive State
  const [selectedTierId, setSelectedTierId] = useState<string>(pkg.hotelTiers[0]?.tierId || "SUPER_DELUXE");
  const [selectedPaxCount, setSelectedPaxCount] = useState<number>(4); // Default 4 adults
  const [isSeasonRate, setIsSeasonRate] = useState<boolean>(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  // Active hotel tier
  const activeTier = useMemo(() => {
    return pkg.hotelTiers.find(t => t.tierId === selectedTierId) || pkg.hotelTiers[0];
  }, [pkg, selectedTierId]);

  // Price calculations
  const paxPricing = useMemo(() => {
    const matched = activeTier.seasonPricing.find(p => p.paxCount === selectedPaxCount) || activeTier.seasonPricing[0];
    return matched;
  }, [activeTier, selectedPaxCount]);

  const perPersonRate = applyMarkup(isSeasonRate ? paxPricing.seasonPerPerson : paxPricing.offSeasonPerPerson, pkg.id);
  const grandTotal = applyMarkup(isSeasonRate ? paxPricing.seasonTotal : paxPricing.offSeasonTotal, pkg.id);

  // Vehicle determined by pax
  const vehicleAssigned = useMemo(() => {
    if (selectedPaxCount === 2) return "Private Wagon R / Alto / Swift (Non-AC Hilly Roads)";
    if (selectedPaxCount === 4) return "Private Sumo / Bolero / Maxx (Hilly Roads)";
    if (selectedPaxCount === 6) return "Private Innova / Xylo / Scorpio";
    return "Private Luxury Innova / 2 Dedicated Vehicles";
  }, [selectedPaxCount]);

  // Gallery Photos for Sikkim & Darjeeling
  const GALLERY_PHOTOS = [
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", title: "Tsomgo Glacial Lake (Changu Lake) & Yak Rides" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Tiger Hill Darjeeling Golden Kanchenjunga Sunrise" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", title: "Rumtek Monastery & Himalayan Prayer Flags" },
    { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", title: "Darjeeling Himalayan Heritage Toy Train & Batasia Loop" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", title: "Gangtok Ropeway & MG Marg Evening Walk" },
    { url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop", title: "Happy Valley Tea Estate & Himalayan Valleys" }
  ];

  const handleWhatsAppQuote = () => {
    const message = `Hello TRAVO Sikkim & Darjeeling Desk! I am interested in booking:
🏔️ Package: ${pkg.title} (${pkg.duration})
🏨 Tier: ${activeTier.categoryName} (${activeTier.badgeLabel})
👥 Travelers: ${selectedPaxCount} Adults
📅 Rate Season: ${isSeasonRate ? "Peak Season Rate" : "Standard / Regular Offer Rate"}
🚗 Vehicle: ${vehicleAssigned}
💰 Rate: ₹${perPersonRate.toLocaleString("en-IN")} / person (Total ₹${grandTotal.toLocaleString("en-IN")})
✨ Inclusions: Breakfast + Dinner Included & Tsomgo Lake Permits

Please check availability and send booking voucher details.`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBookNow = () => {
    onOpenBooking(pkg.id, {
      paxCount: selectedPaxCount,
      sikkimTier: selectedTierId as "SUPER_DELUXE" | "3_STAR",
      sikkimSeason: isSeasonRate ? "season" : "offSeason"
    });
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
              <ShieldCheck className="w-3 h-3 inline mr-1" /> Verified Sikkim Tourism Concierge
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
            <span className="flex items-center gap-1.5"><Mountain className="w-4 h-4 text-emerald-400" /> Tsomgo Glacial Lake & Tiger Hill Sunrise</span>
            <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-amber-400" /> Dedicated Private Mountain Cab</span>
            <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-sky-400" /> Daily Breakfast & Dinner Included</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-300" /> Dedicated Sikkim Concierge Support</span>
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
                Explore the daily mountain route from Bagdogra (IXB) / NJP to Gangtok, the sacred high-altitude Tsomgo Lake & Baba Mandir, and the tea hills of Darjeeling.
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
                            {day.nightStay || "Sikkim"}
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
                              <span><strong>Stay:</strong> {day.nightStay}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> Breakfast & Dinner (MAP)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Car className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Cab:</strong> {vehicleAssigned.split("(")[0]}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Sikkim Travel & Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Sikkim & Darjeeling Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">🧥 Warm Mountain Layers</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Heavy jacket / thermals for Tsomgo Lake (12,400 ft) & Tiger Hill (04:00 AM)</li>
                    <li>• Woolen gloves, beanie caps & warm woolen socks</li>
                    <li>• Sturdy shoes with rubber grip for slippery mountain spots</li>
                    <li>• Lip balm & cold cream for high-altitude wind</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">📄 Mandatory Permits & Health</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Original Voter ID / Passport (Aadhaar not valid for Tsomgo permit)</li>
                    <li>• 4 Passport size photos for protected border permits</li>
                    <li>• Motion sickness medication for curvy winding mountain roads</li>
                    <li>• Thermos flask for hot water on day trips</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Protected Area Permits & Policies */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  PERMITS & GUIDELINES
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Protected Area Permits & Transport Notes
                </h3>
              </div>

              <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1.5 text-xs text-neutral-700">
                <h4 className="font-bold text-neutral-900">🛂 Tsomgo Lake & Baba Mandir Permit Protocol</h4>
                <p className="font-light">Tsomgo Lake and Baba Mandir lie in military border zones. Permits are processed 24 hours prior by Sikkim Police & Tourism Dept using original Voter ID or Passport. Nathula Pass is subject to military permissions on Wed/Thu/Fri/Sat/Sun at additional permit supplement cost.</p>
              </div>

              <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1.5 text-xs text-neutral-700">
                <h4 className="font-bold text-neutral-900">🚗 Hill Transport Regulations</h4>
                <p className="font-light">Vehicles in Sikkim operate point-to-point as per mountain transport syndicate rules. Non-AC mode is standard on hilly terrains for optimal vehicle engine performance.</p>
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
                <label htmlFor="sikkim-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{selectedPaxCount} Adults</span>
                </label>

                <select
                  id="sikkim-pax-select"
                  value={selectedPaxCount}
                  onChange={(e) => setSelectedPaxCount(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm"
                >
                  {activeTier.seasonPricing.map((p) => (
                    <option key={p.paxCount} value={p.paxCount}>
                      {p.paxSlab} — ₹{applyMarkup(isSeasonRate ? p.seasonPerPerson : p.offSeasonPerPerson, pkg.id).toLocaleString("en-IN")} / person
                    </option>
                  ))}
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

              {/* STEP 3: Season Rate Selection Toggle */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                  <span>Travel Season Period:</span>
                  <span className="text-[#9C753B]">{isSeasonRate ? "Peak Season" : "Regular / Off-Season"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsSeasonRate(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      !isSeasonRate 
                        ? "bg-[#9C753B] text-white border-[#9C753B]" 
                        : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Regular / Standard
                  </button>
                  <button
                    onClick={() => setIsSeasonRate(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      isSeasonRate 
                        ? "bg-[#9C753B] text-white border-[#9C753B]" 
                        : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Peak Season (May-Jun)
                  </button>
                </div>
              </div>

              {/* INCLUDED HOTELS & VEHICLE PREVIEW */}
              <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 border-b border-neutral-200/80 pb-1.5">
                  <span>Included Stay ({activeTier.categoryName})</span>
                  <span className="text-[#9C753B]">MAP (Breakfast + Dinner)</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {Object.entries(activeTier.hotelListByCity).map(([city, hotelList], i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-700">
                      <span className="font-semibold text-neutral-900">• {city}:</span>
                      <span className="text-neutral-600 truncate max-w-[190px]">{(hotelList as string[]).join(", ")}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-[#9C753B] font-bold">
                    <span>🚗 Allocated Vehicle:</span>
                    <span>{vehicleAssigned}</span>
                  </div>
                </div>
              </div>

              {/* ITEMIZED FARE BREAKDOWN DISPLAY */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-neutral-600 font-medium">Rate Per Adult:</span>
                  <span className="text-2xl font-black text-emerald-700">₹{perPersonRate.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-emerald-200/80 text-neutral-700">
                  <span className="font-bold">Total Group Fare ({selectedPaxCount} Pax):</span>
                  <span className="text-base font-black text-neutral-900">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-neutral-600 font-medium">
                  <span>🏨 {activeTier.categoryName} Stay</span>
                  <span>🛂 Tsomgo Permit & Entry</span>
                  <span>🚗 Dedicated Mountain Cab</span>
                  <span>🍳 Breakfast + Dinner (MAP)</span>
                </div>

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  Inclusive of All State Border Taxes, Permits, Fuel, Tolls & GST
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
                    <Check className="w-4 h-4 text-emerald-600" /> What's Included (100% Tax Paid)
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
                All Sikkim itineraries are fulfilled via our authorized Gangtok & Darjeeling ground concierge network with verified commercial tourist vehicles and licensed mountain drivers.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Pickup at Bagdogra (IXB) / NJP Station</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Mountain Chauffeur</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 Dedicated Sikkim Concierge Desk</div>
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
                Sikkim & Darjeeling Preview
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
              <span>Group: <strong>{selectedPaxCount} Adults</strong></span>
              <span>•</span>
              <span>Category: <strong>{activeTier.categoryName}</strong></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-neutral-900">₹{perPersonRate.toLocaleString('en-IN')}</span>
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
