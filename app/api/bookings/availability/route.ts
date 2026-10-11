import { NextResponse } from "next/server";
import { databaseConfigured, supabaseRequest } from "@/lib/server/supabase";
import { slotsForDate } from "@/lib/server/booking";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  const validSlots = slotsForDate(date);
  if (!validSlots.length) return NextResponse.json({ slots: [], configured: databaseConfigured });

  let reserved: string[] = [];
  if (databaseConfigured) {
    try {
      const rows = await supabaseRequest(`bookings?booking_date=eq.${date}&select=booking_time`);
      reserved = (rows as Array<{ booking_time: string }>).map((row) => row.booking_time.slice(0, 5));
    } catch {
      return NextResponse.json({ error: "Availability could not be loaded." }, { status: 503 });
    }
  }

  return NextResponse.json({
    slots: validSlots.filter((slot) => !reserved.includes(slot)),
    configured: databaseConfigured,
  });
}
