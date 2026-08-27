import React, { useState, useEffect, useMemo } from "react";
import { 
  Compass, Calendar, Timer, MessageSquare, CreditCard, QrCode, Building2, 
  CheckCircle2, ShieldAlert, Plus, Minus, Sparkles, ArrowLeft, Copy, Check, 
  ShieldCheck, Wallet, Coins, ArrowRight, Info, Hotel, Users, Ship, CheckCircle,
  Download, UserCheck, Lock, Gift
} from "lucide-react";
import { 
  TRIPS_DATA, 
  TRIPS_LIST, 
  ANDAMAN_PACKAGES, 
  GOA_PACKAGES, 
  NEPAL_PACKAGES, 
  KERALA_PACKAGES, 
  BHUTAN_PACKAGES, 
  SIKKIM_PACKAGES,
  KASHMIR_PACKAGES,
  LADAKH_PACKAGES
} from "../data";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface BookNowPageProps {
  onNavigate: (view: any) => void;
  initialTripId?: string;
}

export default function BookNowPage({ onNavigate, initialTripId = "andaman-dream-4d3n" }: BookNowPageProps) {
  const { user, isLoggedIn, addBooking, openAuthModal, redeemTravoCoins } = useCustomerAuth();

  const [selectedTripId, setSelectedTripId] = useState<string>(initialTripId);
  const [destinationFilter, setDestinationFilter] = useState<string>("all");
  const [selectedStarRating, setSelectedStarRating] = useState<number>(3);
  const [selectedPaxCount, setSelectedPaxCount] = useState<number>(2);
  const [selectedSikkimTier, setSelectedSikkimTier] = useState<"SUPER_DELUXE" | "3_STAR">("SUPER_DELUXE");
  const [selectedSikkimSeason, setSelectedSikkimSeason] = useState<"season" | "offSeason">("offSeason");

  // Travo Coins redemption state
  const [useCoins, setUseCoins] = useState(false);

  // Determine specific data object if applicable
  const andamanPkg = useMemo(() => ANDAMAN_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const goaPkg = useMemo(() => GOA_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const nepalPkg = useMemo(() => NEPAL_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const keralaPkg = useMemo(() => KERALA_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const bhutanPkg = useMemo(() => BHUTAN_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const sikkimPkg = useMemo(() => SIKKIM_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const kashmirPkg = useMemo(() => KASHMIR_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const ladakhPkg = useMemo(() => LADAKH_PACKAGES.find(p => p.id === selectedTripId), [selectedTripId]);
  const genericTrip = useMemo(() => TRIPS_DATA[selectedTripId] || TRIPS_LIST[0], [selectedTripId]);

  // Compute available PAX options based on trip type
  const availablePaxOptions = useMemo(() => {
    if (kashmirPkg) {
      return kashmirPkg.pricingByVehiclePax.map(p => ({
        count: p.minPax,
        label: `${p.paxSlab} (${p.vehicleType}) — ₹${p.pricePerPerson.toLocaleString('en-IN')} / person (Total ₹${(p.pricePerPerson * p.minPax).toLocaleString('en-IN')})`,
        perPersonPrice: p.pricePerPerson,
        totalPrice: p.pricePerPerson * p.minPax
      }));
    }

    if (ladakhPkg) {
      return ladakhPkg.pricingByPax.map(p => ({
        count: p.minPax,
        label: `${p.paxSlab} (${p.vehicleType}) — ₹${p.pricePerPerson.toLocaleString('en-IN')} / person (Total ₹${(p.pricePerPerson * p.minPax).toLocaleString('en-IN')})`,
        perPersonPrice: p.pricePerPerson,
        totalPrice: p.pricePerPerson * p.minPax
      }));
    }

    if (andamanPkg) {
      const activeCat = andamanPkg.categories.find(c => c.starRating === selectedStarRating) || andamanPkg.categories[0];
      return Object.keys(activeCat.pricing).map(k => {
        const count = parseInt(k, 10);
        const priceInfo = activeCat.pricing[count];
        return {
          count,
          label: `${count} ${count === 1 ? 'Adult' : 'Adults'} — ₹${priceInfo.perPersonPrice.toLocaleString('en-IN')} / person (Total ₹${priceInfo.totalPrice.toLocaleString('en-IN')})`,
          perPersonPrice: priceInfo.perPersonPrice,
          totalPrice: priceInfo.totalPrice
        };
      });
    }

    if (nepalPkg) {
      const activeTier = nepalPkg.hotelTiers.find(t => (t.tierId === "2_STAR" && selectedStarRating === 2) || (t.tierId === "3_STAR" && selectedStarRating === 3) || (t.tierId === "4_STAR" && selectedStarRating === 4)) || nepalPkg.hotelTiers[0];
      return activeTier.pricingByPax.map(p => ({
        count: p.paxCount,
        label: `${p.paxSlab} (${p.vehicleAssigned}) — ₹${p.pricePerPerson.toLocaleString('en-IN')} / person (Total ₹${p.totalPrice.toLocaleString('en-IN')})`,
        perPersonPrice: p.pricePerPerson,
        totalPrice: p.totalPrice
      }));
    }

    if (keralaPkg) {
      const activeTier = keralaPkg.hotelTiers.find(t => (t.tierId === "2_STAR" && selectedStarRating === 2) || (t.tierId === "3_STAR" && selectedStarRating === 3) || (t.tierId === "4_STAR" && selectedStarRating === 4) || (t.tierId === "5_STAR" && selectedStarRating === 5)) || keralaPkg.hotelTiers[0];
      return activeTier.pricingByPax.map(p => ({
        count: p.paxCount,
        label: `${p.paxSlab} (${p.vehicleAssigned}) — ₹${p.pricePerPerson.toLocaleString('en-IN')} / person (Total ₹${p.totalPrice.toLocaleString('en-IN')})`,
        perPersonPrice: p.pricePerPerson,
        totalPrice: p.totalPrice
      }));
    }

    if (sikkimPkg) {
      const activeTier = sikkimPkg.hotelTiers.find(t => t.tierId === selectedSikkimTier) || sikkimPkg.hotelTiers[0];
      return activeTier.seasonPricing.map(p => {
        const perPerson = selectedSikkimSeason === "season" ? p.seasonPerPerson : p.offSeasonPerPerson;
        const total = selectedSikkimSeason === "season" ? p.seasonTotal : p.offSeasonTotal;
        return {
          count: p.paxCount,
          label: `${p.paxSlab} (${selectedSikkimSeason === "season" ? "On-Season" : "Off-Season"}) — ₹${perPerson.toLocaleString('en-IN')} / person (Total ₹${total.toLocaleString('en-IN')})`,
          perPersonPrice: perPerson,
          totalPrice: total
        };
      });
    }

    if (bhutanPkg) {
      return [1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map(count => ({
        count,
        label: `${count} ${count === 1 ? 'Adult' : 'Adults'} — ₹${bhutanPkg.pricePerPerson.toLocaleString('en-IN')} / person (Total ₹${(bhutanPkg.pricePerPerson * count).toLocaleString('en-IN')})`,
        perPersonPrice: bhutanPkg.pricePerPerson,
        totalPrice: bhutanPkg.pricePerPerson * count
      }));
    }

    if (goaPkg) {
      const basePerPax = 4200;
      return [2, 4, 6, 8, 10, 12].map(count => ({
        count,
        label: `${count} Adults — ₹${basePerPax.toLocaleString('en-IN')} / person (Total ₹${(basePerPax * count).toLocaleString('en-IN')})`,
        perPersonPrice: basePerPax,
        totalPrice: basePerPax * count
      }));
    }

    // Default Himalayan generic (Manali / Valley of Flowers)
    const baseFare = parseInt(genericTrip.price.replace(/[^\d]/g, ""), 10) || 9999;
    return [1, 2, 3, 4, 5, 6, 8, 10, 12].map(count => ({
      count,
      label: `${count} ${count === 1 ? 'Adult' : 'Adults'} — ₹${baseFare.toLocaleString('en-IN')} / person (Total ₹${(baseFare * count).toLocaleString('en-IN')})`,
      perPersonPrice: baseFare,
      totalPrice: baseFare * count
    }));
  }, [kashmirPkg, ladakhPkg, andamanPkg, nepalPkg, keralaPkg, sikkimPkg, bhutanPkg, goaPkg, genericTrip, selectedStarRating, selectedSikkimTier, selectedSikkimSeason]);

  // Ensure selected PAX exists in available options
  useEffect(() => {
    if (availablePaxOptions.length > 0) {
      const exists = availablePaxOptions.find(o => o.count === selectedPaxCount);
      if (!exists) {
        setSelectedPaxCount(availablePaxOptions[0].count);
      }
    }
  }, [availablePaxOptions, selectedPaxCount]);

  // Compute Active Pricing Object
  const currentPricing = useMemo(() => {
    const matched = availablePaxOptions.find(o => o.count === selectedPaxCount);
    if (matched) return matched;
    if (availablePaxOptions.length > 0) return availablePaxOptions[0];
    return { count: 2, perPersonPrice: 9999, totalPrice: 19998, label: "" };
  }, [availablePaxOptions, selectedPaxCount]);

  const BASE_TOTAL_FARE = currentPricing.totalPrice;
  const PER_PERSON_FARE = currentPricing.perPersonPrice;

  // Form input details
  const [details, setDetails] = useState({
    fullName: user?.name || "",
    phoneNumber: user?.phone || "",
    email: user?.email || "",
    promoCode: "",
    specialRequests: "",
    paymentMethod: "upi" as "upi" | "card" | "netbanking" | "bank"
  });

  // Sync user details if logged in
  useEffect(() => {
    if (user) {
      setDetails(prev => ({
        ...prev,
        fullName: prev.fullName || user.name,
        phoneNumber: prev.phoneNumber || user.phone,
        email: prev.email || user.email
      }));
    }
  }, [user]);

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
      setDiscountAmount(selectedPaxCount * 1000);
    } else if (appliedPromo === "MOUNTAINLOVE") {
      setDiscountAmount(Math.round(BASE_TOTAL_FARE * 0.1));
    } else {
      setDiscountAmount(0);
    }
  }, [selectedTripId, selectedPaxCount, selectedStarRating, appliedPromo, BASE_TOTAL_FARE]);

  const userCoins = user?.travoCoins || 0;
  const coinsDiscount = useCoins && isLoggedIn ? Math.min(userCoins, Math.max(0, BASE_TOTAL_FARE - discountAmount)) : 0;
  const finalPayable = Math.max(0, BASE_TOTAL_FARE - discountAmount - coinsDiscount);
  const potentialEarnedCoins = Math.floor((finalPayable / 100) * 5); // 5 Coins per ₹100 spent

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

    if (!isLoggedIn) {
      openAuthModal("Login or register to confirm your booking and access your digital boarding pass & vouchers");
      return;
    }

    if (!details.fullName || !details.phoneNumber || !details.email) {
      setFormError("Please fill in all required fields (Full Name, Phone & Email)!");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `TRV-${randomId}`;

    // Persist to user's real account
    addBooking({
      bookingRef: bookingCode,
      tripId: genericTrip.id,
      tripName: genericTrip.name,
      tripImage: genericTrip.bannerImage || genericTrip.heroImage,
      destination: genericTrip.routeStops?.[0]?.name || genericTrip.name,
      duration: genericTrip.duration,
      departureDate: genericTrip.upcomingDeparture || "Upcoming Departure",
      returnDate: "Flexible Return",
      paxCount: selectedPaxCount,
      totalPrice: BASE_TOTAL_FARE - discountAmount,
      paidAmount: finalPayable,
      coinsRedeemed: coinsDiscount,
      hotelTier: sikkimPkg ? selectedSikkimTier : `${selectedStarRating}★ Deluxe Accommodations`,
      leadPassenger: {
        name: details.fullName,
        email: details.email,
        phone: details.phoneNumber
      },
      coTravelers: selectedPaxCount > 1 ? [`Traveler 2 (${details.fullName} Party)`] : [],
      specialRequests: details.specialRequests,
      status: "confirmed",
      captainName: "Captain Vikram Rawat",
      captainPhone: "+91 98112 34567"
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setGeneratedPass(bookingCode);
    }, 1000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filtered trips for the package selector
  const selectableTrips = useMemo(() => {
    return TRIPS_LIST.filter(t => {
      if (destinationFilter === "all") return true;
      if (destinationFilter === "kashmir") return t.id.startsWith("kashmir-");
      if (destinationFilter === "ladakh") return t.id.startsWith("leh-") || t.id.startsWith("ladakh-");
      if (destinationFilter === "kerala") return t.id.startsWith("kerala-");
      if (destinationFilter === "bhutan") return t.id.startsWith("bhutan-");
      if (destinationFilter === "sikkim") return t.id.startsWith("sikkim-");
      if (destinationFilter === "nepal") return t.id.startsWith("nepal-");
      if (destinationFilter === "goa") return t.id.startsWith("goa-");
      if (destinationFilter === "andaman") return t.id.startsWith("andaman-");
      if (destinationFilter === "himalayas") return ["manali", "valley-of-flowers"].includes(t.id);
      return true;
    });
  }, [destinationFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Navigation Button */}
        <button
          onClick={() => onNavigate("trips")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-[#9C753B] rounded-xl text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#9C753B]" /> Back to All Trips & Expeditions
        </button>

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9C753B]/10 border border-[#9C753B]/30 rounded-full text-neutral-900 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> TRAVO VERIFIED BOOKING & RESERVATION PORTAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-neutral-900">
            Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C753B] to-neutral-800">Trip & Customise Group PAX</span>
          </h1>
          <p className="text-xs text-neutral-600 font-light max-w-2xl">
            Choose your destination package, select your exact group size from the PAX dropdown, choose your hotel star rating, and lock in guaranteed 100% tax-inclusive group pricing.
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
                Congratulations <strong className="text-neutral-900">{details.fullName}</strong>! Your expedition voucher has been successfully registered.
              </p>
            </div>

            {/* Boarding Card */}
            <div className="max-w-xl mx-auto bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C753B]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] text-brand-sand uppercase tracking-wider font-bold">Official Booking Voucher</p>
                  <p className="text-lg font-black text-white">{generatedPass}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-full">
                  VERIFIED & CONFIRMED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Package Name</p>
                  <p className="font-bold text-white mt-0.5">{genericTrip.name}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Duration</p>
                  <p className="font-bold text-white mt-0.5">{genericTrip.duration}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Travelers Selected</p>
                  <p className="font-bold text-white mt-0.5">{selectedPaxCount} {selectedPaxCount === 1 ? 'Adult' : 'Adults'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Category Tier</p>
                  <p className="font-bold text-amber-400 mt-0.5">
                    {sikkimPkg ? selectedSikkimTier : `${selectedStarRating}★ Category`}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Upcoming Departure</p>
                  <p className="font-bold text-white mt-0.5">{genericTrip.upcomingDeparture}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] uppercase font-semibold">Total Paid / Payable</p>
                  <p className="font-black text-emerald-400 mt-0.5">₹{finalPayable.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> 24x7 TRAVO Ground Captain Assigned
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate("customer-dashboard")}
                    className="px-5 py-2.5 bg-[#9C753B] hover:bg-amber-600 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" /> View in Account & Vouchers
                  </button>
                  <button
                    onClick={() => onNavigate("home")}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all"
                  >
                    Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MAIN FORM VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Form Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* 1. Destination Category & Package Selection */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#9C753B]" /> 1. Select Tour Package
                </h3>

                {/* Destination Quick Filters */}
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {[
                    { id: "all", label: "All Packages" },
                    { id: "kashmir", label: "Kashmir (B2B)" },
                    { id: "ladakh", label: "Leh Ladakh (B2B)" },
                    { id: "kerala", label: "Kerala" },
                    { id: "bhutan", label: "Bhutan" },
                    { id: "sikkim", label: "Sikkim & Darjeeling" },
                    { id: "nepal", label: "Nepal" },
                    { id: "goa", label: "Goa" },
                    { id: "andaman", label: "Andaman" },
                    { id: "himalayas", label: "Manali/VOF" }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setDestinationFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        destinationFilter === filter.id
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Package Select Dropdown or List */}
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {selectableTrips.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTripId(pkg.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                        selectedTripId === pkg.id
                          ? "bg-[#FAF9F6] border-[#9C753B] ring-2 ring-[#9C753B]/20 shadow-sm"
                          : "bg-white border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-neutral-900 uppercase">{pkg.name}</span>
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

              {/* 2. PAX Dropdown Selection & Star Tier Customisation */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9C753B]" /> 2. Select Travelers PAX & Category Tier
                </h3>

                {/* PAX DROPDOWN SELECTOR */}
                <div className="space-y-2">
                  <label htmlFor="pax-select-dropdown" className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Number of Travelers (PAX Requirements):</span>
                    <span className="text-[#9C753B] font-black text-[11px]">{currentPricing.count} PAX Active</span>
                  </label>

                  <div className="relative">
                    <select
                      id="pax-select-dropdown"
                      value={selectedPaxCount}
                      onChange={(e) => setSelectedPaxCount(parseInt(e.target.value, 10))}
                      className="w-full appearance-none px-4 py-3.5 bg-neutral-50 border-2 border-neutral-300 hover:border-[#9C753B] focus:border-[#9C753B] rounded-2xl text-xs font-bold text-neutral-900 focus:outline-none transition-all cursor-pointer shadow-sm pr-10"
                    >
                      {availablePaxOptions.map((opt) => (
                        <option key={opt.count} value={opt.count}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-600">
                      <Users className="w-4 h-4 text-[#9C753B]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-light">
                    * Rates adapt automatically based on vehicle allocation and group slab for this itinerary.
                  </p>
                </div>

                {/* Sikkim Tier & Season Switchers if Sikkim Package */}
                {sikkimPkg && (
                  <div className="space-y-4 pt-2 border-t border-neutral-100">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                        Hotel Category Tier:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {sikkimPkg.hotelTiers.map((tier) => (
                          <button
                            key={tier.tierId}
                            type="button"
                            onClick={() => setSelectedSikkimTier(tier.tierId)}
                            className={`p-3 rounded-2xl border text-left transition-all ${
                              selectedSikkimTier === tier.tierId
                                ? "bg-[#9C753B] text-white border-[#9C753B] shadow-md"
                                : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                            }`}
                          >
                            <span className="text-[9px] font-black uppercase tracking-wider opacity-90">{tier.badgeLabel}</span>
                            <p className="text-xs font-bold mt-0.5">{tier.categoryName}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                        Season Selection:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSikkimSeason("offSeason")}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                            selectedSikkimSeason === "offSeason"
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                              : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          Off-Season Rates (Best Value)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedSikkimSeason("season")}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                            selectedSikkimSeason === "season"
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                              : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          Peak Season Rates (April-June)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Star Rating Selector for Andaman, Kerala, Nepal */}
                {(andamanPkg || keralaPkg || nepalPkg) && (
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <label className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                      Hotel Accommodation Star Rating:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { star: 2, label: "2★ Standard", badge: "BUDGET" },
                        { star: 3, label: "3★ Deluxe", badge: "POPULAR" },
                        { star: 4, label: "4★ Premium", badge: "RECOMMENDED" },
                        { star: 5, label: "5★ Luxury", badge: "HERITAGE" }
                      ].filter(tier => {
                        if (keralaPkg) return [2, 3, 4, 5].includes(tier.star);
                        if (nepalPkg) return [2, 3, 4].includes(tier.star);
                        if (andamanPkg) return [2, 3, 4, 5].includes(tier.star);
                        return true;
                      }).map((tier) => (
                        <button
                          key={tier.star}
                          type="button"
                          onClick={() => setSelectedStarRating(tier.star)}
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
                )}

              </div>

              {/* 3. Lead Traveler Primary Info */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black font-display uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#9C753B]" /> 3. Lead Traveler Details
                  </h3>
                  {isLoggedIn ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                      <UserCheck className="w-3 h-3" /> Logged In: {user?.name.split(" ")[0]}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("Sign in to automatically save your bookings, earn loyalty points, and receive digital passes")}
                      className="text-[10px] bg-[#9C753B]/10 hover:bg-[#9C753B]/20 text-[#9C753B] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#9C753B]/30 transition-all"
                    >
                      <Lock className="w-3 h-3" /> Sign In / Register
                    </button>
                  )}
                </div>

                {!isLoggedIn && (
                  <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                    <Info className="w-4 h-4 text-[#9C753B] shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      <strong>Customer Login is mandatory to generate tickets:</strong> Sign in or create a quick account now so your bookings, PDF vouchers, and loyalty points are saved safely.
                    </p>
                  </div>
                )}

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
                      placeholder="e.g. Arriving on Indigo flight at 11:30 AM, need vegetarian meals"
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

              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" /> {formError}
                </div>
              )}

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
                  Fare Breakdown & Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Selected Package:</span>
                    <span className="font-bold text-neutral-900 text-right max-w-[60%] line-clamp-1">{genericTrip.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Duration:</span>
                    <span className="font-bold text-neutral-900">{genericTrip.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Travelers Group:</span>
                    <span className="font-bold text-neutral-900">{selectedPaxCount} {selectedPaxCount === 1 ? 'Adult' : 'Adults'}</span>
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

                  {/* Travo Coins Redemption */}
                  {isLoggedIn && user && (
                    <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#9C753B] text-white flex items-center justify-center text-xs font-black shadow-sm">
                            <Coins className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-900">Redeem Travo Coins</p>
                            <p className="text-[10px] text-neutral-600">Balance: <strong className="text-[#9C753B]">{user.travoCoins || 0} Coins</strong> (Worth ₹{user.travoCoins || 0})</p>
                          </div>
                        </div>

                        {(user.travoCoins || 0) > 0 ? (
                          <button
                            type="button"
                            onClick={() => setUseCoins(!useCoins)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              useCoins
                                ? "bg-[#9C753B] text-white shadow-sm"
                                : "bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
                            }`}
                          >
                            {useCoins ? "Applied ✓" : "Apply Coins"}
                          </button>
                        ) : (
                          <span className="text-[10px] text-neutral-400 font-medium">0 Coins</span>
                        )}
                      </div>

                      {useCoins && coinsDiscount > 0 && (
                        <p className="text-[11px] text-amber-900 font-semibold bg-white/80 p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                          <span>Travo Coins Discount:</span>
                          <strong className="text-emerald-700">-₹{coinsDiscount.toLocaleString('en-IN')}</strong>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Travo Coins Earning Banner */}
                  <div className="p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-[#9C753B] shrink-0" />
                    <p className="text-[11px] text-neutral-800">
                      You will earn <strong className="text-[#9C753B] font-black">+{potentialEarnedCoins} Travo Coins</strong> on this booking! (5 Coins per ₹100 spent)
                    </p>
                  </div>

                  {/* Final Total Payable */}
                  <div className="p-4 bg-neutral-900 text-white rounded-2xl space-y-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Net Total Payable (100% Tax Included)</p>
                    <p className="text-2xl font-black text-emerald-400">₹{finalPayable.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-neutral-300">All permits, tolls, driver allowance & GST included.</p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F6] rounded-2xl space-y-2 text-[11px] text-neutral-700">
                  <p className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#9C753B]" /> TRAVO Assured Ground Logistics
                  </p>
                  <ul className="space-y-1 text-neutral-600">
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Airport / Station Pickup & Drop in AC Private Cab</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Pre-verified Deluxe / 3★ / 4★ Hotel Accommodations</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> Daily Breakfast & Dinners (MAP Plan Included)</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600" /> 24x7 Dedicated Ground Support & Assistance</li>
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
