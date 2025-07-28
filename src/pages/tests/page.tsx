"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"
import { Brain, Trophy, Clock, CheckCircle, XCircle, BarChart3, Link } from "lucide-react"

// ПИТАННЯ З ФАЙЛУ
import { demoTestQuestions } from "@/lib/demo-data"

const testCategories = [
  {
    id: 1,
    title: "Основні страви",
    description: "Тест на знання основних страв та їх складу",
    questions: 15,
    duration: "8 хв",
    difficulty: "Складний",
    lastScore: 85,
    attempts: 3,
  },
  {
    id: 2,
    title: "Мангал та гриль",
    description: "Знання страв з мангалу та способів приготування",
    questions: 12,
    duration: "6 хв",
    difficulty: "Середній",
    lastScore: 78,
    attempts: 2,
  },
  {
    id: 3,
    title: "Хінкалі та хачапурі",
    description: "Традиційні грузинські страви та їх особливості",
    questions: 18,
    duration: "9 хв",
    difficulty: "Середній",
    lastScore: 90,
    attempts: 4,
  },
  {
    id: 4,
    title: "Салати та закуски",
    description: "Холодні страви, салати та закуски",
    questions: 10,
    duration: "5 хв",
    difficulty: "Легкий",
    lastScore: 82,
    attempts: 3,
  },
  {
    id: 5,
    title: "Алергени та попередження",
    description: "Важлива інформація про алергени в стравах",
    questions: 20,
    duration: "10 хв",
    difficulty: "Середній",
    lastScore: null,
    attempts: 0,
  },
    {
    id: 6,
    title: "Перші страви",
    description: "Знання перших страв та їх приготування",
    questions: 12,
    duration: "6 хв",
    difficulty: "Середній",
    lastScore: null,
    attempts: 1,
  },
]

const sampleQuestions = demoTestQuestions

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState<any>(null)
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

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400"
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const startTest = (test: any) => {
    setCurrentTest(test)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResults(false)
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < sampleQuestions.length - 1) {
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
      if (answer === sampleQuestions[index].correct) {
        correct++
      }
    })
    return Math.round((correct / sampleQuestions.length) * 100)
  }


  if (currentTest && !showResults) {
    const question = sampleQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{currentTest.title}</h1>
            <Badge className="bg-orange-100 text-orange-800">
              {currentQuestion + 1} з {sampleQuestions.length}
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
                {currentQuestion < sampleQuestions.length - 1 ? "Наступне питання" : "Завершити тест"}
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
            <CardDescription>Ви завершили тест "{currentTest.title}"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4 text-orange-600 text-center">{score}%</div>
            <div className="text-lg mb-6 text-center">
              Правильних відповідей:{" "}
              {answers.filter((answer, index) => answer === sampleQuestions[index].correct).length} з{" "}
              {sampleQuestions.length}
            </div>

            <div className="space-y-2 mb-6 text-center">
              {score >= 80 && <p className="text-green-600">Відмінний результат! 🎉</p>}
              {score >= 60 && score < 80 && <p className="text-yellow-600">Хороший результат! Є над чим працювати.</p>}
              {score < 60 && <p className="text-red-600">Рекомендуємо повторити навчальні матеріали.</p>}
            </div>

            <div className="mt-8 mb-6">
              <h3 className="text-lg font-medium mb-4">Огляд питань:</h3>
              <div className="space-y-6">
                {sampleQuestions.map((question, index) => {
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


                                                    <Link href="/tests/trainee">
                                                      <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                                                        Перейти на тестування для стажера
                                                      </Button>
                                                    </Link>



              <Button onClick={() => startTest(currentTest)} className="bg-orange-500 hover:bg-orange-600">
                Пройти ще раз
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
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
            <div className="text-2xl font-bold text-orange-600 mb-1">9</div>
            <div className="text-sm text-gray-600">З 12 доступних</div>
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
            </div>
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
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <div className="text-xs text-yellow-800">
                <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
                зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
              </div>
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

              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => startTest(test)}>
                {test.attempts > 0 ? "Пройти знову" : "Розпочати тест"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
