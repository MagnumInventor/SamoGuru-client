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
  login: (password: string) => boolean
  logout: () => void
  isAuthenticated: () => boolean
}

// ЗАХІД ЧЕРЕЗ СТАТИЧНИЙ ПАРОЛЬ
const VALID_PASSWORDS: Record<string, { role: string; name: string; surname: string }> = {
  samoguru123: { role: "admin", name: "Адміністратор", surname: "системи" },
  waiter123: { role: "waiter", name: "Офіціант", surname: "тестовий" },
  helper123: { role: "helper", name: "Помічник", surname: "навчальний" },
}


// ПОВНОЦІННА РЕЄСТРАЦІЯ
export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (password: string) => {
        const userInfo = VALID_PASSWORDS[password]
        if (userInfo) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            firstName: userInfo.name,
            lastName: userInfo.surname,
            phone: "+380 XX XXX XX XX",
            role: userInfo.role as any,
            isAuthenticated: true,
          }
          set({ user })
          return true
        }
        return false
      },
      logout: () => set({ user: null }),
      isAuthenticated: () => !!get().user?.isAuthenticated,
    }),
    {
      name: "samoguru-auth",
    },
  ),
)

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
