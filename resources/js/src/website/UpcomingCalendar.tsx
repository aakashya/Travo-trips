import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Flame, 
  Sparkles, 
  Clock, 
  Compass, 
  MapPin, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Filter,
  Info,
  ShieldCheck,
  Ship
} from "lucide-react";
import { ANDAMAN_PACKAGES, AndamanPackage } from "../data/andamanPackages";

interface ScheduledTrip {
  id: string;
  tripId: string;
  name: string;
  type: "rush" | "beach" | "triangle" | "grand" | "expedition";
  date: string;
  price: string;
  duration: string;
  slotsTotal: number;
  slotsBooked: number;
  departureTime: string;
  departurePoint: string;
  subtitle: string;
  badge: string;
  image: string;
}

// Scheduled Andaman departures
const UPCOMING_SCHEDULE: ScheduledTrip[] = [
  {
    id: "andaman-rush-batch1",
    tripId: "andaman-rush-3d2n",
    name: "Andaman Rush Expedition",
    type: "rush",
    date: "2025-07-15",
    price: "₹5,950",
    duration: "3 Days / 2 Nights",
    slotsTotal: 12,
    slotsBooked: 9,
    departureTime: "Daily Flights",
    departurePoint: "Veer Savarkar Airport, Port Blair",
    subtitle: "Cellular Jail Light & Sound + Ross & North Bay Speed Boat Trip.",
    badge: "⚡ FAST ESCAPE",
    image: ANDAMAN_PACKAGES[0].heroImage
  },
  {
    id: "andaman-dream-batch1",
    tripId: "andaman-dream-4d3n",
    name: "Andaman Dream Vacation",
    type: "beach",
    date: "2025-07-20",
    price: "₹12,350",
    duration: "4 Days / 3 Nights",
    slotsTotal: 16,
    slotsBooked: 14,
    departureTime: "Daily Flights",
    departurePoint: "Veer Savarkar Airport, Port Blair",
    subtitle: "Havelock Island, Radhanagar Asia's #7 Beach & Elephant Beach Snorkeling.",
    badge: "🔥 BESTSELLER",
    image: ANDAMAN_PACKAGES[1].heroImage
  },
  {
    id: "andaman-exotic-batch1",
    tripId: "andaman-exotic-5d4n",
    name: "Andaman Exotic Island Triangle",
    type: "triangle",
    date: "2025-07-25",
    price: "₹16,000",
    duration: "5 Days / 4 Nights",
    slotsTotal: 15,
    slotsBooked: 11,
    departureTime: "Daily Flights",
    departurePoint: "Veer Savarkar Airport, Port Blair",
    subtitle: "3-Island Circuit: Port Blair, Havelock & Neil Island with private cruise.",
    badge: "🏝️ 3-ISLAND FAVORITE",
    image: ANDAMAN_PACKAGES[2].heroImage
  },
  {
    id: "andaman-grand-batch1",
    tripId: "andaman-exotic-7d6n",
    name: "Andaman Grand Island & Caves",
    type: "grand",
    date: "2025-08-01",
    price: "₹23,400",
    duration: "7 Days / 6 Nights",
    slotsTotal: 10,
    slotsBooked: 8,
    departureTime: "Daily Flights",
    departurePoint: "Veer Savarkar Airport, Port Blair",
    subtitle: "Baratang Limestone Caves, Havelock, Neil & Chidiya Tapu Sunset.",
    badge: "🧭 ADVENTURE & CAVES",
    image: ANDAMAN_PACKAGES[3].heroImage
  },
  {
    id: "andaman-full-batch1",
    tripId: "andaman-exotic-10d9n",
    name: "Andaman Full Explorer & Diglipur",
    type: "expedition",
    date: "2025-08-10",
    price: "₹39,550",
    duration: "10 Days / 9 Nights",
    slotsTotal: 8,
    slotsBooked: 5,
    departureTime: "Daily Flights",
    departurePoint: "Veer Savarkar Airport, Port Blair",
    subtitle: "Complete North & South Andaman Expedition through Diglipur, Rangat & Havelock.",
    badge: "🌊 FULL EXPEDITION",
    image: ANDAMAN_PACKAGES[4].heroImage
  }
];

