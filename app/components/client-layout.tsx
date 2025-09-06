"use client"

import { useAuthStore } from "@/app/store/authStore"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isVerified } = useAuthStore()

  return (
    <div className="min-h-screen w-full px-4 md:px-6 lg:px-8">
      {user && isVerified && <Navigation />}
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}