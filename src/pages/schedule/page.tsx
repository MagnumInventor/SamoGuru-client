"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, Users, RefreshCw, CalendarIcon } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { redirectToFF } from "@/lib/ff-redirect"
import Image from "next/image"

// Days of the week abbreviations
const daysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"]

// Month name
const currentMonth = "Червень"

// ГРафіек помічників - (17) з Максим Скакуна до Евеліни (from IMG_5159)
type HelperSchedule = {
  [employee: string]: {
    [day: number]: string
  }
}

const helperScheduleData: HelperSchedule = {
    "Максим Скак.": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "0",
    18: "1",
    19: "16",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "0",
    28: "0",
    29: "0",
    30: "1",
    31: "16"
  },
  "Аня Лемик": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "16",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "16",
    18: "1",
    19: "1",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "16",
    27: "0",
    28: "0",
    29: "0",
    30: "1",
    31: "1"
  },
  "Влад Ярем": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "16",
    17: "0",
    18: "1",
    19: "1",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "0",
    28: "0",
    29: "0",
    30: "16",
    31: "1"
  },
  "Захар": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "0",
    18: "1",
    19: "1",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "1",
    27: "0",
    28: "0",
    29: "0",
    30: "0",
    31: "1"
  },
  "Саша Маркович": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "1",
    14: "1",
    15: "0",
    16: "0",
    17: "0",
    18: "16",
    19: "1",
    20: "1",
    21: "0",
    22: "0",
    23: "16",
    24: "1",
    25: "16",
    26: "1",
    27: "0",
    28: "0",
    29: "0",
    30: "1",
    31: "1"
  },
  "Мілана": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "16",
    14: "1",
    15: "0",
    16: "0",
    17: "0",
    18: "1",
    19: "1",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "16",
    26: "1",
    27: "0",
    28: "16",
    29: "0",
    30: "1",
    31: "1"
  },
  "Єва Комбуль": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "16",
    14: "1",
    15: "1",
    16: "0",
    17: "0",
    18: "0",
    19: "16",
    20: "16",
    21: "1",
    22: "0",
    23: "0",
    24: "0",
    25: "16",
    26: "16",
    27: "16",
    28: "0",
    29: "0",
    30: "0",
    31: "16"
  },
  "Каріна": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "1",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "16",
    14: "16",
    15: "0",
    16: "0",
    17: "0",
    18: "1",
    19: "16",
    20: "1",
    21: "0",
    22: "0",
    23: "0",
    24: "16",
    25: "1",
    26: "1",
    27: "0",
    28: "0",
    29: "0",
    30: "1",
    31: "1"
  },
  "Лінищук": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "1",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "16",
    13: "16",
    14: "1",
    15: "0",
    16: "0",
    17: "0",
    18: "1",
    19: "1",
    20: "16",
    21: "0",
    22: "0",
    23: "0",
    24: "1",
    25: "1",
    26: "16",
    27: "0",
    28: "0",
    29: "0",
    30: "16",
    31: "1"
  },
  "Влад Пек.": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "16",
    13: "0",
    14: "0",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "0",
    31: "16"
  },
  "Саша Гладка": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "0",
    15: "1",
    16: "1",
    17: "1",
    18: "16",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "16",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "0",
    31: "0"
  },
  "Матвій Гард.": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "0",
    15: "1",
    16: "16",
    17: "1",
    18: "0",
    19: "16",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "0",
    26: "16",
    27: "1",
    28: "1",
    29: "1",
    30: "0",
    31: "0"
  },
  "Настя Пушкар": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "0",
    15: "1",
    16: "1",
    17: "16",
    18: "0",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "16",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "16",
    31: "0"
  },
  "Зоряна Грубяк": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "0",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "16",
    24: "0",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "0",
    31: "0"
  },
  "Марта": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "1",
    13: "0",
    14: "0",
    15: "0",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "16",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "0",
    26: "1",
    27: "1",
    28: "1",
    29: "0",
    30: "0",
    31: "0"
  },
  "Тращук Таня": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "0",
    15: "1",
    16: "1",
    17: "16",
    18: "0",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "0",
    26: "0",
    27: "16",
    28: "1",
    29: "1",
    30: "0",
    31: "0"
  },
  "Евеліна": {
    1: "0",
    2: "0",
    3: "0",
    4: "0",
    5: "0",
    6: "0",
    7: "0",
    8: "0",
    9: "0",
    10: "0",
    11: "0",
    12: "0",
    13: "0",
    14: "16",
    15: "1",
    16: "1",
    17: "1",
    18: "0",
    19: "0",
    20: "0",
    21: "1",
    22: "1",
    23: "1",
    24: "0",
    25: "0",
    26: "0",
    27: "1",
    28: "1",
    29: "1",
    30: "0",
    31: "0"
  }
};

