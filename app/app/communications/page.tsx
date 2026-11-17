"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import {
  MessageSquare,
  Send,
  Mail,
  Smartphone,
  CheckCircle2,
  Eye,
  CheckCheck,
  Sparkles,
  RefreshCw,
  Plus,
  Play
} from "lucide-react";

export default function CommunicationCenterPage() {
  const { campaigns, sendCampaignMessage, wedding } = useWedding();
  const [selectedChannel, setSelectedChannel] = useState<"All" | "WhatsApp" | "Email" | "SMS">("All");
  const [activeTemplate, setActiveTemplate] = useState<string>("RSVP Reminder");
  const [previewGuestName, setPreviewGuestName] = useState("Vikram Sharma");
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const templatesList = [
    {
      id: "invitation",
      name: "Invitation",
      text: "Namaskar {{guest_name}}, With the blessings of our elders, Priya & Rahul request the pleasure of your company to celebrate their wedding celebrations. Tap your personalized pass to view ceremonies & RSVP: https://weddingos.com/invite/rahul-priya?token={{token}}"
    },
    {
      id: "rsvp_reminder",
      name: "RSVP Reminder",
      text: "Hi {{guest_name}}! We are finalizing event arrangements and chef headcount for {{wedding_name}}. Please let us know if you and your family will be joining us: https://weddingos.com/invite/rahul-priya?token={{token}}"
    },
    {
      id: "event_reminder",
      name: "Event Reminder",
      text: "Dear {{guest_name}}, {{event_name}} begins today at 7:00 PM at The Grand Ballroom. Dress Code: Glamorous Indo-Western. We look forward to celebrating together!"
    },
    {
      id: "location_update",
      name: "Location Update",
      text: "Namaskar {{guest_name}}, your airport chauffeur Mahesh (+91 94900 11223) will meet you at RGIA Pillar 4 with your WeddingOS name placard. Welcome to Hyderabad!"
    },
    {
      id: "schedule_change",
      name: "Schedule Change",
      text: "Important Update for {{wedding_name}}: Due to pleasant evening weather, the High Tea for Mehendi will now commence at 5:30 PM on the Durbar Lawns."
    },
    {
      id: "thank_you",
      name: "Thank You",
      text: "Dear {{guest_name}}, thank you from the bottom of our hearts for blessing Rahul & Priya with your warm presence and love. Here are your candid ceremony photos: https://weddingos.com/photos/rahul-priya"
    }
  ];

  const currentTemplateObj = templatesList.find(t => t.name === activeTemplate) || templatesList[0];

  const renderedPreview = currentTemplateObj.text
    .replace(/{{guest_name}}/g, previewGuestName)
    .replace(/{{wedding_name}}/g, wedding.coupleNames)
    .replace(/{{event_name}}/g, "The Royal Sangeet")
    .replace(/{{token}}/g, "tkn-sharma-771");

  const filteredCampaigns = campaigns.filter(c =>
    selectedChannel === "All" || c.channel === selectedChannel
  );

  const handleDispatch = (campaignId: string) => {
    sendCampaignMessage(campaignId);
    setDispatchedId(campaignId);
    setTimeout(() => setDispatchedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Omnichannel Guest Messaging
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Communication Center
          </h1>
          <p className="text-xs text-[#7D597E]">
            Automated delivery tracking across WhatsApp Business API, SMS, and Email with dynamic guest variables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            WhatsApp API Provider Connected
          </span>
        </div>
      </div>

      {/* Aggregate Metrics Across Channels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-stone-400" /> Messages Sent
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">1,162</div>
          <div className="text-[11px] text-stone-500 mt-1">Across 3 campaigns</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> Delivered
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-900 mt-1">1,149</div>
          <div className="text-[11px] text-emerald-700 mt-1">98.8% delivery rate</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-blue-800 font-medium flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-600" /> Opened / Read
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mt-1">1,044</div>
          <div className="text-[11px] text-blue-700 mt-1">90.8% read rate</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#74182E] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#74182E]" /> RSVPs Completed
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#74182E] mt-1">705</div>
          <div className="text-[11px] text-[#74182E] mt-1">Instant pass issued</div>
        </div>
      </div>

      {/* Main Two-Column Layout: Template Editor & Live Dispatches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Interactive Template Composer */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <div>
              <span className="text-xs uppercase font-bold text-[#74182E]">Message Automation</span>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Template Composer</h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <span>Channel:</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] font-semibold text-[#2D1B28] border border-[#E8DDCF]">
                WhatsApp Official
              </span>
            </div>
          </div>

          {/* Template Selector Pills */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-600">Choose Standard Template</label>
            <div className="flex flex-wrap gap-2">
              {templatesList.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplate(t.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    activeTemplate === t.name
                      ? "bg-[#74182E] text-white shadow-soft font-semibold"
                      : "bg-[#FAF7F2] text-[#4D334E] hover:bg-[#F3ECE1]"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Personalized Variable Simulator */}
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF] flex items-center justify-between text-xs">
            <span className="text-[#7D597E]">Simulate with Guest Name:</span>
            <input
              type="text"
              value={previewGuestName}
              onChange={e => setPreviewGuestName(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-[#E8DDCF] bg-white font-medium text-xs focus:outline-none"
            />
          </div>

          {/* WhatsApp Preview Bubble */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-600 flex items-center justify-between">
              <span>Simulated WhatsApp Screen:</span>
              <span className="text-[10px] text-stone-400">Variables auto-replaced per recipient</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#EFEAE2] border border-stone-200 space-y-2">
              <div className="max-w-md bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm text-xs text-stone-800 space-y-2">
                <p className="leading-relaxed whitespace-pre-wrap">{renderedPreview}</p>
                <div className="text-[10px] text-stone-400 text-right flex items-center justify-end gap-1">
                  <span>10:42 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E8DDCF]">
            <div className="text-[11px] text-stone-500 flex items-center gap-1">
              <span>Supported variables:</span>
              <code className="text-[#74182E] bg-stone-100 px-1 py-0.5 rounded">&#123;&#123;guest_name&#125;&#125;</code>
              <code className="text-[#74182E] bg-stone-100 px-1 py-0.5 rounded">&#123;&#123;event_name&#125;&#125;</code>
              <code className="text-[#74182E] bg-stone-100 px-1 py-0.5 rounded">&#123;&#123;token&#125;&#125;</code>
            </div>

            <button
              onClick={() => handleDispatch("cmp-2")}
              className="px-5 py-2.5 rounded-xl bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
            >
              <Send className="w-3.5 h-3.5 text-[#E1CD98]" /> Test Dispatch to 183 Pending
            </button>
          </div>
        </div>

        {/* Right 5 cols: Sent Campaigns History */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <div>
              <span className="text-xs uppercase font-bold text-[#74182E]">Audit Trail</span>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Dispatched Campaigns</h3>
            </div>
          </div>

          <div className="space-y-3">
            {filteredCampaigns.map(cmp => (
              <div
                key={cmp.id}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2 hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif font-bold text-[#2D1B28]">{cmp.title}</span>
                  </div>
                  <span className="text-[10px] bg-white border border-[#E8DDCF] px-2 py-0.5 rounded-full font-semibold text-[#74182E]">
                    {cmp.channel}
                  </span>
                </div>

                <p className="text-[11px] text-[#7D597E] line-clamp-2 italic">
                  &ldquo;{cmp.content}&rdquo;
                </p>

                <div className="grid grid-cols-4 gap-1 pt-2 border-t border-[#E8DDCF] text-center text-[10px]">
                  <div>
                    <div className="text-stone-400">Sent</div>
                    <div className="font-bold text-[#2D1B28]">{cmp.sentCount}</div>
                  </div>
                  <div>
                    <div className="text-stone-400">Delivered</div>
                    <div className="font-bold text-emerald-700">{cmp.deliveredCount}</div>
                  </div>
                  <div>
                    <div className="text-stone-400">Opened</div>
                    <div className="font-bold text-blue-700">{cmp.openedCount}</div>
                  </div>
                  <div>
                    <div className="text-stone-400">RSVPed</div>
                    <div className="font-bold text-[#74182E]">{cmp.rsvpCompletedCount}</div>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] text-stone-500">
                  <span>{cmp.createdAt}</span>
                  <button
                    onClick={() => handleDispatch(cmp.id)}
                    className="text-[#74182E] font-semibold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Re-trigger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
