import React from "react";
import { 
  Bus, Hotel, Tent, Utensils, Mountain, Flame, Music, UserCheck, 
  ReceiptText, AlertTriangle, ShieldCheck, HelpCircle, XCircle, MapPin, Sparkles
} from "lucide-react";

interface InclusionsProps {
  inclusions: { text: string; icon?: string }[];
  exclusions: { text: string }[];
}

// Micro-helper to switch icons for inclusion categories
function renderInclusionIcon(name?: string) {
  const css = "w-5 h-5 text-[#9C753B]";
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
    <section id="whats-included" className="relative bg-white py-24 px-6 overflow-hidden text-neutral-900 border-t border-b border-neutral-200">
      {/* Background ambient noise patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[500px] bg-[radial-gradient(circle,rgba(156,117,59,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* Section double-headings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-4 border-b border-neutral-200">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full">
              TRANSPARENCY & BUDGETS
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight font-display text-neutral-900">
              Everything Covered for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-700">
                a Smooth Escape
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 max-w-lg font-light leading-relaxed">
            We value honest travel. Every major logistical coordinate from comfortable AC transportation to hygienic campsite meals is fully bundled, so you have zero surprise fees.
          </p>
        </div>

        {/* Big Grid Layout: Left is Inclusions, Right is Exclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Panel: Inclusions (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded bg-brand-sand/15 text-[#9C753B] border border-brand-sand/30 text-[9px] font-black uppercase font-mono tracking-widest">
                INCLUDED PASS PERKS
              </span>
              <span className="text-xs text-neutral-500 font-bold">{inclusions.length} premium coverages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inclusions.map((item, i) => (
                <div 
                  key={i} 
                  className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 hover:border-[#9C753B]/40 hover:bg-[#FAF9F6]/50 transition-all duration-300 flex items-start gap-4 shadow-sm"
                >
                  <div className="p-3 bg-white rounded-xl border border-neutral-200 flex-shrink-0 shadow-sm">
                    {renderInclusionIcon(item.icon)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-neutral-800">
                      {item.text.split(" stay ")[0]}
                    </p>
                    <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Exclusions (5 columns) */}
          <div className="lg:col-span-5 bg-[#FAF9F6] border border-neutral-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-6 shadow-sm">
            {/* Visual warning border on top edge */}
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-brand-sand to-amber-500" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#9C753B]" />
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight font-display uppercase">
                  Keep This in Mind
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                To keep our high-altitude price tag strictly affordable, a few self-driven adventure coordinates and personal choices remain out-of-package.
              </p>
            </div>

            <div className="space-y-3.5 border-t border-neutral-200 pt-6">
              {exclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                  <XCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed text-neutral-600 font-light">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick trust reassurance badge */}
            <div className="p-4 rounded-2xl bg-brand-sand/10 border border-brand-sand/20 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#9C753B] flex-shrink-0" />
              <p className="text-[10px] text-neutral-700 leading-relaxed font-light">
                Need details regarding activities? Reach out to our team via WhatsApp for verified local booking vendor listings to dodge inflated tourist fees.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
