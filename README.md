# Lizard King Textiles

Visual artist website for **Lizard King Textiles** — handmade textile art.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- **Stripe**: get keys from [dashboard.stripe.com](https://dashboard.stripe.com/apikeys)
- **Resend**: get key from [resend.com](https://resend.com) for inquiry emails

### 2. Add Artwork Images

Place artwork images in `/public/artwork/`:

```
public/artwork/
  protect-me-artist.jpg     ← photo of artist with the piece
  protect-me-detail.jpg     ← detail/close-up shot
  holy-ground.jpg
  crown-print.jpg
  silent-witness.jpg
  placeholder.jpg           ← fallback (any placeholder image)
```

### 3. Update Artwork Data

Edit `lib/artworks.ts` to add/edit works:

```ts
{
  slug: "my-piece",
  title: "My Piece Title",
  year: 2024,
  medium: "Acrylic / cotton on monks cloth",
  dimensions: "24in × 30in",
  description: "...",
  images: ["/artwork/my-piece.jpg"],
  type: "original",      // "original" | "print"
  available: true,
  tags: ["textile", "faith"],
}
```

Prints get `printSizes`:
```ts
printSizes: [
  { label: '8" × 10"', price: 45 },
  { label: '11" × 14"', price: 65 },
]
```

### 4. Enable Live Stripe Payments

Uncomment the Stripe block in `app/api/checkout/route.ts` and add your secret key to `.env.local`.

### 5. Enable Email Inquiries

Uncomment the Resend block in `app/api/inquiry/route.ts` and add your API key + contact email to `.env.local`.

## Deployment

This is a standard Next.js app. Export and host anywhere that supports Node.js:

```bash
npm run build
npm start
```

Or deploy to Vercel: drag the folder into [vercel.com/new](https://vercel.com/new).
