"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, Users, AlertTriangle, ImageIcon, Video, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const menuCategories = {
  main: [
    {
      id: 1,
      name: "М'ясна дошка",
      ingredients:
        "🥩 ковбаса купати, 🍗 курча тапака, 🥩 ковбаса з баранини, 🥩 баварська ковбаса, 🥔 картопля смажена, 🍞 грінки, 🥩 стейк шиї свинний",
      cookingTime: "30-35 хв",
      weight: "2000 гр",
      description:
        "Асорті ковбас із домашньої масарні, свинний стейк та курча тапака. Подається зі смаженою картоплею, грінками та фірмовими соусами.",
      allergens: ["цибуля", "перець чилі"],
      price: "890 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example1",
    },
    {
      id: 2,
      name: "Виноградні равлики",
      ingredients: "🐌 равлики мариновані, 🧈 масло вершкове, 🧄 часник, 🧀 моцарелла, 🥛 вершки, 🍋 лимон",
      cookingTime: "10-15 хв",
      weight: "160 гр",
      description: "Справжній французький делікатес з м'яса равлика маринованого у вині та затертий сиром моцарелла.",
      allergens: [],
      warning: "Обережно, гаряча сковорідка!",
      price: "320 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example2",
    },
    {
      id: 3,
      name: "Чашушулі з телятини",
      ingredients: "🥩 телятина, 🍅 помідори, 🌶️ перець болгарський, 🧅 цибуля, 🍷 вино біле, 🌿 кінза",
      cookingTime: "10-15 хв",
      weight: "250 гр",
      description:
        "Соковите м'ясо телятини в насиченому томатному соусі з пряними спеціями, кінзою та легкою пікантністю.",
      allergens: ["кінза"],
      warning: "Обережно, гаряча сковорідка!",
      price: "380 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example3",
    },
  ],
  grill: [
    {
      id: 4,
      name: "Мангалиця у вогні",
      ingredients: "🐷 свинина мангалиця, 🌶️ аджика грузинська, 🌿 кінза, 🌶️ перець рожевий",
      cookingTime: "20 хв",
      weight: "від 300 гр",
      description:
        "Соковите м'ясо мангалиці приготоване на відкритому вогні, смак якого чудово доповнює свіжа зелень та пікантні соуси.",
      allergens: ["кінза"],
      isWeighted: true,
      price: "від 450 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example4",
    },
    {
      id: 5,
      name: "Стейк Рібай",
      ingredients: "🥩 телятина Блек Ангус, 🧂 сіль морська, 🌶️ перець сичуанський",
      cookingTime: "20-25 хв",
      weight: "вагова страва",
      description: "Аргентинський стейк вирізаний з телятини породи Блек Ангус, 21 денної вологої витримки.",
      allergens: ["перець чилі"],
      isWeighted: true,
      price: "від 890 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example5",
    },
  ],
  khinkali: [
    {
      id: 6,
      name: "Хінкалі зі свининою та телятиною",
      ingredients: "🥩 свинина, 🥩 телятина, 🧅 цибуля синя, 🌿 кінза, 🌶️ чилі, 🥟 тісто",
      cookingTime: "15 хв",
      weight: "70 гр (1 шт)",
      description: "Соковита начинка з м'ясного дуету телятини та свинини в ніжному тісті.",
      allergens: [],
      warning: "Обережно, гарячий бульйон!",
      price: "45 ₴/шт",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example6",
    },
    {
      id: 7,
      name: "Хінкалі з сиром",
      ingredients: "🧀 бринза, 🧀 моцарелла, 🧀 сир кисломолочний, 🥛 вершки, 🌿 м'ята",
      cookingTime: "20 хв",
      weight: "250 гр",
      description:
        "Ніжні соковиті мішечки з тонкого тіста, наповнені щедрою порцією сирної начинки в сирно-вершковому соусі.",
      allergens: ["м'ята"],
      price: "280 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example7",
    },
  ],
  salads: [
    {
      id: 8,
      name: "Грузинський з лісовим фундуком",
      ingredients: "🍅 помідор чері, 🥒 огірок, 🌶️ перець болгарський, 🧅 цибуля синя, 🌰 фундук, 🌿 кінза",
      cookingTime: "15 хв",
      weight: "330 гр",
      description: "Вдале поєднання свіжих овочів, з додаванням запашної кінзи та горіхового соусу.",
      allergens: ["цибуля синя", "кінза", "фундук"],
      price: "240 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example8",
    },
    {
      id: 9,
      name: "Вах-Вах",
      ingredients: "🍅 помідори різних видів, 🧀 бринза, 🥒 огірок, 🧅 цибуля синя, 🥬 рукола",
      cookingTime: "15 хв",
      weight: "240 гр",
      description:
        "Унікальний грузинський салат із свіжих та вялених томатів, у поєднанні із мусом з овечої бринзи. Поєднує у собі 4 соуса.",
      allergens: ["цибуля", "пікантний соус"],
      price: "320 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example9",
    },
  ],
  desserts: [
    {
      id: 10,
      name: "Тірамісу",
      ingredients: "🧀 маскарпоне, 🥛 вершки, 🥚 яйце, ☕ еспресо, 🍫 какао",
      cookingTime: "10 хв",
      weight: "160 гр",
      description:
        "Ніжне тірамісу на основі сиру маскарпоне з хрумкими трубочками, смак якого чудово доповнює запашне еспресо.",
      allergens: ["яйце"],
      price: "180 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example10",
    },
    {
      id: 11,
      name: "Багратоні",
      ingredients: "🥐 листкове тісто, 🥛 молоко, 🥚 яйце, 🧈 масло вершкове, 🍯 цукор",
      cookingTime: "15 хв",
      weight: "210 гр",
      description:
        "Справжній грузинський наполеон з хрумким листковим тістом і ніжним заварним кремом. Названо в честь грузинського царського роду Багратіоні.",
      allergens: ["яйце"],
      price: "160 ₴",
      images: ["/placeholder.svg?height=400&width=600"],
      videoUrl: "https://www.youtube.com/watch?v=example11",
    },
  ],
}

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("main")
  const [selectedDish, setSelectedDish] = useState<any>(null)

  const filteredItems = menuCategories[selectedCategory as keyof typeof menuCategories].filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Меню ресторану</h1>
        <p className="text-gray-600">Повний каталог страв з інгредієнтами та алергенами</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук страв..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="main">🍖 Основні</TabsTrigger>
          <TabsTrigger value="grill">🔥 Мангал</TabsTrigger>
          <TabsTrigger value="khinkali">🥟 Хінкалі</TabsTrigger>
          <TabsTrigger value="salads">🥗 Салати</TabsTrigger>
          <TabsTrigger value="desserts">🍰 Десерти</TabsTrigger>
        </TabsList>

        {Object.entries(menuCategories).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow border-orange-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <div className="text-lg font-bold text-orange-600">{item.price}</div>
                    </div>
                    <CardDescription className="text-sm">{item.ingredients}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">{item.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {item.cookingTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {item.weight}
                      </div>
                    </div>

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-600 mb-1">Алергени:</div>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen: string, index: number) => (
                            <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.warning && (
                      <div className="flex items-center text-xs text-orange-600 mb-4">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {item.warning}
                      </div>
                    )}

                    {item.isWeighted && <Badge className="bg-blue-100 text-blue-800 mb-4">Вагова страва</Badge>}

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Фото
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{item.name} - Фото</DialogTitle>
                            <DialogDescription>Фотографії страви</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {item.images.map((image: string, index: number) => (
                              <div key={index} className="relative h-60 w-full">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`${item.name} - фото ${index + 1}`}
                                  className="h-full w-full object-cover rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-md text-sm text-yellow-800">
                            <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо
                            ви справді зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Відео
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{item.name} - Відео</DialogTitle>
                            <DialogDescription>Відео приготування страви</DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col items-center justify-center py-8">
                            <Video className="h-16 w-16 text-orange-300 mb-4" />
                            <p className="text-center mb-4">Відео приготування страви "{item.name}"</p>
                            <Button
                              variant="outline"
                              className="flex items-center border-orange-200 text-orange-600 hover:bg-orange-50"
                              onClick={() => window.open(item.videoUrl, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Відкрити відео
                            </Button>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-md text-sm text-yellow-800">
                            <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо
                            ви справді зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setSelectedDish(item)}>
                      Детальніше
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Selected Dish Dialog */}
      {selectedDish && (
        <Dialog open={!!selectedDish} onOpenChange={(open) => !open && setSelectedDish(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDish.name}</span>
                <span className="text-orange-600">{selectedDish.price}</span>
              </DialogTitle>
              <DialogDescription>{selectedDish.ingredients}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="relative h-60 w-full">
                <img
                  src={selectedDish.images[0] || "/placeholder.svg"}
                  alt={selectedDish.name}
                  className="h-full w-full object-cover rounded-md"
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Опис</h4>
                <p className="text-gray-700">{selectedDish.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Деталі</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Час приготування: {selectedDish.cookingTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Вага: {selectedDish.weight}
                    </div>
                  </div>
                </div>

                <div>
                  {selectedDish.allergens && selectedDish.allergens.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Алергени</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDish.allergens.map((allergen: string, index: number) => (
                          <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDish.warning && (
                    <div className="mt-4">
                      <div className="flex items-center text-orange-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span>{selectedDish.warning}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                  onClick={() => window.open(selectedDish.videoUrl, "_blank")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Дивитися відео
                </Button>
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Додати до замовлення</Button>
              </div>

              <div className="p-4 bg-yellow-50 rounded-md text-sm text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
