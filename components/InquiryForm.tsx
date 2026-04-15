"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  artworkTitle: string;
  artworkSlug: string;
  onClose: () => void;
};

export default function InquiryForm({ artworkTitle, artworkSlug, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, artworkTitle, artworkSlug }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-cream border-[3px] border-ink w-full max-w-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b-[2px] border-ink px-8 py-6 flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1"
                style={{ fontFamily: "'Courier Prime', monospace" }}>
                Inquiry for Original Work
              </p>
              <h3
                className="font-gothic text-2xl leading-tight"
                style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
              >
                {artworkTitle}
              </h3>
            </div>
            <button onClick={onClose} className="text-ink hover:text-accent-red mt-1" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {status === "sent" ? (
              <div className="text-center py-8">
                <p className="font-gothic text-3xl mb-3" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>
                  Thank You
                </p>
                <p className="font-display text-sm text-muted uppercase tracking-wider"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  Your inquiry has been received. We'll be in touch shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 font-display text-[11px] uppercase tracking-widest border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2"
                    style={{ fontFamily: "'Courier Prime', monospace" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-[1.5px] border-ink/40 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:border-ink transition-colors"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2"
                    style={{ fontFamily: "'Courier Prime', monospace" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border-[1.5px] border-ink/40 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:border-ink transition-colors"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2"
                    style={{ fontFamily: "'Courier Prime', monospace" }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border-[1.5px] border-ink/40 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:border-ink transition-colors resize-none"
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                    placeholder="Tell us about your interest in this piece..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-accent-red font-mono text-xs" style={{ fontFamily: "'Courier Prime', monospace" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-4 hover:bg-accent-red transition-colors disabled:opacity-60"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {status === "sending" ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
