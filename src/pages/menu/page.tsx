"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Search, Clock, Users, AlertTriangle, ImageIcon, Video, ExternalLink, Wine } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"


import { demoMenuData } from "@/lib/full-menu"

// ===== Types =====
type FoodCategory =
  | "main"
  | "grill"
  | "khachapuri"
  | "khinkali"
  | "garnish"
  | "snacks"
  | "soups"
  | "childmenu"
  | "friture"
  | "salads"
  | "desserts"
  | "drinks"
  | "bar"

interface FoodItem {
  id: number
  name: string
  ingredients?: string
  cookingTime?: string
  weight?: string
  description: string
  allergens?: string[]
  warning?: string
  price: string
  images?: string[]
  videoUrl?: string
  isWeighted?: boolean
}

interface BarItem {
  id: number
  name: string
  category: string
  description: string
  alcohol: string
  volumes: string[]
  price: string
  type: "beer" | "tincture" | "brandy" | "vodka" | "rum" | "gin" | "whisky"
  country?: string
  type_detail?: string
  ingredients?: string
}



// КАТЕГОРІЇ МЕНЮ
const categoryTabs: { value: FoodCategory; label: string }[] = [
  { value: "main", label: "🍖 Основні" },
  { value: "grill", label: "🔥 Мангал" },
  { value: "khachapuri", label: "Хачапурі" },
  { value: "khinkali", label: "🥟 Хінкалі" },
  { value: "garnish", label: "Гарніри" },
  { value: "snacks", label: "Закуски" },
  { value: "soups", label: "Супи" },
  { value: "childmenu", label: "Дитяче меню" },
  { value: "friture", label: "Фритюр" },
  { value: "salads", label: "🥗 Салати" },
  { value: "desserts", label: "🍰 Десерти" },
]

// Add bar subcategories (in Ukrainian)
const barTabs = [
  { value: "nonalco", label: "Безалкогольні" },
  { value: "coffee", label: "Кавові напої" },
  { value: "cocktails", label: "Коктейлі" },
  { value: "alco", label: "Алкогольні напої" },
]

