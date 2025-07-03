"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  // id: string
  firstName: string
  lastName: string
  phone: string
  role: "waiter" | "helper" | "admin" | "trainee"
  token: boolean
}

interface AuthStore {
  user: User | null
  login: (phone: string, password: string) => Promise<boolean>
  register: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    role: string
    token?: boolean
  }) => Promise<{ success: boolean; message: string}>
  logout: () => void
  isAuthenticated: () => boolean
}

const API_URL = "/api" // or locarhost:5000

// BACKEND LOGIN 
export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: async ( phone: string, password: string) => {
        try {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, password}),
          })
          if (!res.ok) return false
          const data = await res.json()
          if (data.token && data.user) {
            set({ user: { ...data.user, token: data.token} })
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
    const res = await fetch(`/api/auth/register-employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        token,
        phone,
        firstName,
        lastName,
        role,
        profile: {
          name: `${firstName} ${lastName}`,
          position: role,
          department: "", // You can add a department field to your form if needed
        },
      }),
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
    }),
    {
      name: "samoguru-auth",
    }
  )
)



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

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "waiter":
      return "Фіц"
    case "helper":
      return "Малий/мала"
    case "admin":
      return "Адмін"
    default:
      return role
  }
}
