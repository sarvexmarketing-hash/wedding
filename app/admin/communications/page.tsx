"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Radio,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Smartphone,
  ShieldCheck,
  Zap,
  RefreshCw,
  Bell,
  Eye
} from "lucide-react";

export default function AdminCommunicationsPage() {
  const [announcementBanner, setAnnouncementBanner] = useState(
    "🌟 WeddingOS Diwali Offer: Complimentary AI Invitation Video Upgrade for all new workspaces created this month!"
  );
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerSaved, setBannerSaved] = useState(false);

  // New broadcast states
  const [broadcastChannel, setBroadcastChannel] = useState("WhatsApp");
  const [broadcastTarget, setBroadcastTarget] = useState("All Active Couples");
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [dispatchedHistory, setDispatchedHistory] = useState([
    {
      id: "BC-104",
      title: "New AI Attire Guide Feature Released",
      channel: "WhatsApp & In-App",
      audience: "All Couples & Planners (1,635 recipients)",
      status: "Delivered",
      deliveredRate: "99.8%",
      date: "14 Nov 2026, 6:00 PM"
    },
    {
      id: "BC-103",
      title: "Scheduled Maintenance Notification (2:00 AM IST)",
      channel: "Platform Top Banner",
      audience: "All Visitors & Guest Invites",
      status: "Delivered",
      deliveredRate: "100%",
      date: "10 Nov 2026, 11:30 PM"
    },
    {
      id: "BC-102",
      title: "Multi-Language 8 Regional Languages Support Live",
      channel: "WhatsApp Business API",
      audience: "All Couples",
      status: "Delivered",
      deliveredRate: "99.4%",
      date: "05 Nov 2026, 4:15 PM"
    }
  ]);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;

    const newEntry = {
      id: `BC-${Date.now().toString().slice(-3)}`,
      title: broadcastTitle,
      channel: broadcastChannel,
      audience: broadcastTarget,
      status: "Delivered",
      deliveredRate: "100%",
      date: "Just now"
    };

    setDispatchedHistory([newEntry, ...dispatchedHistory]);
    setBroadcastTitle("");
    setBroadcastBody("");
    alert("System Broadcast queued and dispatched via WhatsApp Meta Cloud API!");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Communications Gateway & Broadcasts
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-emerald-400">Meta Cloud API v19.0 Tier 3</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Communications Hub & System Announcements
          </h1>
          <p className="text-xs text-stone-400">
            Monitor WhatsApp API throughput, manage the global site announcement bar, and push broadcasts to wedding parties.
          </p>
        </div>
      </div>

      {/* WHATSAPP API TELEMETRY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-stone-400 font-medium">Daily WhatsApp Quota</span>
          <div className="text-2xl font-serif font-bold text-white">100,000 / day</div>
          <div className="text-[11px] text-emerald-400">Tier 3 Verified Business</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-stone-400 font-medium">Delivered Today</span>
          <div className="text-2xl font-serif font-bold text-[#E1CD98]">18,450</div>
          <div className="text-[11px] text-stone-400">RSVPs & guest passes</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-stone-400 font-medium">Delivery Success Rate</span>
          <div className="text-2xl font-serif font-bold text-emerald-400">99.8%</div>
          <div className="text-[11px] text-stone-400">0.2% invalid numbers</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-1.5">
          <span className="text-stone-400 font-medium">Average Latency</span>
          <div className="text-2xl font-serif font-bold text-white">420 ms</div>
          <div className="text-[11px] text-emerald-400">Instant OTP & RSVP</div>
        </div>
      </div>

      {/* GLOBAL WEBSITE ANNOUNCEMENT BAR CONTROLLER */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2D1B28]">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#C5A059]" />
              <h3 className="text-sm font-serif font-bold text-white">Website Top Announcement Banner</h3>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Renders a persistent notification bar at the very top of all marketing pages and public invitation routes.
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={bannerActive}
              onChange={e => setBannerActive(e.target.checked)}
              className="rounded accent-[#74182E] w-4 h-4"
            />
            <span>Banner Enabled</span>
          </label>
        </div>

        <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-400 mb-1 font-medium">Announcement Copy</label>
            <input
              type="text"
              value={announcementBanner}
              onChange={e => setAnnouncementBanner(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
            />
          </div>

          {/* Banner Live Preview */}
          <div className="space-y-1">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-bold">
              Live Preview:
            </span>
            <div className="p-2.5 rounded-xl bg-[#74182E] text-white text-xs text-center font-medium shadow-soft">
              {announcementBanner || "Banner text goes here..."}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {bannerSaved ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Banner published across site!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-semibold transition-colors shadow-soft"
            >
              Update Website Banner
            </button>
          </div>
        </form>
      </div>

      {/* DISPATCH NEW SYSTEM BROADCAST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broadcast Form */}
        <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
          <div className="pb-3 border-b border-[#2D1B28]">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-[#C5A059]" />
              <span>Broadcast to Registered Couples</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Dispatch an official platform update or notification via WhatsApp Business API or SMS.
            </p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Delivery Channel</label>
                <select
                  value={broadcastChannel}
                  onChange={e => setBroadcastChannel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white"
                >
                  <option value="WhatsApp">WhatsApp Cloud API</option>
                  <option value="SMS">High-Priority SMS Gateway</option>
                  <option value="Email">Platform Email Broadcast</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Target Audience</label>
                <select
                  value={broadcastTarget}
                  onChange={e => setBroadcastTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white"
                >
                  <option value="All Active Couples">All Active Couples (1,420)</option>
                  <option value="Luxury Concierge Only">Luxury Concierge Clients Only (128)</option>
                  <option value="Wedding Planners">Registered Planners (215)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Subject / Headline</label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={e => setBroadcastTitle(e.target.value)}
                placeholder="e.g. New Feature: Smart Guest Seating Charts"
                required
                className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-medium">Message Body</label>
              <textarea
                rows={3}
                value={broadcastBody}
                onChange={e => setBroadcastBody(e.target.value)}
                placeholder="Namaskar! We are delighted to announce that WeddingOS now includes intelligent table seating arrangements..."
                required
                className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#74182E] hover:bg-[#581223] text-white font-semibold shadow-soft flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Queue & Dispatch Broadcast</span>
            </button>
          </form>
        </div>

        {/* Broadcast History */}
        <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#74182E]" />
              <span>Recent Dispatched Broadcasts</span>
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">Archive</span>
          </div>

          <div className="space-y-3">
            {dispatchedHistory.map(b => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-[#211520] border border-[#2D1B28] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="font-serif font-bold text-white text-sm">{b.title}</div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {b.status} ({b.deliveredRate})
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>Channel: <strong className="text-stone-300">{b.channel}</strong></span>
                  <span>{b.date}</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Target: {b.audience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
