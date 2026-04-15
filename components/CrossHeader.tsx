export default function CrossHeader({
  children,
  className = "",
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "lg";
}) {
  const crossSize = size === "lg" ? 28 : 20;
  const textClass =
    size === "lg"
      ? "text-3xl md:text-4xl lg:text-5xl"
      : "text-xl md:text-2xl";

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <CrossSVG size={crossSize} />
      <h1
        className={`${textClass} font-gothic text-ink text-center leading-none tracking-tight`}
        style={{ fontFamily: "'UnifrakturMaguntia', serif" }}
      >
        {children}
      </h1>
      <CrossSVG size={crossSize} />
    </div>
  );
}

function CrossSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 22 28"
      fill="none"
      className="text-ink flex-shrink-0"
    >
      {/* Orthodox-style cross */}
      <rect x="9" y="0" width="4" height="28" fill="currentColor" />
      <rect x="0" y="8" width="22" height="4" fill="currentColor" />
    </svg>
  );
}
