"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Star, Trophy, BookOpen, Users, Target } from "lucide-react"

const pathStages = [
  {
    id: 1,
    title: "Теорія",
    description: "Основні аспекти роботи працівника",
    status: "completed",
    progress: 100,
    requirements: [
      { task: "Ознайомлення з розташуванням столів та станцій (схема + на практиці)", completed: true },
      { task: "Правила сервірування напоїв та страв", completed: true },
      { task: "Управління посудом та ліфтом", completed: true },
      { task: "Знати правила та поради для помічників", completed: true },
    ],
    duration: "1 день",
    mentor: "Адміністратор + СамоГуру",
  },
  {
    id: 2,
    title: "Стажист (помічник)",
    description: "Практична робота під наглядом",
    status: "in-progress",
    progress: 65,
    requirements: [
      { task: "Пів/зміна на кожній позиції (гриль, кухня, нижній/верхній бар)", completed: true },
      { task: "Сервірування напоїв, страв", completed: true },
      { task: "Знання номерації столів", completed: false },
    ],
    duration: "3-5 днів",
    mentor: "Помічник",
  },
  {
    id: 3,
    title: "Молодший офіціант",
    description: "Самостійна робота з базовими обов'язками",
    status: "locked",
    progress: 0,
    requirements: [
      { task: "Самостійне обслуговування станції", completed: false },
      { task: "Робота з скаргами гостей", completed: false },
      { task: "Навчання новачків", completed: false },
      { task: "Іспит з меню та процедур", completed: false },
    ],
    duration: "1 місяць",
    mentor: "Офіціант",
  },
  {
    id: 4,
    title: "Офіціант",
    description: "Повноцінний член команди фіців",
    status: "locked",
    progress: 0,
    requirements: [
      { task: "Робота у всіх секціях", completed: false },
      { task: "Управління конфліктами", completed: false },
    ],
    duration: "До кінця життя"
  },
]

const achievements = [
  {
    id: 1,
    title: "Перший день",
    description: "Успішно завершили перший робочий день",
    icon: Star,
    earned: true,
    date: "15.01.2024",
  },
]

export default function MyPathPage() {
  const [selectedStage, setSelectedStage] = useState(pathStages[1]) // Current stage

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "locked":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершено"
      case "in-progress":
        return "В процесі"
      case "locked":
        return "Заблоковано"
      default:
        return "Невідомо"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "locked":
        return <Target className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мій професійний шлях</h1>
        <p className="text-gray-600">Відстежуйте свій прогрес та досягнення в ресторані</p>
      </div>

      {/* FF Notice */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="text-sm text-yellow-800">
          <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
          зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
        </div>
      </div>
    </div>
  )
}
