import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Calendar, 
  Timer, 
  MessageSquare, 
  CreditCard, 
  QrCode, 
  Building2, 
  CheckCircle2, 
  ShieldAlert, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShieldCheck, 
  Wallet,
  Coins,
  ArrowRight,
  Info
} from "lucide-react";
import { TRIPS_DATA } from "../data";
import { PUBLISHED_CATALOGUE_TRIPS } from "../catalogueTrips";
import { postJson } from "../api";

interface BookNowPageProps {
  onNavigate: (view: "home" | "manali" | "valley-of-flowers" | "book-now") => void;
  initialTripId?: string;
}

export default function BookNowPage({ onNavigate, initialTripId = "manali" }: BookNowPageProps) {
  const [selectedTripId, setSelectedTripId] = useState<string>(initialTripId);
  const trip = TRIPS_DATA[selectedTripId]
    || PUBLISHED_CATALOGUE_TRIPS.find((catalogueTrip) => catalogueTrip.id === selectedTripId)
    || TRIPS_DATA["manali"];

  // Parse numeric fare per seat from the trip price (e.g. "₹9,999/-" -> 9999)
  const fareStr = trip.price.replace(/[^\d]/g, "");
  const FARE_PER_SEAT = parseInt(fareStr, 10) || 9999;

  const [details, setDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    seats: 1,
    promoCode: "",
    specialRequests: ""
  });

  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");
  const [formError, setFormError] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Recalculate discount if trip or seats change
  useEffect(() => {
    if (appliedPromo === "TRAVO1000") {
      setDiscountAmount(details.seats * 1000);
    } else if (appliedPromo === "MOUNTAINLOVE") {
      setDiscountAmount(Math.round(details.seats * FARE_PER_SEAT * 0.1));
    } else {
      setDiscountAmount(0);
    }
  }, [selectedTripId, details.seats, appliedPromo, FARE_PER_SEAT]);

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

    if (code === "TRAVO1000") {
      setAppliedPromo("TRAVO1000");
      setPromoError("");
    } else if (code === "MOUNTAINLOVE") {
      setAppliedPromo("MOUNTAINLOVE");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'TRAVO1000' or 'MOUNTAINLOVE'!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.fullName || !details.phoneNumber || !details.email) {
      setFormError("Please fill in all required fields!");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await postJson<{ reference_code: string }>("/forms/booking-inquiries", {
        trip_id: selectedTripId,
        full_name: details.fullName,
        phone: details.phoneNumber,
        email: details.email,
        seats: details.seats,
        promo_code: appliedPromo || null,
        special_requests: details.specialRequests || null,
      });

      setGeneratedPass(response.reference_code);
      setIsSuccess(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to submit your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const subTotal = details.seats * FARE_PER_SEAT;
  const netTotal = Math.max(1, subTotal - discountAmount);
  const tokenAmount = details.seats * 2000;

  const assemblyPoint = "IFFCO Chowk, Gurugram";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-brand-sand selection:text-neutral-900 antialiased pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
        {/* Back Button & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200 pb-8">
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9C753B] hover:text-[#7C552B] transition-colors uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight uppercase text-neutral-900">
              Secure Your <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-700">
                Himalayan Slot
              </span>
            </h1>
            <p className="text-sm text-neutral-600 font-light max-w-2xl">
              Fill out your group details below to instantly reserve your boarding seats, review our transparent payment structure, and confirm your booking.
            </p>
          </div>

          {/* Quick WhatsApp CTA Card */}
          <div className="p-4 rounded-2xl bg-brand-sand/15 border border-brand-sand/30 flex items-center gap-4 max-w-sm md:self-end shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 animate-pulse">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-[#9C753B]">Need Instant Help?</p>
              <p className="text-xs text-neutral-600 font-light mb-1.5">Chat with our coordinator for seat logs & discounts.</p>
              <a
                href={`https://wa.me/919996965697?text=${encodeURIComponent("Hi TRAVO! I'm on the Book Now page. I have a few questions regarding seat availability and booking steps.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase font-black tracking-wider text-[#9C753B] hover:text-[#7C552B] transition-colors flex items-center gap-1"
              >
                Chat on WhatsApp <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Booking Inquiry Form Component (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-1 rounded-3xl bg-white border border-neutral-200 shadow-sm">
              <div className="p-6 md:p-8 rounded-3xl bg-white text-left space-y-6">
                
                {/* Switcher & Form Title */}
                <div className="space-y-4 pb-4 border-b border-neutral-200">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3 py-1 bg-brand-sand/15 border border-brand-sand/30 rounded-full inline-block">
                    STEP 1: SUBMIT BOOKING INQUIRY
                  </span>
                  <h2 className="text-xl font-black text-neutral-900 uppercase font-display">
                    {isSuccess ? "Reservation Success" : "Traveler & Group Details"}
                  </h2>
                  
                  {!isSuccess && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {PUBLISHED_CATALOGUE_TRIPS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTripId(t.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                            selectedTripId === t.id 
                              ? "bg-brand-sand/20 border-[#9C753B] text-neutral-900 font-extrabold shadow" 
                              : "bg-[#FAF9F6] border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0" />
                          <p className="text-[9px] uppercase tracking-wider font-bold text-neutral-400">Expedition</p>
                          <p className="text-xs font-black truncate">{t.name.split(" ")[0]} Escape</p>
                          <p className="text-[10px] text-[#9C753B] font-mono font-black mt-1">{t.price}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Live Trip Summary Banner */}
                    <div className="p-4 rounded-xl bg-brand-sand/10 border border-brand-sand/25 flex flex-wrap gap-4 justify-between items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Selected Expedition</p>
                        <p className="text-sm font-black text-neutral-900">{trip.name}</p>
                        <p className="text-[10px] text-neutral-600 font-light mt-0.5">Departing: <strong className="text-[#9C753B] font-bold">{trip.upcomingDeparture}</strong></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Price per Seat</p>
                        <p className="text-sm font-black text-[#9C753B] font-mono">{trip.price}</p>
                        <p className="text-[9px] text-emerald-600 font-mono font-black">All Taxes Incl.</p>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                        Full Name <span className="text-[#9C753B]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={details.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sameer Sharma"
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-medium placeholder-neutral-400 shadow-sm"
                      />
                    </div>

                    {/* Phone & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                          WhatsApp Phone <span className="text-[#9C753B]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={details.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 9996965697"
                          className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-medium placeholder-neutral-400 shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                          Email Address <span className="text-[#9C753B]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={details.email}
                          onChange={handleInputChange}
                          placeholder="e.g. sameer@gmail.com"
                          className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-medium placeholder-neutral-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Seats selector */}
                    <div className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-neutral-200 rounded-xl">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-neutral-800 uppercase">Number of Seats</p>
                        <p className="text-[10px] text-neutral-500">Book up to 10 travelers in one ticket</p>
                      </div>
                      <div className="flex items-center gap-4 bg-white border border-neutral-200 p-1.5 rounded-xl shadow-sm">
                        <button
                          type="button"
                          onClick={() => handleSeatsChange(-1)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-black font-mono text-neutral-900 w-5 text-center">{details.seats}</span>
                        <button
                          type="button"
                          onClick={() => handleSeatsChange(1)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Promo Code area */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                          Have a Promo Code?
                        </label>
                        <span className="text-[9px] text-[#9C753B] font-bold font-mono">Try: TRAVO1000 or MOUNTAINLOVE</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="promoCode"
                          value={details.promoCode}
                          onChange={handleInputChange}
                          placeholder="PROMOCODE"
                          className="flex-grow bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-mono uppercase tracking-widest placeholder-neutral-400"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-5 py-3 bg-[#9C753B] text-white hover:bg-[#7C552B] transition-colors text-xs font-black uppercase tracking-widest rounded-xl shadow-sm"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && <p className="text-[10px] text-rose-600 font-bold mt-1">{promoError}</p>}
                      {appliedPromo && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Coupon Applied! Saved ₹{discountAmount.toLocaleString()}!
                        </p>
                      )}
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                        Special Requests / Medical Notes (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        rows={2}
                        value={details.specialRequests}
                        onChange={handleInputChange}
                        placeholder="e.g., Row preferences, medical conditions, diet notes."
                        className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-medium placeholder-neutral-400 resize-none shadow-sm"
                      />
                    </div>

                    {/* Dynamic Cost breakdown */}
                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-neutral-200 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500">Seat Fare ({details.seats} seats)</span>
                        <span className="font-mono text-neutral-800">₹{subTotal.toLocaleString()}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-xs text-emerald-600">
                          <span>Applied Coupon Saving</span>
                          <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs text-neutral-500">
                        <span>Tolls, Taxes & Permits</span>
                        <span className="text-emerald-600 uppercase font-black text-[9px] bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">Included</span>
                      </div>
                      
                      <div className="pt-2.5 border-t border-neutral-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-neutral-900 uppercase">Net Travel Investment</span>
                          <span className="text-lg font-black text-[#9C753B] font-mono">₹{netTotal.toLocaleString()}</span>
                        </div>
                        
                        <div className="p-3 bg-brand-sand/15 border border-brand-sand/30 rounded-lg flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-[#9C753B] shrink-0 mt-0.5" />
                          <p className="text-[10px] text-neutral-700 leading-normal">
                            You can choose to pay only the <strong className="text-[#9C753B]">₹2,000 per seat (Total: ₹{tokenAmount.toLocaleString()})</strong> advance slot booking fee today to lock your ticket, and pay the rest before boarding!
                          </p>
                        </div>
                      </div>
                    </div>

                    {formError && (
                      <p className="text-xs text-rose-600 font-bold flex items-center gap-1 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                        <ShieldAlert className="w-4 h-4 shrink-0" /> {formError}
                      </p>
                    )}

                    {/* Submit Inquiry Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-center bg-[#9C753B] hover:bg-[#7C552B] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving Booking Inquiry..." : `Authorize Boarding Booking`}
                    </button>

                  </form>
                ) : (
                  /* Form Submitted successfully, show receipt boarding pass */
                  <div className="space-y-6 text-center py-4 animate-[fadeIn_0.5s_ease-out]">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-10 h-10 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-black text-neutral-900 font-display uppercase tracking-wider">
                        Inquiry Submitted!
                      </h3>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                        We've initialized your slot allocation. Please proceed to the payment details to secure this reservation.
                      </p>
                    </div>

                    {/* Ticket Code Display */}
                    <div className="p-1 rounded-2xl bg-gradient-to-br from-[#9C753B] via-[#E5E1D6] to-transparent border border-neutral-200 shadow-sm">
                      <div className="p-5 rounded-2xl bg-white text-left space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                          <span className="text-[10px] font-black text-[#9C753B] uppercase tracking-widest font-display">
                            TRAVO Boarding Ticket Inquiry
                          </span>
                          <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                            Pending Validation
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Primary Traveler</p>
                            <p className="font-black text-neutral-800 truncate">{details.fullName}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Ticket Code</p>
                            <p className="font-black text-[#9C753B] font-mono">{generatedPass}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Expedition</p>
                            <p className="font-black text-neutral-800 truncate">{trip.name}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Seats Reserved</p>
                            <p className="font-black text-neutral-800 font-mono">{details.seats} Seats</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Advance Deposit</p>
                            <p className="font-black text-emerald-600 font-mono">₹{tokenAmount.toLocaleString()} <span className="text-[9px] text-neutral-500 font-light">({details.seats} x ₹2K)</span></p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase text-neutral-400 font-bold">Departure Date</p>
                            <p className="font-black text-neutral-800">{trip.upcomingDeparture}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-dashed border-neutral-200">
                          <p className="text-[9px] uppercase text-neutral-400 font-bold">Assembly Point</p>
                          <p className="text-[10px] text-neutral-600 leading-tight mt-0.5">{assemblyPoint}</p>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Action with prefilled message */}
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3">
                      <p className="text-xs text-neutral-700">
                        <strong>Next Step:</strong> Share your ticket code and booking details on WhatsApp to lock your slots instantly. Our coordinator is waiting to verify!
                      </p>
                      
                      <a
                        href={`https://wa.me/919996965697?text=${encodeURIComponent(`Hi TRAVO! My name is ${details.fullName}. I've submitted a Booking Inquiry on your page for the ${trip.name} starting on ${trip.upcomingDeparture}. Here is my Boarding Pass Ticket Code: ${generatedPass}. I am ready to complete the booking!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] transition-all font-black text-xs uppercase tracking-widest text-white rounded-xl inline-flex items-center justify-center gap-2 shadow hover:scale-[1.02] active:scale-95"
                      >
                        💬 Submit Pass to WhatsApp Support
                      </a>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="flex-1 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-xs uppercase tracking-widest font-black text-neutral-600 transition-colors"
                      >
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
                            specialRequests: ""
                          });
                          setAppliedPromo("");
                          setDiscountAmount(0);
                        }}
                        className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs uppercase tracking-widest font-black text-neutral-800 transition-colors"
                      >
                        New Inquiry
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT: Payment info, WhatsApp Inquiry button and Steps (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Payment Information Card */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-[#9C753B]/20 via-transparent to-transparent border border-neutral-200 shadow-sm">
              <div className="p-6 md:p-8 rounded-3xl bg-white text-left space-y-6">
                
                <div className="space-y-2 pb-4 border-b border-neutral-200">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B] px-3.5 py-1.5 bg-brand-sand/15 border border-brand-sand/30 rounded-full inline-block">
                    STEP 2: PAYMENT & VERIFICATION
                  </span>
                  <h2 className="text-xl font-black text-neutral-900 uppercase font-display">
                    Payment Information
                  </h2>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    To secure your seat, you may pay either the <strong>Full Trip Fare</strong> or just a <strong>₹2,000/- per seat token advance</strong> today. The remaining balance can be cleared on departure.
                  </p>
                </div>

                {/* Available Payment Methods */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-400">
                    Available Payment Methods:
                  </h3>

                  {/* UPI Box */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-sand/15 border border-brand-sand/30 flex items-center justify-center text-[#9C753B]">
                        <Coins className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-900 uppercase font-display">Instant UPI / QR Code</p>
                        <p className="text-[10px] text-neutral-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[9px] uppercase text-neutral-400 font-bold">UPI ID</p>
                        <p className="text-xs font-mono font-black text-[#9C753B]">travoexpeditions@hdfcbank</p>
                      </div>
                      <button
                        onClick={() => handleCopy("travoexpeditions@hdfcbank", "upi")}
                        className="p-2 rounded-lg bg-white hover:bg-neutral-50 border border-neutral-200 shadow-sm transition-colors text-neutral-700 shrink-0 flex items-center gap-1.5 text-[10px] font-bold"
                      >
                        {copiedText === "upi" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === "upi" ? "Copied" : "Copy ID"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Bank Transfer Box */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200 space-y-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-sand/15 border border-brand-sand/30 flex items-center justify-center text-[#9C753B]">
                        <Building2 className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-900 uppercase font-display">Bank Account (IMPS/NEFT)</p>
                        <p className="text-[10px] text-neutral-500">Direct transfer to corporate account</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-neutral-200 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold">Account Name</span>
                        <span className="font-extrabold text-neutral-800 text-right">TRAVO EXPEDITIONS PVT LTD</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold">Account Number</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-neutral-800">50200084321945</span>
                          <button 
                            onClick={() => handleCopy("50200084321945", "acc")}
                            className="text-[#9C753B] hover:text-[#7C552B]"
                          >
                            {copiedText === "acc" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold">IFSC Code</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-neutral-800">HDFC0001245</span>
                          <button 
                            onClick={() => handleCopy("HDFC0001245", "ifsc")}
                            className="text-[#9C753B] hover:text-[#7C552B]"
                          >
                            {copiedText === "ifsc" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold">Bank Name</span>
                        <span className="font-extrabold text-neutral-700">HDFC Bank Limited</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Booking Steps Roadmap */}
                <div className="space-y-4 pt-4 border-t border-neutral-200">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-neutral-400">
                    Booking Confirmation Steps:
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        num: "01",
                        title: "Inquiry Submit",
                        desc: "Complete the group registration form on this page with correct contact numbers."
                      },
                      {
                        num: "02",
                        title: "Transfer Slot Fee",
                        desc: "Make payment of ₹2,000 per seat (or full fare) using our UPI ID or Corporate bank details."
                      },
                      {
                        num: "03",
                        title: "Share Screenshot",
                        desc: "Send the payment screenshot & ticket inquiry code to our WhatsApp support channel."
                      },
                      {
                        num: "04",
                        title: "Voucher Issued",
                        desc: "Get certified digital boarding passes within 30 minutes, securing your spots."
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="text-xs font-mono font-black text-[#9C753B] px-2 py-1 rounded bg-brand-sand/15 border border-brand-sand/30 shrink-0 mt-0.5">
                          {step.num}
                        </span>
                        <div>
                          <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider">{step.title}</h4>
                          <p className="text-[10px] text-neutral-600 font-light leading-normal">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Support Guarantee Trust Shield */}
            <div className="p-6 rounded-3xl bg-brand-sand/10 border border-brand-sand/20 text-left space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-sand/20 border border-brand-sand/35 rounded-2xl text-[#9C753B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider font-display">
                    Secure Group Travel Promise
                  </h3>
                  <p className="text-[10px] text-[#9C753B] font-mono font-bold">TRAVO OFFICIAL GUARANTEE</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-700 leading-relaxed font-light">
                All transactions are safe and verified. Spots are locked instantly on a first-come, first-serve basis. Under our <strong>100% Honest Budgets guidelines</strong>, we guarantee zero hidden costs or extra charges en route.
              </p>
              <div className="pt-2 border-t border-brand-sand/30 flex gap-4 text-[9px] font-mono uppercase tracking-widest text-neutral-500">
                <span>🛡️ Corporate Registered</span>
                <span>⭐ 4.9/5 Rated Trip Leaders</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
