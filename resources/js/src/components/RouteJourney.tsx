import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Compass,
  Droplets,
  Flame,
  Flower2,
  Landmark,
  MapPin,
  Mountain,
  Snowflake,
  Sparkles,
} from "lucide-react";
import type { RouteStop } from "../types";

interface RouteJourneyProps {
  stops?: RouteStop[];
  tripId: string;
  tripName: string;
}

interface DestinationNode {
  id: string;
  name: string;
  type: string;
  dayNum: number;
  altitude: string;
  coordinates: { x: number; y: number };
  distanceToNext: string;
  durationToNext: string;
  imageUrl: string;
  description: string;
  keyAttractions: string[];
}

const VALLEY_OF_FLOWERS_DESTINATIONS: DestinationNode[] = [
  {
    id: "delhi",
    name: "Delhi Plains",
    type: "pickup",
    dayNum: 1,
    altitude: "700 ft",
    coordinates: { x: 50, y: 92 },
    distanceToNext: "240 km",
    durationToNext: "6-7 hrs",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    description: "The epic mountain journey begins in the historic capital, assembling at night before driving north toward the Uttarakhand foothills.",
    keyAttractions: ["India Gate", "Departure Point", "Urban Base"],
  },
  {
    id: "rishikesh",
    name: "Rishikesh Stopover",
    type: "stopover",
    dayNum: 1,
    altitude: "1,120 ft",
    coordinates: { x: 48, y: 72 },
    distanceToNext: "250 km",
    durationToNext: "8-9 hrs",
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    description: "A sacred Ganga town and gateway to the Garhwal Himalayas. A serene pause to witness river flows and start the uphill drive.",
    keyAttractions: ["Ganga Aarti", "Lakshman Jhula", "River Views"],
  },
  {
    id: "joshimath",
    name: "Joshimath Halt",
    type: "stopover",
    dayNum: 2,
    altitude: "6,150 ft",
    coordinates: { x: 52, y: 55 },
    distanceToNext: "20 km",
    durationToNext: "1 hr",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    description: "A towering mountain settlement with views of spectacular peaks, serving as our major acclimatization halt before the trek begins.",
    keyAttractions: ["Mountain Halt", "Auli Cable Car Access", "Valley Entrance"],
  },
  {
    id: "govindghat",
    name: "Govindghat Gateway",
    type: "trailhead",
    dayNum: 3,
    altitude: "6,300 ft",
    coordinates: { x: 50, y: 42 },
    distanceToNext: "10 km trek",
    durationToNext: "4-5 hrs",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    description: "The bustling valley roadhead where we assemble, meet our mountaineering crew, and begin our legendary uphill river trek.",
    keyAttractions: ["Trek Head", "Alaknanda Confluence", "Porter Base"],
  },
  {
    id: "ghangaria",
    name: "Ghangaria Base",
    type: "base",
    dayNum: 3,
    altitude: "10,000 ft",
    coordinates: { x: 44, y: 30 },
    distanceToNext: "3-6 km",
    durationToNext: "Varies by branch",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "Our pine-bordered alpine base village. Cozy wooden guesthouses serve as the direct launchpad to both the Valley of Flowers and Hemkund Sahib.",
    keyAttractions: ["Base Village", "Pine Forests", "Cozy Wooden Lodges"],
  },
  {
    id: "valley_of_flowers",
    name: "Valley of Flowers",
    type: "destination",
    dayNum: 4,
    altitude: "11,811 ft",
    coordinates: { x: 30, y: 22 },
    distanceToNext: "Return to Ghangaria",
    durationToNext: "5-6 hrs roundtrip",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    description: "A celebrated alpine paradise of endemic wildflowers, misty waterfalls, and high mountain ridges. An unforgettable UNESCO World Heritage site.",
    keyAttractions: ["Endemic Wildflowers", "UNESCO Landscape", "Bhyundar Valley"],
  },
  {
    id: "hemkund_sahib",
    name: "Hemkund Sahib",
    type: "destination",
    dayNum: 5,
    altitude: "14,203 ft",
    coordinates: { x: 58, y: 18 },
    distanceToNext: "Return to Ghangaria",
    durationToNext: "7-8 hrs roundtrip",
    imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80",
    description: "The world's highest Sikh shrine, situated beside a crystalline glacial lake reflecting towering peaks. A deeply spiritual high-altitude trek.",
    keyAttractions: ["World's Highest Gurudwara", "Crystalline Glacial Lake", "Laxman Temple"],
  },
  {
    id: "badrinath",
    name: "Badrinath Shrine",
    type: "spiritual",
    dayNum: 6,
    altitude: "10,279 ft",
    coordinates: { x: 62, y: 34 },
    distanceToNext: "Drive return",
    durationToNext: "Flexible",
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    description: "A holy Char Dham shrine set against the Nar and Narayan mountains, offering hot sulfur springs and a side drive to the Mana Indo-Tibetan border.",
    keyAttractions: ["Badrinath Temple", "Mana Village", "Tapt Kund Springs"],
  },
];

