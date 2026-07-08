import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Coins,
  Copy,
  Info,
  MessageSquare,
  Minus,
  Plus,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { TRIPS_DATA, TRIPS_LIST } from "../data";
import type { BookingDetails } from "../types";

interface BookNowPageProps {
  onNavigate: (view: "home" | "manali" | "valley-of-flowers" | "book-now") => void;
  initialTripId?: string;
}

export default function BookNowPage({ onNavigate, initialTripId = "manali" }: BookNowPageProps) {
  const [selectedTripId, setSelectedTripId] = useState<string>(initialTripId);
  const trip = TRIPS_DATA[selectedTripId] || TRIPS_DATA.manali;
  const fareStr = trip.price.replace(/[^\d]/g, "");
  const farePerSeat = parseInt(fareStr, 10) || 9999;

  const [details, setDetails] = useState<BookingDetails>({
    fullName: "",
    phoneNumber: "",
    email: "",
    seats: 1,
    promoCode: "",
    specialRequests: "",
  });
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");
  const [formError, setFormError] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTripId(initialTripId);
  }, [initialTripId]);

  useEffect(() => {
    if (!selectedTripId) return;
    setAppliedPromo("");
    setDiscountAmount(0);
    setPromoError("");
    setFormError("");
    setIsSuccess(false);
    setGeneratedPass("");
    setDetails({
      fullName: "",
      phoneNumber: "",
      email: "",
      seats: 1,
      promoCode: "",
      specialRequests: "",
    });
  }, [selectedTripId]);

  useEffect(() => {
    if (appliedPromo === "TRAVO1000") {
      setDiscountAmount(details.seats * 1000);
    } else if (appliedPromo === "MOUNTAINLOVE") {
      setDiscountAmount(Math.round(details.seats * farePerSeat * 0.1));
    } else {
      setDiscountAmount(0);
    }
  }, [details.seats, appliedPromo, farePerSeat]);

  const handleSeatsChange = (val: number) => {
    const nextVal = Math.max(1, Math.min(10, details.seats + val));
    setDetails((prev) => ({ ...prev, seats: nextVal }));
  };

  const handleApplyPromo = () => {
    const code = details.promoCode.trim().toUpperCase();
    setPromoError("");

    if (!code) {
      setPromoError("Enter a code first.");
      return;
    }

    if (code === "TRAVO1000" || code === "MOUNTAINLOVE") {
      setAppliedPromo(code);
      return;
    }

    setPromoError("Invalid code. Try TRAVO1000 or MOUNTAINLOVE.");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: name === "seats" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!details.fullName || !details.phoneNumber || !details.email) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const prefix = selectedTripId === "manali" ? "TRV-MNL" : "TRV-VOF";
      setGeneratedPass(`${prefix}-${randomId}`);
    }, 1200);
  };

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const subTotal = details.seats * farePerSeat;
  const netTotal = Math.max(1, subTotal - discountAmount);
  const tokenAmount = details.seats * 2000;
  const assemblyPoint =
    selectedTripId === "manali"
      ? "New Delhi Metro Station, Gate 1 (9:00 PM Departure)"
      : "IFFCO Chowk Gurgaon (8:30 PM) & New Delhi Metro Gate 2 (9:00 PM)";

  const whatsappMessage = isSuccess
    ? `Hi TRAVO! My name is ${details.fullName}. I submitted a booking inquiry for the ${trip.name} starting on ${trip.upcomingDeparture}. My boarding pass code is ${generatedPass}. I am ready to complete the booking.`
    : `Hi TRAVO! I have a query about the ${trip.name} booking process.`;

  return (
    <div className="min-h-screen bg-[#050B14] text-white selection:bg-brand-sand selection:text-brand-charcoal antialiased pb-24">
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#050B14]/80 backdrop-blur-md sticky top-0">
        <button onClick={() => onNavigate("home")} className="flex items-center space-x-2.5 group focus:outline-none">
          <div className="px-4 py-2 bg-brand-sand text-brand-charcoal font-black tracking-[0.18em] text-sm md:text-base rounded-md border border-white/10 flex items-center justify-center font-display shadow-lg shadow-black/30 transition-transform group-hover:scale-105 active:scale-95">
            TRAVO
          </div>
          <span className="hidden sm:inline text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-sand/80 font-black font-mono">
            EXPEDITIONS
          </span>
        </button>

        <nav className="flex items-center space-x-4 sm:space-x-6 text-[10px] sm:text-xs font-black tracking-widest text-gray-400">
          <button onClick={() => onNavigate("home")} className="hover:text-brand-sand transition-colors">
            HOME
          </button>
          <button onClick={() => onNavigate("manali")} className="hover:text-brand-sand transition-colors">
            MANALI
          </button>
          <button onClick={() => onNavigate("valley-of-flowers")} className="hover:text-brand-sand transition-colors">
            VALLEY OF FLOWERS
          </button>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-sand hover:text-white transition-colors uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight uppercase">
              Secure Your <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sand to-white">Himalayan Slot</span>
            </h1>
            <p className="text-sm text-gray-400 font-light max-w-2xl">
              Fill out your group details below to reserve your booking inquiry, review the payment structure, and confirm your seat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-sand/5 border border-brand-sand/10 flex items-center gap-4 max-w-sm md:self-end">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 animate-pulse">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-brand-sand">Need Instant Help?</p>
              <p className="text-xs text-gray-300 font-light mb-1.5">Chat with our coordinator for seat logs and payment questions.</p>
              <a
                href={`https://wa.me/911234567890?text=${encodeURIComponent(
                  "Hi TRAVO! I'm on the Book Now page. I have a few questions regarding seat availability and booking steps.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase font-black tracking-wider text-white hover:text-brand-sand transition-colors flex items-center gap-1"
              >
                Chat on WhatsApp <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/5 shadow-xl">
              <div className="p-6 md:p-8 rounded-3xl bg-brand-charcoal text-left space-y-6">
                <div className="space-y-4 pb-4 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3 py-1 bg-brand-sand/10 border border-brand-sand/25 rounded-full inline-block">
                    STEP 1: SUBMIT BOOKING INQUIRY
                  </span>
                  <h2 className="text-xl font-black text-white uppercase font-display">
                    {isSuccess ? "Reservation Success" : "Traveler & Group Details"}
                  </h2>

                  {!isSuccess && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {TRIPS_LIST.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTripId(t.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                            selectedTripId === t.id
                              ? "bg-brand-sand/10 border-brand-sand text-white shadow-lg"
                              : "bg-[#050B14]/40 border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <p className="text-[9px] uppercase tracking-wider font-bold text-gray-500">Expedition</p>
                          <p className="text-xs font-black truncate">{t.name.split(" ")[0]} Escape</p>
                          <p className="text-[10px] text-brand-sand font-mono font-black mt-1">{t.price}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap gap-4 justify-between items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Selected Expedition</p>
                        <p className="text-sm font-black text-white">{trip.name}</p>
                        <p className="text-[10px] text-gray-400 font-light mt-0.5">
                          Departing: <strong className="text-brand-sand font-bold">{trip.upcomingDeparture}</strong>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Price per Seat</p>
                        <p className="text-sm font-black text-brand-sand font-mono">{trip.price}</p>
                        <p className="text-[9px] text-emerald-400 font-mono font-black">All Taxes Incl.</p>
                      </div>
                    </div>

                    <Field label="Full Name *">
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={details.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sameer Sharma"
                        className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600"
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="WhatsApp Phone *">
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={details.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600"
                        />
                      </Field>
                      <Field label="Email Address *">
                        <input
                          type="email"
                          name="email"
                          required
                          value={details.email}
                          onChange={handleInputChange}
                          placeholder="e.g. sameer@gmail.com"
                          className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600"
                        />
                      </Field>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#050B14]/60 border border-white/10 rounded-xl">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-200 uppercase">Number of Seats</p>
                        <p className="text-[10px] text-gray-400">Book up to 10 travelers in one ticket</p>
                      </div>
                      <div className="flex items-center gap-4 bg-brand-charcoal border border-white/10 p-1.5 rounded-xl">
                        <button type="button" onClick={() => handleSeatsChange(-1)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-black font-mono text-white w-5 text-center">{details.seats}</span>
                        <button type="button" onClick={() => handleSeatsChange(1)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Have a Promo Code?</label>
                        <span className="text-[9px] text-brand-sand font-bold font-mono">Try: TRAVO1000 or MOUNTAINLOVE</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="promoCode"
                          value={details.promoCode}
                          onChange={handleInputChange}
                          placeholder="PROMOCODE"
                          className="flex-grow bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-mono uppercase tracking-widest"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-5 py-3 bg-brand-sand text-brand-charcoal hover:bg-white transition-colors text-xs font-black uppercase tracking-widest rounded-xl"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && <p className="text-[10px] text-rose-400 font-bold mt-1">{promoError}</p>}
                      {appliedPromo && (
                        <p className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Coupon Applied! Saved Rs. {discountAmount.toLocaleString()}!
                        </p>
                      )}
                    </div>

                    <Field label="Special Requests / Medical Notes (Optional)">
                      <textarea
                        name="specialRequests"
                        rows={2}
                        value={details.specialRequests}
                        onChange={handleInputChange}
                        placeholder="e.g., Row preferences, medical conditions, diet notes."
                        className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600 resize-none"
                      />
                    </Field>

                    <div className="bg-[#050B14] p-4 rounded-xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Seat Fare ({details.seats} seats)</span>
                        <span className="font-mono text-gray-200">Rs. {subTotal.toLocaleString()}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-xs text-emerald-400">
                          <span>Applied Coupon Saving</span>
                          <span className="font-mono">-Rs. {discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Tolls, Taxes & Permits</span>
                        <span className="text-emerald-400 uppercase font-black text-[9px] bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                          Included
                        </span>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-white uppercase">Net Travel Investment</span>
                        <span className="text-lg font-black text-brand-sand font-mono">Rs. {netTotal.toLocaleString()}</span>
                      </div>
                      <div className="p-3 bg-brand-sand/5 border border-brand-sand/10 rounded-lg flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-brand-sand shrink-0 mt-0.5" />
                        <p className="text-[10px] text-gray-300 leading-normal">
                          You can pay the <strong className="text-brand-sand">Rs. 2,000 per seat</strong> advance slot booking fee today to lock your ticket, then pay the rest before boarding.
                        </p>
                      </div>
                    </div>

                    {formError && (
                      <p className="text-xs text-rose-400 font-bold flex items-center gap-1 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                        <ShieldAlert className="w-4 h-4 shrink-0" /> {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-center bg-brand-sand hover:bg-white text-brand-charcoal font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? "Generating Boarding Token..." : "Authorize Boarding Booking"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6 text-center py-4 animate-[fadeIn_0.5s_ease-out]">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-10 h-10 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-black text-white font-display uppercase tracking-wider">Inquiry Submitted!</h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        We have initialized your slot allocation. Please proceed to the payment details to secure this reservation.
                      </p>
                    </div>

                    <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-sand via-white/5 to-transparent border border-white/5 shadow-xl">
                      <div className="p-5 rounded-2xl bg-[#050B14] text-left space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                          <span className="text-[10px] font-black text-brand-sand uppercase tracking-widest font-display">
                            TRAVO Boarding Ticket Inquiry
                          </span>
                          <span className="text-[10px] font-mono font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-0.5 rounded">
                            Pending Validation
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <TicketField label="Primary Traveler" value={details.fullName} />
                          <TicketField label="Ticket Code" value={generatedPass} mono highlight />
                          <TicketField label="Expedition" value={trip.name} />
                          <TicketField label="Seats Reserved" value={`${details.seats} Seats`} mono />
                          <TicketField label="Advance Deposit" value={`Rs. ${tokenAmount.toLocaleString()} (${details.seats} x Rs.2K)`} mono success />
                          <TicketField label="Departure Date" value={trip.upcomingDeparture} />
                        </div>

                        <div className="pt-3 border-t border-dashed border-white/10">
                          <p className="text-[9px] uppercase text-gray-500 font-bold">Assembly Point</p>
                          <p className="text-[10px] text-gray-300 leading-tight mt-0.5">{assemblyPoint}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
                      <p className="text-xs text-gray-200">
                        <strong>Next Step:</strong> Share your ticket code and booking details on WhatsApp to lock your slots instantly.
                      </p>
                      <a
                        href={`https://wa.me/911234567890?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] transition-all font-black text-xs uppercase tracking-widest text-white rounded-xl inline-flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95"
                      >
                        Submit Pass to WhatsApp Support
                      </a>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setIsSuccess(false)} className="flex-1 py-3 border border-white/10 hover:bg-white/5 rounded-xl text-xs uppercase tracking-widest font-black text-gray-300 transition-colors">
                        Edit Details
                      </button>
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setDetails({
                            fullName: "",
                            phoneNumber: "",
                            email: "",
                            seats: 1,
                            promoCode: "",
                            specialRequests: "",
                          });
                          setAppliedPromo("");
                          setDiscountAmount(0);
                        }}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs uppercase tracking-widest font-black text-white transition-colors"
                      >
                        New Inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-brand-sand/20 via-white/5 to-transparent border border-brand-sand/15 shadow-xl">
              <div className="p-6 md:p-8 rounded-3xl bg-brand-charcoal text-left space-y-6">
                <div className="space-y-2 pb-4 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand px-3.5 py-1.5 bg-brand-sand/10 border border-brand-sand/20 rounded-full inline-block">
                    STEP 2: PAYMENT & VERIFICATION
                  </span>
                  <h2 className="text-xl font-black text-white uppercase font-display">Payment Information</h2>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    You can pay either the full trip fare or just a Rs. 2,000 per seat token advance today. The remaining balance can be cleared before boarding.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-gray-300">Available Payment Methods:</h3>

                  <PaymentMethod
                    icon={<Coins className="w-4.5 h-4.5" />}
                    title="Instant UPI / QR Code"
                    desc="Google Pay, PhonePe, Paytm, BHIM"
                    actionText="Copy ID"
                    actionValue="travoexpeditions@hdfcbank"
                    copiedText={copiedText}
                    onCopy={handleCopy}
                  />

                  <PaymentMethod
                    icon={<Building2 className="w-4.5 h-4.5" />}
                    title="Bank Account (IMPS/NEFT)"
                    desc="Direct transfer to corporate account"
                    bankDetails={[
                      ["Account Name", "TRAVO EXPEDITIONS PVT LTD"],
                      ["Account Number", "50200084321945"],
                      ["IFSC Code", "HDFC0001245"],
                      ["Bank Name", "HDFC Bank Limited"],
                    ]}
                    copiedText={copiedText}
                    onCopy={handleCopy}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-gray-300">Booking Confirmation Steps:</h3>

                  <div className="space-y-4">
                    {[
                      {
                        num: "01",
                        title: "Inquiry Submit",
                        desc: "Complete the group registration form on this page with correct contact numbers.",
                      },
                      {
                        num: "02",
                        title: "Transfer Slot Fee",
                        desc: "Make payment of Rs. 2,000 per seat using our UPI ID or corporate bank details.",
                      },
                      {
                        num: "03",
                        title: "Share Screenshot",
                        desc: "Send the payment screenshot and ticket inquiry code to our WhatsApp support channel.",
                      },
                      {
                        num: "04",
                        title: "Voucher Issued",
                        desc: "Get certified digital boarding passes within 30 minutes, securing your spots.",
                      },
                    ].map((step) => (
                      <div key={step.num} className="flex gap-4 items-start">
                        <span className="text-xs font-mono font-black text-brand-sand px-2 py-1 rounded bg-white/5 border border-white/10 shrink-0 mt-0.5">
                          {step.num}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">{step.title}</h4>
                          <p className="text-[10px] text-gray-400 font-light leading-normal">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-sand/10 border border-brand-sand/20 rounded-2xl text-brand-sand">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider font-display">Secure Group Travel Promise</h3>
                  <p className="text-[10px] text-gray-500 font-mono font-bold">TRAVO OFFICIAL GUARANTEE</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                All transactions are verified. Spots are locked on a first-come basis with no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/911234567890?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
        title="WhatsApp inquiry"
      >
        <span className="absolute -inset-1.5 rounded-full border border-emerald-500/40 animate-ping pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">{label}</label>
      {children}
    </div>
  );
}

function TicketField({
  label,
  value,
  mono = false,
  success = false,
  highlight = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  success?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase text-gray-500 font-bold">{label}</p>
      <p className={`text-xs font-black truncate ${success ? "text-emerald-400" : highlight ? "text-brand-sand font-mono" : mono ? "font-mono text-white" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function PaymentMethod({
  icon: Icon,
  title,
  desc,
  actionText,
  actionValue,
  bankDetails,
  copiedText,
  onCopy,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  actionText?: string;
  actionValue?: string;
  bankDetails?: [string, string][];
  copiedText: string | null;
  onCopy: (text: string, label: string) => void;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
      <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-brand-sand/10 border border-brand-sand/20 flex items-center justify-center text-brand-sand">
          {Icon}
      </div>
        <div>
          <p className="text-xs font-black text-white uppercase font-display">{title}</p>
          <p className="text-[10px] text-gray-400">{desc}</p>
        </div>
      </div>

      {actionValue && actionText && (
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] uppercase text-gray-500 font-bold">UPI ID</p>
            <p className="text-xs font-mono font-black text-brand-sand">{actionValue}</p>
          </div>
          <button
            onClick={() => onCopy(actionValue, "upi")}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-300 hover:text-white shrink-0 flex items-center gap-1.5 text-[10px] font-bold"
          >
            {copiedText === "upi" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText === "upi" ? "Copied" : actionText}</span>
          </button>
        </div>
      )}

      {bankDetails && (
        <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
          {bankDetails.map(([label, value], index) => (
            <div key={label} className={`flex justify-between items-center py-1 ${index < bankDetails.length - 1 ? "border-b border-white/[0.02]" : ""}`}>
              <span className="text-gray-500 text-[10px] uppercase font-bold">{label}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold text-white text-right">{value}</span>
                {(label === "Account Number" || label === "IFSC Code") && (
                  <button onClick={() => onCopy(value, label === "Account Number" ? "acc" : "ifsc")} className="text-brand-sand hover:text-white">
                    {copiedText === (label === "Account Number" ? "acc" : "ifsc") ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
