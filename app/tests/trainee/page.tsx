"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

// ІКОНКИ
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
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCw
} from 'lucide-react'

// СПИСОК ТЕСТІВ
// (видалено дубльований масив testCategories)

// Тип для категорії тесту
type TestCategory = {
  id: number
  title: string
  description: string
  questions: number
  duration: string
  difficulty: string
  icon: React.ReactNode
  category: string
  isExternal?: boolean
  isTableware?: boolean
  isFinal?: boolean
}


// СПИСОК ТЕСТІВ
const testCategories: TestCategory[] = [ 
    {
      id: 1,
      title: "Знання сервірування страв/напоїв",
      description: "Правильна подача страв, прибори для сервірування",
      questions: 3,
      duration: "1 хв",
      difficulty: "Середній",
      //lastScore: 88,
      //attempts: 2,
      icon: <Users className="h-5 w-5" />,
      category: 'service'
    },
    {
      id: 2,
      title: "Планування ресторану",
      description: "Знання розташування столів, зон та маршрутів переміщення",
      questions: 3,
      duration: "1 хв",
      difficulty: "Складний",
      //lastScore: 75,
      //attempts: 3,
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
      //lastScore: 92,
      //attempts: 1,
      icon: <Utensils className="h-5 w-5" />,
      category: 'dishes',
      isExternal: true
    },
    {
      id: 4,
      title: "Правила використання обладнання",
      description: "Безпека та етикет використання ліфту та різного обладнання",
      questions: 8,
      duration: "4 хв",
      difficulty: "Легкий",
      //lastScore: null,
      //attempts: 0,
      icon: <ArrowsUpFromLine className="h-5 w-5" />,
      category: 'elevator'
    },
    {
      id: 5,
      title: "Правила та обов'язки",
      description: "Основні правила роботи та обов'язки помічників",
      questions: 10,
      duration: "5 хв",
      difficulty: "Легкий",
      //lastScore: null,
      //attempts: 0,
      icon: <BookOpen className="h-5 w-5" />,
      category: 'rules'
    }
]




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
    correct: [0,1,3]
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
    correct: [0,1,3]
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
    correct: [0,2,3]
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

// TABLEWARE TEST DATA - виправлено структуру (прибрано вкладений масив)
const tablewareQuestions = [
  {
    id: 1,
    image: "/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (світла)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/images/test/trainee/serving/default-serving.jpg"
  },
  {
    id: 2,
    image: "/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (темна)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/images/test/trainee/serving/default-serving.jpg"
  },
  {
    id: 3,
    image: "/images/test/trainee/dishes/serving-plate.jpg",
    question: "Дерев'яна дощечка маленька",
    options: [
      "Верхній бар",
      "Кухня",
    ],
    correctAnswer: 0,
    explanation: "Маленька дерев'яна дощечка використовується на верхньому барі для подачі еспресо та лате.",
    backImage: "/images/test/trainee/serving/default-serving.jpg"
  },
  {
    id: 4,
    image: "/images/test/trainee/dishes/serving-plate.jpg",
    question: "Чугунна корівка",
    options: [
      "Кухня",
      "Гриль",
    ],
    correctAnswer: 1,
    explanation: "Чугунна корівка використовується на грилі для приготування страв.",
    backImage: "/images/test/trainee/serving/default-serving.jpg"
  }
]

const getQuestionsForCategory = (category: string) => {
  switch (category) {
    case 'service': return serviceQuestions
    case 'layout': return layoutQuestions
    case 'elevator': return elevatorQuestions
    case 'rules': return rulesQuestions
    case 'tableware': return tablewareQuestions
    case 'final': return shuffleArray([
      ...serviceQuestions,
      ...layoutQuestions, 
      ...elevatorQuestions,
      ...rulesQuestions,
      ...tablewareQuestions
    ])
    default: return []
  }
}

