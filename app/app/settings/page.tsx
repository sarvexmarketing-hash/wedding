"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import { Role } from "@/lib/types";
import {
  Settings,
  ShieldCheck,
  Lock,
  Key,
  Users,
  MessageSquare,
  Check,
  AlertCircle,
  Copy
} from "lucide-react";

export default function SettingsAndRbacPage() {
  const { currentRole, setCurrentRole, wedding } = useWedding();
  const [apiKey, setApiKey] = useState("wos_live_sec_9934812834019283");
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("109384729103984");
  const [whatsappToken, setWhatsappToken] = useState("EAAGm0PX4ZCpsBA...");
  const [webhookUrl] = useState("https://api.weddingos.com/v1/webhooks/whatsapp");
  const [savedSettings, setSavedSettings] = useState(false);

  const rbacMatrix = [
    { module: "Dashboard Overview", couple: true, planner: true, caterer: true, transport: true, venue_staff: true },
    { module: "Guest CRM & Contact Details", couple: true, planner: true, caterer: false, transport: false, venue_staff: false },
    { module: "Food & Dietary Requirements", couple: true, planner: true, caterer: true, transport: false, venue_staff: false },
    { module: "Transportation & Arrivals", couple: true, planner: true, caterer: false, transport: true, venue_staff: false },
    { module: "Venue Gate Check-In & Tables", couple: true, planner: true, caterer: false, transport: false, venue_staff: true },
    { module: "Financials & Vendor Contracts", couple: true, planner: true, caterer: false, transport: false, venue_staff: false },
    { module: "AI Attendance Engine", couple: true, planner: true, caterer: false, transport: false, venue_staff: false },
  ];

  const handleSave = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Security & Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Settings & Role-Based Access (RBAC)
          </h1>
          <p className="text-xs text-[#7D597E]">
            Enforce strict data isolation and view limits so vendors and venue staff never see private personal guest data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> DPDP & ISO 27001 Security Hardened
          </span>
        </div>
      </div>

      {/* SECTION 22: ROLE-BASED ACCESS CONTROL MATRIX */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
          <div>
            <span className="text-xs uppercase font-bold text-[#74182E]">Permissions Grid</span>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Role-Based Access Control (RBAC)</h3>
          </div>
          <div className="text-xs text-stone-500">
            Active Simulator Role: <strong className="text-[#74182E] capitalize">{currentRole.replace("_", " ")}</strong>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#7D597E] uppercase text-[10px] tracking-wider font-semibold">
                <th className="p-3">Module / Capability</th>
                <th className="p-3 text-center">Couple / Family</th>
                <th className="p-3 text-center">Wedding Planner</th>
                <th className="p-3 text-center">Caterer</th>
                <th className="p-3 text-center">Transport Mgr</th>
                <th className="p-3 text-center">Venue Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCF]">
              {rbacMatrix.map(row => (
                <tr key={row.module} className="hover:bg-[#FAF7F2]/50">
                  <td className="p-3 font-semibold text-[#2D1B28]">{row.module}</td>
                  <td className="p-3 text-center">
                    {row.couple ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.planner ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.caterer ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.transport ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.venue_staff ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-stone-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 31: WHATSAPP BUSINESS API INTEGRATION & WEBHOOKS */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
          <div>
            <span className="text-xs uppercase font-bold text-[#74182E]">Official Meta Cloud API</span>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">WhatsApp Business API Configuration</h3>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
            Provider Architecture Active
          </span>
        </div>

        <p className="text-xs text-[#7D597E] leading-relaxed">
          WeddingOS uses an isolated provider interface abstraction so you can plug in official WhatsApp Business API credentials (Meta Cloud API, Twilio, or Gupshup) for high-throughput Indian wedding RSVP broadcasts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">WhatsApp Phone Number ID</label>
            <input
              type="text"
              value={whatsappPhoneId}
              onChange={e => setWhatsappPhoneId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] font-mono text-xs focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Permanent Meta Access Token</label>
            <input
              type="password"
              value={whatsappToken}
              onChange={e => setWhatsappToken(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] font-mono text-xs focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-600 font-semibold mb-1">Inbound Webhook URL (For RSVP responses)</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] font-mono text-xs text-stone-600"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(webhookUrl);
                  alert("Webhook URL copied to clipboard!");
                }}
                className="px-3 py-2 rounded-xl border border-[#E8DDCF] bg-white text-xs font-semibold text-[#74182E]"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E8DDCF]">
          <span className="text-xs text-stone-500">
            {savedSettings ? "✓ Configuration saved" : "Changes take effect immediately"}
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft"
          >
            Save Security & API Settings
          </button>
        </div>
      </div>
    </div>
  );
}