// Add waiter schedule data and helpers from waiter/page.tsx
const waiterDaysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
const waiterScheduleData = {
  "Ігор": {
    "1": "1", "2": "0", "3": "0", "4": "0", "5": "1", "6": "1", "7": "1", "8": "0", "9": "0", "10": "0", "11": "1", "12": "1", "13": "1", "14": "0", "15": "0", "16": "0", "17": "1", "18": "1", "19": "1", "20": "0", "21": "0", "22": "0", "23": "1", "24": "1", "25": "1", "26": "0", "27": "0", "28": "0", "29": "1", "30": "1"
  },
  "Олексій": {
    "1": "0", "2": "1", "3": "1", "4": "1", "5": "0", "6": "0", "7": "0", "8": "1", "9": "1", "10": "1", "11": "0", "12": "0", "13": "0", "14": "1", "15": "1", "16": "1", "17": "0", "18": "0", "19": "0", "20": "1", "21": "1", "22": "1", "23": "0", "24": "0", "25": "0", "26": "1", "27": "1", "28": "1", "29": "0", "30": "0"
  },
  "Сергій": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Дмитро": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Андрій": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Олег": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Іван": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Петро": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Станіслав": {
    "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0", "7": "0", "8": "0", "9": "0", "10": "0", "11": "0", "12": "1", "13": "1", "14": "1", "15": "0", "16": "0", "17": "0", "18": "1", "19": "1", "20": "1", "21": "0", "22": "0", "23": "0", "24": "1", "25": "1", "26": "1", "27": "0", "28": "0", "29": "0", "30": "0", "31": "1"
  },
  "Ярослав": {
    "1": "0", "2": "1", "3": "1", "4": "1", "5": "0", "6": "0", "7": "0", "8": "1", "9": "1", "10": "1", "11": "0", "12": "0", "13": "0", "14": "1", "15": "1", "16": "1", "17": "0", "18": "0", "19": "0", "20": "1", "21": "1", "22": "1", "23": "0", "24": "0", "25": "0", "26": "1", "27": "1", "28": "1", "29": "0", "30": "0"
  }
};

const getDayOfWeek = (day: number) => {
  // June 2025 starts on Sunday (0)
  const startDay = 0 // Sunday
  return daysOfWeek[(startDay + day - 1) % 7]
}

const getWaiterDayOfWeek = (day: number) => {
  const startDay = 0; // Sunday
  return waiterDaysOfWeek[(startDay + day - 1) % 7];
};

