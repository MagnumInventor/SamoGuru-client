"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Users, Calendar, FileText, BarChart3, Settings, Plus, Edit } from "lucide-react"

const adminStats = [
  {
    title: "Всього співробітників",
    value: "24",
    change: "+2",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Активних змін",
    value: "18",
    change: "0",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Нових правил",
    value: "3",
    change: "+1",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    title: "Тестів пройдено",
    value: "156",
    change: "+12",
    icon: BarChart3,
    color: "text-purple-600",
  },
]

const recentEmployees = [
  { name: "Марія Іваненко", role: "waiter", joinDate: "22.01.2024", status: "active" },
  { name: "Петро Сидоренко", role: "helper", joinDate: "20.01.2024", status: "training" },
  { name: "Олена Коваленко", role: "waiter", joinDate: "18.01.2024", status: "active" },
]

const pendingRequests = [
  { employee: "Максим Скак", type: "shift-change", date: "25.01.2024", status: "pending" },
  { employee: "Аня Лемик", type: "time-off", date: "26.01.2024", status: "pending" },
  { employee: "Влад Ярем", type: "shift-change", date: "24.01.2024", status: "approved" },
]

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель адміністратора</h1>
          <p className="text-gray-600">Управління співробітниками, розкладом та контентом</p>
        </div>

        {/* Add this after the header section: */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="text-sm text-yellow-800">
            <strong>FF (For Future):</strong> Адміністративні функції (додавання співробітників, редагування розкладу,
            управління контентом) будуть реалізовані після впровадження backend API
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.title}</div>
                      {stat.change !== "0" && <div className="text-xs text-green-600">{stat.change} цього тижня</div>}
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Швидкі дії</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 bg-orange-500 hover:bg-orange-600 flex flex-col items-center justify-center">
              <Plus className="h-6 w-6 mb-2" />
              Додати співробітника
            </Button>
            <Button
              variant="outline"
              className="h-20 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col items-center justify-center"
            >
              <Edit className="h-6 w-6 mb-2" />
              Редагувати розклад
            </Button>
            <Button
              variant="outline"
              className="h-20 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col items-center justify-center"
            >
              <FileText className="h-6 w-6 mb-2" />
              Додати правило
            </Button>
            <Button
              variant="outline"
              className="h-20 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col items-center justify-center"
            >
              <Settings className="h-6 w-6 mb-2" />
              Налаштування
            </Button>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Employees */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-orange-500 mr-2" />
                Нові співробітники
              </CardTitle>
              <CardDescription>Останні доданні члени команди</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEmployees.map((employee, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-600">
                        {employee.role === "waiter" ? "Офіціант" : "Помічник офіціанта"}
                      </div>
                      <div className="text-xs text-gray-500">{employee.joinDate}</div>
                    </div>
                    <Badge
                      className={
                        employee.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {employee.status === "active" ? "Активний" : "Навчання"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                Запити на розгляд
              </CardTitle>
              <CardDescription>Запити на зміни розкладу та вихідні</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{request.employee}</div>
                      <div className="text-sm text-gray-600">
                        {request.type === "shift-change" ? "Заміна зміни" : "Вихідний день"}
                      </div>
                      <div className="text-xs text-gray-500">{request.date}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {request.status === "pending"
                          ? "Очікує"
                          : request.status === "approved"
                            ? "Схвалено"
                            : "Відхилено"}
                      </Badge>
                      {request.status === "pending" && (
                        <div className="flex space-x-1">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0">
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            ✗
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
