"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/components/auth-modal";

const logo =
  "https://devamathedivine.com/cdn/shop/files/main_logo.png?height=100&v=1768676583";

export default function SignupPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <main className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-cream px-4">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#D99D3E 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-cream-card border border-line rounded-3xl p-8 shadow-xl text-center space-y-5">
        <Image src={logo} alt="Devama" width={48} height={48} className="mx-auto h-12 w-auto" />
        <h1 className="font-serif text-3xl font-medium text-ink">Create Devama Space</h1>
        <p className="text-sm text-clay">
          Join the sacred community with one-tap OTP verification.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-sheen w-full rounded-xl bg-maroon hover:bg-maroon-deep text-cream py-3.5 text-sm font-semibold tracking-wide shadow-sm"
        >
          Sign up with Mobile OTP
        </button>
        <div className="pt-2">
          <Link href="/" className="text-xs text-clay hover:text-maroon underline">
            ← Return to Devama store
          </Link>
        </div>
      </div>

      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
