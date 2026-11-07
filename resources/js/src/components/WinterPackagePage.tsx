import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass, Calendar, Timer, MapPin, Users, Hotel,
  Check, X, ArrowRight, Sparkles, PhoneCall, ChevronDown, ChevronUp,
  ShieldCheck, Bus, Utensils, Flame, Mountain
} from "lucide-react";
import { WINTER_PACKAGES, WinterPackage } from "../data/winterPackages";
import { BookingPrefill } from "../types";
import SiteHeader from "./SiteHeader";
import { applyMarkup } from "../pricing";

interface WinterPackagePageProps {
  packageId: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (trip: string, prefill?: BookingPrefill) => void;
}

/**
 * Shared page for the daily-departure Winter Edition routes (Chopta–Tungnath and the
 * Manali–Sissu–Kasol circuit). These run at one flat per-person rate with no hotel tiers or
 * group-size slabs, so the fare calculator only needs a group-size selector — everything else
 * follows the same layout as the other package pages.
 */
export default function WinterPackagePage({ packageId, onNavigate, onOpenBooking }: WinterPackagePageProps) {
  const pkg: WinterPackage = useMemo(() => {
    return WINTER_PACKAGES.find(p => p.id === packageId) || WINTER_PACKAGES[0];
  }, [packageId]);

  const [selectedPaxCount, setSelectedPaxCount] = useState<number>(2);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [expandedAll, setExpandedAll] = useState<boolean>(true);

  const perPersonRate = applyMarkup(pkg.pricePerPerson, pkg.id);
  const grandTotal = perPersonRate * selectedPaxCount;

  const handleWhatsAppQuote = () => {
    const message = `Hello TRAVO Travel Desk! I am interested in booking:
🏔️ Tour: ${pkg.title} (${pkg.duration})
🗓️ Departure: ${pkg.departureNote}
📍 Pickup: ${pkg.pickupPoints.map(p => p.city).join(" / ")}
👥 Group: ${selectedPaxCount} ${selectedPaxCount === 1 ? "Adult" : "Adults"}
💰 Rate: ₹${perPersonRate.toLocaleString("en-IN")} / person (Total ₹${grandTotal.toLocaleString("en-IN")})

Please share seat availability and booking details.`;

    window.open(`https://wa.me/919910066742?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleBookNow = () => {
    onOpenBooking(pkg.id, { paxCount: selectedPaxCount });
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
              ❄️ {pkg.badge}
            </span>
            <span className="px-3 py-1 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-600/30">
              <Calendar className="w-3 h-3 inline mr-1" /> {pkg.departureWindow}
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
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Same Price For Everyone</span>
            <span className="flex items-center gap-1.5"><Bus className="w-4 h-4 text-sky-400" /> {pkg.transport}</span>
            <span className="flex items-center gap-1.5"><Utensils className="w-4 h-4 text-emerald-400" /> {pkg.mealPlan}</span>
            <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-rose-400" /> Bonfire Nights Included</span>
          </div>

        </div>
      </section>

      {/* MAIN SPLIT LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ======================================================================= */}
          {/* LEFT COLUMN: TRIP HIGHLIGHTS, DAY-WISE ITINERARY, PACKING & STAYS */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-10">

            {/* Trip Highlights */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  WHAT THIS TRIP COVERS
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Trip Highlights
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.tripHighlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF9F6] border border-neutral-200">
                    <span className="p-1 bg-emerald-100 rounded-full text-emerald-700 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-bold text-neutral-800">{highlight}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-light pt-1">
                {pkg.shortDescription}
              </p>
            </div>

            {/* Header for the itinerary */}
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
                Day 0 is the overnight journey out of {pkg.pickupPoints.map(p => p.city).join(" / ")} — you travel through the night and wake up in the mountains, so the first full day on ground is Day 1.
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
                            {day.locationLabel}
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
                          {day.timingSummary && (
                            <p className="text-[11px] font-bold text-[#9C753B] bg-[#9C753B]/5 border border-[#9C753B]/15 rounded-xl px-3 py-2">
                              {day.timingSummary}
                            </p>
                          )}

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
                              <span><strong>Stay:</strong> {day.day === 0 ? "Overnight Journey" : pkg.stayDetails[Math.min(day.day - 1, pkg.stayDetails.length - 1)]?.place || "As per itinerary"}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Utensils className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Meals:</strong> {day.day === 0 ? "Halts (on own)" : "Breakfast & Dinner"}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                              <Bus className="w-4 h-4 text-[#9C753B]" />
                              <span><strong>Travel:</strong> AC Traveller / Bus</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Packing Checklist */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  TRAVEL PREPARATION
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Winter Packing Checklist
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.packingChecklist.map((group, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                    <h4 className="text-xs font-bold text-neutral-900 uppercase">{group.category}</h4>
                    <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                      {group.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Details Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B]">
                  ACCOMMODATION DETAILS
                </span>
                <h3 className="text-xl font-black font-display uppercase text-neutral-900">
                  Where You'll Stay ({pkg.nights} {pkg.nights === 1 ? "Night" : "Nights"})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.stayDetails.map((stay, i) => (
                  <div key={i} className="p-3.5 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-[#9C753B]">{stay.place} ({stay.dayRange})</span>
                      <span className="text-[9px] font-bold text-neutral-600 bg-neutral-200 px-2 py-0.5 rounded-md">{stay.mealPlan}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 text-xs">{stay.property}</h4>
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
                SPECIAL PRICE
              </div>

              {/* Calculator Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C753B] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#9C753B]" /> REAL-TIME FARE CALCULATOR
                </span>
                <h2 className="text-2xl font-black font-display uppercase text-neutral-900">
                  Same Price For Everyone
                </h2>
                <p className="text-xs text-neutral-500 font-light">
                  One flat rate per person — no group-size slabs, no hotel tier upsell:
                </p>
              </div>

              {/* STEP 1: Select Adult Travelers via Dropdown */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label htmlFor="winter-pax-select" className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9C753B]" /> 1. Adult Travelers (PAX Dropdown):</span>
                  <span className="text-[#9C753B] font-black">{selectedPaxCount} {selectedPaxCount === 1 ? "Adult" : "Adults"}</span>
                </label>

                <select
                  id="winter-pax-select"
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

              {/* STEP 2: Departure Window & Pickup Points */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#9C753B]" /> 2. Departures & Pickup Points:
                </label>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
                  🗓️ {pkg.departureNote}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {pkg.pickupPoints.map((point) => (
                    <div key={point.city} className="p-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                        <MapPin className="w-3.5 h-3.5 text-[#9C753B]" /> {point.city}
                      </span>
                      <span className="text-[10px] text-neutral-500 text-right">{point.detail}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-neutral-500 font-light">
                  * Pick your exact travel date on the next step while booking.
                </p>
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
                  <span>🚌 {pkg.transport.split("(")[0].trim()}</span>
                  <span>🏨 {pkg.nights} Nights Stay</span>
                  <span>🍳 {pkg.mealPlan.split("(")[0].trim()}</span>
                  <span>🧑‍✈️ Trip Captain & 24x7 Help</span>
                </div>

                <p className="text-[10px] text-neutral-500 text-center font-light pt-1">
                  Same price for everyone — no surge for solo or small groups
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
                  <PhoneCall className="w-3.5 h-3.5 text-[#9C753B]" /> Enquire on WhatsApp
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
                  TRAVO Assured Ground Logistics
                </h4>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Every Winter Edition departure runs with a TRAVO Trip Captain on board from pickup to drop, with round-the-clock support through the whole route.
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> {pkg.transport}</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Experienced Trip Captain throughout</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24x7 assistance during the trip</div>
                <div className="flex items-center gap-2"><Mountain className="w-3.5 h-3.5 text-emerald-400" /> Snow-route experienced drivers</div>
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
                {pkg.destinationsCovered.slice(0, 3).join(" • ")} Preview
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {pkg.galleryPhotos.map((photo, index) => (
              <figure
                key={index}
                className="relative h-40 sm:h-72 lg:h-[26rem] rounded-xl sm:rounded-2xl overflow-hidden group border border-neutral-200"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
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

      {/* FIXED STICKY BOTTOM BOOKING BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 p-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

          <div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
              <span>Group: <strong>{selectedPaxCount} {selectedPaxCount === 1 ? "Adult" : "Adults"}</strong></span>
              <span>•</span>
              <span>{pkg.duration}</span>
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
