"use client"

import { create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"
import type { StateCreator } from "zustand"

export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "waiter" | "helper" | "admin" | "trainee"
  token: string
}

interface AuthStore {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    role: string
    token?: string
  }) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isAuthenticated: () => boolean
}

const API_URL = "/api"

/**
 * Fix for Zustand v4/v5 type error with persist middleware.
 * 
 * If you are using Zustand v4 or above, you need to type your store creator
 * with the Persist middleware type. Import and use `PersistOptions`:
 */
type AuthStorePersist = (
  set: Parameters<StateCreator<AuthStore>>[0],
  get: Parameters<StateCreator<AuthStore>>[1],
  api: Parameters<StateCreator<AuthStore>>[2]
) => AuthStore

const authStore: AuthStorePersist = (set, get) => ({
  user: null,
  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      if (data.token && data.user) {
        set({ user: { ...data.user, token: data.token } })
        return true
      }
      return false
    } catch {
      return false
    }
  },
  register: async ({
    firstName,
    lastName,
    email,
    password,
    token,
    phone,
    role,
  }) => {
    try {
      if (role !== "trainee" && !token) {
        return { 
          success: false, 
          message: "Токен обов'язковий для цієї ролі" 
        };
      }

      const payload: {
        email: string;
        password: string;
        phone: string;
        firstName: string;
        lastName: string;
        role: string;
        profile: {
          name: string;
          position: string;
          department: string;
        };
        token?: string;
      } = {
        email,
        password,
        phone,
        firstName,
        lastName,
        role,
        profile: {
          name: `${firstName} ${lastName}`,
          position: role,
          department: "",
        },
      };

      if (token) {
        payload.token = token;
      }

      const res = await fetch(`/api/auth/register-employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (res.ok) {
        return { success: true, message: data.message || "Реєстрація успішна" };
      }
      return { success: false, message: data.message || "Помилка при реєстрації" };
    } catch {
      return { success: false, message: "Помилка мережі, перевірте з'єднання" };
    }
  },
  logout: () => set({ user: null }),
  isAuthenticated: () => !!get().user?.token,
})

export const useAuth = create<AuthStore>()(
  persist(authStore, {
    name: "samoguru-auth",
  })
)

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "waiter":
      return "Фіц"
    case "helper":
      return "Малий/мала"
    case "trainee":
      return "Стажер"
    case "admin":
      return "Адмін"
    default:
      return role
  }
}






{/* ТИМЧАСОВИЙ ЗАХІД ЧЕРЕЗ СТАТИЧНИЙ ПАРОЛЬ
const VALID_PASSWORDS: Record<string, { role: string; name: string; surname: string }> = {
  admin123: { role: "admin", name: "Адміністратор", surname: "системи" },
  waiter123: { role: "waiter", name: "Офіціант", surname: "тестовий" },
  helper123: { role: "helper", name: "Помічник", surname: "робочий" },
  trainee123: { role: "trainee", name: "Стажер", surname: "навчальний" },
}
*/}



// ПОВНОЦІННА РЕЄСТРАЦІЯ
// (Disabled: see backend implementation above)