"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Navigation } from "@/components/navigation"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Navigation />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </ProtectedRoute>
  )
}
