"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  BellRing,
  QrCode,
  Calendar,
  Utensils,
  Share2,
  MessageSquare,
  FileSpreadsheet,
  ChevronRight,
  Zap,
  Gift,
  Video,
  Shirt,
  Plus
} from "lucide-react";
import { AddGuestModal } from "@/components/app/AddGuestModal";

export default function OverviewDashboardPage() {
  const { wedding, events, guests, gifts, currentRole, sendCampaignMessage } = useWedding();
  const [reminderSent, setReminderSent] = useState(false);
  const [addGuestModalOpen, setAddGuestModalOpen] = useState(false);

  // Live countdown state to next event (Mehendi)
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 4,
    minutes: 28,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalGiftsValue = gifts.reduce((acc, g) => acc + (g.amount || 0), 0);

  const handleQuickReminder = () => {
    sendCampaignMessage("cmp-2");
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wedding Headline & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#74182E]">
              Wedding Command Center
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-[#7D597E]">{wedding.city}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            {wedding.coupleNames}
          </h1>
          <p className="text-xs text-[#7D597E] mt-0.5">
            {wedding.weddingDate} · {wedding.primaryVenue}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/ai-video"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <Video className="w-3.5 h-3.5 text-[#74182E]" /> AI Video
          </Link>
          <Link
            href="/app/check-in"
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <QrCode className="w-3.5 h-3.5 text-[#E1CD98]" /> Live Check-In
          </Link>
          <button
            onClick={handleQuickReminder}
            className="px-4 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#74182E]" />
            <span>{reminderSent ? "Reminder Sent!" : "Nudge 183 Pending"}</span>
          </button>
          <Link
            href={`/invite/${wedding.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-[#C5A059] text-[#1A1017] text-xs font-bold hover:bg-[#D4AF37] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Guest Invite
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS BUTTONS BAR (Section 11) */}
      <div className="p-4 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[10px] uppercase font-bold text-[#7D597E] tracking-wider">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/invitations"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#74182E]" /> Create Invitation
          </Link>
          <Link
            href="/app/ai-video"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Video className="w-3 h-3 text-[#C5A059]" /> Generate AI Video
          </Link>
          <button
            onClick={() => setAddGuestModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Plus className="w-3 h-3 text-[#74182E]" /> Add Guest
          </button>
          <Link
            href="/app/events"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Calendar className="w-3 h-3 text-[#74182E]" /> Add Event
          </Link>
          <Link
            href="/app/reminders"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <BellRing className="w-3 h-3 text-[#C5A059]" /> Send Reminders
          </Link>
          <Link
            href="/app/guests"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Users className="w-3 h-3 text-[#74182E]" /> View RSVPs
          </Link>
          <Link
            href="/app/gifts"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Gift className="w-3 h-3 text-[#74182E]" /> Track Gifts
          </Link>
          <Link
            href="/app/attire"
            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] text-[#4D334E] font-medium flex items-center gap-1.5"
          >
            <Shirt className="w-3 h-3 text-[#C5A059]" /> Dress Codes
          </Link>
        </div>
      </div>

      {/* OVERVIEW METRICS (Including Gifts & Pending) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Total Invited */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDCF] shadow-soft">
          <div className="flex items-center justify-between text-xs text-[#7D597E]">
            <span className="font-semibold">Total Invited</span>
            <Users className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            {wedding.totalInvited}
          </div>
          <div className="text-[11px] text-[#7D597E] mt-1">
            162 family groups
          </div>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-soft">
          <div className="flex items-center justify-between text-xs text-emerald-800">
            <span className="font-semibold">Confirmed RSVPs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-900 mt-1">
            {wedding.confirmedCount}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Attending
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-soft">
          <div className="flex items-center justify-between text-xs text-amber-800">
            <span className="font-semibold">Pending RSVPs</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 mt-1">
            {wedding.pendingCount}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">
            42 families pending
          </div>
        </div>

        {/* Gifts Total */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#C5A059]/60 shadow-soft">
          <div className="flex items-center justify-between text-xs text-[#74182E]">
            <span className="font-semibold">Wedding Gifts</span>
            <Gift className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#74182E] mt-1">
            ₹{(totalGiftsValue / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-[#7D597E] mt-1">
            {gifts.length} gifts recorded
          </div>
        </div>

        {/* Total Events */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DDCF] shadow-soft">
          <div className="flex items-center justify-between text-xs text-[#7D597E]">
            <span className="font-semibold">Ceremonies</span>
            <Calendar className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            {events.length}
          </div>
          <div className="text-[11px] text-[#7D597E] mt-1">
            Over 5 royal days
          </div>
        </div>
      </div>

      {/* UPCOMING NEXT EVENT WITH LIVE COUNTDOWN (Section 11) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#74182E] to-[#4A0E1C] text-white shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E1CD98] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Next Upcoming Ceremony
            </span>
            <span className="text-xs text-stone-300">Taj Falaknuma Lawns</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {events[0]?.title || "Vibrant Mehendi & High Tea"}
          </h2>
          <p className="text-xs text-[#EAE2D5]">
            {events[0]?.date} at {events[0]?.time} · Dress Code: <strong className="text-[#E1CD98]">{events[0]?.dressCode}</strong>
          </p>
        </div>

        {/* Live Countdown Box */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/20 min-w-[56px]">
            <div className="text-2xl font-serif font-bold text-white">{timeLeft.days}</div>
            <div className="text-[9px] uppercase tracking-wider text-[#E1CD98]">Days</div>
          </div>
          <span className="text-xl font-bold text-[#E1CD98]">:</span>
          <div className="bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/20 min-w-[56px]">
            <div className="text-2xl font-serif font-bold text-white">{timeLeft.hours}</div>
            <div className="text-[9px] uppercase tracking-wider text-[#E1CD98]">Hours</div>
          </div>
          <span className="text-xl font-bold text-[#E1CD98]">:</span>
          <div className="bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/20 min-w-[56px]">
            <div className="text-2xl font-serif font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-[9px] uppercase tracking-wider text-[#E1CD98]">Mins</div>
          </div>
          <span className="text-xl font-bold text-[#E1CD98]">:</span>
          <div className="bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/20 min-w-[56px]">
            <div className="text-2xl font-serif font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-[9px] uppercase tracking-wider text-[#E1CD98]">Secs</div>
          </div>
        </div>
      </div>

      {/* RSVP COMPLETION RING & TODAY'S ATTENTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RSVP Completion Ring (5 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E8DDCF] shadow-soft flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#74182E] mb-1">
              Response Progress
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">RSVP Completion</h3>
            <p className="text-xs text-[#7D597E] mt-0.5">
              Targeting 85%+ completion prior to catering lock date.
            </p>
          </div>

          <div className="py-6 flex items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#FAF7F2]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#74182E]"
                  strokeDasharray={`${wedding.rsvpCompletionPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-serif font-bold text-[#2D1B28]">
                  {wedding.rsvpCompletionPercentage}%
                </span>
                <span className="text-[10px] text-[#7D597E] uppercase tracking-wider">Completed</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between text-xs text-[#7D597E]">
            <span>617 / 800 Responses</span>
            <Link href="/app/guests" className="text-[#74182E] font-semibold hover:underline">
              View Breakdown →
            </Link>
          </div>
        </div>

        {/* Today's Attention (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#74182E] flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-[#C5A059]" /> Operational Alerts
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Today&apos;s Attention</h3>
            </div>
            <span className="text-xs text-[#7D597E]">Live sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] hover:border-[#74182E]/40 transition-colors">
              <div className="text-xs text-[#7D597E]">Unconfirmed Contacts</div>
              <div className="text-xl font-serif font-bold text-[#2D1B28] mt-1">
                183 guests haven&apos;t responded
              </div>
              <p className="text-[11px] text-[#7D597E] mt-1">
                Automated WhatsApp reminder batch ready for delivery.
              </p>
              <button
                onClick={handleQuickReminder}
                className="mt-2 text-xs font-semibold text-[#74182E] hover:underline"
              >
                Send WhatsApp Batch →
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] hover:border-[#74182E]/40 transition-colors">
              <div className="text-xs text-[#7D597E]">Family Headcount Status</div>
              <div className="text-xl font-serif font-bold text-[#2D1B28] mt-1">
                42 families pending RSVP
              </div>
              <p className="text-[11px] text-[#7D597E] mt-1">
                Including Kapoor Family (3 pax) awaiting London flight confirmation.
              </p>
              <Link href="/app/families" className="mt-2 inline-block text-xs font-semibold text-[#74182E] hover:underline">
                View Family List →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] hover:border-[#74182E]/40 transition-colors">
              <div className="text-xs text-[#7D597E]">Live RSVP Adjustments</div>
              <div className="text-xl font-serif font-bold text-[#2D1B28] mt-1">
                17 guests changed response
              </div>
              <p className="text-[11px] text-[#7D597E] mt-1">
                Dietary and seat assignments automatically refreshed.
              </p>
              <Link href="/app/guests" className="mt-2 inline-block text-xs font-semibold text-[#74182E] hover:underline">
                Review Audit Log →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] hover:border-[#74182E]/40 transition-colors">
              <div className="text-xs text-[#7D597E]">Special Catering Requirement</div>
              <div className="text-xl font-serif font-bold text-[#2D1B28] mt-1">
                8 Jain meals requested
              </div>
              <p className="text-[11px] text-[#7D597E] mt-1">
                Isolated kitchen station instructions dispatched to Royal Nizami Caterers.
              </p>
              <Link href="/app/vendors" className="mt-2 inline-block text-xs font-semibold text-[#74182E] hover:underline">
                View Catering Sheet →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MULTI-EVENT CHRONOLOGICAL TIMELINE CARDS ROW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">Schedule & Headcounts</span>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Ceremony Operations Timeline</h3>
          </div>
          <Link href="/app/events" className="text-xs font-semibold text-[#74182E] hover:underline flex items-center gap-1">
            Manage All Events <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {events.map((evt, idx) => (
            <div
              key={evt.id}
              className="bg-white p-4 rounded-2xl border border-[#E8DDCF] shadow-soft-sm hover:border-[#C5A059] transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#74182E] bg-[#74182E]/10 px-2 py-0.5 rounded-md">
                  #{idx + 1} {evt.name}
                </span>
                <span className="text-[10px] text-[#7D597E]">{evt.date.split(" ")[0]} {evt.date.split(" ")[1]}</span>
              </div>
              <div className="font-serif font-bold text-sm text-[#2D1B28] truncate">{evt.title}</div>
              <div className="text-xs text-[#7D597E]">{evt.time}</div>
              
              <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                <span className="text-[#7D597E]">Confirmed:</span>
                <span className="font-bold text-[#2D1B28]">{evt.confirmedCount} / {evt.capacity}</span>
              </div>
              
              <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#74182E] h-full"
                  style={{ width: `${Math.min(100, Math.round((evt.confirmedCount / evt.capacity) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddGuestModal isOpen={addGuestModalOpen} onClose={() => setAddGuestModalOpen(false)} />
    </div>
  );
}
