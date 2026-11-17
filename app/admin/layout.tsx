"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useWedding } from "@/context/WeddingContext";
import { Logo } from "@/components/brand/Logo";
import {
  LayoutDashboard,
  Heart,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  ShieldCheck,
  Search,
  Bell,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sparkles,
  Layers,
  ArrowUpRight,
  Sliders,
  Database,
  Radio,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { allWeddings, wedding, switchWedding } = useWedding();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Weddings Manager", href: "/admin/weddings", icon: Heart, badge: allWeddings.length.toString() },
    { name: "Templates Engine", href: "/admin/templates", icon: Layers, badge: "8" },
    { name: "Users & Accounts", href: "/admin/users", icon: Users, badge: "1.8k" },
    { name: "Subscriptions & GMV", href: "/admin/subscriptions", icon: CreditCard, badge: "₹84L" },
    { name: "Broadcasts & WhatsApp", href: "/admin/communications", icon: MessageSquare },
    { name: "Content & CMS", href: "/admin/content", icon: FileText },
    { name: "System & Audit Logs", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#110B10] text-[#E8DDCF] flex selection:bg-[#74182E] selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 flex-col justify-between bg-[#160E15] border-r border-[#2D1B28] shrink-0 h-screen sticky top-0">
        <div>
          {/* Admin Header with Platform Badge */}
          <div className="p-5 border-b border-[#2D1B28]">
            <div className="flex items-center justify-between">
              <Logo size="md" variant="light" />
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#74182E] text-white font-bold border border-[#91253E]">
                ADMIN
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#211520] border border-[#3A2234] text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-stone-300 font-medium truncate">Production v2.4 · Live</span>
              <span className="text-[10px] font-mono text-stone-500 ml-auto">18ms</span>
            </div>
          </div>

          {/* Quick Context Switcher */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-[#211520] border border-[#3A2234]">
            <div className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059] flex items-center justify-between">
              <span>Managed Wedding</span>
              <span className="text-[10px] text-stone-400 font-normal">{allWeddings.length} total</span>
            </div>
            <div className="font-serif font-bold text-sm text-white mt-1 truncate">
              {wedding.coupleNames}
            </div>
            <div className="text-[11px] text-stone-400 truncate">
              {wedding.city} · {wedding.weddingDate}
            </div>
            <div className="mt-2 pt-2 border-t border-[#3A2234] flex items-center justify-between text-[11px]">
              <Link
                href="/app"
                className="text-[#E1CD98] hover:underline flex items-center gap-1 font-medium"
              >
                Open Workspace <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link
                href={`/invite/${wedding.slug}`}
                target="_blank"
                className="text-stone-400 hover:text-white flex items-center gap-1"
              >
                Guest View <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#74182E] text-white shadow-soft font-semibold"
                      : "text-stone-300 hover:bg-[#211520] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#E1CD98]" : "text-stone-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#2A1B28] text-stone-300 border border-[#3A2234]"
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

        {/* Admin User Footer Profile */}
        <div className="p-4 border-t border-[#2D1B28] bg-[#160E15]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#74182E] text-[#E1CD98] flex items-center justify-center font-serif font-bold text-xs border border-[#91253E]">
                JS
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Javed Sayed</div>
                <div className="text-[10px] text-stone-400">Super Administrator</div>
              </div>
            </div>
            <Link
              href="/"
              title="Exit to Marketing Site"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#211520] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#160E15]/90 backdrop-blur-md border-b border-[#2D1B28] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#211520] border border-[#3A2234] text-stone-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#C5A059] font-semibold">WeddingOS Admin Console</span>
              <span className="text-stone-600">/</span>
              <span className="text-stone-300 font-medium capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Dashboard Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211520] hover:bg-[#2A1B28] border border-[#3A2234] text-xs font-medium text-stone-300 transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#74182E] hover:bg-[#581223] text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <span>Couple App</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E1CD98]" />
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#160E15] border-b border-[#2D1B28] p-4 space-y-2 animate-fade-in">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium ${
                    isActive ? "bg-[#74182E] text-white" : "text-stone-300 hover:bg-[#211520]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
