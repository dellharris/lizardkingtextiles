"use client";

type Filter = "all" | "originals" | "prints" | "available" | "sold";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Works" },
  { value: "originals", label: "Originals" },
  { value: "prints", label: "Prints" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
];

export default function FilterBar({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-pill ${active === f.value ? "active" : ""}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export type { Filter };
