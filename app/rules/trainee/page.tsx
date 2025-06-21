import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, AlertTriangle, CheckCircle, Users, Utensils } from "lucide-react"

const rules = [
  {
    category: "Повні руки",
    icon: Users,
    color: "bg-blue-100 text-blue-800",
    rules: [
      "В процесі роботи завжди запосити брудний посуд з станцій/столів",
      "Загружати посуд в дві руки",
      "Завжди пропонуйте допомогу колегам при потребі",
    ],
  },
  {
    category: "Безпека та гігієна",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-800",
    rules: [
      "Миття рук обов'язкове перед початком роботи та після перерв",
      "Перед входом на курілку надягати халат",
      "Повідомляти про будь-які проблеми з обладнанням/посудом",
      "Не торкатися пальцями/руками поверхонь посуду, кромок стаканів, ріжучо-колючих поверхонь приборів",
    ],
  },
  {
    category: "Дисципліна та вигляд",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-800",
    rules: [
      "Завжди слідкувати за своїм зовнішнім видом (чорний низ, на кінцях косички жовті стрічки)",
      "Перед входом на курілку надягати халат",
      "Заборонено курити, їсти, довго відпочивати під час запари та в період 18:00-20:00",
      "Повідомляти адміністрації + колегу по станції про бажання вийти на перекур/перерву",
      "Дотримуватися етичного спілкування",
    ],
  },
]

const newOrders = [
  {
    id: 1,
    title: "Штраф за не підтримання порядку в КП",
    description: "За відсутність звіту під кінець зміни (фото надіслане адміністрації) про відповідний стан форми передбачений штра",
    priority: "easy",
    deadline: "19.05.2025",
    status: "active",
  },
  {
    id: 2,
    title: "Штраф за запізнення",
    description: "1 хв запізнення - 15 грн",
    priority: "medium",
    deadline: "18.05.2025",
    status: "active",
  },
  {
    id: 3,
    title: "Належний зовнішній вигляд",
    description: "Волосся чисте та заплетене, приємний (не заспаний чи втомлений) загальним вигляд, макіяж / нігті не яскраві, в натуральних тонах",
    priority: "medium",
    deadline: "20.05.2025",
    status: "active",
  }
]

const tasks = [
  {
    id: 1,
    title: "Ставити галочки у виконаних завданнях",
    description: "Все у розділі Чек-лист відповідно до призначеної станції",
    frequency: "Щодня",
    status: "ongoing",
  },
  {
    id: 2,
    title: "Перевірка запасів сервірувальних наборів",
    description: "Контроль наявності необхідних матеріалів",
    frequency: "Початок зміни",
    status: "ongoing",
  },
  {
    id: 3,
    title: "Звіт про зміну",
    description: "Почати/закінчити свою зміну на початку / в кінці робочого дня",
    frequency: "Початок/Кінець зміни",
    status: "ongoing",
  },
]

export default function RulesPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Високий"
      case "medium":
        return "Середній"
      case "low":
        return "Низький"
      default:
        return "Невідомо"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Правила та розпорядження</h1>
        <p className="text-gray-600">Етикет, правила поведінки, нові накази та завдання</p>
      </div>

      {/* Rules Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Правила роботи</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {rules.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="h-5 w-5 text-orange-500 mr-2" />
                    {category.category}
                  </CardTitle>
                  <Badge className={category.color}>{category.rules.length} правил</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* New Orders Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Нові накази та розпорядження</h2>
        <div className="space-y-4">
          {newOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow border-orange-100">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.title}</CardTitle>
                    <CardDescription>{order.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getPriorityColor(order.priority)}>{getPriorityText(order.priority)}</Badge>
                    {order.status === "completed" ? (
                      <Badge className="bg-green-100 text-green-800">Виконано</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">Активний</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Термін: {order.deadline}
                  </div>
                  {order.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Постійні завдання</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 text-orange-500 mr-2" />
                  {task.title}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Частота:</span>
                    <span className="text-sm font-medium">{task.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Статус:</span>
                    <Badge className="bg-blue-100 text-blue-800">Поточне</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
