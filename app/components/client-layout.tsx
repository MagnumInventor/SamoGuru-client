"use client"

import { useAuthStore } from "@/app/store/authStore"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isVerified } = useAuthStore()

  return (
    <div className="min-h-screen w-full">
      {user && isVerified && <Navigation />}
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}