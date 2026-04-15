import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject, artworkTitle, artworkSlug } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // --- Email integration ---
    // To enable email sending, add one of these to .env.local:
    //
    // Option 1: Resend (recommended)
    // RESEND_API_KEY=re_xxxxx
    // CONTACT_EMAIL=your@email.com
    //
    // Then uncomment:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@lizardkingtextiles.com",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: artworkTitle
    //     ? `Inquiry: ${artworkTitle}`
    //     : subject || "Contact Form Submission",
    //   html: `
    //     <p><strong>From:</strong> ${name} (${email})</p>
    //     ${artworkTitle ? `<p><strong>Artwork:</strong> ${artworkTitle}</p>` : ""}
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    //   replyTo: email,
    // });

    // Dev: log to console
    console.log("Inquiry received:", { name, email, subject, artworkTitle, artworkSlug, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
