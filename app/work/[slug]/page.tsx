"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/artworks";
import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import InquiryForm from "@/components/InquiryForm";
import ArtworkCard from "@/components/ArtworkCard";
import { useCartStore } from "@/lib/cart";
import Footer from "@/components/Footer";

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artwork = getArtwork(params.slug);
  if (!artwork) notFound();

  const [selectedSize, setSelectedSize] = useState(
    artwork.printSizes?.[0] ?? null
  );
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const related = artworks
    .filter((a) => a.slug !== artwork.slug)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: `${artwork.slug}-${selectedSize.label}`,
      slug: artwork.slug,
      title: artwork.title,
      image: artwork.images[0] || "/artwork/placeholder.jpg",
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="pt-[100px] px-6 md:px-8 max-w-6xl mx-auto">
        {artwork.seriesNote && (
          <div className="mb-6 text-center">
            <CrossHeader size="sm" className="text-muted">
              {artwork.seriesNote}
            </CrossHeader>
          </div>
        )}

        {/* Main split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image(s) */}
          <div className="space-y-4">
            <div className="relative border-[3px] border-ink overflow-hidden bg-ink/5">
              <div className="relative" style={{ paddingBottom: "110%" }}>
                <Image
                  src={artwork.images[0] || "/artwork/placeholder.jpg"}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Detail images */}
            {artwork.images.length > 1 && (
              <div className="flex gap-3">
                {artwork.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative border-[2px] border-ink/30 overflow-hidden flex-1 bg-ink/5"
                    style={{ paddingBottom: "80%" }}
                  >
                    <Image
                      src={img}
                      alt={`${artwork.title} detail ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Label */}
            <p
              className="font-mono text-xs uppercase tracking-widest text-muted"
              style={{ fontFamily: "'Courier Prime', monospace" }}
            >
              Handmade {artwork.dimensions} · {artwork.medium}
            </p>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1
                className="font-gothic text-3xl md:text-4xl leading-tight text-ink"
                style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
              >
                {artwork.title}
              </h1>
              <p
                className="font-mono text-xs uppercase tracking-widest text-muted mt-2"
                style={{ fontFamily: "'Courier Prime', monospace" }}
              >
                {artwork.year} ·{" "}
                {artwork.type === "original" ? "Original" : "Fine Art Print"}
              </p>
            </div>

            <OrnamentalDivider className="my-0" />

            {/* Description */}
            <div className="font-body text-base leading-relaxed text-ink space-y-4"
              style={{ fontFamily: "'Crimson Text', Georgia, serif" }}>
              {artwork.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <OrnamentalDivider className="my-0" />

            {/* CTA section */}
            {artwork.type === "original" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`dot-${artwork.available ? "available" : "sold"}`} />
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest text-muted"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                  >
                    {artwork.available ? "Available" : "Sold"}
                  </span>
                </div>

                {artwork.available && (
                  <button
                    onClick={() => setInquiryOpen(true)}
                    className="w-full border-[2px] border-ink bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-4 hover:bg-accent-red hover:border-accent-red transition-colors"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Inquire About This Work
                  </button>
                )}
                <p
                  className="font-mono text-[10px] text-muted text-center uppercase tracking-wider"
                  style={{ fontFamily: "'Courier Prime', monospace" }}
                >
                  Originals are sold via direct inquiry
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Print size selector */}
                {artwork.printSizes && (
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3"
                      style={{ fontFamily: "'Courier Prime', monospace" }}
                    >
                      Select Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artwork.printSizes.map((size) => (
                        <button
                          key={size.label}
                          onClick={() => setSelectedSize(size)}
                          className={`filter-pill ${
                            selectedSize?.label === size.label ? "active" : ""
                          }`}
                        >
                          {size.label} · ${size.price}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !artwork.available}
                  className="w-full border-[2px] border-ink bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-4 hover:bg-accent-red hover:border-accent-red transition-colors disabled:opacity-50"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {added ? "Added to Cart ✓" : artwork.available ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related works */}
        {related.length > 0 && (
          <div className="mt-24">
            <OrnamentalDivider />
            <CrossHeader size="sm" className="mb-10">
              More Works
            </CrossHeader>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>

      {/* Inquiry modal */}
      {inquiryOpen && (
        <InquiryForm
          artworkTitle={artwork.title}
          artworkSlug={artwork.slug}
          onClose={() => setInquiryOpen(false)}
        />
      )}
    </>
  );
}
