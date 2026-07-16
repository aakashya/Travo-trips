import React, { useState, useEffect, useRef } from "react";
import { DayTimelineItem } from "../types";
import { Quote, Clock, Snowflake, Flame, Compass, Sun, Eye, Navigation, MapPin, Sparkles, Footprints, Tent, Coffee, Music, Home, Flower, Waves, GitMerge, Utensils } from "lucide-react";

interface StoryTimelineProps {
  items: DayTimelineItem[];
  tripId: string;
}

// Map iconType strings from data.ts to Lucide components
function getIconComponent(iconName: string) {
  switch (iconName) {
    case "Clock": return Clock;
    case "Snowflake": return Snowflake;
    case "Flame": return Flame;
    case "Compass": return Compass;
    case "Sun": return Sun;
    case "Eye": return Eye;
    case "Navigation": return Navigation;
    case "MapPin": return MapPin;
    case "Footprints": return Footprints;
    case "Tent": return Tent;
    case "Coffee": return Coffee;
    case "Music": return Music;
    case "Home": return Home;
    case "Flower": return Flower;
    case "Waves": return Waves;
    case "GitMerge": return GitMerge;
    case "Utensils": return Utensils;
    default: return MapPin;
  }
}

export default function StoryTimeline({ items, tripId }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [pathD, setPathD] = useState("");
  const [carState, setCarState] = useState({ x: 0, y: 0, angle: 90 });
  const [activeDay, setActiveDay] = useState(0);

  // Get the default telemetry or fall back gracefully
  const getDayTelemetry = (index: number) => {
    const item = items[index];
    if (item && item.telemetry) {
      return {
        ...item.telemetry,
        iconType: getIconComponent(item.telemetry.iconType)
      };
    }
    return {
      loc: "HIMALAYAN HIGHWAY",
      icon: "🏔️",
      alt: "2,050m Alt",
      temp: "12°C Crisp",
      distance: "540 KM",
      iconType: Compass
    };
  };

  // Re-calculate modern road path coordinates dynamically based on milestone elements
  const updateRoadPath = () => {
    if (!timelineRef.current) return;
    const parentRect = timelineRef.current.getBoundingClientRect();
    const measuredCoords: { x: number; y: number }[] = [];

    for (let i = 0; i < items.length; i++) {
      const anchorEl = document.getElementById(`road-anchor-${i}`);
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        const relX = rect.left - parentRect.left + rect.width / 2;
        const relY = rect.top - parentRect.top + rect.height / 2;
        measuredCoords.push({ x: relX, y: relY });
      }
    }

    if (measuredCoords.length > 0) {
      let d = `M ${measuredCoords[0].x} ${measuredCoords[0].y}`;
      for (let i = 0; i < measuredCoords.length - 1; i++) {
        const curr = measuredCoords[i];
        const next = measuredCoords[i + 1];
        const dy = next.y - curr.y;

        const cp1x = curr.x;
        const cp1y = curr.y + dy * 0.45;
        const cp2x = next.x;
        const cp2y = next.y - dy * 0.45;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
      }
      setPathD(d);
    }
  };

  useEffect(() => {
    updateRoadPath();

    window.addEventListener("resize", updateRoadPath);
    window.addEventListener("load", updateRoadPath);

    const intervalIds = [
      setTimeout(updateRoadPath, 150),
      setTimeout(updateRoadPath, 500),
      setTimeout(updateRoadPath, 1200),
      setTimeout(updateRoadPath, 2500),
      setTimeout(updateRoadPath, 4000),
    ];

    return () => {
      window.removeEventListener("resize", updateRoadPath);
      window.removeEventListener("load", updateRoadPath);
      intervalIds.forEach(clearTimeout);
    };
  }, [items, tripId]);

  // Sync scroll positioning of traveler camper van
  useEffect(() => {
    let rAF: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const onScroll = () => {
      if (!timelineRef.current || !pathRef.current || !items.length) return;

      const firstAnchor = document.getElementById("road-anchor-0");
      const lastAnchor = document.getElementById(`road-anchor-${items.length - 1}`);
      if (!firstAnchor || !lastAnchor) return;

      const viewportHeight = window.innerHeight;
      const firstRect = firstAnchor.getBoundingClientRect();
      const lastRect = lastAnchor.getBoundingClientRect();
      const firstCenterY = firstRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top + lastRect.height / 2;
      const startTriggerY = viewportHeight * 0.78;
      const endTriggerY = viewportHeight * 0.42;
      const roadViewportSpan = Math.max(lastCenterY - firstCenterY, 1);
      const scrollSpan = roadViewportSpan + (startTriggerY - endTriggerY);
      const pct = Math.max(0, Math.min(1, (startTriggerY - firstCenterY) / scrollSpan));
      targetProgress = pct;

      // Set active highlight day item based on progress
      const index = Math.floor(pct * (items.length - 0.01));
      setActiveDay(index);
    };

    const runGlidePhysics = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;

      const path = pathRef.current;
      if (path) {
        try {
          const totalLength = path.getTotalLength();
          if (totalLength > 0) {
            const distance = currentProgress * totalLength;
            const pt = path.getPointAtLength(distance);

            const aheadDist = Math.min(distance + 6, totalLength);
            const behindDist = Math.max(distance - 6, 0);
            const pAhead = path.getPointAtLength(aheadDist);
            const pBehind = path.getPointAtLength(behindDist);

            const dx = pAhead.x - pBehind.x;
            const dy = pAhead.y - pBehind.y;
            const tangentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            setCarState({
              x: pt.x,
              y: pt.y,
              angle: isNaN(tangentAngle) ? 90 : tangentAngle,
            });
          }
        } catch (e) {
          // Fallback if SVG unready
        }
      }

      rAF = requestAnimationFrame(runGlidePhysics);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    
    onScroll();
    runGlidePhysics();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rAF);
    };
  }, [pathD, items.length]);

  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`timeline-section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section 
      id="story-timeline" 
      ref={timelineRef}
      className="relative bg-[#FAF9F6] py-32 px-4 sm:px-6 overflow-hidden border-t border-neutral-200"
    >
      {/* Decorative starry skies and grids fallback */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(156,117,59,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* 1. Asphalt Serpent Road layer - strictly behind the card overlays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
        <svg className="w-full h-full" style={{ minHeight: "100%" }}>
          {pathD && (
            <>
              {/* Outer Gravel shoulder shadow */}
              <path
                d={pathD}
                fill="none"
                stroke="#FAF9F6"
                strokeWidth={36}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.8}
              />
              {/* Asphalt Road Base */}
              <path
                d={pathD}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={22}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.9}
              />
              {/* Interior road lanes outline */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.7}
              />
              {/* India-style Broken Golden Highway Dash Passing markers */}
              <path
                d={pathD}
                fill="none"
                stroke="#9C753B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5,10"
                opacity={0.8}
              />
            </>
          )}
        </svg>
      </div>

      {/* 2. Top-Down Animated Van driving along measured coordinates */}
      {pathD && carState.x > 0 && (
        <div
          className="absolute pointer-events-none z-30 transition-transform duration-75 ease-out select-none"
          style={{
            left: `${carState.x}px`,
            top: `${carState.y}px`,
            transform: `translate(-50%, -50%) rotate(${carState.angle}deg)`,
            filter: "drop-shadow(0 14px 10px rgba(0,0,0,0.15)) drop-shadow(0 0 12px rgba(156,117,59,0.15))",
          }}
        >
          {/* Camper traveler bus detailing */}
          <div className="relative">
            <svg viewBox="0 0 54 28" width="50" height="26" className="w-12 h-6">
              {/* Wheels */}
              <rect x="8" y="-1.5" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="36" y="-1.5" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="8" y="25" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="36" y="25" width="6" height="3" fill="#090d16" rx="1" />

              {/* Metal Bumpers */}
              <rect x="0.5" y="3" width="1.5" height="20" fill="#94a3b8" rx="1" />
              <rect x="52" y="3" width="1.5" height="20" fill="#94a3b8" rx="1" />

              {/* Yellow Bus Chassis */}
              <rect x="2" y="1" width="50" height="24" rx="5" fill="#DFC394" stroke="#0f172a" strokeWidth="2" />

              {/* White side-stripe markings */}
              <rect x="8" y="2.5" width="28" height="1.5" fill="#ffffff" opacity={0.7} />
              <rect x="8" y="22" width="28" height="1.5" fill="#ffffff" opacity={0.7} />

              {/* Windshield */}
              <path d="M 40,3 L 47,3 C 49,3 49.5,5 49.5,8 L 49.5,18 C 49.5,21 49,23 47,23 L 40,23 Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.2" />
              <path d="M 42,4.5 L 46,10" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity={0.6} />

              {/* Windows */}
              <rect x="28" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="18" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="8" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />

              <rect x="28" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="18" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="8" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />

              {/* Roof Luggage Rack with backpacks */}
              <rect x="13" y="7" width="20" height="12" rx="1.5" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />
              <rect x="15" y="8.5" width="7" height="8" rx="1" fill="#ef4444" />
              <rect x="23" y="9" width="8" height="4.5" rx="1" fill="#10b981" />

              {/* Glowing headlights */}
              <rect x="51.5" y="5" width="2" height="3.5" rx="0.5" fill="#fef08a" />
              <rect x="51.5" y="17.5" width="2" height="3.5" rx="0.5" fill="#fef08a" />

              {/* Rear brake lights */}
              <rect x="1" y="5" width="1.2" height="4" rx="0.5" fill="#ef4444" />
              <rect x="1" y="17" width="1.2" height="4" rx="0.5" fill="#ef4444" />
            </svg>
            <div className="absolute top-1/2 -translate-y-1/2 left-8 w-16 h-12 bg-gradient-to-r from-brand-sand/15 to-transparent pointer-events-none opacity-65" />
          </div>
        </div>
      )}

      {/* 3. Narrative Title */}
      <div className="relative max-w-7xl mx-auto space-y-24 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-charcoal px-4 py-2 bg-brand-sand rounded-full inline-flex items-center gap-2 shadow-sm">
            <Navigation className="w-3.5 h-3.5 text-brand-charcoal animate-bounce" /> Scenic Highway Map
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-900 tracking-tight leading-none text-center font-display">
            A Day-by-Day<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-700">
              Interactive Chronicle
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed text-center">
            Scroll down to watch our vintage traveler van cruise through snowcapped peaks, ancient valleys, and pristine glaciers.
          </p>
        </div>

        {/* 4. Elegant Zero-Overlap Left/Right Alternating Layout */}
        <div className="space-y-10 sm:space-y-16">
          {items.map((item, index) => {
            const tele = getDayTelemetry(index);
            const TeleIcon = tele.iconType;

            const isMilestoneOnLeft = index % 2 === 0;

            return (
              <div
                key={item.day}
                id={`timeline-section-${index}`}
                className="grid min-h-[100svh] grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center scroll-mt-28 relative py-12 md:py-16 px-4 md:px-8"
              >
                {/* Full-Screen-Wide Outer Background Photo for this stage block */}
                <div className="absolute inset-0 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen min-h-[100svh] pointer-events-none z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover opacity-100 saturate-[1.1] brightness-[1.05] contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant refined vignetting and gradient transitions with light themes */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/70 via-[#FAF9F6]/20 to-[#FAF9F6]/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/50 via-transparent to-[#FAF9F6]/50" />
                </div>

                {/* 4a. Milestone Column: alternate order */}
                <div 
                  className={`col-span-12 md:col-span-3 lg:col-span-4 flex justify-center items-center relative py-6 md:py-12 z-20 ${
                    isMilestoneOnLeft ? "order-1" : "order-1 md:order-2"
                  }`}
                >
                  <div 
                    id={`road-anchor-${index}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative z-20 cursor-pointer transition-transform duration-300"
                    onClick={() => scrollToSection(index)}
                  >
                    {activeDay === index && (
                      <span className="absolute -inset-3 rounded-full border-2 border-[#9C753B]/50 animate-ping pointer-events-none" />
                    )}

                    {/* Beautiful 3D milestone representing highway checkpoints */}
                    <div className={`w-8 h-12 sm:w-10 sm:h-14 rounded-t-full shadow-lg border-2 border-slate-300 overflow-hidden flex flex-col items-center justify-between transition-all duration-300 ${
                      activeDay === index 
                        ? "ring-4 ring-[#9C753B] ring-offset-2 ring-offset-white scale-110 shadow-brand-sand/35" 
                        : "opacity-85 hover:opacity-100 hover:scale-105"
                    }`}>
                      {/* Milestone State Tag */}
                      <div className="w-full h-[45%] bg-brand-sand flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-black text-brand-charcoal">
                        TRAVO
                      </div>
                      {/* Milestone Day Indicator */}
                      <div className="w-full h-[55%] bg-white flex flex-col items-center justify-center text-slate-900 border-t border-slate-200 py-0.5 sm:py-1">
                        <span className="text-[10px] sm:text-[11px] font-black leading-none uppercase">D {index}</span>
                        <span className="text-[6px] sm:text-[8px] font-mono font-bold opacity-65 mt-0.5 whitespace-nowrap px-0.5">{tele.distance}</span>
                      </div>
                    </div>

                    <div className="absolute top-12 sm:top-15 bg-white border border-neutral-200 px-2 py-0.5 rounded text-[8px] font-mono text-neutral-500 uppercase tracking-widest pointer-events-none whitespace-nowrap shadow-sm">
                      Stage {index}
                    </div>
                  </div>
                </div>

                {/* 4b. Card Column */}
                <div 
                  className={`col-span-12 md:col-span-9 lg:col-span-8 z-20 ${
                    isMilestoneOnLeft ? "order-2" : "order-2 md:order-1"
                  }`}
                >
                  <div className="w-full relative flex flex-col justify-between p-2 sm:p-4 md:p-6 group">
                    
                    {/* Stage Details Header */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                      <div className="flex items-center gap-2.5">
                        <span className="px-4 py-2 rounded-xl bg-brand-sand text-brand-charcoal text-[9px] sm:text-[10px] font-black tracking-widest uppercase shadow-sm flex items-center gap-1 font-display">
                          STAGE {index}
                        </span>
                        <span className="text-neutral-800 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm leading-none">
                          {tele.distance} from departure
                        </span>
                      </div>

                      {/* Cozy Elevation weather metric */}
                      <div className="flex items-center gap-2 bg-white/80 border border-neutral-200 py-1.5 px-3.5 rounded-full text-[10px] sm:text-xs font-mono text-neutral-800 backdrop-blur-md shadow-sm w-max select-none">
                        <span className="text-[#9C753B]">{tele.icon}</span>
                        <span className="font-extrabold text-[9px] tracking-wider uppercase">{tele.alt}</span>
                        <span className="text-neutral-300">/</span>
                        <span className="text-neutral-600 font-medium">{tele.temp}</span>
                      </div>
                    </div>

                    {/* Main Content Layout */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-8 mt-6">
                      
                      {/* Left Block */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2 text-[#9C753B]">
                            <TeleIcon className="w-4 h-4 text-[#9C753B]" />
                            <span className="text-[9px] font-mono font-black tracking-widest uppercase">
                              {tele.loc}
                            </span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight font-display uppercase">
                            {item.title}
                          </h3>
                        </div>

                        {/* Quote block */}
                        <div className="pl-4 border-l-2 border-[#9C753B]/60 py-1.5 text-left relative">
                          <div className="flex items-center gap-1.5 text-[#9C753B] mb-2">
                            <Quote className="w-3.5 h-3.5 fill-current opacity-85" />
                            <span className="text-[8px] uppercase font-mono font-black tracking-widest">Captain's Logbook Entry</span>
                          </div>
                          <p className="text-sm font-light italic text-neutral-800 leading-relaxed">
                            "{item.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Right Block */}
                      <div className="lg:col-span-7 flex flex-col justify-end">
                        <div className="space-y-4 text-left">
                          <p className="text-[9px] uppercase font-mono font-black tracking-widest text-[#9C753B] flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#9C753B] animate-pulse" /> DAILY ADVENTURE SCHEDULE
                          </p>
                          <ul className="space-y-3">
                            {item.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800 font-normal leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#9C753B] flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
