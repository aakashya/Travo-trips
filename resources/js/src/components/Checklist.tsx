import React, { useState, useEffect } from "react";
import { Check, RotateCcw, Luggage, Star, Sparkles } from "lucide-react";

interface ChecklistProps {
  packingChecklist: { category: string; items: string[] }[];
  tripId: string;
}

export default function Checklist({ packingChecklist, tripId }: ChecklistProps) {
  // Store ticked items in local state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedItems({}); // reset checklist whenever trip changes
  }, [tripId]);

  const toggleItem = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  // Calculate statistics
  const totalItemsCount = packingChecklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItemsCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedItemsCount / totalItemsCount) * 100) || 0;

  return (
    <section id="checklist" className="relative bg-[#F2EFE9] py-16 sm:py-24 px-4 sm:px-6 border-t border-b border-neutral-200 overflow-hidden text-neutral-900">
      {/* Light glow elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* Header section with Stats Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-charcoal px-3.5 py-1.5 bg-brand-sand rounded-full inline-flex items-center gap-2 shadow-sm">
              <Luggage className="w-3.5 h-3.5 text-brand-charcoal animate-bounce" /> TRAVEL PACKING GUIDE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-display uppercase text-neutral-900">
              Pack Smart. <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-700">
                Wander Worry-Free.
              </span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 max-w-xl font-light leading-relaxed">
              Before hitting the highway, check this professional mountain checklist curated by our captains. Check off items as you pack them into your bag!
            </p>
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full lg:w-[420px] bg-white border border-neutral-200 rounded-3xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:justify-between gap-1 min-[380px]:items-center mb-3">
              <span className="text-xs font-black text-[#9C753B] uppercase tracking-wider font-mono">
                Your Packing Stats
              </span>
              <span className="text-xs font-mono font-bold text-neutral-500">
                {checkedItemsCount} / {totalItemsCount} Packed ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar background */}
            <div className="w-full h-3 bg-neutral-100 border border-neutral-200 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-[#9C753B] transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-wrap justify-between gap-2 items-center">
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                {progressPercent === 100 ? "🎉 Ready to board!" : "🎒 Fill your backpack"}
              </span>
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#9C753B] hover:text-[#7C552B] transition-colors"
                title="Reset packed items"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset List
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid Layout for Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packingChecklist.map((category) => (
            <div 
              key={category.category}
              className="p-4 sm:p-6 rounded-3xl bg-white border border-neutral-200 hover:border-[#9C753B]/55 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <h3 className="text-base font-black text-[#9C753B] tracking-widest uppercase border-b border-neutral-100 pb-2.5 flex items-center justify-between">
                  <span>{category.category}</span>
                  <Sparkles className="w-4 h-4 text-[#9C753B]" />
                </h3>

                <div className="space-y-2.5">
                  {category.items.map((item) => {
                    const isChecked = checkedItems[item];
                    return (
                      <div 
                        key={item}
                        onClick={() => toggleItem(item)}
                        className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none ${
                          isChecked 
                            ? "bg-brand-sand/15 border-[#9C753B] text-[#9C753B] line-through font-semibold" 
                            : "bg-neutral-50 border-neutral-100 text-neutral-700 hover:bg-neutral-100/70"
                        }`}
                      >
                        <span className="text-xs font-medium leading-relaxed">
                          {item}
                        </span>

                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          isChecked 
                            ? "bg-[#9C753B] text-white" 
                            : "border border-neutral-300 bg-white"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Packing Note Callout */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-brand-sand/10 border border-dashed border-[#9C753B]/30 flex items-start gap-4">
          <Star className="w-5 h-5 text-[#9C753B] flex-shrink-0 mt-0.5 animate-pulse" />
          <p className="text-[11px] text-neutral-700 leading-relaxed font-light text-left">
            <strong className="text-neutral-900 font-bold">Pro Tip:</strong> Packing light is always smart. Stick strictly to comfortable clothing options. Make sure to keep adequate hard cash during mountain strolls since cellular networks are erratic across high altitude streams.
          </p>
        </div>

      </div>
    </section>
  );
}
