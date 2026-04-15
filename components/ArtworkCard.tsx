import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/artworks";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const img = artwork.images[0] || "/artwork/placeholder.jpg";
  const isOriginal = artwork.type === "original";

  return (
    <Link href={`/work/${artwork.slug}`} className="group block no-underline">
      <div className="relative border-[2px] border-ink overflow-hidden bg-ink/5">
        {/* Aspect ratio container */}
        <div className="relative" style={{ paddingBottom: "120%" }}>
          <Image
            src={img}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/8 transition-colors duration-300" />
        </div>

        {/* Availability badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isOriginal && (
            <span className="bg-cream border border-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5"
              style={{ fontFamily: "'Courier Prime', monospace" }}>
              <CrossTiny />
              Original
            </span>
          )}
          {!artwork.available && (
            <span className="bg-ink text-cream px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
              style={{ fontFamily: "'Courier Prime', monospace" }}>
              Sold
            </span>
          )}
        </div>
      </div>

      {/* Info below card */}
      <div className="mt-3 px-1">
        <h3
          className="font-gothic text-lg leading-tight text-ink group-hover:text-accent-red transition-colors"
          style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
        >
          {artwork.title}
        </h3>
        <p
          className="font-mono text-[11px] text-muted mt-1 uppercase tracking-wider"
          style={{ fontFamily: "'Courier Prime', monospace" }}
        >
          {artwork.medium} · {artwork.dimensions}
        </p>
        <p className="mt-1 font-display text-sm text-ink" style={{ fontFamily: "'Cinzel', serif" }}>
          {isOriginal ? (
            <span className="text-accent-red text-[11px] uppercase tracking-wider">Inquire</span>
          ) : (
            <span>From ${artwork.printSizes?.[0]?.price ?? artwork.price}</span>
          )}
        </p>
      </div>
    </Link>
  );
}

function CrossTiny() {
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="currentColor">
      <rect x="3" y="0" width="1.5" height="9" />
      <rect x="0" y="2.5" width="7" height="1.5" />
    </svg>
  );
}
