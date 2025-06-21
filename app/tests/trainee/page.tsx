"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Brain, 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Users,
  Map,
  Utensils,
  ArrowsUpFromLine,
  BookOpen
} from 'lucide-react'



// СПИСОК ТЕСТІВ

const testCategories = [
  {
    id: 1,
    title: "Знання сервірування страв/напоїв",
    description: "Правильна подача страв, етикет сервірування",
    questions: 14,
    duration: "7 хв",
    difficulty: "Середній",
    lastScore: 88,
    attempts: 2,
    icon: <Users className="h-5 w-5" />,
    category: 'service'
  },
  {
    id: 2,
    title: "Планування ресторану",
    description: "Знання розташування столів, зон та маршрутів",
    questions: 16,
    duration: "8 хв",
    difficulty: "Складний",
    lastScore: 75,
    attempts: 3,
    icon: <Map className="h-5 w-5" />,
    category: 'layout'
  },
  {
    id: 3,
    title: "Тестування посуду",
    description: "Знання різних видів посуду та їх використання",
    questions: 12,
    duration: "6 хв",
    difficulty: "Легкий",
    lastScore: 92,
    attempts: 1,
    icon: <Utensils className="h-5 w-5" />,
    category: 'dishes',
    isExternal: true
  },
  {
    id: 4,
    title: "Правила використання ліфту",
    description: "Безпека та етикет використання ліфту в ресторані",
    questions: 8,
    duration: "4 хв",
    difficulty: "Легкий",
    lastScore: null,
    attempts: 0,
    icon: <ArrowsUpFromLine className="h-5 w-5" />,
    category: 'elevator'
  },
  {
    id: 5,
    title: "Правила та обов'язки",
    description: "Основні правила роботи та обов'язки співробітників",
    questions: 10,
    duration: "5 хв",
    difficulty: "Легкий",
    lastScore: null,
    attempts: 0,
    icon: <BookOpen className="h-5 w-5" />,
    category: 'rules'
  }
]










// ПИТАННЯ ПО СЕРВІРУВАННІ
const serviceQuestions = [
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






// ПИТАННЯ ПО ПЛАНУВАННЮ РЕСТОРАНУ
const layoutQuestions = [
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
    question: "На які столи замовлення відносяться напряму з кухні/нижнього бару (окрім гарячих напоїв)?",
    type: "single",
    options: [
      "100-ті, 400-ті, 500-ті",
      "100-ті, 200-ті, 300-ті, 400-ті",
      "500-ті, 700-ті, 800-ті",
      "400-ті, 500-ті, 600-ті, 700-ті, 800-ті"
    ],
    correct: 2
  }
]






// ПИТАННЯ ПО ЛІФТУ
const elevatorQuestions = [
  {
    id: 1,
    question: "Максимальна вага для ліфту:",
    type: "single",
    options: [
      "500 кг",
      "750 кг",
      "1000 кг",
      "1200 кг"
    ],
    correct: 2
  },
  {
    id: 2,
    question: "Що потрібно робити при використанні ліфту з гостями?",
    type: "multiple",
    options: [
      "Пропустити гостей першими",
      "Натиснути кнопку поверху",
      "Стояти біля панелі управління",
      "Вийти останнім"
    ],
    correct: [0, 1, 2]
  },
  {
    id: 3,
    question: "В якому випадку заборонено користуватися ліфтом?",
    type: "single",
    options: [
      "При пожежі",
      "З великою кількістю посуду",
      "Пізно ввечері",
      "З дітьми"
    ],
    correct: 0
  }
]








