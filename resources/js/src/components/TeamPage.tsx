import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  badge: string;
  initials: string;
  image?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Naman Ahuja",
    role: "Co-Founder & CEO",
    bio: "Naman leads TRAVO's vision, brand, partnerships, and the community-first approach behind every journey we create.",
    badge: "Vision & Leadership",
    initials: "NA",
  },
  {
    name: "Vikas Yadav",
    role: "Co-Founder & COO",
    bio: "Vikas leads operations, trip coordination, and the on-ground systems that turn each TRAVO plan into a smooth travel experience.",
    badge: "Operations & Experiences",
    initials: "VY",
    image: "/images/team/vikas.png",
  },
  {
    name: "Aakash Yadav",
    role: "Co-Founder & CTO",
    bio: "Aakash leads technology and product, building the digital systems that make discovering, planning, and booking a TRAVO journey effortless.",
    badge: "Product & Technology",
    initials: "AY",
  },
];

export default function TeamPage() {
  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen py-16 px-6">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-[#9C753B]/10 border border-[#9C753B]/20 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> MEET THE FOUNDERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
            The People <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
              Behind TRAVO
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-xl mx-auto">
            Three founders bringing together vision, operations, and technology to create thoughtful group journeys and lasting travel stories.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              key={member.name}
              className="group bg-white rounded-[32px] border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#9C753B]/20 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                {/* Photo frame */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-700 to-[#9C753B]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-black tracking-tight text-white/90 font-display">
                      {member.initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-brand-sand text-neutral-900 text-[9px] font-black uppercase tracking-widest rounded-lg border border-brand-sand/30 shadow-md">
                      {member.badge}
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase text-neutral-900 tracking-tight font-display">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#9C753B] font-bold">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
