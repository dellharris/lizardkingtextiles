"use client";

import { useState } from "react";
import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-[100px] px-6 max-w-xl mx-auto">
      <CrossHeader className="mb-2">Contact</CrossHeader>
      <OrnamentalDivider />

      {status === "sent" ? (
        <div className="text-center py-16">
          <p className="font-gothic text-4xl mb-4" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>
            Message Received
          </p>
          <p className="font-display text-sm text-muted uppercase tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { key: "name", label: "Name", type: "text", required: true },
            { key: "email", label: "Email", type: "email", required: true },
            { key: "subject", label: "Subject", type: "text", required: false },
          ].map(({ key, label, type, required }) => (
            <div key={key}>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2"
                style={{ fontFamily: "'Courier Prime', monospace" }}>
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

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-2"
              style={{ fontFamily: "'Courier Prime', monospace" }}>
              Message
            </label>
            <textarea
              rows={6}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-[1.5px] border-ink/40 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:border-ink transition-colors resize-none"
              style={{ fontFamily: "'Courier Prime', monospace" }}
            />
          </div>

          {status === "error" && (
            <p className="text-accent-red font-mono text-xs" style={{ fontFamily: "'Courier Prime', monospace" }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-ink text-cream font-display text-[11px] uppercase tracking-widest py-4 hover:bg-accent-red transition-colors disabled:opacity-60"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      <Footer />
    </div>
  );
}
