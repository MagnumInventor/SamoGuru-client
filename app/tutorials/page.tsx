"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Play, Clock, Search, Star, ChefHat, Wine } from "lucide-react"

const tutorials = {
  kitchen: [
    {
      id: 1,
      title: "Приготування борщу класичного",
      description: "Покрокова інструкція приготування традиційного українського борщу",
      type: "video",
      duration: "15 хв",
      difficulty: "Середній",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Техніка нарізки овочів",
      description: "Основні техніки професійної нарізки овочів для кухні",
      type: "video",
      duration: "8 хв",
      difficulty: "Легкий",
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Стандарти подачі страв",
      description: "Правила та стандарти красивої подачі страв у ресторані",
      type: "text",
      duration: "5 хв",
      difficulty: "Легкий",
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  bar: [
    {
      id: 4,
      title: "Класичні коктейлі: Мохіто",
      description: "Рецепт та техніка приготування класичного мохіто",
      type: "video",
      duration: "6 хв",
      difficulty: "Легкий",
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Робота з кавовою машиною",
      description: "Інструкція з експлуатації професійної кавової машини",
      type: "text",
      duration: "10 хв",
      difficulty: "Середній",
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Винна карта ресторану",
      description: "Огляд винної карти та рекомендації до страв",
      type: "video",
      duration: "12 хв",
      difficulty: "Складний",
      rating: 4.5,
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

      <Tabs defaultValue="kitchen" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="kitchen" className="flex items-center">
            <ChefHat className="h-4 w-4 mr-2" />
            Кухня
          </TabsTrigger>
          <TabsTrigger value="bar" className="flex items-center">
            <Wine className="h-4 w-4 mr-2" />
            Бар
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kitchen">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.kitchen.map((tutorial) => (
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

        <TabsContent value="bar">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.bar.map((tutorial) => (
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
