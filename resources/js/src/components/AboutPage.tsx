import React from "react";
import { motion } from "motion/react";
import { Compass, Users, Award, ShieldAlert, Sparkles, Heart, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Story Section - Text & Visual Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Photo Montage card */}
          <div className="relative p-1 rounded-[36px] bg-gradient-to-br from-brand-sand via-white/40 to-transparent border border-neutral-200 shadow-2xl overflow-hidden aspect-[4/3] group">
            <img 
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop" 
              alt="Group of friends hiking together" 
              className="w-full h-full object-cover rounded-[32px] filter brightness-[0.85] saturate-[1.05] group-hover:scale-[1.01] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-[32px] pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
              <span className="text-[10px] uppercase tracking-widest bg-brand-sand text-neutral-900 px-3 py-1 font-black rounded-lg shadow-md">
                KASOL CAMPFIRE, MAY 2025
              </span>
              <p className="text-lg font-black font-display uppercase leading-tight">
                "Where three shivering solo backpackers decided to fix group tourism."
              </p>
            </div>
          </div>

          {/* Text block */}
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-black uppercase text-neutral-900 tracking-tight font-display border-l-4 border-[#9C753B] pl-4">
              It Started with a Shivering Bonfire
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              In May 2025, three solo travelers sat around a bonfire in Kasol, Himachal Pradesh. They noticed that standard commercial travel agencies crowded 45+ tourists on old massive sleeper buses, with absolutely zero group compatibility, rushing past stunning landscapes to check off bullet points.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              They asked themselves: <strong>Why can't group travel be highly curated, comfortable, and deeply intimate?</strong>
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              TRAVO was born out of that simple question. We specialize in premium road trips for the **18-35 age bracket**. By matching energetic souls together, utilizing luxury sanitized Tempo Travellers, and designing day-by-day itineraries packed with hidden trails and acoustic bonfire sessions, we make sure you return with a family for life.
            </p>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-black text-[#9C753B] font-mono leading-none">200+</p>
                <p className="text-[9px] uppercase text-neutral-400 font-bold mt-1.5">Souls Onboarded</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#9C753B] font-mono leading-none">50+</p>
                <p className="text-[9px] uppercase text-neutral-400 font-bold mt-1.5">Solo Travelers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#9C753B] font-mono leading-none">98%</p>
                <p className="text-[9px] uppercase text-neutral-400 font-bold mt-1.5">5-Star Feedback</p>
              </div>
            </div>
          </div>

        </div>

        {/* Our Three Core Pillars */}
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-black uppercase text-neutral-900 tracking-tight font-display">
              The Three Pillars of TRAVO
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Our core values guide every itinerary we design, every seat we allocate, and every mile we cover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Energetic Roster Curation",
                desc: "We strictly enforce an 18-35 age filter. Before we approve a booking, our captains review the group balance. This ensures high-energy compatibility, shared values, and immediate trust bonds.",
                icon: <Users className="w-5 h-5 text-[#9C753B]" />
              },
              {
                title: "2. Deluxe Comfort Standards",
                desc: "We completely reject packed buses. We travel in customized luxury AC Tempo Travellers with state-of-the-art acoustics, check into premium partner hotels, and stay in gorgeous riverside dome camps.",
                icon: <Award className="w-5 h-5 text-[#9C753B]" />
              },
              {
                title: "3. Absolute Safety Protocol",
                desc: "All trips are managed by certified mountaineering captains equipped with first-aid tools, oxymeters, and emergency oxygen canisters. We keep active 24/7 coordination channels open en route.",
                icon: <Compass className="w-5 h-5 text-[#9C753B] animate-spin" style={{ animationDuration: '40s' }} />
              }
            ].map((pillar, i) => (
              <div key={i} className="p-6 rounded-[28px] bg-white border border-neutral-200 text-left space-y-4 hover:border-[#9C753B]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h4 className="text-sm font-black uppercase text-neutral-900 tracking-wider font-display">{pillar.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Traveler Charter Promises */}
        <div className="max-w-4xl mx-auto p-8 rounded-[36px] bg-white border border-neutral-200 text-left space-y-6 shadow-sm">
          <div className="space-y-2 pb-4 border-b border-neutral-200">
            <span className="text-[9px] uppercase tracking-widest font-black text-[#9C753B] bg-[#9C753B]/10 px-2.5 py-1 rounded">
              TRAVEL CHARTER RULES
            </span>
            <h4 className="text-xl font-black uppercase text-neutral-900 tracking-tight font-display">
              The TRAVO Traveler Promise
            </h4>
            <p className="text-xs text-neutral-500 leading-normal font-light">
              When you step inside our Traveller, you agree to uphold our sacred community rules:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Support fellow travelers who are joining solo",
              "Maintain zero environmental litter inside the national parks",
              "Respect local village traditions, heritage temples, and quiet hours",
              "Be punctual for departures so we never rush through beautiful passes",
              "Avoid political or religious debates; focus strictly on wild vibes",
              "Listen carefully to safety briefings and captain instructions"
            ].map((promise, i) => (
              <div key={i} className="flex gap-2.5 items-start text-xs text-neutral-700 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{promise}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
