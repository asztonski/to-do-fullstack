const API_URL = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:4000";

export function getToken(): string | null {
  try { return localStorage.getItem("token"); } catch { return null; }
}
export function setToken(token: string | null) {
  try { token ? localStorage.setItem("token", token) : localStorage.removeItem("token"); } catch {}
}

/* auto-logout hook for 401 */
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(fn: () => void) { onUnauthorized = fn; }

export async function api<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: "omit" });
  if (!res.ok) {
    if (res.status === 401) { try { onUnauthorized?.(); } catch {} }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}
