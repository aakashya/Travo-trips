import { useState } from "react";
import { Minus, Plus, ShieldQuestion } from "lucide-react";

interface TermsAccordionProps {
  termsAccordion: { title: string; content: string }[];
  tripName: string;
}

export default function TermsAccordion({ termsAccordion, tripName }: TermsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="terms" className="relative bg-[#FAF9F6] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-neutral-900 border-t border-neutral-200">
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-sand/[0.08] filter blur-3xl rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full">
            TRANSPARENCY CHARTER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight font-display uppercase">Before You Travel</h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light leading-relaxed">
            Review the booking, refund, safety, conduct, and itinerary guidelines for your journey.
          </p>
        </div>

        <div className="space-y-4">
          {termsAccordion.map((term, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={term.title} className={`rounded-2xl border transition-all duration-300 shadow-sm ${isOpen ? "bg-white border-brand-sand/40" : "bg-white/80 border-neutral-200 hover:border-neutral-300"}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full py-5 px-4 sm:px-6 flex items-center justify-between gap-3 text-left focus:outline-none">
                  <span className="text-sm sm:text-base font-bold text-neutral-800">{term.title}</span>
                  <span className={`p-1.5 rounded-full ${isOpen ? "bg-brand-sand text-brand-charcoal" : "bg-neutral-100 text-neutral-500"} transition-colors`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && <div className="px-4 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light border-t border-neutral-200 pt-4 animate-[fadeIn_0.3s_ease-out]">{term.content}</div>}
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
          <div className="flex items-center gap-3">
            <ShieldQuestion className="w-5 h-5 text-brand-sand flex-shrink-0" />
            <p className="text-xs text-neutral-600 leading-relaxed">
              Have specific queries about the <strong className="text-neutral-900">{tripName}</strong>? Let our support captains solve them.
            </p>
          </div>
          <a href={`https://wa.me/919996965697?text=${encodeURIComponent(`Hi TRAVO, I'd like to know more about the rules for the ${tripName} expedition.`)}`} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-[#9C753B] hover:text-neutral-900 transition-colors uppercase tracking-widest shrink-0">
            Chat Captain Now
          </a>
        </div>
      </div>
    </section>
  );
}
