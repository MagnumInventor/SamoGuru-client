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
  WashingMachine as CleaningServices,
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
  category: "before-opening" | "during-work" | "before-closing"
  difficulty: "easy" | "medium" | "hard"
  day: "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "П'ятниця" | "Субота" | "Неділя" | "ЗАВЖДИ"
  station: string
  forRoles: ("waiter" | "helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

interface SellDish {
  id: string
  title: string
  quantity: number
  forRoles: ("waiter" | "helper")[]
  completed: boolean
  completedBy?: string
  completedAt?: Date
}

const allTasks: Task[] = [
  // Example tasks (reduced for brevity)
  {
    id: "h1",
    title: "Допомогти офіціанту під час відкриття",
    description: "Протерти стакани, прибори, посуд",
    category: "before-opening",
    difficulty: "medium",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["helper"],
    completed: false,
  },
  {
    id: "w1",
    title: "Обслуговувати гостей",
    description: "Приймати замовлення та подавати страви",
    category: "during-work",
    difficulty: "hard",
    day: "ЗАВЖДИ",
    station: "1 поверх",
    forRoles: ["waiter"],
    completed: false,
  },
]

const allSellDishes: SellDish[] = [
  { 
    id: "sd1",
    title: "Раки (2 кг)",
    quantity: 0,
    forRoles: ["waiter"],
    completed: false
  },
]

// Station options
const helperStations = ["Гриль", "Нижній бар", "Верхній бар", "Кухня"];
const waiterStations = [
  "1 поверх", "2 поверх", "3 поверх", 
  "Двір-бар", "Яруса", "Пивниця", 
  "Світлиця", "Гірниця"
];

// Days for dropdown
const days = [
  "Понеділок", "Вівторок", "Середа", 
  "Четвер", "П'ятниця", "Субота", 
  "Неділя", "ЗАВЖДИ"
];

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>(allTasks)
  const [sellDishes, setSellDishes] = useState<SellDish[]>(allSellDishes)
  const [selectedWorker, setSelectedWorker] = useState<string>("all")
  const [selectedDay, setSelectedDay] = useState<string>("ЗАВЖДИ")
  const [selectedStation, setSelectedStation] = useState<string>("")
  
  const isAdmin = user?.role === "admin"
  const userRole = user?.role as "waiter" | "helper" | "admin"

  // Set initial station based on role
  if (!selectedStation) {
    if (userRole === "waiter" && waiterStations.length > 0) {
      setSelectedStation(waiterStations[0])
    } else if (userRole === "helper" && helperStations.length > 0) {
      setSelectedStation(helperStations[0])
    }
  }

  // Filter tasks based on role, station, and day
  const userTasks = tasks.filter((task) => {
    const roleMatch = !isAdmin ? task.forRoles.includes(userRole) : true
    const stationMatch = selectedStation ? task.station === selectedStation : true
    const dayMatch = selectedDay === "ЗАВЖДИ" || task.day === selectedDay || task.day === "ЗАВЖДИ"
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
        <h1 className="text-3xl font-bold mb-6">Адмін панель - Прогрес завдань</h1>
        
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
                              <Badge variant="secondary">{task.station}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <div className="flex items-center mt-2 space-x-2 text-sm">
                              {getDifficultyIcon(task.difficulty)}
                              <span>{task.day}</span>
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
                          <span className="text-gray-500">{task.day}</span>
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

      {/* Sell Dishes Section - Only for waiters */}
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
                      variant="outline" 
                      size="icon"
                      onClick={() => updateDishQuantity(dish.id, false)}
                      disabled={dish.quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 font-medium">{dish.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
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