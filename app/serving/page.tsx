"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Coffee, ImageIcon, Info, CheckCircle, Search, UtensilsCrossed, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const servingRules = {
  food: {
    title: "Їжа",
    icon: "🍽️",
    description: "Правила сервірування страв для помічників офіціантів",
    items: [
      {
        id: 1,
        name: "Хачапурі по-аджарськи",
        description: "Грузинська страва з сиром",
        category: "З звичайною вилкою",
        rules: ["2 вилки для хачапурі по-аджарськи", "Подавати гарячим"],
        searchTerms: ["хачапурі", "аджарськи", "грузинська", "сир"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        name: "За коментарем",
        description: "Страви з особливими вимогами в коментарі",
        rules: ["Звертати увагу на коментар в чеку", "Сервірування може бути змінене"],
        searchTerms: ["коментар", "особливе", "зміна"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        name: "Всі бульйони та зупи (бульйон з півня, )",
        description: "Перша страва",
        category: "З звичайною ложкою",
        rules: ["Подавати з звичайною столовою ложкою", "Гаряча подача"],
        searchTerms: ["бульйон", "півень", "суп", "перша"],
        image: "/супи.svg?height=300&width=400",
      },

      {
        id: 5,
        name: "Грибна зупа",
        description: "Перша страва з грибами",
        category: "З звичайною ложкою",
        rules: ["Подавати з звичайною ложкою", "Гаряча подача"],
        searchTerms: ["грибна", "зупа", "гриби", "перша"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 6,
        name: "Журик",
        description: "Польська кисла зупа",
        category: "З звичайною ложкою",
        rules: ["Подавати з звичайною ложкою", "Традиційна подача"],
        searchTerms: ["журик", "польська", "кисла", "зупа"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 7,
        name: "Харчо з ягнятини",
        description: "Грузинська зупа з ягнятини",
        category: "З звичайною ложкою",
        rules: ["Подавати з звичайною ложкою", "Гостра страва"],
        searchTerms: ["харчо", "ягнятина", "грузинська", "зупа"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 8,
        name: "Фруктові льоди",
        description: "Морозиво з фруктовим смаком",
        category: "З десертною ложкою",
        rules: ["Подавати з десертною ложкою", "холодне"],
        searchTerms: ["фруктові", "льоди", "морозиво", "десерт"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 9,
        name: "Пивні льоди",
        description: "Морозиво з пивним смаком",
        category: "З десертною ложкою",
        rules: ["Подавати з десертною ложкою", "холодне"],
        searchTerms: ["пивні", "льоди", "морозиво", "пиво"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 10,
        name: "Чоколяда",
        description: "Морозиво, шоколадний фондан, ягоди",
        category: "З десертною ложкою",
        rules: ["Подавати з десертною ложкою", "Тарілка з імітацією шоколадного боба"],
        searchTerms: ["чоколяда", "шоколад", "боб", "десерт"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 11,
        name: "Багратоні",
        description: "Аналогія на торт наполеон",
        category: "З десертною ложкою та вилкою",
        rules: ["Подавати з десертною ложкою та вилкою", "Делікатна подача"],
        searchTerms: ["багратоні", "наполеон", "торт", "десерт"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 12,
        name: "Чізкейк",
        description: "Сирний торт",
        category: "З десертною ложкою та вилкою",
        rules: ["Подавати з десертною ложкою та вилкою", "Охолоджений"],
        searchTerms: ["чізкейк", "сирний", "торт", "десерт"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 13,
        name: "Страви з собою",
        description: "В фірмових коробках для винесення",
        category: "Окремо",
        rules: ["В коробках з собою", "Враховувати соуси", "Перевірити комплектність"],
        searchTerms: ["з собою", "коробка", "винесення", "соуси"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 14,
        name: "Виноградні равлики",
        description: "Грузинська закуска",
        category: "Окремо",
        rules: ["Особлива подача", "З маленькою 2-зубою вилкою та щипцями"],
        searchTerms: ["равлики", "ткемалі", "оригінальна подача"],
        image: "/images/serving/snails.jpg",
      },
      {
        id: 15,
        name: "Шоті",
        description: "Грузинський хліб",
        category: "Окремо",
        rules: ["Подається на дошці з маленькими металевими ручками"],
        searchTerms: ["шоті", "грузинський", "хліб", "дошка"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 16,
        name: "Грузинський презент",
        description: "ВАЖЛИВО! Особлива подача",
        category: "Окремо",
        rules: ["Шоті на коробочку з молотком", "Соусниця з 30 грам зеленої олії", "З СОБОЮ: Шоті завернуте в 2 паперові пакети"],
        special: "ВАЖЛИВО",
        searchTerms: ["грузинський", "презент", "лодочка", "молоток", "зелена олія"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  drinks: {
    title: "Напої",
    icon: "🥤",
    description: "Правила сервірування напоїв для помічників офіціантів",
    items: [
      {
        id: 17,
        name: "Соки",
        description: "Свіжовичавлені та пакетовані соки",
        category: "З трубочкою",
        rules: ["Обов'язково з трубочкою", "Трубочка має бути в упаковці до моменту подачі"],
        searchTerms: ["соки", "сік", "фреш", "трубочка"],
        image: "/images/serving/juice.jpg",
      },
      {
        id: 18,
        name: "Коктейлі",
        description: "Алкогольні та безалкогольні коктейлі",
        category: "З трубочкою",
        rules: ["Подати на підносі з трубочкою"],
        searchTerms: ["коктейль", "алкогольні", "оригінальна подача"],
        image: "/images/serving/juice.jpg",
      },
      {
        id: 19,
        name: "Фреші",
        description: "Свіжовичавлені соки з фруктів в льоді",
        category: "З трубочкою",
        rules: ["Подавати одразу після приготування", "З трубочкою"],
        searchTerms: ["фреші", "фреш", "свіжовичавлені", "фрукти"],
        image: "/images/serving/juice.jpg",
      },
      {
        id: 20,
        name: "Рістретто",
        description: "Половина допіо (15мл)",
        category: "З печевом, ложкою та блюдцем",
        rules: [
          "На блюдці з кавовою ложечкою",
          "Печево на блюдці",
          "Подавати гарячим одразу після приготування",
        ],
        volume: "15-20 мл",
        temperature: "65-70°C",
        searchTerms: ["рістретто", "еспресо", "кава", "концентрований"],
        image: "/images/serving/espresso.jpg",
      },
      {
        id: 21,
        name: "Еспресо",
        description: "Класичний італійський кавовий напій",
        category: "З печевом, ложкою та блюдцем",
        rules: [
          "Подається в мальненькій чорній чашці",
          "Додатково склянка води (0,2л) та дощечка замість блюдця",
          "На з кавовою ложечкою",
          "Печево біля чашки",
          "Подавати одразу після приготування",
          "Набір цукру (цукор в пакетиках, кубиках)",
        ],
        volume: "25-35 мл",
        temperature: "65-70°C",
        special: "З водою та дощечкою",
        searchTerms: ["еспресо", "кава", "італійський", "вода", ],
        image: "/images/serving/espresso.jpg",
      },
      {
        id: 22,
        name: "Американо",
        description: "Еспресо, розбавлений гарячою водою",
        category: "З печевом, ложкою та блюдцем",
        rules: [
          "Подається з бару в більшій кавовій чашці",
          "На блюдці з кавовою ложечкою",
          "Печево на блюдці",
          "Набір цукру (цукор в пакетиках, кубиках)",
        ],
        volume: "90 мл",
        temperature: "65-70°C",
        searchTerms: ["американо", "кава", "розбавлений", "молоко"],
        image: "/images/serving/coffee_drinks.jpg",
      },
      {
        id: 23,
        name: "Допіо",
        description: "Подвійний еспресо",
        category: "З печевом, ложкою та блюдцем",
        rules: ["На блюдці з кавовою ложечкою", "Печево", "Подавати гарячим одразу після приготування", "Набір цукру (цукор в пакетиках, кубиках)",],
        volume: "60 мл",
        temperature: "65-70°C",
        searchTerms: ["допіо", "подвійний", "еспресо", "кава"],
        image: "/images/serving/espresso.jpg",
      },

      {
        id: 24,
        name: "1 літрове пиво",
        description: "Велика порція пива з традиційною закускою",
        category: "Бочонок з соняшниковим насінням",
        rules: ["Обов'язково з бочонком соняшникового насіння", "Бочонок ставити поруч з келихом", "Піна 2-3 см"],
        volume: "1000 мл",
        special: "З бочонком соняшникового насіння",
        searchTerms: ["пиво", "літрове", "бочонок", "соняшникове насіння"],
        image: "/placeholder.svg?height=300&width=400",
      },

      {
        id: 25,
        name: "Содова pepsi 0,25л",
        description: "Газований напій Pepsi в скляній пляшці",
        category: "З склянкою 0.3л (Рокс)",
        rules: ["На підносі", "Зі стаканом для напою"],
        volume: "250 мл",
        searchTerms: ["напій", "pepsi", "содова", "газований"],
        image: "/images/serving/pepsi.jpg",
      },
      {
        id: 26,
        name: "Б/А пиво Stella Artois 0,33л",
        description: "Безалгогольний лагер в алюмінієвій банці",
        category: "З склянкою 0.3л (Пшеник)",
        rules: ["На підносі", "Зі стаканом для напою"],
        volume: "330 мл",
        searchTerms: ["пиво", "безалкогольне", "стелла артоіс"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

type ServingItem = {
  id: number
  name: string
  description: string
  category?: string
  rules: string[]
  searchTerms: string[]
  volume?: string
  temperature?: string
  special?: string
  image?: string
}

// Main component
export default function ServingPage() {
  const [selectedCategory, setSelectedCategory] = useState<"food" | "drinks">("food")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<ServingItem | null>(null)

  const currentCategory =
    selectedCategory === "food" ? servingRules.food : servingRules.drinks

  // Filter items based on search query
  const filteredItems = currentCategory.items.filter((item: ServingItem) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query)) ||
      item.searchTerms.some((term) => term.toLowerCase().includes(query))
    )
  })

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      const category = item.category ?? "Інше"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, ServingItem[]>,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Сервірування</h1>
        <p className="text-gray-600">Правила подачі страв та напоїв для помічників офіціантів</p>
      </div>

      {/* FF Notice */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="text-sm text-blue-800">
          <strong>FF:</strong> Фотографії прикладів сервірування будуть додані після налаштування медіа сервера
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук страв та напоїв..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as "food" | "drinks")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="food" className="flex items-center">
            🍽️ Їжа
          </TabsTrigger>
          <TabsTrigger value="drinks" className="flex items-center">
            🥤 Напої
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory}>
          {/* Category Header */}
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <span className="text-2xl mr-3">{currentCategory.icon}</span>
                {currentCategory.title}
              </CardTitle>
              <CardDescription className="text-base">{currentCategory.description}</CardDescription>
            </CardHeader>
          </Card>

      
          {searchQuery && (
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600">
                Знайдено {filteredItems.length} результат(ів) для "{searchQuery}"
              </p>
            </div>
          )}

       
          {Object.entries(groupedItems).map(([categoryName, items]) => (
            <div key={categoryName} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <UtensilsCrossed className="h-5 w-5 mr-2 text-orange-500" />
                {categoryName}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow border-orange-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        {item.name}
                        {item.special === "ВАЖЛИВО" && <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                      {item.volume && <Badge className="bg-blue-100 text-blue-800 w-fit">Об'єм: {item.volume}</Badge>}
                      {item.temperature && (
                        <Badge className="bg-red-100 text-red-800 w-fit">Температура: {item.temperature}</Badge>
                      )}
                      {item.special && (
                        <Badge className="bg-yellow-100 text-yellow-800 w-fit">
                          {item.special === "ВАЖЛИВО" ? "⚠️ ВАЖЛИВО" : item.special}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                    
                      <div className="mb-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Фото приклад сервірування</p>
                          <p className="text-xs">Буде додано пізніше</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-sm">Основні правила:</h4>
                        <ul className="space-y-1">
                          {item.rules.slice(0, 2).map((rule: string, index: number) => (
                            <li key={index} className="flex items-start text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              {rule}
                            </li>
                          ))}
                          {item.rules.length > 2 && (
                            <li className="text-xs text-gray-500">+ ще {item.rules.length - 2} правил...</li>
                          )}
                        </ul>
                      </div>

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
                              <DialogTitle>{item.name} - Приклад сервірування</DialogTitle>
                              <DialogDescription>Фотографія правильного сервірування</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="relative h-60 w-full bg-gray-100 rounded-md flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                  <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                                  <p className="text-lg font-medium mb-2">Фото приклад</p>
                                  <p className="text-sm">Правильне сервірування {item.name.toLowerCase()}</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                              <strong>FF:</strong> Фотографії прикладів сервірування будуть додані після налаштування
                              медіа сервера
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          className="flex-1 bg-orange-500 hover:bg-orange-600"
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
          ))}


          {searchQuery && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нічого не знайдено</h3>
              <p className="text-gray-600">Спробуйте змінити пошуковий запит</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

   
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="text-2xl mr-3">{currentCategory.icon}</span>
                {selectedItem.name}
                {selectedItem.special === "ВАЖЛИВО" && <AlertTriangle className="h-5 w-5 ml-2 text-red-500" />}
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
      
              <div className="relative h-60 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Фото приклад сервірування</p>
                  <p className="text-sm">{selectedItem.name}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
          
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Правила сервірування
                  </h4>
                  <ul className="space-y-2">
                    {selectedItem.rules.map((rule: string, index: number) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    Деталі
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Категорія:</span>
                      <div className="font-medium">{selectedItem.category}</div>
                    </div>
                    {selectedItem.volume && (
                      <div>
                        <span className="text-sm text-gray-600">Об'єм:</span>
                        <div className="font-medium">{selectedItem.volume}</div>
                      </div>
                    )}
                    {selectedItem.temperature && (
                      <div>
                        <span className="text-sm text-gray-600">Температура:</span>
                        <div className="font-medium">{selectedItem.temperature}</div>
                      </div>
                    )}
                    {selectedItem.special && (
                      <div>
                        <span className="text-sm text-gray-600">Особливість:</span>
                        <div className="font-medium flex items-center">
                          {selectedItem.special === "ВАЖЛИВО" && (
                            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                          )}
                          {selectedItem.special}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                <strong>FF:</strong> Фотографії прикладів сервірування будуть додані після налаштування медіа сервера
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* General Rules */}
      <div className="mt-12 space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Загальні правила
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-700 space-y-3">
            <div>
              <strong>1. Коментарі в чеку:</strong> Завжди звертайте увагу на коментар в чеку - там може бути змінене
              сервірування.
            </div>
            <div>
              <strong>2. Перевірка офіціантом:</strong> Всі страви та напої сервіруються помічником, але на станції
              (перед видачею) офіціант перевіряє подачу та може виправити помилку помічника.
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Coffee className="h-5 w-5 text-green-600 mr-2" />
              Поради для помічників
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700 space-y-3">
            <div>
              <strong>Ефективність:</strong> Для продуктивного виконання рутинних завданнь не забувайте враховувати наступне: 1. Планування маршруту по закладу, 2. Завантаження/розвантаження ліфта/підносу, 3. Навантаження інших працівників, це збереже вам не тільки сили а і час.
            </div>
            
            <div>
              <strong>Допомога:</strong> Надзвичайно важлива складова командної роботи, в процесі виконання своїх обов'язків звертайте увагу чи не потрібна комусь допомогти, будьте добрими один до одного.
            </div>
            
            <div>
              <strong>Кількість посуду:</strong> Під час роботи важливо враховувати УСІ місця де може бути посуд/прибори (станції, мийка, бар, столи, ліфт) та підтримувати рівномірину кількість на своєму місці.
            </div>

            <div>
              <strong>Чистота:</strong> Завжди перевіряти чистоту посуду, склянок та приборів на наявність розводів чи решток їжі перед сервіруванням.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
