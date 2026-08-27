import React, { useState, useEffect } from "react";
import { TRIPS_LIST, TRIPS_DATA } from "../data";
import {
  Compass, Calendar, Timer, Users, ChevronDown,
  ChevronRight, Sparkles
} from "lucide-react";
import SiteHeader from "./SiteHeader";

interface HeroSectionProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
  onExploreClick: () => void;
}

const SHARED_HEADER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=1800&auto=format&fit=crop";

export default function HeroSection({
  currentView,
  onNavigate,
  onOpenBooking,
  onExploreClick
}: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const trips = TRIPS_LIST;
  const isSubPage = ["trips", "team", "about", "contact"].includes(currentView);
  const currentTrip = TRIPS_DATA[currentView] || trips[0];
  const headerImage = isSubPage ? SHARED_HEADER_IMAGE : currentTrip.heroImage;

  const heroHeightClass = isSubPage
    ? "h-[46svh] min-h-[360px] sm:h-[45vh]"
    : currentView === "home"
      ? "h-[100svh] min-h-[520px]"
      : "h-auto min-h-[100svh] lg:h-screen";

  return (
    <section className={`relative w-full bg-[#FAF9F6] flex flex-col justify-between text-white transition-all duration-700 ${heroHeightClass}`}>
      {/* Background layer — clipped to the hero's own bounds so the parallax image/video never
          spills out, without clipping the header's dropdown menu below (which can be taller than
          the remaining hero height on the shorter sub-page heroes). */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background: cinematic video on the homepage, parallax imagery everywhere else */}
        {currentView === "home" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source
              src="/images/hero/travo-hero-mobile-720p.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source
              src="/images/hero/travo-hero-720p.m4v"
              type="video/mp4"
              media="(min-width: 768px) and (max-width: 1023px)"
            />
            <source src="/images/hero/travo-hero.m4v" type="video/mp4" />
          </video>
        ) : (
          <div
            key={headerImage}
            className="absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-all duration-1000 ease-out saturate-[1.1] brightness-[0.8] contrast-[1.05] animate-[fadeIn_0.8s_ease-out]"
            style={{
              backgroundImage: `url(${headerImage})`,
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px) scale(1.05)`,
            }}
          />
        )}

        {/* Cinematic Overlays */}
        <div className={`absolute inset-0 pointer-events-none ${currentView === "home" ? "bg-gradient-to-b from-black/55 via-black/20 to-black/65" : "bg-gradient-to-t from-[#FAF9F6] via-transparent to-black/45"}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,rgba(0,0,0,0.42)_100%)] pointer-events-none" />

        {/* Ambient Starry Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-brand-sand rounded-full animate-[pulse_4s_infinite]" />
          <div className="absolute top-[10%] right-[40%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute top-[50%] left-[30%] w-1 h-1 bg-brand-sand rounded-full animate-pulse" />
        </div>
      </div>

      <SiteHeader
        currentView={currentView}
        onNavigate={onNavigate}
        variant="transparent"
      />

      {/* Center Body */}
      {currentView === "home" ? (
        // Homepage: just the video and the original tagline — no badge, no booking card.
        <div className="relative z-10 flex w-full flex-grow items-center justify-center px-4 sm:px-6 pb-16 sm:pb-20 pt-8 sm:pt-10 text-center">
          <div className="max-w-4xl animate-[fadeIn_0.8s_ease-out]">
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-4xl lg:text-5xl">
              <span className="block">Go beyond the map.</span>
              <span className="block text-brand-sand">Come home with a story.</span>
            </h1>
          </div>
        </div>
      ) : isSubPage ? (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-4 my-auto py-12 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-[10px] font-black uppercase tracking-widest text-brand-sand">
            <Sparkles className="w-3.5 h-3.5 text-brand-sand animate-pulse" />
            {currentView === "trips" && "Curated Departures Across India, Bhutan & Nepal"}
            {currentView === "team" && "Certified Rescue Captains"}
            {currentView === "about" && "Founded by Backpackers"}
            {currentView === "contact" && "24/7 Dispatch Center"}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase font-display drop-shadow-xl text-white">
            {currentView === "trips" && "Expedition Catalogue"}
            {currentView === "team" && "Meet The Captains"}
            {currentView === "about" && "The TRAVO Story"}
            {currentView === "contact" && "Get in Touch"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed font-light drop-shadow">
            {currentView === "trips" && "From misty tea valleys in Munnar to tropical islands in Andaman, explore our hand-curated small-group departure dates."}
            {currentView === "team" && "Meet the certified mountaineers, wilderness first-responders, and local specialists leading your next safe escape."}
            {currentView === "about" && "How three freezing solo backpackers around a Kasol bonfire decided to build India's most intimate premium road-trip travel club."}
            {currentView === "contact" && "Have a question about group composition, custom corporate departures, or road safety? Our coordination team is active 24/7."}
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 flex-grow mb-12 my-auto">

          {/* Left Side: Dramatic Typography Hero Text */}
          <div className="w-full lg:w-3/5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-brand-sand">
              <Sparkles className="w-3.5 h-3.5 text-brand-sand" />
              GROUP BATCH DEPARTURE
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight select-none uppercase font-display drop-shadow-lg text-white">
              {currentTrip.name.split(" ").slice(0, 2).join(" ")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-200">
                {currentTrip.name.split(" ").slice(2).join(" ") || "EXPEDITION"}
              </span>
            </h1>

            <p className="text-lg md:text-xl font-bold text-white border-l-4 border-brand-sand pl-4 py-1 italic drop-shadow-md">
              "{currentTrip.subtitle}"
            </p>

            <p className="text-xs md:text-sm text-gray-100 max-w-lg leading-relaxed font-normal drop-shadow">
              {currentTrip.experienceMoments && currentTrip.experienceMoments.length > 0
                ? currentTrip.experienceMoments.slice(0, 3).map(m => m.title).join(" • ")
                : `${currentTrip.subtitle} — Handcrafted boutique itinerary with private sanitized vehicle transfers, verified star hotels, and dedicated local captain guidance.`}
            </p>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onOpenBooking(currentTrip.id)}
                className="px-8 py-4 bg-[#9C753B] hover:bg-[#7C552B] text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Secure Your Seat
              </button>
              <button
                onClick={onExploreClick}
                className="px-6 py-4 border border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow"
              >
                <span>Scroll to Story</span>
              </button>
            </div>
          </div>

          {/* Right Side: Floating Frosted Light Glassmorphism Summary Card */}
          <div className="w-full sm:w-4/5 lg:w-[380px] p-[1px] rounded-3xl bg-gradient-to-b from-white/60 via-white/20 to-transparent shadow-2xl backdrop-blur-xl">
            <div className="p-6 rounded-3xl bg-white/90 text-left space-y-5 border border-white/40">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Trip Specifications
                </span>
                <span className="px-2.5 py-1 rounded text-[9px] font-black bg-[#9C753B]/10 text-[#9C753B] border border-[#9C753B]/30 uppercase animate-pulse">
                  Deluxe Batch
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '25s' }} />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Expedition Route</p>
                  <p className="text-sm font-extrabold text-neutral-900">
                    {currentTrip.routeStops && currentTrip.routeStops.length > 1
                      ? `${currentTrip.routeStops[0].name} to ${currentTrip.routeStops[currentTrip.routeStops.length - 1].name}`
                      : `${currentTrip.name} Circuit`}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Upcoming Departure</p>
                  <p className="text-sm font-extrabold text-neutral-900">{currentTrip.upcomingDeparture}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Journey Span</p>
                  <p className="text-sm font-extrabold text-neutral-900 font-mono">{currentTrip.duration}</p>
                </div>
              </div>

              {/* Trip Type */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider text-neutral-400">Experience Type</p>
                  <p className="text-sm font-extrabold text-neutral-900">Cozy Group (Age 18-35)</p>
                </div>
              </div>

              {/* Pricing Tag Extra */}
              <div className="bg-brand-sand/10 p-4 rounded-2xl flex justify-between items-center border border-brand-sand/20">
                <div>
                  <p className="text-[9px] text-neutral-500 uppercase font-black">Starting Point Fare</p>
                  <p className="text-lg font-black text-neutral-900">{currentTrip.price} <span className="text-[10px] font-normal text-neutral-500">/ user</span></p>
                </div>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-200 uppercase">
                  Tolls Incl.
                </span>
              </div>

              {/* Direct CTA */}
              <button
                onClick={() => onOpenBooking(currentTrip.id)}
                className="w-full py-3.5 text-center bg-[#9C753B] hover:bg-[#7C552B] transition-all font-black text-xs uppercase tracking-widest text-white rounded-2xl shadow active:scale-[0.98]"
              >
                Book {currentTrip.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Indicator */}
      {!isSubPage && (
        <div
          onClick={onExploreClick}
          className="relative z-20 pb-6 text-center cursor-pointer flex flex-col items-center gap-1 hover:text-brand-sand transition-colors animate-bounce"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-200 drop-shadow">
            {currentView === "home" ? "Scroll to explore trips" : "Scroll to unveil story"}
          </span>
          <ChevronDown className="w-4 h-4 text-brand-sand" />
        </div>
      )}
    </section>
  );
}
