//components/client-layout.tsx
"use client"

import type React from "react"
import { useAuthStore } from "@/app/store/authStore"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isVerified } = useAuthStore()

  // Show navigation only for authenticated users
  if (!isVerified || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}
