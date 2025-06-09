"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, Users, AlertTriangle, ImageIcon, Video, ExternalLink, Wine } from "lucide-react"
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
  bar: [
    // Beer Section
    {
      id: 12,
      name: "Слава Україні",
      category: "Пиво власного виробництва",
      description: "Світле насичене пиво власного виробництва, не фільтроване, не пастеризоване",
      alcohol: "3.6%",
      volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
      price: "від 80 ₴",
      type: "beer",
    },
    {
      id: 13,
      name: "Наше Пшеничне",
      category: "Пиво власного виробництва",
      description: "Пшеничне пиво з ноткою кислинки, не фільтроване, не пастеризоване",
      alcohol: "4.6%",
      volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
      price: "від 85 ₴",
      type: "beer",
    },
    {
      id: 14,
      name: "Наше темне",
      category: "Пиво власного виробництва",
      description: "Темне пиво з нотками карамелі та гірчинкою, не фільтроване, не пастеризоване",
      alcohol: "6%",
      volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
      price: "від 90 ₴",
      type: "beer",
    },
    {
      id: 15,
      name: "IPA",
      category: "Пиво власного виробництва",
      description: "Квітковий аромат і гіркий посмак, не фільтроване, не пастеризоване",
      alcohol: "8.2%",
      volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
      price: "від 95 ₴",
      type: "beer",
    },
    {
      id: 16,
      name: "Дегустаційний набір пива",
      category: "Пиво власного виробництва",
      description: "Сет світлого, темного, пшеничного та IPA по 100 мл кожного",
      alcohol: "3.6-8.2%",
      volumes: ["4x100мл"],
      price: "180 ₴",
      type: "beer",
    },
    {
      id: 17,
      name: "Стела б/а",
      category: "Безалкогольне пиво",
      description: "Безалкогольне пиво",
      alcohol: "0%",
      volumes: ["0.35л"],
      price: "65 ₴",
      type: "beer",
    },
    // Наливки
    {
      id: 18,
      name: "Восковуха (Обліпихова)",
      category: "Наливки",
      description: "З виразним смаком обліпихи, кисло-солодка. Обліпиха, цукровий сироп, лимонна кислота",
      alcohol: "18-22°",
      ingredients: "Обліпиха, цукровий сироп, лимонна кислота",
      volumes: ["від 50мл до безкінченності"],
      price: "від 45 ₴",
      type: "tincture",
    },
    {
      id: 19,
      name: "Калганівка",
      category: "Наливки",
      description: "З виразним смаком калган, привкус цитрусових",
      alcohol: "32-34°",
      ingredients: "Корінь калгану, корінь солодки, паличка кориці, цедра лимона, мед",
      volumes: ["від 50мл до безкінченності"],
      price: "від 55 ₴",
      type: "tincture",
    },
    {
      id: 20,
      name: "Малинівка",
      category: "Наливки",
      description: "З виразним смаком малини, солодка",
      alcohol: "14°",
      ingredients: "Малина, цукор",
      volumes: ["від 50мл до безкінченності"],
      price: "від 40 ₴",
      type: "tincture",
    },
    {
      id: 21,
      name: "Еліксир Здоров'я (Бехеровка, Штекелівка)",
      category: "Наливки",
      description: "З виразним смаком прянощів, привкус солодкого апельсина",
      alcohol: "34-36°",
      ingredients: "Спеції (кориця, гвоздика, кардамон, аніс, бадьян, перець духмяний), цукор, цедра апельсину",
      volumes: ["від 50мл до безкінченності"],
      price: "від 60 ₴",
      type: "tincture",
    },
    {
      id: 22,
      name: "Хріновуха",
      category: "Наливки",
      description: "З виразним смаком хрону, пекуча",
      alcohol: "36-38°",
      ingredients: "Корінь хрону, перець чілі, мед",
      volumes: ["від 50мл до безкінченності"],
      price: "від 50 ₴",
      type: "tincture",
    },
    {
      id: 23,
      name: "Лісова Ягода",
      category: "Наливки",
      description: "З виразним смаком смородини, солодка",
      alcohol: "18°",
      ingredients: "Смородина, цукор",
      volumes: ["від 50мл до безкінченності"],
      price: "від 45 ₴",
      type: "tincture",
    },
    // Чача та самогон
    {
      id: 24,
      name: "Чача",
      category: "Фруктові/зернові бренді",
      description:
        "Національний грузинський напій на основі виноградних кісточок. Не горілка чи самогон, а різновид бренді з фруктово-ягідною основою",
      alcohol: "40°",
      volumes: ["50мл", "100мл"],
      price: "від 80 ₴",
      type: "brandy",
    },
    {
      id: 25,
      name: "Самогон дубовий (червоний)",
      category: "Фруктові/зернові бренді",
      description: "Аромат меду",
      alcohol: "42°",
      volumes: ["50мл", "100мл"],
      price: "від 70 ₴",
      type: "brandy",
    },
    {
      id: 26,
      name: "Самогон хмільний",
      category: "Фруктові/зернові бренді",
      description: "Аромат зеленого яблука",
      alcohol: "42°",
      volumes: ["50мл", "100мл"],
      price: "від 70 ₴",
      type: "brandy",
    },
    // Бренді та коньяк
    {
      id: 27,
      name: "Бренді Арарат",
      category: "Бренді",
      description: "Вірменський бренді 5 зірок",
      alcohol: "40°",
      country: "Вірменія",
      volumes: ["50мл", "100мл"],
      price: "від 120 ₴",
      type: "brandy",
    },
    {
      id: 28,
      name: "Бренді Довбуш",
      category: "Бренді",
      description: "Український бренді 5 зірок",
      alcohol: "40°",
      country: "Україна",
      volumes: ["50мл", "100мл"],
      price: "від 100 ₴",
      type: "brandy",
    },
    {
      id: 29,
      name: "Бренді Сараджашвілі",
      category: "Бренді",
      description: "Грузинський бренді 5 зірок",
      alcohol: "40°",
      country: "Грузія",
      volumes: ["50мл", "100мл"],
      price: "від 110 ₴",
      type: "brandy",
    },
    // Горілка
    {
      id: 30,
      name: "Nemiroff штоф",
      category: "Горілка",
      description: "Класична українська горілка",
      alcohol: "40°",
      country: "Україна",
      volumes: ["50мл", "100мл", "пляшка"],
      price: "від 60 ₴",
      type: "vodka",
    },
    {
      id: 31,
      name: "Nemiroff Deluxe",
      category: "Горілка",
      description: "Преміум горілка (класична, медова з перцем, дика журавлина)",
      alcohol: "40°",
      country: "Україна",
      volumes: ["50мл", "100мл", "пляшка"],
      price: "від 70 ₴",
      type: "vodka",
    },
    {
      id: 32,
      name: "Vodka Absolut",
      category: "Горілка",
      description: "Шведська преміум горілка",
      alcohol: "40°",
      country: "Швеція",
      volumes: ["50мл", "100мл"],
      price: "від 90 ₴",
      type: "vodka",
    },
    {
      id: 33,
      name: "Старицький-Левицький",
      category: "Горілка",
      description: "Українська преміум горілка",
      alcohol: "40°",
      country: "Україна",
      volumes: ["50мл", "100мл"],
      price: "від 80 ₴",
      type: "vodka",
    },
    // Ром
    {
      id: 34,
      name: "Havana Club Anejo 3 Anos",
      category: "Ром",
      description: "Дуже приємний смак з нотками диму, ванілі та шоколаду",
      alcohol: "40°",
      country: "Куба",
      volumes: ["50мл", "100мл"],
      price: "від 120 ₴",
      type: "rum",
    },
    {
      id: 35,
      name: "Havana Club Anejo Especial",
      category: "Ром",
      description: "Багатий, збалансований смак з нотами карамелі, ванілі, тютюну, кориці й апельсинової шкірки",
      alcohol: "40°",
      country: "Куба",
      volumes: ["50мл", "100мл"],
      price: "від 130 ₴",
      type: "rum",
    },
    {
      id: 36,
      name: "Kraken",
      category: "Ром",
      description: "Темний бурштиновий ром з пряними відтінками ванілі, гвоздики, ароматом кориці",
      alcohol: "40°",
      country: "Ірландія",
      volumes: ["50мл", "100мл"],
      price: "від 140 ₴",
      type: "rum",
    },
    // Джин
    {
      id: 37,
      name: "Beefeater London gin",
      category: "Джин",
      description: "Приємний терпкий смак з нотами ялівцю і цитрусових. Сухий посмак з ароматом цитрусових",
      alcohol: "40°",
      country: "Велика Британія",
      volumes: ["50мл", "100мл"],
      price: "від 110 ₴",
      type: "gin",
    },
    {
      id: 38,
      name: "Beefeater London pink strawberry",
      category: "Джин",
      description: "Рожевий джин. М'який смак з цитрусово-ялівцевою терпкістю",
      alcohol: "37.5°",
      country: "Велика Британія",
      volumes: ["50мл", "100мл"],
      price: "від 120 ₴",
      type: "gin",
    },
    // Віскі
    {
      id: 39,
      name: "The Glenlivet 12 років",
      category: "Віскі",
      description:
        "Односолодове шотландське віскі. Шовковистий смак з нотками фруктів, ванілі, квітів і мигдалевого бісквіта",
      alcohol: "40%",
      country: "Шотландія",
      type_detail: "Односолодовий скоч",
      volumes: ["50мл", "100мл"],
      price: "від 180 ₴",
      type: "whisky",
    },
    {
      id: 40,
      name: "Jameson",
      category: "Віскі",
      description:
        "Купажоване ірландське віскі. Злиття ванільного, деревного та медового смаку з відтінками прянощів і лісових горіхів",
      alcohol: "40%",
      country: "Ірландія",
      type_detail: "Купажоване віскі",
      volumes: ["50мл", "100мл"],
      price: "від 150 ₴",
      type: "whisky",
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

  const getTypeColor = (type: string) => {
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

  const getTypeText = (type: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Меню ресторану</h1>
        <p className="text-gray-600">Повний каталог страв та напоїв з інгредієнтами та алергенами</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Пошук страв та напоїв..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="main">🍖 Основні</TabsTrigger>
          <TabsTrigger value="grill">🔥 Мангал</TabsTrigger>
          <TabsTrigger value="khinkali">🥟 Хінкалі</TabsTrigger>
          <TabsTrigger value="salads">🥗 Салати</TabsTrigger>
          <TabsTrigger value="desserts">🍰 Десерти</TabsTrigger>
          <TabsTrigger value="bar">🍺 Бар</TabsTrigger>
        </TabsList>

        {/* Food Categories */}
        {Object.entries(menuCategories)
          .filter(([category]) => category !== "bar")
          .map(([category, items]) => (
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
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                              <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу,
                              якщо ви справді зацікавлені у запуску цієї функції,{" "}
                              <a href="/ff" className="underline font-medium">
                                зверніться до розробника
                              </a>
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
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                              <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу,
                              якщо ви справді зацікавлені у запуску цієї функції,{" "}
                              <a href="/ff" className="underline font-medium">
                                зверніться до розробника
                              </a>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        onClick={() => setSelectedDish(item)}
                      >
                        Детальніше
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}

        {/* Bar Menu */}
        <TabsContent value="bar">
          <div className="mb-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wine className="h-5 w-5 text-orange-500 mr-2" />
                  Меню Бар
                </CardTitle>
                <CardDescription>
                  Власне пиво, наливки на горілці Nemiroff, преміум алкоголь з усього світу
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-sm font-medium text-orange-600">{item.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{item.price}</div>
                      <Badge className={getTypeColor(item.type)}>{getTypeText(item.type)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{item.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Міцність:</span>
                      <span className="font-medium">{item.alcohol}</span>
                    </div>

                    {item.country && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Країна:</span>
                        <span className="font-medium">{item.country}</span>
                      </div>
                    )}

                    {item.type_detail && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Тип:</span>
                        <span className="font-medium">{item.type_detail}</span>
                      </div>
                    )}

                    {item.ingredients && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-600 mb-1">Інгредієнти:</div>
                        <p className="text-xs text-gray-700">{item.ingredients}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-1">Доступні об'єми:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.volumes.map((volume: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {volume}
                        </Badge>
                      ))}
                    </div>
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

          {/* Bar Menu Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Інформація про пиво</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700">
                <p className="mb-2">
                  <strong>Живе пиво власного виробництва</strong> - не фільтроване, не пастеризоване
                </p>
                <p className="mb-2">
                  <strong>Пивна вежа (3л)</strong> - ідеально для компанії
                </p>
                <p>
                  <strong>Дегустаційний набір</strong> - спробуйте всі види нашого пива по 100мл кожного
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800">Інформація про наливки</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-purple-700">
                <p className="mb-2">
                  <strong>Всі наливки</strong> готуються на горілці Nemiroff
                </p>
                <p className="mb-2">
                  <strong>Об'єм:</strong> від 50мл до безкінченності ☺
                </p>
                <p>Кожна наливка має унікальний рецепт та особливий смак</p>
              </CardContent>
            </Card>
          </div>

          {/* Alcohol Education */}
          <div className="mt-8">
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">Освітня інформація</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-700 space-y-3">
                <div>
                  <strong>Чача</strong> - національний грузинський напій на основі виноградних кісточок. Це не горілка
                  чи самогон, а різновид бренді з фруктово-ягідною основою.
                </div>
                <div>
                  <strong>Бренді vs Коньяк</strong> - Коньяк це французький бренді з білих сортів винограду,
                  виготовляється лише в місті Коньяк у Франції.
                </div>
                <div>
                  <strong>Ром</strong> - міцний напій з витриманого спирту, продукт бродіння та перегону меляси цукрової
                  тростини.
                </div>
                <div>
                  <strong>Джин</strong> - міцний напій, отриманий в результаті перегонки настоянки з ягід ялівця.
                </div>
                <div>
                  <strong>Віскі</strong> - напій отриманий шляхом дистиляції збродженого зернового сусла і витриманий у
                  дерев'яних бочках.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Dish/Drink Dialog */}
      {selectedDish && (
        <Dialog open={!!selectedDish} onOpenChange={(open) => !open && setSelectedDish(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDish.name}</span>
                <span className="text-orange-600">{selectedDish.price}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedDish.ingredients || selectedDish.category}
                {selectedDish.type && (
                  <Badge className={`ml-2 ${getTypeColor(selectedDish.type)}`}>{getTypeText(selectedDish.type)}</Badge>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              {selectedDish.images && (
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
                    {selectedDish.cookingTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Час приготування: {selectedDish.cookingTime}
                      </div>
                    )}
                    {selectedDish.weight && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Вага: {selectedDish.weight}
                      </div>
                    )}
                    {selectedDish.alcohol && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Wine className="h-4 w-4 mr-2" />
                        Міцність: {selectedDish.alcohol}
                      </div>
                    )}
                    {selectedDish.country && (
                      <div className="text-sm">
                        <span className="text-gray-600">Країна:</span> {selectedDish.country}
                      </div>
                    )}
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

                  {selectedDish.volumes && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Доступні об'єми</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDish.volumes.map((volume: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {volume}
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
                {selectedDish.videoUrl && (
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
                  {selectedDish.type ? "Замовити напій" : "Додати до замовлення"}
                </Button>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції,{" "}
                <a href="/ff" className="underline font-medium">
                  зверніться до розробника
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
