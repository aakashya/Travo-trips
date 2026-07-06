import { useState } from "react";
import HeroSection from "./components/HeroSection";
import StoryIntro from "./components/StoryIntro";
import RouteJourney from "./components/RouteJourney";
import StoryTimeline from "./components/StoryTimeline";
import ExperienceCards from "./components/ExperienceCards";
import Inclusions from "./components/Inclusions";
import Checklist from "./components/Checklist";
import TermsAccordion from "./components/TermsAccordion";
import FooterCTA from "./components/FooterCTA";
import BookingForm from "./components/BookingForm";
import GallerySection from "./components/GallerySection";
import UpcomingCalendar from "./components/UpcomingCalendar";
import { TRIPS_DATA, TRIPS_LIST } from "./data";
import { ArrowRight, Calendar, Compass, ShieldCheck, Sparkles, Star, Users } from "lucide-react";

export type AppView = "home" | "manali" | "valley-of-flowers";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTripIdForBooking, setSelectedTripIdForBooking] = useState("manali");

  const handleOpenBooking = (tripId: string) => {
    setSelectedTripIdForBooking(tripId || "manali");
    setIsBookingOpen(true);
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const handleExploreClick = () => {
    const target = document.getElementById("explore-expeditions") || document.getElementById("chapter-intro");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const activeTrip = currentView !== "home" ? TRIPS_DATA[currentView] : null;

  return (
    <div className="min-h-screen bg-[#050B14] text-white selection:bg-brand-sand selection:text-brand-charcoal antialiased overflow-x-hidden">
      <HeroSection
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onExploreClick={handleExploreClick}
      />

      {currentView === "home" && (
        <div className="animate-[fadeIn_0.6s_ease-out]">
          <StoryIntro tripId="general" />

          <section id="explore-expeditions" className="py-24 px-6 bg-[#090D16] border-t border-b border-white/5 scroll-mt-20">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full">
                    CHOOSE YOUR ALTITUDE
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight font-display uppercase">
                    Active Group <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">
                      Expeditions
                    </span>
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-gray-400 max-w-md font-light leading-relaxed">
                  Both routes are operational, captain-led, and tailored for group travelers. Tap below to see interactive maps and day-by-day itineraries.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {TRIPS_LIST.map((trip) => (
                  <article
                    key={trip.id}
                    className="group relative rounded-3xl overflow-hidden border border-white/5 bg-[#050B14]/40 hover:border-brand-sand/30 hover:shadow-2xl hover:shadow-brand-sand/5 transition-all duration-500 flex flex-col justify-between min-h-[500px]"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={trip.heroImage}
                        alt={trip.name}
                        className="w-full h-full object-cover opacity-60 saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.95]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-black/30" />
                    </div>

                    <div className="relative z-10 p-6 flex justify-between items-start">
                      <span className="px-3 py-1.5 rounded-full bg-brand-sand text-brand-charcoal font-black font-display text-[9px] tracking-widest uppercase">
                        {trip.id === "manali" ? "ADVENTURE" : "UNESCO WORLD HERITAGE"}
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded text-[9px] font-bold uppercase tracking-wider text-white">
                        {trip.duration}
                      </span>
                    </div>

                    <div className="relative z-10 p-6 sm:p-8 space-y-6 text-left bg-gradient-to-t from-brand-charcoal via-brand-charcoal/85 to-transparent pt-20">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white uppercase font-display tracking-tight leading-none group-hover:text-brand-sand transition-colors">
                          {trip.name}
                        </h3>
                        <p className="text-xs text-gray-300 font-light max-w-md line-clamp-2">
                          {trip.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                          <Calendar className="w-3.5 h-3.5 text-brand-sand" /> Batch: {trip.upcomingDeparture}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                          <Compass className="w-3.5 h-3.5 text-brand-sand" /> {trip.routeStops.length - 1} Checkpoints
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 animate-pulse">
                          {trip.price.replace("/-", "")} All-Incl.
                        </span>
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-4">
                        <button
                          onClick={() => handleNavigate(trip.id as AppView)}
                          className="px-6 py-3.5 bg-brand-sand text-brand-charcoal font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg active:scale-95 hover:bg-white transition-all flex items-center gap-2 flex-grow sm:flex-grow-0"
                        >
                          <span>Explore Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenBooking(trip.id)}
                          className="px-5 py-3.5 border border-white/20 hover:bg-white/5 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all"
                        >
                          Fast Book
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-[#050B14] relative overflow-hidden text-white">
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-sand/[0.02] rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-charcoal px-3.5 py-1.5 bg-brand-sand rounded-full inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-charcoal" /> THE TRAVO PROMISE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight">
                  Crafting Premium <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand via-white to-gray-400">
                    Road-Trip Journeys
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  We focus on comfort, intimacy, safety, and curated group energy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  ["Curated Group Vibe", "Strict 18-35 age bracket with travelers joining as strangers and returning as a tight-knit family.", <Users className="w-5 h-5 text-brand-sand" />],
                  ["Comfort On Roads", "Sanitized AC Tempo Travellers with pushback comfort, curated playlists, and mountain-safe drivers.", <Compass className="w-5 h-5 text-brand-sand animate-spin" style={{ animationDuration: "30s" }} />],
                  ["Certified Captains", "Professional captains equipped with first-aid tools and deep local route knowledge.", <Star className="w-5 h-5 text-brand-sand" />],
                  ["Honest Budgets", "No surprise taxes or hidden road fees. Tolls, green taxes, and driver allowances included.", <Sparkles className="w-5 h-5 text-brand-sand" />],
                ].map(([title, desc, icon], i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-sand/20 hover:bg-white/5 transition-all duration-300 space-y-4 text-left">
                    <div className="p-3 bg-white/5 rounded-2xl w-max border border-white/10">{icon}</div>
                    <h3 className="text-base font-black text-white uppercase tracking-wider font-display">{title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <UpcomingCalendar onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
          <GallerySection />
          <FooterCTA
            onOpenBooking={() => handleOpenBooking("manali")}
            tripId="general"
            tripName="TRAVO Expeditions"
            price="Rs. 9,999"
            bgImage={TRIPS_DATA.manali.heroImage}
            isHomeView
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {currentView !== "home" && activeTrip && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <StoryIntro tripId={activeTrip.id} tripName={activeTrip.name} />
          <RouteJourney stops={activeTrip.routeStops} tripId={activeTrip.id} tripName={activeTrip.name} />
          <StoryTimeline items={activeTrip.timelineItems} tripId={activeTrip.id} />
          <ExperienceCards experienceMoments={activeTrip.experienceMoments} />
          <Inclusions inclusions={activeTrip.inclusions} exclusions={activeTrip.exclusions} />
          <Checklist packingChecklist={activeTrip.packingChecklist} tripId={activeTrip.id} />
          <TermsAccordion termsAccordion={activeTrip.termsAccordion} tripName={activeTrip.name} />
          <FooterCTA
            onOpenBooking={() => handleOpenBooking(activeTrip.id)}
            tripId={activeTrip.id}
            tripName={activeTrip.name}
            price={activeTrip.price}
            bgImage={activeTrip.heroImage}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTripId={selectedTripIdForBooking}
      />
    </div>
  );
}
