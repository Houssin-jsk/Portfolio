import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { slotsForDate } from "@/lib/server/booking";
import { rateLimited, requestIp } from "@/lib/server/rate-limit";
import { databaseConfigured, supabaseRequest } from "@/lib/server/supabase";
import { cleanText, isBot, validEmail } from "@/lib/validation";

export async function POST(request: Request) {
  if (rateLimited(`booking:${requestIp(request)}`, 4, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  if (isBot(body)) return NextResponse.json({ ok: true });
  const fullName = cleanText(body.fullName, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const message = cleanText(body.message, 1200);
  const date = cleanText(body.date, 10);
  const time = cleanText(body.time, 5);
  if (fullName.length < 2 || !validEmail(email) || !slotsForDate(date).includes(time)) {
    return NextResponse.json({ error: "Please check your name, email, date, and time." }, { status: 400 });
  }
  if (!databaseConfigured) {
    return NextResponse.json({ error: "Booking is not connected yet. Please use the contact form or email instead." }, { status: 503 });
  }
  try {
    await supabaseRequest("bookings", {
      method: "POST",
      body: JSON.stringify({ full_name: fullName, email, message: message || null, booking_date: date, booking_time: time, timezone: siteConfig.personal.timezone }),
    });
    return NextResponse.json({ ok: true, message: `Your meeting request for ${date} at ${time} has been received.` });
  } catch (error) {
    const duplicate = error instanceof Error && (error.message.includes("23505") || error.message.includes("duplicate"));
    return NextResponse.json({ error: duplicate ? "That time was just booked. Please choose another slot." : "Your booking could not be saved. Please try again." }, { status: duplicate ? 409 : 500 });
  }
}
