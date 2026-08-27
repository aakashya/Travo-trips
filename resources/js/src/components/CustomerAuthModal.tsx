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
    requestPasswordReset
  } = useCustomerAuth();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup Form
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupReferralCode, setSignupReferralCode] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Forgot Password Form
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    const res = await login(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
    } else {
      setErrorMsg(res.error || "Login failed. Please check credentials.");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!signupFirstName.trim() || !signupLastName.trim() || !signupEmail.trim() || !signupPhone.trim() || !signupPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    const res = await signup({
      name: `${signupFirstName.trim()} ${signupLastName.trim()}`,
      email: signupEmail,
      phone: signupPhone,
      referralCode: signupReferralCode,
      password: signupPassword
    });
    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
    } else {
      setErrorMsg(res.error || "Signup failed.");
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setForgotSuccessMsg("");
    if (!forgotEmail.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    const res = await requestPasswordReset(forgotEmail);
    setIsSubmitting(false);
    if (res.success) {
      setForgotSuccessMsg(res.message);
    } else {
      setErrorMsg(res.message);
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

          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
            {isForgotPassword && "Reset Your Password"}
            {!isForgotPassword && activeTab === "login" && "Sign In to Your Journey"}
            {!isForgotPassword && activeTab === "signup" && "Create Your Account"}
          </h2>

          <p className="text-xs text-neutral-300 font-light mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9C753B]" />
            {isForgotPassword
              ? "Enter your account email and we'll send you a reset link."
              : (authModalReason || "Manage bookings, download e-tickets, and track loyalty perks.")}
          </p>
        </div>

        {/* Tab Selector */}
        {!isForgotPassword && (
        <div className="flex border-b border-neutral-200 bg-neutral-50/80 p-1.5 gap-1.5">
          <button
            onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "login" 
                ? "bg-white text-neutral-900 shadow-xs border border-neutral-200" 
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setActiveTab("signup"); setErrorMsg(""); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === "signup"
                ? "bg-white text-neutral-900 shadow-xs border border-neutral-200"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sign up
          </button>
        </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 0. FORGOT PASSWORD SUB-VIEW */}
          {isForgotPassword && (
            forgotSuccessMsg ? (
              <div className="space-y-5 text-center py-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">{forgotSuccessMsg}</p>
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(false); setForgotSuccessMsg(""); setForgotEmail(""); setErrorMsg(""); }}
                  className="text-xs font-bold text-[#9C753B] hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] focus:ring-1 focus:ring-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Reset Link"}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>

                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setErrorMsg(""); }}
                    className="text-xs font-bold text-neutral-500 hover:text-[#9C753B]"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )
          )}

          {/* 1. LOGIN TAB */}
          {!isForgotPassword && activeTab === "login" && (
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
                    autoComplete="email"
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
                    onClick={() => { setIsForgotPassword(true); setErrorMsg(""); }}
                    className="text-[10px] font-bold text-[#9C753B] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
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
                disabled={isSubmitting}
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{isSubmitting ? "Logging In..." : "Login"}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-2 text-center">
                <p className="text-xs text-neutral-500">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="font-bold text-[#9C753B] hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 2. SIGNUP TAB */}
          {!isForgotPassword && activeTab === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      placeholder="e.g. Siddharth"
                      className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="family-name"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      placeholder="e.g. Menon"
                      className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="numeric"
                      value={signupPhone}
                      onChange={(e) => {
                        let digits = e.target.value.replace(/\D/g, "");
                        // Drop a leading "91" country code if someone types it out of habit,
                        // so it doesn't eat into the real 10-digit number.
                        if (digits.length > 10 && digits.startsWith("91")) {
                          digits = digits.slice(2);
                        }
                        setSignupPhone(digits.slice(0, 10));
                      }}
                      placeholder="10-digit mobile number"
                      className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:relative">
                  <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={signupReferralCode}
                    onChange={(e) => setSignupReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ALEX300"
                    className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-mono uppercase"
                  />
                  <p className="text-[10px] text-[#9C753B] font-mono font-bold leading-none sm:absolute sm:top-full sm:left-0 sm:mt-1 whitespace-nowrap">Get Instant +300 Travo Coins</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-10 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] outline-hidden font-medium"
                  />
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
                    autoComplete="new-password"
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

              {/* Bonus notification — commented out for now, will use this later on
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
              */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
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
        </div>
      </motion.div>
    </div>
  );
}