const MANALI_DESTINATIONS: DestinationNode[] = [
  {
    id: "delhi",
    name: "Delhi Assembly",
    type: "pickup",
    dayNum: 1,
    altitude: "700 ft",
    coordinates: { x: 50, y: 92 },
    distanceToNext: "290 km",
    durationToNext: "7-8 hrs",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    description: "Our luxurious travel bus departs from Delhi at night, hitting the broad highway to start our scenic road trip towards Himachal Pradesh.",
    keyAttractions: ["Assembly Point", "Group Icebreakers", "Comfortable Drive"],
  },
  {
    id: "rishikesh",
    name: "Beas River Drive",
    type: "stopover",
    dayNum: 1,
    altitude: "2,495 ft",
    coordinates: { x: 48, y: 72 },
    distanceToNext: "105 km",
    durationToNext: "3 hrs",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    description: "Enjoy a beautiful riverside drive along the cascading Beas River, stopping for local paranthas with scenic views.",
    keyAttractions: ["Beas River Views", "Pandoh Dam", "Mountain Foothills"],
  },
  {
    id: "joshimath",
    name: "Kasol Base Camp",
    type: "stopover",
    dayNum: 2,
    altitude: "5,182 ft",
    coordinates: { x: 52, y: 55 },
    distanceToNext: "5 km",
    durationToNext: "15 mins",
    imageUrl: "https://images.unsplash.com/photo-1617014312942-5ba772e09ff7?auto=format&fit=crop&w=800&q=80",
    description: "Our beautiful forest base camp beside the rushing Parvati River, famous for its wooden cafes, local strolls, and chill vibes.",
    keyAttractions: ["Riverside Camps", "Chalal Nature Walk", "Parvati River"],
  },
  {
    id: "govindghat",
    name: "Manali Arrival",
    type: "trailhead",
    dayNum: 3,
    altitude: "6,726 ft",
    coordinates: { x: 50, y: 42 },
    distanceToNext: "14 km",
    durationToNext: "40 mins",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Check in at our high-altitude Manali hotel. Discover the wooden Hadimba temple, local pine forests, and Old Manali cafes.",
    keyAttractions: ["Hadimba Temple", "Mall Road Stroll", "Old Manali Cafes"],
  },
  {
    id: "ghangaria",
    name: "Solang Valley",
    type: "base",
    dayNum: 4,
    altitude: "8,400 ft",
    coordinates: { x: 44, y: 30 },
    distanceToNext: "30 km",
    durationToNext: "2 hrs roundtrip",
    imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    description: "Himachal's ultimate adventure hub. Experience paragliding, ATV rides, long ziplines, zorbing, and majestic views.",
    keyAttractions: ["Paragliding", "Ziplines", "Anjani Mahadev Hike"],
  },
  {
    id: "valley_of_flowers",
    name: "Jogini Waterfall",
    type: "destination",
    dayNum: 4,
    altitude: "7,850 ft",
    coordinates: { x: 30, y: 22 },
    distanceToNext: "Return to Hotel",
    durationToNext: "3 hrs trek",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    description: "A peaceful pine-forested nature trek leading to the cascading Jogini Waterfall, offering refreshing mountain spray.",
    keyAttractions: ["Pine Forest Trail", "Water Cascades", "Vashisht Springs"],
  },
  {
    id: "hemkund_sahib",
    name: "Rohtang Pass",
    type: "destination",
    dayNum: 5,
    altitude: "13,058 ft",
    coordinates: { x: 58, y: 18 },
    distanceToNext: "Return to Delhi",
    durationToNext: "12 hrs",
    imageUrl: "https://images.unsplash.com/photo-1551829142-d9b812eb1a9b?auto=format&fit=crop&w=800&q=80",
    description: "A spectacular high alpine ridge with perpetual snow, offering jaw-dropping views of majestic snow-capped peaks.",
    keyAttractions: ["Snow Sledging", "Glacial Vistas", "Atal Tunnel Drive"],
  },
  {
    id: "badrinath",
    name: "Manikaran Springs",
    type: "spiritual",
    dayNum: 2,
    altitude: "5,774 ft",
    coordinates: { x: 62, y: 34 },
    distanceToNext: "Return to Camp",
    durationToNext: "30 mins",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f0107a67df6e?auto=format&fit=crop&w=800&q=80",
    description: "Famous natural hot sulfur springs and the ancient Manikaran Sahib Gurudwara nestled under high cliffs.",
    keyAttractions: ["Hot Springs", "Historic Gurudwara", "Langar Meal"],
  },
];

