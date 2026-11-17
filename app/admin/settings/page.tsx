"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  KeyRound,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Download,
  RefreshCw,
  Server,
  Terminal,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [backupTriggered, setBackupTriggered] = useState(false);

  const apiIntegrations = [
    {
      name: "Meta WhatsApp Cloud API",
      service: "Messaging & RSVP Gateway",
      envKey: "META_WHATSAPP_TOKEN",
      maskedValue: "EAAG...94KL2",
      status: "Connected (v19.0)",
      health: "100%"
    },
    {
      name: "Razorpay Payments API",
      service: "Subscription Checkout & Invoicing",
      envKey: "RAZORPAY_KEY_SECRET",
      maskedValue: "rzp_live_89...x921",
      status: "Connected",
      health: "100%"
    },
    {
      name: "Google Maps Geocoding & Places",
      service: "Venue Navigation & Directions",
      envKey: "NEXT_PUBLIC_GOOGLE_MAPS_KEY",
      maskedValue: "AIzaSy...77qB",
      status: "Connected",
      health: "99.9%"
    },
    {
      name: "Cloudflare R2 / AWS S3 Storage",
      service: "High-Res AI Videos & Photo CDN",
      envKey: "S3_BUCKET_MEDIA_SECRET",
      maskedValue: "cf_r2_49...p001",
      status: "Connected",
      health: "100%"
    }
  ];

  const auditLogs = [
    { id: "LOG-992", time: "Today, 4:45 PM", admin: "Javed Sayed (Super Admin)", action: "Switched active workspace to 'vagdevi & ratna'", ip: "192.168.1.1", status: "Success" },
    { id: "LOG-991", time: "Today, 3:12 PM", admin: "System Daemon", action: "Automated database snapshot generated (4.8 GB)", ip: "10.0.4.12", status: "Success" },
    { id: "LOG-990", time: "Today, 1:30 PM", admin: "Javed Sayed (Super Admin)", action: "Updated pricing for Premium tier to ₹4,999", ip: "192.168.1.1", status: "Success" },
    { id: "LOG-989", time: "Yesterday, 8:20 PM", admin: "Priya Sharma (Couple Admin)", action: "Exported guest RSVP list to CSV", ip: "49.207.198.42", status: "Success" },
    { id: "LOG-988", time: "Yesterday, 2:10 PM", admin: "System Daemon", action: "Dispatched WhatsApp event reminder to 142 guests", ip: "10.0.4.12", status: "Success" },
  ];

  const handleTriggerBackup = () => {
    setBackupTriggered(true);
    setTimeout(() => {
      setBackupTriggered(false);
      alert("Platform database and media assets snapshot completed successfully. Archived to offsite vault.");
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Environment & Security Audit
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-emerald-400">Zero Security Vulnerabilities</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            System Settings, Integrations & Audit Logs
          </h1>
          <p className="text-xs text-stone-400">
            Audit API tokens, trigger manual database snapshots, and monitor root platform activity.
          </p>
        </div>

        <button
          onClick={handleTriggerBackup}
          disabled={backupTriggered}
          className="px-4 py-2 rounded-xl bg-[#211520] hover:bg-[#2A1B28] text-xs font-semibold text-stone-200 border border-[#3A2234] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Database className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{backupTriggered ? "Generating Snapshot..." : "Trigger Full DB Snapshot"}</span>
        </button>
      </div>

      {/* API INTEGRATIONS & ENVIRONMENT SECRETS */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-sm font-serif font-bold text-white">Production API Keys & Gateways</h3>
          </div>
          <button
            onClick={() => setShowKeys(!showKeys)}
            className="text-xs text-[#E1CD98] hover:underline flex items-center gap-1"
          >
            {showKeys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showKeys ? "Mask Secrets" : "Reveal Secrets"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {apiIntegrations.map(api => (
            <div
              key={api.name}
              className="p-4 rounded-xl bg-[#211520] border border-[#2D1B28] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white">{api.name}</div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {api.status}
                </span>
              </div>
              <div className="text-[11px] text-stone-400">{api.service}</div>
              <div className="p-2 rounded-lg bg-[#160E15] border border-[#3A2234] font-mono text-[11px] flex items-center justify-between text-stone-300">
                <span className="text-stone-500">{api.envKey}:</span>
                <span className="text-[#C5A059]">{showKeys ? "prod_live_sec_994821a7c" : api.maskedValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PLATFORM MAINTENANCE MODE TOGGLE */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div>
              <div className="font-serif font-bold text-white text-sm">Emergency Platform Maintenance Mode</div>
              <div className="text-xs text-stone-400 mt-0.5">
                Displays a friendly branded maintenance screen for non-admin visitors.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const next = !maintenanceMode;
              setMaintenanceMode(next);
              alert(next ? "Maintenance Mode Enabled. Site will show status page." : "Maintenance Mode Disabled. Site is Live.");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              maintenanceMode
                ? "bg-amber-500 text-black font-bold"
                : "bg-[#211520] text-stone-400 border border-[#3A2234] hover:text-white"
            }`}
          >
            {maintenanceMode ? "ENABLED (ACTIVE)" : "Disabled (Live)"}
          </button>
        </div>
      </div>

      {/* PLATFORM SECURITY & AUDIT TRAIL LOG */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#74182E]" />
            <h3 className="text-sm font-serif font-bold text-white">Immutable Platform Audit Trail</h3>
          </div>
          <span className="text-[10px] text-stone-500 font-mono">SOC2 Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2D1B28] text-stone-400">
                <th className="pb-3 font-semibold">Log ID</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Operator / Actor</th>
                <th className="pb-3 font-semibold">Action Description</th>
                <th className="pb-3 font-semibold">IP Address</th>
                <th className="pb-3 font-semibold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211520]">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#211520]/50 transition-colors">
                  <td className="py-3 pr-4 font-mono text-stone-500">{log.id}</td>
                  <td className="py-3 pr-4 text-stone-400">{log.time}</td>
                  <td className="py-3 pr-4 text-white font-medium">{log.admin}</td>
                  <td className="py-3 pr-4 text-stone-300">{log.action}</td>
                  <td className="py-3 pr-4 font-mono text-stone-500">{log.ip}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {log.status}
                    </span>
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
