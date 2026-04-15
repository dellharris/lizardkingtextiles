import OrnamentalDivider from "./OrnamentalDivider";

export default function Footer() {
  return (
    <footer className="px-8 pb-16 pt-4">
      <OrnamentalDivider />
      <div className="flex flex-col items-center gap-4 text-center">
        <p
          className="font-gothic text-2xl text-ink"
          style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
        >
          Lizard King Textiles
        </p>
        <p
          className="font-mono text-[10px] uppercase tracking-widest text-muted"
          style={{ fontFamily: "'Courier Prime', monospace" }}
        >
          Handmade · Faith · Textile Art
        </p>
        <div className="flex gap-6 mt-2">
          <a
            href="https://lizardkingtextiles.bigcartel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[10px] uppercase tracking-widest text-muted hover:text-accent-red transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            BigCartel
          </a>
          <a
            href="mailto:contact@lizardkingtextiles.com"
            className="font-display text-[10px] uppercase tracking-widest text-muted hover:text-accent-red transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Contact
          </a>
        </div>
        <p
          className="font-mono text-[9px] text-muted/50 mt-2"
          style={{ fontFamily: "'Courier Prime', monospace" }}
        >
          © {new Date().getFullYear()} Lizard King Textiles. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
