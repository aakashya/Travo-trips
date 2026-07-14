import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Mail, Compass, Star, Camera, MapPin, Sparkles, AlertCircle } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  badge: string;
  image: string;
  hometown: string;
  expeditionsCount: number;
  socials: { instagram?: string; linkedin?: string; email?: string };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Aman Verma",
    role: "Founder & Chief Expedition Leader",
    bio: "Certified mountaineer from NIM Uttarkashi. Has successfully spearheaded over 60 high-altitude Himalayan road trips. Believes that the raw mountain peaks have the power to create lifelong friendships.",
    badge: "🏔️ NIM Certified Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    hometown: "Dehradun, Uttarakhand",
    expeditionsCount: 65,
    socials: { instagram: "@aman_himalayas", linkedin: "linkedin.com/in/amanverma", email: "aman@travo.com" }
  },
  {
    name: "Meera Sen",
    role: "Co-Founder & Operations Head",
    bio: "Wilderness First Responder (WFR) certified traveler. Meera designs our detailed route maps, manages local host alignments, and ensures that every group feels completely safe and deeply connected.",
    badge: "🏥 WFR Medical Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    hometown: "Rishikesh, Uttarakhand",
    expeditionsCount: 42,
    socials: { instagram: "@meera_wild_soul", linkedin: "linkedin.com/in/meerasen", email: "meera@travo.com" }
  },
  {
    name: "Rohan Sharma",
    role: "Senior Trip Captain",
    bio: "Rohan is the soul of our road trips. Known for his acoustic guitar bonfire sessions, endless store of mountain folklore, and expert driving-coordination on winding roads.",
    badge: "🎸 Bonfire Soul",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    hometown: "Chandigarh",
    expeditionsCount: 38,
    socials: { instagram: "@rohan_bonfire_tales", email: "rohan@travo.com" }
  },
  {
    name: "Sneha Rao",
    role: "Experiential Group Lead",
    bio: "A nature lover and birdwatcher. Sneha specializes in breaking the ice among solo travelers, curating high-energy group games, and capturing raw, beautiful moments on lens.",
    badge: "📸 Lens & Vibe Curator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    hometown: "Bangalore, Karnataka",
    expeditionsCount: 29,
    socials: { instagram: "@sneha_lens_trails", linkedin: "linkedin.com/in/sneharao" }
  },
  {
    name: "Kabir Thapa",
    role: "Local Sherpa Guide & Safety Officer",
    bio: "Born in the foothills of Joshimath, Kabir has been trekking these slopes since childhood. He is certified in high-altitude rescue and possesses an intimate understanding of shifting mountain weather.",
    badge: "🦅 High Altitude Rescue",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    hometown: "Joshimath, Uttarakhand",
    expeditionsCount: 110,
    socials: { instagram: "@kabir_thapa_guide" }
  },
  {
    name: "Mohan Das",
    role: "Expedition Master Chef",
    bio: "No matter how freezing the altitude, Mohan always serves hot, nutritious, buffet meals. Famous for his high-altitude honey-ginger-lemon tea and crispy, comforting morning parathas.",
    badge: "🍳 High Altitude Culinary Master",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    hometown: "Kasol, Himachal Pradesh",
    expeditionsCount: 85,
    socials: { email: "mohan@travo.com" }
  }
];

export default function TeamPage() {
  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen py-16 px-6">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-[#9C753B]/10 border border-[#9C753B]/20 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> MEET THE LEADERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-neutral-900">
            Certified Captains <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">
              & Mountain Souls
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-xl mx-auto">
            We don't hire temporary tourism gig workers. Our trips are guided strictly by certified mountaineering specialists and wilderness first-responders who live and breathe these trails.
          </p>
        </div>

        {/* Safety standards grid banner */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-neutral-200 shadow-sm max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">100% Certified safety</h4>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
              Every lead captain holds either a Nehru Institute of Mountaineering (NIM) or WHI certificate.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">Solo Friendly Care</h4>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
              Our captains specialize in hosting solo travelers, breaking social boundaries within the first hour of assembly.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 flex items-center justify-center">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900">Intimate Route Wisdom</h4>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
              Deep local roots allow us to coordinate with local rescue blocks, road departments, and remote village chiefs.
            </p>
          </div>
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
                <div className="relative h-64 overflow-hidden bg-neutral-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0 brightness-[0.95]"
                    referrerPolicy="no-referrer"
                  />
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

              {/* Extra telemetry / Hometown & social bar */}
              <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9C753B]" />
                    <span>{member.hometown}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-neutral-400" />
                    <span><strong>{member.expeditionsCount}</strong> Trips Guided</span>
                  </div>
                </div>

                <div className="flex gap-2 text-neutral-400">
                  {member.socials.instagram && (
                    <a 
                      href="#" 
                      className="p-1.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-neutral-500 hover:text-[#9C753B] hover:border-[#9C753B]/30 transition-colors"
                      title={member.socials.instagram}
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a 
                      href="#" 
                      className="p-1.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-neutral-500 hover:text-[#9C753B] hover:border-[#9C753B]/30 transition-colors"
                      title={member.socials.linkedin}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a 
                      href={`mailto:${member.socials.email}`}
                      className="p-1.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-neutral-500 hover:text-[#9C753B] hover:border-[#9C753B]/30 transition-colors"
                      title={member.socials.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
