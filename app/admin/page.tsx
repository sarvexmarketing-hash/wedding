"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import {
  Users,
  Heart,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Plus,
  RefreshCw,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Calendar,
  MapPin,
  Clock,
  Eye,
  LogIn
} from "lucide-react";

export default function AdminOverviewPage() {
  const { allWeddings, wedding, switchWedding } = useWedding();
  const [provisionModalOpen, setProvisionModalOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Stats calculation
  const totalWeddingsCount = 1420 + allWeddings.length;
  const totalGuestsManaged = 584200 + allWeddings.reduce((acc, w) => acc + w.totalInvited, 0);

  const systemServices = [
    { name: "Meta WhatsApp Cloud API", status: "Operational", uptime: "99.98%", latency: "48ms", icon: MessageSquare },
    { name: "AI Attendance Engine", status: "Operational", uptime: "99.95%", latency: "38ms", icon: Zap },
    { name: "Next.js Edge Clusters (BOM/HYD)", status: "Operational", uptime: "100%", latency: "14ms", icon: Server },
    { name: "Razorpay / UPI Payment Gateway", status: "Operational", uptime: "99.99%", latency: "82ms", icon: CreditCard },
  ];

  const recentPlatformEvents = [
    { id: 1, type: "rsvp", title: "RSVP Confirmed (Family of 4)", wedding: "vagdevi & ratna", time: "2 mins ago", tag: "RSVP Engine" },
    { id: 2, type: "payment", title: "Upgraded to Luxury Concierge (₹14,999)", wedding: "Kabir & Ananya", time: "14 mins ago", tag: "Revenue" },
    { id: 3, type: "video", title: "AI Wedding Video Generated (4K UHD)", wedding: "Rahul & Priya", time: "28 mins ago", tag: "AI Studio" },
    { id: 4, type: "gift", title: "Shagun Gift Logged (₹51,000 cash)", wedding: "Aarav & Meera", time: "45 mins ago", tag: "Gift Vault" },
    { id: 5, type: "signup", title: "New Wedding Workspace Created", wedding: "Dev & Ishita", time: "1 hour ago", tag: "Acquisition" },
  ];

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastModalOpen(false);
      setBroadcastText("");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Website & Platform Master Console
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              All Systems Operational
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Platform Operations & Management
          </h1>
          <p className="text-xs text-stone-400">
            Real-time telemetry, client workspaces, subscription revenue, and website controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setBroadcastModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#211520] hover:bg-[#2A1B28] text-xs font-semibold text-stone-200 border border-[#3A2234] transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Site Broadcast</span>
          </button>
          <Link
            href="/admin/weddings"
            className="px-4 py-2 rounded-xl bg-[#74182E] hover:bg-[#581223] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Plus className="w-3.5 h-3.5 text-[#E1CD98]" />
            <span>Manage All Occasions</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Total Client Occasions</span>
            <div className="w-8 h-8 rounded-lg bg-[#211520] border border-[#3A2234] flex items-center justify-center text-[#C5A059]">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {totalWeddingsCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+38 new this week</span>
            <span className="text-stone-500">· 100% live</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Platform Guests Managed</span>
            <div className="w-8 h-8 rounded-lg bg-[#211520] border border-[#3A2234] flex items-center justify-center text-[#74182E]">
              <Users className="w-4 h-4 text-[#CE3B61]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {(totalGuestsManaged / 1000).toFixed(1)}k
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% MoM growth</span>
            <span className="text-stone-500">· 82% RSVP rate</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Total Platform GMV</span>
            <div className="w-8 h-8 rounded-lg bg-[#211520] border border-[#3A2234] flex items-center justify-center text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            ₹84.6 Lakhs
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>MRR: ₹7.2 Lakhs</span>
            <span className="text-stone-500">· Razorpay Active</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">WhatsApp Dispatches</span>
            <div className="w-8 h-8 rounded-lg bg-[#211520] border border-[#3A2234] flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            1.24 Million
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>99.4% delivery rate</span>
            <span className="text-stone-500">· Meta Cloud API</span>
          </div>
        </div>
      </div>

      {/* CURRENT LIVE CLIENT WEDDINGS TABLE WITH INSTANT IMPERSONATION */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2D1B28]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C5A059]">
                Live Client Occasions ({allWeddings.length})
              </span>
              <span className="text-[10px] bg-[#211520] text-stone-300 px-2 py-0.5 rounded-full border border-[#3A2234]">
                Instant Impersonate Enabled
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Select any occasion to log directly into its operations workspace or test its guest invite card.
            </p>
          </div>

          <Link
            href="/admin/weddings"
            className="text-xs text-[#E1CD98] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2D1B28] text-stone-400">
                <th className="pb-3 font-semibold">Wedding / Couple</th>
                <th className="pb-3 font-semibold">Date & City</th>
                <th className="pb-3 font-semibold">Primary Venue</th>
                <th className="pb-3 font-semibold">Plan Tier</th>
                <th className="pb-3 font-semibold">RSVP Progress</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211520]">
              {allWeddings.map(w => {
                const isSelected = wedding.id === w.id;
                return (
                  <tr key={w.id} className="hover:bg-[#211520]/60 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#74182E] text-white flex items-center justify-center font-serif font-bold text-xs shrink-0">
                          {w.coupleNames.charAt(0)}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{w.coupleNames}</span>
                            {isSelected && (
                              <span className="text-[10px] font-sans font-medium px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                                Active Workspace
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">/invite/{w.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 pr-4 text-stone-300">
                      <div>{w.weddingDate}</div>
                      <div className="text-[11px] text-stone-500">{w.city}</div>
                    </td>

                    <td className="py-3.5 pr-4 text-stone-300 max-w-xs truncate">
                      {w.primaryVenue}
                    </td>

                    <td className="py-3.5 pr-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#74182E]/30 text-[#E1CD98] border border-[#74182E]">
                        Premium Plan
                      </span>
                    </td>

                    <td className="py-3.5 pr-4">
                      <div className="space-y-1 w-32">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-300 font-medium">{w.confirmedCount} Confirmed</span>
                          <span className="text-stone-500 font-mono">{w.rsvpCompletionPercentage}%</span>
                        </div>
                        <div className="w-full bg-[#2A1B28] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#C5A059] h-full"
                            style={{ width: `${w.rsvpCompletionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-right space-x-2">
                      <Link
                        href={`/invite/${w.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded-lg bg-[#211520] hover:bg-[#2A1B28] text-stone-300 text-[11px] font-medium border border-[#3A2234] inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-[#C5A059]" />
                        <span>Invite</span>
                      </Link>

                      <button
                        onClick={() => {
                          switchWedding(w.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors inline-flex items-center gap-1 ${
                          isSelected
                            ? "bg-emerald-900 text-white"
                            : "bg-[#74182E] text-white hover:bg-[#581223]"
                        }`}
                      >
                        <LogIn className="w-3 h-3" />
                        <span>{isSelected ? "Active" : "Impersonate"}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column Grid: System Infrastructure & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Services Health */}
        <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#C5A059]" />
              <h3 className="text-sm font-serif font-bold text-white">System Infrastructure & APIs</h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">All Healthy</span>
          </div>

          <div className="space-y-3">
            {systemServices.map(svc => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.name}
                  className="p-3.5 rounded-xl bg-[#211520] border border-[#2D1B28] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2A1B28] flex items-center justify-center text-[#E1CD98] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{svc.name}</div>
                      <div className="text-[11px] text-stone-400">
                        Uptime: {svc.uptime} · Response: {svc.latency}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {svc.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-right">
            <Link href="/admin/settings" className="text-xs text-[#E1CD98] hover:underline">
              Inspect API Keys & Environment Settings →
            </Link>
          </div>
        </div>

        {/* Live Platform Activity Stream */}
        <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#74182E]" />
              <h3 className="text-sm font-serif font-bold text-white">Live Platform Activity Feed</h3>
            </div>
            <span className="text-[10px] text-stone-500">Live WebSockets</span>
          </div>

          <div className="space-y-3">
            {recentPlatformEvents.map(evt => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-[#211520] border border-[#2D1B28] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-medium text-white">{evt.title}</div>
                  <div className="text-[11px] text-stone-400">
                    Wedding: <strong className="text-stone-300">{evt.wedding}</strong>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#2A1B28] text-[#E1CD98] border border-[#3A2234]">
                    {evt.tag}
                  </span>
                  <div className="text-[10px] text-stone-500 mt-0.5">{evt.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <Link href="/admin/settings" className="text-xs text-[#E1CD98] hover:underline">
              View Complete Audit Trail Logs →
            </Link>
          </div>
        </div>
      </div>

      {/* BROADCAST MODAL */}
      {broadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#160E15] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#3A2234] shadow-2xl relative text-white">
            <div className="space-y-2 pb-4 border-b border-[#2D1B28]">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-lg font-serif font-bold text-white">Broadcast System Announcement</h3>
              </div>
              <p className="text-xs text-stone-400">
                Pushes a high-priority announcement banner across all couple dashboards and marketing pages.
              </p>
            </div>

            {broadcastSent ? (
              <div className="py-8 text-center space-y-2 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-base font-serif font-bold">Broadcast Dispatched Successfully!</div>
                <p className="text-xs text-stone-400">All connected sessions updated via edge push.</p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-4 py-4 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Broadcast Message Text</label>
                  <textarea
                    rows={3}
                    value={broadcastText}
                    onChange={e => setBroadcastText(e.target.value)}
                    placeholder="e.g. Planned database maintenance scheduled for tonight at 2:00 AM IST. All wedding invitations remain fully active."
                    className="w-full p-3 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Target Audience</label>
                    <select className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white">
                      <option>All Users & Visitors</option>
                      <option>Couple Dashboards Only</option>
                      <option>Guests & RSVPs Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Alert Level</label>
                    <select className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white">
                      <option>Info (Gold Banner)</option>
                      <option>Success (Emerald Banner)</option>
                      <option>Urgent Maintenance (Crimson)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1B28]">
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="px-4 py-2 rounded-full bg-[#211520] text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-semibold shadow-soft"
                  >
                    Send Broadcast Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
