import { NextResponse } from "next/server";
import { rateLimited, requestIp } from "@/lib/server/rate-limit";
import { databaseConfigured, supabaseRequest } from "@/lib/server/supabase";
import { cleanText, isBot, validEmail } from "@/lib/validation";

export async function GET() {
  if (!databaseConfigured) return NextResponse.json({ testimonials: [], configured: false });
  try {
    const rows = await supabaseRequest("testimonials?status=eq.approved&select=id,name,comment,created_at&order=created_at.desc&limit=12");
    return NextResponse.json({ testimonials: rows, configured: true });
  } catch {
    return NextResponse.json({ testimonials: [], configured: true }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (rateLimited(`testimonial:${requestIp(request)}`, 3, 60 * 60_000)) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });
  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const comment = cleanText(body.comment, 1200);
  if (name.length < 2 || !validEmail(email) || comment.length < 10) return NextResponse.json({ error: "Please provide your name, a valid private email, and a meaningful comment." }, { status: 400 });
  if (!databaseConfigured) return NextResponse.json({ error: "Comments are not connected yet. Please try again later." }, { status: 503 });
  try {
    await supabaseRequest("testimonials", { method: "POST", body: JSON.stringify({ name, email, comment, status: "pending" }) });
    return NextResponse.json({ ok: true, message: "Thank you. Your comment is pending review and is not public yet." });
  } catch {
    return NextResponse.json({ error: "Your comment could not be submitted." }, { status: 500 });
  }
}