interface UpcomingCalendarProps {
  onNavigate: (view: any) => void;
  onOpenBooking: (tripId: string) => void;
}

export default function UpcomingCalendar({ onNavigate, onOpenBooking }: UpcomingCalendarProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<"2025-07" | "2025-08">("2025-07");

  const filteredTrips = useMemo(() => {
    return UPCOMING_SCHEDULE.filter((trip) => {
      const matchesFilter = activeFilter === "all" || trip.type === activeFilter;
      const matchesMonth = trip.date.startsWith(selectedMonth);
      return matchesFilter && matchesMonth;
    });
  }, [activeFilter, selectedMonth]);

  return (
    <section className="py-24 px-6 bg-white text-neutral-900 border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sand/10 border border-brand-sand/30 rounded-full text-brand-charcoal text-[11px] font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#9C753B]" /> DAILY DEPARTURE CALENDAR
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 uppercase">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">Andaman Batches</span>
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl font-light">
              Select your preferred travel dates. Every Andaman package includes Airport Meet & Greet, Private AC Transfers, Nautika/Makruzz Cruise tickets & 24x7 TRAVO Ground Concierge.
            </p>
          </div>

          {/* Month Switcher */}
          <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 self-start md:self-auto">
            <button
              onClick={() => setSelectedMonth("2025-07")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === "2025-07"
                  ? "bg-[#9C753B] text-white shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              July 2025
            </button>
            <button
              onClick={() => setSelectedMonth("2025-08")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === "2025-08"
                  ? "bg-[#9C753B] text-white shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              August 2025
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((item) => {
            const seatsLeft = item.slotsTotal - item.slotsBooked;
            const progressPercent = (item.slotsBooked / item.slotsTotal) * 100;

            return (
              <div 
                key={item.id}
                className="bg-[#FAF9F6] border border-neutral-200 rounded-3xl overflow-hidden hover:border-[#9C753B] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-bold bg-[#9C753B] text-white px-3 py-1 rounded-full shadow-lg">
                      {item.badge}
                    </span>

                    <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED TRIP
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs text-brand-sand font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Departure: {item.date}
                      </p>
                      <h3 className="text-lg font-black font-display uppercase tracking-wide text-white">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-neutral-200 text-xs text-neutral-700">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-500">
                          <Clock className="w-3.5 h-3.5 text-[#9C753B]" /> Duration:
                        </span>
                        <span className="font-bold text-neutral-900">{item.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-500">
                          <MapPin className="w-3.5 h-3.5 text-[#9C753B]" /> Airport Arrival:
                        </span>
                        <span className="font-medium text-neutral-900">Port Blair (IXZ)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-500">
                          <Ship className="w-3.5 h-3.5 text-[#9C753B]" /> Inter-Island Ferry:
                        </span>
                        <span className="font-medium text-neutral-900">Nautika / Makruzz</span>
                      </div>
                    </div>

                    {/* Progress seats bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-neutral-500">Batch Capacity:</span>
                        <span className={`font-bold ${seatsLeft <= 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {seatsLeft} {seatsLeft === 1 ? 'Slot Left' : 'Slots Left'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#9C753B] to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer price & CTA */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-200/60 mt-2">
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Starting From</p>
                    <p className="text-xl font-black text-neutral-900">{item.price}<span className="text-xs text-neutral-500 font-normal"> /pax</span></p>
                  </div>

                  <button
                    onClick={() => onOpenBooking(item.tripId)}
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-[#9C753B] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 group-hover:translate-x-0.5 shadow-md"
                  >
                    Book Batch <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="p-4 rounded-2xl bg-[#9C753B]/10 border border-[#9C753B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#9C753B] shrink-0" />
            <span>
              <strong>Flexible Custom Travel Dates Available:</strong> Need custom travel dates for your family or honeymoon group? All Andaman packages can be customized for any arrival date.
            </span>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="px-4 py-2 bg-[#9C753B] hover:bg-neutral-900 text-white font-bold rounded-xl whitespace-nowrap transition-all text-xs"
          >
            Custom Travel Request
          </button>
        </div>

      </div>
    </section>
  );
}
