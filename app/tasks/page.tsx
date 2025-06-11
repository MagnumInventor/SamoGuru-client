"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  CheckCircle2,
  Clock,
  Users,
  Coffee,
  UtensilsCrossed,
  WashingMachineIcon as CleaningServices,
  ShieldCheck,
  AlertTriangle,
  User,
  Plus,
  Minus,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import FFStatus from "@/components/ff-status"

interface Task {
  id: string
  title: string
  description: string
  // before-opening - Перед відкриттям, before-closing - перед закриттям, during-work - завдання під час роботи (за тижневим розкладом) 
  category: "before-opening" | "during-work" | "before-closing"
  difficulty: "easy" | "medium" | "hard"
  day: "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "П'ятниця" | "Субота" | "Неділя" | "ЗАВЖДИ"
  station: "1floor" | "2floor" | "3floor" | "1front" | "1back" | "6" | "67" | "8"
  forRoles: ("waiter" | "helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

interface SellDish {
  id: string
  title: string
  // ДОРОБИТИ ОПЦІЮ КІЛЬКОСТІ ПРОДАНИХ СТРАВ
  quantity: number
  forRoles: ("waiter" | "helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

// Продажі страв
const allSellDishes: SellDish[] = [
  { 
    id: "sd1",
    title: "Раки (2 кг)",
    quantity: 0,
    forRoles: ["waiter"],
    completed: false
  },
]

const allTasks: Task[] = [
  // ЗАВДАННЯ ПОМІЧНИКА - ПВ (Перед відкриттям)
  {
    id: "h1",
    title: "Допомогти офіціанту під час відкриття (до зборів)",
    description: "Протерти стакани, прибори, посуд мікрофіброю, витерти всі столи вологою серветкою",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h2",
    title: "Бути присутнім та УВАЖНО слухати інформацію з брифінгу",
    description: "Враховуючи всю актуальну ситуацію, накази, деталі/уточнення",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h3",
    title: "Підготовка станції до початку роботи",
    description: "Переконатися що всі поверхні чисті",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["helper"],
    completed: false,
  },

  // 1FLOOR « Пивоварна зала » - Щоденні завдання
  {
    id: "1f1",
    title: "Миття усіх вікон",
    description: "Миття усіх вікон спеціальним засобом, не забуваємо про вікно за пивоварнею",
    category: "during-work",
    difficulty: "medium",
    day: "Понеділок",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f2",
    title: "Чистка ніжок столів та стільців",
    description: "Ретельно почистіть з допомогою щітки та миючого засобу усі ніжки столів та стільців",
    category: "during-work",
    difficulty: "medium",
    day: "Вівторок",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f3",
    title: "Генеральне прибирання станції офіціанта",
    description: "Генеральне прибирання станції офіціанта всередині",
    category: "during-work",
    difficulty: "hard",
    day: "Середа",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f4",
    title: "Чистимо підлогу хімією",
    description: "Чистимо за допомогою хімії підлогу",
    category: "during-work",
    difficulty: "medium",
    day: "Четвер",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f5",
    title: "Чистка сидінь за лавками",
    description: "Замінюємо воду і миємо ще раз чистою. Почистити усі сидіння за лавками та пропилососити шпарини між сидіннями за 101-102-103",
    category: "during-work",
    difficulty: "medium",
    day: "П'ятниця",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f6",
    title: "Миття ліфта та поличок",
    description: "Помийте шторку ліфта, ліфт у середині та зверху прорезиненою ганчіркою з використанням миючого засобу. Поличку біля ліфта помити ретельно з додаванням неохлору",
    category: "during-work",
    difficulty: "hard",
    day: "Субота",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "1f7",
    title: "Почистити всі подушки",
    description: "Почистити всі подушки",
    category: "during-work",
    difficulty: "medium",
    day: "Неділя",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },

  // ПЕРЕД ВІДКРИТТЯМ - Щоденні завдання
  {
    id: "bo1",
    title: "Перевірка світильників",
    description: "Перевірте справність усіх світильників (чи горять усі лампочки), включіть та виключіть вимикачі (протріть їх). Включіть світло над пивоварнею та вивіску над вхідними дверима. Виключіть прожектори для вазонів",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo2",
    title: "Протирання світильників за столами 104-110",
    description: "Протріть світильники за 104-110 столами вологую мікрофіброю рожевого кольору",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo3",
    title: "Протирання світильників за столами 101-103",
    description: "Світильники за 101-103 столами протираємо від пилюки та павутин пипідастром",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo4",
    title: "Протерти перегородку між столами",
    description: "Протерти від крихт та пилоки перегородку між 106-108 столом за допомогою вологої ганчірки",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo5",
    title: "Протерти тач-скрін",
    description: "Протерти тач-скрін прорезиненою ганчіркою жовтого кольору попередньо збрискавши її",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo6",
    title: "Протирання декорацій",
    description: "Протріть підвіконники, декорацію Ковчег (станція презенту) та мідну ливну у становку біля",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo7",
    title: "Селимо жуйки",
    description: "Селимо жуйки, під столами та на підлозі за допомогою шпателя для жуйок",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo8",
    title: "Прибираємо павутиння",
    description: "Детально прибираємо усе павутиння за допомогою пипідастра",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo9",
    title: "Збризкуємо балки та мох",
    description: "Збризкуємо балки та мох чистою водою (стіл 104, кабіна 109-110)",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo10",
    title: "Розставляємо підставки для сумок",
    description: "Розставляємо підставки для сумок, попередньо перевіривши їх на справність та чистоту, у зручному для гостей місці",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo11",
    title: "Підготовка холодильника",
    description: "Протираємо від крихт та дезинфікуємо розчином неохлору. Протираємо холодильник прорезиновою ганчіркою, виставляємо температуру на позначку +2 та наповнюємо салфетками",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo12",
    title: "Підготовка тостерниці",
    description: "Вмикаємо тостерницю попередньо почистивши її від крихт і залишків їжі",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo13",
    title: "Полив вазонів",
    description: "Перевіряємо чи волога земля у вазонів, при потребі підливаємо їх, не забуваємо про вазони за пивоварнею",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo14",
    title: "Чистка підлоги",
    description: "Вичищаємо шпарини в підлозі шпателем для підлоги та ретельно замітаємо підлогу віником з маркуванням для 1-го поверху. Сміття збираємо на совок з маркуванням 1-го поверху",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo15",
    title: "Миття підлоги",
    description: "Миємо підлогу шваброю з маркуванням для 1-го поверху з додаванням миючого засобу для підлоги",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo16",
    title: "Прибирання інвентаря",
    description: "Ретельно вимиваємо відро для миття підлоги, швабри та совки, складаємо їх у мопочній",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo17",
    title: "Підготовка станції офіціанта",
    description: "Прибираємо і заповнюємо станцію офіціанта: протираємо станцію розчином неохлору, наповнюємо натертими тарілками (мінімум 55 шт), натираємо прибори та складаємо в чисту касету (по 55 шт)",
    category: "before-opening",
    difficulty: "hard",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo18",
    title: "Дезинфекція шкатулок для приборів",
    description: "Шкатулки для приборів дезинфікуємо ззовні та всередині - 14 шт",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo19",
    title: "Перевірка ваз та аксесуарів",
    description: "Перевіряємо наявність та чистоту ваз, приносимо брендовані пакети та одноразові лотки",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo20",
    title: "Підготовка корабликів",
    description: "Перевіряємо справність корабликів, чистимо та дезинфікуємо - мінімум 6 шт",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo21",
    title: "Підготовка дрібниць",
    description: "Заповнити дерев'яну підставку зубочистками, підготувати серветки сухі та вологі, відро синього кольору з чистою водою та розчином неохлору",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo22",
    title: "Підготовка дитячої зони",
    description: "Підготувати підставку з підточеними кольоровими олівцями та розмальовки - 10 шт, протерти та продезинфікувати дитячу іграшку",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bo23",
    title: "Перевірка АХД гелю",
    description: "Перевірити наявність баночки з АХД гелем",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },

  // ПЕРЕД ЗАКРИТТЯМ
  {
    id: "bc1",
    title: "Збір брудного посуду",
    description: "Весь бруднийпосуд зносимо на мийку",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc2",
    title: "Робимо перекриття столів",
    description: "Робимо перекриття столів",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc3",
    title: "Знести хлібничку на мийку",
    description: "Знести хлібничку на мийку",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc4",
    title: "Перевірка обладнання",
    description: "Перевірити на справність кораблики для рахунків, коробки для приборів, тейблтенти, підставки під сумки (при поломці, повідомляємo адміна)",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc5",
    title: "Прибирання станції презенту",
    description: "Прибираємо станцію презенту, виключаємо тостерницю, виносимо сміття",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc6",
    title: "Протирання спецниць",
    description: "Протираємо спецниці і при необхідності досипаємо спеції",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc7",
    title: "Дезинфекція касет для приборів",
    description: "Касету (ємкість для приборів) збрискуємо неохлором, залишивши на 30 сек та протираємо сухою ганчіркою, залишаємо в перевернутому стані на ніч. Прибори складаємо на продезинфікований піднос та накриваємо рушником",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc8",
    title: "Завантаження станції",
    description: "Завантажуємо станцію посудом та натертими приборами",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc9",
    title: "Прання мікрофібр",
    description: "Зніміть брудні мікрофібри та рушники на мийку пратися",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc10",
    title: "Миття підносів",
    description: "Підноси збираємо і відносимо на мийку мити щітками",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc11",
    title: "Дезинфекція QR-кодів",
    description: "Дезинфікуємо QR-коди неохлором та протираємо на сухо від липких плям",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "bc12",
    title: "Виливання води з відра",
    description: "Виливаємо воду з відра в туалеті персоналу",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc13",
    title: "Винесення сміття",
    description: "Виносимо сміття",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter", "helper"],
    completed: false,
  },
  {
    id: "bc14",
    title: "Виключення світла",
    description: "Виключаємо світло",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",  
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },

  // ЗАВДАННЯ ПОМІЧНИКА - ЗАГАЛЬНІ
  {
    id: "h4",
    title: "Прибирати столи після гостей",
    description: "Швидко прибрати та протерти стіл після відходу гостей",
    category: "during-work",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h5",
    title: "Поповнювати серветки",
    description: "Слідкувати щоб на столах завжди були серветки",
    category: "during-work",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["helper"],
    completed: false,
  },

  // ЗАВДАННЯ ОФІЦІАНТА - ЗАГАЛЬНІ
  {
    id: "w4",
    title: "Обслуговувати гостей",
    description: "Приймати замовлення та подавати страви",
    category: "during-work",
    difficulty: "hard",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "w5",
    title: "Контролювати якість сервісу",
    description: "Слідкувати за якістю обслуговування та задоволеністю гостей",
    category: "during-work",
    difficulty: "hard",
    day: "ЗАВЖДИ",
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
]

const mockCompletedTasks = [
  { taskId: "h1", completedBy: "Помічник Тестовий", completedAt: new Date() },
  { taskId: "bo1", completedBy: "Офіціант Тестовий", completedAt: new Date() },
  { taskId: "h4", completedBy: "Помічник Тестовий", completedAt: new Date() },
]

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(allTasks)
  const [sellDishes, setSellDishes] = useState<SellDish[]>(allSellDishes)
  const [selectedWorker, setSelectedWorker] = useState<string>("all")
  const [selectedDay, setSelectedDay] = useState<string>("ЗАВЖДИ")

  const isAdmin = user?.role === "admin"
  const userRole = user?.role as "waiter" | "helper"

  // Filter tasks based on user role and selected day
  const userTasks = tasks.filter((task) => {
    const roleMatch = !isAdmin ? task.forRoles.includes(userRole) : true
    const dayMatch = selectedDay === "ЗАВЖДИ" || task.day === selectedDay || task.day === "ЗАВЖДИ"
    return roleMatch && dayMatch
  })

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedBy: !task.completed ? `${user?.firstName} ${user?.lastName}` : undefined,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task,
      ),
    )
  }

  const updateDishQuantity = (dishId: string, increment: boolean) => {
    setSellDishes((prev) =>
      prev.map((dish) =>
        dish.id === dishId
          ? {
              ...dish,
              quantity: increment ? dish.quantity + 1 : Math.max(0, dish.quantity - 1),
              completed: increment ? dish.quantity + 1 > 0 : Math.max(0, dish.quantity - 1) > 0,
              completedBy: `${user?.firstName} ${user?.lastName}`,
              completedAt: new Date(),
            }
          : dish,
      ),
    )
  }

  const getTasksByCategory = (category: Task["category"]) => {
    return userTasks.filter((task) => task.category === category)
  }

  const getCategoryProgress = (category: Task["category"]) => {
    const categoryTasks = getTasksByCategory(category)
    const completed = categoryTasks.filter((task) => task.completed).length
    return categoryTasks.length > 0 ? (completed / categoryTasks.length) * 100 : 0
  }

  const getDifficultyIcon = (difficulty: Task["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "hard":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getCategoryIcon = (category: Task["category"]) => {
    switch (category) {
      case "before-opening":
        return <Coffee className="h-5 w-5" />
      case "during-work":
        return <UtensilsCrossed className="h-5 w-5" />
      case "before-closing":
        return <CleaningServices className="h-5 w-5" />
    }
  }
}