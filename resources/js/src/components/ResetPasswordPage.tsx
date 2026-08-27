import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { useCustomerAuth } from "../context/CustomerAuthContext";

interface ResetPasswordPageProps {
  onNavigate: (view: string) => void;
}

export default function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const { confirmPasswordReset, openAuthModal } = useCustomerAuth();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isLinkMissingParams = !token || !email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password.length < 8) {
      setErrorMsg("Your new password must be at least 8 characters.");
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const res = await confirmPasswordReset({ token, email, password, passwordConfirmation });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg(res.message);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden text-neutral-900">
        {/* Header banner */}
        <div className="bg-neutral-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9C753B]/20 rounded-full blur-3xl pointer-events-none" />
          <button
            onClick={() => onNavigate("home")}
            className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold hover:text-white transition-colors flex items-center gap-1.5 mb-3"
          >
            <ArrowLeft className="w-3 h-3" /> Back to TRAVO
          </button>
          <h1 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
            Set A New Password
          </h1>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          {isLinkMissingParams ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>This reset link looks incomplete. Please use the link exactly as it appeared in your email, or request a new one.</span>
            </div>
          ) : successMsg ? (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">{successMsg}</p>
              <button
                type="button"
                onClick={() => {
                  onNavigate("home");
                  openAuthModal("Sign in with your new password.");
                }}
                className="px-6 py-3 bg-[#9C753B] hover:bg-[#85632f] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Sign In Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-500">
                Resetting password for <strong className="text-neutral-800">{email}</strong>
              </p>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
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

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:border-[#9C753B] focus:ring-1 focus:ring-[#9C753B] outline-hidden font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#9C753B] hover:bg-[#85632f] disabled:opacity-60 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Updating..." : "Update Password"}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
