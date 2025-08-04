"use client"

import type React from "react"

import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}
