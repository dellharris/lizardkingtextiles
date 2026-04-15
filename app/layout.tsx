import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Lizard King Textiles",
  description:
    "Handmade textile art — acrylic on monks cloth. Faith, symbolism, and the tension between desire and purpose.",
  openGraph: {
    title: "Lizard King Textiles",
    description: "Handmade textile art",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream min-h-screen">
        {/* Fixed border frame — decorative, matches seeded image */}
        <div className="page-frame" aria-hidden="true" />

        <Navigation />
        <CartDrawer />

        <main>{children}</main>
      </body>
    </html>
  );
}