// ===== Helpers =====
const getTypeColor = (type?: string) => {
  switch (type) {
    case "beer":
      return "bg-yellow-100 text-yellow-800"
    case "tincture":
      return "bg-purple-100 text-purple-800"
    case "brandy":
      return "bg-amber-100 text-amber-800"
    case "vodka":
      return "bg-blue-100 text-blue-800"
    case "rum":
      return "bg-orange-100 text-orange-800"
    case "gin":
      return "bg-green-100 text-green-800"
    case "whisky":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeText = (type?: string) => {
  switch (type) {
    case "beer":
      return "Пиво"
    case "tincture":
      return "Наливка"
    case "brandy":
      return "Бренді"
    case "vodka":
      return "Горілка"
    case "rum":
      return "Ром"
    case "gin":
      return "Джин"
    case "whisky":
      return "Віскі"
    default:
      return "Напій"
  }
}

// ОСНОВНИЙ КОМПОНЕНТ (СПИСОК МЕНЮ)
export default function MenuPage() {
  const [section, setSection] = useState<"menu" | "bar">("menu")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>("main")
  const [selectedBarTab, setSelectedBarTab] = useState<string>("alco")
  const [selectedDish, setSelectedDish] = useState<FoodItem | BarItem | null>(null)
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null)

  // Collect all allergens from menu items for filter dropdown
  const allAllergens = Array.from(
    new Set(
      Object.values(demoMenuData)
        .flat()
        .flatMap(item => ("allergens" in item && item.allergens ? item.allergens : []))
    )
  ).filter(Boolean)


  // Filter menu items by category, allergen, and search term
  const getFilteredItems = (category: FoodCategory | "bar") => {
    let items = demoMenuData[category] || [];
    // Filter by allergen if selected
    if (selectedAllergen) {
      items = items.filter(
        item =>
          !("allergens" in item) ||
          !item.allergens ||
          !item.allergens.includes(selectedAllergen)
      );
    }
    return items.filter((item) =>
      (item.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    );
  }

  // Filter bar items by subcategory
  const getFilteredBarItems = (barTab: string) => {
    let items = getFilteredItems("bar")
    // Example: you can adjust the logic below to match your real data structure
    if (barTab === "nonalco") {
      items = items.filter(item =>
        ("category" in item && item.category?.toLowerCase().includes("безалкоголь")) ||
        ("type" in item && item.type === "beer" && item.name?.toLowerCase().includes("б/а"))
      )
    } else if (barTab === "coffee") {
      items = items.filter(item =>
        ("category" in item && item.category?.toLowerCase().includes("кава")) ||
        item.name?.toLowerCase().includes("кава") ||
        item.name?.toLowerCase().includes("еспресо")
      )
    } else if (barTab === "cocktails") {
      items = items.filter(item =>
        ("category" in item && item.category?.toLowerCase().includes("коктейль")) ||
        item.name?.toLowerCase().includes("коктейль")
      )
    } else if (barTab === "alco") {
      items = items.filter(item =>
        "type" in item &&
        ["beer", "tincture", "brandy", "vodka", "rum", "gin", "whisky"].includes(item.type)
        && !item.name?.toLowerCase().includes("б/а")
      )
    }
    return items
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Меню ресторану</h1>
        <p className="text-gray-600">Повний каталог страв та напоїв з інгредієнтами та алергенами</p>
      </div>

      {/* Section Switcher 
      <div className="flex gap-4 mb-8">
        <Button
          variant={section === "menu" ? "default" : "outline"}
          className={section === "menu" ? "bg-orange-500 text-white" : ""}
          onClick={() => setSection("menu")}
        >
          Меню
        </Button>
        <Button
          variant={section === "bar" ? "default" : "outline"}
          className={section === "bar" ? "bg-orange-500 text-white" : ""}
          onClick={() => setSection("bar")}
        >
          Бар
        </Button>
      </div>

      {/* Search and Allergen Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук страв та напоїв..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm text-gray-600">Без алергену:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedAllergen || ""}
            onChange={e => setSelectedAllergen(e.target.value || null)}
          >
            <option value="">Всі страви</option>
            {allAllergens.map((allergen, idx) => (
              <option key={idx} value={allergen}>{allergen}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs for Menu or Bar */}
      {section === "menu" ? (
        <Tabs value={selectedCategory} onValueChange={v => setSelectedCategory(v as FoodCategory)} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {/* Food category tabs */}
            {categoryTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>

          {/* Render Food Categories */}
          {categoryTabs
            .filter(tab => tab.value !== "bar")
            .map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredItems(tab.value).map(item => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow border-orange-100">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="text-lg font-bold text-orange-600">{item.price}</div>
                        </div>
                        {("ingredients" in item) && item.ingredients && (
                          <CardDescription className="text-sm">{item.ingredients}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                        <div className="space-y-2 mb-4">
                          {("cookingTime" in item) && item.cookingTime && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {item.cookingTime}
                            </div>
                          )}
                          {("weight" in item) && item.weight && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2" />
                              {item.weight}
                            </div>
                          )}
                        </div>
                        {("allergens" in item) && item.allergens && item.allergens.length > 0 && (
                          <div className="mb-4">
                            <div className="text-xs text-gray-600 mb-1">Алергени:</div>
                            <div className="flex flex-wrap gap-1">
                              {item.allergens.map((allergen, idx) => (
                                <Badge key={idx} className="bg-red-100 text-red-800 text-xs">{allergen}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {("warning" in item) && item.warning && (
                          <div className="flex items-center text-xs text-orange-600 mb-4">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {item.warning}
                          </div>
                        )}
                        {("isWeighted" in item) && item.isWeighted && (
                          <Badge className="bg-blue-100 text-blue-800 mb-4">Вагова страва</Badge>
                        )}
                        <div className="flex space-x-2">
                          {("images" in item) && item.images && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
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
                                  {item.images.map((image, idx) => (
                                    <div key={idx} className="relative h-60 w-full">
                                      <img
                                        src={image || "/placeholder.svg"}
                                        alt={`${item.name} - фото ${idx + 1}`}
                                        className="h-full w-full object-cover rounded-md"
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                                  <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу,
                                  якщо ви справді зацікавлені у запуску цієї функції,{" "}
                                  <a href="/ff" className="underline font-medium">зверніться до розробника</a>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          {("videoUrl" in item) && item.videoUrl && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
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
                                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                                  <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу,
                                  якщо ви справді зацікавлені у запуску цієї функції,{" "}
                                  <a href="/ff" className="underline font-medium">зверніться до розробника</a>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
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
      ) : (
        <Tabs value={selectedBarTab} onValueChange={setSelectedBarTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {barTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {barTabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredBarItems(tab.value).map(item => {
                  const barItem = item as BarItem
                  return (
                    <Card key={barItem.id} className="hover:shadow-lg transition-shadow border-orange-100">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{barItem.name}</CardTitle>
                            <CardDescription className="text-sm font-medium text-orange-600">{barItem.category}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-600">{barItem.price}</div>
                            <Badge className={getTypeColor(barItem.type)}>{getTypeText(barItem.type)}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-4">{barItem.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Міцність:</span>
                            <span className="font-medium">{barItem.alcohol}</span>
                          </div>
                          {barItem.country && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Країна:</span>
                              <span className="font-medium">{barItem.country}</span>
                            </div>
                          )}
                          {barItem.type_detail && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Тип:</span>
                              <span className="font-medium">{barItem.type_detail}</span>
                            </div>
                          )}
                          {barItem.ingredients && (
                            <div className="mt-3">
                              <div className="text-xs text-gray-600 mb-1">Інгредієнти:</div>
                              <p className="text-xs text-gray-700">{barItem.ingredients}</p>
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <div className="text-xs text-gray-600 mb-1">Доступні об'єми:</div>
                          <div className="flex flex-wrap gap-1">
                            {barItem.volumes.map((volume, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{volume}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setSelectedDish(barItem)}>
                          Детальніше
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Selected Dish/Drink Dialog */}
      {selectedDish && (
        <Dialog open={!!selectedDish} onOpenChange={open => !open && setSelectedDish(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDish.name}</span>
                <span className="text-orange-600">{selectedDish.price}</span>
              </DialogTitle>
              <DialogDescription>
                {"ingredients" in selectedDish && selectedDish.ingredients
                  ? selectedDish.ingredients
                  : "category" in selectedDish
                  ? selectedDish.category
                  : ""}
                {"type" in selectedDish && (
                  <Badge className={`ml-2 ${getTypeColor(selectedDish.type)}`}>{getTypeText(selectedDish.type)}</Badge>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              {"images" in selectedDish && selectedDish.images && (
                <div className="relative h-60 w-full">
                  <img
                    src={selectedDish.images[0] || "/placeholder.svg"}
                    alt={selectedDish.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Опис</h4>
                <p className="text-gray-700">{selectedDish.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Деталі</h4>
                  <div className="space-y-2">
                    {"cookingTime" in selectedDish && selectedDish.cookingTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Час приготування: {selectedDish.cookingTime}
                      </div>
                    )}
                    {"weight" in selectedDish && selectedDish.weight && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Вага: {selectedDish.weight}
                      </div>
                    )}
                    {"alcohol" in selectedDish && selectedDish.alcohol && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Wine className="h-4 w-4 mr-2" />
                        Міцність: {selectedDish.alcohol}
                      </div>
                    )}
                    {"country" in selectedDish && selectedDish.country && (
                      <div className="text-sm">
                        <span className="text-gray-600">Країна:</span> {selectedDish.country}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {"allergens" in selectedDish && selectedDish.allergens && selectedDish.allergens.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Алергени</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDish.allergens.map((allergen, idx) => (
                          <Badge key={idx} className="bg-red-100 text-red-800 text-xs">{allergen}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {"volumes" in selectedDish && selectedDish.volumes && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Доступні об'єми</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDish.volumes.map((volume, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{volume}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {"warning" in selectedDish && selectedDish.warning && (
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
                {"videoUrl" in selectedDish && selectedDish.videoUrl && (
                  <Button
                    variant="outline"
                    className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => window.open(selectedDish.videoUrl, "_blank")}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Дивитися відео
                  </Button>
                )}
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  {"type" in selectedDish ? "Замовити напій" : "Додати до замовлення"}
                </Button>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції,{" "}
                <a href="/ff" className="underline font-medium">зверніться до розробника</a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}