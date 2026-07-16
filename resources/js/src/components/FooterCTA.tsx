import { useState } from "react";
import { MessageSquare, Download, Flame, CheckCircle } from "lucide-react";
import type { AppView } from "../App";

interface FooterCTAProps {
  onOpenBooking: () => void;
  tripId: string;
  tripName: string;
  price: string;
  bgImage: string;
  isHomeView?: boolean;
  onNavigate?: (view: AppView) => void;
}

export default function FooterCTA({
  onOpenBooking,
  tripId,
  tripName,
  price,
  bgImage,
  isHomeView = false,
  onNavigate
}: FooterCTAProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    // Simulate compilation of trip PDF booklet
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1800);
  };

  return (
    <footer className="relative bg-[#E5E1D6] text-brand-charcoal overflow-hidden select-none border-t border-neutral-300">
      
      {/* Final Cinematic CTA Area with Camp Backdrops */}
      <div className="relative py-28 md:py-36 px-6 border-t border-black/5 flex flex-col justify-center items-center text-center">
        {/* Parallax background image of campfire tents */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 select-none pointer-events-none filter brightness-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1D6] via-[#E5E1D6]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/20 via-transparent to-[#E5E1D6] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C753B]/25 text-[#735222] border border-[#9C753B]/35 text-[10px] font-black uppercase tracking-widest animate-[pulse_2s_infinite]">
            <Flame className="w-3.5 h-3.5 fill-current" /> SPOTS FOR THIS SEASON ARE FILLING FAST
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight font-display uppercase text-brand-charcoal">
            {isHomeView ? "BEGIN YOUR" : "READY FOR"}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] via-brand-charcoal to-neutral-700 font-display">
              {isHomeView ? "HIMALAYAN ODYSSEY" : "THE MOUNTAINS?"}
            </span>
          </h2>

          <p className="text-xs md:text-sm text-neutral-800 leading-relaxed max-w-md mx-auto font-medium">
            {isHomeView 
              ? "“Two legendary trails. Raw, uncompromised group vibes. Lifelong connections.” Step away from your daily screen and breathe the fresh alpine wind."
              : `Join our curated group batch for the ${tripName} expedition. Limited seats, real companions, and memories that outlast the season.`}
          </p>

          {/* Large buttons */}
          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            {isHomeView ? (
              <button
                onClick={() => onNavigate && onNavigate("manali")}
                className="w-full sm:w-auto px-8 py-4 bg-[#9C753B] hover:bg-brand-charcoal text-white hover:text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Explore Active Expeditions
              </button>
            ) : (
              <a
                href={`https://wa.me/919996965697?text=${encodeURIComponent(`Hi TRAVO! My friends and I are stoked about the upcoming ${tripName} expedition. Are slots available?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-current text-white" /> Book on WhatsApp
              </a>
            )}

            {!isHomeView && (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto px-6 py-4 border border-brand-charcoal/20 hover:border-brand-charcoal/30 bg-white/80 hover:bg-neutral-100 text-brand-charcoal text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                {downloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                    Generating Booklet...
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Success! Saved
                  </>
                ) : (
                  <>
                    <Download className="w-4.5 h-4.5 text-[#9C753B]" />
                    Download Itinerary PDF
                  </>
                )}
              </button>
            )}
          </div>

          {/* Quick micro validation indicators */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-neutral-600 font-bold">
            <span className="flex items-center gap-1">🛡️ verified secure operators</span>
            <span className="flex items-center gap-1">🗺️ hand-vetted alpine trails</span>
            <span className="flex items-center gap-1">⭐ 4.9 Rating (420+ campers)</span>
          </div>
        </div>
      </div>

      {/* Main minimal footer line mapping credentials */}
      <div className="border-t border-black/5 py-8 px-6 bg-[#D8D3C5] text-center text-xs text-neutral-600 font-mono space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
          <button
            onClick={() => onNavigate && onNavigate("home")}
            className="flex items-center focus:outline-none"
            aria-label="Go to TRAVO home"
          >
            <span className="h-11 w-32 overflow-hidden rounded bg-white border border-neutral-300 flex items-center justify-center">
              <img
                src="/images/logo/travo-logo-website.png"
                alt="TRAVO logo"
                className="h-full w-full object-cover object-center"
                decoding="async"
              />
            </span>
          </button>

          <div className="flex gap-6 text-[9px] font-black tracking-widest text-neutral-700">
            <button onClick={() => onNavigate && onNavigate("home")} className="hover:text-neutral-900 transition-colors uppercase">HOME</button>
            <button onClick={() => onNavigate && onNavigate("manali")} className="hover:text-neutral-900 transition-colors uppercase">MANALI</button>
            <button onClick={() => onNavigate && onNavigate("valley-of-flowers")} className="hover:text-neutral-900 transition-colors uppercase">VALLEY OF FLOWERS</button>
          </div>

          <p className="text-[9px] text-neutral-600 font-semibold">
            © {new Date().getFullYear()} TRAVO Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Sticky Circular Contact badge on right corner of viewport */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/919996965697?text=${encodeURIComponent(isHomeView ? "Hi TRAVO! I'd like to ask a general query about upcoming Himalayan group trips." : `Hi TRAVO! I have a question regarding the ${tripName} expedition.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl scale-100 hover:scale-110 active:scale-95 transition-all"
            title="Chat with us"
        >
          {/* Pulsing surrounding ring */}
          <span className="absolute -inset-1.5 rounded-full border border-emerald-500/40 animate-ping pointer-events-none" />
          
          <MessageSquare className="w-6 h-6 fill-current" />
          
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-transform origin-right bg-white border border-neutral-200 font-bold uppercase tracking-widest font-mono text-[9px] text-[#9C753B] px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl">
              CHAT WITH US
          </span>
        </a>
      </div>

      {/* Sticky Mobile bottom Booking bar */}
      {!isHomeView && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-3 px-6 flex md:hidden items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-neutral-600 font-bold leading-none">{tripName.split(" ")[0]} Pass</p>
            <p className="text-sm font-black text-neutral-900 font-mono">{price} <span className="text-[10px] font-normal text-neutral-600">/ traveler</span></p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#9C753B] hover:bg-brand-charcoal text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg active:scale-95 transition-all outline-none"
          >
            Book Now
          </button>
        </div>
      )}

    </footer>
  );
}
