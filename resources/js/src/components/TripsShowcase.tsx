import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Calendar, Timer, MapPin, Search, SlidersHorizontal, 
  ArrowRight, Star, Heart, Check, X, Shield
} from "lucide-react";
import { PUBLISHED_CATALOGUE_TRIPS, type ShowcaseTrip } from "../catalogueTrips";


interface TripsShowcaseProps {
  onNavigate: (view: any) => void;
  onOpenBooking: (tripId: string) => void;
  isHomePage?: boolean;
}


const HOME_TRIPS_PER_PAGE = 6;

export default function TripsShowcase({ onNavigate, onOpenBooking, isHomePage = false }: TripsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [homePageIndex, setHomePageIndex] = useState(0);
  
  // Modal State for details of a selected trip
  const [selectedDetailedTrip, setSelectedDetailedTrip] = useState<ShowcaseTrip | null>(null);

  // Filter and Sort Trips
  const filteredAndSortedTrips = useMemo(() => {
    let result = [...PUBLISHED_CATALOGUE_TRIPS];

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter(t => t.category === activeCategory);
    }

    // Filter by Difficulty
    if (difficultyFilter !== "all") {
      result = result.filter(t => t.difficulty === difficultyFilter);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.subtitle.toLowerCase().includes(query) ||
        t.shortDesc.toLowerCase().includes(query) ||
        t.startPoint.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""));
        const pB = parseInt(b.price.replace(/[^\d]/g, ""));
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""));
        const pB = parseInt(b.price.replace(/[^\d]/g, ""));
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular (default)
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [activeCategory, searchQuery, difficultyFilter, sortBy]);

  const categories = [
    { id: "all", name: "✨ All Expeditions", count: PUBLISHED_CATALOGUE_TRIPS.length },
    { id: "treks", name: "🏔️ Himalayan Treks", count: PUBLISHED_CATALOGUE_TRIPS.filter(t => t.category === "treks").length },
    { id: "escapes", name: "🎒 Weekend Escapes", count: PUBLISHED_CATALOGUE_TRIPS.filter(t => t.category === "escapes").length },
    { id: "backpacking", name: "🗺️ Backpacking Tours", count: PUBLISHED_CATALOGUE_TRIPS.filter(t => t.category === "backpacking").length },
    { id: "spiritual", name: "🛕 Spiritual Journeys", count: PUBLISHED_CATALOGUE_TRIPS.filter(t => t.category === "spiritual").length },
    { id: "leisure", name: "🌿 Leisure & Nature", count: PUBLISHED_CATALOGUE_TRIPS.filter(t => t.category === "leisure").length },
  ].filter((category) => category.id === "all" || category.count > 0);

  const homePageCount = Math.ceil(filteredAndSortedTrips.length / HOME_TRIPS_PER_PAGE);
  const visibleTrips = isHomePage
    ? filteredAndSortedTrips.slice(homePageIndex * HOME_TRIPS_PER_PAGE, (homePageIndex + 1) * HOME_TRIPS_PER_PAGE)
    : filteredAndSortedTrips;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setHomePageIndex(0);
  };

  const handleTripCardAction = (trip: ShowcaseTrip) => {
    if (trip.hasFullItinerary) {
      onNavigate(trip.id);
    } else {
      setSelectedDetailedTrip(trip);
    }
  };

  return (
    <section id="all-trips-showcase" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F9F8F6] border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {isHomePage && (
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
        )}

        {/* Dynamic Filters Bar */}
        <div className={isHomePage ? "space-y-5" : "p-4 sm:p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4"}>
          {!isHomePage && (
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search destinations, states, or start points..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9C753B] transition-colors shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 bg-neutral-200/50 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              
              {/* Difficulty Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF9F6] px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-neutral-700 font-bold">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9C753B]" />
                <span>Difficulty:</span>
                <select 
                  value={difficultyFilter} 
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-transparent focus:outline-none text-neutral-900 cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">🍀 Easy (Comfort)</option>
                  <option value="Moderate">⛰️ Moderate</option>
                  <option value="Challenging">🔥 Challenging</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF9F6] px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-neutral-700 font-bold">
                <span>Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-neutral-900 cursor-pointer font-bold"
                >
                  <option value="popular">🔥 Most Popular</option>
                  <option value="rating">⭐ Top Rated</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                </select>
              </div>

            </div>
          </div>
          )}

          {/* Horizontal Category Selection Tabs */}
          <div className={isHomePage ? "flex flex-wrap items-center justify-center gap-2 sm:gap-3" : "border-t border-neutral-100 pt-4 flex items-center overflow-x-auto gap-2 no-scrollbar scroll-smooth"}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-black transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-[#9C753B] text-white shadow-md shadow-[#9C753B]/20 scale-[1.02]"
                    : isHomePage
                      ? "bg-white text-neutral-700 border border-neutral-200 shadow-sm hover:border-[#9C753B]/45 hover:bg-[#FFFDF9] hover:shadow-md"
                      : "bg-[#FAF9F6] text-neutral-700 border border-neutral-200 hover:border-[#9C753B]/45 hover:bg-white"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Trips Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleTrips.map((trip) => (
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
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    {trip.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#9C753B] text-white text-[9px] font-black uppercase tracking-widest shadow-md">
                        {trip.badge}
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-md ${
                      trip.difficulty === "Easy" ? "bg-emerald-600" :
                      trip.difficulty === "Moderate" ? "bg-amber-600" : "bg-rose-700"
                    }`}>
                      {trip.difficulty}
                    </span>
                  </div>

                  <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-rose-500 transition-all duration-300">
                    <Heart className="w-4 h-4 fill-current text-white/50 hover:text-rose-500 transition-colors" />
                  </button>

                  {/* Rating Badge at bottom right of image */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-neutral-900 border border-neutral-200">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{trip.rating}</span>
                    <span className="text-neutral-400 font-normal">({trip.reviewsCount})</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 sm:p-6 text-left space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#9C753B]">
                      <span>Departing: {trip.upcomingDeparture}</span>
                      <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono text-[9px]">{trip.startPoint}</span>
                    </div>
                    
                    <h3 className="text-lg font-black text-neutral-900 uppercase font-display leading-tight group-hover:text-[#9C753B] transition-colors line-clamp-1">
                      {trip.name}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                      {trip.shortDesc}
                    </p>
                  </div>

                  {/* Quick specs banner */}
                  <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-3 text-[11px] text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-3.5 h-3.5 text-[#9C753B]" />
                      <span className="font-mono font-bold text-neutral-800">{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#9C753B]" />
                      <span className="truncate">Starts: <strong>{trip.startPoint.split(" ")[0]}</strong></span>
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
                      onClick={() => handleTripCardAction(trip)}
                      className="px-4.5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] active:scale-95 transition-all rounded-xl inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No results placeholder */}
          {filteredAndSortedTrips.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Compass className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-lg font-bold text-neutral-800 uppercase">No Expeditions Found</h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                We couldn't find any trips matching "{searchQuery}" under this category. Try adjusting your search query or filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setDifficultyFilter("all"); setActiveCategory("all"); }}
                className="px-5 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {isHomePage && homePageCount > 1 && (
          <div className="flex items-center justify-center gap-2 pt-1" aria-label="Trip pages">
            {Array.from({ length: homePageCount }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => setHomePageIndex(pageIndex)}
                aria-label={`Show trip page ${pageIndex + 1}`}
                aria-current={homePageIndex === pageIndex ? "page" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  homePageIndex === pageIndex
                    ? "w-8 bg-[#9C753B] shadow-sm"
                    : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal / drawer for compact trip detail previews */}
      <AnimatePresence>
        {selectedDetailedTrip && (
          <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
            
            {/* Backdrop blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailedTrip(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[96dvh] sm:max-h-[85vh] flex flex-col text-left"
            >
              {/* Image banner header with close trigger */}
              <div className="relative h-48 sm:h-72 shrink-0">
                <img 
                  src={selectedDetailedTrip.image} 
                  alt={selectedDetailedTrip.name} 
                  className="w-full h-full object-cover brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Header Overlay metadata */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-2">
                  <span className="px-3 py-1 bg-[#9C753B] text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                    {selectedDetailedTrip.badge || "FEATURED ADVENTURE"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight leading-tight">
                    {selectedDetailedTrip.name}
                  </h3>
                  <p className="text-xs text-neutral-200 font-normal italic">
                    "{selectedDetailedTrip.subtitle}"
                  </p>
                </div>

                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedDetailedTrip(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details area */}
              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-6 flex-grow">
                
                {/* Grid Metadata columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Net Investment</span>
                    <span className="font-black text-neutral-900 font-mono text-sm block mt-0.5">{selectedDetailedTrip.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Expedition Span</span>
                    <span className="font-black text-neutral-900 font-mono text-sm block mt-0.5">{selectedDetailedTrip.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Trek Difficulty</span>
                    <span className="font-black text-neutral-900 text-sm block mt-0.5 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#9C753B]" />
                      {selectedDetailedTrip.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase block">Starting Station</span>
                    <span className="font-black text-neutral-900 text-sm block mt-0.5">{selectedDetailedTrip.startPoint}</span>
                  </div>
                </div>

                {/* Left-Right description and summary details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2">
                    Expedition Overview
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {selectedDetailedTrip.shortDesc}
                  </p>
                </div>

                {/* Day-Wise Route Summary Timeline preview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#9C753B]" /> 
                    <span>Journey Blueprint / Itinerary</span>
                  </h4>
                  <div className="space-y-2.5 pl-2 border-l border-neutral-100">
                    {selectedDetailedTrip.itinerarySummary.map((dayLine, idx) => (
                      <div key={idx} className="flex gap-3 text-xs text-neutral-700 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p>{dayLine}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions checklist preview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest border-l-2 border-[#9C753B] pl-2">
                    Inclusive Pack Comforts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDetailedTrip.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peace of mind banner */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">100% Verified Safety Protocols</p>
                    <p className="text-emerald-700 font-light leading-relaxed">
                      Accompanied by two certified mountaineer trip leaders, with standard oxygen logs, stretchers, and full coordination with state medical desks.
                    </p>
                  </div>
                </div>

              </div>

              {/* Sticky bottom checkout / action row */}
              <div className="p-4 sm:p-6 border-t border-neutral-200 bg-[#FAF9F6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div>
                  <p className="text-[9px] uppercase text-neutral-400 font-bold">Upcoming Batch Departure</p>
                  <p className="text-sm font-black text-[#9C753B] font-mono mt-0.5">
                    {selectedDetailedTrip.upcomingDeparture}
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedDetailedTrip(null)}
                    className="flex-1 sm:flex-none px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                  >
                    Back to Catalog
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDetailedTrip(null);
                      onOpenBooking(selectedDetailedTrip.id);
                    }}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#9C753B] hover:bg-[#7C552B] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
