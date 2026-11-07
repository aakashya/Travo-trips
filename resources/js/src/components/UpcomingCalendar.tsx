import React, { useState, useMemo, useEffect } from "react";
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
  CircleCheckBig,
  List
} from "lucide-react";
import type { AppView } from "../App";
import { WINTER_PACKAGES } from "../data/winterPackages";

interface ScheduledTrip {
  id: string;
  tripId: string;
  name: string;
  date: string;
  status: "completed" | "open";
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

// ---------------------------------------------------------------------------------------
// Winter Edition daily departures (Chopta–Tungnath & Manali–Sissu–Kasol).
//
// The season runs 20 Oct – 15 Dec 2026 with a departure every single day. Status is worked out
// against the real current date rather than hardcoded, so the calendar keeps itself honest as
// days pass: anything up to and including today reads as completed, and bookings reopen from the
// day after tomorrow — tomorrow's bus is already closed off, so that date is simply not listed.
// ---------------------------------------------------------------------------------------
const WINTER_SEASON_START = "2026-10-20";
const WINTER_SEASON_END = "2026-12-15";
const WINTER_SEATS_PER_DEPARTURE = 40;

const toDateStr = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * Small deterministic hash so each departure keeps the same "random" seat count between renders
 * (Math.random() here would make the numbers jump every time React re-rendered the calendar).
 */
const seededCount = (seed: string, min: number, max: number) => {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return min + (Math.abs(hash) % (max - min + 1));
};

function buildWinterSchedule(): ScheduledTrip[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = toDateStr(tomorrow);

  const bookingOpensFrom = new Date(today);
  bookingOpensFrom.setDate(bookingOpensFrom.getDate() + 2);

  const departures: ScheduledTrip[] = [];
  const cursor = new Date(`${WINTER_SEASON_START}T00:00:00`);
  const seasonEnd = new Date(`${WINTER_SEASON_END}T00:00:00`);

  while (cursor <= seasonEnd) {
    const dateStr = toDateStr(cursor);

    // Tomorrow's departure has closed for booking and hasn't run yet — leave it off the calendar.
    if (dateStr !== tomorrowStr) {
      const isCompleted = cursor <= today;
      const isBookable = cursor >= bookingOpensFrom;

      if (isCompleted || isBookable) {
        WINTER_PACKAGES.forEach((pkg) => {
          const slotsBooked = isCompleted
            ? seededCount(`${pkg.id}-${dateStr}-done`, 31, WINTER_SEATS_PER_DEPARTURE)
            : seededCount(`${pkg.id}-${dateStr}`, 6, 34);
          const slotsLeft = WINTER_SEATS_PER_DEPARTURE - slotsBooked;

          departures.push({
            id: `${pkg.id}-${dateStr}`,
            tripId: pkg.id,
            name: pkg.title,
            date: dateStr,
            status: isCompleted ? "completed" : "open",
            price: `₹${pkg.pricePerPerson.toLocaleString("en-IN")}`,
            duration: pkg.duration,
            slotsTotal: WINTER_SEATS_PER_DEPARTURE,
            slotsBooked,
            departureTime: "9:00 PM",
            departurePoint: pkg.pickupPoints.map((p) => p.city).join(" / "),
            subtitle: pkg.shortDescription,
            badge: isCompleted
              ? "TRIP COMPLETED"
              : slotsLeft <= 8
                ? "FILLING FAST"
                : "BOOKINGS OPEN",
            image: pkg.heroImage,
          });
        });
      }
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return departures;
}

// The homepage calendar mirrors the three currently published catalogue trips.
const LEGACY_SCHEDULE: ScheduledTrip[] = [
  {
    id: "manali-july-10",
    tripId: "manali",
    name: "Manali Kasol Escape",
    date: "2026-07-10",
    status: "completed",
    price: "₹9,999",
    duration: "5 Days / 4 Nights",
    slotsTotal: 20,
    slotsBooked: 20,
    departureTime: "9:00 PM",
    departurePoint: "IFFCO Chowk, Gurugram",
    subtitle: "Riverside Camping, Atal Tunnel snow point, and Old Manali cafe trails.",
    badge: "TRIP COMPLETED",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Himalayan%20mountains%20in%20Manali%2C%20Himachal%20Pradesh.jpg?width=1200"
  },
  {
    id: "vof-july-17",
    tripId: "valley-of-flowers",
    name: "Valley of Flowers Expedition",
    date: "2026-07-17",
    status: "completed",
    price: "₹14,999",
    duration: "6 Days / 5 Nights",
    slotsTotal: 20,
    slotsBooked: 20,
    departureTime: "9:00 PM",
    departurePoint: "IFFCO Chowk, Gurugram",
    subtitle: "UNESCO World Heritage trek, holy Hemkund Sahib, and hot spring healing.",
    badge: "TRIP COMPLETED",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Valley%20of%20flowers%20national%20park%2C%20Uttarakhand%2C%20India%2003.jpg?width=1200"
  },
  {
    id: "udaipur-aug-07",
    tripId: "udaipur-lakes",
    name: "Udaipur Lakes & Palaces",
    date: "2026-08-07",
    status: "completed",
    price: "₹10,499",
    duration: "3 Days / 2 Nights",
    slotsTotal: 40,
    slotsBooked: 36,
    departureTime: "9:00 PM",
    departurePoint: "IFFCO Chowk, Gurugram",
    subtitle: "City Palace, Kumbhalgarh, Ranakpur, Lake Pichola, and an Aravalli sunset finale.",
    badge: "TRIP COMPLETED",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20view%20of%20City%20Palace%20%28Udaipur%29%2C%20Rajasthan%2C%20India%20-2.jpg?width=1200"
  }
];

const UPCOMING_SCHEDULE: ScheduledTrip[] = [...LEGACY_SCHEDULE, ...buildWinterSchedule()];

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
  // Open on the first departure that's actually bookable, so visitors land on the live window
  // rather than on a month of already-completed trips.
  const firstOpenDeparture = useMemo(
    () =>
      [...UPCOMING_SCHEDULE]
        .filter((trip) => trip.status === "open")
        .sort((a, b) => a.date.localeCompare(b.date))[0] || null,
    [],
  );
  const initialDate = firstOpenDeparture ? new Date(`${firstOpenDeparture.date}T00:00:00`) : new Date();

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(firstOpenDeparture?.date ?? null);
  const [displayMode, setDisplayMode] = useState<"calendar" | "list">("calendar");

  // Picking a row in the Trip List pins that one departure on the right; picking a calendar date
  // clears it so the right panel goes back to cycling through every departure on that date.
  const [pinnedTripId, setPinnedTripId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const selectDate = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setPinnedTripId(null);
    setCarouselIndex(0);
  };

  const selectTripFromList = (trip: ScheduledTrip) => {
    setSelectedDateStr(trip.date);
    setPinnedTripId(trip.id);
    setCarouselIndex(0);
  };

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

  // Find the three published trips by departure date.
  const tripsByDate = useMemo(() => {
    const map: Record<string, ScheduledTrip[]> = {};
    UPCOMING_SCHEDULE.forEach(trip => {
      if (!map[trip.date]) {
        map[trip.date] = [];
      }
      map[trip.date].push(trip);
    });
    return map;
  }, []);

  // The winter season runs daily, so the full schedule is ~110 departures — far too many to dump
  // into the list view. Show the bookable ones in date order, capped, since that's what a visitor
  // browsing this list is actually choosing between.
  const timelineList = useMemo(() => {
    const sorted = [...UPCOMING_SCHEDULE].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const open = sorted.filter((trip) => trip.status === "open").slice(0, 24);
    return open.length > 0 ? open : sorted.slice(-12);
  }, []);

  // Active selected trips details display
  const tripsOnSelectedDate = selectedDateStr ? tripsByDate[selectedDateStr] || [] : [];
  // A pinned trip (chosen from the list) collapses the panel down to just that departure.
  const selectedTrips = pinnedTripId
    ? tripsOnSelectedDate.filter((trip) => trip.id === pinnedTripId)
    : tripsOnSelectedDate;

  const isCarousel = selectedTrips.length > 1;
  const activeIndex = isCarousel ? carouselIndex % selectedTrips.length : 0;
  const activeTrip = selectedTrips[activeIndex];

  const goToPrevTrip = () =>
    setCarouselIndex((i) => (i - 1 + selectedTrips.length) % selectedTrips.length);
  const goToNextTrip = () => setCarouselIndex((i) => (i + 1) % selectedTrips.length);

  // Auto-advance every 2s, paused while the pointer is over the panel (or the tab is hidden).
  useEffect(() => {
    if (!isCarousel || isCarouselPaused) return;
    const timer = window.setInterval(() => {
      setCarouselIndex((i) => (i + 1) % selectedTrips.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [isCarousel, isCarouselPaused, selectedTrips.length]);

  return (
    <section id="trip-calendar" className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FAF9F6] relative border-t border-b border-neutral-200 scroll-mt-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-500/[0.04] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 text-neutral-900">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#9C753B]" /> TRIP EXPEDITION SCHEDULER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight leading-tight text-neutral-900">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
                Calendar
              </span>
            </h2>
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light leading-relaxed">
            One clear schedule for every journey. Completed trips stay marked, while open dates show live seat availability.
          </p>
        </div>

        {/* Centered display switcher */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setDisplayMode("calendar")}
              className={`px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex-1 sm:flex-none inline-flex items-center justify-center gap-2 ${
                displayMode === "calendar" 
                  ? "bg-white text-[#9C753B] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Calendar View
            </button>
            <button
              onClick={() => setDisplayMode("list")}
              className={`px-5 py-2.5 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all flex-1 sm:flex-none inline-flex items-center justify-center gap-2 ${
                displayMode === "list" 
                  ? "bg-white text-[#9C753B] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <List className="w-3.5 h-3.5" /> Trip List
            </button>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Calendar or Chronological list */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-4 sm:p-5 shadow-lg">
            
            {displayMode === "calendar" ? (
              <div className="space-y-4">
                {/* Calendar Header / Month Select */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-brand-sand/15 rounded-lg text-[#9C753B]">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 uppercase font-display">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-1.5">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentYear(initialDate.getFullYear());
                        setCurrentMonth(initialDate.getMonth());
                        setSelectedDateStr(firstOpenDeparture?.date ?? null);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[9px] uppercase font-bold tracking-wider text-neutral-700 hover:text-[#9C753B] transition-all"
                    >
                      Next Departure
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
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  {WEEKDAYS.map(day => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {calendarDays.map((dayObj, idx) => {
                    const tripsOnDay = tripsByDate[dayObj.dateStr] || [];
                    const hasTrips = tripsOnDay.length > 0;
                    const isSelected = selectedDateStr === dayObj.dateStr;
                    
                    let bgClass = "bg-transparent hover:bg-neutral-50 border-neutral-100";
                    let ringClass = "";

                    if (hasTrips) {
                      bgClass = tripsOnDay[0].status === "completed"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/80 opacity-75"
                        : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100";
                    }

                    if (isSelected) {
                      ringClass = "ring-2 ring-neutral-800 ring-offset-2 ring-offset-white";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => selectDate(dayObj.dateStr)}
                        className={`relative aspect-square p-0.5 sm:p-2 flex flex-col justify-between items-center rounded-lg sm:rounded-xl border text-xs font-bold transition-all ${bgClass} ${ringClass} ${
                          hasTrips ? "font-black" : dayObj.isCurrentMonth ? "text-neutral-800" : "text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        {/* Day number */}
                        <span className="text-xs sm:text-sm font-semibold">{dayObj.dayNumber}</span>
                        
                        {/* Completed departures use a cross; open departures use a live dot. */}
                        {hasTrips && (
                          <div className="flex gap-1 justify-center mt-1">
                            {tripsOnDay.slice(0, 3).map((t, tIdx) => (
                              t.status === "completed" ? (
                                <CircleCheckBig key={tIdx} className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" strokeWidth={2.5} />
                              ) : (
                                <span key={tIdx} className="w-2 h-2 rounded-full bg-[#9C753B] shadow-sm animate-pulse" />
                              )
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-neutral-200 text-[10px] uppercase tracking-wider font-bold text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CircleCheckBig className="w-4 h-4 text-emerald-600" />
                    <span>Completed Trip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9C753B] animate-pulse" />
                    <span>Booking Open</span>
                  </div>
                </div>

              </div>
            ) : (
              /* Chronological Timeline List View */
              <div className="space-y-3 max-h-[430px] overflow-y-auto pr-1 custom-scrollbar">
                <h3 className="text-sm font-bold tracking-widest text-neutral-500 uppercase font-display border-b border-neutral-200 pb-2">
                  2026 Trip Departures
                </h3>
                {timelineList.map((trip) => {
                  const date = new Date(trip.date);
                  const isSelected = pinnedTripId ? pinnedTripId === trip.id : selectedDateStr === trip.date;
                  
                  return (
                    <div
                      key={trip.id}
                      onClick={() => selectTripFromList(trip)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${trip.status === "completed" ? "opacity-60 bg-neutral-100" : "bg-white"} ${
                        isSelected 
                          ? "bg-neutral-50 border-[#9C753B] shadow-md" 
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
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
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${trip.status === "completed" ? "bg-neutral-200 text-neutral-600 border-neutral-300" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
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
                            selectTripFromList(trip);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#9C753B] hover:text-white border border-neutral-200 text-[9px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1 transition-all"
                        >
                          View Trip
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right Column: Interaction Details Panel.
              With more than one departure on the selected date this becomes a carousel — one card
              at a time, auto-advancing every 2s, paused while the pointer is over the panel.
              A trip pinned from the Trip List shows on its own, so no arrows or dots appear. */}
          <div
            className="lg:col-span-5 h-full"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocusCapture={() => setIsCarouselPaused(true)}
            onBlurCapture={() => setIsCarouselPaused(false)}
          >
            <AnimatePresence mode="wait">
              {selectedTrips.length > 0 ? (
                <div className="space-y-3">
                  {[activeTrip].map((trip) => {
                    const isCompleted = trip.status === "completed";
                    const slotsLeft = trip.slotsTotal - trip.slotsBooked;
                    const fillingPercentage = isCompleted ? 100 : (trip.slotsBooked / trip.slotsTotal) * 100;

                    return (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className={`bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between text-neutral-900 transition-opacity ${isCompleted ? "opacity-60" : "opacity-100"}`}
                      >
                        {/* Header cover */}
                        <div className="relative h-36 overflow-hidden">
                          <img 
                            src={trip.image} 
                            alt={trip.name} 
                            className={`w-full h-full object-cover brightness-[0.85] saturate-[1.05] ${isCompleted ? "grayscale-[0.45]" : ""}`}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 text-white font-black font-display text-[9px] tracking-widest uppercase rounded shadow-md border ${isCompleted ? "bg-neutral-700/90 border-neutral-600" : "bg-emerald-700/90 border-emerald-600"}`}>
                              {trip.badge}
                            </span>
                          </div>
                        </div>

                        {/* Contents */}
                        <div className="p-5 space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-col min-[380px]:flex-row min-[380px]:justify-between items-start gap-2 min-[380px]:gap-4">
                              <h3 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 font-display tracking-tight">
                                {trip.name}
                              </h3>
                              <span className={`text-lg font-black whitespace-nowrap ${isCompleted ? "text-neutral-500 line-through" : "text-[#9C753B]"}`}>
                                {isCompleted ? "FULL" : trip.price}
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
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-[10px] uppercase font-bold text-neutral-600">
                              <span className="flex items-center gap-1.5 font-bold text-neutral-700">
                                <Users className="w-3.5 h-3.5 text-[#9C753B]" />
                                <span>Slots Taken: {trip.slotsBooked} / {trip.slotsTotal}</span>
                              </span>
                              {isCompleted ? (
                                <span className="text-neutral-600 flex items-center gap-1 font-black">
                                  <CircleCheckBig className="w-3.5 h-3.5 text-emerald-600" /> FULL • COMPLETED
                                </span>
                              ) : slotsLeft <= 3 ? (
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
                                  isCompleted
                                    ? "bg-neutral-500"
                                    : slotsLeft <= 3
                                    ? "bg-gradient-to-r from-amber-500 to-rose-500" 
                                    : "bg-[#9C753B]"
                                }`} 
                                style={{ width: `${fillingPercentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Quick CTA Actions */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <button
                              onClick={() => onNavigate(trip.tripId as AppView)}
                              className="px-4 py-3 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                            >
                              <span>Itinerary</span>
                              <Compass className="w-3.5 h-3.5 text-[#9C753B]" />
                            </button>
                            <button
                              onClick={() => onOpenBooking(trip.tripId)}
                              disabled={isCompleted}
                              className={`px-4 py-3 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-md ${isCompleted ? "bg-neutral-400 cursor-not-allowed" : "bg-[#9C753B] hover:bg-neutral-900 active:scale-95"}`}
                            >
                              <span>{isCompleted ? "Completed" : "Book Now"}</span>
                              {isCompleted ? <CircleCheckBig className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Carousel controls — only when the date actually has more than one departure */}
                  {isCarousel && (
                    <div className="flex items-center justify-between gap-3 px-1">
                      <button
                        type="button"
                        onClick={goToPrevTrip}
                        aria-label="Previous departure"
                        className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm hover:border-[#9C753B] hover:text-[#9C753B] active:scale-95 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2" role="tablist" aria-label="Departures on this date">
                        {selectedTrips.map((trip, idx) => (
                          <button
                            key={trip.id}
                            type="button"
                            role="tab"
                            aria-selected={idx === activeIndex}
                            aria-label={`Show ${trip.name}`}
                            onClick={() => setCarouselIndex(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              idx === activeIndex
                                ? "w-8 bg-[#9C753B] shadow-sm"
                                : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={goToNextTrip}
                        aria-label="Next departure"
                        className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm hover:border-[#9C753B] hover:text-[#9C753B] active:scale-95 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  key="empty-date-state"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-lg text-center text-neutral-900 space-y-4"
                >
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-brand-sand/15 border border-brand-sand/30 flex items-center justify-center text-[#9C753B]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase font-display">No Trip On This Date</h3>
                    <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
                      Select one of the three marked dates or switch to Trip List to see every 2026 departure.
                    </p>
                  </div>
                  <button
                    onClick={() => setDisplayMode("list")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9C753B] text-white text-[10px] uppercase tracking-widest font-black hover:bg-neutral-900 transition-colors"
                  >
                    <List className="w-3.5 h-3.5" /> Open Trip List
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
