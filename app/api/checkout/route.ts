import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, total, email, name, address, city, state, zip } = body;

    // Validate required fields
    if (!email || !name || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // --- Stripe integration ---
    // To enable live payments:
    // 1. Add STRIPE_SECRET_KEY to .env.local
    // 2. Uncomment the Stripe code below
    //
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(total * 100),
    //   currency: "usd",
    //   metadata: { email, name, items: JSON.stringify(items) },
    //   receipt_email: email,
    // });
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    // Placeholder response for development
    console.log("Order received:", { email, name, address, city, state, zip, items, total });
    return NextResponse.json({ success: true, orderId: `LKT-${Date.now()}` });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
