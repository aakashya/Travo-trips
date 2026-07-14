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
  Info
} from "lucide-react";
import { HERO_BG_IMAGE, CAMP_IMAGE, SNOW_IMAGE, CAFE_IMAGE, MANIKARAN_IMAGE } from "../data";
import type { AppView } from "../App";

interface ScheduledTrip {
  id: string; // matches TRIPS_DATA key or custom
  tripId: string; // real ID to navigate: "manali" or "valley-of-flowers"
  name: string;
  type: "adventure" | "unesco" | "weekend";
  date: string; // YYYY-MM-DD
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

// Set up rich schedule of upcoming departures for the season (July & August 2026)
const UPCOMING_SCHEDULE: ScheduledTrip[] = [
  {
    id: "manali-july-10",
    tripId: "manali",
    name: "Manali Kasol Escape",
    type: "adventure",
    date: "2026-07-10",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    slotsTotal: 16,
    slotsBooked: 13,
    departureTime: "9:00 PM",
    departurePoint: "Majnu ka Tilla, Delhi",
    subtitle: "Riverside Camping, Atal Tunnel snow point, and Old Manali cafe trails.",
    badge: "🏔️ POPULAR BATCH",
    image: HERO_BG_IMAGE
  },
  {
    id: "vof-july-17",
    tripId: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    type: "unesco",
    date: "2026-07-17",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    slotsTotal: 12,
    slotsBooked: 10,
    departureTime: "9:00 PM",
    departurePoint: "Akshardham Metro Station, Delhi",
    subtitle: "UNESCO World Heritage trek, holy Hemkund Sahib, and hot spring healing.",
    badge: "🌸 peak bloom",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "manali-july-24",
    tripId: "manali",
    name: "Manali Kasol Escape",
    type: "adventure",
    date: "2026-07-24",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    slotsTotal: 16,
    slotsBooked: 8,
    departureTime: "9:00 PM",
    departurePoint: "Majnu ka Tilla, Delhi",
    subtitle: "Riverside Camping, Atal Tunnel snow point, and Old Manali cafe trails.",
    badge: "🏔️ COZY BATCH",
    image: SNOW_IMAGE
  },
  {
    id: "vof-july-31",
    tripId: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    type: "unesco",
    date: "2026-07-31",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    slotsTotal: 12,
    slotsBooked: 5,
    departureTime: "9:00 PM",
    departurePoint: "Akshardham Metro Station, Delhi",
    subtitle: "UNESCO World Heritage trek, holy Hemkund Sahib, and hot spring healing.",
    badge: "🌸 RARE FLORA SEEN",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "manali-aug-07",
    tripId: "manali",
    name: "Manali Kasol Escape",
    type: "adventure",
    date: "2026-08-07",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    slotsTotal: 16,
    slotsBooked: 14,
    departureTime: "9:00 PM",
    departurePoint: "Majnu ka Tilla, Delhi",
    subtitle: "Riverside Camping, Atal Tunnel snow point, and Old Manali cafe trails.",
    badge: "🔥 SELLS OUT FAST",
    image: CAFE_IMAGE
  },
  {
    id: "vof-aug-14",
    tripId: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    type: "unesco",
    date: "2026-08-14",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    slotsTotal: 12,
    slotsBooked: 11,
    departureTime: "9:00 PM",
    departurePoint: "Akshardham Metro Station, Delhi",
    subtitle: "UNESCO World Heritage trek, holy Hemkund Sahib, and hot spring healing.",
    badge: "🌸 MONSOON PEAK",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "kheerganga-weekend-04",
    tripId: "manali", // fallback mapping
    name: "Parvati Valley & Kheerganga Trek",
    type: "weekend",
    date: "2026-07-04",
    price: "₹4,999",
    duration: "3 Days / 2 Nights",
    slotsTotal: 20,
    slotsBooked: 19,
    departureTime: "8:30 PM",
    departurePoint: "Kashmere Gate, Delhi",
    subtitle: "Lush green pine trails, sulfur hot water springs, and high-altitude starlit dome tents.",
    badge: "⛺ WEEKEND RETREAT",
    image: CAMP_IMAGE
  },
  {
    id: "kheerganga-weekend-18",
    tripId: "manali", // fallback mapping
    name: "Parvati Valley & Kheerganga Trek",
    type: "weekend",
    date: "2026-07-18",
    price: "₹4,999",
    duration: "3 Days / 2 Nights",
    slotsTotal: 20,
    slotsBooked: 15,
    departureTime: "8:30 PM",
    departurePoint: "Kashmere Gate, Delhi",
    subtitle: "Lush green pine trails, sulfur hot water springs, and high-altitude starlit dome tents.",
    badge: "⛺ WEEKEND RETREAT",
    image: CAMP_IMAGE
  },
  {
    id: "kheerganga-weekend-15",
    tripId: "manali", // fallback mapping
    name: "Parvati Valley & Kheerganga Trek",
    type: "weekend",
    date: "2026-08-15",
    price: "₹4,999",
    duration: "3 Days / 2 Nights",
    slotsTotal: 20,
    slotsBooked: 12,
    departureTime: "8:30 PM",
    departurePoint: "Kashmere Gate, Delhi",
    subtitle: "Lush green pine trails, sulfur hot water springs, and high-altitude starlit dome tents.",
    badge: "🇮🇳 INDEPENDENCE SPECIAL",
    image: MANIKARAN_IMAGE
  }
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface UpcomingCalendarProps {
  onNavigate: (view: AppView) => void;
  onOpenBooking: (tripId: string) => void;
}

export default function UpcomingCalendar({ onNavigate, onOpenBooking }: UpcomingCalendarProps) {
  // Lock starting view to July 2026 containing major expeditions
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 6 = July (0-indexed)
  
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>("2026-07-10");
  const [filterType, setFilterType] = useState<"all" | "adventure" | "unesco" | "weekend">("all");
  const [displayMode, setDisplayMode] = useState<"calendar" | "list">("calendar");

  // Custom Batch Request Form State
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [customTripType, setCustomTripType] = useState("manali");
  const [customDate, setCustomDate] = useState("");
  const [customSuccess, setCustomSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Generate calendar days for selected year + month
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    
    const days: { dayNumber: number; dateStr: string; isCurrentMonth: boolean; weekday: number }[] = [];
    
    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i;
      const m = currentMonth === 0 ? 12 : currentMonth;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        weekday: new Date(y, m - 1, dayNum).getDay()
      });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: true,
        weekday: new Date(currentYear, currentMonth, i).getDay()
      });
    }
    
    // Next month padding days to fill 6 rows grid cleanly (42 spaces)
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const m = currentMonth === 11 ? 1 : currentMonth + 2;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: false,
        weekday: new Date(y, m - 1, i).getDay()
      });
    }
    
    return days;
  }, [currentYear, currentMonth]);

  // Find trips for each day, taking filter into account
  const tripsByDate = useMemo(() => {
    const map: Record<string, ScheduledTrip[]> = {};
    UPCOMING_SCHEDULE.forEach(trip => {
      if (filterType !== "all" && trip.type !== filterType) return;
      if (!map[trip.date]) {
        map[trip.date] = [];
      }
      map[trip.date].push(trip);
    });
    return map;
  }, [filterType]);

  // Filtered upcoming schedule chronological list
  const filteredTimelineList = useMemo(() => {
    return UPCOMING_SCHEDULE
      .filter(trip => filterType === "all" || trip.type === filterType)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filterType]);

  // Active selected trips details display
  const selectedTrips = selectedDateStr ? tripsByDate[selectedDateStr] || [] : [];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCustomSuccess(true);
      // Reset form fields
      setCustomName("");
      setCustomEmail("");
      setCustomDate("");
    }, 1200);
  };

  return (
    <section id="trip-calendar" className="py-24 px-6 bg-[#FAF9F6] relative border-t border-b border-neutral-200 scroll-mt-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-500/[0.04] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 text-neutral-900">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#9C753B]" /> TRIP EXPEDITION SCHEDULER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight leading-tight text-neutral-900">
              Upcoming Adventure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
                Departure Calendar
              </span>
            </h2>
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Synchronize your clock with our high-altitude calendar. Select highlighted dates to explore certified group batches, see active slots, or pitch custom group dates.
          </p>
        </div>

        {/* Dashboard Control Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => { setFilterType("all"); setSelectedDateStr(null); }}
              className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${
                filterType === "all" 
                  ? "bg-[#9C753B] text-white" 
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              All Tours
            </button>
            <button
              onClick={() => { setFilterType("adventure"); setSelectedDateStr(null); }}
              className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${
                filterType === "adventure" 
                  ? "bg-amber-50 text-amber-800 border border-amber-200" 
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              🏔️ Adventure
            </button>
            <button
              onClick={() => { setFilterType("unesco"); setSelectedDateStr(null); }}
              className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${
                filterType === "unesco" 
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              🌸 UNESCO
            </button>
            <button
              onClick={() => { setFilterType("weekend"); setSelectedDateStr(null); }}
              className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${
                filterType === "weekend" 
                  ? "bg-purple-50 text-purple-800 border border-purple-200" 
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
              }`}
            >
              ⛺ Weekends
            </button>
          </div>

          {/* Display Switcher Tab */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setDisplayMode("calendar")}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-black transition-all flex-grow sm:flex-grow-0 ${
                displayMode === "calendar" 
                  ? "bg-white text-neutral-900 font-black shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Calendar Grid
            </button>
            <button
              onClick={() => setDisplayMode("list")}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-black transition-all flex-grow sm:flex-grow-0 ${
                displayMode === "list" 
                  ? "bg-white text-neutral-900 font-black shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Chronological List ({filteredTimelineList.length})
            </button>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calendar or Chronological list */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-4 sm:p-6 shadow-xl">
            
            {displayMode === "calendar" ? (
              <div className="space-y-6">
                {/* Calendar Header / Month Select */}
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-brand-sand/15 rounded-lg text-[#9C753B]">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 uppercase font-display">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setCurrentYear(2026); setCurrentMonth(6); }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[9px] uppercase font-bold tracking-wider text-neutral-700 hover:text-[#9C753B] transition-all"
                    >
                      Reset (July '26)
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Titles */}
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  {WEEKDAYS.map(day => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((dayObj, idx) => {
                    const tripsOnDay = tripsByDate[dayObj.dateStr] || [];
                    const hasTrips = tripsOnDay.length > 0;
                    const isSelected = selectedDateStr === dayObj.dateStr;
                    
                    // Determine dominant trip type for calendar coloring
                    let bgClass = "bg-transparent hover:bg-neutral-50 border-neutral-100";
                    let ringClass = "";
                    let indicatorColor = "";

                    if (hasTrips) {
                      const type = tripsOnDay[0].type;
                      if (type === "adventure") {
                        bgClass = "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100/80";
                        indicatorColor = "bg-[#9C753B] shadow-sm";
                      } else if (type === "unesco") {
                        bgClass = "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/80";
                        indicatorColor = "bg-emerald-600 shadow-sm";
                      } else {
                        bgClass = "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100/80";
                        indicatorColor = "bg-purple-600 shadow-sm";
                      }
                    }

                    if (isSelected) {
                      ringClass = "ring-2 ring-neutral-800 ring-offset-2 ring-offset-white";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDateStr(dayObj.dateStr)}
                        className={`relative aspect-square sm:p-2 flex flex-col justify-between items-center rounded-xl border text-xs font-bold transition-all ${bgClass} ${ringClass} ${
                          dayObj.isCurrentMonth ? (hasTrips ? "font-black" : "text-neutral-800") : "text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        {/* Day number */}
                        <span className="text-xs sm:text-sm font-semibold">{dayObj.dayNumber}</span>
                        
                        {/* Interactive Dot details */}
                        {hasTrips && (
                          <div className="flex gap-1 justify-center mt-1">
                            {tripsOnDay.slice(0, 3).map((t, tIdx) => (
                              <span 
                                key={tIdx} 
                                className={`w-1.5 h-1.5 rounded-full ${
                                  t.type === "adventure" 
                                    ? "bg-[#9C753B]" 
                                    : t.type === "unesco" 
                                      ? "bg-emerald-600" 
                                      : "bg-purple-600"
                                }`} 
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-neutral-200 text-[10px] uppercase tracking-wider font-bold text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9C753B]" />
                    <span>🏔️ Adventure Tour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>🌸 UNESCO Trek</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span>⛺ Weekend Escape</span>
                  </div>
                </div>

              </div>
            ) : (
              /* Chronological Timeline List View */
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase font-display border-b border-neutral-200 pb-2">
                  All Filtered Upcoming Departures
                </h3>
                {filteredTimelineList.map((trip) => {
                  const date = new Date(trip.date);
                  const isSelected = selectedDateStr === trip.date;
                  
                  return (
                    <div
                      key={trip.id}
                      onClick={() => setSelectedDateStr(trip.date)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
                        isSelected 
                          ? "bg-neutral-50 border-[#9C753B] shadow-md" 
                          : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Big Date Display */}
                        <div className="flex flex-col items-center justify-center w-12 h-14 bg-neutral-100 rounded-xl border border-neutral-200 text-center px-1">
                          <span className="text-[9px] uppercase font-bold text-[#9C753B]">
                            {date.toLocaleString("default", { month: "short" })}
                          </span>
                          <span className="text-lg font-black text-neutral-900 leading-none">
                            {date.getDate()}
                          </span>
                        </div>

                        {/* Title Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                              trip.type === "adventure" 
                                ? "bg-amber-50 text-amber-800 border border-amber-200" 
                                : trip.type === "unesco" 
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                                  : "bg-purple-50 text-purple-800 border border-purple-200"
                            }`}>
                              {trip.badge}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">{trip.duration}</span>
                          </div>
                          <h4 className="text-sm font-black text-neutral-900 uppercase font-display">
                            {trip.name}
                          </h4>
                        </div>
                      </div>

                      {/* Right Specs info */}
                      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] text-neutral-500">Starting Price</p>
                          <p className="text-sm font-black text-neutral-900">{trip.price}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDateStr(trip.date);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#9C753B] hover:text-white border border-neutral-200 text-[9px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1 transition-all"
                        >
                          Select Day
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right Column: Interaction Details Panel */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {selectedTrips.length > 0 ? (
                <div className="space-y-4">
                  {selectedTrips.map((trip) => {
                    const slotsLeft = trip.slotsTotal - trip.slotsBooked;
                    const fillingPercentage = (trip.slotsBooked / trip.slotsTotal) * 100;
                    
                    return (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between text-neutral-900"
                      >
                        {/* Header cover */}
                        <div className="relative h-44 overflow-hidden">
                          <img 
                            src={trip.image} 
                            alt={trip.name} 
                            className="w-full h-full object-cover brightness-[0.85] saturate-[1.05]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-neutral-900/90 text-white font-black font-display text-[9px] tracking-widest uppercase rounded shadow-md border border-neutral-800">
                              {trip.badge}
                            </span>
                          </div>
                        </div>

                        {/* Contents */}
                        <div className="p-6 space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="text-2xl font-black uppercase text-neutral-900 font-display tracking-tight">
                                {trip.name}
                              </h3>
                              <span className="text-lg font-black text-[#9C753B] whitespace-nowrap">
                                {trip.price}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 font-light leading-relaxed">
                              {trip.subtitle}
                            </p>
                          </div>

                          {/* Quick Specs Grid */}
                          <div className="grid grid-cols-2 gap-3 bg-neutral-50 border border-neutral-200 p-3 rounded-2xl">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase block">Departure</span>
                              <div className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold">
                                <Clock className="w-3.5 h-3.5 text-[#9C753B]" />
                                <span>{trip.departureTime}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase block">Duration</span>
                              <div className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold">
                                <Calendar className="w-3.5 h-3.5 text-[#9C753B]" />
                                <span>{trip.duration}</span>
                              </div>
                            </div>
                            <div className="col-span-2 space-y-1 border-t border-neutral-200 pt-2 mt-1">
                              <span className="text-[9px] font-mono text-neutral-500 uppercase block">Assembly Point</span>
                              <div className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold">
                                <MapPin className="w-3.5 h-3.5 text-[#9C753B]" />
                                <span className="line-clamp-1">{trip.departurePoint}</span>
                              </div>
                            </div>
                          </div>

                          {/* Interactive seat tracking */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-600">
                              <span className="flex items-center gap-1.5 font-bold text-neutral-700">
                                <Users className="w-3.5 h-3.5 text-[#9C753B]" />
                                <span>Slots Taken: {trip.slotsBooked} / {trip.slotsTotal}</span>
                              </span>
                              {slotsLeft <= 3 ? (
                                <span className="text-amber-600 flex items-center gap-1 animate-pulse font-black">
                                  <Flame className="w-3.5 h-3.5 fill-current" /> ONLY {slotsLeft} SEATS LEFT!
                                </span>
                              ) : (
                                <span className="text-neutral-500 font-bold">{slotsLeft} Spots Open</span>
                              )}
                            </div>

                            {/* Custom progress bar */}
                            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  slotsLeft <= 3 
                                    ? "bg-gradient-to-r from-amber-500 to-rose-500" 
                                    : "bg-[#9C753B]"
                                }`} 
                                style={{ width: `${fillingPercentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Quick CTA Actions */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                              onClick={() => onNavigate(trip.tripId as any)}
                              className="px-4 py-3 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                            >
                              <span>Itinerary</span>
                              <Compass className="w-3.5 h-3.5 text-[#9C753B]" />
                            </button>
                            <button
                              onClick={() => onOpenBooking(trip.tripId)}
                              className="px-4 py-3 bg-[#9C753B] text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all text-center hover:bg-neutral-900 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                            >
                              <span>Fast Book</span>
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                /* Empty Calendar Day State -> Private/Custom Batch Request form */
                <motion.div
                  key="custom-request-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xl space-y-6 text-neutral-900"
                >
                  <div className="space-y-2 border-b border-neutral-200 pb-4">
                    <div className="flex items-center gap-2 text-[#9C753B] text-xs font-black uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" /> Custom Expedition Request
                    </div>
                    <h3 className="text-xl font-black uppercase font-display text-neutral-900">
                      Want a private departure?
                    </h3>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {selectedDateStr ? (
                        <>No open-group departures scheduled for <span className="font-mono text-[#9C753B] font-extrabold">{selectedDateStr}</span>. However, we custom design private corporate and family expeditions!</>
                      ) : (
                        "Pick any date on the calendar, or request custom weekend trip planning for your corporate or private squad below."
                      )}
                    </p>
                  </div>

                  {!customSuccess ? (
                    <form onSubmit={handleCustomSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-black text-neutral-500 font-mono block">
                          Co-traveler Name
                        </label>
                        <input
                          type="text"
                          required
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9C753B]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-black text-neutral-500 font-mono block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder="adventurer@gmail.com"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#9C753B]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider font-black text-neutral-500 font-mono block">
                            Trip Choice
                          </label>
                          <select
                            value={customTripType}
                            onChange={(e) => setCustomTripType(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                          >
                            <option value="manali">Manali Kasol</option>
                            <option value="valley-of-flowers">Valley of Flowers</option>
                            <option value="kheerganga">Kheerganga Trek</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-wider font-black text-neutral-500 font-mono block">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            value={customDate || selectedDateStr || "2026-07-01"}
                            onChange={(e) => setCustomDate(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B] font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-[#9C753B] text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all hover:bg-neutral-900 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>PITCHING REQUEST...</span>
                        ) : (
                          <>
                            <span>Request Custom Departure</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4"
                    >
                      <div className="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-black text-neutral-900 uppercase font-display">
                          Proposal Lodged Successfully!
                        </h4>
                        <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                          Our Head Expedition Captain has received your custom private request. We will email you within 2 hours with customized group quotas and tempo availability.
                        </p>
                      </div>
                      <button
                        onClick={() => setCustomSuccess(false)}
                        className="text-[9px] uppercase font-bold tracking-wider text-emerald-700 hover:text-emerald-900 transition-colors"
                      >
                        Submit another custom proposal
                      </button>
                    </motion.div>
                  )}

                  {/* Informational advice */}
                  <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-200/50 rounded-xl">
                    <Info className="w-4 h-4 text-[#9C753B] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-900 leading-normal font-medium">
                      Note: Custom private/corporate departures require a minimum squad of 8 co-travelers to guarantee personalized luxury tempo travel coaches and dedicated captains.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
