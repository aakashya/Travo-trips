import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Coffee,
  Compass,
  Eye,
  Flame,
  Flower,
  Footprints,
  GitMerge,
  Home,
  MapPin,
  Music,
  Navigation,
  Quote,
  Snowflake,
  Sun,
  Tent,
  Utensils,
  Waves,
} from "lucide-react";
import type { DayTimelineItem } from "../types";

interface StoryTimelineProps {
  items: DayTimelineItem[];
  tripId: string;
}

function getIconComponent(iconName?: string) {
  switch (iconName) {
    case "Clock":
      return Clock;
    case "Snowflake":
      return Snowflake;
    case "Flame":
      return Flame;
    case "Compass":
      return Compass;
    case "Sun":
      return Sun;
    case "Eye":
      return Eye;
    case "Navigation":
      return Navigation;
    case "MapPin":
      return MapPin;
    case "Footprints":
      return Footprints;
    case "Tent":
      return Tent;
    case "Coffee":
      return Coffee;
    case "Music":
      return Music;
    case "Home":
      return Home;
    case "Flower":
      return Flower;
    case "Waves":
      return Waves;
    case "GitMerge":
      return GitMerge;
    case "Utensils":
      return Utensils;
    default:
      return MapPin;
  }
}

export default function StoryTimeline({ items, tripId }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState("");
  const [carState, setCarState] = useState({ x: 0, y: 0, angle: 90 });
  const [activeDay, setActiveDay] = useState(0);

  const getDayTelemetry = (index: number) => {
    const item = items[index];
    if (item?.telemetry) {
      return {
        ...item.telemetry,
        iconType: getIconComponent(item.telemetry.iconType),
      };
    }

    return {
      loc: "HIMALAYAN HIGHWAY",
      icon: "TR",
      alt: "2,050m Alt",
      temp: "12C Crisp",
      distance: "540 KM",
      iconType: Compass,
    };
  };

  const updateRoadPath = () => {
    if (!timelineRef.current) return;
    const parentRect = timelineRef.current.getBoundingClientRect();
    const measuredCoords: { x: number; y: number }[] = [];

    for (let index = 0; index < items.length; index += 1) {
      const anchorEl = document.getElementById(`road-anchor-${index}`);
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        measuredCoords.push({
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
        });
      }
    }

    if (!measuredCoords.length) return;

    let nextPath = `M ${measuredCoords[0].x} ${measuredCoords[0].y}`;
    for (let index = 0; index < measuredCoords.length - 1; index += 1) {
      const curr = measuredCoords[index];
      const next = measuredCoords[index + 1];
      const dy = next.y - curr.y;
      nextPath += ` C ${curr.x} ${curr.y + dy * 0.45}, ${next.x} ${next.y - dy * 0.45}, ${next.x} ${next.y}`;
    }

    setPathD(nextPath);
  };

  useEffect(() => {
    updateRoadPath();
    window.addEventListener("resize", updateRoadPath);
    window.addEventListener("load", updateRoadPath);

    const timers = [
      window.setTimeout(updateRoadPath, 150),
      window.setTimeout(updateRoadPath, 500),
      window.setTimeout(updateRoadPath, 1200),
      window.setTimeout(updateRoadPath, 2500),
      window.setTimeout(updateRoadPath, 4000),
    ];

    return () => {
      window.removeEventListener("resize", updateRoadPath);
      window.removeEventListener("load", updateRoadPath);
      timers.forEach(window.clearTimeout);
    };
  }, [items, tripId]);

  useEffect(() => {
    let frameId = 0;
    let targetProgress = 0;
    let currentProgress = 0;

    const onScroll = () => {
      if (!timelineRef.current || !pathRef.current || !items.length) return;

      const containerRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerStart = viewportHeight * 0.65;
      const totalRoadLength = containerRect.height - viewportHeight * 0.25;
      const amountScrolled = triggerStart - containerRect.top;
      const pct = Math.max(0, Math.min(1, amountScrolled / (totalRoadLength || 1)));

      targetProgress = pct;
      setActiveDay(Math.floor(pct * (items.length - 0.01)));
    };

    const runGlidePhysics = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      const path = pathRef.current;

      if (path) {
        try {
          const totalLength = path.getTotalLength();
          if (totalLength > 0) {
            const distance = currentProgress * totalLength;
            const point = path.getPointAtLength(distance);
            const ahead = path.getPointAtLength(Math.min(distance + 6, totalLength));
            const behind = path.getPointAtLength(Math.max(distance - 6, 0));
            const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * (180 / Math.PI);

            setCarState({
              x: point.x,
              y: point.y,
              angle: Number.isNaN(angle) ? 90 : angle,
            });
          }
        } catch {
          // The path can be briefly unavailable while responsive layout settles.
        }
      }

      frameId = requestAnimationFrame(runGlidePhysics);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    runGlidePhysics();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [pathD, items.length]);

  const scrollToSection = (index: number) => {
    document.getElementById(`timeline-section-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!items.length) return null;

  return (
    <section
      id="story-timeline"
      ref={timelineRef}
      className="relative bg-[#050B14] py-32 px-4 sm:px-6 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,225,214,0.04),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b03_1px,transparent_1px),linear-gradient(to_bottom,#1e293b05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
        <svg className="w-full h-full" style={{ minHeight: "100%" }}>
          {pathD && (
            <>
              <path d={pathD} fill="none" stroke="#090d16" strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
              <path d={pathD} fill="none" stroke="#1f2937" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
              <path ref={pathRef} d={pathD} fill="none" stroke="#374151" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
              <path d={pathD} fill="none" stroke="#E5E1D6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,10" opacity={0.8} />
            </>
          )}
        </svg>
      </div>

      {pathD && carState.x > 0 && (
        <div
          className="absolute pointer-events-none z-10 transition-transform duration-75 ease-out select-none"
          style={{
            left: `${carState.x}px`,
            top: `${carState.y}px`,
            transform: `translate(-50%, -50%) rotate(${carState.angle}deg)`,
            filter: "drop-shadow(0 14px 10px rgba(0,0,0,0.8)) drop-shadow(0 0 12px rgba(229,225,214,0.25))",
          }}
        >
          <div className="relative">
            <svg viewBox="0 0 54 28" width="50" height="26" className="w-12 h-6">
              <rect x="8" y="-1.5" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="36" y="-1.5" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="8" y="25" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="36" y="25" width="6" height="3" fill="#090d16" rx="1" />
              <rect x="0.5" y="3" width="1.5" height="20" fill="#94a3b8" rx="1" />
              <rect x="52" y="3" width="1.5" height="20" fill="#94a3b8" rx="1" />
              <rect x="2" y="1" width="50" height="24" rx="5" fill="#DFC394" stroke="#0f172a" strokeWidth="2" />
              <rect x="8" y="2.5" width="28" height="1.5" fill="#ffffff" opacity={0.7} />
              <rect x="8" y="22" width="28" height="1.5" fill="#ffffff" opacity={0.7} />
              <path d="M 40,3 L 47,3 C 49,3 49.5,5 49.5,8 L 49.5,18 C 49.5,21 49,23 47,23 L 40,23 Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.2" />
              <path d="M 42,4.5 L 46,10" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity={0.6} />
              <rect x="28" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="18" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="8" y="3" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="28" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="18" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="8" y="20" width="7" height="2.5" rx="1" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
              <rect x="13" y="7" width="20" height="12" rx="1.5" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />
              <rect x="15" y="8.5" width="7" height="8" rx="1" fill="#ef4444" />
              <rect x="23" y="9" width="8" height="4.5" rx="1" fill="#10b981" />
              <rect x="51.5" y="5" width="2" height="3.5" rx="0.5" fill="#fef08a" />
              <rect x="51.5" y="17.5" width="2" height="3.5" rx="0.5" fill="#fef08a" />
              <rect x="1" y="5" width="1.2" height="4" rx="0.5" fill="#ef4444" />
              <rect x="1" y="17" width="1.2" height="4" rx="0.5" fill="#ef4444" />
            </svg>
            <div className="absolute top-1/2 -translate-y-1/2 left-8 w-16 h-12 bg-gradient-to-r from-brand-sand/15 to-transparent pointer-events-none opacity-65" />
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto space-y-24 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-charcoal px-4 py-2 bg-brand-sand rounded-full inline-flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-brand-charcoal animate-bounce" /> Scenic Highway Map
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none text-center font-display">
            A Day-by-Day<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-400">Interactive Chronicle</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed text-center">
            Scroll down to watch our vintage traveler van cruise through snowcapped peaks, ancient valleys, and pristine glaciers.
          </p>
        </div>

        <div className="space-y-40 sm:space-y-64">
          {items.map((item, index) => {
            const tele = getDayTelemetry(index);
            const TeleIcon = tele.iconType;
            const isMilestoneOnLeft = index % 2 === 0;

            return (
              <div
                key={item.day}
                id={`timeline-section-${index}`}
                className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center scroll-mt-28 relative py-20 px-4 md:px-8"
              >
                <div className="absolute inset-y-0 left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen pointer-events-none z-0 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover opacity-100 saturate-[1.1] brightness-[0.95] contrast-[1.05]" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/95 via-[#050B14]/20 to-[#050B14]/95" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/65 via-transparent to-[#050B14]/65" />
                </div>

                <div className={`col-span-12 md:col-span-3 lg:col-span-4 flex justify-center items-center relative py-6 md:py-12 z-20 ${isMilestoneOnLeft ? "order-1" : "order-1 md:order-2"}`}>
                  <button
                    id={`road-anchor-${index}`}
                    type="button"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative z-20 cursor-pointer transition-transform duration-300"
                    onClick={() => scrollToSection(index)}
                    aria-label={`Jump to stage ${index}`}
                  >
                    {activeDay === index && <span className="absolute -inset-3 rounded-full border-2 border-brand-sand/50 animate-ping pointer-events-none" />}
                    <span
                      className={`w-8 h-12 sm:w-10 sm:h-14 rounded-t-full shadow-2xl border-2 border-slate-950 overflow-hidden flex flex-col items-center justify-between transition-all duration-300 ${
                        activeDay === index
                          ? "ring-4 ring-brand-sand ring-offset-2 ring-offset-[#050B14] scale-110 shadow-brand-sand/30"
                          : "opacity-75 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <span className="w-full h-[45%] bg-brand-sand flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-black text-brand-charcoal">
                        TRAVO
                      </span>
                      <span className="w-full h-[55%] bg-slate-50 flex flex-col items-center justify-center text-slate-900 border-t border-slate-300 py-0.5 sm:py-1">
                        <span className="text-[10px] sm:text-[11px] font-black leading-none uppercase">D {index}</span>
                        <span className="text-[6px] sm:text-[8px] font-mono font-bold opacity-60 mt-0.5 whitespace-nowrap px-0.5">{tele.distance}</span>
                      </span>
                    </span>
                    <span className="absolute top-16 bg-slate-950/95 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-gray-400 uppercase tracking-widest pointer-events-none whitespace-nowrap shadow-md">
                      Stage {index}
                    </span>
                  </button>
                </div>

                <div className={`col-span-12 md:col-span-9 lg:col-span-8 z-20 ${isMilestoneOnLeft ? "order-2" : "order-2 md:order-1"}`}>
                  <div className="w-full relative flex flex-col justify-between p-2 sm:p-4 md:p-6 group">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                      <div className="flex items-center gap-2.5">
                        <span className="px-4 py-2 rounded-xl bg-brand-sand text-brand-charcoal text-[9px] sm:text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1 font-display">
                          STAGE {index}
                        </span>
                        <span className="text-white text-[9px] sm:text-[10px] font-mono font-bold tracking-wider bg-slate-950/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 shadow-sm leading-none">
                          {tele.distance} from departure
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-[#050B14]/60 border border-white/5 py-1.5 px-3.5 rounded-full text-[10px] sm:text-xs font-mono text-gray-100 backdrop-blur-md shadow-md w-max select-none">
                        <span className="text-brand-sand">{tele.icon}</span>
                        <span className="font-extrabold text-[9px] tracking-wider uppercase">{tele.alt}</span>
                        <span className="text-white/30">/</span>
                        <span className="text-gray-300 font-medium">{tele.temp}</span>
                      </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-8 mt-6">
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2 text-brand-sand">
                            <TeleIcon className="w-4 h-4 text-brand-sand" />
                            <span className="text-[9px] font-mono font-black tracking-widest uppercase">{tele.loc}</span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight [text-shadow:0_4px_12px_rgba(0,0,0,0.8)] font-display uppercase">
                            {item.title}
                          </h3>
                        </div>

                        <div className="pl-4 border-l-2 border-brand-sand/60 py-1.5 text-left relative">
                          <div className="flex items-center gap-1.5 text-brand-sand mb-2">
                            <Quote className="w-3.5 h-3.5 fill-current opacity-85" />
                            <span className="text-[8px] uppercase font-mono font-black tracking-widest">Captain's Logbook Entry</span>
                          </div>
                          <p className="text-sm font-light italic text-gray-100 leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">"{item.quote}"</p>
                        </div>
                      </div>

                      <div className="lg:col-span-7 flex flex-col justify-end">
                        <div className="space-y-4 text-left">
                          <p className="text-[9px] uppercase font-mono font-black tracking-widest text-brand-sand flex items-center gap-1.5 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                            <Clock className="w-4 h-4 text-brand-sand animate-pulse" /> DAILY ADVENTURE SCHEDULE
                          </p>
                          <ul className="space-y-3">
                            {item.highlights.map((highlight) => (
                              <li key={highlight} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 font-normal leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-sand shadow shadow-brand-sand flex-shrink-0" />
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
