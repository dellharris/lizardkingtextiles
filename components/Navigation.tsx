"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Gallery" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.count);

  useEffect(() => setMounted(true), []);

  // Expose a global toggle for CartDrawer to listen to
  useEffect(() => {
    const handler = (e: CustomEvent) => setCartOpen(e.detail);
    window.addEventListener("cart-toggle" as any, handler);
    return () => window.removeEventListener("cart-toggle" as any, handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 pt-5 pb-3 flex items-center justify-between bg-cream/90 backdrop-blur-sm">
      {/* Artist name — blackletter */}
      <Link href="/" className="no-underline">
        <span
          className="font-gothic text-2xl md:text-3xl text-ink leading-none tracking-tight"
          style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
        >
          Lizard King Textiles
        </span>
      </Link>

      {/* Nav links + cart */}
      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-display text-[11px] uppercase tracking-widest transition-colors ${
              pathname === link.href
                ? "text-accent-red border-b border-accent-red"
                : "text-ink hover:text-accent-red"
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {link.label}
          </Link>
        ))}

        {/* Cart icon */}
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("cart-toggle", { detail: true })
            )
          }
          className="relative ml-2 flex items-center gap-1 font-display text-[11px] uppercase tracking-widest text-ink hover:text-accent-red transition-colors"
          style={{ fontFamily: "'Cinzel', serif" }}
          aria-label="Open cart"
        >
          <CartIcon />
          {mounted && count() > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent-red text-cream text-[9px] flex items-center justify-center font-bold">
              {count()}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
