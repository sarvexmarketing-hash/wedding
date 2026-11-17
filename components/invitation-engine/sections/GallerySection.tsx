"use client";

import React, { useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function GallerySection({ data, template }: SectionProps) {
  const { gallery } = data;
  const { theme } = template;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-left" style={{ borderColor: theme.borderColor }}>
      <div className="text-center space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Cherished Moments
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          Pre-Wedding Photo Gallery
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          A glimpse into our golden days, laughter, and memories leading up to our wedding celebrations.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {gallery.map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] border cursor-pointer shadow-soft-sm transition-all hover:scale-[1.02]"
            style={{ borderColor: theme.borderColor }}
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('${photo.url}')` }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs">
              <span className="font-serif italic truncate">{photo.caption || "Click to expand"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && gallery[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full text-white/80 hover:text-white bg-black/50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-white bg-black/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-white bg-black/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-3xl max-h-[85vh] text-center space-y-3">
            <img
              src={gallery[selectedPhotoIndex].url}
              alt={gallery[selectedPhotoIndex].caption}
              className="max-h-[75vh] mx-auto rounded-xl shadow-2xl object-contain"
            />
            <p className="text-sm font-serif italic text-white/90">
              {gallery[selectedPhotoIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
