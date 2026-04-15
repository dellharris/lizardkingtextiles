"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const clearCart = useCartStore((s) => s.clearCart);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", state: "", zip: "" });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0 && status !== "success") {
    return (
      <div className="pt-[100px] px-6 max-w-md mx-auto text-center">
        <CrossHeader className="mb-4">Checkout</CrossHeader>
        <OrnamentalDivider />
        <p className="font-display text-sm text-muted uppercase tracking-widest mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
          Your cart is empty
        </p>
        <Link href="/shop" className="font-display text-[11px] uppercase tracking-widest border border-ink px-8 py-4 hover:bg-ink hover:text-cream transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
          Browse Shop
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="pt-[100px] px-6 max-w-md mx-auto text-center">
        <CrossHeader className="mb-4">Order Received</CrossHeader>
        <OrnamentalDivider />
        <p className="font-body text-lg text-ink mb-2" style={{ fontFamily: "'Crimson Text', serif" }}>
          Thank you for your purchase.
        </p>
        <p className="font-mono text-xs text-muted uppercase tracking-widest" style={{ fontFamily: "'Courier Prime', monospace" }}>
          A confirmation email will be sent shortly.
        </p>
        <Link href="/" className="mt-8 inline-block font-display text-[11px] uppercase tracking-widest border border-ink px-8 py-4 hover:bg-ink hover:text-cream transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
          Return Home
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: total(), ...form }),
      });
      if (res.ok) {
        clearCart();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fields = [
    { key: "email", label: "Email", type: "email", required: true },
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "address", label: "Street Address", type: "text", required: true },
    { key: "city", label: "City", type: "text", required: true },
    { key: "state", label: "State", type: "text", required: true },
    { key: "zip", label: "ZIP Code", type: "text", required: true },
  ];

  return (
    <div className="pt-[100px] px-6 max-w-xl mx-auto pb-24">
      <CrossHeader className="mb-2">Checkout</CrossHeader>
      <OrnamentalDivider />

      {/* Order summary */}
      <div className="border-[2px] border-ink/20 mb-8">
        <div className="px-5 py-3 border-b border-ink/10 bg-ink/3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted" style={{ fontFamily: "'Courier Prime', monospace" }}>
            Order Summary
          </p>
        </div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between px-5 py-3 border-b border-ink/10 last:border-0">
            <div>
              <p className="font-body text-sm" style={{ fontFamily: "'Crimson Text', serif" }}>{item.title}</p>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider" style={{ fontFamily: "'Courier Prime', monospace" }}>
                {item.size.label} × {item.quantity}
              </p>
            </div>
            <p className="font-display text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
              ${(item.size.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="flex justify-between px-5 py-3 border-t-[2px] border-ink/20">
          <p className="font-display text-sm uppercase tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>Total</p>
          <p className="font-display text-base" style={{ fontFamily: "'Cinzel', serif" }}>${total().toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted" style={{ fontFamily: "'Courier Prime', monospace" }}>
          Shipping Information
        </p>
        {fields.map(({ key, label, type, required }) => (
          <div key={key}>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2" style={{ fontFamily: "'Courier Prime', monospace" }}>
              {label}
            </label>
            <input
              type={type}
              required={required}
              value={(form as any)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border-[1.5px] border-ink/40 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:border-ink transition-colors"
              style={{ fontFamily: "'Courier Prime', monospace" }}
            />
          </div>
        ))}

        <div className="border-t border-ink/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4" style={{ fontFamily: "'Courier Prime', monospace" }}>
            Payment · Powered by Stripe
          </p>
          <div className="border-[1.5px] border-ink/30 px-4 py-4 bg-ink/2">
            <p className="font-mono text-xs text-muted" style={{ fontFamily: "'Courier Prime', monospace" }}>
              Add your <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to .env.local to enable live card payments via Stripe Elements.
            </p>
          </div>
        </div>

        {status === "error" && (
          <p className="text-accent-red font-mono text-xs" style={{ fontFamily: "'Courier Prime', monospace" }}>
            Payment failed. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "processing"}
          className="w-full bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-5 hover:bg-accent-red transition-colors disabled:opacity-60"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {status === "processing" ? "Processing..." : `Pay $${total().toFixed(2)}`}
        </button>
        <p className="text-center font-mono text-[9px] text-muted/50 uppercase tracking-widest" style={{ fontFamily: "'Courier Prime', monospace" }}>
          Secure checkout · Stripe encrypted
        </p>
      </form>
    </div>
  );
}
