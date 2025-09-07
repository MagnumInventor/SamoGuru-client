"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Progress } from "@/app/components/ui/progress"
import { Button } from "@/app/components/ui/button" 
import {
  CheckCircle2,
  Clock,
  Coffee,
  UtensilsCrossed,
  WashingMachine as CleaningServices,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react"
import { useAuthStore} from "@/app/store/authStore"

interface WaiterTask {
  id: string
  title: string
  description: string
  category: "before-opening" | "during-work" | "before-closing"
  difficulty: "easy" | "medium" | "hard"
  day: "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "П'ятниця" | "Субота" | "Неділя" | "ЗАВЖДИ"
  station: string
  forRoles: ("waiter")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

interface HelperTask {
  id: string
  title: string
  description: string
  category: "before-opening" | "during-work" | "before-closing"
  difficulty: "easy" | "medium" | "hard"
  station: string[]
  forRoles: ("helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

interface SellDish {
  id: string
  title: string
  quantity: number
  forRoles: ("waiter")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}


// ВИБІР СТАНЦІЇ
const helperStations = ["Гриль", "Нижній бар", "Верхній бар", "Кухня"];
const waiterStations = [
  "1 поверх", "2 поверх", "3 поверх", 
  "Передня", "Яруса", "Пивниця", 
  "Світлиця", "Гірниця"
];

// ВИБІР ДНЯ ТИЖНЯ
const days = [
  "Понеділок", "Вівторок", "Середа", 
  "Четвер", "П'ятниця", "Субота", 
  "Неділя", "ЗАВЖДИ"
];





const allHelperTasks: HelperTask[] = [
      // ЗАВДАННЯ ДЛЯ ВСІХ СТАНЦІЙ (ГРИЛЬ, КУХНЯ, ВЕРХНІЙ БАР, НИЖНІЙ БАР)

  {
    id: "h1",
    title: "Прибирання станції",
    description: "Пітримання чистоти на робочій станції, за потреби миття та дезинфекція поверхонь",
    category: "during-work",
    difficulty: "medium",
    station: ["Верхній бар", "Гриль", "Кухня", "Нижній бар"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h4",
    title: "Збір брудного посуду",
    description: "Допомога у зборі та перенесенні брудного посуду на мийку",
    category: "during-work",
    difficulty: "hard",
    station: ["Нижній бар", "Гриль", "Кухня"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h3",
    title: "Натираня столових приборів",
    description: "Прибори для сервірування страв/напоїв, мають бути натерті до блиску",
    category: "during-work",
    difficulty: "easy",
    station: ["Гриль", "Кухня", "Верхній бар", "Нижній бар"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h5",
    title: "Управління ліфтом",
    description: "1) ГРИЛЬ: брудний посуд з ліфту/двору на мийку, чистий посуд (для страв) з мийки на в ліфт; 2) ВЕРХНІЙ БАР: Брудний посуд/скло в ліфт на кухню (2 --> 1)(ДЖОНІ), чистий посуд на барну стійку. 2.2) Готові страви з кухні (2-ий ліфт) до офіціантів (200-ті столи);",
    category: "during-work",
    difficulty: "hard",
    station: ["Верхній бар", "Нижній бар", "Гриль"],
    forRoles: ["helper"],
    completed: false
  },


    // ЗАВДАННЯ ДЛЯ БАРНИХ СТАНЦІЙ (ВЕРХНІЙ БАР, НИЖНІЙ БАР)

  {
    id: "h6",
    title: "Допомога офіціантам",
    description: "Сервірування напоїв, та рознесення їх до офіціантів",
    category: "before-opening",
    difficulty: "medium",
    station: ["Нижній бар", "Верхній бар"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h7",
    title: "Натираня бокалів, келихів та стаканів",
    description: "Посуд для напоїв, мають бути натерті до блиску",
    category: "during-work",
    difficulty: "easy",
    station: ["Нижній бар", "Верхній бар"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h9",
    title: "Перенесення посуду",
    description: "За прохання бармена перенести чистий посуд з верхнього бару на нижній бар",
    category: "during-work",
    difficulty: "hard",
    station: ["Верхній бар", "Нижній бар"],
    forRoles: ["helper"],
    completed: false
  },
    {
    id: "h13",
    title: "Розставлення чистого, натертого посуду на стелажі бару",
    description: "Посуд для напоїв, мають бути натерті до блиску",
    category: "during-work",
    difficulty: "easy",
    station: ["Верхній бар", "Нижній бар"],
    forRoles: ["helper"],
    completed: false
  },

  // ЗАВДАННЯ ДЛЯ КУХОННИХ СТАНЦІЙ (ГРИЛЬ, КУХНЯ)

  {
    id: "h1",
    title: "Допомога офіціантам",
    description: "Сервірування страв, та рознесення їх до офіціантів",
    category: "before-opening",
    difficulty: "medium",
    station: ["кухня", "Гриль"],
    forRoles: ["helper"],
    completed: false
  },
      {
    id: "h17",
    title: "Контроль КП (кімнати персоналу)",
    description: "Регулярно (за можливості) перевіряти стан чистоти на КП, прибирати сміття, протерати поверхні, складати одяг",
    category: "during-work",
    difficulty: "medium",
    station: ["Кухня"],
    forRoles: ["helper"],
    completed: false
  },


// ДОДАТКОВІ ЗАВДАННЯ (20.06)

  {
    id: "h21",
    title: "Звіт про стан форми в кінці зміни",
    description: "Перевірити стан форми, чи все чисте та випрасуване, чи є пошкодження. Якщо є - повідомити Менеджера, якщо все добре - відправити звіт",
    category: "before-closing",
    difficulty: "easy",
    station: ["Верхній бар", "Нижній бар", "Гриль", "Кухня"],
    forRoles: ["helper"],
    completed: false
  }
];








const allWaiterTasks: WaiterTask[] = [
  {
    id: "1f-m1",
    title: "Миття усіх вікон",
    description: "Миття усіх вікон спеціальним засобом, не забуваємо про вікно за пивоварнею",
    category: "during-work",
    difficulty: "medium",
    day: "Понеділок",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-t1",
    title: "Чистка ніжок столів",
    description: "Ретельно почистіть з допомогою щітки та миючого засобу усі ніжки столів та стільців",
    category: "during-work",
    difficulty: "medium",
    day: "Вівторок",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-w1",
    title: "Генеральне прибирання станції",
    description: "Генеральне прибирання станції офіціанта всередині",
    category: "during-work",
    difficulty: "hard",
    day: "Середа",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-th1",
    title: "Чистка підлоги хімією",
    description: "Чистимо за допомогою хімії підлогу. Замінюємо воду і миємо ще раз чистою",
    category: "during-work",
    difficulty: "medium",
    day: "Четвер",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-f1",
    title: "Чистка сидінь за лавками",
    description: "Почистити усі сидіння за лавками та пропилососити шпарини між сидіннями за 101-102-103",
    category: "during-work",
    difficulty: "medium",
    day: "П'ятниця",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-sa1",
    title: "Миття ліфта та поличок",
    description: "Помийте шторку ліфта, ліфт у середині та зверху прорезиненою ганчіркою. Поличку біля ліфта помити ретельно з додаванням неохлору",
    category: "during-work",
    difficulty: "hard",
    day: "Субота",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-su1",
    title: "Чистка подушок",
    description: "Почистити всі подушки",
    category: "during-work",
    difficulty: "medium",
    day: "Неділя",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },

  // ======= 1st Floor Opening Tasks =======
  {
    id: "1f-bo1",
    title: "Перевірка світильників",
    description: "Перевірте справність усіх світильників, включіть та виключіть вимикачі. Включіть світло над пивоварнею",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo2",
    title: "Протирання світильників",
    description: "Протріть світильники за 104-110 столами вологою мікрофіброю рожевого кольору",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo3",
    title: "Протирання перегородки",
    description: "Протерти від крихт та пилюки перегородку між 106-108 столом",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo4",
    title: "Чистка тач-скріна",
    description: "Протерти тач-скрін прорезиненою ганчіркою жовтого кольору",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo5",
    title: "Чистка декорацій",
    description: "Протріть підвіконники, декорацію Ковчег та мідну ливну у становку",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo6",
    title: "Чистка жуйок",
    description: "Селимо жуйки, під столами та на підлозі за допомогою шпателя для жуйок",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo7",
    title: "Прибирання павутиння",
    description: "Детально прибираємо усе павутиння за допомогою піпідастру",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo8",
    title: "Чистка балок",
    description: "Збризкуємо балки та мох чистою водою (стіл 104, кабіна 109-110)",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo9",
    title: "Підготовка підставок",
    description: "Розставляємо підставки для сумок, попередньо перевіривши їх на справність та чистоту",
    category: "before-opening",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-bo10",
    title: "Підготовка холодильника",
    description: "Протираємо від крихт та дезинфікуємо розчином неохлору. Виставляємо температуру +2°C",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },

  // ======= 1st Floor Closing Tasks =======
  {
    id: "1f-cl1",
    title: "Збір брудного посуду",
    description: "Весь брудний посуд зносимо на мийку",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-cl2",
    title: "Перекриття столів",
    description: "Робимо перекриття столів",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-cl3",
    title: "Знесення хлібнички",
    description: "Знести хлібничку на мийку",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-cl4",
    title: "Перевірка обладнання",
    description: "Перевірити на справність кораблики для рахунків, коробки для приборів",
    category: "before-closing",
    difficulty: "easy",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "1f-cl5",
    title: "Прибирання станції презенту",
    description: "Прибираємо станцію презенту, виключаємо тостерницю, виносимо сміття",
    category: "before-closing",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false
  },

  // ======= 2nd Floor Tasks =======
  {
    id: "2f-m1",
    title: "Миття вікон",
    description: "Помийте вікна з використанням засобу для миття вікон та витерти насухо",
    category: "during-work",
    difficulty: "medium",
    day: "Понеділок",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-t1",
    title: "Чистка ніжок столів",
    description: "Почистіть ніжки столів та стільців щіткою з використанням миючого засобу",
    category: "during-work",
    difficulty: "medium",
    day: "Вівторок",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-w1",
    title: "Пилососіння шпарин",
    description: "Попилососити шпарини сидінь за 207-208 столом",
    category: "during-work",
    difficulty: "easy",
    day: "Середа",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-th1",
    title: "Генеральне прибирання станцій",
    description: "Генеральне прибирання станцій офіціанта зверху та в середині",
    category: "during-work",
    difficulty: "hard",
    day: "Четвер",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-f1",
    title: "Чистка світильників",
    description: "Протріть усі світильники, тачскрін та телевізори прорезиновою ганчіркою",
    category: "during-work",
    difficulty: "medium",
    day: "П'ятниця",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-sa1",
    title: "Миття ліфта",
    description: "Помийте шторку ліфта, ліфт у середині та зверху, шахту ліфта прорезиненою ганчіркою",
    category: "during-work",
    difficulty: "hard",
    day: "Субота",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "2f-su1",
    title: "Чистка картин",
    description: "Протріть рами картин прорезиновою ганчіркою. Протріть картини за 208 столом",
    category: "during-work",
    difficulty: "medium",
    day: "Неділя",
    station: "2 поверх",
    forRoles: ["waiter"],
    completed: false
  },

  // ======= 3rd Floor Tasks =======
  {
    id: "3f-m1",
    title: "Миття вікон",
    description: "Миття усіх вікон спеціальним засобом для миття скла",
    category: "during-work",
    difficulty: "medium",
    day: "Понеділок",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-t1",
    title: "Чистка ніжок меблів",
    description: "Ретельно почистити з допомогою щітки та миючого засобу усі ніжки столів та стільців",
    category: "during-work",
    difficulty: "medium",
    day: "Вівторок",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-w1",
    title: "Миття черепиці",
    description: "Помити черепицю над кабінетом",
    category: "during-work",
    difficulty: "medium",
    day: "Середа",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-th1",
    title: "Чистка люстр",
    description: "Протерти усі люстри та деревяні перетинки",
    category: "during-work",
    difficulty: "hard",
    day: "Четвер",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-f1",
    title: "Миття балок",
    description: "Ретельно вимити балки та огорожу на 3 поверсі",
    category: "during-work",
    difficulty: "hard",
    day: "П'ятниця",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-sa1",
    title: "Чистка ліфтів",
    description: "Чистимо ліфти, поличку дерев'яну що перед ліфтом помити ретельно із спец. засобом",
    category: "during-work",
    difficulty: "hard",
    day: "Субота",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "3f-su1",
    title: "Чистка диванів",
    description: "Пропилососити шпарини диванів",
    category: "during-work",
    difficulty: "easy",
    day: "Неділя",
    station: "3 поверх",
    forRoles: ["waiter"],
    completed: false
  },

    // ======= Передня Station Tasks =======
  {
    id: "front-m1",
    title: "Чистка спинок диванів",
    description: "Почистити спинки диванів за допомогою засобу з щіткою",
    category: "during-work",
    difficulty: "medium",
    day: "Понеділок",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-t1",
    title: "Чистка ніжок меблів",
    description: "Почистіть ніжки столів та стільців щіткою з використанням миючого засобу",
    category: "during-work",
    difficulty: "medium",
    day: "Вівторок",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-w1",
    title: "Чистка шкатулок для приборів",
    description: "Помити щітками шкатулки для приборів",
    category: "during-work",
    difficulty: "easy",
    day: "Середа",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-th1",
    title: "Миття підлоги",
    description: "Помийте підлогу з використанням щітки та миючого засобу",
    category: "during-work",
    difficulty: "medium",
    day: "Четвер",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-f1",
    title: "Чистка жуйок та столів",
    description: "Почистіть жуйки шпателем, помийте ганчіркою столи знизу",
    category: "during-work",
    difficulty: "hard",
    day: "П'ятниця",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-sa1",
    title: "Чистка світильників",
    description: "Помити світильники зовні та всередині",
    category: "during-work",
    difficulty: "medium",
    day: "Субота",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
  {
    id: "front-su1",
    title: "Генеральне прибирання станції",
    description: "Генеральне прибирання станції офіціанта всередині",
    category: "during-work",
    difficulty: "hard",
    day: "Неділя",
    station: "Передня",
    forRoles: ["waiter"],
    completed: false
  },
];

const allSellDishes: SellDish[] = [
  { 
    id: "sd1",
    title: "Раки (2 кг)",
    quantity: 0,
    forRoles: ["waiter"],
    completed: false
  },
]

const allTasks = [...allWaiterTasks, ...allHelperTasks]
type Task = WaiterTask | HelperTask

export default function TasksPage() {
  const { user } = useAuthStore()
  const [tasks, setTasks] = useState<Task[]>(allTasks)
  const [sellDishes, setSellDishes] = useState<SellDish[]>(allSellDishes)
  const [selectedDay, setSelectedDay] = useState<string>("ЗАВЖДИ")
  const [selectedStation, setSelectedStation] = useState<string>("")
  
  const isAdmin = user?.role === "admin"
  const userRole = user?.role as "waiter" | "helper" | "admin"

  // Set initial station based on role (useEffect to avoid state update on render)
  useEffect(() => {
    if (!selectedStation) {
      if (userRole === "waiter" && waiterStations.length > 0) {
        setSelectedStation(waiterStations[0])
      } else if (userRole === "helper" && helperStations.length > 0) {
        setSelectedStation(helperStations[0])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, selectedStation])

  // Filter tasks based on role, station, and day
  const userTasks = tasks.filter((task) => {
    const roleMatch = !isAdmin
      ? (userRole === "waiter" || userRole === "helper")
        ? (task.forRoles as string[]).includes(userRole)
        : false
      : true
    const stationMatch = selectedStation ? task.station === selectedStation : true
    const dayMatch =
      "day" in task
        ? selectedDay === "ЗАВЖДИ" || task.day === selectedDay || task.day === "ЗАВЖДИ"
        : true
    return roleMatch && stationMatch && dayMatch
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

  // Admin view - shows progress overview
  if (isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Менеджер панель - Прогрес завдань</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Загальний прогрес</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={50} className="h-4 mb-4" />
              <div className="flex justify-between text-sm">
                <span>Виконано: 50%</span>
                <span>Всього завдань: 100</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>По ролям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Офіціанти</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Помічники</span>
                  <span>35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>По станціям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waiterStations.concat(helperStations).map((station) => (
                  <div key={station}>
                    <div className="flex justify-between mb-1">
                      <span>{station}</span>
                      <span>{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Деталі завдань</CardTitle>
            <CardDescription>Усі завдання по всіх станціях</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="during-work">
              <TabsList>
                <TabsTrigger value="before-opening">Перед відкриттям</TabsTrigger>
                <TabsTrigger value="during-work">Під час роботи</TabsTrigger>
                <TabsTrigger value="before-closing">Перед закриттям</TabsTrigger>
              </TabsList>
              
              {(["before-opening", "during-work", "before-closing"] as const).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-4">
                    {tasks
                      .filter(task => task.category === category)
                      .map((task) => (
                        <div key={task.id} className="flex items-center p-4 border rounded-lg">
                          <Checkbox 
                            checked={task.completed}
                            className="mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{task.title}</h4>
                              <Badge>{task.station}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <div className="flex items-center mt-2 space-x-2 text-sm">
                              {getDifficultyIcon(task.difficulty)}
                              {"day" in task && <span>{task.day}</span>}
                              {task.completedBy && (
                                <span className="text-green-600">Виконано: {task.completedBy}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Waiter/Helper view
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {userRole === "waiter" ? "Завдання офіціанта" : "Завдання помічника"}
        </h1>
        <p className="text-gray-600">
          {selectedStation} • {selectedDay}
        </p>
      </div>

      {/* Station and Day Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Станція</label>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {(userRole === "waiter" ? waiterStations : helperStations).map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">День</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="during-work">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="before-opening">Перед відкриттям</TabsTrigger>
          <TabsTrigger value="during-work">Під час роботи</TabsTrigger>
          <TabsTrigger value="before-closing">Перед закриттям</TabsTrigger>
        </TabsList>

        {(["before-opening", "during-work", "before-closing"] as const).map((category) => (
          <TabsContent key={category} value={category}>
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2">
                        {category === "before-opening" && "Перед відкриттям"}
                        {category === "during-work" && "Під час роботи"}
                        {category === "before-closing" && "Перед закриттям"}
                      </span>
                    </div>
                  </CardTitle>
                  <Badge>{getTasksByCategory(category).filter(t => t.completed).length}/{getTasksByCategory(category).length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={getCategoryProgress(category)} 
                  className="h-2 mb-4" 
                />
                
                <div className="space-y-4">
                  {getTasksByCategory(category).map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-start p-4 border rounded-lg ${
                        task.completed ? "bg-green-50 border-green-200" : "bg-white"
                      }`}
                    >
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)} // Accepts boolean, but we only need the event
                        className="mt-1 mr-4"
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? "text-green-700" : "text-gray-900"}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center mt-2 space-x-2 text-sm">
                          {getDifficultyIcon(task.difficulty)}
                          {"day" in task && <span className="text-gray-500">{task.day}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>


      {userRole === "waiter" && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Продажі страв</CardTitle>
            <CardDescription>Щоденні цілі продажу</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sellDishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{dish.title}</h4>
                    <p className="text-sm text-gray-600">Ціль: 10 порцій</p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      onClick={() => updateDishQuantity(dish.id, false)}
                      disabled={dish.quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 font-medium">{dish.quantity}</span>
                    <Button
                      onClick={() => updateDishQuantity(dish.id, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
