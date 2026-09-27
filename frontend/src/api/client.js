const BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const keys = {
  access: 'stms_access_token',
  refresh: 'stms_refresh_token',
  user: 'stms_user',
}

export const session = {
  get token() {
    return localStorage.getItem(keys.access)
  },
  get user() {
    try {
      return JSON.parse(localStorage.getItem(keys.user) || 'null')
    } catch {
      return null
    }
  },
  save(user) {
    localStorage.setItem(keys.user, JSON.stringify(user))
  },
  clear() {
    Object.values(keys).forEach((k) => localStorage.removeItem(k))
  },
  setTokens(access, refresh) {
    localStorage.setItem(keys.access, access)
    localStorage.setItem(keys.refresh, refresh)
  },
  get refreshToken() {
    return localStorage.getItem(keys.refresh)
  },
}

async function request(method, path, body, form = false, retry = true) {
  const headers = {}
  if (session.token) {
    headers.Authorization = `Bearer ${session.token}`
  }
  if (body && !form) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(BASE + path, {
    method,
    headers,
    ...(body ? { body: form ? body : JSON.stringify(body) } : {}),
  })

  if (res.status === 401 && retry && !path.startsWith('/auth/')) {
    const rt = session.refreshToken
    if (rt) {
      const r = await fetch(BASE + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: rt }),
      })
      if (r.ok) {
        const d = await r.json()
        session.setTokens(d.access_token, d.refresh_token)
        return request(method, path, body, form, false)
      }
    }
    session.clear()
    throw new Error('Session expired. Please sign in again.')
  }

  if (res.status === 204) return null

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const detail = data.detail
    throw new Error(
      Array.isArray(detail)
        ? detail.map((x) => x.msg || x.message).join(', ')
        : typeof detail === 'string'
          ? detail
          : data.message || `Request failed (${res.status})`
    )
  }

  return data
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
  upload: (path, formData) => request('POST', path, formData, true),
}

export default api
