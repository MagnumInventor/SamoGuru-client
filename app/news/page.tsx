import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Users, Calendar, TrendingUp, Award, Coffee } from "lucide-react"
import { demoNewsData } from "@/lib/demo-data"

type NewsArticle = {
  id: number
  title: string
  description: string
  category: string
  date: string
  author: string
  priority?: string
  image?: string
}

const news: NewsArticle[] = demoNewsData

const announcements = [
  {
    id: 2,
    title: "Зміна графіку роботи",
    description: "Пів зміни помічника з 16:00-23:00 (замість 16:00-22:00)",
    date: "28.01.2024",
    type: "schedule",
  }
]

const stats = [
  {
    title: "Нових співробітників",
    value: "3",
    period: "цього місяця",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Оновлень меню",
    value: "2",
    period: "цього тижня",
    icon: Coffee,
    color: "text-green-600",
  }
]

export default function NewsPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "team":
        return "bg-blue-100 text-blue-800"
      case "menu":
        return "bg-green-100 text-green-800"
      case "achievement":
        return "bg-orange-100 text-orange-800"
      case "equipment":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "team":
        return "Команда"
      case "menu":
        return "Меню"
      case "achievement":
        return "Досягнення"
      case "equipment":
        return "Обладнання"
      default:
        return "Загальне"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "training":
        return <TrendingUp className="h-4 w-4" />
      case "schedule":
        return <Calendar className="h-4 w-4" />
      case "event":
        return <Users className="h-4 w-4" />
      default:
        return <Newspaper className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="text-sm text-blue-800">
          <strong>FF:</strong> Новини та оголошення будуть завантажуватися з CMS після впровадження backend
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Актуальне</h1>
        <p className="text-gray-600">Новини, оголошення та важливі оновлення</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                    <div className="text-xs text-gray-500">{stat.period}</div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Announcements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Важливі оголошення</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-orange-500 mt-1">{getTypeIcon(announcement.type)}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{announcement.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Останні новини</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow border-orange-100">
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(article.category)}>{getCategoryText(article.category)}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getPriorityColor(article.priority ?? "")}>
                    {article.priority === "high" && "Важливо"}
                    {article.priority === "medium" && "Середньо"}
                    {article.priority === "low" && "Інформація"}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
