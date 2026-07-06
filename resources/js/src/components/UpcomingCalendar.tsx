import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Calendar, Check, ChevronLeft, ChevronRight, Clock, Compass, Flame, Info, MapPin, Sparkles, Users } from "lucide-react";
import { AppView } from "../App";
import { TRIPS_DATA } from "../data";

interface ScheduledTrip {
  id: string;
  tripId: "manali" | "valley-of-flowers";
  name: string;
  type: "adventure" | "unesco" | "weekend";
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

const UPCOMING_SCHEDULE: ScheduledTrip[] = [
  { id: "manali-july-10", tripId: "manali", name: "Manali Kasol Escape", type: "adventure", date: "2026-07-10", price: "Rs. 9,999", duration: "5 Days / 4 Nights", slotsTotal: 16, slotsBooked: 13, departureTime: "9:00 PM", departurePoint: "Majnu ka Tilla, Delhi", subtitle: "Riverside camping, Atal Tunnel snow point, and Old Manali cafe trails.", badge: "POPULAR BATCH", image: TRIPS_DATA.manali.heroImage },
  { id: "vof-july-17", tripId: "valley-of-flowers", name: "Valley of Flowers Expedition", type: "unesco", date: "2026-07-17", price: "Rs. 14,999", duration: "6 Days / 5 Nights", slotsTotal: 12, slotsBooked: 10, departureTime: "9:00 PM", departurePoint: "Akshardham Metro Station, Delhi", subtitle: "UNESCO trek, Hemkund Sahib, and hot spring healing.", badge: "PEAK BLOOM", image: TRIPS_DATA["valley-of-flowers"].heroImage },
  { id: "manali-july-24", tripId: "manali", name: "Manali Kasol Escape", type: "adventure", date: "2026-07-24", price: "Rs. 9,999", duration: "5 Days / 4 Nights", slotsTotal: 16, slotsBooked: 8, departureTime: "9:00 PM", departurePoint: "Majnu ka Tilla, Delhi", subtitle: "Snow, camps, cafes, and group bonfires.", badge: "COZY BATCH", image: TRIPS_DATA.manali.bannerImage },
  { id: "vof-july-31", tripId: "valley-of-flowers", name: "Valley of Flowers Expedition", type: "unesco", date: "2026-07-31", price: "Rs. 14,999", duration: "6 Days / 5 Nights", slotsTotal: 12, slotsBooked: 5, departureTime: "9:00 PM", departurePoint: "Akshardham Metro Station, Delhi", subtitle: "Wildflower meadows, Ghangaria base, and alpine lake trek.", badge: "RARE FLORA SEEN", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
  { id: "manali-aug-07", tripId: "manali", name: "Manali Kasol Escape", type: "adventure", date: "2026-08-07", price: "Rs. 9,999", duration: "5 Days / 4 Nights", slotsTotal: 16, slotsBooked: 14, departureTime: "9:00 PM", departurePoint: "Majnu ka Tilla, Delhi", subtitle: "Riverside camping, Old Manali lanes, and Atal Tunnel route.", badge: "SELLS OUT FAST", image: TRIPS_DATA.manali.bannerImage },
  { id: "vof-aug-14", tripId: "valley-of-flowers", name: "Valley of Flowers Expedition", type: "unesco", date: "2026-08-14", price: "Rs. 14,999", duration: "6 Days / 5 Nights", slotsTotal: 12, slotsBooked: 11, departureTime: "9:00 PM", departurePoint: "Akshardham Metro Station, Delhi", subtitle: "Monsoon bloom, sacred trails, and Badrinath Darshan.", badge: "MONSOON PEAK", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop" },
  { id: "kheerganga-aug-21", tripId: "manali", name: "Parvati Valley & Kheerganga Trek", type: "weekend", date: "2026-08-21", price: "Rs. 4,999", duration: "3 Days / 2 Nights", slotsTotal: 20, slotsBooked: 12, departureTime: "8:30 PM", departurePoint: "Kashmere Gate, Delhi", subtitle: "Pine trails, hot springs, and starlit dome tents.", badge: "WEEKEND RETREAT", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop" },
];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface UpcomingCalendarProps {
  onNavigate: (view: AppView) => void;
  onOpenBooking: (tripId: string) => void;
}

export default function UpcomingCalendar({ onNavigate, onOpenBooking }: UpcomingCalendarProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>("2026-07-10");
  const [filterType, setFilterType] = useState<"all" | "adventure" | "unesco" | "weekend">("all");
  const [displayMode, setDisplayMode] = useState<"calendar" | "list">("calendar");
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [customSuccess, setCustomSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    const days: { dayNumber: number; dateStr: string; isCurrentMonth: boolean }[] = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i;
      const month = currentMonth === 0 ? 12 : currentMonth;
      const year = currentMonth === 0 ? currentYear - 1 : currentYear;
      days.push({ dayNumber: dayNum, dateStr: `${year}-${String(month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`, isCurrentMonth: false });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({ dayNumber: i, dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`, isCurrentMonth: true });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const month = currentMonth === 11 ? 1 : currentMonth + 2;
      const year = currentMonth === 11 ? currentYear + 1 : currentYear;
      days.push({ dayNumber: i, dateStr: `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`, isCurrentMonth: false });
    }
    return days;
  }, [currentYear, currentMonth]);

  const tripsByDate = useMemo(() => {
    const map: Record<string, ScheduledTrip[]> = {};
    UPCOMING_SCHEDULE.forEach((trip) => {
      if (filterType !== "all" && trip.type !== filterType) return;
      map[trip.date] = [...(map[trip.date] || []), trip];
    });
    return map;
  }, [filterType]);

  const filteredTimelineList = useMemo(() => UPCOMING_SCHEDULE.filter((trip) => filterType === "all" || trip.type === filterType).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), [filterType]);
  const selectedTrips = selectedDateStr ? tripsByDate[selectedDateStr] || [] : [];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCustomSuccess(true);
      setCustomName("");
      setCustomEmail("");
    }, 900);
  };

  const filterButton = (type: "all" | "adventure" | "unesco" | "weekend", label: string) => (
    <button
      onClick={() => { setFilterType(type); setSelectedDateStr(null); }}
      className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all ${filterType === type ? "bg-brand-sand text-brand-charcoal" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}
    >
      {label}
    </button>
  );

  return (
    <section id="trip-calendar" className="py-24 px-6 bg-[#050B14] relative border-t border-white/5 scroll-mt-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-sand/[0.03] rounded-full filter blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-brand-sand" /> TRIP EXPEDITION SCHEDULER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight leading-tight">
              Upcoming Adventure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">Departure Calendar</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md font-light leading-relaxed">
            Select highlighted dates to explore group batches, see active slots, or pitch custom group dates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-[#0B0D11]/90 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {filterButton("all", "All Tours")}
            {filterButton("adventure", "Adventure")}
            {filterButton("unesco", "UNESCO")}
            {filterButton("weekend", "Weekends")}
          </div>
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5 w-full sm:w-auto">
            <button onClick={() => setDisplayMode("calendar")} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-black transition-all flex-1 sm:flex-none ${displayMode === "calendar" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>Calendar Grid</button>
            <button onClick={() => setDisplayMode("list")} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-black transition-all flex-1 sm:flex-none ${displayMode === "list" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>List ({filteredTimelineList.length})</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#090D16]/40 border border-white/5 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
            {displayMode === "calendar" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-brand-sand/10 rounded-lg text-brand-sand"><Calendar className="w-5 h-5" /></span>
                    <h3 className="text-xl font-bold tracking-tight text-white uppercase font-display">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={handlePrevMonth} className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-gray-300"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => { setCurrentYear(2026); setCurrentMonth(6); }} className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-[9px] uppercase font-bold tracking-wider text-gray-300">Reset</button>
                    <button onClick={handleNextMonth} className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-gray-300"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase tracking-widest text-gray-500">{WEEKDAYS.map((day) => <div key={day} className="py-2">{day}</div>)}</div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((dayObj) => {
                    const tripsOnDay = tripsByDate[dayObj.dateStr] || [];
                    const hasTrips = tripsOnDay.length > 0;
                    const isSelected = selectedDateStr === dayObj.dateStr;
                    const type = tripsOnDay[0]?.type;
                    const bgClass = !hasTrips ? "bg-transparent hover:bg-white/5 border-transparent" : type === "adventure" ? "bg-amber-500/15 text-brand-sand border-amber-500/20" : type === "unesco" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" : "bg-purple-500/15 text-purple-300 border-purple-500/20";
                    return (
                      <button key={dayObj.dateStr} onClick={() => setSelectedDateStr(dayObj.dateStr)} className={`relative aspect-square p-1 sm:p-2 flex flex-col justify-between items-center rounded-xl border text-xs font-bold transition-all ${bgClass} ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-brand-charcoal" : ""} ${dayObj.isCurrentMonth ? "text-white" : "text-gray-600 hover:text-gray-400"}`}>
                        <span className="text-xs sm:text-sm font-semibold">{dayObj.dayNumber}</span>
                        {hasTrips && <div className="flex gap-1 justify-center mt-1">{tripsOnDay.slice(0, 3).map((trip) => <span key={trip.id} className={`w-1.5 h-1.5 rounded-full ${trip.type === "adventure" ? "bg-brand-sand" : trip.type === "unesco" ? "bg-emerald-400" : "bg-purple-400"}`} />)}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase font-display border-b border-white/5 pb-2">All Filtered Upcoming Departures</h3>
                {filteredTimelineList.map((trip) => <ScheduleRow key={trip.id} trip={trip} selected={selectedDateStr === trip.date} onSelect={() => setSelectedDateStr(trip.date)} />)}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {selectedTrips.length > 0 ? (
                <div className="space-y-4">
                  {selectedTrips.map((trip) => <TripCard key={trip.id} trip={trip} onNavigate={onNavigate} onOpenBooking={onOpenBooking} />)}
                </div>
              ) : (
                <motion.div key="custom-request-state" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="bg-[#090D16] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-6">
                  <div className="space-y-2 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 text-brand-sand text-xs font-black uppercase tracking-widest"><Sparkles className="w-4 h-4" /> Custom Expedition Request</div>
                    <h3 className="text-xl font-black uppercase font-display text-white">Want a private departure?</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">No open-group departures selected. Pitch a private corporate or family expedition.</p>
                  </div>
                  {!customSuccess ? (
                    <form onSubmit={handleCustomSubmit} className="space-y-4">
                      <input required value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Your Name" className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-sand/50" />
                      <input required type="email" value={customEmail} onChange={(e) => setCustomEmail(e.target.value)} placeholder="adventurer@gmail.com" className="w-full bg-[#050B14] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-sand/50" />
                      <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-brand-sand text-brand-charcoal font-black uppercase text-[10px] tracking-widest rounded-xl transition-all hover:bg-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
                        {isSubmitting ? "PITCHING REQUEST..." : <><span>Request Custom Departure</span><ArrowRight className="w-3.5 h-3.5" /></>}
                      </button>
                    </form>
                  ) : (
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-4">
                      <div className="mx-auto w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400"><Check className="w-5 h-5" /></div>
                      <p className="text-[11px] text-gray-400">Request lodged. Our captain will email you within 2 hours.</p>
                    </div>
                  )}
                  <div className="flex items-start gap-2.5 p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <Info className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 leading-normal">Custom private departures require a minimum squad of 8 travelers.</p>
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

function ScheduleRow({ trip, selected, onSelect }: { trip: ScheduledTrip; selected: boolean; onSelect: () => void }) {
  const date = new Date(trip.date);
  return (
    <button onClick={onSelect} className={`w-full p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-left ${selected ? "bg-white/5 border-brand-sand/50 shadow-md" : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"}`}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center w-12 h-14 bg-white/5 rounded-xl border border-white/5 text-center px-1"><span className="text-[9px] uppercase font-bold text-brand-sand">{date.toLocaleString("default", { month: "short" })}</span><span className="text-lg font-black text-white leading-none">{date.getDate()}</span></div>
        <div className="space-y-1"><span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-brand-sand/10 text-brand-sand border border-brand-sand/20">{trip.badge}</span><h4 className="text-sm font-black text-white uppercase font-display">{trip.name}</h4></div>
      </div>
      <p className="text-sm font-black text-white">{trip.price}</p>
    </button>
  );
}

function TripCard({ trip, onNavigate, onOpenBooking }: { trip: ScheduledTrip; onNavigate: (view: AppView) => void; onOpenBooking: (tripId: string) => void }) {
  const slotsLeft = trip.slotsTotal - trip.slotsBooked;
  const fillingPercentage = (trip.slotsBooked / trip.slotsTotal) * 100;
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="bg-[#090D16] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
      <div className="relative h-44 overflow-hidden">
        <img src={trip.image} alt={trip.name} className="w-full h-full object-cover brightness-75 saturate-[1.05]" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-charcoal/80 backdrop-blur-md text-brand-sand font-black font-display text-[9px] tracking-widest uppercase rounded border border-brand-sand/20">{trip.badge}</span>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2"><div className="flex justify-between items-start gap-4"><h3 className="text-2xl font-black uppercase text-white font-display tracking-tight">{trip.name}</h3><span className="text-lg font-black text-brand-sand whitespace-nowrap">{trip.price}</span></div><p className="text-xs text-gray-400 font-light leading-relaxed">{trip.subtitle}</p></div>
        <div className="grid grid-cols-2 gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
          <Spec icon={<Clock className="w-3.5 h-3.5 text-brand-sand" />} label="Departure" value={trip.departureTime} />
          <Spec icon={<Calendar className="w-3.5 h-3.5 text-brand-sand" />} label="Duration" value={trip.duration} />
          <div className="col-span-2"><Spec icon={<MapPin className="w-3.5 h-3.5 text-brand-sand" />} label="Assembly Point" value={trip.departurePoint} /></div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400"><span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-brand-sand" /> Slots: {trip.slotsBooked} / {trip.slotsTotal}</span>{slotsLeft <= 3 ? <span className="text-amber-400 flex items-center gap-1 animate-pulse"><Flame className="w-3.5 h-3.5" /> ONLY {slotsLeft} LEFT</span> : <span>{slotsLeft} Spots Open</span>}</div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10"><div className={`h-full rounded-full transition-all duration-1000 ${slotsLeft <= 3 ? "bg-gradient-to-r from-amber-500 to-rose-500" : "bg-brand-sand"}`} style={{ width: `${fillingPercentage}%` }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button onClick={() => onNavigate(trip.tripId)} className="px-4 py-3 border border-white/10 hover:bg-white/5 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5">Itinerary <Compass className="w-3.5 h-3.5" /></button>
          <button onClick={() => onOpenBooking(trip.tripId)} className="px-4 py-3 bg-brand-sand text-brand-charcoal font-black uppercase text-[10px] tracking-widest rounded-xl transition-all hover:bg-white flex items-center justify-center gap-1.5 shadow-lg active:scale-95">Fast Book <Sparkles className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </motion.div>
  );
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="space-y-1"><span className="text-[9px] font-mono text-gray-500 uppercase block">{label}</span><div className="flex items-center gap-1.5 text-xs text-white">{icon}<span className="line-clamp-1">{value}</span></div></div>;
}
