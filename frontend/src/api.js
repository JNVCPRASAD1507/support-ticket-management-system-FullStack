const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const keys = {
  access: "stms_access_token",
  refresh: "stms_refresh_token",
  user: "stms_user",
};
export const session = {
  get token() {
    return localStorage.getItem(keys.access);
  },
  get user() {
    try {
      return JSON.parse(localStorage.getItem(keys.user) || "null");
    } catch {
      return null;
    }
  },
  save(user) {
    localStorage.setItem(keys.user, JSON.stringify(user));
  },
  clear() {
    Object.values(keys).forEach((k) => localStorage.removeItem(k));
  },
};
async function request(method, path, body, form = false, retry = true) {
  const headers = {};
  if (session.token) headers.Authorization = `Bearer ${session.token}`;
  if (body && !form) headers["Content-Type"] = "application/json";
  let res = await fetch(BASE + path, {
    method,
    headers,
    ...(body ? { body: form ? body : JSON.stringify(body) } : {}),
  });
  if (res.status === 401 && retry && !path.startsWith("/auth/")) {
    const rt = localStorage.getItem(keys.refresh);
    if (rt) {
      const r = await fetch(BASE + "/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: rt }),
      });
      if (r.ok) {
        const d = await r.json();
        localStorage.setItem(keys.access, d.access_token);
        localStorage.setItem(keys.refresh, d.refresh_token);
        return request(method, path, body, form, false);
      }
    }
    session.clear();
    throw Error("Session expired. Please sign in again.");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.detail;
    throw Error(
      Array.isArray(detail)
        ? detail.map((x) => x.msg || x.message).join(", ")
        : typeof detail === "string"
          ? detail
          : data.message || `Request failed (${res.status})`,
    );
  }
  return data;
}
export const api = {
  get: (p) => request("GET", p),
  post: (p, b) => request("POST", p, b),
  put: (p, b) => request("PUT", p, b),
  patch: (p, b) => request("PATCH", p, b),
  delete: (p) => request("DELETE", p),
  upload: (p, f) => request("POST", p, f, true),
};
export async function signIn(email, password) {
  const d = await api.post("/auth/login", { email, password });
  localStorage.setItem(keys.access, d.access_token);
  localStorage.setItem(keys.refresh, d.refresh_token);
  const u = await api.get("/auth/me");
  session.save(u);
  return u;
}
export async function signOut() {
  try {
    const rt = localStorage.getItem(keys.refresh);
    if (rt) await api.post("/auth/logout", { refresh_token: rt });
  } catch {}
  session.clear();
}
