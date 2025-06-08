import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BookOpen, Brain, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Ласкаво просимо до <span className="text-orange-100">СамоГуру</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-orange-100">
          Ваша платформа для ефективного управління ресторанним персоналом
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
          Розпочати роботу
        </Button>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow border-orange-100">
          <CardHeader className="text-center">
            <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-orange-600">Гнучкий розклад</CardTitle>
            <CardDescription>Управляйте своїм робочим розкладом та змінами</CardDescription>
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
            <CardDescription>Відео та текстові інструкції для кухні та бару</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tutorials">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Почати навчання</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-orange-100">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-orange-600">Тестування знань</CardTitle>
            <CardDescription>Перевірте свої знання меню та процедур</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tests">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Пройти тест</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-orange-100">
          <CardHeader className="text-center">
            <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-orange-600">План ресторану</CardTitle>
            <CardDescription>Інтерактивний план розташування столиків</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/table-plan">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Переглянути план</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Статистика платформи</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
            <div className="text-gray-600">Активних користувачів</div>
          </div>
          <div>
            <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Вчасних змін</div>
          </div>
          <div>
            <Brain className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
            <div className="text-gray-600">Успішних тестів</div>
          </div>
        </div>
      </section>
    </div>
  )
}
