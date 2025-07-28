"use client"

import type React from "react"

import { ProtectedRoute } from "@/src/components/auth/protected-route"
import { Navigation } from "@/src/components/navigation"
import { Footer } from "@/src/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
