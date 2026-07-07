import { useState } from "react";
import { CheckCircle, Download, Flame, MessageSquare } from "lucide-react";
import { AppView } from "../App";

interface FooterCTAProps {
  onOpenBooking: () => void;
  tripId: string;
  tripName: string;
  price: string;
  bgImage: string;
  isHomeView?: boolean;
  onNavigate?: (view: AppView) => void;
}

export default function FooterCTA({ onOpenBooking, tripName, price, bgImage, isHomeView = false, onNavigate }: FooterCTAProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1800);
  };

  return (
    <footer className="relative bg-[#050B14] text-white overflow-hidden select-none">
      <div className="relative py-28 md:py-36 px-6 border-t border-white/5 flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none filter brightness-50" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090D16] via-transparent to-[#050B14] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sand/20 text-brand-sand border border-brand-sand/30 text-[10px] font-black uppercase tracking-widest animate-[pulse_2s_infinite]">
            <Flame className="w-3.5 h-3.5 fill-current" /> SPOTS FOR THIS SEASON ARE FILLING FAST
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight font-display uppercase">
            {isHomeView ? "BEGIN YOUR" : "READY FOR"}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-400 font-display">
              {isHomeView ? "HIMALAYAN ODYSSEY" : "THE MOUNTAINS?"}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-md mx-auto font-light">
            {isHomeView ? "Two legendary trails. Raw group energy. Lifelong connections." : `Join our curated group batch for the ${tripName} expedition.`}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            {isHomeView ? (
              <button onClick={() => onNavigate?.("manali")} className="w-full sm:w-auto px-8 py-4 bg-brand-sand hover:bg-white text-brand-charcoal font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
                Explore Active Expeditions
              </button>
            ) : (
              <a href={`https://wa.me/911234567890?text=${encodeURIComponent(`Hi TRAVO! I am interested in the ${tripName} expedition. Are slots available?`)}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 fill-current text-white" /> Book on WhatsApp
              </a>
            )}

            {!isHomeView && (
              <button onClick={handleDownload} disabled={downloading} className="w-full sm:w-auto px-6 py-4 border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0">
                {downloading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating Booklet...</>
                ) : downloadSuccess ? (
                  <><CheckCircle className="w-4 h-4 text-emerald-400" /> Success! Saved</>
                ) : (
                  <><Download className="w-4 h-4 text-brand-sand" /> Download Itinerary PDF</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-8 px-6 bg-[#040810] text-center text-xs text-gray-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
          <button onClick={() => onNavigate?.("home")} className="flex items-center focus:outline-none">
            <span className="h-11 w-32 overflow-hidden rounded bg-brand-sand-light border border-white/10 flex items-center justify-center p-1">
              <img
                src="/images/travo-logo.jpeg"
                alt="TRAVO"
                className="h-full w-full object-contain object-center"
                decoding="async"
              />
            </span>
          </button>
          <div className="flex gap-6 text-[9px] font-black tracking-widest">
            <button onClick={() => onNavigate?.("home")} className="hover:text-white transition-colors uppercase">HOME</button>
            <button onClick={() => onNavigate?.("manali")} className="hover:text-white transition-colors uppercase">MANALI</button>
            <button onClick={() => onNavigate?.("valley-of-flowers")} className="hover:text-white transition-colors uppercase">VALLEY OF FLOWERS</button>
          </div>
          <p className="text-[9px] text-gray-600">&copy; {new Date().getFullYear()} TRAVO Inc. All rights reserved.</p>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <a href={`https://wa.me/911234567890?text=${encodeURIComponent(isHomeView ? "Hi TRAVO! I have a general query about upcoming Himalayan group trips." : `Hi TRAVO! I have a question regarding the ${tripName} expedition.`)}`} target="_blank" rel="noopener noreferrer" className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl scale-100 hover:scale-110 active:scale-95 transition-all" title="Speak to Trip Captain">
          <span className="absolute -inset-1.5 rounded-full border border-emerald-500/40 animate-ping pointer-events-none" />
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform origin-right bg-[#090D16] border border-white/5 font-bold uppercase tracking-widest font-mono text-[9px] text-brand-sand px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl">COORDINATOR ONLINE</span>
        </a>
      </div>

      {!isHomeView && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#090D16]/95 backdrop-blur-md border-t border-white/5 py-3 px-6 flex md:hidden items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold leading-none">{tripName.split(" ")[0]} Pass</p>
            <p className="text-sm font-black text-white font-mono">{price} <span className="text-[10px] font-normal text-gray-400">/ traveler</span></p>
          </div>
          <button onClick={onOpenBooking} className="px-6 py-2.5 bg-brand-sand hover:bg-white font-black text-xs uppercase tracking-widest text-brand-charcoal rounded-full shadow-lg active:scale-95 transition-all outline-none">Book Now</button>
        </div>
      )}
    </footer>
  );
}