// Тип для питання
type Question = {
  id: number
  question: string
  type?: "single" | "multiple"
  options: string[]
  correct?: number | number[]
  correctAnswer?: number
  explanation?: string
  image?: string
  backImage?: string
}

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState<TestCategory | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedMultiple, setSelectedMultiple] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  
  // TABLEWARE TEST STATES
  const [isFlipped, setIsFlipped] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [time, setTime] = useState(0)
  const [isQuizActive, setIsQuizActive] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // ... (getDifficultyColor, getScoreColor без змін)

  // Timer effect for tableware test
  useEffect(() => {
    if (currentTest?.isTableware && isQuizActive && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isQuizActive, quizCompleted, currentTest])

  const startTest = (test: TestCategory) => {
    const testQuestions = getQuestionsForCategory(test.category)
    setQuestions(testQuestions)
    setCurrentTest(test)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setSelectedMultiple([])
    setShowResults(false)
    
    // Reset tableware test states
    setIsFlipped(false)
    setUserAnswers([])
    setTime(0)
    setIsQuizActive(true)
    setQuizCompleted(false)
  }

  // ... (nextQuestion, calculateScore, handleMultipleChoice без змін)

  // Calculate score for standard tests (not tableware)
  function calculateScore() {
    if (!questions.length) return 0;
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      const q = questions[i];
      const a = answers[i];
      if (!q) continue;
      if (q.type === "single" && a === q.correct) correct++;
      if (q.type === "multiple" && Array.isArray(q.correct) && Array.isArray(a)) {
        // Compare arrays (order-insensitive)
        const correctArr = q.correct.slice().sort();
        const answerArr = a.slice().sort();
        if (
          correctArr.length === answerArr.length &&
          correctArr.every((v: any, idx: number) => v === answerArr[idx])
        ) {
          correct++;
        }
      }
    }
    return Math.round((correct / questions.length) * 100);
  }

  // TABLEWARE TEST FUNCTIONS
  const handleTablewareAnswer = (optionIndex: number) => {
    if (!isFlipped) {
      setUserAnswers([...userAnswers, optionIndex])
      setIsFlipped(true)
      setIsQuizActive(false)
    }
  }

  const handleTablewareNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setIsFlipped(false)
      setIsQuizActive(true)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleTablewarePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setIsFlipped(false)
      setIsQuizActive(true)
      setUserAnswers(userAnswers.slice(0, -1))
    }
  }

  const handleTablewareRestart = () => {
    setCurrentQuestion(0)
    setIsFlipped(false)
    setUserAnswers([])
    setTime(0)
    setIsQuizActive(true)
    setQuizCompleted(false)
  }

  const calculateTablewareScore = () => {
    if (quizCompleted) {
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length
      
      const timePenalty = Math.min(10, Math.floor(time / 60))
      const rawScore = Math.floor((correctAnswers / questions.length) * 100)
      const finalScore = Math.max(0, rawScore - timePenalty)
      
      return {
        correct: correctAnswers,
        total: questions.length,
        percentage: finalScore,
        time: time
      }
    }
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // ... (рендеринг флеш-карток та стандартних тестів без змін)

  // RESULTS SCREEN - виправлено кнопки
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
              <Button variant="outline" onClick={() => {
                setCurrentTest(null)
                setShowResults(false)
              }}>
                Повернутися до тестів
              </Button>
              <Button
                onClick={() => currentTest && startTest(currentTest)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Пройти ще раз
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // MAIN TESTS PAGE
  const groupedCategories = {
    'Обслуговування': testCategories.filter(t => t.category === 'service'),
    'Планування': testCategories.filter(t => t.category === 'layout'),
    'Посуд та обладнання': testCategories.filter(t => t.category === 'tableware' || t.category === 'elevator'),
    'Правила та обов\'язки': testCategories.filter(t => t.category === 'rules'),
    'Підсумковий тест': testCategories.filter(t => t.isFinal)
  }

  function getDifficultyColor(difficulty: any): string | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тестування знань</h1>
        <p className="text-gray-600">Перевірка теоретичних знань під закінчення стажування на посаду помічника офіціанта</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 text-orange-500 mr-2" />
              Загальна статистика
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">86%</div>
            <div className="text-sm text-gray-600">*Середній бал</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="h-5 w-5 text-orange-500 mr-2" />
              Розроблено тестів
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">{testCategories.length}</div>
            <div className="text-sm text-gray-600">З яких доступно усі питання</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              Середній час фінального тесту
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Хвилини на всі питання</div>
          </CardContent>
        </Card>
      </div>

      {/* Test Categories by Groups */}
      {Object.entries(groupedCategories).map(([groupName, tests]) => 
        tests.length > 0 && (
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
                        <span>{test.questions} питань</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{test.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        {/* Видалено відображення результатів */}
                        <span className="text-gray-400">Новий тест</span>
                      </div>
                      <Button 
                        onClick={() => startTest(test)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Почати тест
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      )}

      {/* Final Section with Tips */}
      <div className="mt-12">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <BookOpen className="h-5 w-5 mr-2" />
              Поради щодо підготовки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  Практика з колегами
                </h3>
                <p className="text-sm text-gray-600">
                  Організуйте групові тренування для покращення навичок обслуговування.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Map className="h-4 w-4 mr-2 text-blue-600" />
                  Вивчення плану залу
                </h3>
                <p className="text-sm text-gray-600">
                  Запам'ятовуйте розташування столів та маршрути руху для ефективної роботи.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Utensils className="h-4 w-4 mr-2 text-blue-600" />
                  Знайомство з меню
                </h3>
                <p className="text-sm text-gray-600">
                  Вивчайте інгредієнти та способи приготування страв для консультацій гостей.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Test Reminder */}
      <div className="mt-8 text-center">
        <Card className="border-green-200 bg-green-50 max-w-3xl mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center text-green-800">
              <ArrowsUpFromLine className="h-5 w-5 mr-2" />
              Фінальний тест
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Після завершення всіх тематичних тестів рекомендуємо пройти фінальний тест,
              який включає питання з усіх тем для комплексної перевірки знань.
            </p>
            <Button 
              onClick={() => {
                const finalTest = testCategories.find(t => t.isFinal)
                if (finalTest) startTest(finalTest)
              }}
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

function shuffleArray<T>(array: T[]): T[] {
  // Simple Fisher-Yates shuffle
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
