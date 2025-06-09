"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, ImageIcon, Info, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const servingRules = {
  straws: {
    title: "+ Трубочка",
    icon: "🥤",
    description: "Напої, які подаються з трубочкою",
    items: [
      {
        id: 1,
        name: "Соки",
        description: "Свіжовичавлені та пакетовані соки",
        rules: ["Обов'язково з трубочкою", "Трубочка має бути в упаковці до моменту подачі"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        name: "Коктейлі",
        description: "Алкогольні та безалкогольні коктейлі",
        rules: ["Подати на підносі з трубочкою"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        name: "Фреші",
        description: "Свіжовичавлені соки з фруктів",
        rules: ["Подавати одразу після приготування", "З трубочкою"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  coffee: {
    title: "З печевом, ложкою та блюдцем",
    icon: "☕",
    description: "Кавові напої з повним сервірування",
    items: [
      {
        id: 4,
        name: "Рістретто",
        description: "Концентрований еспресо, менший об'єм",
        rules: [
          "Подавати в маленькій кавовій чашці (60-70 мл)",
          "На блюдці з кавовою ложечкою",
          "Печево або цукерка на блюдці",
          "Подавати гарячим одразу після приготування",
        ],
        volume: "15-20 мл",
        temperature: "65-70°C",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 5,
        name: "Еспресо",
        description: "Класичний італійський кавовий напій",
        rules: [
          "Подавати в кавовій чашці (70-80 мл)",
          "На блюдці з кавовою ложечкою",
          "Печево на блюдці",
          "Окремо склянка води та дощечка замість блюдця для води",
          "Подавати одразу після приготування",
        ],
        volume: "25-30 мл",
        temperature: "65-70°C",
        special: "З водою та дощечкою",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 6,
        name: "Американо",
        description: "Еспресо, розбавлений гарячою водою",
        rules: [
          "Подається з бару в більшій кавовій чашці",
          "На блюдці з кавовою ложечкою",
          "Печево на блюдці",
          "Можна додати молоко окремо за бажанням",
        ],
        volume: "90 мл",
        temperature: "65-70°C",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 7,
        name: "Допіо",
        description: "Подвійний еспресо",
        rules: ["На блюдці з кавовою ложечкою", "Печево на блюдці", "Подавати гарячим одразу після приготування"],
        volume: "60 мл",
        temperature: "65-70°C",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  beer: {
    title: "Бочонок з соняшниковим насінням",
    icon: "🍺",
    description: 'Спеціальне сервірування для пива "Слава Україні"',
    items: [
      {
        id: 8,
        name: "1 літрове пиво",
        description: "Велика порція пива з традиційною закускою",
        rules: ["Обов'язково з бочонком соняшникового насіння", "Бочонок ставити поруч з келихом", "Піна 2-3 см"],
        volume: "1000 мл",
        special: "З бочонком соняшникового насіння",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

export default function ServingPage() {
  const [selectedCategory, setSelectedCategory] = useState("straws")
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const currentCategory = servingRules[selectedCategory as keyof typeof servingRules]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Сервірування</h1>
        <p className="text-gray-600">Правила подачі напоїв та сервірування для помічників офіціантів</p>
      </div>

      {/* FF Notice */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="text-sm text-blue-800">
          <strong>FF:</strong> Фотографії прикладів сервірування будуть додані після налаштування медіа сервера
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="straws" className="flex items-center">
            🥤 З трубочкою
          </TabsTrigger>
          <TabsTrigger value="coffee" className="flex items-center">
            ☕ Кава з сервірування
          </TabsTrigger>
          <TabsTrigger value="beer" className="flex items-center">
            🍺 Пиво з насінням
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

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  {item.volume && <Badge className="bg-blue-100 text-blue-800 w-fit">Об'єм: {item.volume}</Badge>}
                  {item.temperature && (
                    <Badge className="bg-red-100 text-red-800 w-fit">Температура: {item.temperature}</Badge>
                  )}
                  {item.special && (
                    <Badge className="bg-yellow-100 text-yellow-800 w-fit">Особливість: {item.special}</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {/* Photo Placeholder */}
                  <div className="mb-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Фото приклад сервірування</p>
                      <p className="text-xs">Буде додано пізніше</p>
                    </div>
                  </div>

                  {/* Rules Preview */}
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

                  {/* Examples */}
                  {item.examples && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">Приклади:</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.examples.slice(0, 2).map((example: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                        {item.examples.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.examples.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

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
                          <DialogDescription>��отографія правильного сервірування</DialogDescription>
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
                          <strong>FF:</strong> Фотографії прикладів сервірування будуть додані після налаштування медіа
                          сервера
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => setSelectedItem(item)}>
                      Детальніше
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Item Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="text-2xl mr-3">{currentCategory.icon}</span>
                {selectedItem.name}
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              {/* Photo Section */}
              <div className="relative h-60 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Фото приклад сервірування</p>
                  <p className="text-sm">{selectedItem.name}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Rules */}
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

                {/* Details */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    Деталі
                  </h4>
                  <div className="space-y-3">
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
                        <div className="font-medium">{selectedItem.special}</div>
                      </div>
                    )}
                    {selectedItem.examples && (
                      <div>
                        <span className="text-sm text-gray-600">Приклади:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.examples.map((example: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
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

      {/* General Tips */}
      <div className="mt-12">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Coffee className="h-5 w-5 text-green-600 mr-2" />
              Загальні поради для помічників
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700 space-y-3">
            <div>
              <strong>Чистота:</strong> Завжди перевіряйте чистоту посуду, склянок та приборів перед сервіруванням.
            </div>
            <div>
              <strong>Презентація:</strong> Акуратно розміщуйте всі елементи сервірування на підносі.
            </div>
            <div>
              <strong>Швидкість:</strong> Пиво подавати одразу після приготування, поки не сіла пінка.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
