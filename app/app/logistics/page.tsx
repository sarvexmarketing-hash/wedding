"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import {
  Truck,
  Hotel,
  Car,
  Armchair,
  Search,
  Plus,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function LogisticsPage() {
  const { transportation, hotels, guests, wedding } = useWedding();
  const [activeTab, setActiveTab] = useState<"transport" | "hotels" | "parking" | "seating">("transport");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Ground Logistics & Hospitality
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Wedding Logistics
          </h1>
          <p className="text-xs text-[#7D597E]">
            Coordinate airport pickups, hotel room allotments, valet parking tokens, and banquet seating charts.
          </p>
        </div>
      </div>

      {/* Sub-module Navigation Tabs */}
      <div className="flex border-b border-[#E8DDCF] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("transport")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all shrink-0 ${
            activeTab === "transport"
              ? "border-[#74182E] text-[#74182E]"
              : "border-transparent text-[#7D597E] hover:text-[#2D1B28]"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Transportation ({transportation.length} Dispatches)</span>
        </button>

        <button
          onClick={() => setActiveTab("hotels")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all shrink-0 ${
            activeTab === "hotels"
              ? "border-[#74182E] text-[#74182E]"
              : "border-transparent text-[#7D597E] hover:text-[#2D1B28]"
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Hotels & Room Allotments ({hotels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("parking")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all shrink-0 ${
            activeTab === "parking"
              ? "border-[#74182E] text-[#74182E]"
              : "border-transparent text-[#7D597E] hover:text-[#2D1B28]"
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Valet & Parking Slots</span>
        </button>

        <button
          onClick={() => setActiveTab("seating")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all shrink-0 ${
            activeTab === "seating"
              ? "border-[#74182E] text-[#74182E]"
              : "border-transparent text-[#7D597E] hover:text-[#2D1B28]"
          }`}
        >
          <Armchair className="w-4 h-4" />
          <span>Banquet Table Seating</span>
        </button>
      </div>

      {/* TAB 1: TRANSPORTATION */}
      {activeTab === "transport" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transportation.map(item => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-soft space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#74182E] tracking-wider">
                      Flight / Transit Pickup
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#2D1B28]">{item.guestName}</h3>
                    <div className="text-xs text-[#7D597E]">{item.guestPhone}</div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                      item.status === "completed"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-blue-50 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DDCF]">
                  <div>
                    <div className="text-[10px] text-stone-400">Pickup Location</div>
                    <div className="font-semibold text-[#2D1B28] truncate">{item.pickupLocation}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Drop Destination</div>
                    <div className="font-semibold text-[#2D1B28] truncate">{item.dropLocation}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Flight / Train No.</div>
                    <div className="font-semibold text-[#74182E]">{item.flightOrTrainNumber || "Private Drive"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Arrival Time</div>
                    <div className="font-semibold text-[#2D1B28]">{item.arrivalTime} ({item.arrivalDate})</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#FAF7F2]">
                  <div>
                    <span className="text-[#7D597E]">Vehicle: </span>
                    <strong className="text-[#2D1B28]">{item.vehicleType}</strong> ({item.vehicleNumber})
                  </div>
                  <div className="text-right">
                    <span className="text-[#7D597E]">Chauffeur: </span>
                    <strong className="text-[#2D1B28]">{item.driverName}</strong> ({item.driverPhone})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HOTELS */}
      {activeTab === "hotels" && (
        <div className="bg-white rounded-3xl border border-[#E8DDCF] shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#7D597E] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="p-4">Guest / Family</th>
                <th className="p-4">Hotel Property</th>
                <th className="p-4">Room Type & Number</th>
                <th className="p-4">Check-In / Out</th>
                <th className="p-4">Occupancy</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCF]">
              {hotels.map(h => (
                <tr key={h.id} className="hover:bg-[#FAF7F2]/60">
                  <td className="p-4 font-bold text-[#2D1B28]">{h.guestName}</td>
                  <td className="p-4 font-semibold text-[#74182E]">{h.hotelName}</td>
                  <td className="p-4">
                    <div className="font-medium">{h.roomType}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{h.roomNumber}</div>
                  </td>
                  <td className="p-4 text-[#7D597E]">{h.checkInDate} – {h.checkOutDate}</td>
                  <td className="p-4 font-medium">{h.guestsCount} guests</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      h.status === "checked_in" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {h.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PARKING */}
      {activeTab === "parking" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <div>
              <span className="text-xs uppercase font-bold text-[#74182E]">Valet Operations</span>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Venue Parking Allocations</h3>
            </div>
            <span className="text-xs text-[#7D597E]">Capacity: 140 reserved valet bays</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["P1 (VIP Groom)", "P2 (VIP Bride)", "P3 (College Friends)", "P4 (Family)", "P5 (Dignitaries)", "P6 (General)", "P7 (Vendors & Media)", "P8 (Overflow)"].map((slot, idx) => (
              <div key={slot} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] text-center">
                <div className="text-xs font-bold text-[#74182E]">{slot}</div>
                <div className="text-2xl font-serif font-bold text-[#2D1B28] mt-1">{12 + idx * 2} / 20</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Vehicles parked</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEATING */}
      {activeTab === "seating" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <div>
              <span className="text-xs uppercase font-bold text-[#74182E]">Banquet Table Chart</span>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Table Allocations</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Table A12", group: "Sharma Family & Friends", count: 8, max: 10, food: "Vegetarian" },
              { name: "Table VIP-1", group: "Varma Royal Clan", count: 6, max: 8, food: "Non-Vegetarian" },
              { name: "Table J-04", group: "Mehta Family & Associates", count: 8, max: 8, food: "Strict Jain" },
              { name: "Table B08", group: "Architects & Close Friends", count: 9, max: 10, food: "Vegetarian" },
              { name: "Table C12", group: "IIT Batchmates & Alumni", count: 10, max: 10, food: "Mixed" },
            ].map(table => (
              <div key={table.name} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-serif font-bold text-base text-[#74182E]">{table.name}</span>
                  <span className="text-[10px] bg-white border border-[#E8DDCF] px-2 py-0.5 rounded-full font-semibold">
                    {table.food}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#2D1B28]">{table.group}</div>
                <div className="text-[11px] text-[#7D597E]">{table.count} of {table.max} seats assigned</div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#74182E] h-full" style={{ width: `${(table.count / table.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
