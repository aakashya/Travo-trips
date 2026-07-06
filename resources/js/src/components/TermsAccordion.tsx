import { useState } from "react";
import { Minus, Plus, ShieldQuestion } from "lucide-react";

interface TermsAccordionProps {
  termsAccordion: { title: string; content: string }[];
  tripName: string;
}

export default function TermsAccordion({ termsAccordion, tripName }: TermsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="terms" className="relative bg-[#050B14] py-24 px-6 overflow-hidden text-white">
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-sand/[0.03] filter blur-3xl rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full">
            TRANSPARENCY CHARTER
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-display uppercase">Before You Travel</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Review our simple regulations on bookings, refunds, safety, and mountain guidelines.
          </p>
        </div>

        <div className="space-y-4">
          {termsAccordion.map((term, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={term.title} className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-white/[0.03] border-brand-sand/40" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none">
                  <span className="text-sm sm:text-base font-bold text-gray-200">{term.title}</span>
                  <span className={`p-1.5 rounded-full ${isOpen ? "bg-brand-sand text-brand-charcoal" : "bg-white/5 text-gray-400"} transition-colors`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && <div className="px-6 pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed font-light border-t border-white/5 pt-4 animate-[fadeIn_0.3s_ease-out]">{term.content}</div>}
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-[#090D16] border border-white/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
          <div className="flex items-center gap-3">
            <ShieldQuestion className="w-5 h-5 text-brand-sand flex-shrink-0" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Have specific queries about the <strong className="text-white">{tripName}</strong>? Let our support captains solve them.
            </p>
          </div>
          <a href={`https://wa.me/911234567890?text=${encodeURIComponent(`Hi TRAVO, I'd like to know more about the rules for the ${tripName} expedition.`)}`} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-brand-sand hover:text-white transition-colors uppercase tracking-widest shrink-0">
            Chat Captain Now
          </a>
        </div>
      </div>
    </section>
  );
}
