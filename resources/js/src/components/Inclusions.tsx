import { AlertTriangle, Bus, Flame, HelpCircle, Hotel, MapPin, Mountain, Music, ReceiptText, ShieldCheck, Sparkles, Tent, UserCheck, Utensils, XCircle } from "lucide-react";

interface InclusionsProps {
  inclusions: { text: string; icon?: string }[];
  exclusions: { text: string }[];
}

function renderInclusionIcon(name?: string) {
  const css = "w-5 h-5 text-brand-sand";
  switch (name) {
    case "Bus": return <Bus className={css} />;
    case "Hotel": return <Hotel className={css} />;
    case "Tent": return <Tent className={css} />;
    case "Utensils": return <Utensils className={css} />;
    case "Mountain": return <Mountain className={css} />;
    case "Flame": return <Flame className={css} />;
    case "Music": return <Music className={css} />;
    case "UserCheck": return <UserCheck className={css} />;
    case "ReceiptText": return <ReceiptText className={css} />;
    case "MapPin": return <MapPin className={css} />;
    case "Sparkles": return <Sparkles className={css} />;
    default: return <ShieldCheck className={css} />;
  }
}

export default function Inclusions({ inclusions, exclusions }: InclusionsProps) {
  return (
    <section id="whats-included" className="relative bg-[#050B14] py-24 px-6 overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[500px] bg-[radial-gradient(circle,rgba(229,225,214,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-4 border-b border-white/5">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full">TRANSPARENCY & BUDGETS</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight font-display">
              Everything Covered for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">a Smooth Escape</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 max-w-lg font-light leading-relaxed">
            Every major logistical coordinate is bundled, so you have zero surprise fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded bg-brand-sand/20 text-brand-sand border border-brand-sand/30 text-[9px] font-black uppercase font-mono tracking-widest">INCLUDED PASS PERKS</span>
              <span className="text-xs text-gray-400 font-bold">{inclusions.length} premium coverages</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inclusions.map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">{renderInclusionIcon(item.icon)}</div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-gray-200">{item.text.split(" stay ")[0]}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#090D16]/40 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-6">
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-brand-sand to-amber-500" />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-brand-sand" />
                <h3 className="text-lg font-bold text-white tracking-tight font-display uppercase">Keep This in Mind</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">A few personal choices and adventure add-ons remain out of package.</p>
            </div>
            <div className="space-y-3.5 border-t border-white/5 pt-6">
              {exclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <XCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed text-gray-400 font-light">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-brand-sand/5 border border-brand-sand/15 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-brand-sand flex-shrink-0" />
              <p className="text-[10px] text-gray-300 leading-relaxed font-light">Need details regarding activities? Reach out via WhatsApp for verified local vendor listings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
