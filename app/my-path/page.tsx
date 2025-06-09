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
    title: "Початківець",
    description: "Основи роботи офіціанта",
    status: "completed",
    progress: 100,
    requirements: [
      { task: "Ознайомлення з меню", completed: true },
      { task: "Базовий етикет обслуговування", completed: true },
      { task: "Техніка безпеки", completed: true },
      { task: "Перший тест знань", completed: true },
    ],
    duration: "1 тиждень",
    mentor: "Олена Петренко",
  },
  {
    id: 2,
    title: "Стажист",
    description: "Практична робота під наглядом",
    status: "in-progress",
    progress: 65,
    requirements: [
      { task: "Обслуговування 20 столів", completed: true },
      { task: "Робота з касою", completed: true },
      { task: "Знання винної карти", completed: false },
      { task: "Тест з обслуговування", completed: false },
    ],
    duration: "2 тижні",
    mentor: "Максим Коваленко",
  },
  {
    id: 3,
    title: "Молодший офіціант",
    description: "Самостійна робота з базовими обов'язками",
    status: "locked",
    progress: 0,
    requirements: [
      { task: "Самостійне обслуговування секції", completed: false },
      { task: "Робота з скаргами гостей", completed: false },
      { task: "Навчання новачків", completed: false },
      { task: "Іспит з меню та процедур", completed: false },
    ],
    duration: "1 місяць",
    mentor: "Ірина Сидоренко",
  },
  {
    id: 4,
    title: "Офіціант",
    description: "Повноцінний член команди",
    status: "locked",
    progress: 0,
    requirements: [
      { task: "Робота у всіх секціях", completed: false },
      { task: "Управління конфліктами", completed: false },
      { task: "Підготовка звітів", completed: false },
      { task: "Фінальна атестація", completed: false },
    ],
    duration: "Постійно",
    mentor: "Андрій Мельник",
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
  {
    id: 2,
    title: "Швидке навчання",
    description: "Пройшли базовий курс за 3 дні",
    icon: BookOpen,
    earned: true,
    date: "18.01.2024",
  },
  {
    id: 3,
    title: "Командний гравець",
    description: "Допомогли 5 колегам",
    icon: Users,
    earned: false,
    date: null,
  },
  {
    id: 4,
    title: "Майстер обслуговування",
    description: "Отримали 10 позитивних відгуків",
    icon: Trophy,
    earned: false,
    date: null,
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

      {/* Progress Overview */}
      <Card className="mb-8 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 text-orange-500 mr-2" />
            Загальний прогрес
          </CardTitle>
          <CardDescription>Ваш поточний рівень та досягнення</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Поточний рівень</div>
              <div className="text-xs text-gray-500">Стажист</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">65%</div>
              <div className="text-sm text-gray-600">Прогрес рівня</div>
              <Progress value={65} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Досягнення</div>
              <div className="text-xs text-gray-500">з 4 можливих</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Path */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Кар'єрний шлях</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathStages.map((stage) => (
            <Card
              key={stage.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedStage.id === stage.id ? "ring-2 ring-orange-500" : ""
              } ${stage.status === "locked" ? "opacity-60" : ""}`}
              onClick={() => stage.status !== "locked" && setSelectedStage(stage)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stage.title}</CardTitle>
                  {getStatusIcon(stage.status)}
                </div>
                <CardDescription>{stage.description}</CardDescription>
                <Badge className={getStatusColor(stage.status)}>{getStatusText(stage.status)}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Прогрес</span>
                      <span>{stage.progress}%</span>
                    </div>
                    <Progress value={stage.progress} />
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Тривалість: {stage.duration}</div>
                    <div>Ментор: {stage.mentor}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Selected Stage Details */}
      <section className="mb-12">
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-orange-500 mr-2" />
              Деталі етапу: {selectedStage.title}
            </CardTitle>
            <CardDescription>{selectedStage.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Вимоги для завершення:</h4>
                <ul className="space-y-2">
                  {selectedStage.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      {req.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${req.completed ? "text-gray-900" : "text-gray-600"}`}>{req.task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Інформація:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Тривалість:</span>
                    <span className="font-medium">{selectedStage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ментор:</span>
                    <span className="font-medium">{selectedStage.mentor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Прогрес:</span>
                    <span className="font-medium">{selectedStage.progress}%</span>
                  </div>
                </div>
                {selectedStage.status === "in-progress" && (
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">Продовжити навчання</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Досягнення</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                className={`text-center ${achievement.earned ? "border-orange-200 bg-orange-50" : "opacity-60"}`}
              >
                <CardHeader className="pb-3">
                  <div className="mx-auto mb-2">
                    <Icon className={`h-12 w-12 ${achievement.earned ? "text-orange-500" : "text-gray-400"}`} />
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div>
                      <Badge className="bg-orange-100 text-orange-800 mb-2">Отримано</Badge>
                      <div className="text-xs text-gray-600">{achievement.date}</div>
                    </div>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-600">Не отримано</Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
