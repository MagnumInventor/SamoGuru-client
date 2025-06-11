"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import FFStatus from "@/components/ff-status"

interface Task {
  id: string
  title: string
  description: string
  // before-openign - Перед відкриттям, before-closing - перед закриттям, during-work - завдання під час роботи (за тижневим розкладом) 
  category: "before-opening" | "during-work" | "before-closing"
  difficulty: "easy" | "medium" | "hard"
  day: "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "Пятниця" | "Субота" | "Неділя" | "ЗАВЖДИ"
  station: "1floor" | "2floor" | "3floor" | "1front" | "1back" | "6" | "67" | "8"
  forRoles: ("waiter" | "helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

const allTasks: Task[] = [
  // Opening
  {
    id: "h1",
    title: "Миття вікон",
    description: "Миття усіх вікон спеціальним засобом, не забуваємо про вікно за пивоварнею.",
    category: "before-opening",
    difficulty: "medium",
    day: "Понеділок"
    station: "1floor",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "h2",
    title: "Розставити серветки",
    description: "Поставити серветки на всі столи",
    category: "before-opening",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h3",
    title: "Перевірити чистоту підлоги",
    description: "Переконатися що підлога чиста, при потребі підмести",
    category: "before-opening",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },

  // Before Opening - Waiter Tasks
  {
    id: "w1",
    title: "Перевірити меню",
    description: "Пе��еглянути денне меню та спеціальні пропозиції",
    category: "before-opening",
    difficulty: "medium",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "w2",
    title: "Підготувати касу",
    description: "Перевірити роботу касового апарату та наявність здачі",
    category: "before-opening",
    difficulty: "medium",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "w3",
    title: "Перевірити столові прибори",
    description: "Переконатися що всі столові прибори чисті та на місці",
    category: "before-opening",
    difficulty: "medium",
    forRoles: ["waiter"],
    completed: false,
  },

  // During Work - Helper Tasks
  {
    id: "h4",
    title: "Прибирати столи після гостей",
    description: "Швидко прибрати та протерти стіл після відходу гостей",
    category: "during-work",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h5",
    title: "Поповнювати серветки",
    description: "Слідкувати щоб на столах завжди були серветки",
    category: "during-work",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },

  // During Work - Waiter Tasks
  {
    id: "w4",
    title: "Обслуговувати гостей",
    description: "Приймати замовлення та подавати страви",
    category: "during-work",
    difficulty: "hard",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "w5",
    title: "Контролювати якість сервісу",
    description: "Слідкувати за якістю обслуговування та задоволеністю гостей",
    category: "during-work",
    difficulty: "hard",
    forRoles: ["waiter"],
    completed: false,
  },

  // Before Closing - Helper Tasks
  {
    id: "h6",
    title: "Зібрати посуд",
    description: "Зібрати весь використаний посуд",
    category: "before-closing",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "h7",
    title: "Винести сміття",
    description: "Винести сміття з залу та кухні",
    category: "before-closing",
    difficulty: "easy",
    forRoles: ["helper"],
    completed: false,
  },

  // Before Closing - Waiter Tasks
  {
    id: "w6",
    title: "Закрити касу",
    description: "Підрахувати виручку та закрити касу",
    category: "before-closing",
    difficulty: "hard",
    forRoles: ["waiter"],
    completed: false,
  },
  {
    id: "w7",
    title: "Заповнити звіт",
    description: "Заповнити звіт про роботу зміни",
    category: "before-closing",
    difficulty: "medium",
    forRoles: ["waiter"],
    completed: false,
  },
]

const mockCompletedTasks = [
  { taskId: "h1", completedBy: "Помічник Тестовий", completedAt: new Date() },
  { taskId: "w1", completedBy: "Офіціант Тестовий", completedAt: new Date() },
  { taskId: "h4", completedBy: "Помічник Тестовий", completedAt: new Date() },
]

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(allTasks)
  const [selectedWorker, setSelectedWorker] = useState<string>("all")

  const isAdmin = user?.role === "admin"
  const userRole = user?.role as "waiter" | "helper"

  // Filter tasks based on user role
  const userTasks = tasks.filter((task) => (!isAdmin ? task.forRoles.includes(userRole) : true))

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

  const getCategoryTitle = (category: Task["category"]) => {
    switch (category) {
      case "before-opening":
        return "Перед відкриттям"
      case "during-work":
        return "Під час роботи"
      case "before-closing":
        return "Перед закриттям"
    }
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            disabled={isAdmin}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
              {getDifficultyIcon(task.difficulty)}
              <Badge variant={task.forRoles.includes("helper") ? "secondary" : "default"}>
                {task.forRoles.includes("helper") ? "Помічник" : "Офіціант"}
              </Badge>
            </div>
            <p className={`text-sm text-gray-600 ${task.completed ? "line-through" : ""}`}>{task.description}</p>
            {task.completed && task.completedBy && (
              <div className="mt-2 flex items-center space-x-2 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span>Виконано: {task.completedBy}</span>
                {task.completedAt && <span>о {task.completedAt.toLocaleTimeString()}</span>}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CategorySection = ({ category }: { category: Task["category"] }) => {
    const categoryTasks = getTasksByCategory(category)
    const progress = getCategoryProgress(category)

    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {getCategoryIcon(category)}
            <div className="flex-1">
              <CardTitle className="text-lg">{getCategoryTitle(category)}</CardTitle>
              <CardDescription>
                {categoryTasks.filter((t) => t.completed).length} з {categoryTasks.length} завдань виконано
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">{Math.round(progress)}%</div>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          {categoryTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Чек-лист завдань</h1>
          <p className="text-gray-600">Адміністративний перегляд виконання завдань</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Активних працівників</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{tasks.filter((t) => t.completed).length}</div>
                  <div className="text-sm text-gray-600">Виконаних завдань</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-8 w-8 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Загальний прогрес</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Огляд</TabsTrigger>
            <TabsTrigger value="by-worker">За працівниками</TabsTrigger>
            <TabsTrigger value="by-category">За категоріями</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Останні виконані завдання</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockCompletedTasks.map((completed, index) => {
                    const task = tasks.find((t) => t.id === completed.taskId)
                    return (
                      <div key={index} className="flex items-center space-x-3 mb-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <div className="flex-1">
                          <div className="font-medium">{task?.title}</div>
                          <div className="text-sm text-gray-600">
                            {completed.completedBy} • {completed.completedAt.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активні працівники</CardTitle>
                </CardHeader>
                <CardContent>
                  {["Офіціант Тестовий", "Помічник Тестовий", "Влад Пекарський", "Саша Маркович"].map((worker, index) => (
                    <div key={index} className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar>
                        <AvatarFallback>
                          {worker
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{worker}</div>
                        <div className="text-sm text-gray-600">
                          {Math.floor(Math.random() * 5) + 1} завдань виконано сьогодні
                        </div>
                      </div>
                      <Badge variant="outline">Онлайн</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="by-worker">
            <Card>
              <CardHeader>
                <CardTitle>Завдання за працівниками</CardTitle>
                <CardDescription>Перегляд виконання завдань кожним працівником</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Функція в розробці</h3>
                  <p className="text-gray-600">Детальний перегляд за працівниками буде доступний незабаром</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-category">
            <div className="space-y-6">
              <CategorySection category="before-opening" />
              <CategorySection category="during-work" />
              <CategorySection category="before-closing" />
            </div>
          </TabsContent>
        </Tabs>

        <FFStatus
          title="Розширена аналітика"
          description="Детальна статистика, звіти та аналітика виконання завдань будуть доступні в майбутніх оновленнях"
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мій чек-лист</h1>
        <p className="text-gray-600">Завдання для {user?.role === "helper" ? "помічника офіціанта" : "офіціанта"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Coffee className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{Math.round(getCategoryProgress("before-opening"))}%</div>
                <div className="text-sm text-gray-600">Перед відкриттям</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <UtensilsCrossed className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{Math.round(getCategoryProgress("during-work"))}%</div>
                <div className="text-sm text-gray-600">Під час роботи</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CleaningServices className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{Math.round(getCategoryProgress("before-closing"))}%</div>
                <div className="text-sm text-gray-600">Перед закриттям</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <CategorySection category="before-opening" />
        <CategorySection category="during-work" />
        <CategorySection category="before-closing" />
      </div>

      <FFStatus
        title="Персональна статистика"
        description="Ваша особиста статистика виконання завдань та досягнення будуть доступні в наступних оновленнях"
      />
    </div>
  )
}
