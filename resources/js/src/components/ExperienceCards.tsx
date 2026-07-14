import React from "react";
import { ExperienceMoment } from "../types";
import { Snowflake, Compass, Footprints, Coffee, Tent, Flame, Music, Sun, Eye, Flower, Waves, Home, GitMerge, Utensils } from "lucide-react";

interface ExperienceCardsProps {
  experienceMoments: ExperienceMoment[];
}

function renderIcon(name: string) {
  const css = "w-5 h-5 text-[#9C753B]";
  switch (name) {
    case "Snowflake": return <Snowflake className={css} />;
    case "Compass": return <Compass className={css} />;
    case "Footprints": return <Footprints className={css} />;
    case "Coffee": return <Coffee className={css} />;
    case "Tent": return <Tent className={css} />;
    case "Flame": return <Flame className={css} />;
    case "Music": return <Music className={css} />;
    case "Sun": return <Sun className={css} />;
    case "Flower": return <Flower className={css} />;
    case "Waves": return <Waves className={css} />;
    case "Home": return <Home className={css} />;
    case "GitMerge": return <GitMerge className={css} />;
    case "Utensils": return <Utensils className={css} />;
    default: return <Compass className={css} />;
  }
}

export default function ExperienceCards({ experienceMoments }: ExperienceCardsProps) {
  return (
    <section id="experiences" className="relative bg-[#F2EFE9] py-24 px-6 border-t border-b border-neutral-200 overflow-hidden text-neutral-900">
      {/* Visual glowing geometric element */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-sand/[0.08] rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        
        {/* Title panel */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full">
              CULTURE, WILDERNESS & ENERGY
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight font-display uppercase text-neutral-900">
              Moments You’ll <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-700 font-display">
                Remember Forever
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 max-w-lg font-light leading-relaxed">
            Himalayan travel isn't measured in miles, but in experiences. From the crunch of snow under boots to sharing local delicacies by a blazing fire.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceMoments.map((moment, index) => {
            // Elegant sizing variation for distinct grid rhythm
            const isTall = index === 1 || index === 4 || index === 7;
            const isWide = index === 0 || index === 5;

            return (
              <div 
                key={moment.id}
                className={`group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm hover:border-[#9C753B] hover:shadow-md transition-all duration-500 flex flex-col justify-end min-h-[280px] ${
                  isTall ? "lg:row-span-2 lg:min-h-[420px]" : ""
                } ${
                  isWide ? "sm:col-span-2" : ""
                }`}
              >
                {/* Image backdrop */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={moment.image} 
                    alt={moment.title} 
                    className="w-full h-full object-cover opacity-80 saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.85] group-hover:brightness-[0.95]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic dark gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating details inside card */}
                <div className="relative z-10 p-6 space-y-3.5 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-neutral-900/60 border border-white/10 backdrop-blur-md rounded-xl">
                      {renderIcon(moment.icon)}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-sand">
                      {moment.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-black text-white leading-tight uppercase font-display">
                      {moment.title}
                    </h3>
                    <p className="text-[10px] text-gray-300 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      // TRAVO CURATED EXPERIENCE
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
