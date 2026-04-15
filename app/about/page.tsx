import CrossHeader from "@/components/CrossHeader";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="pt-[100px] px-6 max-w-3xl mx-auto">
      <CrossHeader className="mb-2">About</CrossHeader>
      <OrnamentalDivider />

      <div className="space-y-6 font-body text-lg leading-relaxed text-ink"
        style={{ fontFamily: "'Crimson Text', Georgia, serif" }}>
        <p>
          <strong>Lizard King Textiles</strong> is a handmade textile art practice rooted in faith,
          symbolism, and the tension between desire and purpose. Each piece is created by hand —
          acrylic paint and cotton thread on monks cloth — a labor-intensive process that mirrors
          the themes embedded in the work itself.
        </p>
        <p>
          The work draws heavily from Christian symbolism: crosses, crowns of thorns, cloaked
          figures, and celestial imagery. These are not decorative choices — they are a visual
          language for navigating doubt, transformation, and the pursuit of something larger than
          personal ambition.
        </p>
        <p>
          Each piece begins with a question. The making is the prayer.
        </p>

        <OrnamentalDivider />

        <div className="grid grid-cols-2 gap-6 font-mono text-sm text-muted"
          style={{ fontFamily: "'Courier Prime', monospace" }}>
          <div>
            <p className="uppercase tracking-widest text-[10px] mb-2">Medium</p>
            <p>Acrylic on monks cloth</p>
            <p>Cotton thread</p>
            <p>Mixed media</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-[10px] mb-2">Practice</p>
            <p>Handmade originals</p>
            <p>Limited prints</p>
            <p>Commission inquiries open</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
