"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/artworks";

type Props = {
  artworks: Artwork[];
};

export default function GalleryCarousel({ artworks }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const openLightbox = useCallback((index: number) => {
    if (!isDragging.current) setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) isDragging.current = true;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  const activeWork = activeIndex !== null ? artworks[activeIndex] : null;

  return (
    <>
      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex h-full overflow-x-auto no-scrollbar select-none"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
      >
        <div className="flex items-center gap-0 h-full pl-[calc(50vw-300px)] pr-[calc(50vw-300px)]">
          {artworks.map((artwork, index) => (
            <ArtworkPanel
              key={artwork.slug}
              artwork={artwork}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeWork !== null && activeIndex !== null && (
          <Lightbox
            artwork={activeWork}
            artworks={artworks}
            activeIndex={activeIndex}
            onClose={closeLightbox}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ArtworkPanel({
  artwork,
  index,
  onClick,
}: {
  artwork: Artwork;
  index: number;
  onClick: () => void;
}) {
  const img = artwork.images[0] || "/artwork/placeholder.jpg";

  return (
    <motion.div
      className="relative flex-shrink-0 h-[70vh] mx-8 cursor-pointer group"
      style={{ width: "clamp(260px, 38vw, 560px)" }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {/* Border frame */}
      <div className="absolute inset-0 border-[3px] border-ink z-10 pointer-events-none" />

      {/* Image */}
      <div className="relative w-full h-full overflow-hidden bg-ink/5">
        <Image
          src={img}
          alt={artwork.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 40vw"
          priority={index < 2}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
      </div>

      {/* Label below */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <p
          className="text-ink font-mono text-xs uppercase tracking-widest"
          style={{ fontFamily: "'Courier Prime', monospace" }}
        >
          {artwork.available ? (
            <span className="text-accent-red">●</span>
          ) : (
            <span className="text-muted">●</span>
          )}{" "}
          {artwork.title}
        </p>
      </div>
    </motion.div>
  );
}

function Lightbox({
  artwork,
  artworks,
  activeIndex,
  onClose,
  onNavigate,
}: {
  artwork: Artwork;
  artworks: Artwork[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const img = artwork.images[0] || "/artwork/placeholder.jpg";

  return (
    <motion.div
      className="fixed inset-0 z-50 lightbox-overlay"
      style={{ backgroundColor: "rgba(253,250,244,0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Ghost adjacent works */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {artworks.map((a, i) => {
          if (i === activeIndex) return null;
          const offset = (i - activeIndex) * 85;
          return (
            <div
              key={a.slug}
              className="absolute"
              style={{
                transform: `translateX(${offset}vw) scale(0.7)`,
                opacity: 0.12,
                width: "clamp(260px, 38vw, 560px)",
                height: "70vh",
              }}
            >
              <Image
                src={a.images[0] || "/artwork/placeholder.jpg"}
                alt=""
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          );
        })}
      </div>

      {/* Active piece */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "clamp(280px, 52vw, 700px)" }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Border frame */}
        <div className="relative border-[3px] border-ink">
          <div
            className="relative bg-ink/5"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src={img}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 55vw"
              priority
            />
          </div>

          {/* Info strip */}
          <div className="bg-cream border-t-[3px] border-ink px-5 py-4">
            <p
              className="font-gothic text-xl leading-tight"
              style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
            >
              {artwork.title}
            </p>
            <p
              className="font-mono text-xs text-muted mt-1 uppercase tracking-wider"
              style={{ fontFamily: "'Courier Prime', monospace" }}
            >
              Handmade {artwork.dimensions} · {artwork.medium}
            </p>
          </div>
        </div>

        {/* View full details CTA */}
        <div className="mt-4 flex gap-3 justify-center">
          <Link
            href={`/work/${artwork.slug}`}
            className="font-display text-[11px] uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
            onClick={(e) => e.stopPropagation()}
          >
            View Full Details
          </Link>
          <button
            onClick={onClose}
            className="font-display text-[11px] uppercase tracking-widest border border-muted/40 px-6 py-3 text-muted hover:border-ink hover:text-ink transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Close
          </button>
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-ink hover:text-accent-red transition-colors z-10"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Nav arrows */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-ink hover:text-accent-red transition-colors"
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {activeIndex < artworks.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-ink hover:text-accent-red transition-colors"
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
