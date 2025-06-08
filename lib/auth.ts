"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  role: "waiter" | "helper" | "admin"
  isAuthenticated: boolean
}

interface AuthStore {
  user: User | null
  login: (userData: Omit<User, "id" | "isAuthenticated">) => void
  logout: () => void
  isAuthenticated: () => boolean
}

// Base64 encoded "samoguru"
const STATIC_PASSWORD = "c2Ftb2d1cnU="

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => {
        const user: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          isAuthenticated: true,
        }
        set({ user })
      },
      logout: () => set({ user: null }),
      isAuthenticated: () => !!get().user?.isAuthenticated,
    }),
    {
      name: "samoguru-auth",
    },
  ),
)

export const validatePassword = (password: string): boolean => {
  const encodedPassword = btoa(password)
  return encodedPassword === STATIC_PASSWORD
}

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "waiter":
      return "Офіціант"
    case "helper":
      return "Помічник офіціанта"
    case "admin":
      return "Адміністратор"
    default:
      return role
  }
}
