"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react"

export function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    password: "",
  })
  const [error, setError] = useState("")

  



const { login } = useAuth();






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.password || formData.password.length < 6) {
      setError("Пароль має містити щонайменше 6 символів")
      return
    }

    if (isRegistering) {
      setError("Реєстрація наразі недоступна.")
      return
    } else {
      try {
        const success = await login(formData.password)
        if (!success) {
          setError("Невірний номер телефону або пароль")
        }
      } catch (err) {
        setError("Сталася помилка при вході.")
      }
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
          <CardTitle className="text-xl">{isRegistering ? "Реєстрація співробітника" : "Вхід до системи"}</CardTitle>
          <CardDescription>
            {isRegistering ? "Заповніть дані для реєстрації в системі" : "Увійдіть до платформи для співробітників"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Введіть ім'я"
                      required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Введіть прізвище"
                      required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Номер телефону</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+380 XX XXX XX XX"
                    required />
                </div>

                <div>
                  <Label htmlFor="role">Роль у ресторані</Label>
                  <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="waiter">Офіціант</SelectItem>
                      <SelectItem value="helper">Помічник офіціанта</SelectItem>
                      <SelectItem value="admin">Адміністратор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Введіть пароль"
                  required />
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
              {isRegistering ? (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Зареєструватися
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Увійти
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setIsRegistering(!isRegistering)
                  setError("")
                  setFormData({ firstName: "", lastName: "", phone: "", role: "", password: "" })
                } }
                className="text-orange-600 hover:text-orange-700"
              >
                {isRegistering ? "Вже маєте акаунт? Увійти" : "Немає акаунту? Зареєструватися"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}














{/*
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

          * FF Notice 
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <div className="text-xs text-gray-600 text-center">
              <strong>FF:</strong> Повноцінна реєстрація та серверна автентифікація будуть додані пізніше
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
*/}

