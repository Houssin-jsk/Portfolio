import "server-only";
import { siteConfig } from "@/config/site";

const { availability } = siteConfig;

function minutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function todayInMorocco() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: siteConfig.personal.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function nowParts() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.personal.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

export function validBookingDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayInMorocco()) return false;
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  return availability.workingDays.includes(day as 1 | 2 | 3 | 4 | 5) && !availability.unavailableDates.includes(date);
}

export function slotsForDate(date: string) {
  if (!validBookingDate(date)) return [];
  const start = minutes(availability.startTime);
  const end = minutes(availability.endTime);
  const now = nowParts();
  const localToday = `${now.year}-${now.month}-${now.day}`;
  const earliest = date === localToday
    ? Number(now.hour) * 60 + Number(now.minute) + availability.minimumNoticeHours * 60
    : -1;
  const slots: string[] = [];
  for (let value = start; value + availability.slotMinutes <= end; value += availability.slotMinutes) {
    if (value < earliest) continue;
    slots.push(`${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`);
  }
  return slots;
}
