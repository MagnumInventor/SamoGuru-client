"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, CheckCircle, Clock, Target } from "lucide-react"
import type { InternshipProgress } from "@/backend/models/user"

interface InternshipSectionProps {
  progress: InternshipProgress | null
  userId: string
  onUpdate: () => void
}

const INTERNSHIP_STAGES = [
  {
    id: "orientation",
    name: "Орієнтація",
    tasks: [
      "Ознайомлення з правилами закладу",
      "Вивчення меню та напоїв",
      "Знайомство з командою",
      "Екскурсія по ресторану",
    ],
  },
  {
    id: "basic-training",
    name: "Базове навчання",
    tasks: [
      "Навчання роботи з POS-системою",
      "Основи сервірування столу",
      "Правила спілкування з гостями",
      "Процедури відкриття/закриття",
    ],
  },
  {
    id: "practical-training",
    name: "Практичне навчання",
    tasks: ["Робота під наглядом ментора", "Обслуговування столиків", "Прийом замовлень", "Робота з касою"],
  },
  {
    id: "independent-work",
    name: "Самостійна робота",
    tasks: [
      "Самостійне обслуговування гостей",
      "Вирішення конфліктних ситуацій",
      "Робота в команді",
      "Підтримка стандартів сервісу",
    ],
  },
]

export function InternshipSection({ progress, userId, onUpdate }: InternshipSectionProps) {
  const [updatingTask, setUpdatingTask] = useState<string | null>(null)

  const toggleTask = async (taskId: string, completed: boolean) => {
    setUpdatingTask(taskId)

    try {
      const response = await fetch(`/api/users/${userId}/internship`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId,
          completed,
        }),
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setUpdatingTask(null)
    }
  }

  const getCurrentStage = () => {
    if (!progress) return INTERNSHIP_STAGES[0]
    return INTERNSHIP_STAGES.find((stage) => stage.id === progress.stage) || INTERNSHIP_STAGES[0]
  }

  const getOverallProgress = () => {
    if (!progress) return 0
    const totalTasks = INTERNSHIP_STAGES.reduce((sum, stage) => sum + stage.tasks.length, 0)
    return Math.round((progress.completedTasks.length / totalTasks) * 100)
  }

  const currentStage = getCurrentStage()
  const overallProgress = getOverallProgress()

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Прогрес стажування
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Загальний прогрес</span>
                <span className="text-sm text-gray-600">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{currentStage.name}</div>
                <div className="text-sm text-gray-600">Поточний етап</div>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{progress?.completedTasks.length || 0}</div>
                <div className="text-sm text-gray-600">Завершено завдань</div>
              </div>

              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">
                  {progress
                    ? Math.ceil(
                        (new Date(progress.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Днів залишилось</div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">
                  {progress
                    ? Math.floor(
                        (new Date().getTime() - new Date(progress.startDate).getTime()) / (1000 * 60 * 60 * 24),
                      )
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Днів пройшло</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stages and Tasks */}
      <div className="space-y-4">
        {INTERNSHIP_STAGES.map((stage, stageIndex) => {
          const isCurrentStage = stage.id === currentStage.id
          const isCompleted = progress && INTERNSHIP_STAGES.findIndex((s) => s.id === progress.stage) > stageIndex
          const completedTasksInStage =
            progress?.completedTasks.filter((taskId) =>
              stage.tasks.some((_, taskIndex) => `${stage.id}-${taskIndex}` === taskId),
            ).length || 0

          return (
            <Card key={stage.id} className={isCurrentStage ? "border-orange-200 bg-orange-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : isCurrentStage ? (
                      <Clock className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Target className="h-5 w-5 text-gray-400" />
                    )}
                    <h3 className="font-semibold">{stage.name}</h3>
                  </div>
                  <Badge variant={isCompleted ? "default" : isCurrentStage ? "secondary" : "outline"}>
                    {completedTasksInStage}/{stage.tasks.length}
                  </Badge>
                </div>
                <Progress value={(completedTasksInStage / stage.tasks.length) * 100} className="h-1" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stage.tasks.map((task, taskIndex) => {
                    const taskId = `${stage.id}-${taskIndex}`
                    const isTaskCompleted = progress?.completedTasks.includes(taskId) || false

                    return (
                      <div key={taskIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <Checkbox
                          checked={isTaskCompleted}
                          onCheckedChange={(checked) => toggleTask(taskId, checked as boolean)}
                          disabled={updatingTask === taskId}
                        />
                        <span className={`flex-1 ${isTaskCompleted ? "line-through text-gray-500" : ""}`}>{task}</span>
                        {isTaskCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
