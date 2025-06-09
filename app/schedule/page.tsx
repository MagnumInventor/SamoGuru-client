"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, RefreshCw, CalendarIcon } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { redirectToFF } from "@/lib/ff-redirect"
import Image from "next/image"

// Days of the week abbreviations
const daysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"]

// Month name
const currentMonth = "Червень"

// Helper schedule data based on the provided image
const helperScheduleData = {
  Вова: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Оксана: {
    1: "0",
    2: "0",
    3: "1",
    4: "1",
    5: "1",
    6: "1",
    7: "1",
    8: "0",
    9: "0",
    10: "1",
    11: "1",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "1",
    18: "1",
    19: "1",
    20: "1",
    21: "1",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "1",
    28: "1",
    29: "0",
    30: "0",
  },
  Надя: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Саша: {
    1: "0",
    2: "0",
    3: "1",
    4: "1",
    5: "1",
    6: "1",
    7: "1",
    8: "0",
    9: "0",
    10: "1",
    11: "1",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "1",
    18: "1",
    19: "1",
    20: "1",
    21: "1",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "1",
    28: "1",
    29: "0",
    30: "0",
  },
  Яна: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Олександра: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Таня: {
    1: "0",
    2: "0",
    3: "1",
    4: "1",
    5: "1",
    6: "1",
    7: "1",
    8: "0",
    9: "0",
    10: "1",
    11: "1",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "1",
    18: "1",
    19: "1",
    20: "1",
    21: "1",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "1",
    28: "1",
    29: "0",
    30: "0",
  },
  Ілля: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Вадим: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Аліна: {
    1: "0",
    2: "0",
    3: "1",
    4: "1",
    5: "1",
    6: "1",
    7: "1",
    8: "0",
    9: "0",
    10: "1",
    11: "1",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "1",
    18: "1",
    19: "1",
    20: "1",
    21: "1",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "1",
    28: "1",
    29: "0",
    30: "0",
  },
  Артур: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  "Софія Г.": {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
  Ярослав: {
    1: "1",
    2: "1",
    3: "1",
    4: "0",
    5: "0",
    6: "1",
    7: "1",
    8: "1",
    9: "1",
    10: "1",
    11: "0",
    12: "0",
    13: "1",
    14: "1",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "1",
    21: "1",
    22: "1",
    23: "1",
    24: "1",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "1",
  },
}

const getDayOfWeek = (day: number) => {
  // June 2025 starts on Sunday (0)
  const startDay = 0 // Sunday
  return daysOfWeek[(startDay + day - 1) % 7]
}

export default function SchedulePage() {
  const [selectedCell, setSelectedCell] = useState<{ employee: string; day: number } | null>(null)
  const { user } = useAuth()
  const employees = Object.keys(helperScheduleData)

  const getShiftColor = (shift: string | null) => {
    if (shift === "1") return "bg-blue-100 text-blue-800 border-blue-200"
    if (shift === "0") return "bg-gray-800 text-white" // day off
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getShiftText = (shift: string | null) => {
    if (shift === "1") return "1"
    if (shift === "0") return ""
    return ""
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Розклад роботи помічників</h1>
        <p className="text-gray-600">{currentMonth} 2025 - Графік роботи помічників</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <a href="/schedule">Графік помічників</a>
        </Button>
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <a href="/schedule/waiter">Графік офіціантів</a>
        </Button>
      </div>

      {/* Original Schedule Image */}
      <div className="mb-6">
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-orange-500 mr-2" />
              Оригінальний графік
            </CardTitle>
            <CardDescription>Зображення оригінального графіку</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative w-full max-w-3xl h-[400px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5233-6CXvN2UB2oVctrSirG4u0tq6Ooy1xZ.jpeg"
                alt="Оригінальний графік помічників"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800">
            1
          </div>
          <span className="text-sm text-gray-600">Робочий день</span>
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
            {currentMonth} 2025
          </CardTitle>
          <CardDescription>Графік роботи помічників</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="sticky left-0 bg-gray-50 border border-gray-200 px-4 py-2 text-left font-medium text-gray-900 min-w-[150px]">
                    № Співробітник
                  </th>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
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
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                      const shift = helperScheduleData[employee][day]
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
            <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={redirectToFF}>
              Запросити заміну
            </Button>
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
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={redirectToFF}
            >
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
            <Button
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={redirectToFF}
            >
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
                  {helperScheduleData[selectedCell.employee][selectedCell.day] === "1" && "Робочий день (10:00-22:00)"}
                  {helperScheduleData[selectedCell.employee][selectedCell.day] === "0" && "Вихідний день"}
                </p>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={redirectToFF}>
                Змінити
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
