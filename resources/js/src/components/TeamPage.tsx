import React from "react";
import { motion } from "motion/react";
import { Compass, Mail, MapPin } from "lucide-react";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.2 7.4H2.1V21h3.1V7.4ZM3.65 3A1.82 1.82 0 1 0 3.66 6.64 1.82 1.82 0 0 0 3.65 3ZM21.9 13.2c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2v-2H9.7V21h3.1v-6.7c0-1.8.3-3.5 2.5-3.5 2.1 0 2.2 2 2.2 3.6V21h3.1l1.3-7.8Z" />
    </svg>
  );
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  badge: string;
  initials: string;
  image?: string;
  location: string;
  destinationsTravelled?: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    email: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Naman Ahuja",
    role: "Co-Founder & CEO",
    bio: "Naman leads TRAVO's vision, brand, partnerships, and the community-first approach behind every journey we create.",
    badge: "Vision & Leadership",
    initials: "NA",
    image: "/images/team/naman.png",
    location: "Gurugram, Haryana",
    destinationsTravelled: "150+",
    socials: {
      instagram: "https://www.instagram.com/00namanahuja",
      linkedin: "https://www.linkedin.com/in/naman-ahuja-8a17b2358/",
      email: "namanahuja@travotrips.com",
    },
  },
  {
    name: "Vikas Yadav",
    role: "Co-Founder & COO",
    bio: "Vikas leads operations, trip coordination, and the on-ground systems that turn each TRAVO plan into a smooth travel experience.",
    badge: "Operations & Experiences",
    initials: "VY",
    image: "/images/team/vikas.png",
    location: "Gurugram, Haryana",
    destinationsTravelled: "200+",
    socials: {
      instagram: "https://www.instagram.com/vikas28_yadav",
      linkedin: "https://www.linkedin.com/in/yadavvikass/",
      email: "vikasyadav@travotrips.com",
    },
  },
  {
    name: "Aakash Yadav",
    role: "Co-Founder & CTO",
    bio: "Aakash leads technology and product, building the digital systems that make discovering, planning, and booking a TRAVO journey effortless.",
    badge: "Product & Technology",
    initials: "AY",
    image: "/images/team/aakash.png",
    location: "Gurugram, Haryana",
    destinationsTravelled: "50+",
    socials: {
      instagram: "https://www.instagram.com/aakash._.ya",
      email: "aakashyadav@travotrips.com",
    },
  },
];

export default function TeamPage() {
  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen py-12 sm:py-16 px-4 sm:px-6">
      
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
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
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-neutral-800 via-neutral-700 to-[#9C753B]">
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
                <div className="p-5 sm:p-6 space-y-4">
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-100 px-5 sm:px-6 py-5 text-[11px] text-neutral-500">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#9C753B]" />
                    <span>{member.location}</span>
                  </div>
                  {member.destinationsTravelled && (
                    <div className="flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-neutral-400" />
                      <span><strong>{member.destinationsTravelled}</strong> Destinations Travelled</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on Instagram`}
                      className="rounded-lg border border-neutral-200 bg-[#FAF9F6] p-2 text-neutral-500 transition-colors hover:border-[#9C753B]/30 hover:text-[#9C753B]"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="rounded-lg border border-neutral-200 bg-[#FAF9F6] p-2 text-neutral-500 transition-colors hover:border-[#9C753B]/30 hover:text-[#9C753B]"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <a
                    href={`mailto:${member.socials.email}`}
                    aria-label={`Email ${member.name}`}
                    className="rounded-lg border border-neutral-200 bg-[#FAF9F6] p-2 text-neutral-500 transition-colors hover:border-[#9C753B]/30 hover:text-[#9C753B]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
