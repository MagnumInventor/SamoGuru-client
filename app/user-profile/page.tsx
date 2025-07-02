"use client"

import { useAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Phone, Briefcase, Clock, Camera, Edit, Save, X } from "lucide-react"
import type { User as UserType, Fine, WorkShift, InternshipProgress } from "@/lib/models/user"
import { ProfileCalendar } from "@/components/profile/profile-calendar"
import { SalaryCalculator } from "@/components/profile/salary-calculator"
import { FinesSection } from "@/components/profile/fines-section"
import { InternshipSection } from "@/components/profile/internship-section"
import { AdminPanel } from "@/components/profile/admin-panel"

export default function ProfilePage() {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<UserType | null>(null)
  const [fines, setFines] = useState<Fine[]>([])
  const [workShifts, setWorkShifts] = useState<WorkShift[]>([])
  const [internshipProgress, setInternshipProgress] = useState<InternshipProgress | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authUser?.id) {
      loadUserData()
    }
  }, [authUser])

  const loadUserData = async () => {
    if (!authUser?.id) return

    try {
      setLoading(true)

      // Load user data
      const userData = await fetch(`/api/users/${authUser.id}`)
      if (userData.ok) {
        const userJson = await userData.json()
        setUser(userJson)
        setEditedDescription(userJson.personalDescription || "")
      }

      // Load fines
      const finesData = await fetch(`/api/users/${authUser.id}/fines`)
      if (finesData.ok) {
        const finesJson = await finesData.json()
        setFines(finesJson)
      }

      // Load work shifts
      const shiftsData = await fetch(`/api/users/${authUser.id}/shifts`)
      if (shiftsData.ok) {
        const shiftsJson = await shiftsData.json()
        setWorkShifts(shiftsJson)
      }

      // Load internship progress for trainees
      if (authUser.role === "trainee") {
        const progressData = await fetch(`/api/users/${authUser.id}/internship`)
        if (progressData.ok) {
          const progressJson = await progressData.json()
          setInternshipProgress(progressJson)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDescription = async () => {
    if (!authUser?.id) return

    try {
      const response = await fetch(`/api/users/${authUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalDescription: editedDescription }),
      })

      if (response.ok) {
        setUser((prev) => (prev ? { ...prev, personalDescription: editedDescription } : null))
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating description:", error)
    }
  }

  const getWorkDuration = () => {
    if (!user?.employmentDate) return "Не вказано"

    const startDate = new Date(user.employmentDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.floor(diffDays / 30)
    const days = diffDays % 30

    return `${months} міс. ${days} дн.`
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "waiter":
        return "Фіц"
      case "helper":
        return "Малий/мала"
      case "trainee":
        return "Стажер"
      case "admin":
        return "Адмін"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Завантаження...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Помилка завантаження профілю</h1>
          <p className="text-gray-600 mt-2">Спробуйте оновити сторінку</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photo || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <Badge variant="secondary">{getRoleDisplayName(user.role)}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Стаж: {getWorkDuration()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Змін відпрацьовано: {workShifts.filter((s) => s.isCompleted).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Description */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-medium">Особистий опис</Label>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleSaveDescription}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false)
                        setEditedDescription(user.personalDescription || "")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Розкажіть про себе..."
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md min-h-[100px]">
                  {user.personalDescription || "Опис не додано"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {user.role !== "trainee" && (
            <>
              <TabsTrigger value="schedule">Розклад</TabsTrigger>
              <TabsTrigger value="salary">Зарплата</TabsTrigger>
            </>
          )}
          <TabsTrigger value="fines">Штрафи</TabsTrigger>
          {user.role === "trainee" && <TabsTrigger value="internship">Стажування</TabsTrigger>}
          {user.role === "admin" && <TabsTrigger value="admin">Адмін панель</TabsTrigger>}
        </TabsList>

        {user.role !== "trainee" && (
          <>
            <TabsContent value="schedule">
              <ProfileCalendar workShifts={workShifts} userRole={user.role} onShiftUpdate={loadUserData} />
            </TabsContent>

            <TabsContent value="salary">
              <SalaryCalculator user={user} workShifts={workShifts} fines={fines} onUpdate={loadUserData} />
            </TabsContent>
          </>
        )}

        <TabsContent value="fines">
          <FinesSection fines={fines} userRole={user.role} userId={user._id || ""} onUpdate={loadUserData} />
        </TabsContent>

        {user.role === "trainee" && (
          <TabsContent value="internship">
            <InternshipSection progress={internshipProgress} userId={user._id || ""} onUpdate={loadUserData} />
          </TabsContent>
        )}

        {user.role === "admin" && (
          <TabsContent value="admin">
            <AdminPanel onUpdate={loadUserData} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
