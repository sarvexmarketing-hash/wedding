"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Mail, Check, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" className="justify-center" />
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
          Reset Your Password
        </h2>
        <p className="text-xs text-[#7D597E]">
          We&apos;ll send a secure password reset link to your registered email address.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-5">
          {sent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2D1B28]">Reset Link Dispatched</h3>
              <p className="text-xs text-[#7D597E]">
                Check your inbox at <strong>{email}</strong> for instructions to access your wedding workspace.
              </p>
              <Link
                href="/login"
                className="inline-block mt-4 text-xs font-semibold text-[#74182E] hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="couple@domain.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors shadow-soft"
              >
                Send Password Reset Link
              </button>

              <div className="pt-2 text-center">
                <Link href="/login" className="text-xs text-[#7D597E] hover:text-[#74182E] flex items-center justify-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
