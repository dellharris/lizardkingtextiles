export default function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 ${className}`}>
      <div className="flex-1 h-px bg-ink/20" />
      <svg
        width="160"
        height="28"
        viewBox="0 0 160 28"
        fill="none"
        className="flex-shrink-0 text-ink"
      >
        {/* Left star */}
        <text x="8" y="20" fontSize="16" fill="currentColor" textAnchor="middle">★</text>
        {/* Left dot */}
        <circle cx="34" cy="14" r="2" fill="currentColor" />
        {/* Center sun/star burst */}
        <g transform="translate(80,14)">
          {/* Radiating lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="0"
              y1="-5"
              x2="0"
              y2="-10"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="0" r="3" fill="#FDFAF4" />
          <circle cx="0" cy="0" r="1.5" fill="currentColor" />
        </g>
        {/* Right dot */}
        <circle cx="126" cy="14" r="2" fill="currentColor" />
        {/* Right star */}
        <text x="152" y="20" fontSize="16" fill="currentColor" textAnchor="middle">★</text>
      </svg>
      <div className="flex-1 h-px bg-ink/20" />
    </div>
  );
}
