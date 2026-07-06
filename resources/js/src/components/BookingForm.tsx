import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle2, Minus, Plus, ShieldAlert, Sparkles, X } from "lucide-react";
import { BookingDetails } from "../types";
import { TRIPS_DATA } from "../data";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTripId: string;
}

export default function BookingForm({ isOpen, onClose, selectedTripId }: BookingFormProps) {
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

  useEffect(() => {
    if (!isOpen) return;
    setIsSuccess(false);
    setAppliedPromo("");
    setDiscountAmount(0);
    setPromoError("");
    setFormError("");
    setDetails({ fullName: "", phoneNumber: "", email: "", seats: 1, promoCode: "", specialRequests: "" });
  }, [isOpen, selectedTripId]);

  if (!isOpen) return null;

  const recalcDiscount = (seats: number, code = appliedPromo) => {
    if (code === "TRAVO1000") return seats * 1000;
    if (code === "MOUNTAINLOVE") return Math.round(seats * farePerSeat * 0.1);
    return 0;
  };

  const handleSeatsChange = (val: number) => {
    const nextVal = Math.max(1, Math.min(10, details.seats + val));
    setDetails((prev) => ({ ...prev, seats: nextVal }));
    setPromoError("");
    setDiscountAmount(recalcDiscount(nextVal));
  };

  const handleApplyPromo = () => {
    const code = details.promoCode?.trim().toUpperCase();
    setPromoError("");
    if (!code) {
      setPromoError("Enter a code first.");
      return;
    }
    if (code === "TRAVO1000" || code === "MOUNTAINLOVE") {
      setAppliedPromo(code);
      setDiscountAmount(recalcDiscount(details.seats, code));
      return;
    }
    setAppliedPromo("");
    setDiscountAmount(0);
    setPromoError("Invalid code. Try TRAVO1000 or MOUNTAINLOVE.");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
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
    }, 1500);
  };

  const subTotal = details.seats * farePerSeat;
  const netTotal = Math.max(1, subTotal - discountAmount);
  const assemblyPoint = selectedTripId === "manali" ? "New Delhi Metro Station, Gate 1" : "IFFCO Chowk Gurgaon & New Delhi Metro Gate 2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Close booking" className="absolute inset-0 bg-[#050B14]/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl p-[1px] rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 rounded-3xl bg-brand-charcoal text-left space-y-6 overflow-y-auto flex-grow border border-white/5">
          <div className="flex justify-between items-start pb-4 border-b border-white/5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-brand-sand">Secure Booking Window</span>
              <h2 className="text-xl font-black text-white uppercase font-display">
                {isSuccess ? "Boarding Pass Ready" : `Book: ${trip.name}`}
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-3.5 rounded-xl bg-brand-sand/5 border border-brand-sand/15 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-300 leading-normal">
                  Limited slots left for the <strong className="text-white">{trip.upcomingDeparture}</strong> batch.
                </p>
              </div>

              <label className="space-y-1.5 block">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name <span className="text-brand-sand">*</span></span>
                <input type="text" name="fullName" required value={details.fullName} onChange={handleInputChange} placeholder="e.g. Sameer Sharma" className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600" />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">WhatsApp Phone <span className="text-brand-sand">*</span></span>
                  <input type="tel" name="phoneNumber" required value={details.phoneNumber} onChange={handleInputChange} placeholder="+91 98765 43210" className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address <span className="text-brand-sand">*</span></span>
                  <input type="email" name="email" required value={details.email} onChange={handleInputChange} placeholder="sameer@gmail.com" className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600" />
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#050B14]/60 border border-white/10 rounded-xl">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-200 uppercase">Number of Seats</p>
                  <p className="text-[10px] text-gray-400">Book up to 10 travelers in one ticket</p>
                </div>
                <div className="flex items-center gap-4 bg-brand-charcoal border border-white/10 p-1.5 rounded-xl">
                  <button type="button" onClick={() => handleSeatsChange(-1)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="text-sm font-black font-mono text-white w-5 text-center">{details.seats}</span>
                  <button type="button" onClick={() => handleSeatsChange(1)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Promo Code</label>
                <div className="flex gap-2">
                  <input type="text" name="promoCode" value={details.promoCode} onChange={handleInputChange} placeholder="TRAVO1000" className="flex-grow bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-mono uppercase tracking-widest" />
                  <button type="button" onClick={handleApplyPromo} className="px-5 py-3 bg-brand-sand text-brand-charcoal hover:bg-white transition-colors text-xs font-black uppercase tracking-widest rounded-xl">Apply</button>
                </div>
                {promoError && <p className="text-[10px] text-rose-400 font-bold mt-1">{promoError}</p>}
                {appliedPromo && <p className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Coupon applied. Saved Rs. {discountAmount.toLocaleString()}.</p>}
              </div>

              <label className="space-y-1.5 block">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Special Requests / Medical Notes</span>
                <textarea name="specialRequests" rows={2} value={details.specialRequests} onChange={handleInputChange} placeholder="Row preferences, diet notes, medical conditions." className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-sand transition-colors font-medium placeholder-gray-600 resize-none" />
              </label>

              <div className="bg-[#050B14] p-4 rounded-xl border border-white/5 space-y-2.5">
                <div className="flex justify-between items-center text-xs"><span className="text-gray-400">Seat Fare ({details.seats} seats)</span><span className="font-mono text-gray-200">Rs. {subTotal.toLocaleString()}</span></div>
                {discountAmount > 0 && <div className="flex justify-between items-center text-xs text-emerald-400"><span>Applied Coupon Saving</span><span className="font-mono">-Rs. {discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between items-center text-xs text-gray-400"><span>Tolls, Taxes & Permits</span><span className="text-emerald-400 uppercase font-black text-[9px] bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">Included</span></div>
                <div className="pt-2 border-t border-white/5 flex justify-between items-center"><span className="text-xs font-bold text-white uppercase">Net Travel Investment</span><span className="text-lg font-black text-brand-sand font-mono">Rs. {netTotal.toLocaleString()}</span></div>
              </div>

              {formError && <p className="text-xs text-rose-400 font-bold flex items-center gap-1 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20"><ShieldAlert className="w-4 h-4 shrink-0" /> {formError}</p>}

              <button type="submit" disabled={isSubmitting} className="w-full py-4 text-center bg-brand-sand hover:bg-white text-brand-charcoal font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50">
                {isSubmitting ? "Generating Boarding Token..." : "Authorize Boarding Booking"}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white font-display uppercase tracking-wider">Seats Reserved</h3>
                <p className="text-xs text-gray-400 max-w-sm">Share this ticket code to WhatsApp support to complete validation.</p>
              </div>

              <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-sand via-white/5 to-transparent border border-white/5 shadow-2xl">
                <div className="p-5 rounded-2xl bg-[#050B14] text-left space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-[10px] font-black text-brand-sand uppercase tracking-widest font-display">TRAVO Official Boarding Ticket</span>
                    <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2.5 py-0.5 rounded">Allocated</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoBlock label="Primary Traveler" value={details.fullName} />
                    <InfoBlock label="Ticket Code" value={generatedPass} highlight />
                    <InfoBlock label="Expedition" value={trip.name} />
                    <InfoBlock label="Seats Reserved" value={`${details.seats} Travelers`} />
                    <InfoBlock label="Total Investment" value={`Rs. ${netTotal.toLocaleString()}`} success />
                    <InfoBlock label="Batch Departure" value={trip.upcomingDeparture} />
                  </div>
                  <div className="pt-3 border-t border-dashed border-white/10 flex justify-between items-center">
                    <div><p className="text-[9px] uppercase text-gray-500 font-bold">Assembly Point</p><p className="text-[10px] text-gray-300 leading-tight">{assemblyPoint}</p></div>
                    <span className="text-[9px] text-brand-sand bg-brand-sand/10 px-2 py-1 rounded border border-brand-sand/20 font-mono font-black whitespace-nowrap">Captains: 2</span>
                  </div>
                </div>
              </div>

              <a href={`https://wa.me/911234567890?text=${encodeURIComponent(`Hi TRAVO! My name is ${details.fullName}. I reserved ${details.seats} seats for ${trip.name} on ${trip.upcomingDeparture} under ticket code ${generatedPass}. Please verify my reservation.`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] transition-all font-black text-xs uppercase tracking-widest text-white rounded-xl inline-flex items-center justify-center gap-2 shadow-lg">
                Share Pass to WhatsApp Support
              </a>
              <button onClick={onClose} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs uppercase tracking-widest font-black">Close Window</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value, highlight, success }: { label: string; value: string; highlight?: boolean; success?: boolean }) {
  return (
    <div>
      <p className="text-[9px] uppercase text-gray-500 font-bold">{label}</p>
      <p className={`text-xs font-black truncate ${success ? "text-emerald-400" : highlight ? "text-brand-sand font-mono" : "text-white"}`}>{value}</p>
    </div>
  );
}
