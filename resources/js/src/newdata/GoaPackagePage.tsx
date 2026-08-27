import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Users, Hotel, 
  Check, X, ArrowRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldCheck, Award, FileText, Info, Building2, Sun, Sunset, Car, Utensils, Waves, Palmtree
} from "lucide-react";
import { GOA_PACKAGES, GoaPackage, GoaHotelCategory } from "../data/goaPackages";

interface GoaPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (trip: any) => void;
}

export default function GoaPackagePage({ packageId, onNavigate, onOpenBooking }: GoaPackagePageProps) {
  const pkg: GoaPackage = useMemo(() => {
    return GOA_PACKAGES.find((p) => p.id === packageId) || GOA_PACKAGES[0];
  }, [packageId]);

  // Interactive State
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const [selectedPaxCount, setSelectedPaxCount] = useState<number>(4);
  const [includeCruiseDinner, setIncludeCruiseDinner] = useState<boolean>(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  // Active Category
  const activeCategory: GoaHotelCategory = useMemo(() => {
    return pkg.categories[selectedCategoryIdx] || pkg.categories[0];
  }, [pkg, selectedCategoryIdx]);

  // Pricing by Pax
  const baseRatePerPerson = useMemo(() => {
    const matched = activeCategory.pricingByPax.find((p) => p.paxMin <= selectedPaxCount) || activeCategory.pricingByPax[0];
    return matched.perPersonPrice;
  }, [activeCategory, selectedPaxCount]);

  const cruiseSupplement = includeCruiseDinner ? 1200 : 0;
  const perPersonTotal = baseRatePerPerson + cruiseSupplement;
  const grandTotal = perPersonTotal * selectedPaxCount;

  // Vehicle determined by pax
  const vehicleAssigned = useMemo(() => {
    if (selectedPaxCount === 2) return "Private AC Sedan (Dzire / Etios)";
    if (selectedPaxCount === 4) return "Private AC Ertiga";
    if (selectedPaxCount === 6) return "Private AC Toyota Innova";
    if (selectedPaxCount <= 12) return "Private AC 12-Seater Tempo Traveller";
    if (selectedPaxCount <= 20) return "Private AC 20-Seater Mini Coach";
    return "Private AC 35-Seater Luxury Coach";
  }, [selectedPaxCount]);

  // Gallery Photos for Goa
  const GALLERY_PHOTOS = [
    { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop", title: "Palolem Beach & Coconut Groves South Goa" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", title: "Anjuna & Vagator Sunset Beach Cliffs" },
    { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", title: "Historic Basilica of Bom Jesus (Old Goa)" },
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", title: "Aguada Portuguese Fortress & Arabian Sea" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Dudhsagar Majestic Multi-Tiered Waterfalls" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", title: "Mandovi River Luxury Sunset Cruise" }
  ];

  const handleWhatsAppQuote = () => {
    const message = `Hello TRAVO Goa Travel Desk! I am interested in booking:
🌴 Tour: ${pkg.title} (${pkg.duration})
🏨 Hotel Tier: ${activeCategory.categoryName} (${activeCategory.hotels.join(", ")})
👥 Travelers: ${selectedPaxCount} Adults
🚗 Vehicle: ${vehicleAssigned}
🚢 Optional Mandovi Cruise: ${includeCruiseDinner ? "Yes (Included)" : "No"}
💰 Rate: ₹${perPersonTotal.toLocaleString("en-IN")} / person (Total ₹${grandTotal.toLocaleString("en-IN")})

Please check availability and send booking confirmation details.`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBookNow = () => {
    onOpenBooking(pkg.id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-28">
      
      {/* 1. TOP NAVIGATION HEADER BAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <button
            onClick={() => onNavigate("trips")}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-[#9C753B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#9C753B]" /> All Packages
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neutral-500 hidden sm:inline-block">
              VERIFIED GOA CONCIERGE NETWORK
            </span>
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED GOA GETAWAY
            </span>
          </div>

          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            Book Package <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </nav>

      {/* 2. HERO BANNER SECTION */}
      <section className="relative bg-neutral-900 text-white min-h-[380px] flex flex-col justify-end p-6 sm:p-12 overflow-hidden">
        <img 
          src={pkg.heroImage} 
          alt={pkg.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[1.2] brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#9C753B] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
              {pkg.badge}
            </span>
            <span className="px-3 py-1 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-600/30">
              <ShieldCheck className="w-3 h-3 inline mr-1" /> 100% Verified Goa Concierge
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
              <Timer className="w-3 h-3 inline mr-1 text-amber-400" /> {pkg.duration}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
              <MapPin className="w-3 h-3 inline mr-1 text-emerald-400" /> North & South Goa
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white max-w-4xl">
            {pkg.title}
          </h1>

          <p className="text-sm text-neutral-200 max-w-2xl font-light leading-relaxed">
            {pkg.subtitle} — {pkg.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-amber-200 font-medium border-t border-white/10">
            <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-emerald-400" /> Airport / Station Pickup Included</span>
            <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-amber-400" /> Private AC Cab for Sightseeing</span>
            <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-sky-400" /> Daily Breakfast at Resort Included</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-300" /> Dedicated 24x7 Goa Concierge</span>
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
                Explore the daily tropical flow of your Goa holiday from Dabolim (GOI) / Mopa (GOX) airport arrival to North Goa fortresses, Baga & Calangute beaches, Old Goa heritage cathedrals, and South Goa sunset spots.
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
                            Goa Coastal Route
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
                              <span><strong>Stay:</strong> {activeCategory.categoryName}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> Daily Breakfast Included</span>
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

            {/* Inclusions & Exclusions */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  PACKAGE COVERAGE
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Inclusions & Exclusions
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
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

                {/* Exclusions */}
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

            {/* Goa Travel & Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Goa Beach & Resort Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">🏖️ Beachwear & Resort Wear</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Lightweight linen shirts, shorts & quick-dry swimwear</li>
                    <li>• Flip-flops for beach shacks & comfortable sneakers for fort walks</li>
                    <li>• UV polarized sunglasses & wide-brim sun hat</li>
                    <li>• Waterproof phone pouch for water sports</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">📄 Documents & Skincare</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Valid Original Govt Photo ID for hotel & club check-ins</li>
                    <li>• SPF 50+ broad-spectrum sunscreen lotion & aloe vera gel</li>
                    <li>• Valid driving license (if planning self-drive scooters)</li>
                    <li>• Personal emergency medications & hydration salts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                    VISUAL GALLERY
                  </span>
                  <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                    Goa Coastal Destinations Preview
                  </h3>
                </div>
                <span className="text-xs text-neutral-500 font-mono font-bold">6 Photos</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GALLERY_PHOTOS.map((photo, index) => (
                  <div key={index} className="relative h-36 rounded-2xl overflow-hidden group border border-neutral-200">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <p className="text-[10px] text-white font-bold line-clamp-2">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goa Policies & Payment Schedule */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  POLICIES & SCHEDULE
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Payment Milestones & Booking Notes
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#9C753B]">1st Advance</span>
                  <p className="text-base font-black text-neutral-900">25%</p>
                  <p className="text-[10px] text-neutral-500">At time of booking confirmation</p>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#9C753B]">2nd Installment</span>
                  <p className="text-base font-black text-neutral-900">25%</p>
                  <p className="text-[10px] text-neutral-500">15 days prior to check-in</p>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#9C753B]">Final Balance</span>
                  <p className="text-base font-black text-neutral-900">50%</p>
                  <p className="text-[10px] text-neutral-500">7 days prior to check-in</p>
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-600 space-y-1 font-light">
                <p className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#9C753B] shrink-0 mt-0.5" />
                  <span>Standard resort check-in is 02:00 PM and check-out is 11:00 AM. Early check-in is subject to room availability.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#9C753B] shrink-0 mt-0.5" />
                  <span>Transfers & sightseeing are provided in private dedicated AC vehicles point-to-point as per schedule.</span>
                </p>
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
                <label htmlFor="goa-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{selectedPaxCount} Adults</span>
                </label>

                <select
                  id="goa-pax-select"
                  value={selectedPaxCount}
                  onChange={(e) => setSelectedPaxCount(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm"
                >
                  {activeCategory.pricingByPax.map((p) => (
                    <option key={p.paxMin} value={p.paxMin}>
                      {p.sharingType} ({p.paxMin}+ Pax) — ₹{p.perPersonPrice.toLocaleString("en-IN")} / person
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: Select Hotel Category Star Tier */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-[#9C753B]" /> 2. Hotel Tier Category:</span>
                  <span className="text-[#9C753B] font-black">{activeCategory.categoryName}</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {pkg.categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategoryIdx(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedCategoryIdx === idx
                          ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                          : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="text-[9px] font-black uppercase tracking-wider opacity-90 block">{cat.badgeLabel}</span>
                      <p className="text-xs font-bold mt-0.5">{cat.categoryName}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Optional Mandovi River Sunset Dinner Cruise Addon */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-amber-600" /> Include Mandovi River Sunset Cruise (+₹1,200/pax)
                  </span>
                  <input 
                    type="checkbox" 
                    checked={includeCruiseDinner} 
                    onChange={(e) => setIncludeCruiseDinner(e.target.checked)}
                    className="w-4 h-4 accent-[#9C753B] rounded cursor-pointer"
                  />
                </label>
                {includeCruiseDinner && (
                  <div className="text-[11px] text-amber-800 space-y-1 pt-1 border-t border-amber-200 font-medium">
                    <p className="flex items-center gap-1">🚢 1-Hour Scenic Sunset Catamaran Cruise</p>
                    <p className="flex items-center gap-1">🎵 Live DJ, Folk Dance Performances & Sightseeing</p>
                  </div>
                )}
              </div>

              {/* INCLUDED HOTELS & VEHICLE PREVIEW */}
              <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 border-b border-neutral-200/80 pb-1.5">
                  <span>Included Stay ({activeCategory.categoryName})</span>
                  <span className="text-[#9C753B]">Daily Breakfast Included</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {activeCategory.hotels.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-700">
                      <span className="font-semibold text-neutral-900">• Property {i + 1}:</span>
                      <span className="text-neutral-600 truncate max-w-[190px]">{h}</span>
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
                  <span className="text-2xl font-black text-emerald-700">₹{perPersonTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-emerald-200/80 text-neutral-700">
                  <span className="font-bold">Total Group Fare ({selectedPaxCount} Pax):</span>
                  <span className="text-base font-black text-neutral-900">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-1.5 text-[10px] text-neutral-600 font-medium">
                  <span>🏨 {activeCategory.categoryName} Stay</span>
                  <span>🚗 Dedicated AC {vehicleAssigned.split(" ")[2] || "Cab"}</span>
                  <span>🍳 Daily Breakfast</span>
                  <span>🛂 Parking, Tolls & GST</span>
                  {includeCruiseDinner && (
                    <span className="col-span-2 text-amber-800 font-bold">🚢 Mandovi Cruise: ₹{(1200 * selectedPaxCount).toLocaleString('en-IN')}</span>
                  )}
                </div>

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  Inclusive of All Tolls, Parking, Fuel, Driver Allowance & GST
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

            {/* GROUND LOGISTICS GUARANTEE CARD */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 space-y-3 border border-neutral-800 shadow-md">
              <div className="flex items-center gap-2 text-sky-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Verified Ground Logistics
                </h4>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                All Goa itineraries are fulfilled via our authorized Goa ground concierge network with verified commercial tourist vehicles and licensed local chauffeurs.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Airport Pickup at Dabolim (GOI) / Mopa (GOX)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated AC Vehicle for All Sightseeing</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 Dedicated Goa Concierge Desk</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. FIXED STICKY BOTTOM BOOKING BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 p-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
              <span>Group: <strong>{selectedPaxCount} Adults</strong></span>
              <span>•</span>
              <span>Category: <strong>{activeCategory.categoryName}</strong></span>
              {includeCruiseDinner && <span>• <strong>Cruise Included</strong></span>}
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
