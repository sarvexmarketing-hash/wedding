"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Phone,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  KeyRound,
  Ban
} from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const initialUsers = [
    {
      id: "usr-01",
      name: "Javed Sayed",
      email: "javed@weddingos.com",
      phone: "+91 98200 11223",
      role: "Super Admin",
      wedding: "All Platform Workspaces",
      status: "Active",
      lastLogin: "Just now",
      plan: "Internal Staff"
    },
    {
      id: "usr-02",
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91 98201 12345",
      role: "Couple Admin",
      wedding: "Rahul & Priya",
      status: "Active",
      lastLogin: "18 mins ago",
      plan: "Premium Plan"
    },
    {
      id: "usr-03",
      name: "Vagdevi Rao",
      email: "vagdevi.rao@outlook.com",
      phone: "+91 98490 88765",
      role: "Couple Admin",
      wedding: "vagdevi & ratna",
      status: "Active",
      lastLogin: "2 hours ago",
      plan: "Premium Plan"
    },
    {
      id: "usr-04",
      name: "Vikramaditya Oberoi",
      email: "vikram@shaadiproductions.in",
      phone: "+91 98110 33445",
      role: "Wedding Planner",
      wedding: "14 Luxury Destination Occasions",
      status: "Verified Agency",
      lastLogin: "5 hours ago",
      plan: "Planner Agency Suite"
    },
    {
      id: "usr-05",
      name: "Chef Sanjeev Nizami",
      email: "banquets@tajfalaknuma.com",
      phone: "+91 94400 99881",
      role: "Vendor (Caterer)",
      wedding: "Rahul & Priya (Taj Falaknuma)",
      status: "Active",
      lastLogin: "Yesterday",
      plan: "Vendor Access"
    },
    {
      id: "usr-06",
      name: "Aarav Mehra",
      email: "aarav.mehra@techcorp.com",
      phone: "+91 97170 55432",
      role: "Couple Admin",
      wedding: "Aarav & Meera",
      status: "Active",
      lastLogin: "2 days ago",
      plan: "Luxury Concierge"
    },
    {
      id: "usr-07",
      name: "Kabir Malhotra",
      email: "kabir.m@rediffmail.com",
      phone: "+91 98210 77665",
      role: "Couple Admin",
      wedding: "Kabir & Ananya",
      status: "Active",
      lastLogin: "3 days ago",
      plan: "Luxury Concierge"
    }
  ];

  const [usersList, setUsersList] = useState(initialUsers);

  const filteredUsers = usersList.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.wedding.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" || u.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  const handleResetPassword = (name: string) => {
    alert(`Secure password reset link generated and dispatched to ${name}'s verified email.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Identity & Access Management (RBAC)
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-stone-400">1,842 Registered Accounts</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            User Accounts, Roles & Permissions
          </h1>
          <p className="text-xs text-stone-400">
            Control couple accounts, agency planners, banquet caterers, and platform super administrators.
          </p>
        </div>
      </div>

      {/* Role Breakdown Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-[#160E15] border border-[#2D1B28]">
          <div className="text-stone-400 font-medium">Couples & Families</div>
          <div className="text-xl font-serif font-bold text-white mt-1">1,420</div>
          <div className="text-[11px] text-stone-500">Account Owners</div>
        </div>
        <div className="p-4 rounded-xl bg-[#160E15] border border-[#2D1B28]">
          <div className="text-stone-400 font-medium">Wedding Planners</div>
          <div className="text-xl font-serif font-bold text-[#E1CD98] mt-1">215</div>
          <div className="text-[11px] text-stone-500">Multi-wedding access</div>
        </div>
        <div className="p-4 rounded-xl bg-[#160E15] border border-[#2D1B28]">
          <div className="text-stone-400 font-medium">Banquet & Staff</div>
          <div className="text-xl font-serif font-bold text-stone-300 mt-1">540</div>
          <div className="text-[11px] text-stone-500">QR Check-in & Catering</div>
        </div>
        <div className="p-4 rounded-xl bg-[#160E15] border border-[#2D1B28]">
          <div className="text-stone-400 font-medium">Super Admins</div>
          <div className="text-xl font-serif font-bold text-[#74182E] text-white mt-1">4</div>
          <div className="text-[11px] text-emerald-400">Full Root Privileges</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#160E15] border border-[#2D1B28] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or wedding workspace..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#211520] border border-[#3A2234] text-white placeholder:text-stone-500 focus:outline-none focus:border-[#74182E]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#211520] border border-[#3A2234] text-stone-300 focus:outline-none text-xs"
          >
            <option value="all">All Roles</option>
            <option value="Couple Admin">Couples Only</option>
            <option value="Planner">Planners Only</option>
            <option value="Vendor">Vendors & Caterers</option>
            <option value="Super Admin">Admins Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#160E15] rounded-2xl border border-[#2D1B28] overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#211520]/80 border-b border-[#2D1B28] text-stone-400">
                <th className="py-3 px-4 font-semibold">User Profile</th>
                <th className="py-3 px-4 font-semibold">Assigned Role</th>
                <th className="py-3 px-4 font-semibold">Associated Wedding</th>
                <th className="py-3 px-4 font-semibold">Plan Tier</th>
                <th className="py-3 px-4 font-semibold">Last Active</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211520]">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-[#211520]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#211520] border border-[#3A2234] flex items-center justify-center font-bold text-xs text-[#E1CD98] shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-stone-400 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.role === "Super Admin"
                          ? "bg-[#74182E] text-white border border-[#91253E]"
                          : u.role === "Wedding Planner"
                          ? "bg-[#C5A059]/20 text-[#E1CD98] border border-[#C5A059]/40"
                          : u.role === "Vendor (Caterer)"
                          ? "bg-purple-950 text-purple-300 border border-purple-800"
                          : "bg-[#211520] text-stone-300 border border-[#3A2234]"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-stone-300 font-medium">
                    {u.wedding}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[11px] text-stone-400 font-medium">{u.plan}</span>
                  </td>

                  <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                    {u.lastLogin}
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleResetPassword(u.name)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#211520] hover:bg-[#2A1B28] text-stone-300 text-[11px] font-medium border border-[#3A2234] inline-flex items-center gap-1"
                      title="Generate password reset link"
                    >
                      <KeyRound className="w-3 h-3 text-[#C5A059]" />
                      <span>Reset Key</span>
                    </button>
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
