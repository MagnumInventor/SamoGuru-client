"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Utensils, GlassWater, Coffee, Badge} from "lucide-react"
//, Grill, Kitchen }
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



type DishwareItem = {
  id: number
  name: string
  description: string
  station: "Верхній бар" | "Кімната персоналу" | "Кухня" | "Гриль"
  dish?: {
    name: string
    link: string
  }
  image?: string
  searchTerms: string[]
}

const dishwareData = {
  regular: {
    title: "Звичайний посуд",
    icon: <Utensils className="h-5 w-5 mr-2" />,
    description: "Посудина для страв, що доставляється до кухні або гриля",
    groups: [
      {
        name: "Кухня",
        icon: <Utensils className="h-4 w-4 mr-1" />,
        // RITCHEN ICONS NEEDED TO BE ADDED
        items: [
          {
            id: 1,
            name: "ВСІ глибокі тарілки",
            description: "Для супів, бульйонів та салатів",
            station: "Кухня",
            dish: { name: "Сала", link: "/dishes/borscht" },
            disg:
            searchTerms: ["тарілка", "суп", "глибока", "кухня"],
          },
          {
            id: 2,
            name: "Мелкі тарілки",
            description: "Для гарнірів та салатів",
            station: "Кухня",
            dish: { name: "Гречка з грибами", link: "/dishes/grechka" },
            searchTerms: ["тарілка", "гарнір", "салат", "кухня"],
          },
          {
            id: 3,
            name: "Овальні тарілки",
            description: "Для риби та м'ясних страв",
            station: "Кухня",
            dish: { name: "Лосось на грилі", link: "/dishes/salmon" },
            searchTerms: ["овальна", "риба", "м'ясо", "кухня"],
          },
        ],
      },
      {
        name: "Гриль",
        icon: <Utensils className="h-4 w-4 mr-1" />,
        // GRILL ICON NEEDED TO BE ADDED
        items: [
          {
            id: 4,
            name: "Чавунні сковорідки (з ручками)",
            description: "Для страв, що подаються гарячими",
            station: "Гриль",
            dish: { name: "Ковбаса з ягнятини", link: "/dishes/lamb-sausages" },
            searchTerms: ["на дощечці", "чавун", "гриль"],
          },
          {
            id: 5,
            name: "Квадратні чугунні плити",
            description: "Для стейку Костиця",
            station: "Гриль",
            dish: { name: "Стейк на ребрі свинини", link: "/dishes/pork-steak" },
            searchTerms: ["на дощечці", "чугун", "гриль"],
          },
          {
            id: 6,
            name: "Дошка + чугун (коровка)",
            description: "Для подачі чашушулі з телятини",
            station: "Гриль",
            dish: { name: "Чашушулі з телянити", link: "/dishes/beef-chashushuli" },
            searchTerms: ["дошка", "м'ясо", "гриль"],
          },
        ],
      },
    ],
  },
  drinkware: {
    title: "Посуд для напоїв",
    icon: <GlassWater className="h-5 w-5 mr-2" />,
    description: "Посудина для напоїв, що розподіляється між верхнім та нижнім баром",
    groups: [
      {
        name: "Верхній бар",
        icon: <Coffee className="h-4 w-4 mr-1" />,
        items: [
          {
            id: 101,
            name: "Пивні кухлі (0,3л / 0,5л / 1л)",
            description: "Різноманітні бокали з ручкою для крафтового пива Слава Україні",
            station: "Верхній бар",
            dish: { name: "Свіже пиво", link: "/drinks/beer" },
            searchTerms: ["кухоль", "пиво", "верхній бар"],
          },
          {
            id: 102,
            name: "Всі блюдечка",
            description: "Для кавових напоїв та чаю",
            station: "Верхній бар",
            dish: { name: "Кава & чай", link: "/drinks/tea&coffee" },
            searchTerms: ["блюдце", "кава", "чай", "верхній бар"],
          },  
        {
            id: 103,
            name: "Кавові чашки",
            description: "Для еспресо (рівна, чорна), американо та капучино",
            station: "Верхній бар",
            dish: { name: "Капучино", link: "/drinks/cappuccino" },
            searchTerms: ["чашка", "кава", "верхній бар"],
          },
        ],
      },
      {
        name: "Кімната персоналу",
        icon: <GlassWater className="h-4 w-4 mr-1" />,
        items: [
          {
            id: 13,
            name: "Прибори для персоналу",
            description: "Відрізняються від звичайних та десертних приборів своєю формою, матеріалом, ручкою, тд",
            station: "Кімната персоналу",
            dish: { name: "Їжа для персоналу", link: "/food/personal" },
            searchTerms: ["пластикові тарілки", "ножі", "вилки", "ложки"],
          },
        ],
      },
    ],
  },
}

