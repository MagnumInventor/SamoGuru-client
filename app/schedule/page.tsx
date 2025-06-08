"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, RefreshCw, CalendarIcon } from "lucide-react"
import { demoScheduleData } from "@/lib/demo-data"

// Sample schedule data matching the image format
const employees = demoScheduleData.employees

const daysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"]

// Generate schedule data for June 2025
// const generateScheduleData = () => {
//   const scheduleData: { [key: string]: { [key: number]: string | null } } = {}

//   employees.forEach((employee) => {
//     scheduleData[employee] = {}
//     for (let day = 1; day <= 31; day++) {
//       // Randomly assign shifts (1 = day shift, 16 = night shift, null = day off)
//       const random = Math.random()
//       if (random < 0.3) {
//         scheduleData[employee][day] = null // day off
//       } else if (random < 0.7) {
//         scheduleData[employee][day] = "1" // day shift
//       } else {
//         scheduleData[employee][day] = "16" // night shift
//       }
//     }
//   })

//   return scheduleData
// }

const getDayOfWeek = (day: number) => {
  // June 2025 starts on Sunday (0)
  const startDay = 0 // Sunday
  return daysOfWeek[(startDay + day - 1) % 7]
}

export default function SchedulePage() {
  const [scheduleData] = useState(demoScheduleData.generateSchedule())
  const [selectedCell, setSelectedCell] = useState<{ employee: string; day: number } | null>(null)

  const getShiftColor = (shift: string | null) => {
    if (shift === "1") return "bg-blue-100 text-blue-800 border-blue-200"
    if (shift === "16") return "bg-green-100 text-green-800 border-green-200"
    return "bg-gray-800 text-white" // day off
  }

  const getShiftText = (shift: string | null) => {
    if (shift === "1") return "1"
    if (shift === "16") return "16"
    return ""
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Розклад роботи</h1>
        <p className="text-gray-600">Червень 2025 - Графік роботи співробітників</p>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800">
            1
          </div>
          <span className="text-sm text-gray-600">Денна зміна</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-xs font-medium text-green-800">
            16
          </div>
          <span className="text-sm text-gray-600">Нічна зміна</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-800 rounded"></div>
          <span className="text-sm text-gray-600">Вихідний</span>
        </div>
      </div>

      {/* Schedule Table */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 text-orange-500 mr-2" />
            Червень 2025
          </CardTitle>
          <CardDescription>Графік роботи всіх співробітників</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="sticky left-0 bg-gray-50 border border-gray-200 px-4 py-2 text-left font-medium text-gray-900 min-w-[150px]">
                    № Співробітник
                  </th>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <th key={day} className="border border-gray-200 px-2 py-2 text-center min-w-[40px]">
                      <div className="text-xs font-medium text-gray-900">{day}</div>
                      <div className="text-xs text-gray-500">{getDayOfWeek(day)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee} className="hover:bg-gray-50">
                    <td className="sticky left-0 bg-white border border-gray-200 px-4 py-2 font-medium text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{index + 1}</span>
                        <span>{employee}</span>
                      </div>
                    </td>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                      const shift = scheduleData[employee][day]
                      return (
                        <td
                          key={day}
                          className="border border-gray-200 p-1 text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => setSelectedCell({ employee, day })}
                        >
                          <div
                            className={`w-6 h-6 mx-auto rounded flex items-center justify-center text-xs font-medium ${getShiftColor(shift)}`}
                          >
                            {getShiftText(shift)}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <RefreshCw className="h-5 w-5 text-orange-500 mr-2" />
              Заміна зміни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Запросити заміну</Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="h-5 w-5 text-orange-500 mr-2" />
              Вихідний день
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
              Запросити вихідний
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 text-orange-500 mr-2" />
              Доступні зміни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
              Переглянути (3)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Selected Cell Info */}
      {selectedCell && (
        <Card className="mt-6 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg">
              Деталі зміни: {selectedCell.employee} - {selectedCell.day} червня
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Зміна:</p>
                <p className="font-medium">
                  {scheduleData[selectedCell.employee][selectedCell.day] === "1" && "Денна зміна (08:00-20:00)"}
                  {scheduleData[selectedCell.employee][selectedCell.day] === "16" && "Нічна зміна (20:00-08:00)"}
                  {!scheduleData[selectedCell.employee][selectedCell.day] && "Вихідний день"}
                </p>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Змінити
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
