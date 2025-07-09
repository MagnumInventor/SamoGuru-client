"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/backend/auth"
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react"
// NEW V13 imports:
import axios from 'axios'
import { Link } from 'react-router-dom'

export function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: "",
    phone: "",
    role: "",
  })
  const [error, setError] = useState("")

const { login, register } = useAuth();


// ПРИЙМАЧ ЗАПИТУ
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  // TOKEN CHECK

  setError("");
  if (isRegistering) {
    // For waiter/helper require token, for trainee skip token validation
              if (formData.role !== "trainee") {
                const tokenRes = await fetch("/api/auth/validate-token", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token: formData.token }),
                });
                const tokenData = await tokenRes.json();
                if (!tokenData.valid) {
                  setError(tokenData.message ?? "Токен недійсний");
                  return;
                }
              }
              
    // Register user
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: formData.role !== "trainee" ? formData.token : undefined,
      phone: formData.phone,
      role: formData.role,
    });
    if (!result.success) setError(result.message);
    else setIsRegistering(false);
  } else {
    const success = await login(formData.email, formData.password);
    if (!success) setError("Невірна ел.пошта або пароль");
  }

  {/*
  // AXIOS POST METHOD
  axios.post('', {firstName, password, })
  */}
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
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Введіть ім'я"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Введіть прізвище"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Номер телефону</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+380 XX XXX XX XX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Введіть email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Посада у ресторані</Label>
                  <Select
                    value={formData.role}
                    onValueChange={value => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Адміністратор</SelectItem>
                      <SelectItem value="waiter">Офіціант</SelectItem>
                      <SelectItem value="helper">Помічник офіціанта</SelectItem>
                      <SelectItem value="trainee">Стажер</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.role !== "trainee" && (
                  <div>
                    <Label htmlFor="token">Токен запрошення</Label>
                    <Input
                      id="token"
                      value={formData.token}
                      onChange={e => setFormData({ ...formData, token: e.target.value })}
                      placeholder="Введіть 5-значний токен"
                      required
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
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
            <div>
              <Label htmlFor="email">Електронна пошта</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email" // Пошта завжди відображається як email
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Введіть ел.пошту"
                  required
                />
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
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    token: "",
                    phone: "",
                    role: "",
                  })
                }}
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








