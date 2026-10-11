import "server-only";

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const databaseConfigured = Boolean(url && key);

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  if (!url || !key) throw new Error("Database is not configured");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Database request failed (${response.status}): ${detail}`);
  }
  if (response.status === 204) return null;
  return response.json();
}
