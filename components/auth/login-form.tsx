"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { Eye, EyeOff, LogIn, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(password)
    if (!success) {
      setError("Невірний пароль")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-3xl font-bold mb-2">
            <span className="text-gray-900">Само</span>
            <span className="text-orange-500">Гуру</span>
          </div>
          <CardTitle className="text-xl">Вхід до системи</CardTitle>
          <CardDescription>Увійдіть до платформи для співробітників ресторану</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              <LogIn className="h-4 w-4 mr-2" />
              Увійти
            </Button>
          </form>

          <Alert className="mt-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <div className="font-medium mb-2">Тестові паролі:</div>
              <div className="space-y-1 text-xs">
                <div>
                  <strong>waiter123</strong> - Офіціант
                </div>
                <div>
                  <strong>helper123</strong> - Помічник
                </div>
                <div>
                  <strong>trainee123</strong> - Стажер
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <div className="text-xs text-gray-600 text-center">
              <strong>FF:</strong> Реєстрація та серверна автентифікація будуть додані пізніше
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
