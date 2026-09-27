import { api, session } from './client'

export async function signIn(email, password) {
  const data = await api.post('/auth/login', { email, password })
  session.setTokens(data.access_token, data.refresh_token)
  const user = await api.get('/auth/me')
  session.save(user)
  return user
}

export async function signOut() {
  try {
    const rt = session.refreshToken
    if (rt) {
      await api.post('/auth/logout', { refresh_token: rt })
    }
  } catch {
    // ignore logout errors
  }
  session.clear()
}

export async function getCurrentUser() {
  return api.get('/auth/me')
}
