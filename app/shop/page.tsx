"use client";

import { useState } from "react";
import { artworks } from "@/lib/artworks";
import FilterBar, { type Filter } from "@/components/FilterBar";
import ArtworkCard from "@/components/ArtworkCard";
import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = artworks.filter((a) => {
    if (filter === "originals") return a.type === "original";
    if (filter === "prints") return a.type === "print";
    if (filter === "available") return a.available;
    if (filter === "sold") return !a.available;
    return true;
  });

  return (
    <div className="pt-[100px] px-8 max-w-6xl mx-auto">
      <CrossHeader className="mb-2">Shop</CrossHeader>
      <OrnamentalDivider />

      <div className="mb-10">
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p
            className="font-display text-sm uppercase tracking-widest text-muted"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            No works found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.slug} artwork={artwork} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
