import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Compass, Flame, Sparkles, Timer, Users } from "lucide-react";
import { TRIPS_DATA, TRIPS_LIST } from "../data";
import { AppView } from "../App";

interface HeroSectionProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenBooking: (tripId: string) => void;
  onExploreClick: () => void;
}

export default function HeroSection({ currentView, onNavigate, onOpenBooking, onExploreClick }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const trips = TRIPS_LIST;
  const currentTrip = currentView === "home" ? trips[activeIndex] : TRIPS_DATA[currentView];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (currentView !== "home") return;
    const interval = setInterval(() => setActiveIndex((prev) => (prev + 1) % trips.length), 8000);
    return () => clearInterval(interval);
  }, [currentView, trips.length]);

  const splitName = currentTrip.name.split(" ");
  const firstLine = splitName.slice(0, 2).join(" ");
  const secondLine = splitName.slice(2).join(" ") || "EXPEDITION";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-charcoal flex flex-col justify-between text-white">
      <div
        key={currentTrip.id}
        className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-all duration-1000 ease-out saturate-[1.1] brightness-[0.75] contrast-[1.05] animate-[fadeIn_0.8s_ease-out]"
        style={{
          backgroundImage: `url(${currentTrip.heroImage})`,
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.05)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-black/40 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(11,13,17,0.1)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between pointer-events-auto">
        <button onClick={() => onNavigate("home")} className="flex items-center group focus:outline-none">
          <span className="h-14 w-36 md:w-44 overflow-hidden rounded-md border border-white/10 bg-brand-sand-light shadow-lg shadow-black/30 transition-transform group-hover:scale-105 active:scale-95 flex items-center justify-center p-1">
            <img
              src="/images/travo-logo.jpeg"
              alt="TRAVO"
              className="h-full w-full object-contain object-center"
              decoding="async"
            />
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-6 text-xs font-black tracking-widest text-gray-300">
          <button onClick={() => onNavigate("home")} className={`hover:text-brand-sand transition-colors ${currentView === "home" ? "text-brand-sand border-b-2 border-brand-sand pb-1" : ""}`}>HOME</button>
          <button onClick={() => onNavigate("manali")} className={`hover:text-brand-sand transition-colors ${currentView === "manali" ? "text-brand-sand border-b-2 border-brand-sand pb-1" : ""}`}>MANALI-KASOL</button>
          <button onClick={() => onNavigate("valley-of-flowers")} className={`hover:text-brand-sand transition-colors ${currentView === "valley-of-flowers" ? "text-brand-sand border-b-2 border-brand-sand pb-1" : ""}`}>VALLEY OF FLOWERS</button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] animate-pulse">
            <Flame className="w-3 h-3 fill-current" /> NEXT BATCH DEPARTING SOON
          </span>
        </nav>

        <button onClick={() => onOpenBooking(currentTrip.id)} className="px-5 py-2.5 text-[10px] uppercase tracking-widest font-black text-brand-charcoal bg-brand-sand hover:bg-white transition-all rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-black/40">
          Book Now
        </button>
      </header>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 flex-grow mb-12 my-auto">
        <div className="w-full lg:w-3/5 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-widest text-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-sand" /> {currentView === "home" ? "ACTIVE HIMALAYAN EXPEDITIONS" : "HIGH-ALTITUDE GROUP BATCH"}
          </div>
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight select-none uppercase font-display">
            {firstLine} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-400">{secondLine}</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-200 border-l-4 border-brand-sand pl-4 py-1 italic">"{currentTrip.subtitle}"</p>
          <p className="text-xs md:text-sm text-gray-300 max-w-lg leading-relaxed font-light">
            {currentTrip.id === "manali"
              ? "Snow adventures, Old Manali cafe hopping, riverside dome camping, DJ night, and hot spring visits."
              : "Explore UNESCO floral meadows, Hemkund Sahib, Badrinath Temple, and Tapt Kund hot springs."}
          </p>
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            {currentView === "home" ? (
              <button onClick={() => onNavigate(currentTrip.id as AppView)} className="px-8 py-4 bg-brand-sand hover:bg-white text-brand-charcoal font-black uppercase text-xs tracking-widest rounded-full shadow-lg shadow-black/40 hover:scale-105 transition-all flex items-center gap-2">
                <span>Explore Full Details</span><ChevronRight className="w-4 h-4 text-brand-charcoal" />
              </button>
            ) : (
              <button onClick={() => onOpenBooking(currentTrip.id)} className="px-8 py-4 bg-brand-sand hover:bg-white text-brand-charcoal font-black uppercase text-xs tracking-widest rounded-full shadow-lg shadow-black/40 hover:scale-105 transition-all">Secure Your Seat</button>
            )}
            <button onClick={onExploreClick} className="px-6 py-4 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2">Scroll to Story</button>
          </div>
        </div>

        <div className="w-full sm:w-4/5 lg:w-[380px] p-[1px] rounded-3xl bg-gradient-to-b from-white/25 via-white/5 to-transparent shadow-2xl backdrop-blur-xl">
          <div className="p-6 rounded-3xl bg-brand-charcoal/80 text-left space-y-5 border border-white/5">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trip Specifications</span>
              <span className="px-2.5 py-1 rounded text-[9px] font-black bg-brand-sand/20 text-brand-sand border border-brand-sand/30 uppercase animate-pulse">Deluxe Batch</span>
            </div>
            <Spec icon={<Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "25s" }} />} label="Expedition Highway" value={currentTrip.id === "manali" ? "Delhi to Manikaran Loop" : "Delhi to Hemkund Route"} />
            <Spec icon={<Calendar className="w-4 h-4" />} label="Upcoming Departure" value={currentTrip.upcomingDeparture} />
            <Spec icon={<Timer className="w-4 h-4" />} label="Journey Span" value={currentTrip.duration} />
            <Spec icon={<Users className="w-4 h-4" />} label="Experience Type" value="Cozy Group (Age 18-35)" />
            <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
              <div><p className="text-[9px] text-gray-400 uppercase font-black">Starting Point Fare</p><p className="text-lg font-black text-white">{currentTrip.price} <span className="text-[10px] font-normal text-gray-400">/ user</span></p></div>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 uppercase">Tolls Incl.</span>
            </div>
            <button onClick={() => onOpenBooking(currentTrip.id)} className="w-full py-3.5 text-center bg-brand-sand hover:bg-white transition-all font-black text-xs uppercase tracking-widest text-brand-charcoal rounded-2xl shadow-lg active:scale-[0.98]">
              Book {currentTrip.name.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>

      {currentView === "home" && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5">
          <button onClick={() => setActiveIndex((prev) => (prev - 1 + trips.length) % trips.length)} className="p-2 rounded-full bg-black/40 hover:bg-brand-sand hover:text-brand-charcoal border border-white/10 transition-all text-white active:scale-90"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex items-center gap-2">{trips.map((trip, idx) => <button key={trip.id} onClick={() => setActiveIndex(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-brand-sand" : "w-2.5 bg-white/30 hover:bg-white/50"}`} />)}</div>
          <button onClick={() => setActiveIndex((prev) => (prev + 1) % trips.length)} className="p-2 rounded-full bg-black/40 hover:bg-brand-sand hover:text-brand-charcoal border border-white/10 transition-all text-white active:scale-90"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}

      <button onClick={onExploreClick} className="relative z-20 pb-6 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-brand-sand transition-colors animate-bounce mx-auto">
        <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-400">Scroll to unveil story</span>
        <ChevronDown className="w-4 h-4 text-brand-sand" />
      </button>
    </section>
  );
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-white/5 text-brand-sand">{icon}</div>
      <div><p className="text-[9px] uppercase font-black tracking-wider text-gray-400">{label}</p><p className="text-sm font-extrabold text-white">{value}</p></div>
    </div>
  );
}