export default function DishwarePage() {
  const [selectedCategory, setSelectedCategory] = useState<"regular" | "drinkware">("regular")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<DishwareItem | null>(null)

  const currentCategory = dishwareData[selectedCategory]

  // Flatten items for search
  const allItems = currentCategory.groups.flatMap(group => 
    group.items.map(item => ({
      ...item,
      groupName: group.name,
      station: item.station as "Верхній бар" | "Нижній бар" | "Кухня" | "Гриль"
    }))
  )

  // Filter items based on search query
  const filteredItems = allItems.filter(item => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.station.toLowerCase().includes(query) ||
      item.searchTerms.some(term => term.toLowerCase().includes(query)) ||
      (item.dish && item.dish.name.toLowerCase().includes(query))
    )
  })

  // Group items by station
  const groupedItems = filteredItems.reduce((acc, item) => {
    const station = item.station as "Верхній бар" | "Нижній бар" | "Кухня" | "Гриль"
    if (!acc[station]) {
      acc[station] = []
    }
    acc[station].push(item)
    return acc
  }, {} as Record<"Верхній бар" | "Нижній бар" | "Кухня" | "Гриль", DishwareItem[]>)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Організація посуду</h1>
        <p className="text-gray-600">Правила розподілу посуду для помічників офіціантів</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук посуду за назвою, стацією або стравою..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as "regular" | "drinkware")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="regular" className="flex items-center justify-center">
            <Utensils className="h-4 w-4 mr-2" />
            Звичайний посуд
          </TabsTrigger>
          <TabsTrigger value="drinkware" className="flex items-center justify-center">
            <GlassWater className="h-4 w-4 mr-2" />
            Посуд для напоїв
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory}>
          {/* Category Header */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <span className="mr-3">{currentCategory.icon}</span>
                {currentCategory.title}
              </CardTitle>
              <CardDescription className="text-base">{currentCategory.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600">
                Знайдено {filteredItems.length} результат(ів) для "{searchQuery}"
              </p>
            </div>
          )}

          {/* Items by Station */}
          {Object.entries(groupedItems).map(([station, items]) => {
            const stationGroup = currentCategory.groups.find(g => g.name === station);
            return (
              <div key={station} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  {stationGroup?.icon}
                  {station}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <Badge className="bg-green-100 text-green-800 w-fit">{item.station}</Badge>
                      </CardHeader>
                      <CardContent>
                        {/* Photo Placeholder */}
                        <div className="mb-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
                            <p className="text-sm">Фото посудини</p>
                            <p className="text-xs">{item.name}</p>
                          </div>
                        </div>

                        {/* Dish Information */}
                        {item.dish && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-1 text-sm">Використовується для:</h4>
                            <div className="flex items-center text-sm">
                              <span className="text-blue-600 font-medium">{item.dish.name}</span>
                              <Button variant="link" className="ml-2 text-xs h-6 px-2">
                                Деталі
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <span className="mr-2">📸</span>
                                Фото
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>{item.name}</DialogTitle>
                                <DialogDescription>Зовнішній вигляд та особливості посудини</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="relative h-60 w-full bg-gray-100 rounded-md flex items-center justify-center">
                                  <div className="text-center text-gray-500">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                                    <p className="text-lg font-medium mb-2">{item.name}</p>
                                    <p className="text-sm">{item.description}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            className="flex-1 bg-blue-500 hover:bg-blue-600"
                            onClick={() => setSelectedItem(item)}
                          >
                            Детальніше
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          {/* No Results */}
          {searchQuery && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нічого не знайдено</h3>
              <p className="text-gray-600">Спробуйте змінити пошуковий запит</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Detailed Item Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="mr-3">
                  {selectedCategory === "regular" ? 
                    <Utensils className="h-5 w-5" /> : 
                    <GlassWater className="h-5 w-5" />
                  }
                </span>
                {selectedItem.name}
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              {/* Photo Section */}
              <div className="relative h-60 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">{selectedItem.name}</p>
                  <p className="text-sm">{selectedItem.station}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Station Info */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <span className="mr-2">📍</span>
                    Розташування
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Станція:</span>
                      <div className="font-medium">{selectedItem.station}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Тип посуду:</span>
                      <div className="font-medium">
                        {selectedCategory === "regular" ? "Звичайний посуд" : "Посуд для напоїв"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dish Information */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <span className="mr-2">🍲</span>
                    Використання
                  </h4>
                  <div className="space-y-2">
                    {selectedItem.dish ? (
                      <>
                        <div>
                          <span className="text-sm text-gray-600">Страва:</span>
                          <div className="font-medium">{selectedItem.dish.name}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Посилання:</span>
                          <div className="font-medium">
                            <Button variant="link" className="text-blue-600 p-0 h-auto">
                              Переглянути страву
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500">
                        Цей посуд використовується для різних страв
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                <strong>Порада:</strong> Завжди перевіряйте чистоту посуду перед використанням
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* General Rules */}
      <div className="mt-12 space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <span className="mr-2">📌</span>
              Правила розподілу посуду
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-700 space-y-3">
            <div>
              <strong>1. Звичайний посуд:</strong> Все окрім посуду для напоїв. Поділяється на:
              <ul className="list-disc pl-5 mt-1">
                <li><strong>Верхній бар:</strong> АБСОЛЮТНО все</li>
                <li><strong>Нижній бар:</strong> Все окрім посуду для кави</li>
              </ul>
            </div>
            <div>
              <strong>2. Транспортування:</strong> Звичайний посуд для страв заноситься з мийки:
              <ul className="list-disc pl-5 mt-1">
                <li>На стелаж до станції гриль</li>
                <li>Ліфтом вниз на кухню</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <span className="mr-2">✅</span>
              Поради для помічників
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700 space-y-3">
            <div>
              <strong>Чистота:</strong> Завжди перевіряйте стан посуду перед розподілом.
            </div>
            <div>
              <strong>Термін доставки:</strong> Транспортуйте посуд до станцій протягом 15 хвилин після миття.
            </div>
            <div>
              <strong>Розподіл:</strong> Слідкуйте за правильним розподілом за станціями.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
