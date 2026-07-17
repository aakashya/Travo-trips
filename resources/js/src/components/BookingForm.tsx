import React, { useState, useEffect } from "react";
import { X, Ticket, Plus, Minus, Gift, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { BookingDetails } from "../types";
import { TRIPS_DATA } from "../data";
import { PUBLISHED_CATALOGUE_TRIPS } from "../catalogueTrips";
import { postJson } from "../api";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTripId: string;
}

export default function BookingForm({ isOpen, onClose, selectedTripId }: BookingFormProps) {
  const trip = TRIPS_DATA[selectedTripId]
    || PUBLISHED_CATALOGUE_TRIPS.find((catalogueTrip) => catalogueTrip.id === selectedTripId)
    || TRIPS_DATA["manali"];
  
  // Parse numeric fare per seat from the trip price (e.g. "₹9,999/-" -> 9999)
  const fareStr = trip.price.replace(/[^\d]/g, "");
  const FARE_PER_SEAT = parseInt(fareStr, 10) || 9999;

  const [details, setDetails] = useState<BookingDetails>({
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

  // Reset success state and fields when selected trip changes or is closed
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setAppliedPromo("");
      setDiscountAmount(0);
      setPromoError("");
      setFormError("");
      setDetails({
        fullName: "",
        phoneNumber: "",
        email: "",
        seats: 1,
        promoCode: "",
        specialRequests: ""
      });
    }
  }, [isOpen, selectedTripId]);

  if (!isOpen) return null;

  const handleSeatsChange = (val: number) => {
    const nextVal = Math.max(1, Math.min(10, details.seats + val));
    setDetails((prev) => ({ ...prev, seats: nextVal }));
    setPromoError("");
    
    // Recalculate discount if coupon applied
    if (appliedPromo === "TRAVO1000") {
      setDiscountAmount(nextVal * 1000);
    } else if (appliedPromo === "MOUNTAINLOVE") {
      setDiscountAmount(Math.round(nextVal * FARE_PER_SEAT * 0.1));
    }
  };

  const handleApplyPromo = () => {
    const code = details.promoCode?.trim().toUpperCase();
    setPromoError("");
    
    if (!code) {
      setPromoError("Enter a code first.");
      return;
    }

    if (code === "TRAVO1000") {
      setAppliedPromo("TRAVO1000");
      setDiscountAmount(details.seats * 1000);
    } else if (code === "MOUNTAINLOVE") {
      setAppliedPromo("MOUNTAINLOVE");
      setDiscountAmount(Math.round(details.seats * FARE_PER_SEAT * 0.1));
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

  const subTotal = details.seats * FARE_PER_SEAT;
  const netTotal = Math.max(1, subTotal - discountAmount);

  const assemblyPoint = "IFFCO Chowk, Gurugram";

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Background overlay screen click backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main glass card dialog frame */}
      <div className="relative w-full max-w-xl p-[1px] rounded-t-3xl sm:rounded-3xl bg-white border border-neutral-200 shadow-2xl z-10 overflow-hidden max-h-[96dvh] sm:max-h-[90vh] flex flex-col animate-[fadeIn_0.3s_ease-out]">
        <div className="p-4 sm:p-6 rounded-t-3xl sm:rounded-3xl bg-white text-left space-y-6 overflow-y-auto overscroll-contain flex-grow border border-neutral-100 pb-[max(1rem,env(safe-area-inset-bottom))]">
          
          {/* Header row */}
          <div className="flex justify-between items-start pb-4 border-b border-neutral-200">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#9C753B]">
                Secure Booking Window
              </span>
              <h2 className="text-xl font-black text-neutral-900 uppercase font-display">
                {isSuccess ? "Boarding Pass Ready" : `Book: ${trip.name}`}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Simple warnings or info flags */}
              <div className="p-3.5 rounded-xl bg-brand-sand/15 border border-brand-sand/30 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#9C753B] shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-700 leading-normal">
                  Limited slots left! Reserve your seat today to avoid price spikes for the upcoming <strong className="text-neutral-900">{trip.upcomingDeparture}</strong> batch departure.
                </p>
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
              <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-[#FAF9F6] border border-neutral-200 rounded-xl">
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
                <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">
                  Have a Promo Code? (Try: <strong className="text-[#9C753B]">TRAVO1000</strong> or <strong className="text-[#9C753B]">MOUNTAINLOVE</strong>)
                </label>
                <div className="flex flex-col min-[380px]:flex-row gap-2">
                  <input
                    type="text"
                    name="promoCode"
                    value={details.promoCode}
                    onChange={handleInputChange}
                    placeholder="PROMOCODE"
                    className="w-full min-w-0 flex-grow bg-[#FAF9F6] border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#9C753B] transition-colors font-mono uppercase tracking-widest placeholder-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="w-full min-[380px]:w-auto px-5 py-3 bg-[#9C753B] text-white hover:bg-[#7C552B] transition-colors text-xs font-black uppercase tracking-widest rounded-xl shadow-sm"
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

              {/* Dynamic Bill details */}
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-neutral-200 space-y-2.5 shadow-sm">
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
                <div className="pt-2 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-900 uppercase">Net Travel Investment</span>
                  <span className="text-lg font-black text-[#9C753B] font-mono">₹{netTotal.toLocaleString()}</span>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-600 font-bold flex items-center gap-1 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  <ShieldAlert className="w-4 h-4 shrink-0" /> {formError}
                </p>
              )}

              {/* CTA submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-center bg-[#9C753B] hover:bg-[#7C552B] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Saving Booking Inquiry..." : `Authorize Boarding Booking`}
              </button>

            </form>
          ) : (
            /* Successful reservation slide */
            <div className="space-y-6 text-center py-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 font-display uppercase tracking-wider">
                  Seats Reserved!
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm">
                  We've initialized your slot allocation! Please complete the validation by sharing this ticket code to our WhatsApp support channel.
                </p>
              </div>

              {/* Elegant Boarding Ticket Receipt */}
              <div className="p-1 rounded-2xl bg-gradient-to-br from-[#9C753B] via-[#E5E1D6] to-transparent border border-neutral-200 shadow-xl">
                <div className="p-5 rounded-2xl bg-white text-left space-y-4">
                  <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                    <span className="text-[10px] font-black text-[#9C753B] uppercase tracking-widest font-display">
                      TRAVO Official Boarding Ticket
                    </span>
                    <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
                      Allocated
                    </span>
                  </div>

                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 text-xs">
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
                      <p className="text-[9px] uppercase text-neutral-400 font-bold">Cozy Seats Reserved</p>
                      <p className="font-black text-neutral-800 font-mono">{details.seats} Travelers</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-neutral-400 font-bold">Total Investment</p>
                      <p className="text-xs font-black text-emerald-600 font-mono">₹{netTotal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-neutral-400 font-bold">Batch Departure</p>
                      <p className="text-xs font-black text-neutral-800">{trip.upcomingDeparture}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-neutral-200 flex flex-wrap justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase text-neutral-400 font-bold">Assembly Point</p>
                      <p className="text-[10px] text-neutral-600 leading-tight">{assemblyPoint}</p>
                    </div>
                    <span className="text-[9px] text-[#9C753B] bg-brand-sand/15 px-2 py-1 rounded border border-brand-sand/35 font-mono font-black whitespace-nowrap">
                      Captains: 2
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 w-full">
                {/* Redirecting to WhatsApp with prefilled parameters code details */}
                <a
                  href={`https://wa.me/919996965697?text=${encodeURIComponent(`Hi TRAVO! My name is ${details.fullName}. I just reserved ${details.seats} seats for the ${trip.name} starting on ${trip.upcomingDeparture} under ticket code ${generatedPass}. Please verify my reservation!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] transition-all font-black text-xs uppercase tracking-widest text-white rounded-xl inline-flex items-center justify-center gap-2 shadow hover:scale-[1.02] active:scale-95"
                >
                  💬 Share Pass to WhatsApp Support
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs uppercase tracking-widest font-black transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
