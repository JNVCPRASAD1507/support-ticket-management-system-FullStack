import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { session, signIn as apiSignIn, signOut as apiSignOut } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => session.user)

  const login = useCallback(async (email, password) => {
    const u = await apiSignIn(email, password)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    await apiSignOut()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      logout,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