export default function SchedulePage() {
  const [selectedCell, setSelectedCell] = useState<{ employee: string; day: number } | null>(null)
  const [selectedWaiterCell, setSelectedWaiterCell] = useState<{ employee: string; day: number } | null>(null);
  const { user } = useAuth()
  const employees = Object.keys(helperScheduleData)

  const getShiftColor = (shift: string | null) => {
    if (shift === "1") return "bg-blue-100 text-blue-800 border-blue-200"
    if (shift === "16") return "bg-green-100 text-green-800 border-green-200"
    if (shift === "extra-1") return "bg-gray-900 text-white border-gray-900" 
    if (shift === "extra-16") return "bf-gray-900 text-white border-gray-900" // Black for extra shifts
    if (shift === "0") return "bg-gray-100 text-gray-400 border-gray-200" // Light gray for rest
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getShiftText = (shift: string | null) => {
    if (shift === "1") return "1"
    if (shift === "16") return "16"
    if (shift === "extra-16") return "E-16" // E for Extra
    if (shift === "extra-1") return "E-1"
    if (shift === "0") return ""
    return ""
  }

  const getWaiterShiftColor = (shift: string | null) => {
       if (shift === "1") return "bg-blue-100 text-blue-800 border-blue-200"
    if (shift === "16") return "bg-green-100 text-green-800 border-green-200"
    if (shift === "extra-1") return "bg-gray-900 text-white border-gray-900" 
    if (shift === "extra-16") return "bf-gray-900 text-white border-gray-900" // Black for extra shifts
    if (shift === "0") return "bg-gray-100 text-gray-400 border-gray-200" // Light gray for rest
    return "bg-gray-100 text-gray-800 border-gray-200"
  };

  const getWaiterShiftText = (shift: string | null) => {
    if (shift === "1") return "1"
    if (shift === "16") return "16"
    if (shift === "extra-16") return "E-16" // E for Extra
    if (shift === "extra-1") return "E-1"
    if (shift === "0") return ""
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Розклад роботи помічників</h1>
        <p className="text-gray-600">{currentMonth} 2025 - Графік роботи помічників (14 співробітників)</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <a href="/schedule">Графік помічників</a>
        </Button>
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <a href="/schedule/waiter">Графік офіціантів</a>
        </Button>
        {user?.role === "admin" && (
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            <a href="/admin">Адмін панель</a>
          </Button>
        )}
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800">
            1
          </div>
          <span className="text-sm text-gray-600">Денна зміна (10:00-22:00)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-xs font-medium text-green-800">
            16
          </div>
          <span className="text-sm text-gray-600">Вечірня зміна (16:00-02:00)</span>
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
            {currentMonth} 2025 - Помічники (14 співробітників)
          </CardTitle>
          <CardDescription>Графік роботи помічників: Максим Скак. - Ярослав Борода</CardDescription>
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
                  {helperScheduleData[selectedCell.employee][selectedCell.day] === "1" && "Денна зміна (10:00-22:00)"}
                  {helperScheduleData[selectedCell.employee][selectedCell.day] === "16" &&
                    "Вечірня зміна (16:00-02:00)"}
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

      {/* Add a button to scroll to waiters' schedule */}
      <div className="mb-6">
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" onClick={() => {
          const el = document.getElementById("waiter-schedule-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}>
          Перейти до графіку офіціантів
        </Button>
      </div>

      {/* Waiters Schedule Section */}
      <div id="waiter-schedule-section" className="mt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Розклад роботи офіціантів</h2>
          <p className="text-gray-600">Червень 2025 - Графік роботи офіціантів ({Object.keys(waiterScheduleData).length} співробітників)</p>
        </div>

        {/* Legend for waiters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800">
              1
            </div>
            <span className="text-sm text-gray-600">Денна зміна (9:00-23:00)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-xs font-medium text-green-800">
              16
            </div>
            <span className="text-sm text-gray-600">Вечірня зміна (16:00-23:00)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded"></div>
            <span className="text-sm text-gray-600">Вихідний</span>
          </div>
        </div>

        {/* Waiters Schedule Table */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-orange-500 mr-2" />
              Червень 2025 - Офіціанти ({Object.keys(waiterScheduleData).length} співробітників)
            </CardTitle>
            <CardDescription>Графік роботи офіціантів: Ігор - Ярослав</CardDescription>
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
                        <div className="text-xs text-gray-500">{getWaiterDayOfWeek(day)}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(waiterScheduleData).map((employee, index) => (
                    <tr key={employee} className="hover:bg-gray-50">
                      <td className="sticky left-0 bg-white border border-gray-200 px-4 py-2 font-medium text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{index + 1}</span>
                          <span>{employee}</span>
                        </div>
                      </td>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                        const shift = waiterScheduleData[employee][day];
                        return (
                          <td
                            key={day}
                            className="border border-gray-200 p-1 text-center cursor-pointer hover:bg-gray-100"
                            onClick={() => setSelectedWaiterCell({ employee, day })}
                          >
                            <div
                              className={`w-6 h-6 mx-auto rounded flex items-center justify-center text-xs font-medium ${getWaiterShiftColor(shift)}`}
                            >
                              {getWaiterShiftText(shift)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Selected Waiter Cell Info */}
        {selectedWaiterCell && (
          <Card className="mt-6 border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">
                Деталі зміни: {selectedWaiterCell.employee} - {selectedWaiterCell.day} червня
              </CardTitle>
            </CardHeader>
{ /*
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Зміна:</p>
                  <p className="font-medium">
                    {waiterScheduleData[selectedWaiterCell.employee][selectedWaiterCell.day] === "1" && "Робочий день (10:00-22:00)"}
                    {waiterScheduleData[selectedWaiterCell.employee][selectedWaiterCell.day] === "16" && "Вечірня зміна (16:00-23:00)"}
                    {waiterScheduleData[selectedWaiterCell.employee][selectedWaiterCell.day] === "0" && "Вихідний день"}
                  </p>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={redirectToFF}>
                  Змінити
                </Button>
              </div>
            </CardContent>
*/}
          </Card>
        )}
      </div>

      {/* Original Schedule Image - MOVED TO BOTTOM */}
      <div className="mt-12">
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-orange-500 mr-2" />
              Оригінальний графік помічників
            </CardTitle>
            <CardDescription>Зображення оригінального графіку (14 помічників) - IMG_5159</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative w-full max-w-4xl h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5159-6NPoArol4vMJN7CW78zfAY9TpxMDqG.jpeg"
                alt="Оригінальний графік помічників - IMG_5159"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
