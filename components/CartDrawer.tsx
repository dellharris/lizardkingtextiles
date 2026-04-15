"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total);

  useEffect(() => {
    const handler = (e: CustomEvent) => setOpen(e.detail);
    window.addEventListener("cart-toggle" as any, handler);
    return () => window.removeEventListener("cart-toggle" as any, handler);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/30 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-cream border-l-[3px] border-ink z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b-[2px] border-ink">
              <h2
                className="font-gothic text-2xl"
                style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
              >
                Cart
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-ink hover:text-accent-red transition-colors"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <p className="font-display text-sm text-muted uppercase tracking-widest"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                    Your cart is empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="font-display text-[11px] uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10 space-y-0">
                  {items.map((item) => (
                    <li key={item.id} className="py-5 flex gap-4">
                      <div className="relative w-16 h-20 flex-shrink-0 border border-ink/20 overflow-hidden bg-ink/5">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-gothic text-base leading-tight truncate"
                          style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
                        >
                          {item.title}
                        </p>
                        <p className="font-mono text-[10px] text-muted uppercase tracking-wider mt-0.5"
                          style={{ fontFamily: "'Courier Prime', monospace" }}>
                          {item.size.label}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-ink/30">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-sm hover:bg-ink/5"
                            >−</button>
                            <span className="px-3 py-0.5 text-sm border-x border-ink/30">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-sm hover:bg-ink/5"
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted hover:text-accent-red transition-colors text-xs font-mono uppercase tracking-wider"
                            style={{ fontFamily: "'Courier Prime', monospace" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                          ${(item.size.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t-[2px] border-ink px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-display text-sm uppercase tracking-widest"
                    style={{ fontFamily: "'Cinzel', serif" }}>Total</span>
                  <span className="font-display text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                    ${total().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-4 hover:bg-accent-red transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Proceed to Checkout
                </Link>
                <p className="text-center font-mono text-[10px] text-muted uppercase tracking-wider"
                  style={{ fontFamily: "'Courier Prime', monospace" }}>
                  Secure checkout via Stripe
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
