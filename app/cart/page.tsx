"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import Footer from "@/components/Footer";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total);

  return (
    <div className="pt-[100px] px-6 max-w-2xl mx-auto">
      <CrossHeader className="mb-2">Cart</CrossHeader>
      <OrnamentalDivider />

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-sm uppercase tracking-widest text-muted mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="font-display text-[11px] uppercase tracking-widest border border-ink px-8 py-4 hover:bg-ink hover:text-cream transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Browse Shop
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-ink/10">
            {items.map((item) => (
              <li key={item.id} className="py-6 flex gap-5 items-start">
                <div className="relative w-20 h-24 flex-shrink-0 border-[2px] border-ink/20 overflow-hidden bg-ink/5">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-gothic text-xl leading-tight" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>
                    {item.title}
                  </h3>
                  <p className="font-mono text-[11px] text-muted uppercase tracking-wider mt-1"
                    style={{ fontFamily: "'Courier Prime', monospace" }}>
                    {item.size.label} · ${item.size.price}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-ink/30">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-ink/5">−</button>
                      <span className="px-3 py-1 border-x border-ink/30 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-ink/5">+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-accent-red transition-colors"
                      style={{ fontFamily: "'Courier Prime', monospace" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-display text-base flex-shrink-0" style={{ fontFamily: "'Cinzel', serif" }}>
                  ${(item.size.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <OrnamentalDivider />

          <div className="flex justify-between items-center mb-6">
            <span className="font-display text-sm uppercase tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>
              Total
            </span>
            <span className="font-display text-xl" style={{ fontFamily: "'Cinzel', serif" }}>
              ${total().toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-5 hover:bg-accent-red transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block w-full text-center mt-3 font-display text-[11px] uppercase tracking-widest border border-ink/30 py-4 text-muted hover:border-ink hover:text-ink transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Continue Shopping
          </Link>
        </>
      )}
      <Footer />
    </div>
  );
}
