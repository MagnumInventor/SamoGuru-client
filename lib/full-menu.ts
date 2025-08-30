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
  type: 
  | "beer" 
  | "tincture" 
  | "brandy" 
  | "vodka" 
  | "rum" 
  | "gin" 
  | "whisky"
  country?: string
  type_detail?: string
  ingredients?: string
}

// ТЕСТОВИЙ ПАТЕРН
export const demoMenuData: { [key in FoodCategory]: (FoodItem | BarItem)[] } = {
  main: [],
  grill: [],
  khachapuri: [],
  khinkali: [],
  garnish: [],
  snacks: [],
  soups: [],
  childmenu: [],
  friture: [],
  salads: [],
  desserts: [],
  drinks: [],
  bar: [],
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


  // ФІЛЬТРАЦІЯ ПО ІМЕНІ + алерген
export const getFilteredItems = (category: FoodCategory) => {
    let items: (FoodItem | BarItem)[] = {
      "main": [
        {
          id: 1,
          name: "М'ясна дошка",
          ingredients: "🥩 ковбаса купати, 🍗 курча тапака, 🥩 ковбаса з баранини, 🥩 баварська ковбаса, 🥔 картопля смажена, 🍞 грінки, 🥩 стейк шиї свинний",
          cookingTime: "30-35 хв",
          weight: "2000 гр",
          description: "Асорті ковбас із домашньої масарні, свинний стейк та курча тапака. Подається зі смаженою картоплею, грінками та фірмовими соусами.",
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
          description: "Соковите м'ясо телятини в насиченому томатному соусі з пряними спеціями, кінзою та легкою пікантністю.",
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
          description: "Соковите м'ясо мангалиці приготоване на відкритому вогні, смак якого чудово доповнює свіжа зелень та пікантні соуси.",
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
          ingredients: "свинина, телятина, цибуля синя, 🌿 кінза, 🌶️ чилі, 🥟 тісто",
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
          description: "Ніжні соковиті мішечки з тонкого тіста, наповнені щедрою порцією сирної начинки в сирно-вершковому соусі.",
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
          ingredients: "🍅 помідор чері, 🥒 огірок, 🌶️ перець болгарський, 🧱 цибуля синя, 🌰 фундук, 🌿 кінза",
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
          ingredients: "🍅 помідори різних видів, 🧀 бринза, 🥒 огірок, 🧱 цибуля синя, 🥬 рукола",
          cookingTime: "15 хв",
          weight: "240 гр",
          description: "Унікальний грузинський салат із свіжих та вялених томатів, у поєднанні із мусом з овечої бринзи. Поєднує у собі 4 соуса.",
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
          description: "Ніжне тірамісу на основі сиру маскарпоне з хрумкими трубочками, смак якого чудово доповнює запашне еспресо.",
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
          description: "Справжній грузинський наполеон з хрумким листковим тістом і ніжним заварним кремом. Названо в честь грузинського царського роду Багратіоні.",
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
          type: "beer" as const,
        },
        {
          id: 13,
          name: "Наше Пшеничне",
          category: "Пиво власного виробництва",
          description: "Пшеничне пиво з ноткою кислинки, не фільтроване, не пастеризоване",
          alcohol: "4.6%",
          volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
          price: "від 85 ₴",
          type: "beer" as const,
        },
        {
          id: 14,
          name: "Наше темне",
          category: "Пиво власного виробництва",
          description: "Темне пиво з нотками карамелі та гірчинкою, не фільтроване, не пастеризоване",
          alcohol: "6%",
          volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
          price: "від 90 ₴",
          type: "beer" as const,
        },
        {
          id: 15,
          name: "IPA",
          category: "Пиво власного виробництва",
          description: "Квітковий аромат і гіркий посмак, не фільтроване, не пастеризоване",
          alcohol: "8.2%",
          volumes: ["0.3л", "0.5л", "1л", "3л (Пивна вежа)"],
          price: "від 95 ₴",
          type: "beer" as const,
        },
        {
          id: 16,
          name: "Дегустаційний набір пива",
          category: "Пиво власного виробництва",
          description: "Сет світлого, темного, пшеничного та IPA по 100 мл кожного",
          alcohol: "3.6-8.2%",
          volumes: ["4x100мл"],
          price: "180 ₴",
          type: "beer" as const,
        },
        {
          id: 17,
          name: "Стела б/а",
          category: "Безалкогольне пиво",
          description: "Безалкогольне пиво",
          alcohol: "0%",
          volumes: ["0.35л"],
          price: "65 ₴",
          type: "beer" as const,
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
          type: "tincture" as const,
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
          type: "tincture" as const,
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
          type: "tincture" as const,
        },
        {
          id: 21,
          name: "Еліксир Здоров'я (Бехерівка, Штекелівка)",
          category: "Наливки",
          description: "З виразним смаком прянощів, привкус солодкого апельсина",
          alcohol: "34-36°",
          ingredients: "Спеції (кориця, гвоздика, кардамон, аніс, бадьян, перець духмяний), цукор, цедра апельсину",
          volumes: ["від 50мл до безкінченності"],
          price: "від 60 ₴",
          type: "tincture" as const,
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
          type: "tincture" as const,
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
          type: "tincture" as const,
        },
        // Чача та самогон
        {
          id: 24,
          name: "Чача",
          category: "Фруктові/зернові бренді",
          description: "Національний грузинський напій на основі виноградних кісточок. Не горілка чи самогон, а різновид бренді з фруктово-ягідною основою",
          alcohol: "40°",
          volumes: ["50мл", "100мл"],
          price: "від 80 ₴",
          type: "brandy" as const,
        },
        {
          id: 25,
          name: "Самогон дубовий (червоний)",
          category: "Фруктові/зернові бренді",
          description: "Аромат меду",
          alcohol: "42°",
          volumes: ["50мл", "100мл"],
          price: "від 70 ₴",
          type: "brandy" as const,
        },
        {
          id: 26,
          name: "Самогон хмільний",
          category: "Фруктові/зернові бренді",
          description: "Аромат зеленого яблука",
          alcohol: "42°",
          volumes: ["50мл", "100мл"],
          price: "від 70 ₴",
          type: "brandy" as const,
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
          type: "brandy" as const,
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
          type: "brandy" as const,
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
          type: "brandy" as const,
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
          type: "vodka" as const,
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
          type: "vodka" as const,
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
          type: "vodka" as const,
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
          type: "vodka" as const,
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
          type: "rum" as const,
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
          type: "rum" as const,
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
          type: "rum" as const,
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
          type: "gin" as const,
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
          type: "gin" as const,
        },
        // Віскі
        {
          id: 39,
          name: "The Glenlivet 12 років",
          category: "Віскі",
          description: "Односолодове шотландське віскі. Шовковистий смак з нотками фруктів, ванілі, квітів і мигдалевого бісквіта",
          alcohol: "40%",
          country: "Шотландія",
          type_detail: "Односолодовий скоч",
          volumes: ["50мл", "100мл"],
          price: "від 180 ₴",
          type: "whisky" as const,
        },
        {
          id: 40,
          name: "Jameson",
          category: "Віскі",
          description: "Купажоване ірландське віскі. Злиття ванільного, деревного та медового смаку з відтінками прянощів і лісових горіхів",
          alcohol: "40%",
          country: "Ірландія",
          type_detail: "Купажоване віскі",
          volumes: ["50мл", "100мл"],
          price: "від 150 ₴",
          type: "whisky" as const,
        },
      ],
      khachapuri: [],
      garnish: [],
      snacks: [],
      soups: [],
      childmenu: [],
      friture: [],
      drinks: [],
    }[category]
  }