import { NextResponse } from "next/server";
import { rateLimited, requestIp } from "@/lib/server/rate-limit";
import { databaseConfigured, supabaseRequest } from "@/lib/server/supabase";
import { cleanText, isBot, validEmail } from "@/lib/validation";

export async function POST(request: Request) {
  if (rateLimited(`contact:${requestIp(request)}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });
  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const subject = cleanText(body.subject, 140);
  const message = cleanText(body.message, 4000);
  if (name.length < 2 || !validEmail(email) || subject.length < 3 || message.length < 10) return NextResponse.json({ error: "Please complete every field with a valid email and message." }, { status: 400 });
  if (!databaseConfigured) return NextResponse.json({ error: "The contact form is not connected yet. Please email me directly." }, { status: 503 });
  try {
    await supabaseRequest("contact_messages", { method: "POST", body: JSON.stringify({ name, email, subject, message }) });
    return NextResponse.json({ ok: true, message: "Thank you — your message has been received." });
  } catch {
    return NextResponse.json({ error: "Your message could not be saved. Please email me directly." }, { status: 500 });
  }
}
