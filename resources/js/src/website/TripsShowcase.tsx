import React, { useState, useMemo } from "react";
import { 
  Compass, Calendar, Timer, MapPin, Search, 
  ArrowRight, Check, ShieldCheck, Users, Ship,
  Flame, Sparkles, Filter, Shield, Utensils
} from "lucide-react";
import { TRIPS_LIST } from "../data";
import { TripDetails } from "../types";
import { ANDAMAN_PACKAGES } from "../data/andamanPackages";

interface TripsShowcaseProps {
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
}

export default function TripsShowcase({ onNavigate, onOpenBooking }: TripsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"all" | "himalayas" | "andaman">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTrips = useMemo(() => {
    return TRIPS_LIST.filter((trip) => {
      const isAndaman = trip.id.startsWith("andaman-");

      // Category filter
      if (activeTab === "himalayas" && !["manali", "valley-of-flowers"].includes(trip.id)) {
        return false;
      }
      if (activeTab === "andaman" && !isAndaman) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = trip.name.toLowerCase().includes(query);
        const matchesSub = trip.subtitle.toLowerCase().includes(query);
        if (!matchesName && !matchesSub) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FAF9F6] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#9C753B]/10 border border-[#9C753B]/30 rounded-full text-neutral-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#9C753B]" /> EXPEDITION & GETAWAY CATALOG
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 uppercase">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">Expeditions & Packages</span>
          </h1>
          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            From snow-capped Himalayan passes of Manali & Valley of Flowers to azure tropical beaches of the Andaman Islands. Customise meal plans (CP/MAP), group size (1 to 12 Pax), and stay tiers inside each itinerary.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col space-y-4 bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {[
                { id: "all", label: "All Packages" },
                { id: "himalayas", label: "🏔️ Himalayan Escapes" },
                { id: "andaman", label: "🏝️ Andaman Tropical Islands" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-[#9C753B] text-white shadow-md"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search Manali, Havelock, Flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
              />
            </div>
          </div>

        </div>

        {/* Trip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => {
            const isAndaman = trip.id.startsWith("andaman-");

            return (
              <div 
                key={trip.id}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:border-[#9C753B] transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={trip.bannerImage} 
                      alt={trip.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 bg-[#9C753B] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                        {isAndaman ? "ISLAND GETAWAY" : "POPULAR EXPEDITION"}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified Tour
                      </span>
                    </div>

                    {/* Image Footer overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <p className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5" /> {trip.duration}
                      </p>
                      <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-wide leading-tight line-clamp-1">
                        {trip.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-light">
                      {trip.subtitle}
                    </p>

                    {/* Departure info */}
                    <div className="p-3 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                        <Calendar className="w-3.5 h-3.5 text-[#9C753B]" />
                        <span>Departure Batch:</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 pl-5 font-medium">
                        {trip.upcomingDeparture}
                      </p>
                    </div>

                    {/* Route Stops Covered */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Key Circuit Highlights:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {trip.routeStops.slice(0, 4).map((stop) => (
                          <span 
                            key={stop.id}
                            className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-[11px] text-neutral-700 font-medium"
                          >
                            📍 {stop.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Price & Action Buttons */}
                <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Starting From</p>
                    <p className="text-xl font-black text-neutral-900">
                      {trip.price} <span className="text-xs text-neutral-500 font-normal">/ adult</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate(trip.id)}
                      className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all"
                    >
                      Explore
                    </button>
                    <button
                      onClick={() => onOpenBooking(trip.id)}
                      className="px-4 py-2.5 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1 shadow-md"
                    >
                      Book <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="p-8 bg-neutral-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="px-3 py-1 bg-[#9C753B] text-white text-[10px] font-black uppercase rounded-full">
              CUSTOM TRAVEL CONCIERGE
            </span>
            <h3 className="text-2xl font-black font-display uppercase">
              Looking for Custom Group Departure Dates?
            </h3>
            <p className="text-xs text-neutral-300 max-w-xl font-light">
              We specialize in custom dates for colleges, corporate groups, family reunions & honeymoon getaways. Speak with our lead trip captain today.
            </p>
          </div>

          <button
            onClick={() => onNavigate("contact")}
            className="px-6 py-3 bg-[#9C753B] hover:bg-amber-600 text-white text-xs font-bold rounded-2xl transition-all shadow-xl shrink-0"
          >
            Custom Itinerary Request
          </button>
        </div>

      </div>
    </section>
  );
}
