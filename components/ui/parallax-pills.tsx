"use client";

import React, { useRef, useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export interface ParallaxPillItem {
  id?: string | number;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
  depth?: number; // 0.3 (slow background) to 1.5 (fast foreground)
  onClick?: () => void;
  className?: string;
}

export interface ParallaxPillsProps {
  items: ParallaxPillItem[];
  maxOffset?: number;
  damping?: number;
  className?: string;
}

export function ParallaxPills({
  items,
  maxOffset = 28,
  damping = 0.08,
  className = ""
}: ParallaxPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentOffsets, setCurrentOffsets] = useState<{ [key: number]: { x: number; y: number } }>({});
  const rafRef = useRef<number | null>(null);
  const targetOffsets = useRef<{ [key: number]: { x: number; y: number } }>({});

  useEffect(() => {
    // Generate deterministic depths if not provided
    items.forEach((item, idx) => {
      if (!targetOffsets.current[idx]) {
        targetOffsets.current[idx] = { x: 0, y: 0 };
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });

      items.forEach((item, idx) => {
        const depth = item.depth ?? (0.6 + (idx % 4) * 0.35);
        targetOffsets.current[idx] = {
          x: x * maxOffset * depth,
          y: y * maxOffset * depth
        };
      });
    };

    const handleMouseLeave = () => {
      items.forEach((_, idx) => {
        targetOffsets.current[idx] = { x: 0, y: 0 };
      });
      setMousePos({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Spring interpolation loop
    let running = true;
    const animate = () => {
      if (!running) return;

      setCurrentOffsets(prev => {
        const next: { [key: number]: { x: number; y: number } } = {};
        let changed = false;

        items.forEach((_, idx) => {
          const cur = prev[idx] || { x: 0, y: 0 };
          const target = targetOffsets.current[idx] || { x: 0, y: 0 };
          const nx = cur.x + (target.x - cur.x) * damping;
          const ny = cur.y + (target.y - cur.y) * damping;

          if (Math.abs(nx - cur.x) > 0.01 || Math.abs(ny - cur.y) > 0.01) {
            changed = true;
          }
          next[idx] = { x: nx, y: ny };
        });

        return changed ? next : prev;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [items, maxOffset, damping]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto select-none ${className}`}
    >
      {items.map((item, idx) => {
        const offset = currentOffsets[idx] || { x: 0, y: 0 };
        return (
          <div
            key={item.id ?? idx}
            style={{
              transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
              transition: "transform 0.05s linear"
            }}
            className="will-change-transform"
          >
            <div
              onClick={item.onClick}
              className={`px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DDCF] shadow-soft-sm hover:shadow-soft-lg hover:border-[#C5A059] flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 group ${item.className || ""}`}
            >
              {item.icon || (
                <MapPin className="w-3.5 h-3.5 text-[#74182E] group-hover:text-[#C5A059] group-hover:scale-110 transition-all duration-300" />
              )}
              <span className="text-xs sm:text-sm font-serif font-bold text-[#2D1B28] tracking-tight">
                {item.label}
              </span>
              {item.subtitle && (
                <span className="text-[11px] font-sans text-[#7D597E] group-hover:text-[#4D334E] transition-colors">
                  · {item.subtitle}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ParallaxPills;
