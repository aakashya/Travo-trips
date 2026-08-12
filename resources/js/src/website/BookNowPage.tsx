import React, { useState, useEffect } from "react";
import { 
  Compass, Calendar, Timer, MessageSquare, CreditCard, QrCode, Building2, 
  CheckCircle2, ShieldAlert, Plus, Minus, Sparkles, ArrowLeft, Copy, Check, 
  ShieldCheck, Wallet, Coins, ArrowRight, Info, Hotel, Users, Ship, CheckCircle
} from "lucide-react";
import { ANDAMAN_PACKAGES, AndamanPackage } from "../data/andamanPackages";

interface BookNowPageProps {
  onNavigate: (view: any) => void;
  initialTripId?: string;
}

export default function BookNowPage({ onNavigate, initialTripId = "andaman-dream-4d3n" }: BookNowPageProps) {
  // Find initial package or default to 4d3n
  const initialPkg = ANDAMAN_PACKAGES.find((p) => p.id === initialTripId) || ANDAMAN_PACKAGES[1] || ANDAMAN_PACKAGES[0];
  
  const [selectedTripId, setSelectedTripId] = useState<string>(initialPkg.id);
  const [selectedStarRating, setSelectedStarRating] = useState<2 | 3 | 4 | 5>(3); // 3-Star Deluxe default
  const [seats, setSeats] = useState<number>(2); // Default 2 adults group

  const currentPackage = ANDAMAN_PACKAGES.find((p) => p.id === selectedTripId) || ANDAMAN_PACKAGES[0];
  const activeCategory = currentPackage.categories.find((c) => c.starRating === selectedStarRating) || currentPackage.categories[0];
  const pricingObj = activeCategory.pricing[seats] || activeCategory.pricing[2] || Object.values(activeCategory.pricing)[0];

  const PER_PERSON_FARE = pricingObj.perPersonPrice;
  const BASE_TOTAL_FARE = pricingObj.totalPrice;

  // Form input details
  const [details, setDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    promoCode: "",
    specialRequests: "",
    paymentMethod: "upi" as "upi" | "card" | "netbanking" | "bank"
  });

  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");
  const [formError, setFormError] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Recalculate discount
  useEffect(() => {
    if (appliedPromo === "TRAVO1000") {
      setDiscountAmount(seats * 1000);
    } else if (appliedPromo === "MOUNTAINLOVE") {
      setDiscountAmount(Math.round(BASE_TOTAL_FARE * 0.1));
    } else {
      setDiscountAmount(0);
    }
  }, [selectedTripId, seats, selectedStarRating, appliedPromo, BASE_TOTAL_FARE]);

  const finalPayable = Math.max(0, BASE_TOTAL_FARE - discountAmount);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.fullName || !details.phoneNumber || !details.email) {
      setFormError("Please fill in all required fields (Full Name, Phone & Email)!");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    // Simulate booking pass generation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setGeneratedPass(`TRV-AND-${randomId}`);
    }, 1200);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Navigation Button */}
        <button
          onClick={() => onNavigate("trips")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-[#9C753B] rounded-xl text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#9C753B]" /> Back to All Andaman Packages
        </button>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9C753B]/10 border border-[#9C753B]/30 rounded-full text-neutral-900 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> TRAVO VERIFIED PARTNER BOOKING PORTAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-neutral-900">
            Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">Andaman Island Getaway</span>
          </h1>
          <p className="text-xs text-neutral-600 font-light max-w-2xl">
            Complete your booking details. Guaranteed 100% tax-inclusive fare with private AC transfers, inter-island cruise vouchers, MAP meals & 24x7 TRAVO ground concierge support.
          </p>
        </div>

        {/* SUCCESS BOARDING PASS VIEW */}
        {isSuccess ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 shadow-2xl space-y-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black font-display uppercase text-neutral-900">
                Booking Pass Confirmed!
              </h2>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                Congratulations <strong className="text-neutral-900">{details.fullName}</strong>! Your Andaman expedition voucher has been logged in our system.
              </p>
            </div>

            {/* Boarding Card */}
            <div className="max-w-xl mx-auto bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C753B]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] text-brand-sand uppercase tracking-wider font-bold">Booking Voucher Pass</p>
                  <p className="text-lg font-black text-white">{generatedPass}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full">
                  VERIFIED & CONFIRMED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Package Name</p>
                  <p className="font-bold text-white mt-0.5">{currentPackage.title}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Duration</p>
                  <p className="font-bold text-white mt-0.5">{currentPackage.duration}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Travelers Pax</p>
                  <p className="font-bold text-white mt-0.5">{seats} {seats === 1 ? 'Adult' : 'Adults'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Hotel Star Tier</p>
                  <p className="font-bold text-amber-400 mt-0.5">{selectedStarRating}★ {activeCategory.badgeLabel}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Arrival Hub</p>
                  <p className="font-bold text-white mt-0.5">Port Blair Airport (IXZ)</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Total Paid / Payable</p>
                  <p className="font-black text-emerald-400 mt-0.5">₹{finalPayable.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> 24x7 TRAVO Concierge Assigned
                </span>
                <button
                  onClick={() => onNavigate("home")}
                  className="px-5 py-2 bg-[#9C753B] hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-all"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Main Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* 1. Select Andaman Package */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#9C753B]" /> 1. Select Andaman Package
                </h3>

                <div className="space-y-2">
                  {ANDAMAN_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTripId(pkg.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                        selectedTripId === pkg.id
                          ? "bg-[#FAF9F6] border-[#9C753B] ring-2 ring-[#9C753B]/20 shadow-sm"
                          : "bg-white border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-neutral-900 uppercase">{pkg.title}</span>
                          <span className="text-[10px] font-bold text-[#9C753B] bg-[#9C753B]/10 px-2 py-0.5 rounded-full">
                            {pkg.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">{pkg.subtitle}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedTripId === pkg.id ? "border-[#9C753B] bg-[#9C753B] text-white" : "border-neutral-300"
                      }`}>
                        {selectedTripId === pkg.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Select Group Pax & Hotel Category Tier */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9C753B]" /> 2. Group Size & Hotel Star Tier
                </h3>

                {/* Pax selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Number of Adults in Group:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 8, 9, 10, 12].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSeats(p)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          seats === p
                            ? "bg-neutral-900 text-white shadow-md scale-105"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {p} {p === 1 ? "Adult" : "Adults"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Star rating tier selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Hotel Accommodation Category:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { star: 2, label: "2★ Standard", badge: "BUDGET" },
                      { star: 3, label: "3★ Deluxe", badge: "HOT SALE" },
                      { star: 4, label: "4★ Premium", badge: "RECOMMENDED" },
                      { star: 5, label: "5★ Luxury", badge: "HIGH STANDARD" }
                    ].map((tier) => (
                      <button
                        key={tier.star}
                        type="button"
                        onClick={() => setSelectedStarRating(tier.star as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedStarRating === tier.star
                            ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                            : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider opacity-90">{tier.badge}</span>
                        <p className="text-xs font-bold mt-0.5">{tier.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Included Hotel List Preview */}
                <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span>Hotels Included ({activeCategory.categoryName})</span>
                    <span className="text-[10px] text-[#9C753B] font-semibold">Ferry: {activeCategory.ferryType}</span>
                  </div>
                  <div className="space-y-1 text-neutral-700 pt-1">
                    {activeCategory.hotels.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>{h.location}:</strong> {h.hotelName} ({h.roomCategory})</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 3. Lead Traveler Primary Info */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#9C753B]" /> 3. Lead Traveler Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-700">Full Name *</label>
                    <input 
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={details.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-700">Phone Number (WhatsApp) *</label>
                    <input 
                      type="tel"
                      name="phoneNumber"
                      placeholder="+91 98765 43210"
                      value={details.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="font-bold text-neutral-700">Email Address (For Vouchers) *</label>
                    <input 
                      type="email"
                      name="email"
                      placeholder="rahul.sharma@example.com"
                      value={details.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="font-bold text-neutral-700">Special Requests / Flight Numbers (Optional)</label>
                    <textarea 
                      name="specialRequests"
                      rows={2}
                      placeholder="e.g. Arriving on Indigo 6E-204 at 10:15 AM, need extra bed for child"
                      value={details.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#9C753B]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Payment Method Selection */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#9C753B]" /> 4. Payment Gateway & Options
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "upi", label: "UPI QR Code", icon: <QrCode className="w-4 h-4 text-[#9C753B]" /> },
                    { id: "card", label: "Cards / Razorpay", icon: <CreditCard className="w-4 h-4 text-[#9C753B]" /> },
                    { id: "netbanking", label: "Net Banking", icon: <Building2 className="w-4 h-4 text-[#9C753B]" /> },
                    { id: "bank", label: "Bank NEFT/IMPS", icon: <Coins className="w-4 h-4 text-[#9C753B]" /> }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setDetails(prev => ({ ...prev, paymentMethod: m.id as any }))}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        details.paymentMethod === m.id
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                          : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {m.icon}
                      <span className="text-xs font-bold">{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* UPI QR Display if UPI selected */}
                {details.paymentMethod === "upi" && (
                  <div className="p-4 bg-[#FAF9F6] border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs">
                    <div className="p-2 bg-white border border-neutral-200 rounded-xl shrink-0">
                      <QrCode className="w-20 h-20 text-neutral-800" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="font-bold text-neutral-900">Scan & Pay via any UPI App (GPay, PhonePe, Paytm)</p>
                      <p className="text-[#9C753B] font-mono font-bold">travo.payments@icici</p>
                      <button
                        type="button"
                        onClick={() => handleCopy("travo.payments@icici", "UPI ID")}
                        className="px-3 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[10px] font-bold rounded-lg transition-all"
                      >
                        {copiedText === "UPI ID" ? "Copied UPI ID!" : "Copy Official UPI ID"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Error Notice */}
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" /> {formError}
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#9C753B] hover:bg-amber-600 text-white text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating TRAVO Boarding Voucher...</span>
                ) : (
                  <>Confirm & Generate Boarding Voucher <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

            </form>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-6 sticky top-8">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-3">
                  Fare Breakdown & Voucher Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Selected Package:</span>
                    <span className="font-bold text-neutral-900">{currentPackage.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Duration:</span>
                    <span className="font-bold text-neutral-900">{currentPackage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Group Size:</span>
                    <span className="font-bold text-neutral-900">{seats} {seats === 1 ? 'Adult' : 'Adults'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Hotel Category:</span>
                    <span className="font-bold text-[#9C753B]">{selectedStarRating}★ {activeCategory.badgeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Per Person Fare:</span>
                    <span className="font-bold text-neutral-900">₹{PER_PERSON_FARE.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex justify-between text-sm">
                    <span className="font-bold text-neutral-800">Base Group Total:</span>
                    <span className="font-black text-neutral-900">₹{BASE_TOTAL_FARE.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Promo Code Input Box */}
                  <div className="pt-3 border-t border-neutral-200 space-y-2">
                    <label className="font-bold text-neutral-700 text-[11px] uppercase tracking-wider">
                      Have a Promo Code? (Try TRAVO1000 or MOUNTAINLOVE)
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        name="promoCode"
                        placeholder="ENTER CODE"
                        value={details.promoCode}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs uppercase font-mono text-neutral-900"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-neutral-900 hover:bg-[#9C753B] text-white font-bold rounded-xl text-xs transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedPromo && (
                      <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Code '{appliedPromo}' applied! Saved ₹{discountAmount.toLocaleString('en-IN')}
                      </p>
                    )}
                    {promoError && (
                      <p className="text-xs text-red-600 font-bold">{promoError}</p>
                    )}
                  </div>

                  {/* Final Total Payable */}
                  <div className="p-4 bg-neutral-900 text-white rounded-2xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Net Total Payable (100% Tax Included)</p>
                    <p className="text-2xl font-black text-emerald-400">₹{finalPayable.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-neutral-300">No extra state entry taxes or hidden boat fees.</p>
                  </div>
                </div>

                {/* Ground Guarantees list */}
                <div className="p-4 bg-[#FAF9F6] rounded-2xl space-y-2 text-[11px] text-neutral-700">
                  <p className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> TRAVO Assured Ground Logistics
                  </p>
                  <ul className="space-y-1 text-neutral-600">
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Airport Pickup & Drop in AC Private Vehicle</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Pre-booked Inter-Island Cruise Tickets</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Complimentary Elephant Beach Snorkeling</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> 24x7 Dedicated Ground Support Captain</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
