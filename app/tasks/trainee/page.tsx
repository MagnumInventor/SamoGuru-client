"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertTriangle, Coffee, UtensilsCrossed, WashingMachine as CleaningServices } from "lucide-react"
import { useAuth } from "@/lib/auth"

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


// Define available stations for the helper
const helperStations = [
  "Верхній бар",
  "Нижній бар",
  "Гриль",
  "Кухня"
];

const allHelperTasks: HelperTask[] = [
      // ЗАВДАННЯ ДЛЯ ВСІХ СТАНЦІЙ (ГРИЛЬ, КУХНЯ, ВЕРХНІЙ БАР, НИЖНІЙ БАР)
  {
    id: "h20",
    title: "Підготовка станції",
    description: "Викинути все сміття, забрати лишні речі, перевірити достатню кількість приборів та підносів",
    category: "before-opening",
    difficulty: "medium",
    station: ["Верхній бар", "Гриль", "Кухня", "Нижній бар"],
    forRoles: ["helper"],
    completed: false
  },
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
  {
    id: "h19",
    title: "Контроль стану підносів",
    description: "Перевірка стану підносів, їх чистота та наявність. За потреби - миття (віднести на мийку) та повернення на станцію",
    category: "during-work",
    difficulty: "easy",
    station: ["Верхній бар", "Нижній бар", "Гриль", "Кухня"],
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
    title: "Чергування КП (кімнати персоналу)",
    description: "Регулярно перевіряти стан чистоти на КП, під кінець зміни провести повноцінне прибирання: викинути сміття, протерти поверхні, помити підлогу, скласти розкиданий одяг",
    category: "before-closing",
    difficulty: "medium",
    station: ["Кухня"],
    forRoles: ["helper"],
    completed: false
  },


// ДОДАТКОВІ ЗАВДАННЯ (20.06)

  {
    id: "h21",
    title: "Звіт про стан форми в кінці зміни",
    description: "Перевірити стан форми, чи все чисте та випрасуване, чи є пошкодження. Якщо є - повідомити адміністратора, якщо все добре - відправити звіт",
    category: "before-closing",
    difficulty: "easy",
    station: ["Верхній бар", "Нижній бар", "Гриль", "Кухня"],
    forRoles: ["helper"],
    completed: false
  }
];






export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<HelperTask[]>(allHelperTasks)
  const [selectedStation, setSelectedStation] = useState<string>(helperStations[0])

  useEffect(() => {
    if (!selectedStation && helperStations.length > 0) {
      setSelectedStation(helperStations[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStation])

  // Filter tasks by station
  const userTasks = tasks.filter((task) => task.station.includes(selectedStation))
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

  const getTasksByCategory = (category: HelperTask["category"]) => {
    return userTasks.filter((task) => task.category === category)
  }

  const getCategoryProgress = (category: HelperTask["category"]) => {
    const categoryTasks = getTasksByCategory(category)
    const completed = categoryTasks.filter((task) => task.completed).length
    return categoryTasks.length > 0 ? (completed / categoryTasks.length) * 100 : 0
  }

  const getDifficultyIcon = (difficulty: HelperTask["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "hard":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getCategoryIcon = (category: HelperTask["category"]) => {
    switch (category) {
      case "before-opening":
        return <Coffee className="h-5 w-5" />
      case "during-work":
        return <UtensilsCrossed className="h-5 w-5" />
      case "before-closing":
        return <CleaningServices className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Завдання помічника</h1>
        <p className="text-gray-600">{selectedStation}</p>
      </div>

      {/* Station Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Станція</label>
        <select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {helperStations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
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
                  <Badge>
                    {getTasksByCategory(category).filter(t => t.completed).length}/
                    {getTasksByCategory(category).length}
                  </Badge>
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
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1 mr-4"
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? "text-green-700" : "text-gray-900"}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center mt-2 space-x-2 text-sm">
                          {getDifficultyIcon(task.difficulty)}
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
          </div>
        );
    }
