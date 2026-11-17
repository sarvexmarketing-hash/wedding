import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ShieldCheck, Lock, Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#21111E] text-[#EAE2D5] pt-16 pb-12 border-t border-[#3D2735]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D2735]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="light" />
            <p className="text-sm text-[#B89EB8] max-w-sm leading-relaxed">
              WeddingOS is the all-in-one Guest Management & Operations Platform for Indian occasions.
              Run your occasion like a system, not a spreadsheet.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#E1CD98]">
              <span className="flex items-center gap-1.5 bg-[#380714] px-2.5 py-1 rounded-full border border-[#74182E]">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 & DPDP Act Aligned
              </span>
              <span className="flex items-center gap-1.5 bg-[#380714] px-2.5 py-1 rounded-full border border-[#74182E]">
                <Lock className="w-3.5 h-3.5" /> End-to-End Privacy
              </span>
            </div>
          </div>

          {/* Col 2: Product & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">Product Features</h4>
            <ul className="space-y-2 text-sm text-[#D6C4D6]">
              <li><Link href="/features/invitations" className="hover:text-white transition-colors">Digital Invitations</Link></li>
              <li><Link href="/features/rsvp" className="hover:text-white transition-colors">RSVP Engine</Link></li>
              <li><Link href="/features/guest-management" className="hover:text-white transition-colors">Guest CRM & Families</Link></li>
              <li><Link href="/features/events" className="hover:text-white transition-colors">Multi-Event Planning</Link></li>
              <li><Link href="/features/catering" className="hover:text-white transition-colors">Catering Intelligence</Link></li>
              <li><Link href="/features/ai-insights" className="hover:text-white transition-colors">AI Attendance Forecast</Link></li>
              <li><Link href="/features/check-in" className="hover:text-white transition-colors">Day-of QR Check-In</Link></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">Solutions</h4>
            <ul className="space-y-2 text-sm text-[#D6C4D6]">
              <li><Link href="/solutions/couples" className="hover:text-white transition-colors">For Couples & Families</Link></li>
              <li><Link href="/solutions/planners" className="hover:text-white transition-colors">For Luxury Planners</Link></li>
              <li><Link href="/solutions/guests" className="hover:text-white transition-colors">For Guests (No App)</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/invite/rahul-priya" className="hover:text-white transition-colors">Interactive Guest Demo</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Couple Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 4: Company & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">Company</h4>
            <ul className="space-y-2 text-sm text-[#D6C4D6]">
              <li><Link href="/about" className="hover:text-white transition-colors">About WeddingOS</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Demo Booking</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Client Portal Log In</Link></li>
              <li><Link href="/admin" className="text-[#E1CD98] hover:underline transition-colors flex items-center gap-1">Admin Portal →</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Create Free Occasion</Link></li>
              <li><span className="text-xs text-[#987599]">Designed for Delhi, Mumbai, Hyderabad, Udaipur & Global Destinations</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#987599] gap-4">
          <p>© {new Date().getFullYear()} WeddingOS Inc. Run Your Occasion Like a System, Not a Spreadsheet.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Guarantee</span>
            <span className="flex items-center gap-1 text-[#E1CD98]">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#CE3B61] fill-current" /> for Indian Occasions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
