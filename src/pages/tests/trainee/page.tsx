"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"
import { Brain, Trophy, Clock, Map, CheckCircle, XCircle, BarChart3, Link, ArrowsUpFromLine, BookOpen, Users, Utensils } from "lucide-react"

// --- Types ---
type TestCategory = {
  id: number
  title: string
  description: string
  questions: number
  duration: string
  difficulty: string
  icon: React.ReactNode
  category: string
  isFinal?: boolean
  questionsList: Question[]
}

type Question = {
  id: number
  question: string
  type: "single" | "multiple"
  options: string[]
  correct: number | number[]
}

// --- Questions Data ---
const serviceQuestions: Question[] = [
  {
    id: 1,
    question: "Для яких напоїв не подається печево?",
    type: "single",
    options: [
      "Чай, капучіно, какао, кава по-ірландськи",
      "Лате, мокко",
      "Кава по-ірландськи, рістретто",
      "Рістретто, еспресо, допіо"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "До яких страв дається столова ложка",
    type: "single",
    options: [
      "Тільки на дошку з виямкою для ложки",
      "Всі перші страви",
      "Супи, крім ланчів",
      "Всі гарячі страви"
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "Яке хачапурі подається з 2 вилками?",
    type: "single",
    options: [
      "З ростбіфом",
      "З лисичками",
      "По-аджарськи",
      "По-мергельськи"
    ],
    correct: 2
  }
]
const layoutQuestions: Question[] = [
  {
    id: 1,
    question: "За яким номером столу розташована VIP кімната на 2 поверсі",
    type: "single",
    options: [
      "203-204",
      "214",
      "220",
      "208"
    ],
    correct: 3
  },
  {
    id: 2,
    question: "Установіть послідовність станцій за номерацією столів: 627, 616, 502, 220? (оберіть всі правильні)",
    type: "single",
    options: [
      "Гірниця, Світлиця, Стаєнка, Під стріхою",
      "Світлиця, Пивниця, Пивоварня, Стаєнка",
      "Гірниця, Пивниця, Яруса, Стаєнка",
      "Світлиця, Пивниця, Яруса, Пивоварня",
      "Дитяча кімната"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "На які столи замовлення помічники відносять напряму з кухні/нижнього бару (окрім гарячих напоїв)?",
    type: "single",
    options: [
      "100-ті, 400-ті, 500-ті",
      "100-ті, 200-ті, 300-ті, 400-ті",
      "500-ті, 600-ті, 700-ті, 800-ті",
      "400-ті, 500-ті, 600-ті, 700-ті, 800-ті"
    ],
    correct: 2
  }
]
const elevatorQuestions: Question[] = [
  {
    id: 1,
    question: "На який поверх потрібно відправляти Джоні (ліфт для посуду) за відсутності потреби у завантеженні/розвантаженні",
    type: "single",
    options: [
      "1 - Гриль (біля мийки)",
      "2 - Верхній бар",
      "3 - Під стріхою",
      "Відпрявляти за проханням"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "Коли можна керувати панеллю з поверхами, якщо ліфт не на твоєму поверсі?",
    type: "single",
    options: [
      "На нижні поверхи для завантаження",
      "Це заборонено правилами безпеки",
      "Технічно неможливо",
      "Вертати на свою станцію",
      "На верхні поверхи для розвантаження"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "На яку станцію потрібно відправляти ліфт для страв за відсутності потреби у завантеженні/розвантаженні та інших страв",
    type: "single",
    options: [
      "На любий поверх",
      "Лишати на своїй станції",
      "Залежно від прохання персоналу",
      "Завжди на кухню - К"
    ],
    correct: 3,
  },
  {
    id: 4,
    question: "На що потрібно звертати увагу при завантаженні ліфта для посуду?",
    type: "multiple",
    options: [
      "На габарити на борти ліфту",
      "Стабільність стопок з посуду",
      "Зачекати на повне загруження ліфту",
      "Вагу посуду (важкий - низ, легкий - верх)",
    ],
    correct: [0, 1, 3]
  },
  {
    id: 5,
    question: "Коли розпочинати та закінчувати зміну?",
    type: "multiple",
    options: [
      "Зранку - без форми якомога швидше",
      "Ввечері - після виконання усіх завданнь",
      "Ввечері - перед виходом із закладу",
      "Зранку - в робочій формі, перед виконанням роботи",
    ],
    correct: [0, 1, 3]
  }
]
const rulesQuestions: Question[] = [
  {
    id: 1,
    question: "Що робити у вільний час від замовленнь на станції Верхній бар?",
    type: "multiple",
    options: [
      "Очікувати на сервірування готових замовленнь",
      "Переміщатися по станціях за іншими завданнями",
      "Перетирати погано натерті стакани/бокали",
      "Підтримувати чистоту та порядок на станції"
    ],
    correct: [2, 3]
  },
  {
    id: 2,
    question: "Що робити у вільний час на станції кухня?",
    type: "multiple",
    options: [
      "Очікувати на сервірування замовленнь",
      "За можливості надавати допомогу кухарям/офіціантам/помічникам",
      "Поновити запаси приборів",
      "Прибирати кімнату персоналу"
    ],
    correct: [0, 1]
  },
  {
    id: 3,
    question: "Що робити у вільний час на станції нижній бар?",
    type: "multiple",
    options: [
      "Підмітати та мити зону з 500-800-ми столами",
      "Перевіряти та натерати скляний посуд з барних стійок",
      "Носити брудний посуд на мийку (або до станції Гриль)",
      "Насипати соняшникове насіння у відповідний сервірувальний посуд",
      "Підтримувати чистоту та порядок на станції"
    ],
    correct: [1, 2, 4]
  },
  {
    id: 4,
    question: "Що робити у вільний час на станції Гриль?",
    type: "multiple",
    options: [
      "Переносити брудний посуд з двору на мийку",
      "Прибирати туалет чи хост",
      "Перетирати погано натерті прибори",
      "Підтримувати чистоту та порядок на станції"
    ],
    correct: [0, 2, 3]
  },
  {
    id: 5,
    question: "Що входить в обов'язки помічника?",
    type: "multiple",
    options: [
      "Подача страв/напоїв гостям",
      "Сервірування столів",
      "Допомога офіціантам",
      "Прибирання столів",
      "Контроль за наявністю посуду/приборів на станції",
      "Сервірування страв/напоїв",
    ],
    correct: [2, 4, 5]
  },
  {
    id: 6,
    question: "Що казати гостю (за проханням офіціанта) на подачі страви гостю?",
    type: "single",
    options: [
      "Смачного!",
      "Ваша (назва страви), нехай смакує!",
      "Утриматись від коментарів",
      "Помічник не може подавати страву гостю",
      "Приємного апетиту!"
    ],
    correct: 3
  }
]
const tablewareQuestions: Question[] = [
  {
    id: 1,
    question: "Сервірувальна тарілка (світла)",
    type: "single",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Сервірувальна тарілка (темна)",
    type: "single",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Дерев'яна дощечка маленька",
    type: "single",
    options: [
      "Верхній бар",
      "Кухня",
    ],
    correct: 0
  },
  {
    id: 4,
    question: "Чугунна корівка",
    type: "single",
    options: [
      "Кухня",
      "Гриль",
    ],
    correct: 1
  }
]
const finalTestQuestions: Question[] = [
  ...serviceQuestions,
  ...layoutQuestions,
  ...elevatorQuestions,
  ...rulesQuestions,
  ...tablewareQuestions
]

// --- Test Categories ---
const testCategories: TestCategory[] = [
  {
    id: 1,
    title: "Знання сервірування страв/напоїв",
    description: "Правильна подача страв, прибори для сервірування",
    questions: serviceQuestions.length,
    duration: "1.5 хв",
    difficulty: "Складний",
    icon: <Users className="h-5 w-5" />,
    category: 'service',
    questionsList: serviceQuestions
  },
  {
    id: 2,
    title: "Планування ресторану",
    description: "Знання розташування столів, зон та маршрутів переміщення",
    questions: layoutQuestions.length,
    duration: "1 хв",
    difficulty: "Складний",
    icon: <Map className="h-5 w-5" />,
    category: 'layout',
    questionsList: layoutQuestions
  },
  {
    id: 3,
    title: "Тестування посуду",
    description: "Знання різних видів посуду та їх використання",
    questions: tablewareQuestions.length,
    duration: "6 хв",
    difficulty: "Легкий",
    icon: <Utensils className="h-5 w-5" />,
    category: 'dishes',
    questionsList: tablewareQuestions
  },
  {
    id: 4,
    title: "Правила використання обладнання",
    description: "Безпека та правила використання ліфту та різного обладнання",
    questions: elevatorQuestions.length,
    duration: ">2 хв",
    difficulty: "Легкий",
    icon: <ArrowsUpFromLine className="h-5 w-5" />,
    category: 'elevator',
    questionsList: elevatorQuestions
  },
  {
    id: 5,
    title: "Правила та обов'язки",
    description: "Основні правила роботи та обов'язки помічників",
    questions: rulesQuestions.length,
    duration: "2.5 хв",
    difficulty: "Легкий",
    icon: <BookOpen className="h-5 w-5" />,
    category: 'rules',
    questionsList: rulesQuestions
  }
]

// --- Component Logic ---
export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState<TestCategory | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легкий":
        return "bg-green-100 text-green-800"
      case "Середній":
        return "bg-yellow-100 text-yellow-800"
      case "Складний":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const startTest = (test: TestCategory) => {
    setCurrentTest(test)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResults(false)
  }

  // Defensive: do not render test if no questionsList
  const currentQuestions: Question[] = currentTest?.questionsList || []

  // Defensive: if currentTest is set but has no questionsList, return to main page
  if (currentTest && (!currentQuestions || currentQuestions.length === 0)) {
    setCurrentTest(null)
    return null
  }

  // Defensive: if currentQuestion is out of bounds, reset to 0
  if (currentTest && currentQuestion >= currentQuestions.length) {
    setCurrentQuestion(0)
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      const q = currentQuestions[index]
      if (q.type === "single" && answer === q.correct) {
        correct++
      }
      // Optionally, add logic for "multiple" type if needed
    })
    return Math.round((correct / currentQuestions.length) * 100)
  }

  // --- Test UI ---
  if (currentTest && !showResults) {
    const question = currentQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{currentTest.title}</h1>
            <Badge className="bg-orange-100 text-orange-800">
              {currentQuestion + 1} з {currentQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentTest(null)}>
                Скасувати тест
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswer === null}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {currentQuestion < currentQuestions.length - 1 ? "Наступне питання" : "Завершити тест"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults && currentTest) {
    const score = calculateScore()
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {score >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-500" />
              ) : score >= 60 ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">Результат тесту</CardTitle>
            <CardDescription>Ви завершили тест "{currentTest.title}"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4 text-orange-600 text-center">{score}%</div>
            <div className="text-lg mb-6 text-center">
              Правильних відповідей:{" "}
              {answers.filter((answer, index) => answer === currentQuestions[index].correct).length} з{" "}
              {currentQuestions.length}
            </div>
            <div className="space-y-2 mb-6 text-center">
              {score >= 80 && <p className="text-green-600">Відмінний результат! 🎉</p>}
              {score >= 60 && score < 80 && <p className="text-yellow-600">Хороший результат! Є над чим працювати.</p>}
              {score < 60 && <p className="text-red-600">Рекомендуємо повторити навчальні матеріали.</p>}
            </div>
            <div className="mt-8 mb-6">
              <h3 className="text-lg font-medium mb-4">Огляд питань:</h3>
              <div className="space-y-6">
                {currentQuestions.map((question, index) => {
                  const isCorrect = answers[index] === question.correct
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1 ml-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`text-sm ${
                                  optIndex === question.correct
                                    ? "text-green-700 font-medium"
                                    : optIndex === answers[index] && optIndex !== question.correct
                                      ? "text-red-700 font-medium"
                                      : "text-gray-600"
                                }`}
                              >
                                {optIndex === question.correct && <CheckCircle className="inline h-3 w-3 mr-1" />}
                                {optIndex === answers[index] && optIndex !== question.correct && (
                                  <XCircle className="inline h-3 w-3 mr-1" />
                                )}
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setCurrentTest(null)}>
                Повернутися до тестів
              </Button>
              <Button onClick={() => startTest(currentTest)} className="bg-orange-500 hover:bg-orange-600">
                Пройти ще раз
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Main Page with Test List ---
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тестування знань</h1>
        <p className="text-gray-600">Перевірте свої знання меню та процедур ресторану</p>
      </div>
      {/* Stats Overview - can be removed or left as is */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
              Проміжна статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">78%</div>
            <div className="text-sm text-gray-600">Середній бал</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 text-orange-500 mr-2" />
              Розроблено тестів для помічників
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
            <div className="text-sm text-gray-600">З них доступно 17 питань</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              Середній час
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">4</div>
            <div className="text-sm text-gray-600">Хвилини на проходження підсумкового тестування</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testCategories.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  {test.questions} питань
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {test.duration}
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => startTest(test)}>
                Розпочати тест
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Final Test Block */}
      <div className="mt-12">
        <Card className="border-green-200 bg-green-50 max-w-2xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center text-green-800">
              <Trophy className="h-5 w-5 mr-2" />
              Фінальний тест
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Після завершення всіх тематичних тестів рекомендуємо пройти фінальний тест,
              який включає питання з усіх тем для комплексної перевірки знань.
            </p>
            <Button
              onClick={() =>
                startTest({
                  id: 999,
                  title: "Фінальний тест",
                  description: "Комплексний тест з усіх тем для підсумкової перевірки знань",
                  questions: finalTestQuestions.length,
                  duration: "12 хв",
                  difficulty: "Складний",
                  icon: <Trophy className="h-5 w-5" />,
                  category: "final",
                  isFinal: true,
                  questionsList: finalTestQuestions,
                })
              }
              className="bg-green-600 hover:bg-green-700"
            >
              Почати фінальний тест
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}