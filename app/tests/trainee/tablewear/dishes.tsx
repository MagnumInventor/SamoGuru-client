"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, ChevronLeft, ChevronRight, RotateCw } from "lucide-react"

type Question = {
  id: number
  image: string
  question: string
  options: [string, string]
  correctAnswer: 0 | 1
  explanation: string
  backImage?: string
}

const quizData: Question[] = [
  {
    id: 1,
    image: "/public/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (світла)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/public/images/test/trainee/serving/default-serving.jpg"
  },
  {
    id: 2,
    image: "/public/images/test/trainee/dishes/serving-plate.jpg",
    question: "Сервірувальна тарілка (світла)",
    options: [
      "Кухня",
      "Станція офіціанта",
    ],
    correctAnswer: 1,
    explanation: "Сервірувальна тарілка використовується на станції офіціанта для сервірування столу гостям.",
    backImage: "/public/images/test/trainee/serving/default-serving.jpg"
  },

  // ... РЕШТА ПИТАННЬ
]

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [time, setTime] = useState(0)
  const [isQuizActive, setIsQuizActive] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const currentQuestion = quizData[currentIndex]
  const totalQuestions = quizData.length
  const progress = Math.floor((currentIndex / totalQuestions) * 100)

  // Timer effect
  useEffect(() => {
    if (isQuizActive && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isQuizActive, quizCompleted])

  const handleAnswer = (optionIndex: number) => {
    if (!isFlipped) {
      setUserAnswers([...userAnswers, optionIndex])
      setIsFlipped(true)
      setIsQuizActive(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      setIsQuizActive(true)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
      setIsQuizActive(true)
      setUserAnswers(userAnswers.slice(0, -1))
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setUserAnswers([])
    setTime(0)
    setIsQuizActive(true)
    setQuizCompleted(false)
  }

  // РОХРАХУНОК РЕЗУЛЬТАТУ
  const calculateScore = () => {
    if (quizCompleted) {
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === quizData[index].correctAnswer
      ).length
      
      const timePenalty = Math.min(10, Math.floor(time / 60)) // Max 10% penalty
      const rawScore = Math.floor((correctAnswers / totalQuestions) * 100)
      const finalScore = Math.max(0, rawScore - timePenalty)
      
      return {
        correct: correctAnswers,
        total: totalQuestions,
        percentage: finalScore,
        time: time
      }
    }
    return null
  }

  const score = calculateScore()

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тестування знань</h1>
        <p className="text-gray-600">Перевірте свої знання з ресторанного сервісу</p>
      </div>

      {!quizCompleted ? (
        <>
          {/* Progress and Timer */}
          <div className="mb-6 grid grid-cols-3 gap-4 items-center">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Попереднє
            </Button>
            
            <div className="text-center">
              <div className="flex items-center justify-center text-orange-600 mb-1">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{formatTime(time)}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-600 mt-1">
                Питання {currentIndex + 1} з {totalQuestions}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleNext}
              disabled={!isFlipped}
              className="flex items-center justify-end"
            >
              Наступне
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Flip Card */}
          <div 
            className={`flip-card mx-auto max-w-3xl ${isFlipped ? 'flipped' : ''}`}
            onClick={() => isFlipped && handleNext()}
          >
            <div className="flip-card-inner">
              {/* Front of the card - Question */}
              <div className="flip-card-front bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <Card className="border-0 shadow-none">
                  <CardHeader className="items-center">
                    <CardTitle className="text-center text-xl mb-4">
                      {currentQuestion.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 flex justify-center">
                      <div className="bg-gray-100 rounded-lg h-60 w-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                          <p className="text-sm text-gray-500">Зображення: {currentQuestion.question}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-24 py-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleAnswer(0)}
                      >
                        {currentQuestion.options[0]}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-24 py-4 border-green-200 text-green-600 hover:bg-green-50"
                        onClick={() => handleAnswer(1)}
                      >
                        {currentQuestion.options[1]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Back of the card - Answer */}
              <div className="flip-card-back bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <Card className="border-0 shadow-none h-full flex flex-col">
                  <CardHeader className="items-center">
                    <CardTitle className="text-center text-xl mb-2">
                      {currentQuestion.options[currentQuestion.correctAnswer]}
                    </CardTitle>
                    <CardDescription className="text-center text-green-600">
                      Правильна відповідь
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4 flex justify-center">
                      <div className="bg-gray-100 rounded-lg h-48 w-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                          <p className="text-sm text-gray-500">Пояснення</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                      {currentQuestion.explanation}
                    </div>
                  </CardContent>
                  <div className="p-6 text-center">
                    <p className="text-gray-500 text-sm mb-2">Натисніть на картку, щоб продовжити</p>
                    <div className="flex justify-center">
                      <div className="animate-bounce">
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Results Screen */
        <div className="max-w-3xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Результати тестування</CardTitle>
              <CardDescription>
                Ви завершили тестування з {totalQuestions} питань
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-blue-600">
                    {score?.percentage}%
                  </div>
                  <div className="text-gray-600">Результат</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-green-600">
                    {score?.correct}/{score?.total}
                  </div>
                  <div className="text-gray-600">Правильних відповідей</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-4xl font-bold text-purple-600">
                    {formatTime(score?.time || 0)}
                  </div>
                  <div className="text-gray-600">Витрачений час</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Деталізація результатів:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Правильні відповіді:</span>
                    <span className="font-medium">{score?.correct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Неправильні відповіді:</span>
                    <span className="font-medium">{(score?.total ?? 0) - (score?.correct || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Штраф за час:</span>
                    <span className="font-medium">-{Math.min(10, Math.floor((score?.time || 0) / 60))}%</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="font-medium">Фінальний бал:</span>
                    <span className="font-bold text-lg">{score?.percentage}%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleRestart}
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Пройти тест знову
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
          height: 600px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </div>
  )
}