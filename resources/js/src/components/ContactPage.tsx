import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, Phone, MapPin, Send, HelpCircle, Check, 
  ChevronDown
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Can I join an expedition solo?",
    a: "Absolutely! Over 65% of our travelers book their spots solo. Our captains specialize in ice-breaking activities right from Day 0 in Delhi, and we pair same-gender roommates in rooms and tents so you never feel isolated."
  },
  {
    q: "Are there strict age restrictions?",
    a: "Yes, we strictly enforce an age bracket of 18 to 35 years. This keeps our group energetic, guarantees shared musical/conversational tastes, and fosters immediate comfort during long road trips."
  },
  {
    q: "What is your refund policy if the trip gets cancelled due to a landslide?",
    a: "The Himalayas are unpredictable. If a route is shut down completely due to landslides, flash floods, or government blockades, we deploy backup scenic routes or offer credit coupons valid for 1 year so your hard-earned funds are never lost."
  },
  {
    q: "Is alcohol or smoking allowed during the journey?",
    a: "Drinking and smoking are strictly forbidden inside the moving AC Tempo Traveller to ensure safety and hygiene. However, travelers are free to responsibly enjoy beverages during our private evening campsite bonfires."
  },
  {
    q: "Do you offer customizable corporate or private group tours?",
    a: "Yes! If you have a group of 10+ colleagues, friends, or family members, we can customize a private Tempo Traveller expedition with a dedicated Captain on any of our 30+ routes."
  }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    tripInterest: "general",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    // Simulate real database or email submission
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear form after a delay
      setFormState({ name: "", email: "", phone: "", tripInterest: "general", message: "" });
    }, 4000);
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-900 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Contact info grid & Form block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Direct info details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="text-xl font-black uppercase text-neutral-900 tracking-tight font-display border-l-4 border-[#9C753B] pl-4">
              Get in Touch Directly
            </h3>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              Feel free to visit our basecamp office or ping us on WhatsApp for rapid seat lock inquiries.
            </p>

            <div className="space-y-6">
              
              {/* Phone cards */}
              <div className="flex gap-4 items-start p-4 bg-white border border-neutral-200 rounded-2xl">
                <div className="p-3 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-neutral-400 uppercase tracking-widest text-[9px] leading-none">Reservations desk</p>
                  <p className="font-black text-neutral-800 text-sm mt-0.5">+91 9996965697</p>
                  <p className="text-[10px] text-neutral-500 font-light">Mon - Sat, 10:00 AM - 7:00 PM</p>
                </div>
              </div>

              {/* Email card */}
              <div className="flex gap-4 items-start p-4 bg-white border border-neutral-200 rounded-2xl">
                <div className="p-3 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-neutral-400 uppercase tracking-widest text-[9px] leading-none">Official email</p>
                  <p className="font-black text-neutral-800 text-sm mt-0.5">expeditions@travotrips.com</p>
                  <p className="text-[10px] text-neutral-500 font-light">Inquiries answered in under 2 hrs</p>
                </div>
              </div>

              {/* Office address card */}
              <div className="flex gap-4 items-start p-4 bg-white border border-neutral-200 rounded-2xl">
                <div className="p-3 rounded-xl bg-brand-sand/15 text-[#9C753B] border border-brand-sand/35 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-neutral-400 uppercase tracking-widest text-[9px] leading-none">Basecamp headquarters</p>
                  <p className="font-black text-neutral-800 text-sm mt-0.5 leading-snug">
                    TRAVO Expeditions HQ, Phase 3, <br />
                    DLF Cyber City, Gurugram, Haryana - 122002
                  </p>
                </div>
              </div>

            </div>

            {/* Emergency / Safety notice panel
            <div className="p-5 rounded-2xl bg-[#9C753B]/5 border border-[#9C753B]/10 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#9C753B] uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                <span>24/7 active route tracker</span>
              </div>
              <p className="text-neutral-600 font-light leading-relaxed">
                Parents can contact our special dispatch center at <strong>+91 9996965697</strong> to receive active GPS telemetry positions of our running Tempo Travellers during high-altitude climbs.
              </p>
            </div>
            */}

          </div>

          {/* Right Column: Interactive inquiry form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm text-left">
            <h3 className="text-lg font-black uppercase text-neutral-900 tracking-tight font-display mb-6">
              Send an Expedition Inquiry
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-black uppercase text-neutral-800 tracking-tight">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Thank you! A senior TRAVO captain has been assigned to your request and will contact you via phone or WhatsApp shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Aman Sharma"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9996965697"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="aman@gmail.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400">Interested In</label>
                      <select
                        value={formState.tripInterest}
                        onChange={(e) => setFormState({...formState, tripInterest: e.target.value})}
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B] cursor-pointer font-bold"
                      >
                        <option value="general">✨ General Information Inquiry</option>
                        <option value="manali">🏔️ Manali Kasol Escape</option>
                        <option value="vof">🌸 Valley of Flowers Expedition</option>
                        <option value="ladakh">🗺️ Leh Ladakh Roadtrip</option>
                        <option value="corporate">💼 Corporate Custom Group Tour</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400">Your Message / Query *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you're planning, desired departure months, or dietary preferences..."
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl p-4 text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-[#9C753B] hover:bg-[#7C552B] active:scale-[0.98] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry Packet</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-black uppercase text-neutral-900 tracking-tight font-display flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#9C753B]" />
              <span>Answers to Common Queries</span>
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Everything you need to clarify before packing your bags and securing your seat.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-black uppercase text-neutral-800 tracking-tight font-display pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 text-xs text-neutral-600 font-light leading-relaxed border-t border-neutral-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
