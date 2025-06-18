"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, BarChart3, ImageIcon } from "lucide-react"

const sections = [
  {
    key: "tasks",
    title: "Завдання",
    description: "Огляд основних завдань офіціанта та помічника.",
    studyLink: "/study/tasks",
    testLink: "/tests/tasks",
  },
  {
    key: "serving",
    title: "Сервірування",
    description: "Правила сервірування столу та подачі страв.",
    studyLink: "/study/serving",
    testLink: "/tests/serving",
  },
  {
    key: "tablewear",
    title: "Посуд",
    description: "Типи посуду, догляд та використання.",
    studyLink: "/study/tablewear",
    testLink: "/tests/tablewear",
  },
  {
    key: "rules",
    title: "Правила",
    description: "Важливі правила роботи у залі та на кухні.",
    studyLink: "/study/rules",
    testLink: "/tests/rules",
  },
  {
    key: "table-nomeration",
    title: "Нумерація столів",
    description: "Схема та логіка нумерації столів у ресторані.",
    studyLink: "/study/table-nomeration",
    testLink: "/tests/table-nomeration",
  },
]

function PhotoGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300"
        >
          <ImageIcon className="h-8 w-8 text-gray-300" />
        </div>
      ))}
    </div>
  )
}

export default function TraineeMainPage() {
  return (
    <div className="container mx-auto px-2 md:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Навчання та тестування</h1>

      <div className="space-y-16 mb-20">
        {sections.map((section) => (
          <Card
            key={section.key}
            className="shadow-xl border-2 border-orange-200 bg-white rounded-2xl overflow-hidden"
          >
            <CardHeader className="bg-orange-50 px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <CardTitle className="text-3xl mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-lg">{section.description}</CardDescription>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                  </div>
                  <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 py-8">
              {/* More empty containers for photos in questions, titles, etc */}
              <PhotoGrid count={6} />
              <div className="flex flex-col md:flex-row gap-6">
                <Button
                  className="flex-1 py-6 text-xl bg-blue-100 text-blue-900 border-2 border-blue-200 hover:bg-blue-200 font-semibold rounded-lg"
                  variant="outline"
                  asChild
                >
                  <a href={section.studyLink}>Перейти до навчання</a>
                </Button>
                <Button
                  className="flex-1 py-6 text-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
                  asChild
                >
                  <a href={section.testLink}>Перейти до тесту</a>
                </Button>
              </div>
              {/* Even more empty containers for photos */}
              <div className="mt-8">
                <PhotoGrid count={3} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General Exam Section */}
      <div className="mb-20">
        <Card className="shadow-2xl border-2 border-red-300 bg-red-50 rounded-2xl overflow-hidden">
          <CardHeader className="bg-red-100 px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <CardTitle className="text-3xl text-red-700 mb-2">Загальний іспит</CardTitle>
                <CardDescription className="text-lg text-red-700">
                  Найскладніший тест, який охоплює всі теми та питання з навчання.
                </CardDescription>
              </div>
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                  <ImageIcon className="h-10 w-10 text-gray-300" />
                </div>
                <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                  <ImageIcon className="h-10 w-10 text-gray-300" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-8">
            <PhotoGrid count={6} />
            <Button
              className="w-full py-6 text-xl bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
              asChild
            >
              <a href="/tests/general-exam">Пройти загальний іспит</a>
            </Button>
            <div className="mt-8">
              <PhotoGrid count={3} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section (bottom) */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
              Загальна статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">78%</div>
            <div className="text-sm text-gray-600">Середній бал</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 text-orange-500 mr-2" />
              Пройдено тестів
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">9</div>
            <div className="text-sm text-gray-600">З 12 доступних</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              Час навчання
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">2.5</div>
            <div className="text-sm text-gray-600">Години цього тижня</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}