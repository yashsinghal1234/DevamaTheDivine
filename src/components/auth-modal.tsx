"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "./auth-provider";

const logo =
  "https://devamathedivine.com/cdn/shop/files/main_logo.png?height=100&v=1768676583";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "phone" | "email";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "phone",
}: AuthModalProps) {
  const [method, setMethod] = useState<"phone" | "email">(initialMode);
  const [step, setStep] = useState<"input" | "otp">("input");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Reset states on open/close
  useEffect(() => {
    if (!isOpen) {
      setStep("input");
      setOtp(["", "", "", "", "", ""]);
      setCountdown(30);
    }
  }, [isOpen]);

  // Resend OTP countdown timer
  useEffect(() => {
    if (step === "otp" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "phone" && phone.length < 10) return;
    if (method === "email" && !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
      setCountdown(30);
      setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length < 4) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const userDisplay =
        name || (method === "phone" ? `Devotee (${phone.slice(-4)})` : email.split("@")[0]);
      login({
        name: userDisplay,
        email: method === "email" ? email : `${phone}@devama.in`,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Dimmed backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container: Bottom sheet on mobile, centered card on desktop */}
      <div className="relative w-full sm:max-w-md bg-cream-card border border-line rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 transition-transform">
        
        {/* Top Header bar with Drag handle for mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-clay/30 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-clay/70 hover:text-maroon transition-colors p-1 rounded-full hover:bg-cream"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <Image
              src={logo}
              alt="Devama The Divine"
              width={40}
              height={40}
              className="h-10 w-auto mb-2.5"
            />
            <span className="eyebrow text-terracotta tracking-widest text-[10px]">
              Sacred Authenticity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ink mt-1">
              {step === "input"
                ? "Login or Sign up"
                : `Verify ${method === "phone" ? "Mobile Number" : "Email"}`}
            </h2>
            <p className="text-xs text-clay mt-1.5 max-w-xs">
              {step === "input"
                ? "Enter your details to track orders, access your sacred collection & benefits."
                : `We sent a 6-digit verification code to ${
                    method === "phone" ? `+91 ${phone}` : email
                  }`}
            </p>
          </div>

          {/* STEP 1: Phone / Email Input */}
          {step === "input" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {method === "phone" ? (
                <div>
                  <label className="block text-xs font-medium text-clay mb-1.5">
                    Mobile Phone Number
                  </label>
                  <div className="flex rounded-xl border border-line bg-white/90 overflow-hidden focus-within:border-gold-deep focus-within:ring-1 focus-within:ring-gold/40 transition-all">
                    {/* Country Code Pill */}
                    <div className="flex items-center gap-1.5 px-3 bg-sand/60 border-r border-line text-xs font-semibold text-ink">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 px-3.5 py-3 text-sm text-ink placeholder:text-clay/50 bg-transparent outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-clay mb-1.5">
                      Your Full Name (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Devotee name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-line bg-white/90 text-sm text-ink placeholder:text-clay/50 outline-none focus:border-gold-deep focus:ring-1 focus:ring-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-clay mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-line bg-white/90 text-sm text-ink placeholder:text-clay/50 outline-none focus:border-gold-deep focus:ring-1 focus:ring-gold/40"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || (method === "phone" ? phone.length < 10 : !email)}
                className="btn-sheen w-full rounded-xl bg-maroon hover:bg-maroon-deep text-cream py-3.5 text-sm font-semibold tracking-wide disabled:opacity-50 transition-all shadow-sm"
              >
                {isSubmitting ? "Sending OTP..." : "Continue"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="h-px flex-1 bg-line" />
                <span className="px-3 text-xs text-clay/70">or</span>
                <div className="h-px flex-1 bg-line" />
              </div>

              {/* Toggle Phone / Email (Zomato-style secondary channel) */}
              <button
                type="button"
                onClick={() => setMethod(method === "phone" ? "email" : "phone")}
                className="w-full py-2.5 rounded-xl border border-line bg-white/80 hover:bg-sand/40 text-xs font-medium text-ink transition-colors flex items-center justify-center gap-2"
              >
                {method === "phone" ? (
                  <>
                    <svg className="w-4 h-4 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect width="20" height="15" x="2" y="4.5" rx="2.5" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    Continue with Email
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8A15.3 15.3 0 0 0 13.2 17.4l1.6-1.6a1 1 0 0 1 1.1-.2 11.5 11.5 0 0 0 3.6 1.1 1 1 0 0 1 .9 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 2 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .9 11.5 11.5 0 0 0 1.1 3.6 1 1 0 0 1-.3 1.1L6.6 10.8z" />
                    </svg>
                    Continue with Phone OTP
                  </>
                )}
              </button>

              {/* One-Tap Google Login */}
              <button
                type="button"
                onClick={() => {
                  login({ name: "Google Devotee", email: "user@gmail.com" });
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-line bg-white/80 hover:bg-white text-xs font-medium text-ink transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          )}

          {/* STEP 2: Zomato Segmented 6-Box OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpInputsRef.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-11 h-13 text-center text-lg font-bold font-mono rounded-xl border border-line bg-white/90 text-maroon-deep focus:border-gold-deep focus:ring-2 focus:ring-gold/30 outline-none transition-all shadow-xs"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.join("").length < 4}
                className="btn-sheen w-full rounded-xl bg-maroon hover:bg-maroon-deep text-cream py-3.5 text-sm font-semibold tracking-wide disabled:opacity-50 transition-all shadow-sm"
              >
                {isSubmitting ? "Verifying..." : "Verify & Complete"}
              </button>

              <div className="flex items-center justify-between text-xs text-clay">
                <button
                  type="button"
                  onClick={() => setStep("input")}
                  className="hover:text-maroon underline"
                >
                  Change {method === "phone" ? "Number" : "Email"}
                </button>

                {countdown > 0 ? (
                  <span>Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCountdown(30)}
                    className="text-maroon font-semibold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Legal microcopy */}
          <p className="text-[11px] text-center text-clay/70 mt-6 leading-relaxed">
            By continuing, you agree to Devama&apos;s{" "}
            <a href="/pages/shopping-information" className="underline hover:text-maroon">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="/pages/shopping-information" className="underline hover:text-maroon">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

