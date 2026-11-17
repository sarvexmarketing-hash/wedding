"use client";

import React, { useState } from "react";
import {
  CreditCard,
  TrendingUp,
  Download,
  CheckCircle2,
  Sliders,
  DollarSign,
  Tag,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ExternalLink,
  Plus
} from "lucide-react";

export default function AdminSubscriptionsPage() {
  const [basicPrice, setBasicPrice] = useState("1499");
  const [premiumPrice, setPremiumPrice] = useState("4999");
  const [luxuryPrice, setLuxuryPrice] = useState("14999");
  const [pricesSaved, setPricesSaved] = useState(false);

  const transactions = [
    { id: "TXN-8841", couple: "Kabir & Ananya", plan: "Luxury Concierge", amount: "₹14,999", method: "UPI / PhonePe", gateway: "Razorpay", date: "Today, 2:15 PM", status: "Captured" },
    { id: "TXN-8840", couple: "vagdevi & ratna", plan: "Premium Operating System", amount: "₹4,999", method: "HDFC Netbanking", gateway: "Razorpay", date: "Today, 11:40 AM", status: "Captured" },
    { id: "TXN-8839", couple: "Rahul & Priya", plan: "Premium Operating System", amount: "₹4,999", method: "Visa Credit Card", gateway: "Stripe", date: "Yesterday", status: "Captured" },
    { id: "TXN-8838", couple: "Aarav & Meera", plan: "Luxury Concierge", amount: "₹14,999", method: "ICICI Corporate UPI", gateway: "Razorpay", date: "14 Nov 2026", status: "Captured" },
    { id: "TXN-8837", couple: "Manish & Ritika", plan: "Basic Invitation", amount: "₹1,499", method: "Google Pay UPI", gateway: "Razorpay", date: "13 Nov 2026", status: "Captured" },
    { id: "TXN-8836", couple: "Rohan & Sanjana", plan: "Premium Operating System", amount: "₹4,999", method: "Mastercard", gateway: "Razorpay", date: "12 Nov 2026", status: "Captured" },
  ];

  const handleSavePrices = (e: React.FormEvent) => {
    e.preventDefault();
    setPricesSaved(true);
    setTimeout(() => setPricesSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Revenue, Tiers & Payment Gateways
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-emerald-400">Razorpay Live API Active</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Subscriptions, Pricing & Financial Ledger
          </h1>
          <p className="text-xs text-stone-400">
            Control platform wedding subscription tiers, modify prices dynamically, and audit transaction settlements.
          </p>
        </div>

        <button
          onClick={() => alert("Platform revenue ledger exported to CSV successfully.")}
          className="px-3.5 py-2 rounded-xl bg-[#211520] hover:bg-[#2A1B28] text-xs font-semibold text-stone-300 border border-[#3A2234] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-xs text-stone-400 font-medium">Cumulative Gross Revenue</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">₹84,62,400</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.6% vs previous quarter</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-xs text-stone-400 font-medium">Monthly Run-Rate (MRR)</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#E1CD98]">₹7,20,000</div>
          <div className="text-[11px] text-stone-400">Recurring SaaS & Upgrades</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-xs text-stone-400 font-medium">Avg Revenue Per Wedding</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">₹5,920</div>
          <div className="text-[11px] text-emerald-400">Luxury tier upsell driven</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-xs text-stone-400 font-medium">Payment Success Ratio</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">99.8%</div>
          <div className="text-[11px] text-stone-400">Instant UPI & Netbanking</div>
        </div>
      </div>

      {/* PLAN PRICING CONTROLLER (Dynamic Admin Price Management) */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2D1B28]">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C5A059]" />
              <h3 className="text-sm font-serif font-bold text-white">Live Platform Pricing Architecture</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Updates pricing instantly across the public `/pricing` marketing page and couple checkout screens.
            </p>
          </div>

          {pricesSaved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Platform Prices Updated Live
            </span>
          )}
        </div>

        <form onSubmit={handleSavePrices} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          {/* Basic Tier */}
          <div className="p-4 rounded-xl bg-[#211520] border border-[#2D1B28] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-white">Basic Starter</span>
              <span className="text-[10px] uppercase font-bold text-stone-400 bg-[#2A1B28] px-2 py-0.5 rounded">
                Tier 1
              </span>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Price in INR (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  value={basicPrice}
                  onChange={e => setBasicPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg bg-[#160E15] border border-[#3A2234] text-white font-bold text-sm focus:outline-none focus:border-[#74182E]"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-400">Digital card, RSVP headcount, 3 events, CSV exports.</p>
          </div>

          {/* Premium Tier */}
          <div className="p-4 rounded-xl bg-[#211520] border border-[#74182E] space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-[#E1CD98]">Premium OS</span>
              <span className="text-[10px] uppercase font-bold text-[#E1CD98] bg-[#74182E] px-2 py-0.5 rounded">
                Most Popular
              </span>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Price in INR (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  value={premiumPrice}
                  onChange={e => setPremiumPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg bg-[#160E15] border border-[#74182E] text-white font-bold text-sm focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-400">AI Video, Smart Attire Guide, 8 Indian languages, Gift tracking.</p>
          </div>

          {/* Luxury Concierge */}
          <div className="p-4 rounded-xl bg-[#211520] border border-[#2D1B28] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-white">Luxury Concierge</span>
              <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#2A1B28] px-2 py-0.5 rounded">
                VIP / Bespoke
              </span>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Price in INR (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  value={luxuryPrice}
                  onChange={e => setLuxuryPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg bg-[#160E15] border border-[#3A2234] text-white font-bold text-sm focus:outline-none focus:border-[#74182E]"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-400">Custom domain, dedicated ops desk, white-glove WhatsApp concierge.</p>
          </div>

          <div className="md:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-semibold shadow-soft transition-colors"
            >
              Publish New Pricing Globally
            </button>
          </div>
        </form>
      </div>

      {/* LIVE SETTLEMENTS & TRANSACTION LEDGER */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
          <div>
            <h3 className="text-sm font-serif font-bold text-white">Live Settlement & Invoices Ledger</h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Direct telemetry from Razorpay, Stripe, and UPI gateway webhooks.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Auto-Reconciliation Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2D1B28] text-stone-400">
                <th className="pb-3 font-semibold">Payment Ref</th>
                <th className="pb-3 font-semibold">Wedding Workspace</th>
                <th className="pb-3 font-semibold">Plan Tier</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Payment Channel</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211520]">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-[#211520]/50 transition-colors">
                  <td className="py-3.5 pr-4 font-mono text-stone-400">{t.id}</td>
                  <td className="py-3.5 pr-4 font-serif font-bold text-white">{t.couple}</td>
                  <td className="py-3.5 pr-4 text-stone-300">{t.plan}</td>
                  <td className="py-3.5 pr-4 font-bold text-white">{t.amount}</td>
                  <td className="py-3.5 pr-4 text-stone-400">
                    <div>{t.method}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{t.gateway}</div>
                  </td>
                  <td className="py-3.5 pr-4 text-stone-400">{t.date}</td>
                  <td className="py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
