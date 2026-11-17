"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { Role } from "@/lib/types";
import {
  Bell,
  Plus,
  ExternalLink,
  ChevronDown,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  QrCode
} from "lucide-react";

export function AppHeader({ onOpenAddGuest }: { onOpenAddGuest?: () => void }) {
  const { wedding, currentRole, setCurrentRole } = useWedding();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleSelectOpen, setRoleSelectOpen] = useState(false);

  const rolesList: { id: Role; label: string; desc: string }[] = [
    { id: "couple", label: "Couple & Family (Full Access)", desc: "Complete control of all occasion details" },
    { id: "planner", label: "Occasion Planner", desc: "Guests, events, vendors, logistics & operations" },
    { id: "caterer", label: "Catering Head", desc: "Food counts, Jain/Veg/Non-veg splits only" },
    { id: "transport", label: "Transport Manager", desc: "Arrivals, flight pickups, vehicle dispatch" },
    { id: "venue_staff", label: "Venue Gate Staff", desc: "QR check-in & seating table information" },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E8DDCF] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-soft-sm">
      {/* Left: Wedding Name & Live Status */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-base sm:text-lg text-[#2D1B28]">
              {wedding.coupleNames}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live RSVP Active
            </span>
          </div>
          <p className="text-[11px] text-[#7D597E] hidden sm:block">
            {wedding.weddingDate} · {wedding.primaryVenue}
          </p>
        </div>
      </div>

      {/* Right: Role Switcher, Notifications, Quick Actions, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher (RBAC Showcase) */}
        <div className="relative">
          <button
            onClick={() => setRoleSelectOpen(!roleSelectOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] text-xs font-semibold text-[#2D1B28] hover:bg-[#F3ECE1] transition-colors"
          >
            <span className="text-[10px] uppercase font-bold text-[#74182E]">Role:</span>
            <span className="capitalize">{currentRole.replace("_", " ")}</span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
          </button>

          {roleSelectOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl p-2 border border-[#E8DDCF] shadow-soft-lg z-50 animate-fade-in">
              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7D597E] border-b border-[#E8DDCF] mb-1">
                Role-Based Access Control (RBAC)
              </div>
              <div className="space-y-1">
                {rolesList.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setRoleSelectOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex flex-col ${
                      currentRole === r.id
                        ? "bg-[#FAF7F2] text-[#74182E] font-semibold border border-[#74182E]/20"
                        : "text-[#4D334E] hover:bg-stone-50"
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-[#4D334E] hover:bg-[#FAF7F2] border border-[#E8DDCF] relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#CE3B61]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-2xl p-3 border border-[#E8DDCF] shadow-soft-lg z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DDCF]">
                <span className="text-xs font-bold text-[#2D1B28]">Today&apos;s Attention Alerts</span>
                <span className="text-[10px] bg-[#FAF7F2] px-2 py-0.5 rounded-full text-[#74182E] font-semibold">4 New</span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-900 border border-amber-200">
                  <div className="font-semibold">183 guests pending RSVP</div>
                  <div className="text-[11px] text-amber-700">Follow-up reminder batch scheduled for today.</div>
                </div>
                <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#2D1B28] border border-[#E8DDCF]">
                  <div className="font-semibold">8 Jain meals requested</div>
                  <div className="text-[11px] text-[#7D597E]">Mehta Family dietary requirement logged.</div>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-900 border border-emerald-200">
                  <div className="font-semibold">17 guests updated responses</div>
                  <div className="text-[11px] text-emerald-700">Meera Reddy confirmed plus-one.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guest Invite preview link */}
        <Link
          href="/invite/rahul-priya"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDCF] text-xs font-semibold text-[#4D334E] hover:bg-[#FAF7F2] transition-colors"
        >
          <span>Guest View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Quick Add Guest button */}
        {onOpenAddGuest && (
          <button
            onClick={onOpenAddGuest}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors shadow-soft"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Guest</span>
          </button>
        )}

        {/* User Monogram / Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#74182E]/10 border border-[#C5A059] flex items-center justify-center text-xs font-serif font-bold text-[#74182E]">
          RP
        </div>
      </div>
    </header>
  );
}
