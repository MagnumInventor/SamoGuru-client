"use client"

import { useState } from "react"
import { useAuthStore } from "@/app/store/authStore"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Separator } from "../components/ui/separator"
import { Alert, AlertDescription } from "../components/ui/alert"
import { User, Briefcase, Edit, Save, X, Mail, Calendar, CheckCircle, XCircle, Shield } from "lucide-react"
import { RoleBadge } from "../components/role-badge"

function formatDate(dateString?: string | Date) {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function calculateWorkDuration(entryDate?: string | Date) {
  if (!entryDate) return "-"
  const now = new Date()
  const entry = new Date(entryDate)
  const diffTime = Math.abs(now.getTime() - entry.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const months = Math.floor(diffDays / 30)
  const days = diffDays % 30
  if (months > 0) {
    return `${months} міс. ${days} дн.`
  }
  return `${days} дн.`
}

export default function UserProfilePage() {
  const { user, isLoading, error, clearError } = useAuthStore()
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  })
  const [saving, setSaving] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Завантаження профілю...</p>
        </div>
      </div>
    )
  }

  if (error || localError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            {error || localError}
            <Button variant="outline" size="sm" className="ml-4 bg-transparent" onClick={clearError}>
              Спробувати знову
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Користувача не знайдено</p>
        </div>
      </div>
    )
  }

  // Dummy save handler (replace with API call if needed)
  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      // Here you would call your API to update the user profile
      // For demo, just update local state
      setEditing(false)
      setLocalError(null)
    } catch (err) {
      setLocalError("Помилка оновлення профілю")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Особистий профіль</h1>
        <RoleBadge role={user.role} size="lg" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Основна інформація
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder-user.jpg" alt={`${user.firstName} ${user.lastName || ""}`} />
                <AvatarFallback className="text-2xl">
                  {user.firstName?.[0]}
                  {user.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" disabled>
                Змінити фото
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {editing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input
                      id="firstName"
                      value={editData.firstName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Введіть ім'я"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      value={editData.lastName}
                      onChange={(e) => setEditData((prev) => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Введіть прізвище"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Ім'я та прізвище
                    </Label>
                    <p className="text-lg font-medium">
                      {user.firstName} {user.lastName || ""}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Електронна пошта
                    </Label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Стаж роботи
                </Label>
                <p className="text-lg">
                  {calculateWorkDuration(user.entryDate)}
                  <span className="text-sm text-muted-foreground ml-2">(з {formatDate(user.entryDate)})</span>
                </p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Дата реєстрації
                </Label>
                <p className="text-lg">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <Label>Статус акаунта</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.isVerified ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600">Підтверджено</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-600">Не підтверджено</span>
                  </>
                )}
              </div>
              <RoleBadge role={user.role} />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <Label>Редагування профілю</Label>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditing(false)
                      setEditData({
                        firstName: user.firstName,
                        lastName: user.lastName || "",
                      })
                    }}
                    disabled={saving}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Скасувати
                  </Button>
                  <Button size="sm" onClick={handleSaveProfile} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Збереження..." : "Зберегти"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Редагувати
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Інформація про роль
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Поточна роль</Label>
              <RoleBadge role={user.role} size="lg" />
            </div>
            <div className="text-sm text-muted-foreground">
              {user.role === "trainee" &&
                "Стажер має базовий доступ до системи та може переглядати навчальні матеріали."}
              {user.role === "helper" && "Хелпер має розширений доступ та може допомагати в обслуговуванні."}
              {user.role === "waiter" &&
                "Офіціант має повний доступ до системи обслуговування та може керувати замовленнями."}
              {user.role === "admin" &&
                "Адміністратор має повний доступ до всіх функцій системи, включаючи управління користувачами."}
            </div>
            {user.role === "admin" && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Ви маєте права адміністратора. Будьте обережні при внесенні змін до системи.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
                    {saving ? "Збереження..." : "Зберегти"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Редагувати
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Інформація про роль
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Поточна роль</Label>
              <RoleBadge role={user.role} size="lg" />
            </div>

            <div className="text-sm text-muted-foreground">
              {user.role === "trainee" &&
                "Стажер має базовий доступ до системи та може переглядати навчальні матеріали."}
              {user.role === "helper" && "Хелпер має розширений доступ та може допомагати в обслуговуванні."}
              {user.role === "waiter" &&
                "Офіціант має повний доступ до системи обслуговування та може керувати замовленнями."}
              {user.role === "admin" &&
                "Адміністратор має повний доступ до всіх функцій системи, включаючи управління користувачами."}
            </div>

            {user.role === "admin" && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Ви маєте права адміністратора. Будьте обережні при внесенні змін до системи.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
