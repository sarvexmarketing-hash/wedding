"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { GooeyNav } from "@/components/ui/GooeyNav";
import { ChevronDown, Menu, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Live Demo", href: "/invite/rahul-priya" }
  ];

  const getActiveIndex = () => {
    if (pathname?.startsWith("/features")) return 1;
    if (pathname === "/pricing") return 2;
    if (pathname?.startsWith("/invite")) return 3;
    return 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DDCF]/80 shadow-soft-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Logo size="md" />

          {/* Center: Desktop GooeyNav aligned to ivory background */}
          <div className="hidden md:flex items-center">
            <GooeyNav
              items={navItems}
              activeIndex={getActiveIndex()}
              theme="light"
              color="#74182E"
              activeTextColor="#FFFFFF"
              colors={["#C5A059", "#74182E", "#D4AF37", "#8B1B36"]}
              size="sm"
              frame={true}
              particleCount={15}
              spread={52}
              animationTime={600}
              timeVariance={300}
              gooeyness={0.5}
              wobble={0.5}
              hoverEffect={true}
            />
          </div>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[#4D334E] hover:text-[#74182E] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#74182E] text-white text-sm font-medium shadow-soft hover:bg-[#581223] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Create Your Wedding</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/app"
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#74182E] text-white"
            >
              Demo App
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2D1B28] hover:bg-[#F3ECE1] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#E8DDCF] px-4 pt-4 pb-6 space-y-3 animate-fade-in shadow-soft-lg">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E8DDCF]">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#FAF7F2] rounded-xl text-center text-sm font-semibold text-[#74182E]"
            >
              Launch App
            </Link>
            <Link
              href="/invite/rahul-priya"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#FAF7F2] rounded-xl text-center text-sm font-semibold text-[#C5A059]"
            >
              Live RSVP Demo
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              href="/product"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              Product
            </Link>
            <Link
              href="/solutions/couples"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              For Couples & Families
            </Link>
            <Link
              href="/solutions/planners"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              For Wedding Planners
            </Link>
            <Link
              href="/features/rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              RSVP Engine & Food Intel
            </Link>
            <Link
              href="/features/ai-insights"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              AI Attendance Insights
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              About WeddingOS
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2D1B28] hover:bg-[#FAF7F2]"
            >
              Contact Sales
            </Link>
          </div>

          <div className="pt-3 border-t border-[#E8DDCF] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full border border-[#E8DDCF] text-sm font-medium text-[#2D1B28]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#74182E] text-white text-sm font-medium"
            >
              Create Your Wedding Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
