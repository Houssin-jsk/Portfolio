export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validEmail(value: string) {
  return value.length <= 254 && emailPattern.test(value);
}

export function isBot(body: Record<string, unknown>) {
  return Boolean(cleanText(body.website, 200));
}
