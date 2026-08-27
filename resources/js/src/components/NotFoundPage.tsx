import React from "react";
import { Compass, ArrowRight, Home } from "lucide-react";
import SiteHeader from "./SiteHeader";

interface NotFoundPageProps {
  onNavigate: (view: string) => void;
}

// Shown for any URL that doesn't resolve to a real page or trip — a typo, a removed package, an
// old shared link. The server already answers with a real HTTP 404 for these (see routes/web.php),
// this is just what a human actually sees instead of the homepage quietly standing in for it.
export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SiteHeader currentView="not-found" onNavigate={onNavigate} variant="solid" />

      <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center space-y-7">
          <div className="space-y-1">
            <p className="text-7xl sm:text-8xl font-black font-display text-[#9C753B] leading-none">404</p>
            <div className="w-16 h-16 mx-auto -mt-2 rounded-2xl bg-[#9C753B]/10 border border-[#9C753B]/20 flex items-center justify-center">
              <Compass className="w-7 h-7 text-[#9C753B]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-neutral-900">
              This Trail Doesn't Exist
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
              The page or expedition you're looking for may have been renamed, moved, or never
              existed at this address. Let's get you back on route.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-[#9C753B] hover:bg-[#7C552B] active:scale-95 transition-all shadow-md shadow-[#9C753B]/20"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("trips")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-700 border border-neutral-300 hover:border-[#9C753B] hover:text-[#9C753B] transition-all"
            >
              <span>Browse All Expeditions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
