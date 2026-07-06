import { useEffect, useState } from "react";
import { Check, Luggage, RotateCcw, Sparkles, Star } from "lucide-react";

interface ChecklistProps {
  packingChecklist: { category: string; items: string[] }[];
  tripId: string;
}

export default function Checklist({ packingChecklist, tripId }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedItems({});
  }, [tripId]);

  const totalItemsCount = packingChecklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItemsCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedItemsCount / totalItemsCount) * 100) || 0;

  return (
    <section id="checklist" className="relative bg-[#090D16] py-24 px-6 border-t border-b border-white/5 overflow-hidden text-white">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-sand/[0.03] rounded-full filter blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-charcoal px-3.5 py-1.5 bg-brand-sand rounded-full inline-flex items-center gap-2">
              <Luggage className="w-3.5 h-3.5 text-brand-charcoal animate-bounce" /> TRAVEL PACKING GUIDE
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight font-display uppercase">
              Pack Smart. <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">Wander Worry-Free.</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl font-light leading-relaxed">
              Check off items as you pack them into your bag.
            </p>
          </div>

          <div className="w-full lg:w-[420px] bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-brand-sand uppercase tracking-wider font-mono">Your Packing Stats</span>
              <span className="text-xs font-mono font-bold text-gray-400">{checkedItemsCount} / {totalItemsCount} Packed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden mb-4 relative">
              <div className="h-full bg-brand-sand transition-all duration-500 ease-out shadow-lg shadow-brand-sand/25" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{progressPercent === 100 ? "Ready to board" : "Fill your backpack"}</span>
              <button onClick={() => setCheckedItems({})} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-sand hover:text-white transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Reset List
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packingChecklist.map((category) => (
            <div key={category.category} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-base font-black text-brand-sand tracking-widest uppercase border-b border-white/5 pb-2.5 flex items-center justify-between">
                  <span>{category.category}</span>
                  <Sparkles className="w-4 h-4 text-brand-sand" />
                </h3>
                <div className="space-y-2.5">
                  {category.items.map((item) => {
                    const isChecked = checkedItems[item];
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }))}
                        className={`w-full p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none text-left ${
                          isChecked ? "bg-brand-sand/10 border-brand-sand text-brand-sand line-through" : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-xs font-medium leading-relaxed">{item}</span>
                        <span className={`w-5 h-5 rounded flex items-center justify-center transition-all ${isChecked ? "bg-brand-sand text-brand-charcoal" : "border border-white/20 bg-[#090D16]"}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-white/[0.01] border border-dashed border-white/10 flex items-start gap-4">
          <Star className="w-5 h-5 text-brand-sand flex-shrink-0 mt-0.5 animate-pulse" />
          <p className="text-[11px] text-gray-400 leading-relaxed font-light text-left">
            <strong className="text-white">Pro Tip:</strong> Pack light, keep hard cash, and carry charged power banks because cellular networks are erratic across high altitude routes.
          </p>
        </div>
      </div>
    </section>
  );
}