// ПИТАННЯ ПО ПРАВИЛАМ ТА ОБОВ'ЯЗКАМ
const rulesQuestions = [
  {
    id: 1,
    question: "Що робити у вільний час від замовленнь на станції Верхній бар?",
    type: "multiple",
    options: [
      "Очікувати на сервірування замовленнь",
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

// ДОПИСАТИ 2 ТЕСТИ 

    {
    id: 3,
    question: "Що робити у вільний час на станції нижній бар?",
    type: "multiple",
    options: [
      "Сервірувати на передавати гарячі напої",
      "Переміщатися по станціях за іншими завданнями",
      "Перетирати погано натерті стакани/бокали",
      "Підтримувати чистоту та порядок на станції"
    ],
    correct: [1, 2]
  },
    {
    id: 4,
    question: "Що робити у вільний час на станції Гриль?",
    type: "multiple",
    options: [
      "Очікувати на сервірування замовленнь",
      "Переміщатися по станціях за іншими завданнями",
      "Перетирати погано натерті стакани/бокали",
      "Підтримувати чистоту та порядок на станції"
    ],
    correct: [0, 3]
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
      "Приємного апетиту!"
    ],
    correct: 1
  }
]







const getQuestionsForCategory = (category: any) => {
  switch (category) {
    case 'service': return serviceQuestions
    case 'layout': return layoutQuestions
    case 'elevator': return elevatorQuestions
    case 'rules': return rulesQuestions
    default: return serviceQuestions.slice(0, 3) // fallback
  }
}

type Question = {
  id: number;
  question: string;
  type: string;
  options: string[];
  correct: number | number[];
  image?: string;
};

type TestCategory = {
  id: number;
  title: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: string;
  lastScore: number | null;
  attempts: number;
  icon: React.JSX.Element;
  category: string;
  isExternal?: boolean;
};

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState<TestCategory | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedMultiple, setSelectedMultiple] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

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

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400"
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const startTest = (test: TestCategory | null) => {
    if (test === null || typeof test !== 'object' || !('category' in test)) return;
  
    if ('isExternal' in test && test.isExternal) {
      alert("Переадресація на сторінку тестування посуду...")
      return
    }
    
    const testQuestions = getQuestionsForCategory(test.category)
    setQuestions(testQuestions)
    setCurrentTest(test)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setSelectedMultiple([])
    setShowResults(false)
  }

  const nextQuestion = () => {
    const question = questions[currentQuestion]
    let answer = null

    if (question.type === 'multiple') {
      if (selectedMultiple.length === 0) return
      answer = selectedMultiple
    } else {
      if (selectedAnswer === null) return
      answer = selectedAnswer
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setSelectedMultiple([])
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      const question = questions[index]
      if (question.type === 'multiple') {
        const correctAnswers = question.correct
        const userAnswers = answer
        if (
          Array.isArray(correctAnswers) &&
          Array.isArray(userAnswers) &&
          JSON.stringify([...correctAnswers].sort()) === JSON.stringify([...userAnswers].sort())
        ) {
          correct++
        }
      } else {
        if (answer === question.correct) {
          correct++
        }
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleMultipleChoice = (index: number, checked: string | boolean) => {
    if (checked) {
      setSelectedMultiple([...selectedMultiple, index])
    } else {
      setSelectedMultiple(selectedMultiple.filter(i => i !== index))
    }
  }

  if (currentTest && !showResults) {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{currentTest.title}</h1>
            <Badge className="bg-orange-100 text-orange-800">
              {currentQuestion + 1} з {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            {question.type === 'multiple' && (
              <p className="text-sm text-gray-600">Оберіть всі правильні варіанти</p>
            )}
            {question.type === 'image' && question.image && (
              <div className="mt-4">
                <img 
                  src={question.image} 
                  alt="Зображення для питання" 
                  className="w-full max-w-md mx-auto rounded-lg border"
                />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {question.type === 'multiple' ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={`option-${index}`}
                      checked={selectedMultiple.includes(index)}
                      onCheckedChange={(checked) => handleMultipleChoice(index, checked)}
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
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
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentTest(null)}>
                Скасувати тест
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={
                  question.type === 'multiple' 
                    ? selectedMultiple.length === 0 
                    : selectedAnswer === null
                }
                className="bg-orange-500 hover:bg-orange-600"
              >
                {currentQuestion < questions.length - 1 ? "Наступне питання" : "Завершити тест"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
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
            <CardDescription>Ви завершили тест "{currentTest?.title}"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4 text-orange-600 text-center">{score}%</div>
            
            <div className="space-y-2 mb-6 text-center">
              {score >= 80 && <p className="text-green-600">Відмінний результат! 🎉</p>}
              {score >= 60 && score < 80 && <p className="text-yellow-600">Хороший результат! Є над чим працювати.</p>}
              {score < 60 && <p className="text-red-600">Рекомендуємо повторити навчальні матеріали.</p>}
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

  const groupedCategories = {
    'Меню та страви': testCategories.filter(t => t.category === 'menu'),
    'Обслуговування': testCategories.filter(t => t.category === 'service'),
    'Планування': testCategories.filter(t => t.category === 'layout'),
    'Посуд та обладнання': testCategories.filter(t => t.category === 'dishes' || t.category === 'elevator'),
    'Правила та обов\'язки': testCategories.filter(t => t.category === 'rules')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тестування знань</h1>
        <p className="text-gray-600">Перевірте свої знання меню та процедур ресторану</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
              Загальна статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">78%</div>
            <div className="text-sm text-gray-600">Середній бал</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 text-orange-500 mr-2" />
              Пройдено тестів
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {testCategories.filter(t => t.attempts > 0).length}
            </div>
            <div className="text-sm text-gray-600">З {testCategories.length} доступних</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              Час навчання
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">2.5</div>
            <div className="text-sm text-gray-600">Години цього тижня</div>
          </CardContent>
        </Card>
      </div>

  
     {Object.entries(groupedCategories).map(([groupName, tests]) => (
        <div key={groupName} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            {tests[0]?.icon}
            <span className="ml-2">{groupName}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow border-orange-100">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2 flex items-center">
                        {test.icon}
                        <span className="ml-2">{test.title}</span>
                      </CardTitle>
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

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Останній результат:</div>
                      <div className={`text-lg font-semibold ${getScoreColor(test.lastScore)}`}>
                        {test.lastScore ? `${test.lastScore}%` : "Не пройдено"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Спроб:</div>
                      <div className="text-lg font-semibold">{test.attempts}</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    onClick={() => startTest(test)}
                  >
                    {test.isExternal ? "Перейти до тесту" : (test.attempts > 0 ? "Пройти знову" : "Розпочати тест")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}