"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Play, Clock, Search, Star } from "lucide-react"

const tutorials = {
  salads: [
    {
      id: 1,
      title: "Приготування грузинського салату з фундуком",
      description: "Покрокова інструкція приготування традиційного грузинського салату",
      type: "video",
      duration: "12 хв",
      difficulty: "Легкий",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Салат Вах-Вах",
      description: "Унікальний грузинський салат з 4 різними соусами",
      type: "video",
      duration: "15 хв",
      difficulty: "Середній",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Цезар з креветкою, чим відрізняється від Нового Цезарідзе",
      description: "Правильне приготування соусу та подача креветок",
      type: "video",
      duration: "10 хв",
      difficulty: "Легкий",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Томлений буряк з ткемалі",
      description: "Техніка томління буряка та приготування соусу ткемалі",
      type: "video",
      duration: "18 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  grill: [
    {
      id: 5,
      title: "Мангалиця у вогні",
      description: "Техніка приготування мангалиці на відкритому вогні",
      type: "video",
      duration: "25 хв",
      difficulty: "Складний",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Люля-кебаб: формування та запікання",
      description: "Правильна техніка формування та запікання люля-кебабу",
      type: "video",
      duration: "15 хв",
      difficulty: "Середній",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Стейк Рібай: ступені прожарки",
      description: "Визначення ступенів прожарки та подача стейка",
      type: "video",
      duration: "22 хв",
      difficulty: "Складний",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  fryer: [
    {
      id: 9,
      title: "Чебуреки: робота з тістом та фритюром",
      description: "Техніка розкочування тіста та смаження",
      type: "video",
      duration: "18 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 10,
      title: "Сирні палички у фритюрі",
      description: "Панірування та контроль температури олії",
      type: "video",
      duration: "12 хв",
      difficulty: "Легкий",
      rating: 4.5,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 11,
      title: "Картопля фрі",
      description: "Смаження та подача",
      type: "video",
      duration: "14 хв",
      difficulty: "Легкий",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  main: [
    {
      id: 12,
      title: "М'ясна дошка: компонування та подача",
      description: "Правильне розміщення компонентів",
      type: "video",
      duration: "20 хв",
      difficulty: "Середній",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 13,
      title: "Чашушулі з телятини",
      description: "Техніка тушкування та робота з спеціями",
      type: "video",
      duration: "16 хв",
      difficulty: "Середній",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 14,
      title: "Свинина по-карськи: запікання з сиром",
      description: "Правильна температура запікання та контроль готовності",
      type: "video",
      duration: "18 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 15,
      title: "Чкмерулі з курки: вершково-часниковий соус",
      description: "Приготування соусу та запікання курки",
      type: "video",
      duration: "22 хв",
      difficulty: "Середній",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  soups: [
    {
      id: 16,
      title: "Бульйон з півня",
      description: "Техніка варіння прозорого наваристого бульйону",
      type: "video",
      duration: "25 хв",
      difficulty: "Середній",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 17,
      title: "Харчо з ягнятини",
      description: "Робота з традиційними грузинськими спеціями",
      type: "video",
      duration: "20 хв",
      difficulty: "Складний",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 18,
      title: "Журик",
      description: "Особливості приготування та подачі",
      type: "video",
      duration: "18 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  khinkali: [
    {
      id: 19,
      title: "Хінкалі: техніка ліплення",
      description: "Правильна техніка ліплення та кількість складок",
      type: "video",
      duration: "15 хв",
      difficulty: "Складний",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 21,
      title: "Смажені хінкалі: унікальна техніка (єдина в Тернополі)",
      description: "Особливості смаження хінкалі до хрусткої скоринки",
      type: "video",
      duration: "14 хв",
      difficulty: "Складний",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 22,
      title: "Хінкалі з сиром",
      description: "Робота з 7 видами сиру та їх поєднання",
      type: "video",
      duration: "16 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  desserts: [
    {
      id: 23,
      title: "Тірамісу",
      description: "Приготування маскарпоне крему та cthdshedfyya десерту",
      type: "video",
      duration: "20 хв",
      difficulty: "Середній",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 24,
      title: "Багратоні: грузинський наполеон",
      description: "Робота з листковим тістом та заварним кремом",
      type: "video",
      duration: "25 хв",
      difficulty: "Складний",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 26,
      title: "Чіколяда",
      description: "Поєднання шоколадного тістечка з морозтивом",
      type: "video",
      duration: "22 хв",
      difficulty: "Середній",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
}

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легкий":
        return "bg-green-100 text-green-800"
      case "Середній":
        return "bg-yellow-100 text-yellow-800"
      case "Складний":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Навчальні матеріали</h1>
        <p className="text-gray-600">Відео та текстові інструкції для кухні та бару</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук навчальних матеріалів..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="text-sm text-blue-800">
          <strong>FF:</strong> Відео контент буде завантажуватися після налаштування медіа сервера
        </div>
      </div>

      <Tabs defaultValue="salads" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
          <TabsTrigger value="salads" className="flex items-center text-xs">
            🥗 Салати/Закуски
          </TabsTrigger>
          <TabsTrigger value="grill" className="flex items-center text-xs">
            🔥 Гриль
          </TabsTrigger>
          <TabsTrigger value="fryer" className="flex items-center text-xs">
            🍟 Фритюр
          </TabsTrigger>
          <TabsTrigger value="main" className="flex items-center text-xs">
            🍖 Основні страви
          </TabsTrigger>
          <TabsTrigger value="soups" className="flex items-center text-xs">
            🍲 Перші страви
          </TabsTrigger>
          <TabsTrigger value="khinkali" className="flex items-center text-xs">
            🥟 Хінкалі
          </TabsTrigger>
          <TabsTrigger value="desserts" className="flex items-center text-xs">
            🍰 Десерти
          </TabsTrigger>
        </TabsList>

        <TabsContent value="salads">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.salads.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grill">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.grill.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fryer">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.fryer.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.main.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soups">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.soups.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="khinkali">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.khinkali.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="desserts">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.desserts.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center">
                      {renderStars(tutorial.rating)}
                      <span className="ml-2 text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    {tutorial.type === "video" ? "Дивитися" : "Читати"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
