"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Couple",
    weddingDate: "",
    city: "Hyderabad",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Concierge & Support
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Get in Touch with Our Wedding Concierge.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Whether you are planning a 1,000-guest palace wedding or looking for an agency planner partnership, our concierge team is here to assist.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-4 text-xs text-[#4D334E]">
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Direct Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#74182E]" />
                  <span>concierge@weddingos.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#74182E]" />
                  <span>+91 98200 45000 (Mon–Sun 9am–9pm IST)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#74182E]" />
                  <span>Serving Hyderabad, Udaipur, Jaipur, Goa, Delhi NCR & Worldwide</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#74182E] text-white space-y-2">
              <div className="text-xs uppercase font-bold text-[#E1CD98]">Agency Partnership</div>
              <p className="text-xs text-[#EAE2D5] leading-relaxed">
                Are you a luxury wedding planner? We offer white-label portal licenses, priority on-site check-in tablets, and dedicated account managers.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DDCF] shadow-soft">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#2D1B28]">Message Received</h3>
                <p className="text-xs text-[#7D597E] max-w-sm mx-auto">
                  Thank you! Our wedding hospitality specialist will contact you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-xl text-[#2D1B28]">Schedule a 15-Minute Platform Walkthrough</h3>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                    placeholder="e.g. Aditi Sharma"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                      placeholder="aditi@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">WhatsApp Phone *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                      placeholder="+91 98..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">I am a</label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                    >
                      <option value="Couple">Bride / Groom</option>
                      <option value="Parent">Parent / Family Member</option>
                      <option value="Planner">Wedding Planner / Agency</option>
                      <option value="Hospitality">Hotel / Venue Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Expected Wedding Date</label>
                    <input
                      type="text"
                      value={formData.weddingDate}
                      onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                      placeholder="e.g. November 2026"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Estimated Guest Count & Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                    placeholder="e.g. Around 600 guests in Udaipur, need airport pickup coordination..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors shadow-soft"
                >
                  Send Inquiry & Request Demo
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
