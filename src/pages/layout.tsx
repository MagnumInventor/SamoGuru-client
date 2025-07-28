import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ClientLayout } from "@/src/components/client-layout"

const inter = Inter({ subsets: ["latin"] })


{/*
export const metadata: Metadata = {
  title: "САМоГуру - Платформа для персоналу ресторану Ковчег",
  description: "Повноцінний путівник для стажерів та помічників, корисні функції для персоналу: інтерактивний розклад роботи, завдання, навчання, тестування, та багато іншого.",
}
*/}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
