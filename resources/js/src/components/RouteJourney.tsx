import React, { useState, useEffect } from "react";
import { 
  MapPin, Flower2, Landmark, Snowflake, Droplets, Mountain, 
  ArrowRight, Compass, ShieldAlert, Award, Play, Pause, ChevronLeft, ChevronRight, Sparkles, Flame
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RouteJourneyProps {
  stops?: any[];
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
  icon: string;
  imageUrl: string;
  description: string;
  keyAttractions: string[];
}

const VALLEY_OF_FLOWERS_DESTINATIONS: DestinationNode[] = [
  {
    id: 'delhi', name: 'Delhi Plains', type: 'pickup', dayNum: 1, altitude: '700 ft',
    coordinates: { x: 50, y: 92 }, distanceToNext: '240 km', durationToNext: '6-7 hrs', icon: '📍',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    description: 'The epic mountain journey begins in the historic capital, assembling at night before driving north toward the Uttarakhand foothills.',
    keyAttractions: ['India Gate', 'Departure Point', 'Urban Base']
  },
  {
    id: 'rishikesh', name: 'Rishikesh Stopover', type: 'stopover', dayNum: 1, altitude: '1,120 ft',
    coordinates: { x: 48, y: 72 }, distanceToNext: '250 km', durationToNext: '8-9 hrs', icon: '💧',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    description: 'A sacred Ganga town and gateway to the Garhwal Himalayas. A serene pause to witness river flows and start the uphill drive.',
    keyAttractions: ['Ganga Aarti', 'Lakshman Jhula', 'River Views']
  },
  {
    id: 'joshimath', name: 'Joshimath Halt', type: 'stopover', dayNum: 2, altitude: '6,150 ft',
    coordinates: { x: 52, y: 55 }, distanceToNext: '20 km', durationToNext: '1 hr', icon: '⛰️',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    description: 'A towering mountain settlement with views of spectacular peaks, serving as our major acclimatization halt before the trek begins.',
    keyAttractions: ['Mountain Halt', 'Auli Cable Car Access', 'Valley Entrance']
  },
  {
    id: 'govindghat', name: 'Govindghat Gateway', type: 'trailhead', dayNum: 3, altitude: '6,300 ft',
    coordinates: { x: 50, y: 42 }, distanceToNext: '10 km trek', durationToNext: '4-5 hrs', icon: '🧭',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    description: 'The bustling valley roadhead where we assemble, meet our mountaineering crew, and begin our legendary uphill river trek.',
    keyAttractions: ['Trek Head', 'Alaknanda Confluence', 'Porter Base']
  },
  {
    id: 'ghangaria', name: 'Ghangaria Base', type: 'base', dayNum: 3, altitude: '10,000 ft',
    coordinates: { x: 44, y: 30 }, distanceToNext: '3-6 km', durationToNext: 'Varies by branch', icon: '🏔️',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Our pine-bordered alpine base village. Cozy wooden guesthouses serve as the direct launchpad to both the Valley of Flowers and Hemkund Sahib.',
    keyAttractions: ['Base Village', 'Pine Forests', 'Cozy Wooden Lodges']
  },
  {
    id: 'valley_of_flowers', name: 'Valley of Flowers', type: 'destination', dayNum: 4, altitude: '11,811 ft',
    coordinates: { x: 30, y: 22 }, distanceToNext: 'Return to Ghangaria', durationToNext: '5-6 hrs roundtrip', icon: '🌸',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    description: 'A celebrated alpine paradise of endemic wildflowers, misty waterfalls, and high mountain ridges. An unforgettable UNESCO World Heritage site.',
    keyAttractions: ['Endemic Wildflowers', 'UNESCO Landscape', 'Bhyundar Valley']
  },
  {
    id: 'hemkund_sahib', name: 'Hemkund Sahib', type: 'destination', dayNum: 5, altitude: '14,203 ft',
    coordinates: { x: 58, y: 18 }, distanceToNext: 'Return to Ghangaria', durationToNext: '7-8 hrs roundtrip', icon: '❄️',
    imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80',
    description: 'The world\'s highest Sikh shrine, situated beside a crystalline glacial lake reflecting towering peaks. A deeply spiritual high-altitude trek.',
    keyAttractions: ['World\'s Highest Gurudwara', 'Crystalline Glacial Lake', 'Laxman Temple']
  },
  {
    id: 'badrinath', name: 'Badrinath Shrine', type: 'spiritual', dayNum: 6, altitude: '10,279 ft',
    coordinates: { x: 62, y: 34 }, distanceToNext: 'Drive return', durationToNext: 'Flexible', icon: '🛕',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    description: 'A holy Char Dham shrine set against the Nar and Narayan mountains, offering hot sulfur springs and a side drive to the Mana Indo-Tibetan border.',
    keyAttractions: ['Badrinath Temple', 'Mana Village', 'Tapt Kund Springs']
  }
];

const MANALI_DESTINATIONS: DestinationNode[] = [
  {
    id: 'delhi', name: 'Delhi Assembly', type: 'pickup', dayNum: 1, altitude: '700 ft',
    coordinates: { x: 50, y: 92 }, distanceToNext: '290 km', durationToNext: '7-8 hrs', icon: '📍',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    description: 'Our luxurious travel bus departs from Delhi at night, hitting the broad highway to start our scenic road trip towards Himachal Pradesh.',
    keyAttractions: ['Assembly Point', 'Group Icebreakers', 'Comfortable Drive']
  },
  {
    id: 'rishikesh', name: 'Beas River Drive', type: 'stopover', dayNum: 1, altitude: '2,495 ft',
    coordinates: { x: 48, y: 72 }, distanceToNext: '105 km', durationToNext: '3 hrs', icon: '💧',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    description: 'Enjoy a beautiful riverside drive along the cascading Beas River, stopping for local paranthas with scenic views.',
    keyAttractions: ['Beas River Views', 'Pandoh Dam', 'Mountain Foothills']
  },
  {
    id: 'joshimath', name: 'Kasol Base Camp', type: 'stopover', dayNum: 2, altitude: '5,182 ft',
    coordinates: { x: 52, y: 55 }, distanceToNext: '5 km', durationToNext: '15 mins', icon: '⛺',
    imageUrl: 'https://images.unsplash.com/photo-1617014312942-5ba772e09ff7?auto=format&fit=crop&w=800&q=80',
    description: 'Our beautiful forest base camp beside the rushing Parvati River, famous for its wooden cafes, local strolls, and chill vibes.',
    keyAttractions: ['Riverside Camps', 'Chalal Nature Walk', 'Parvati River']
  },
  {
    id: 'govindghat', name: 'Manali Arrival', type: 'trailhead', dayNum: 3, altitude: '6,726 ft',
    coordinates: { x: 50, y: 42 }, distanceToNext: '14 km', durationToNext: '40 mins', icon: '⛰️',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Check in at our high-altitude Manali hotel. Discover the wooden Hadimba temple, local pine forests, and Old Manali cafes.',
    keyAttractions: ['Hadimba Temple', 'Mall Road Stroll', 'Old Manali Cafes']
  },
  {
    id: 'ghangaria', name: 'Solang Valley', type: 'base', dayNum: 4, altitude: '8,400 ft',
    coordinates: { x: 44, y: 30 }, distanceToNext: '30 km', durationToNext: '2 hrs roundtrip', icon: '🪁',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    description: 'Himachal\'s ultimate adventure hub! Experience thrilling paragliding, ATV rides, long ziplines, zorbing, and majestic views.',
    keyAttractions: ['Paragliding', 'Ziplines', 'Anjani Mahadev Hike']
  },
  {
    id: 'valley_of_flowers', name: 'Jogini Waterfall', type: 'destination', dayNum: 4, altitude: '7,850 ft',
    coordinates: { x: 30, y: 22 }, distanceToNext: 'Return to Hotel', durationToNext: '3 hrs trek', icon: '🌊',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    description: 'A peaceful pine-forested nature trek leading to the cascading Jogini Waterfall, offering refreshing mountain spray.',
    keyAttractions: ['Pine Forest Trail', 'Water Cascades', 'Vashisht Springs']
  },
  {
    id: 'hemkund_sahib', name: 'Rohtang Pass', type: 'destination', dayNum: 5, altitude: '13,058 ft',
    coordinates: { x: 58, y: 18 }, distanceToNext: 'Return to Delhi', durationToNext: '12 hrs', icon: '❄️',
    imageUrl: 'https://images.unsplash.com/photo-1551829142-d9b812eb1a9b?auto=format&fit=crop&w=800&q=80',
    description: 'A spectacular high alpine ridge with perpetual snow, offering jaw-dropping views of majestic snow-capped peaks.',
    keyAttractions: ['Snow Sledging', 'Glacial Vistas', 'Atal Tunnel Drive']
  },
  {
    id: 'badrinath', name: 'Manikaran Springs', type: 'spiritual', dayNum: 2, altitude: '5,774 ft',
    coordinates: { x: 62, y: 34 }, distanceToNext: 'Return to Camp', durationToNext: '30 mins', icon: '🛕',
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f0107a67df6e?auto=format&fit=crop&w=800&q=80',
    description: 'Famous natural hot sulfur springs and the ancient Manikaran Sahib Gurudwara nestled under high cliffs.',
    keyAttractions: ['Hot Springs', 'Historic Gurudwara', 'Langar Meal']
  }
];

export default function RouteJourney({ tripId, tripName }: RouteJourneyProps) {
  // Use appropriate destinations list based on active trip
  const isManali = tripId === "manali";
  const destinations = isManali ? MANALI_DESTINATIONS : VALLEY_OF_FLOWERS_DESTINATIONS;

  const [selectedNode, setSelectedNode] = useState<DestinationNode>(destinations[4] || destinations[0]); // Default Ghangaria/Solang
  const [hoveredNode, setHoveredNode] = useState<DestinationNode | null>(null);

  // Sync selected node when tripId changes
  useEffect(() => {
    setSelectedNode(isManali ? MANALI_DESTINATIONS[4] : VALLEY_OF_FLOWERS_DESTINATIONS[4]);
  }, [tripId, isManali]);

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'delhi':
        return <MapPin className="w-4 h-4 text-rose-400" />;
      case 'rishikesh':
        return <Droplets className="w-4 h-4 text-sky-400 animate-pulse" />;
      case 'joshimath':
        return <Mountain className="w-4 h-4 text-amber-400" />;
      case 'govindghat':
        return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'ghangaria':
        return <Mountain className="w-4 h-4 text-teal-400" />;
      case 'valley_of_flowers':
        return isManali ? <Sparkles className="w-4 h-4 text-emerald-300" /> : <Flower2 className="w-4 h-4 text-fuchsia-400 animate-pulse" />;
      case 'hemkund_sahib':
        return <Snowflake className="w-4 h-4 text-blue-300" />;
      case 'badrinath':
        return isManali ? <Flame className="w-4 h-4 text-orange-400" /> : <Landmark className="w-4 h-4 text-orange-400" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <section id="route-explorer" className="relative bg-[#F2EFE9] py-24 px-6 border-t border-b border-neutral-200 overflow-hidden text-neutral-900">
      {/* Dynamic ambient backdrop glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gradient-to-b from-brand-sand/[0.08] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3 py-1 bg-brand-sand/15 border border-brand-sand/30 rounded-full">
              ROUTE & ALTITUDE MAP
            </span>
            <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider font-mono">Interactive Planner</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-display text-neutral-900">
            Himalayan Route <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
              Explorer
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl font-light leading-relaxed">
            Click on any destination node along the mountain trail to inspect key altitude metrics, travel times, photo summaries, and quick itinerary links.
          </p>
        </div>

        {/* Interactive Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Container (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-4 sm:p-10 relative overflow-hidden h-[450px] sm:h-[550px] shadow-sm">
            
            {/* Subtle Decorative Mountains Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,400 L 150,200 L 300,350 L 500,100 L 700,380 L 900,150 L 1000,400 Z" fill="#DFC394" />
                <path d="M 50,450 L 250,250 L 450,400 L 650,150 L 800,350 L 1000,450 Z" fill="#DFC394" />
              </svg>
            </div>

            {/* Altitude Reference Lines */}
            <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between text-[8px] sm:text-[10px] font-mono text-neutral-500 pointer-events-none border-l border-neutral-200 pl-2 z-10">
              {isManali ? (
                <>
                  <div>
                    <p className="font-bold text-[#9C753B]">13,058 ft</p>
                    <p>Rohtang Pass</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">8,400 ft</p>
                    <p>Solang Valley</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">6,726 ft</p>
                    <p>Manali Arrival</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">5,182 ft</p>
                    <p>Kasol Base</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">700 ft</p>
                    <p>Delhi Plains</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-bold text-[#9C753B]">14,203 ft</p>
                    <p>Hemkund Sahib</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">11,811 ft</p>
                    <p>Valley of Flowers</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">10,000 ft</p>
                    <p>Ghangaria Base</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">6,000 ft</p>
                    <p>Govindghat / Joshimath</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#9C753B]">700 ft</p>
                    <p>Delhi Plains</p>
                  </div>
                </>
              )}
            </div>

            {/* Actual SVG Map Path */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Road Trip: Delhi -> Rishikesh/Mandi */}
              <line
                x1="50" y1="92" x2="48" y2="72"
                stroke="rgba(156, 117, 59, 0.25)" strokeWidth="1" strokeDasharray="2"
              />
              {/* Road Trip: Rishikesh/Mandi -> Joshimath/Kasol */}
              <path
                d="M 48,72 Q 44,65 52,55"
                fill="none" stroke="rgba(156, 117, 59, 0.25)" strokeWidth="1" strokeDasharray="2"
              />
              {/* Road Trip: Joshimath/Kasol -> Govindghat/Manali */}
              <line
                x1="52" y1="55" x2="50" y2="42"
                stroke="rgba(156, 117, 59, 0.25)" strokeWidth="1" strokeDasharray="2"
              />
              {/* Trek: Govindghat/Manali -> Ghangaria/Solang */}
              <path
                d="M 50,42 Q 45,36 44,30"
                fill="none" stroke={isManali ? "#10b981" : "#059669"} strokeWidth="1.5"
              />
              {/* Left Branch: Ghangaria/Solang -> Valley of Flowers/Jogini */}
              <path
                d="M 44,30 Q 34,26 30,22"
                fill="none" stroke={isManali ? "#34d399" : "#d946ef"} strokeWidth="1.5" strokeDasharray="1.5"
              />
              {/* Right Branch: Ghangaria/Solang -> Hemkund/Rohtang */}
              <path
                d="M 44,30 Q 52,24 58,18"
                fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="1.5"
              />
              {/* Side Branch: Govindghat/Kasol -> Badrinath/Manikaran */}
              <path
                d="M 50,42 Q 58,38 62,34"
                fill="none" stroke="#ea580c" strokeWidth="1.2" strokeDasharray="2"
              />
            </svg>

            {/* Nodes Wrapper */}
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
                    {/* Visual Circle Anchor Button */}
                    <button
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`relative p-2.5 rounded-full transition-all duration-300 outline-none flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#9C753B] border-2 border-[#9C753B] text-white scale-110 shadow-lg'
                          : isHovered
                          ? 'bg-emerald-600 text-white scale-105 shadow'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:border-[#9C753B]/50 hover:bg-neutral-50'
                      }`}
                    >
                      {/* Glowing Pulse for core target destinations */}
                      {node.type === 'destination' && !isSelected && (
                        <span className="absolute inset-0 rounded-full bg-brand-sand/30 opacity-40 animate-ping" />
                      )}
                      <div className="w-4 h-4 flex items-center justify-center">
                        {getNodeIcon(node.id)}
                      </div>
                    </button>

                    {/* Micro Label Card */}
                    <span
                      onClick={() => setSelectedNode(node)}
                      className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all duration-300 border ${
                        isSelected
                          ? 'bg-[#9C753B] text-white border-[#9C753B] font-black shadow-sm'
                          : 'bg-white/95 border border-neutral-200 text-neutral-600 hover:text-neutral-900 shadow-sm'
                      }`}
                    >
                      {node.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats Banner Overlay inside Map */}
            <div className="absolute bottom-4 right-4 left-16 bg-neutral-50/95 backdrop-blur-md border border-neutral-200 p-3.5 rounded-2xl shadow-lg flex justify-between items-center gap-3 z-20">
              <div>
                <p className="text-[8px] uppercase font-bold tracking-wider text-neutral-500">Trek Path Difficulty</p>
                <p className="text-[10px] font-semibold text-[#9C753B] flex items-center gap-1 mt-0.5">
                  🏆 {isManali ? "Easy to Moderate" : "Moderate Alpine Trails"}
                </p>
              </div>
              <div className="hidden sm:block h-6 w-[1px] bg-neutral-200" />
              <div>
                <p className="text-[8px] uppercase font-bold tracking-wider text-neutral-500">Total Trek Distance</p>
                <p className="text-[10px] font-semibold text-neutral-800 mt-0.5">
                  {isManali ? "14 km (Roundtrip)" : "24 km (Roundtrip)"}
                </p>
              </div>
              <div className="hidden sm:block h-6 w-[1px] bg-neutral-200" />
              <div>
                <p className="text-[8px] uppercase font-bold tracking-wider text-neutral-500">Peak Elevation</p>
                <p className="text-[10px] font-semibold text-sky-600 mt-0.5 font-mono">
                  {isManali ? "13,058 ft" : "14,203 ft"}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Node Profile (5 Columns) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-lg relative flex flex-col justify-between min-h-[500px]"
              >
                {/* Visual ambient accent glow inside the card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-sand/10 rounded-full filter blur-2xl" />

                {/* Cover Banner of Selected Destination */}
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={selectedNode.imageUrl}
                    alt={selectedNode.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex flex-col justify-end p-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase ${
                        selectedNode.type === 'destination' ? 'bg-fuchsia-100 border border-fuchsia-200 text-fuchsia-700' :
                        selectedNode.type === 'pickup' ? 'bg-indigo-100 border border-indigo-200 text-indigo-700' :
                        'bg-slate-100 border border-slate-200 text-slate-700'
                      }`}>
                        {selectedNode.type === 'destination' ? 'Core Target' : selectedNode.type}
                      </span>
                      <span className="text-neutral-500 text-[10px] font-mono font-semibold">Day {selectedNode.dayNum} Stop</span>
                    </div>
                    <h4 className="text-2xl font-black text-neutral-900 uppercase mt-1 tracking-tight font-display">
                      {selectedNode.name}
                    </h4>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  
                  {/* Grid details */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-500 text-[9px] block font-mono uppercase tracking-widest font-semibold">Altitude</span>
                      <span className="text-[#9C753B] font-black font-mono text-base">{selectedNode.altitude}</span>
                    </div>
                    {selectedNode.distanceToNext && (
                      <div>
                        <span className="text-neutral-500 text-[9px] block font-mono uppercase tracking-widest font-semibold">To Next Stop</span>
                        <span className="text-neutral-800 font-bold text-sm">
                          {selectedNode.distanceToNext}
                          {selectedNode.durationToNext && (
                            <span className="text-[10px] text-neutral-500 block font-normal font-mono">
                              ({selectedNode.durationToNext})
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description Paragraph */}
                  <div>
                    <p className="text-neutral-700 text-xs leading-relaxed font-light">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Highlights and Attractions */}
                  <div>
                    <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider block mb-2 font-mono">
                      Key Highlights
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.keyAttractions.map((attraction, i) => (
                        <span
                           key={i}
                           className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-[10px] px-2.5 py-1 rounded-lg transition-colors hover:bg-neutral-100"
                        >
                          {attraction}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Navigate to day button */}
                  <button
                    onClick={() => {
                      const target = document.getElementById("story-timeline");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#9C753B] hover:bg-brand-charcoal hover:text-white text-white text-[10px] tracking-widest uppercase font-black py-3.5 px-4 rounded-xl transition-all duration-300 active:scale-95 shadow-md"
                  >
                    View Day {selectedNode.dayNum} Itinerary Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Rapid Navigation Button list at bottom of map */}
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-2">
          {destinations.map((node, i) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`py-2.5 px-2 text-[8px] sm:text-[9px] font-black uppercase tracking-widest rounded-xl border text-center transition-all ${
                selectedNode.id === node.id
                  ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
              }`}
            >
              STOP {i + 1}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
