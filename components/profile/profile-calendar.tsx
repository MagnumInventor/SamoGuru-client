"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import type { WorkShift } from "@/lib/models/user"

interface ProfileCalendarProps {
  workShifts: WorkShift[]
  userRole: string
  onShiftUpdate: () => void
}

const WAITER_STATIONS = [
  "Перший поверх",
  "Другий поверх",
  "Третій поверх",
  "Яруса",
  "Передня",
  "Гірниця",
  "Світлиця",
  "Пивниця",
]

const HELPER_STATIONS = ["Гриль", "Нижня кухня", "Верхній бар", "Нижній бар"]

export function ProfileCalendar({ workShifts, userRole, onShiftUpdate }: ProfileCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ]

  const weekDays = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  const getShiftForDate = (date: Date) => {
    return workShifts.find((shift) => {
      const shiftDate = new Date(shift.date)
      return shiftDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const shift = getShiftForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <div key={day} className={`h-24 border border-gray-100 p-1 ${isToday ? "bg-orange-50 border-orange-200" : ""}`}>
          <div className={`text-sm font-medium ${isToday ? "text-orange-600" : "text-gray-900"}`}>{day}</div>
          {shift && (
            <div className="mt-1 space-y-1">
              <Badge variant={shift.isCompleted ? "default" : "secondary"} className="text-xs px-1 py-0">
                {shift.startTime}-{shift.endTime}
              </Badge>
              {shift.station && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{shift.station}</span>
                </div>
              )}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">Розклад роботи</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {renderCalendarDays()}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              Відпрацьовано
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Заплановано
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
