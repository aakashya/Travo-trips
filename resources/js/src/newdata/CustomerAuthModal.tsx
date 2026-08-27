import React, { useState } from "react";
import { 
  X, Mail, Lock, User, Phone, ShieldCheck, Sparkles, 
  ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, KeyRound, Compass 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCustomerAuth } from "../context/CustomerAuthContext";

export default function CustomerAuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalReason, 
    login, 
    signup, 
    demoLogin 
  } = useCustomerAuth();

  const [activeTab, setActiveTab] = useState<"login" | "signup" | "demo">("login");
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState("alex.varma@travomail.com");
  const [loginPassword, setLoginPassword] = useState("••••••••");
  
  // Signup Form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupReferralCode, setSignupReferralCode] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!loginEmail.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
    } else {
      setErrorMsg(res.error || "Login failed. Please check credentials.");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    const res = signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      referralCode: signupReferralCode
    });
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
    } else {
      setErrorMsg(res.error || "Signup failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 my-8 text-left"
      >
        {/* Top Header Banner */}
        <div className="relative bg-neutral-900 text-white p-6 sm:p-7 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9C753B]/20 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="px-2.5 py-1 bg-[#9C753B] text-white rounded font-mono font-black text-xs tracking-wider">
              TRAVO
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
              CUSTOMER PORTAL
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
            {activeTab === "login" && "Sign In to Your Journey"}
            {activeTab === "signup" && "Create Your Voyager Account"}
            {activeTab === "demo" && "1-Click Instant Demo Login"}
          </h2>

          <p className="text-xs text-neutral-300 font-light mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9C753B]" />
            {authModalReason || "Manage bookings, download e-tickets, and track loyalty perks."}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-200 bg-neutral-50/80 p-1.5 gap-1.5">
          <button
            onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "login" 
                ? "bg-white text-neutral-900 shadow-xs border border-neutral-200" 
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab("signup"); setErrorMsg(""); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "signup" 
                ? "bg-white text-neutral-900 shadow-xs border border-neutral-200" 
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            New Account
          </button>
          <button
            onClick={() => { setActiveTab("demo"); setErrorMsg(""); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
              activeTab === "demo" 
                ? "bg-[#9C753B] text-white shadow-xs" 
                : "text-[#9C753B] hover:bg-[#9C753B]/10"
            }`}
          >
            <Sparkles className="w-3 h-3" /> Quick Demo
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. LOGIN TAB */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. alex.varma@travomail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] focus:ring-1 focus:ring-[#9C753B] outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={() => setActiveTab("demo")}
                    className="text-[10px] font-bold text-[#9C753B] hover:underline"
                  >
                    Use 1-Click Demo?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] focus:ring-1 focus:ring-[#9C753B] outline-hidden font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-neutral-500">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="font-bold text-[#9C753B] hover:underline"
                  >
                    Create Account & Get ₹3,000 Credit
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 2. SIGNUP TAB */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Siddharth Menon"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-10 pr-10 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600 flex items-center justify-between">
                  <span>Referral Code (Optional)</span>
                  <span className="text-[#9C753B] font-mono text-[10px] font-bold">Get Instant +300 Travo Coins</span>
                </label>
                <input
                  type="text"
                  value={signupReferralCode}
                  onChange={(e) => setSignupReferralCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ALEX300 or PRIYA300"
                  className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-mono uppercase"
                />
              </div>

              {/* Bonus notification */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-neutral-800">
                <Sparkles className="w-4 h-4 text-[#9C753B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-neutral-900">
                    Travo Coins Reward Program:
                  </p>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    • <strong>300 Welcome Coins (worth ₹300)</strong> credited instantly.<br />
                    • <strong>Instant Referral Bonus</strong>: Entering a referral code grants you <strong>+300 instant coins</strong>!<br />
                    • <strong>Referral Reward for Referrer</strong>: The friend who referred you gets <strong>300 Travo Coins</strong> when you complete your first booking.<br />
                    • Earn <strong>5 Travo Coins for every ₹100 spent</strong> on all trips (1 Coin = ₹1).
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Create Voyager Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-xs text-neutral-500">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-bold text-[#9C753B] hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 3. 1-CLICK DEMO LOGIN TAB */}
          {activeTab === "demo" && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed">
                Test the full customer portal, view simulated live bookings, download vouchers, and manage your wishlist with 1-click preloaded customer accounts:
              </p>

              <div className="space-y-3">
                {/* Demo Account 1: Alex Varma */}
                <div 
                  onClick={() => demoLogin("alex")}
                  className="p-4 rounded-2xl border-2 border-amber-500/30 bg-amber-50/50 hover:bg-amber-100/60 hover:border-amber-500 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                      alt="Alex Varma"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#9C753B]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-neutral-900">Alex Varma</h4>
                        <span className="px-2 py-0.5 bg-[#9C753B] text-white text-[9px] font-black uppercase rounded-full">
                          Gold Explorer
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 font-mono">alex.varma@travomail.com</p>
                      <p className="text-[10px] text-amber-900 font-bold mt-0.5">
                        ⭐ 2 Active Bookings • 4,420 Travo Coins (₹4,420 Value)
                      </p>
                    </div>
                  </div>
                  
                  <span className="px-3 py-1.5 bg-[#9C753B] text-white text-xs font-black uppercase rounded-xl group-hover:scale-105 transition-transform shadow-xs">
                    Login ➔
                  </span>
                </div>

                {/* Demo Account 2: Priya Sharma */}
                <div 
                  onClick={() => demoLogin("priya")}
                  className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-400 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" 
                      alt="Priya Sharma"
                      className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-neutral-900">Priya Sharma</h4>
                        <span className="px-2 py-0.5 bg-neutral-200 text-neutral-800 text-[9px] font-black uppercase rounded-full">
                          Silver Voyager
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 font-mono">priya.sharma@gmail.com</p>
                      <p className="text-[10px] text-neutral-500 font-bold mt-0.5">
                        ✨ 3 Wishlisted Expeditions • 1,200 Travo Coins
                      </p>
                    </div>
                  </div>
                  
                  <span className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-black uppercase rounded-xl group-hover:scale-105 transition-transform shadow-xs">
                    Login ➔
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Trust badges footer */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
            </span>
            <span>TRAVO Expeditions Guest Care</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
