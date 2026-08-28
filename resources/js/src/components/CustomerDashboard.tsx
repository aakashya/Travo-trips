import React, { useState } from "react";
import { 
  Compass, Calendar, Timer, MapPin, Users, Hotel, Ship, 
  Check, X, ArrowRight, ArrowLeft, Star, Heart, 
  Sparkles, CheckCircle2, PhoneCall, ChevronDown, ChevronUp,
  ShieldAlert, ShieldCheck, Award, FileText, Info, Camera, 
  Building2, Wallet, Gift, QrCode, Download, Share2, Printer,
  User, Mail, Phone, Edit3, Trash2, Plus, AlertCircle, ExternalLink,
  MessageSquare, Plane, Ticket, CreditCard, Copy, CheckCircle, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { TRIPS_LIST, TRIPS_DATA } from "../data";
import { CustomerBooking } from "../types";
import { CountryFlag } from "./CountryFlag";
import SiteHeader from "./SiteHeader";
import TravoCoinIcon from "./TravoCoinIcon";

// Same shared background used behind the header on Trips/Team/About/Contact.
const SHARED_HEADER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=1800&auto=format&fit=crop";

interface CustomerDashboardProps {
  onNavigate: (view: string) => void;
  onOpenBooking: (tripId: string) => void;
  initialTab?: "bookings" | "wishlist" | "wallet" | "profile" | "support";
}

export default function CustomerDashboard({ onNavigate, onOpenBooking, initialTab = "bookings" }: CustomerDashboardProps) {
  const { 
    user, 
    isLoggedIn, 
    bookings, 
    wishlist, 
    logout, 
    updateProfile, 
    cancelBooking, 
    toggleWishlist,
    addCoTraveler,
    removeCoTraveler,
    openAuthModal
  } = useCustomerAuth();

  const [activeTab, setActiveTab] = useState<"bookings" | "wishlist" | "wallet" | "profile" | "support">(initialTab || "bookings");

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [bookingFilter, setBookingFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState<CustomerBooking | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingCoTraveler, setIsAddingCoTraveler] = useState(false);
  
  // Profile edit fields
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editCity, setEditCity] = useState(user?.city || "");
  const [editDiet, setEditDiet] = useState(user?.dietaryPreference || "");
  const [editPassport, setEditPassport] = useState(user?.passportNumber || "");
  const [editEmergencyName, setEditEmergencyName] = useState(user?.emergencyContact?.name || "");
  const [editEmergencyPhone, setEditEmergencyPhone] = useState(user?.emergencyContact?.phone || "");
  const [editEmergencyRel, setEditEmergencyRel] = useState(user?.emergencyContact?.relation || "Family");

  // New co-traveler form
  const [newCoName, setNewCoName] = useState("");
  const [newCoAge, setNewCoAge] = useState<number>(28);
  const [newCoGender, setNewCoGender] = useState("Female");
  const [newCoRel, setNewCoRel] = useState("Spouse");

  // Referral copied state
  const [referralCopied, setReferralCopied] = useState(false);
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 text-left flex flex-col justify-between">
        <SiteHeader currentView="customer-dashboard" onNavigate={onNavigate} variant="solid" />
        <div className="flex-1 flex items-center justify-center p-6 my-12">
          <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-neutral-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-[#9C753B]/10 text-[#9C753B] rounded-2xl flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-neutral-900">
                Customer Account Portal
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Sign in to manage your upcoming departures, download trip vouchers, access your wishlist, and redeem travel rewards.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => openAuthModal("Sign in to access your customer dashboard")}
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In / Create Account
              </button>
              <button
                onClick={() => onNavigate("home")}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === "all") return true;
    if (bookingFilter === "upcoming") return b.status === "confirmed" || b.status === "in_review";
    if (bookingFilter === "completed") return b.status === "completed";
    if (bookingFilter === "cancelled") return b.status === "cancelled";
    return true;
  });

  // Get wishlisted trips list
  const wishlistedTrips = TRIPS_LIST.filter(t => wishlist.includes(t.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      city: editCity,
      dietaryPreference: editDiet,
      passportNumber: editPassport,
      emergencyContact: {
        name: editEmergencyName,
        phone: editEmergencyPhone,
        relation: editEmergencyRel
      }
    });
    setIsEditingProfile(false);
  };

  const handleAddCoTravelerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoName.trim()) return;
    addCoTraveler({
      name: newCoName.trim(),
      age: newCoAge,
      gender: newCoGender,
      relation: newCoRel
    });
    setNewCoName("");
    setIsAddingCoTraveler(false);
  };

  const handleConfirmCancel = () => {
    if (cancelModalBookingId) {
      cancelBooking(cancelModalBookingId, cancelReason || "Customer requested online cancellation");
      setCancelModalBookingId(null);
      setCancelReason("");
    }
  };

  const myReferralCode = user.referralCode || `${user.name.split(" ")[0].toUpperCase()}300`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(myReferralCode);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 3000);
  };

  const userCoins = user.travoCoins !== undefined ? user.travoCoins : (user.walletBalance || 0);

  // Coins already earned but still waiting out the 30-day maturity period before they land in the wallet.
  const pendingCoinBookings = bookings.filter(b => !b.coinsCredited && (b.earnedCoins || 0) > 0 && b.coinsCreditOn && (b.status === "confirmed" || b.status === "completed"));
  const pendingCoinsTotal = pendingCoinBookings.reduce((sum, b) => sum + (b.earnedCoins || 0), 0);
  const nextCoinsCreditDate = pendingCoinBookings.length > 0
    ? pendingCoinBookings.reduce((earliest, b) => (b.coinsCreditOn! < earliest ? b.coinsCreditOn! : earliest), pendingCoinBookings[0].coinsCreditOn!)
    : null;
  const formatCreditDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-28 text-left">
      
      {/* 1. TOP CUSTOMER HERO & TRAVELER IDENTITY BANNER — the site's own header sits on top of this
          same image, like every other page, instead of having its own separate solid bar. */}
      <div className="text-white relative border-b border-neutral-800">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SHARED_HEADER_IMAGE})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/70 to-neutral-950/85" />
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#9C753B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <SiteHeader currentView="customer-dashboard" onNavigate={onNavigate} variant="transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* User Info Block */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#9C753B] to-[#D4AF37] text-white flex items-center justify-center border-2 border-white/20 shadow-xl">
                  <User className="w-9 h-9 sm:w-11 sm:h-11" fill="currentColor" />
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 p-1 bg-emerald-600 rounded-full border-2 border-neutral-900" title="Verified Traveler">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
                    {user.name}
                  </h1>
                  {user.customerCode && (
                    <span className="px-2 py-0.5 bg-white/10 text-neutral-300 font-mono text-[10px] rounded-full">
                      ID: {user.customerCode}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-300 font-mono flex flex-wrap items-center gap-2">
                  <span>{user.email}</span>
                  <span>•</span>
                  <span>{user.phone}</span>
                  {user.city && (
                    <>
                      <span>•</span>
                      <span className="text-amber-300">{user.city}</span>
                    </>
                  )}
                </p>
                <p className="text-[11px] text-neutral-400 font-light">
                  Travel Club Member since {user.joinedDate}
                </p>
              </div>
            </div>

            {/* Top Interactive Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab("wallet")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md transition-all text-left group"
              >
                <p className="text-[10px] uppercase font-mono text-amber-300 font-bold flex items-center gap-1">
                  <TravoCoinIcon className="w-3.5 h-3.5" /> Travo Coins
                </p>
                <p className="text-base sm:text-lg font-black text-amber-400">
                  {userCoins.toLocaleString("en-IN")}
                </p>
              </button>

              <button
                onClick={() => setActiveTab("bookings")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md transition-all text-left"
              >
                <p className="text-[10px] uppercase font-mono text-neutral-400 font-bold flex items-center gap-1">
                  <Ticket className="w-3.5 h-3.5 text-blue-400" /> My Trips
                </p>
                <p className="text-base sm:text-lg font-black text-white">
                  {bookings.length} <span className="text-xs font-normal text-neutral-400">Bookings</span>
                </p>
              </button>

              <button
                onClick={logout}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-red-500/80 text-white text-xs font-bold rounded-2xl border border-white/10 transition-colors"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
            
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "bookings"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Bookings</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === "bookings" ? "bg-[#9C753B] text-white" : "bg-neutral-200 text-neutral-700"
              }`}>
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "wishlist"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Wishlist</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === "wishlist" ? "bg-rose-500 text-white" : "bg-neutral-200 text-neutral-700"
              }`}>
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("wallet")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "wallet"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <TravoCoinIcon className="w-4 h-4" />
              <span>Travo Coins & Rewards</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "profile"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Traveler Profile</span>
            </button>

            <button
              onClick={() => setActiveTab("support")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "support"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Help & Support</span>
            </button>

          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: MY BOOKINGS                                      */}
        {/* ======================================================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            
            {/* Filter Sub-Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200">
              <div className="flex items-center gap-2 overflow-x-auto">
                {[
                  { id: "all", label: "All Bookings", count: bookings.length },
                  { id: "upcoming", label: "Upcoming Departures", count: bookings.filter(b => b.status === "confirmed" || b.status === "in_review").length },
                  { id: "completed", label: "Completed Expeditions", count: bookings.filter(b => b.status === "completed").length },
                  { id: "cancelled", label: "Cancelled", count: bookings.filter(b => b.status === "cancelled").length }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setBookingFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      bookingFilter === f.id
                        ? "bg-[#9C753B] text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {f.label} ({f.count})
                  </button>
                ))}
              </div>

              <p className="text-xs text-neutral-500">
                Showing {filteredBookings.length} of {bookings.length} reservations
              </p>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4">
                <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                  <Ticket className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black font-display uppercase tracking-tight text-neutral-900">
                  No {bookingFilter} Bookings Found
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  {bookingFilter === "upcoming" 
                    ? "You have no upcoming departures scheduled. Explore our handpicked Himalayan, Kerala, and Island getaways!"
                    : "No reservations found in this section."}
                </p>
                <button
                  onClick={() => onNavigate("trips")}
                  className="px-6 py-2.5 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-black uppercase rounded-xl shadow transition-all inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" /> Explore Expeditions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => {
                  const isUpcoming = b.status === "confirmed" || b.status === "in_review";
                  return (
                    <div 
                      key={b.id}
                      className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        
                        {/* Trip Image & Status Banner */}
                        <div className="lg:col-span-4 relative min-h-[200px] lg:min-h-full">
                          <img 
                            src={b.tripImage} 
                            alt={b.tripName} 
                            className="w-full h-full object-cover min-h-[180px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-full border border-white/20">
                              Ref: {b.bookingRef}
                            </span>
                            
                            <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full shadow ${
                              b.status === "confirmed"
                                ? "bg-emerald-600 text-white"
                                : b.status === "completed"
                                ? "bg-blue-600 text-white"
                                : b.status === "cancelled"
                                ? "bg-red-600 text-white"
                                : b.status === "cancellation_requested"
                                ? "bg-orange-500 text-white"
                                : "bg-amber-500 text-white"
                            }`}>
                              {b.status === "confirmed"
                                ? "✓ Confirmed & Vouched"
                                : b.status === "cancellation_requested"
                                ? "Cancellation Requested"
                                : b.status === "in_review"
                                ? "In Review"
                                : b.status}
                            </span>
                          </div>

                          {/* Bottom info on image */}
                          <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                            <p className="text-[11px] font-mono text-amber-300 font-bold uppercase">{b.destination}</p>
                            <h4 className="text-sm font-black line-clamp-1">{b.tripName}</h4>
                          </div>
                        </div>

                        {/* Booking Details & Actions */}
                        <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between space-y-5">
                          
                          {/* Info Rows */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-neutral-100">
                            <div>
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Departure Date</p>
                              <p className="text-xs sm:text-sm font-black text-neutral-900 mt-0.5 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#9C753B]" />
                                {b.departureDate}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Duration</p>
                              <p className="text-xs sm:text-sm font-black text-neutral-900 mt-0.5 flex items-center gap-1">
                                <Timer className="w-3.5 h-3.5 text-[#9C753B]" />
                                {b.duration}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Guests & Room</p>
                              <p className="text-xs sm:text-sm font-black text-neutral-900 mt-0.5 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#9C753B]" />
                                {b.paxCount} {b.paxCount === 1 ? "Adult" : "Adults"}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Total Paid</p>
                              <p className="text-xs sm:text-sm font-black text-emerald-700 mt-0.5">
                                ₹{b.totalPrice.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>

                          {/* Passengers & Hotel Tier */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Lead Passenger</p>
                              <p className="font-bold text-neutral-800">{b.leadPassenger.name} ({b.leadPassenger.phone})</p>
                              {b.coTravelers && b.coTravelers.length > 0 && (
                                <p className="text-[11px] text-neutral-500">
                                  Co-Travelers: {b.coTravelers.join(", ")}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Assigned Captain & Concierge</p>
                              <p className="font-bold text-neutral-800 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                {b.captainName || "Captain Assigned (48 hrs prior)"}
                              </p>
                              {b.captainPhone && (
                                <p className="text-[11px] text-neutral-500 font-mono">
                                  Hotline: {b.captainPhone}
                                </p>
                              )}
                            </div>
                          </div>

                          {b.specialRequests && (
                            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <span><strong>Special Notes:</strong> {b.specialRequests}</span>
                            </div>
                          )}

                          {!b.coinsCredited && (b.earnedCoins || 0) > 0 && b.coinsCreditOn && (
                            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <span>
                                <strong>{b.earnedCoins!.toLocaleString("en-IN")} Travo Coins</strong> earned on this booking — credits to your wallet on {formatCreditDate(b.coinsCreditOn)} (30 days after payment).
                              </span>
                            </div>
                          )}

                          {/* Action Buttons Row */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => setSelectedVoucherBooking(b)}
                                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                              >
                                <Download className="w-3.5 h-3.5" /> E-Ticket Voucher
                              </button>

                              <button
                                onClick={() => onNavigate(b.tripId)}
                                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#9C753B]" /> View Itinerary
                              </button>
                            </div>

                            {isUpcoming && (
                              <button
                                onClick={() => setCancelModalBookingId(b.id)}
                                className="text-xs text-red-600 hover:text-red-800 font-bold underline"
                              >
                                Cancel / Reschedule
                              </button>
                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SAVED WISHLIST                                   */}
        {/* ======================================================== */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black font-display uppercase tracking-tight text-neutral-900">
                  My Saved Expeditions ({wishlistedTrips.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Keep track of dream getaways and book whenever departures open.
                </p>
              </div>

              <button
                onClick={() => onNavigate("trips")}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all"
              >
                + Browse All Expeditions
              </button>
            </div>

            {wishlistedTrips.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black font-display uppercase text-neutral-900">Your Wishlist is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Click the heart icon on any expedition card across our site to save it to your personalized wishlist!
                </p>
                <button
                  onClick={() => onNavigate("trips")}
                  className="px-6 py-2.5 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-black uppercase rounded-xl shadow transition-all inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" /> Explore Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedTrips.map((trip) => {
                  return (
                    <div 
                      key={trip.id}
                      className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                    >
                      <div className="relative aspect-16/10 overflow-hidden">
                        <img 
                          src={trip.heroImage} 
                          alt={trip.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Remove from wishlist button */}
                        <button
                          onClick={() => toggleWishlist(trip.id)}
                          className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-rose-400 hover:text-white transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] font-mono uppercase text-amber-300 font-bold">
                            {trip.duration}
                          </span>
                          <h4 className="text-sm font-black line-clamp-1">{trip.name}</h4>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                          {trip.subtitle}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                          <div>
                            <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Starting From</p>
                            <p className="text-base font-black text-neutral-900">{trip.price}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onNavigate(trip.id)}
                              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-all"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => onOpenBooking(trip.id)}
                              className="px-4 py-2 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-black uppercase rounded-xl shadow-xs transition-all flex items-center gap-1"
                            >
                              Book Now <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: TRAVO COINS & REWARDS                             */}
        {/* ======================================================== */}
        {activeTab === "wallet" && (
          <div className="space-y-6">
            
            {/* Travo Coins Banner */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-[#4a361c] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-white/10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="md:col-span-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-mono font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> TRAVO COINS REWARD PROGRAM
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white flex items-center gap-3">
                    <span>Your Travo Coins</span>
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-lg leading-relaxed font-light">
                    Every trip you book earns you Travo Coins that can be redeemed 1:1 against any future road trip, island escape, or mountain tour! Earned coins are credited to your wallet 30 days after your payment is confirmed.
                  </p>

                  {/* Rules Pill Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                      <p className="text-[10px] uppercase font-mono text-amber-300 font-bold">Coin Value</p>
                      <p className="text-base font-black text-white mt-0.5">1 Coin = ₹1 INR</p>
                      <p className="text-[10px] text-neutral-400">Direct cash discount</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                      <p className="text-[10px] uppercase font-mono text-amber-300 font-bold">Earn Rate</p>
                      <p className="text-base font-black text-white mt-0.5">5 Coins / ₹100</p>
                      <p className="text-[10px] text-neutral-400">Credited 30 days post-payment</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                      <p className="text-[10px] uppercase font-mono text-amber-300 font-bold">Referral Program</p>
                      <p className="text-base font-black text-white mt-0.5">300 + 300 Coins</p>
                      <p className="text-[10px] text-neutral-400">Instant on signup & booking</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400 flex items-center gap-1.5">
                      <TravoCoinIcon className="w-3.5 h-3.5" /> Current Coin Balance
                    </p>
                    <p className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                      {userCoins.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-neutral-300 font-medium mt-1">
                      Worth <strong className="text-white">₹{userCoins.toLocaleString("en-IN")} INR</strong> instant discount
                    </p>
                    {pendingCoinsTotal > 0 && (
                      <p className="text-[11px] text-amber-300/90 font-medium mt-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        +{pendingCoinsTotal.toLocaleString("en-IN")} coins pending, credits from {formatCreditDate(nextCoinsCreditDate!)}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-neutral-300 font-medium">Redemption:</span>
                    <span className="text-xs font-black text-emerald-400">Applied on Checkout</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral System */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9C753B] flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black uppercase text-neutral-900">Refer & Earn 300 Coins</h4>
                  <p className="text-xs text-neutral-500">Your friend gets <strong>300 instant coins</strong> when they sign up with your code. You receive <strong>300 Travo Coins (worth ₹300)</strong> when they complete their first booking!</p>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase font-mono font-bold">Your Referral Code</p>
                  <span className="font-mono font-black text-sm text-neutral-900 tracking-wider">
                    {myReferralCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="px-3.5 py-2 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {referralCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>

            {/* Referred Friends Tracker */}
            {user.referredFriends && user.referredFriends.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div>
                    <h4 className="text-sm font-black uppercase text-neutral-900 tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#9C753B]" /> Your Referred Friends ({user.referredFriends.length})
                    </h4>
                    <p className="text-xs text-neutral-500">Track registration & booking rewards from friends who used your code ({myReferralCode}).</p>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {user.referredFriends.map((friend) => (
                    <div key={friend.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-neutral-900">{friend.name}</p>
                        <p className="text-[11px] text-neutral-500 font-mono">
                          {friend.email} • Joined {friend.joinedDate}
                        </p>
                        {friend.bookingTripName && (
                          <p className="text-[10px] text-[#9C753B] font-semibold mt-0.5">
                            Booked: {friend.bookingTripName}
                          </p>
                        )}
                      </div>

                      <div>
                        {friend.status === "first_booking_completed" ? (
                          <div className="text-right space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-full">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> First Booking Completed
                            </span>
                            <p className="text-[11px] font-mono font-bold text-emerald-700">
                              +300 Coins Credited
                            </p>
                          </div>
                        ) : (
                          <div className="text-right space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase rounded-full">
                              <Clock className="w-3 h-3 text-amber-600" /> Signed Up • Booking Pending
                            </span>
                            <p className="text-[11px] font-mono text-neutral-500">
                              300 Coins on First Booking
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How Travo Coins Work Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-4">
              <h4 className="text-sm font-black uppercase text-neutral-900 tracking-wider">
                How Travo Coins Work
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-700">
                <div className="p-4 bg-neutral-50 rounded-2xl space-y-2 border border-neutral-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#9C753B] flex items-center justify-center font-bold">1</div>
                  <h5 className="font-bold text-neutral-900">Earn On Every Spend</h5>
                  <p className="text-neutral-600 leading-relaxed">
                    For every ₹100 you spend on any tour package — Kashmir, Leh Ladakh, Andaman, or any other destination — you automatically earn <strong>5 Travo Coins</strong> — credited to your wallet 30 days after your payment is confirmed.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl space-y-2 border border-neutral-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#9C753B] flex items-center justify-center font-bold">2</div>
                  <h5 className="font-bold text-neutral-900">Direct 1:1 Value</h5>
                  <p className="text-neutral-600 leading-relaxed">
                    <strong>1 Travo Coin = ₹1 INR</strong>. There are no complicated conversion rates or expiration dates. You can use them directly during checkout to lower your payable amount.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl space-y-2 border border-neutral-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#9C753B] flex items-center justify-center font-bold">3</div>
                  <h5 className="font-bold text-neutral-900">300 Referral Reward</h5>
                  <p className="text-neutral-600 leading-relaxed">
                    Your referred friend receives <strong>300 Travo Coins instantly</strong> when they sign up. You receive <strong>300 Travo Coins</strong> as soon as they complete their first trip booking!
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: TRAVELER PROFILE & CO-TRAVELERS                  */}
        {/* ======================================================== */}
        {activeTab === "profile" && (
          <div className="space-y-8">

            {/* Primary Profile Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="text-lg font-black font-display uppercase tracking-tight text-neutral-900">
                    Traveler Information & ID
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Used for hotel check-in permits, flight tickets, and border crossings (Bhutan & Nepal).
                  </p>
                </div>

                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#9C753B]" />
                  {isEditingProfile ? "Cancel" : "Edit Details"}
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={editPhone} 
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Home City / State</label>
                      <input 
                        type="text" 
                        value={editCity} 
                        onChange={(e) => setEditCity(e.target.value)}
                        placeholder="e.g. Bengaluru, Karnataka"
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Dietary Preference</label>
                      <select
                        value={editDiet}
                        onChange={(e) => setEditDiet(e.target.value)}
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      >
                        <option value="">Select preference...</option>
                        <option value="Vegetarian">Vegetarian (North/South Indian)</option>
                        <option value="Jain Vegetarian">Jain Vegetarian (Strict No Onion/Garlic)</option>
                        <option value="Non-Vegetarian">Non-Vegetarian (All Meat / Seafood)</option>
                        <option value="Vegan">Vegan (Plant-Based)</option>
                        <option value="Halal">Halal</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Passport Number (For Bhutan/Nepal)</label>
                      <input 
                        type="text" 
                        value={editPassport} 
                        onChange={(e) => setEditPassport(e.target.value)}
                        placeholder="e.g. T9841029A"
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Emergency Contact Name</label>
                      <input 
                        type="text" 
                        value={editEmergencyName} 
                        onChange={(e) => setEditEmergencyName(e.target.value)}
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-neutral-500">Emergency Contact Phone</label>
                      <input 
                        type="tel" 
                        value={editEmergencyPhone} 
                        onChange={(e) => setEditEmergencyPhone(e.target.value)}
                        className="w-full p-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-black uppercase rounded-xl shadow transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Full Name</p>
                    <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Email Address</p>
                    <p className="font-bold text-neutral-900 font-mono">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Mobile Number</p>
                    <p className="font-bold text-neutral-900">{user.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Home City</p>
                    <p className="font-bold text-neutral-900">{user.city || "Not Set"}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Dietary Preference</p>
                    <p className="font-bold text-emerald-700">{user.dietaryPreference || "Not Set"}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Passport Number</p>
                    <p className="font-bold text-neutral-900 font-mono">{user.passportNumber || "Not Linked"}</p>
                  </div>

                  {user.emergencyContact && (
                    <div className="sm:col-span-3 pt-3 border-t border-neutral-100">
                      <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Emergency Contact</p>
                      <p className="font-bold text-neutral-900 mt-0.5">
                        {user.emergencyContact.name} ({user.emergencyContact.relation}) — {user.emergencyContact.phone}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Saved Co-Travelers Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="text-lg font-black font-display uppercase tracking-tight text-neutral-900">
                    Saved Co-Travelers & Family
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Quickly add frequent travel partners to your expedition bookings with 1 click.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingCoTraveler(!isAddingCoTraveler)}
                  className="px-4 py-2 bg-[#9C753B] hover:bg-[#85632f] text-white text-xs font-black uppercase rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Co-Traveler
                </button>
              </div>

              {/* Add form */}
              {isAddingCoTraveler && (
                <form onSubmit={handleAddCoTravelerSubmit} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
                  <h4 className="text-xs font-black uppercase text-neutral-900">Add New Traveler</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={newCoName} 
                        onChange={(e) => setNewCoName(e.target.value)}
                        placeholder="e.g. Pooja Varma"
                        className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Age</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="99" 
                        value={newCoAge} 
                        onChange={(e) => setNewCoAge(parseInt(e.target.value, 10))}
                        className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Gender</label>
                      <select 
                        value={newCoGender} 
                        onChange={(e) => setNewCoGender(e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-xl"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-500">Relation</label>
                      <select 
                        value={newCoRel} 
                        onChange={(e) => setNewCoRel(e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-xl"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Friend">Friend</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl"
                    >
                      Save Traveler
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingCoTraveler(false)}
                      className="px-4 py-2 bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Co-travelers list */}
              {(!user.savedCoTravelers || user.savedCoTravelers.length === 0) ? (
                <p className="text-xs text-neutral-500 italic">No co-travelers saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.savedCoTravelers.map((c) => (
                    <div key={c.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-neutral-900">{c.name}</p>
                        <p className="text-[11px] text-neutral-500">{c.gender}, {c.age} yrs • {c.relation}</p>
                      </div>
                      <button
                        onClick={() => removeCoTraveler(c.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Remove traveler"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: HELP & SUPPORT                                    */}
        {/* ======================================================== */}
        {activeTab === "support" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-black font-display uppercase tracking-tight text-neutral-900">
                  24/7 Guest Concierge & Trip Captain Hotline
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Direct connection with on-ground expedition captains, flight changes, and emergency support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* WhatsApp Captain Support */}
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 space-y-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-neutral-900">WhatsApp Captain Hotline</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Immediate 5-minute reply on baggage status, pickup timings, and weather alerts.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919800012345?text=Hi%20TRAVO%20Concierge,%20I%20am%20a%20logged%20in%20member."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    Open WhatsApp Chat
                  </a>
                </div>

                {/* Email Support */}
                <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-200 space-y-4">
                  <div className="w-12 h-12 bg-[#9C753B] text-white rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-neutral-900">Priority Email Concierge</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      For corporate group custom quotes, invoice receipts, and flight changes.
                    </p>
                  </div>
                  <a
                    href="mailto:hello@travotrips.com"
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    hello@travotrips.com
                  </a>
                </div>

                {/* Emergency SOS */}
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 space-y-4">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-neutral-900">On-Trip Emergency SOS</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Available strictly for guests currently on active departures across India, Bhutan, or Nepal.
                    </p>
                  </div>
                  <p className="text-sm font-mono font-black text-amber-900">
                    +91 94340 77123
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* MODAL 1: INTERACTIVE BOARDING E-TICKET VOUCHER           */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedVoucherBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 my-8 text-left"
            >
              {/* Voucher Header Banner */}
              <div className="bg-neutral-900 text-white p-6 relative overflow-hidden flex items-center justify-between border-b-4 border-[#9C753B]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#9C753B] text-white font-mono font-black text-[10px] uppercase rounded">
                      TRAVO OFFICIAL VOUCHER
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      ✓ CONFIRMED & ISSUED
                    </span>
                  </div>
                  <h3 className="text-lg font-black font-display uppercase tracking-tight text-white">
                    {selectedVoucherBooking.tripName}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Booking Reference: <strong className="text-white font-mono">{selectedVoucherBooking.bookingRef}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedVoucherBooking(null)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Voucher Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Barcode & QR code Row */}
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Boarding & Check-in Pass</p>
                    <p className="text-sm font-black text-neutral-900">{selectedVoucherBooking.leadPassenger.name}</p>
                    <p className="text-xs text-neutral-500 font-mono">Status: 100% Paid • ₹{selectedVoucherBooking.totalPrice.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <QrCode className="w-12 h-12 text-neutral-900" />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Scan at airport /<br />hotel front desk
                    </div>
                  </div>
                </div>

                {/* Key Manifest Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Departure</p>
                    <p className="font-black text-neutral-900 mt-0.5">{selectedVoucherBooking.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Return Date</p>
                    <p className="font-black text-neutral-900 mt-0.5">{selectedVoucherBooking.returnDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Duration</p>
                    <p className="font-black text-neutral-900 mt-0.5">{selectedVoucherBooking.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Total Travelers</p>
                    <p className="font-black text-neutral-900 mt-0.5">{selectedVoucherBooking.paxCount} Guests</p>
                  </div>
                </div>

                {/* Hotel Category */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs space-y-1">
                  <p className="text-[10px] font-mono uppercase font-bold text-amber-800">Accommodation Tier</p>
                  <p className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Hotel className="w-4 h-4 text-[#9C753B]" />
                    {selectedVoucherBooking.hotelTier || "3-Star Deluxe Heritage Resort"}
                  </p>
                </div>

                {/* Inclusions summary */}
                <div className="space-y-2 text-xs">
                  <p className="text-[10px] font-mono uppercase font-bold text-neutral-400">Included in this voucher</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Private AC Vehicle Transfers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Daily Breakfast & Curated Dinners</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>All Entry Permits & Tolls</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certified Local Expedition Captain</span>
                    </div>
                  </div>
                </div>

                {/* Print and Save Action */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-[#9C753B]" /> Print Voucher
                  </button>

                  <button
                    onClick={() => {
                      alert("Voucher PDF generated and downloaded to your device!");
                      setSelectedVoucherBooking(null);
                    }}
                    className="px-6 py-2.5 bg-[#9C753B] hover:bg-[#85632f] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MODAL 2: CANCELLATION REQUEST MODAL                      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {cancelModalBookingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-5 text-left"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-3 bg-red-50 rounded-2xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black uppercase text-neutral-900">Request Cancellation or Reschedule</h4>
                  <p className="text-xs text-neutral-500">Our team will review your request and get back to you</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700">Reason for cancellation / reschedule</label>
                <textarea
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Change of flight dates, medical reason, personal schedule..."
                  className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-hidden focus:bg-white focus:border-[#9C753B]"
                />
              </div>

              <div className="p-3 bg-neutral-100 rounded-xl text-[11px] text-neutral-600">
                💡 <em>Tip: You can also reschedule your trip dates for free without any penalty!</em>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl transition-all shadow-xs"
                >
                  Submit Cancellation Request
                </button>
                <button
                  onClick={() => setCancelModalBookingId(null)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-all"
                >
                  Keep Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
