import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Timer, MapPin, ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { TRIPS_LIST } from "../data";
import { TripDetails } from "../types";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface HomeTripsShowcaseProps {
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
}

const TRIPS_PER_PAGE = 6;

type CountryFilter = "all" | "india" | "bhutan" | "nepal";

function getTripCountry(tripId: string): "india" | "bhutan" | "nepal" {
  if (tripId.startsWith("bhutan-") || tripId === "bhutan") return "bhutan";
  if (tripId.startsWith("nepal-") || tripId === "nepal") return "nepal";
  return "india";
}

const CATEGORIES: { id: CountryFilter; name: string }[] = [
  { id: "all", name: "🌍 All Expeditions" },
  { id: "india", name: "🇮🇳 India" },
  { id: "bhutan", name: "🇧🇹 Bhutan" },
  { id: "nepal", name: "🇳🇵 Nepal" },
];

// Fixed-date, small-batch departures (as opposed to the daily/flexible-departure island & hill packages).
const GROUP_BATCH_TRIP_IDS = ["manali", "valley-of-flowers", "udaipur-lakes"];

interface TripBadge {
  label: string;
  className: string;
}

// One or two top-left badges per card. Andaman is the flagship destination, so it gets both a
// "Hot" and a "Trending" badge; every other destination gets a single badge suited to its vibe.
function getTripBadges(tripId: string): TripBadge[] {
  if (GROUP_BATCH_TRIP_IDS.includes(tripId)) {
    return [{ label: "👥 Group Batch", className: "bg-neutral-900/80" }];
  }
  if (tripId.startsWith("andaman-")) {
    return [
      { label: "🔥 Hot", className: "bg-rose-600/90" },
      { label: "📈 Trending", className: "bg-[#9C753B]/90" },
    ];
  }
  if (tripId.startsWith("goa-")) return [{ label: "🔥 Hot", className: "bg-rose-600/90" }];
  if (tripId.startsWith("nepal-")) return [{ label: "⭐ Popular", className: "bg-[#9C753B]/90" }];
  if (tripId.startsWith("kerala-")) return [{ label: "🌿 Featured", className: "bg-emerald-700/90" }];
  if (tripId.startsWith("bhutan-")) return [{ label: "✨ Exclusive", className: "bg-indigo-700/90" }];
  if (tripId.startsWith("sikkim-")) return [{ label: "📈 Trending", className: "bg-[#9C753B]/90" }];
  if (tripId.startsWith("kashmir-")) return [{ label: "💎 Premium", className: "bg-sky-700/90" }];
  if (tripId.startsWith("leh-") || tripId.startsWith("ladakh-")) return [{ label: "🏔️ Adventurer's Pick", className: "bg-neutral-700/90" }];
  return [];
}

export default function HomeTripsShowcase({ onNavigate, onOpenBooking }: HomeTripsShowcaseProps) {
  const { wishlist, toggleWishlist } = useCustomerAuth();
  const [activeCategory, setActiveCategory] = useState<CountryFilter>("all");
  const [pageIndex, setPageIndex] = useState(0);

  const filteredTrips = useMemo(() => {
    if (activeCategory === "all") return TRIPS_LIST;
    return TRIPS_LIST.filter((trip) => getTripCountry(trip.id) === activeCategory);
  }, [activeCategory]);

  const pageCount = Math.ceil(filteredTrips.length / TRIPS_PER_PAGE);
  const visibleTrips = filteredTrips.slice(pageIndex * TRIPS_PER_PAGE, (pageIndex + 1) * TRIPS_PER_PAGE);

  const handleCategoryChange = (categoryId: CountryFilter) => {
    setActiveCategory(categoryId);
    setPageIndex(0);
  };

  return (
    <section id="all-trips-showcase" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F9F8F6] border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-[#9C753B]/10 border border-[#9C753B]/20 rounded-full inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '40s' }} /> EXPEDITION CATALOGUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
            Discover Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
              Major Destinations
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-xl mx-auto leading-relaxed">
            Explore carefully curated group departures designed for young hearts (Age 18-35), led by experts, and budgeted with full transparency.
          </p>
        </div>

        {/* Country Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-black transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#9C753B] text-white shadow-md shadow-[#9C753B]/20 scale-[1.02]"
                  : "bg-white text-neutral-700 border border-neutral-200 shadow-sm hover:border-[#9C753B]/45 hover:bg-[#FFFDF9] hover:shadow-md"
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Trips Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleTrips.map((trip: TripDetails) => {
              const startPoint = trip.routeStops?.[0]?.name || trip.name;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={trip.id}
                  className="group bg-white rounded-[32px] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#9C753B]/20 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Visual Cover Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={trip.bannerImage || trip.heroImage}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Top Left Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5">
                      {getTripBadges(trip.id).map((badge) => (
                        <span
                          key={badge.label}
                          className={`px-2.5 py-1 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(trip.id); }}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-rose-500 transition-all duration-300"
                      title={wishlist.includes(trip.id) ? "Saved in Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(trip.id) ? "fill-rose-500 text-rose-500" : "fill-current text-white/50 hover:text-rose-500"}`} />
                    </button>
                  </div>

                  {/* Content body */}
                  <div className="p-5 sm:p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#9C753B]">
                        <span>Departing: {trip.upcomingDeparture}</span>
                      </div>

                      <h3 className="text-lg font-black text-neutral-900 uppercase font-display leading-tight group-hover:text-[#9C753B] transition-colors line-clamp-1">
                        {trip.name}
                      </h3>

                      <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                        {trip.subtitle}
                      </p>
                    </div>

                    {/* Quick specs banner */}
                    <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-3 text-[11px] text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-[#9C753B]" />
                        <span className="font-mono font-bold text-neutral-800">{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-[#9C753B] shrink-0" />
                        <span className="truncate">Starts: <strong>{startPoint}</strong></span>
                      </div>
                    </div>

                    {/* CTA Footer Row */}
                    <div className="pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between gap-3 mt-auto">
                      <div>
                        <p className="text-[9px] uppercase text-neutral-400 font-bold leading-none">Starting Fare</p>
                        <p className="text-lg font-black text-neutral-900 font-mono mt-0.5">
                          {trip.price} <span className="text-[9px] font-normal text-neutral-400">/ user</span>
                        </p>
                      </div>

                      <button
                        onClick={() => onNavigate(trip.id)}
                        className="px-4.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] active:scale-95 transition-all rounded-xl inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-3 pt-1" aria-label="Trip pages">
            <button
              type="button"
              onClick={() => setPageIndex((prev) => (prev === 0 ? pageCount - 1 : prev - 1))}
              aria-label="Previous trip page"
              className="p-2 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:border-[#9C753B]/50 hover:text-[#9C753B] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPageIndex(idx)}
                  aria-label={`Show trip page ${idx + 1}`}
                  aria-current={pageIndex === idx ? "page" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    pageIndex === idx
                      ? "w-8 bg-[#9C753B] shadow-sm"
                      : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPageIndex((prev) => (prev === pageCount - 1 ? 0 : prev + 1))}
              aria-label="Next trip page"
              className="p-2 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:border-[#9C753B]/50 hover:text-[#9C753B] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate("trips")}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] active:scale-95 transition-all shadow-md shadow-[#9C753B]/20"
          >
            <span>Explore All Expeditions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
