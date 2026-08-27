import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Users, Hotel, 
  Check, X, ArrowRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldCheck, Award, FileText, Info, Building2, Sun, Sunset, Car, Utensils, Flame, Mountain
} from "lucide-react";
import { BHUTAN_PACKAGES, BhutanPackage } from "../data/bhutanPackages";

interface BhutanPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (trip: any) => void;
}

export default function BhutanPackagePage({ packageId, onNavigate, onOpenBooking }: BhutanPackagePageProps) {
  const pkg: BhutanPackage = useMemo(() => {
    return BHUTAN_PACKAGES.find(p => p.id === packageId) || BHUTAN_PACKAGES[0];
  }, [packageId]);

  const [selectedPaxCount, setSelectedPaxCount] = useState<number>(4);
  const [selectedDeparture, setSelectedDeparture] = useState<string>(pkg.fixedDepartures[0]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  const perPersonRate = pkg.pricePerPerson;
  const grandTotal = perPersonRate * selectedPaxCount;

  // Gallery Photos for Bhutan
  const GALLERY_PHOTOS = [
    { url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop", title: "Paro Taktsang (Tiger's Nest Monastery)" },
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop", title: "Punakha Dzong & Mo Chhu River" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop", title: "Dochula Pass 108 Chortens & Himalayan Panorama" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", title: "Buddha Dordenma Great Statue (Thimphu)" },
    { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop", title: "Traditional Bhutanese Architecture & Dzongs" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", title: "Phobjikha Valley & Black-Necked Crane Sanctuary" }
  ];

  const handleWhatsAppQuote = () => {
    const message = `Hello TRAVO Bhutan Travel Desk! I am interested in booking:
🇧🇹 Tour: ${pkg.title} (${pkg.duration})
🗓️ Fixed Departure: ${selectedDeparture}
👥 Group: ${selectedPaxCount} Adults
💰 Rate: ₹${perPersonRate.toLocaleString("en-IN")} / person (Total ₹${grandTotal.toLocaleString("en-IN")})
✨ SDF Included: ₹1,200/day per person
🏔️ Key Attraction: Tiger's Nest Monastery & Dochula Pass

Please share seat availability and booking vouchers.`;

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
              AUTHORIZED BHUTAN TOURISM NETWORK
            </span>
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED KINGDOM OF BHUTAN EXPEDITION
            </span>
          </div>

          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            Book Tour <ArrowRight className="w-3.5 h-3.5" />
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
              <ShieldCheck className="w-3 h-3 inline mr-1" /> Authorized Bhutan Tourism Network
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
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SDF (₹1,200/Day) Fully Included</span>
            <span className="flex items-center gap-1.5"><Mountain className="w-4 h-4 text-amber-400" /> Paro Taktsang Tiger's Nest Hike</span>
            <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-sky-400" /> MAP Meal Plan (Breakfast + Dinner)</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-300" /> Certified Bhutanese Guide Included</span>
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
                Follow the spiritual and cultural route across the Land of the Thunder Dragon from Phuentsholing border crossing to Thimphu, Punakha Dzong, and the legendary Tiger's Nest in Paro.
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
                            {pkg.destinationsCovered[(day.day - 1) % pkg.destinationsCovered.length] || "Kingdom of Bhutan"}
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
                              <span><strong>Stay:</strong> 3★ Heritage Resort</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> Breakfast & Dinner (MAP)</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Car className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Cab:</strong> Dedicated Tourist Vehicle</span>
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
                    <Check className="w-4 h-4 text-emerald-600" /> What's Included (100% Tax & SDF Paid)
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

            {/* Bhutan Travel & Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Bhutan Himalayan Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">🧥 Monastery Dress Code & Gear</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Full sleeves shirts & long trousers (mandatory for Dzongs)</li>
                    <li>• Sturdy hiking shoes with grip for Tiger's Nest trek</li>
                    <li>• Warm fleece & windproof jacket for Dochula Pass (3,100m)</li>
                    <li>• Easy slip-on socks (shoes removed at temple shrines)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">📄 Permits & Money</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    <li>• Original Passport with 6-month validity / Voter ID Card</li>
                    <li>• 4 Passport size photographs for entry permit processing</li>
                    <li>• INR currency notes (₹100 & ₹500 denominations widely accepted)</li>
                    <li>• Mandatory Bhutan Travel Insurance (Assisted by TRAVO)</li>
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
                    Bhutan Destinations Preview
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

            {/* Hotel Stays Details Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  ACCOMMODATION DETAILS
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Included 3-Star Heritage Properties
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.hotelDetails.map((h, i) => (
                  <div key={i} className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-[#9C753B]">{h.city} ({h.dayRange})</span>
                      <span className="text-[9px] font-bold text-neutral-600 bg-neutral-200 px-2 py-0.5 rounded-md">{h.mealPlan}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 text-xs">{h.hotel3Star}</h4>
                    <p className="text-[10px] text-neutral-500">{h.rooms} • Standard Deluxe Room</p>
                  </div>
                ))}
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
                  Select group size & departure date for verified Bhutan quotation:
                </p>
              </div>

              {/* STEP 1: Select Adult Travelers via Dropdown */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label htmlFor="bhutan-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{selectedPaxCount} Adults</span>
                </label>

                <select
                  id="bhutan-pax-select"
                  value={selectedPaxCount}
                  onChange={(e) => setSelectedPaxCount(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Adult (Solo)" : "Adults"} — ₹{perPersonRate.toLocaleString("en-IN")} / person (Total: ₹{(perPersonRate * count).toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: Select Fixed Departure Date */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#9C753B]" /> 2. Guaranteed Departure Date:</span>
                  <span className="text-[#9C753B] font-black">{selectedDeparture}</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {pkg.fixedDepartures.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDeparture(date)}
                      className={`p-2.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                        selectedDeparture === date
                          ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                          : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* INCLUDED HOTELS & VEHICLE PREVIEW */}
              <div className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-neutral-800 border-b border-neutral-200/80 pb-1.5">
                  <span>Included 3★ Heritage Resorts</span>
                  <span className="text-[#9C753B]">MAP Plan (Breakfast + Dinner)</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {pkg.hotelDetails.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-neutral-700">
                      <span className="font-semibold text-neutral-900">• {h.city}:</span>
                      <span className="text-neutral-600 truncate max-w-[190px]">{h.hotel3Star}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-[#9C753B] font-bold">
                    <span>🚗 Allocated Vehicle:</span>
                    <span>Dedicated AC Tourist Vehicle</span>
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
                  <span>🏨 3★ Heritage Resorts</span>
                  <span>🛂 Govt SDF (₹1,200/day)</span>
                  <span>🚗 Dedicated AC Chauffeur</span>
                  <span>🍳 Breakfast + Dinner (MAP)</span>
                </div>

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  100% Tax & Bhutan Govt Sustainable Development Fee (SDF) Included
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
                  Authorized Bhutan Tourism Network
                </h4>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                All Bhutan itineraries are executed in full partnership with certified Department of Tourism Bhutan licensed guides and authorized local transport.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Border Permit Assistance (Phuentsholing/Paro)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Bhutanese Guide throughout tour</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 TRAVO Himalayan Desk Support</div>
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
              <span>Departure: <strong>{selectedDeparture}</strong></span>
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
