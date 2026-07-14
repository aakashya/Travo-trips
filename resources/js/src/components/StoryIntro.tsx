import React from "react";
import { Compass, Sparkles, MapPin, Smile, Layers, Heart, Users, ShieldCheck, Flame, Music, Bus, Hotel } from "lucide-react";

interface Chapter {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

interface StoryIntroProps {
  chapters?: Chapter[];
  tripId?: string;
  tripName?: string;
}

export default function StoryIntro({ chapters, tripId, tripName }: StoryIntroProps) {
  // If no chapters are passed, we display the beautiful, generic TRAVO Company Philosophy & Value Pillars
  const displayChapters = chapters || [
    {
      title: "Delhi Assemble",
      subtitle: "Strangers assemble as night falls",
      desc: "Warm handshakes, board the traveler, and hit the highway with upbeat tracks playing.",
      icon: <Compass className="w-5 h-5 text-brand-sand" />,
      color: "border-brand-sand/30 bg-brand-sand/10 text-[#9C753B]"
    },
    {
      title: "Cozy Group Vibe",
      subtitle: "The family you choose",
      desc: "Interactive group icebreakers, curated road trip games, and shared laughter down the mountain curves.",
      icon: <Smile className="w-5 h-5 text-sky-600" />,
      color: "border-sky-500/30 bg-sky-500/10 text-sky-700"
    },
    {
      title: "Handpicked Stays",
      subtitle: "Comfort in the wilderness",
      desc: "From riverside alpine camps to premium hotels with sweeping views of the mist-covered valleys.",
      icon: <Hotel className="w-5 h-5 text-amber-600" />,
      color: "border-amber-500/30 bg-amber-500/10 text-amber-800"
    },
    {
      title: "Certified Captains",
      subtitle: "Experienced local leaders",
      desc: "Every expedition is supervised by highly passionate local trip captains and trained mountaineering crew.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
    },
    {
      title: "Bonfires & DJ Nights",
      subtitle: "Starlit acoustic jams",
      desc: "Gather under millions of stars for warm crackling bonfires, live guitar beats, and private campsite parties.",
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      color: "border-orange-500/30 bg-orange-500/10 text-orange-700"
    },
    {
      title: "Return with Stories",
      subtitle: "Strangers leave as family",
      desc: "Come back with loaded memory cards, inside jokes, and promises to conquer the next high valley together.",
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      color: "border-rose-500/30 bg-rose-500/10 text-rose-700"
    }
  ];

  return (
    <section id="chapter-intro" className="relative bg-[#FAF9F6] py-24 md:py-32 px-6 overflow-hidden border-b border-neutral-200">
      {/* Visual glowing geometric background element */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        
        {/* Left Side: Bold Storytelling Narrative */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full">
              {tripName ? `${tripName} Philosophy` : "TRAVO PHILOSOPHY"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight font-display">
              Not just a trip.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800 font-display">
                A mountain story.
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
            Every travel company sells tickets, stays, and checklists of standard landmarks. We don’t check boxes. We write chapters. 
          </p>

          <div className="space-y-6 text-neutral-600 text-xs sm:text-sm leading-relaxed font-light">
            <p>
              Your adventure starts in the concrete corridors of Delhi, boarding structured wheels alongside a crowd of total strangers. As the highways transition to winding pine-framed curves, those silent seatmates quickly become code-sharers, inside-jokes makers, and adventure partners.
            </p>
            <p>
              By the time you feel the biting alpine breeze, dip into crystal river flows, and huddle around crackling midnight bonfires under millions of stars, you'll realize it was never about the coordinates on a map. It’s about the raw freedom, the late night guitar chords, the shared steaming momos, and the family you choose along the way.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-neutral-200">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">18-35</p>
              <p className="text-[10px] text-[#9C753B] font-semibold uppercase tracking-widest">Target Aged Crowd</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">100%</p>
              <p className="text-[10px] text-[#9C753B] font-semibold uppercase tracking-widest font-sans">Curated Strangers Vibe</p>
            </div>
          </div>
        </div>

        {/* Right Side: Vertical Timeline Mini Cards */}
        <div className="relative flex flex-col justify-center space-y-4">
          
          {displayChapters.map((ch, idx) => (
            <div 
              key={idx} 
              className="relative flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200 hover:border-[#9C753B]/30 hover:bg-neutral-50 hover:shadow-lg transition-all duration-300 text-left group"
            >
              {/* Timeline marker node */}
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110 ${ch.color} shadow-md`}>
                {ch.icon}
              </div>

              {/* Chapter narrative text */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#9C753B]">
                    Chapter 0{idx + 1}
                  </span>
                  <span className="text-neutral-400 font-bold text-[9px]">•</span>
                  <span className="text-[10px] uppercase font-black text-neutral-500 tracking-wider">
                    {ch.title}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-neutral-900 uppercase tracking-tight font-display">
                  {ch.subtitle}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {ch.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
