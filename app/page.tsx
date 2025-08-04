//pages/page.tsx
"use client"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Calendar, BookOpen, Brain, MapPin } from "lucide-react"
import Link from "next/link"
import FFStatus from "@/app/components/ff-status"
import { ProtectedRoute } from "@/app/components/auth/protected-route"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ласкаво просимо до <span className="text-orange-100">СамоГуру</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Повноцінне робоче середовище на одному сайті
          </p>
          <Link href="/tasks">
          <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
            Розпочати роботу
          </Button>
          </Link>
        </section>

        {/* Features Grid */}
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-orange-600">Гнучкий розклад</CardTitle>
              <CardDescription>Керуйте своїм робочим графіком, змінами та відслідковуйте поточний прогрес у роботі</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/schedule">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Переглянути розклад</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-orange-600">Навчальні матеріали</CardTitle>
              <CardDescription>Відео/текстові інструкції для вивчення необхідної теоретичної бази для роботи помічником, офіціантом, кухарем*</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Почати навчання</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-orange-600">Адміністративна складова</CardTitle>
              <CardDescription>Повний список усіх правил, штрафів, оновлень, розпорядження, тощо</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/rules">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Ознайомитися з правилами</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-orange-600">Тестування знань</CardTitle>
              <CardDescription>Перевірте свої знання меню, бару, завдань, правил та процедур*</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tests">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Пройти тести</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle className="text-orange-600">План ресторану</CardTitle>
              <CardDescription>Інтерактивний план та схема розташування столиків у закладі</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/table-plan/map">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Переглянути карту</Button>
              </Link>
            </CardContent>
          </Card>
          
    </section>

        <section>
          <FFStatus />
        </section>
      </div>
    </ProtectedRoute>
  )
} 