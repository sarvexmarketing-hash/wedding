import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

export function Logo({ className = "", size = "md", variant = "dark" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-11 w-11",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const textColor = variant === "light" ? "text-white" : "text-[#2D1B28]";
  const subColor = variant === "light" ? "text-[#E1CD98]" : "text-[#74182E]";

  const numericDimensions = {
    sm: 24,
    md: 32,
    lg: 44,
  };

  const dim = numericDimensions[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform active:scale-95 ${className}`}>
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]}`}
        style={{ width: dim, height: dim, minWidth: dim, minHeight: dim }}
      >
        {/* Interlocking Rings SVG forming a W / OS motif */}
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: dim, height: dim, maxWidth: "100%", maxHeight: "100%" }}
          className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform shrink-0"
        >
          {/* Ring 1 - Deep Burgundy */}
          <circle
            cx="16"
            cy="20"
            r="11"
            stroke="#74182E"
            strokeWidth="2.8"
            className="transition-colors group-hover:stroke-[#8B1B36]"
          />
          {/* Ring 2 - Radiant Gold */}
          <circle
            cx="24"
            cy="20"
            r="11"
            stroke="#C5A059"
            strokeWidth="2.8"
            className="transition-colors group-hover:stroke-[#D4AF37]"
          />
          {/* Interlocking Arch Bridge (forming W & Infinity/OS) */}
          <path
            d="M 12 16 Q 16 26 20 20 Q 24 26 28 16"
            stroke={variant === "light" ? "#FAF7F2" : "#2D1B28"}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Diamond gem / OS focal node */}
          <circle cx="20" cy="14" r="2.2" fill="#D4AF37" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif tracking-tight font-bold ${textClasses[size]} ${textColor} leading-none`}>
          Wedding<span className={subColor}>OS</span>
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#7D597E] -mt-0.5">
          Guest Platform
        </span>
      </div>
    </Link>
  );
}
