import { Compass, Flame, Heart, Hotel, ShieldCheck, Smile } from "lucide-react";

interface StoryIntroProps {
  tripId?: string;
  tripName?: string;
}

export default function StoryIntro({ tripName }: StoryIntroProps) {
  const chapters = [
    { title: "Delhi Assemble", subtitle: "Strangers assemble as night falls", desc: "Warm handshakes, board the traveler, and hit the highway with upbeat tracks playing.", icon: <Compass className="w-5 h-5 text-brand-sand" />, color: "border-brand-sand/20 bg-brand-sand/5 text-brand-sand" },
    { title: "Cozy Group Vibe", subtitle: "The family you choose", desc: "Interactive icebreakers, curated road games, and shared laughter down mountain curves.", icon: <Smile className="w-5 h-5 text-sky-400" />, color: "border-sky-500/20 bg-sky-500/5 text-sky-300" },
    { title: "Handpicked Stays", subtitle: "Comfort in the wilderness", desc: "From riverside camps to premium hotels with sweeping valley views.", icon: <Hotel className="w-5 h-5 text-amber-400" />, color: "border-amber-500/20 bg-amber-500/5 text-amber-300" },
    { title: "Certified Captains", subtitle: "Experienced local leaders", desc: "Every expedition is supervised by passionate captains and trained local crew.", icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300" },
    { title: "Bonfires & DJ Nights", subtitle: "Starlit acoustic jams", desc: "Warm bonfires, private campsite parties, and cold-sky music circles.", icon: <Flame className="w-5 h-5 text-orange-400" />, color: "border-orange-500/20 bg-orange-500/5 text-orange-300" },
    { title: "Return with Stories", subtitle: "Strangers leave as family", desc: "Loaded memory cards, inside jokes, and promises to conquer the next valley.", icon: <Heart className="w-5 h-5 text-rose-400" />, color: "border-rose-500/20 bg-rose-500/5 text-rose-300" },
  ];

  return (
    <section id="chapter-intro" className="relative bg-[#050B14] py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-sand/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-sand/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full">
              {tripName ? `${tripName} Philosophy` : "TRAVO PHILOSOPHY"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display">
              Not just a trip.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-400">A mountain story.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
            Every travel company sells tickets, stays, and checklists. We write chapters.
          </p>
          <div className="space-y-6 text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
            <p>Your adventure starts in Delhi, boarding structured wheels alongside total strangers. As highways turn into pine-framed curves, quiet seatmates become inside-joke makers and adventure partners.</p>
            <p>By the time you feel alpine breeze, river flows, and midnight bonfires, you realize it was never just coordinates on a map. It is about raw freedom and the family you choose along the way.</p>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/5">
            <div><p className="text-2xl sm:text-3xl font-black text-white font-mono">18-35</p><p className="text-[10px] text-brand-sand font-semibold uppercase tracking-widest">Target Aged Crowd</p></div>
            <div><p className="text-2xl sm:text-3xl font-black text-white font-mono">100%</p><p className="text-[10px] text-brand-sand font-semibold uppercase tracking-widest">Curated Strangers Vibe</p></div>
          </div>
        </div>
        <div className="relative flex flex-col justify-center space-y-4">
          {chapters.map((ch, idx) => (
            <article key={ch.title} className="relative flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 text-left group">
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110 ${ch.color} shadow-lg shadow-black/40`}>{ch.icon}</div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2"><span className="text-[9px] font-mono uppercase tracking-widest text-brand-sand">Chapter 0{idx + 1}</span><span className="text-[10px] uppercase font-black text-gray-300 tracking-wider">{ch.title}</span></div>
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight font-display">{ch.subtitle}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{ch.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
