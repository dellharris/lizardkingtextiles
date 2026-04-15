import GalleryCarousel from "@/components/GalleryCarousel";
import { artworks } from "@/lib/artworks";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden pt-[72px]">
      {/* Gallery header */}
      <div className="flex items-baseline justify-between px-8 py-4 flex-shrink-0">
        <h1
          className="font-gothic text-[clamp(1.8rem,4vw,3rem)] leading-none text-ink"
          style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
        >
          Lizard King Textiles
        </h1>
        <span
          className="font-display text-[11px] uppercase tracking-[0.2em] text-muted"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Current Works
        </span>
      </div>

      {/* Carousel fills remaining height */}
      <div className="flex-1 overflow-hidden relative">
        <GalleryCarousel artworks={artworks} />
        {/* Scroll hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted/60 animate-pulse"
            style={{ fontFamily: "'Courier Prime', monospace" }}
          >
            ← drag to explore →
          </p>
        </div>
      </div>
    </div>
  );
}
