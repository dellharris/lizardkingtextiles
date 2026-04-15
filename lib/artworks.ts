export type PrintSize = {
  label: string;
  price: number;
};

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  images: string[];
  type: "original" | "print";
  available: boolean;
  price?: number;
  printSizes?: PrintSize[];
  tags: string[];
  seriesNote?: string;
};

export const artworks: Artwork[] = [
  {
    slug: "protect-me-from-what-i-want",
    title: "Protect Me From What I Want",
    year: 2024,
    medium: "Acrylic / cotton on monks cloth",
    dimensions: "31in × 27in",
    description:
      "Explores the tension between desire, faith, and personal transformation. The title functions as both a reflection and a prayer — an acknowledgment that the things we believe we want are not always aligned with what we truly need or deserve. The work speaks to the process of pursuing dreams and purpose while confronting the difficulty of letting go of attachments that no longer serve that path.\n\nAt the center of the composition are intertwined horses inspired by Pharaoh's Horses by John Frederick Herring Sr., whose work is known for capturing the raw power and motion of horses. In this piece, the horses symbolize ambition, instinct, and the untamed force of desire that drives human action. Their movement suggests both momentum and struggle, reflecting the complexity of navigating personal aspiration.\n\nEncircling them is a crown of thorns, invoking themes of sacrifice, endurance, and spiritual trial. The imagery draws from Christian symbolism, representing the understanding that growth and purpose often require suffering, patience, and faith.\n\nThe cloaked figures positioned below act as silent witnesses to this tension. Their crosses reference devotion, humility, and spiritual guidance, grounding the composition in the artist's belief that faith provides clarity in moments of uncertainty.\n\nProtect Me From What I Want ultimately asks for protection not from ambition itself, but from desires that may lead away from purpose, trust, and spiritual direction.",
    seriesNote: "THIS IS A PRAYER",
    images: ["/artwork/protect-me-artist.jpg", "/artwork/protect-me-detail.jpg"],
    type: "original",
    available: true,
    tags: ["textile", "mixed-media", "faith", "horses", "prayer"],
  },
  {
    slug: "holy-ground",
    title: "Holy Ground",
    year: 2024,
    medium: "Acrylic / cotton on monks cloth",
    dimensions: "36in × 36in",
    description:
      "A meditation on sacred space and the ground beneath our feet. What we stand on shapes who we become. This piece explores the intersection of the earthly and the divine, the ordinary and the consecrated.",
    images: ["/artwork/holy-ground.jpg"],
    type: "original",
    available: true,
    tags: ["textile", "faith", "sacred"],
  },
  {
    slug: "crown-of-thorns-print",
    title: "Crown of Thorns",
    year: 2024,
    medium: "Fine art archival print",
    dimensions: "Various",
    description:
      "Archival giclée print of the original textile work. Printed on 300gsm heavyweight cotton rag. Each print is signed and numbered in an edition of 50.",
    images: ["/artwork/crown-print.jpg"],
    type: "print",
    available: true,
    price: 85,
    printSizes: [
      { label: '8" × 10"', price: 45 },
      { label: '11" × 14"', price: 65 },
      { label: '18" × 24"', price: 85 },
    ],
    tags: ["print", "archival", "faith"],
  },
  {
    slug: "silent-witness",
    title: "Silent Witness",
    year: 2024,
    medium: "Cotton on monks cloth",
    dimensions: "24in × 30in",
    description:
      "Figures cloaked in devotion. The witness is not passive — to witness is to testify, to carry the weight of what has been seen. A study in presence, patience, and the sacred act of bearing witness.",
    images: ["/artwork/silent-witness.jpg"],
    type: "original",
    available: false,
    tags: ["textile", "figures", "faith"],
  },
];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAvailableArtworks(): Artwork[] {
  return artworks.filter((a) => a.available);
}