export default function RouteJourney({ tripId, tripName }: RouteJourneyProps) {
  const isManali = tripId === "manali";
  const destinations = isManali ? MANALI_DESTINATIONS : VALLEY_OF_FLOWERS_DESTINATIONS;
  const [selectedNode, setSelectedNode] = useState<DestinationNode>(destinations[4] || destinations[0]);
  const [hoveredNode, setHoveredNode] = useState<DestinationNode | null>(null);

  useEffect(() => {
    setSelectedNode(isManali ? MANALI_DESTINATIONS[4] : VALLEY_OF_FLOWERS_DESTINATIONS[4]);
  }, [tripId, isManali]);

  const getNodeIcon = (id: string) => {
    switch (id) {
      case "delhi":
        return <MapPin className="w-4 h-4 text-rose-400" />;
      case "rishikesh":
        return <Droplets className="w-4 h-4 text-sky-400 animate-pulse" />;
      case "joshimath":
        return <Mountain className="w-4 h-4 text-amber-400" />;
      case "govindghat":
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case "ghangaria":
        return <Mountain className="w-4 h-4 text-teal-400" />;
      case "valley_of_flowers":
        return isManali ? <Sparkles className="w-4 h-4 text-emerald-300" /> : <Flower2 className="w-4 h-4 text-fuchsia-400 animate-pulse" />;
      case "hemkund_sahib":
        return <Snowflake className="w-4 h-4 text-blue-300" />;
      case "badrinath":
        return isManali ? <Flame className="w-4 h-4 text-orange-400" /> : <Landmark className="w-4 h-4 text-orange-400" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <section id="route-explorer" className="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-b from-brand-sand/10 to-transparent blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3 py-1 bg-brand-sand/10 border border-brand-sand/20 rounded-full">
              ROUTE & ALTITUDE MAP
            </span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider font-mono">{tripName}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-display">
            Himalayan Route <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">Explorer</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl font-light leading-relaxed">
            Click on any destination node along the mountain trail to inspect key altitude metrics, travel times, photo summaries, and quick itinerary links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#050B14]/60 border border-white/10 rounded-3xl p-4 sm:p-10 relative overflow-hidden h-[450px] sm:h-[550px] shadow-inner">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,400 L 150,200 L 300,350 L 500,100 L 700,380 L 900,150 L 1000,400 Z" fill="#DFC394" />
                <path d="M 50,450 L 250,250 L 450,400 L 650,150 L 800,350 L 1000,450 Z" fill="#DFC394" />
              </svg>
            </div>

            <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between text-[8px] sm:text-[10px] font-mono text-gray-500 pointer-events-none border-l border-white/5 pl-2 z-10">
              {isManali ? (
                <>
                  <AltitudeMark value="13,058 ft" label="Rohtang Pass" />
                  <AltitudeMark value="8,400 ft" label="Solang Valley" />
                  <AltitudeMark value="6,726 ft" label="Manali Arrival" />
                  <AltitudeMark value="5,182 ft" label="Kasol Base" />
                  <AltitudeMark value="700 ft" label="Delhi Plains" />
                </>
              ) : (
                <>
                  <AltitudeMark value="14,203 ft" label="Hemkund Sahib" />
                  <AltitudeMark value="11,811 ft" label="Valley of Flowers" />
                  <AltitudeMark value="10,000 ft" label="Ghangaria Base" />
                  <AltitudeMark value="6,000 ft" label="Govindghat / Joshimath" />
                  <AltitudeMark value="700 ft" label="Delhi Plains" />
                </>
              )}
            </div>

            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="92" x2="48" y2="72" stroke="rgba(223, 195, 148, 0.25)" strokeWidth="1" strokeDasharray="2" />
              <path d="M 48,72 Q 44,65 52,55" fill="none" stroke="rgba(223, 195, 148, 0.25)" strokeWidth="1" strokeDasharray="2" />
              <line x1="52" y1="55" x2="50" y2="42" stroke="rgba(223, 195, 148, 0.25)" strokeWidth="1" strokeDasharray="2" />
              <path d="M 50,42 Q 45,36 44,30" fill="none" stroke={isManali ? "#10b981" : "#059669"} strokeWidth="1.5" />
              <path d="M 44,30 Q 34,26 30,22" fill="none" stroke={isManali ? "#34d399" : "#d946ef"} strokeWidth="1.5" strokeDasharray="1.5" />
              <path d="M 44,30 Q 52,24 58,18" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="1.5" />
              <path d="M 50,42 Q 58,38 62,34" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="2" />
            </svg>

            <div className="absolute inset-0">
              {destinations.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <button
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`relative p-2.5 rounded-full transition-all duration-300 outline-none flex items-center justify-center ${
                        isSelected
                          ? "bg-brand-sand border-2 border-brand-sand text-brand-charcoal scale-110 shadow-lg shadow-brand-sand/35"
                          : isHovered
                            ? "bg-emerald-500 text-white scale-105 shadow"
                            : "bg-black/80 border border-white/10 text-gray-300 hover:border-brand-sand/50"
                      }`}
                    >
                      {node.type === "destination" && !isSelected && <span className="absolute inset-0 rounded-full bg-brand-sand/30 opacity-40 animate-ping" />}
                      <div className="w-4 h-4 flex items-center justify-center">{getNodeIcon(node.id)}</div>
                    </button>

                    <span
                      onClick={() => setSelectedNode(node)}
                      className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all duration-300 border ${
                        isSelected
                          ? "bg-brand-sand text-brand-charcoal border-brand-sand font-black"
                          : "bg-black/90 border-white/5 text-gray-300 hover:text-white"
                      }`}
                    >
                      {node.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-4 right-4 left-16 bg-[#161A21]/95 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-2xl flex justify-between items-center gap-3 z-20">
              <QuickStat label="Trek Path Difficulty" value={isManali ? "Easy to Moderate" : "Moderate Alpine Trails"} tone="text-brand-sand" />
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <QuickStat label="Total Trek Distance" value={isManali ? "14 km roundtrip" : "24 km roundtrip"} tone="text-white" />
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <QuickStat label="Peak Elevation" value={isManali ? "13,058 ft" : "14,203 ft"} tone="text-sky-400 font-mono" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#161A21]/60 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[500px]"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-sand/5 rounded-full filter blur-2xl" />
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={selectedNode.imageUrl}
                    alt={selectedNode.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161A21] via-black/20 to-transparent flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase ${
                          selectedNode.type === "destination"
                            ? "bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-400"
                            : selectedNode.type === "pickup"
                              ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400"
                              : "bg-slate-700/20 border border-slate-500/30 text-slate-300"
                        }`}
                      >
                        {selectedNode.type === "destination" ? "Core Target" : selectedNode.type}
                      </span>
                      <span className="text-gray-400 text-[10px] font-mono">Day {selectedNode.dayNum} Stop</span>
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase mt-1 tracking-tight font-display">{selectedNode.name}</h4>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
                    <div>
                      <span className="text-gray-400 text-[9px] block font-mono uppercase tracking-widest">Altitude</span>
                      <span className="text-brand-sand font-black font-mono text-base">{selectedNode.altitude}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[9px] block font-mono uppercase tracking-widest">To Next Stop</span>
                      <span className="text-white font-bold text-sm">
                        {selectedNode.distanceToNext}
                        <span className="text-[10px] text-gray-500 block font-normal font-mono">({selectedNode.durationToNext})</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs leading-relaxed font-light">{selectedNode.description}</p>

                  <div>
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-2 font-mono">Key Highlights</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.keyAttractions.map((attraction) => (
                        <span key={attraction} className="bg-white/5 border border-white/10 text-gray-300 text-[10px] px-2.5 py-1 rounded-lg transition-colors hover:bg-white/10">
                          {attraction}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById("story-timeline")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full flex items-center justify-center gap-2 bg-brand-sand hover:bg-white text-brand-charcoal text-[10px] tracking-widest uppercase font-black py-3.5 px-4 rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-brand-sand/10"
                  >
                    View Day {selectedNode.dayNum} Itinerary Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-2">
          {destinations.map((node, index) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`py-2.5 px-2 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-xl border text-center transition-all ${
                selectedNode.id === node.id
                  ? "bg-brand-sand text-brand-charcoal border-brand-sand shadow-lg shadow-brand-sand/10"
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              STOP {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AltitudeMark({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-bold text-brand-sand">{value}</p>
      <p>{label}</p>
    </div>
  );
}

function QuickStat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div>
      <p className="text-[8px] uppercase font-bold tracking-wider text-gray-400">{label}</p>
      <p className={`text-[10px] font-semibold mt-0.5 ${tone}`}>{value}</p>
    </div>
  );
}
