"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useWedding } from "@/context/WeddingContext";
import {
  LayoutDashboard,
  Users,
  Home,
  Calendar,
  Sparkles,
  MessageSquare,
  Truck,
  Briefcase,
  QrCode,
  BrainCircuit,
  Settings,
  Heart,
  Layers,
  ChevronRight,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Video,
  Shirt,
  Gift,
  BellRing,
  Crown
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { currentRole, wedding, allWeddings, switchWedding } = useWedding();

  const navigationItems = [
    { name: "Overview", href: "/app", icon: LayoutDashboard, badge: null, roles: ["couple", "planner", "caterer", "transport", "venue_staff"] },
    { name: "Guests CRM", href: "/app/guests", icon: Users, badge: "800", roles: ["couple", "planner"] },
    { name: "AI Invitation Video", href: "/app/ai-video", icon: Video, badge: "Smart", roles: ["couple", "planner"] },
    { name: "Smart Attire Guide", href: "/app/attire", icon: Shirt, badge: "Style", roles: ["couple", "planner"] },
    { name: "Gift Tracking", href: "/app/gifts", icon: Gift, badge: "₹18.5L", roles: ["couple", "planner"] },
    { name: "Smart Reminders", href: "/app/reminders", icon: BellRing, badge: "Auto", roles: ["couple", "planner"] },
    { name: "Families", href: "/app/families", icon: Home, badge: "162", roles: ["couple", "planner"] },
    { name: "Events Timeline", href: "/app/events", icon: Calendar, badge: "5", roles: ["couple", "planner"] },
    { name: "Invitations", href: "/app/invitations", icon: Sparkles, badge: null, roles: ["couple", "planner"] },
    { name: "Communication", href: "/app/communications", icon: MessageSquare, badge: null, roles: ["couple", "planner"] },
    { name: "Logistics", href: "/app/logistics", icon: Truck, badge: null, roles: ["couple", "planner", "transport"] },
    { name: "Vendors & Food", href: "/app/vendors", icon: Briefcase, badge: null, roles: ["couple", "planner", "caterer"] },
    { name: "Live Check-in", href: "/app/check-in", icon: QrCode, badge: "Live", roles: ["couple", "planner", "venue_staff"] },
    { name: "AI Insights", href: "/app/insights", icon: BrainCircuit, badge: "AI", roles: ["couple", "planner"] },
    { name: "Wedding Plans", href: "/app/subscription", icon: Crown, badge: "Plans", roles: ["couple", "planner"] },
    { name: "Planner Portal", href: "/app/planner", icon: Layers, badge: "12", roles: ["couple", "planner"] },
    { name: "Settings & RBAC", href: "/app/settings", icon: Settings, badge: null, roles: ["couple", "planner"] },
  ];

  // Filter items based on current active role RBAC
  const visibleItems = navigationItems.filter(item =>
    item.roles.includes(currentRole)
  );

  return (
    <aside className="w-64 bg-[#FAF7F2] border-r border-[#E8DDCF] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#E8DDCF] flex items-center justify-between">
          <Logo size="md" />
        </div>

        {/* Current Wedding Selector Card */}
        <div className="p-3 mx-3 my-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#74182E]">Active Wedding</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {allWeddings && allWeddings.length > 1 ? (
            <select
              value={wedding.id}
              onChange={e => switchWedding(e.target.value)}
              className="w-full mt-1.5 p-1 rounded-lg border border-[#E8DDCF] bg-[#FAF7F2] font-serif font-bold text-xs text-[#2D1B28] focus:outline-none focus:border-[#74182E] cursor-pointer"
            >
              {allWeddings.map(w => (
                <option key={w.id} value={w.id}>
                  {w.coupleNames} ({w.city})
                </option>
              ))}
            </select>
          ) : (
            <div className="font-serif font-bold text-sm text-[#2D1B28] mt-1 truncate">
              {wedding.coupleNames}
            </div>
          )}

          <div className="text-[11px] text-[#7D597E] truncate mt-1">
            {wedding.city} · {wedding.weddingDate}
          </div>
          <div className="mt-2 pt-2 border-t border-[#FAF7F2] flex items-center justify-between text-[10px]">
            <Link
              href={`/invite/${wedding.slug}`}
              target="_blank"
              className="text-[#74182E] font-medium hover:underline flex items-center gap-1"
            >
              Guest Invite <ExternalLink className="w-2.5 h-2.5" />
            </Link>
            <Link
              href="/app/wedding"
              className="text-stone-500 hover:text-stone-800"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {visibleItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#74182E] text-white shadow-soft font-semibold"
                    : "text-[#4D334E] hover:bg-[#F3ECE1] hover:text-[#2D1B28]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#E1CD98]" : "text-[#7D597E]"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.badge === "Live"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.badge === "AI"
                        ? "bg-[#C5A059]/20 text-[#8D6B33]"
                        : "bg-[#E8DDCF] text-[#4D334E]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Indicator & Footer */}
      <div className="p-4 border-t border-[#E8DDCF] bg-[#FAF7F2]">
        <div className="p-2.5 bg-white rounded-xl border border-[#E8DDCF] mb-3">
          <div className="text-[10px] uppercase font-bold text-[#7D597E] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#C5A059]" /> RBAC Mode
          </div>
          <div className="text-xs font-semibold text-[#2D1B28] capitalize mt-0.5">
            {currentRole.replace("_", " ")}
          </div>
          <p className="text-[10px] text-[#7D597E] mt-0.5">
            Switch roles in top bar to test permissions.
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#74182E] hover:underline"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Admin Portal</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#7D597E] hover:text-[#74182E] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit
          </Link>
        </div>
      </div>
    </aside>
  );
}
