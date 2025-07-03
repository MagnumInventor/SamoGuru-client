"use client"

import type React from "react"

import { useAuth } from "@/backend/auth"
import { LoginForm } from "./login-form"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "waiter" | "helper" | "admin" | "trainee "
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return <LoginForm />
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Доступ заборонено</h1>
          <p className="text-gray-600">У вас немає прав для перегляду цієї сторінки</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
