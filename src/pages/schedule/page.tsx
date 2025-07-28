import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, Upload, Download, Users, FileSpreadsheet, AlertCircle } from "lucide-react"
import * as XLSX from 'xlsx'

type ScheduleData = {
  [employee: string]: {
    [day: string]: string
  }
}

export default function SimpleSchedulePage() {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({})
  const [currentMonth, setCurrentMonth] = useState("Серпень")
  const [currentYear, setCurrentYear] = useState(2025)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  // Завантаження Excel файлу
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError("")

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      
      // Конвертуємо в JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
      
      if (jsonData.length < 2) {
        throw new Error("Файл має містити заголовки та дані")
      }

      // Перший рядок - заголовки (дні)
      const days = jsonData[0].slice(1) // Пропускаємо першу колонку (імена)
      
      // Конвертуємо дані в потрібний формат
      const newScheduleData: ScheduleData = {}
      
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i]
        const employeeName = row[0]
        
        if (employeeName) {
          newScheduleData[employeeName] = {}
          
          days.forEach((day: any, index: number) => {
            const value = row[index + 1] || "0"
            newScheduleData[employeeName][day.toString()] = value.toString()
          })
        }
      }

      setScheduleData(newScheduleData)
    } catch (err) {
      setError(`Помилка завантаження файлу: ${err instanceof Error ? err.message : 'Невідома помилка'}`)
    } finally {
      setLoading(false)
    }
  }

  // Експорт в Excel
  const handleExport = () => {
    if (Object.keys(scheduleData).length === 0) {
      setError("Немає даних для експорту")
      return
    }

    try {
      const employees = Object.keys(scheduleData)
      const days = Object.keys(scheduleData[employees[0]] || {}).sort((a, b) => parseInt(a) - parseInt(b))
      
      // Створюємо дані для експорту
      const exportData = [
        ['Співробітник', ...days], // Заголовки
        ...employees.map(employee => [
          employee,
          ...days.map(day => scheduleData[employee][day] || "0")
        ])
      ]

      const ws = XLSX.utils.aoa_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Графік")
      
      XLSX.writeFile(wb, `schedule-${currentMonth}-${currentYear}.xlsx`)
    } catch (err) {
      setError("Помилка експорту файлу")
    }
  }

  // Отримуємо день тижня
  const getDayOfWeek = (day: number) => {
    const daysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"]
    const startDay = 1 // Понеділок для липня 2025
    return daysOfWeek[(startDay + day - 1) % 7]
  }

  // Кольори для змін
  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "1": return "bg-blue-100 text-blue-800 border-blue-200"
      case "16": return "bg-green-100 text-green-800 border-green-200"
      case "0": return "bg-gray-100 text-gray-400 border-gray-200"
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getShiftText = (shift: string) => {
    switch (shift) {
      case "1": return "Д" // День
      case "16": return "В" // Вечір
      case "0": return "-" // Вихідний
      default: return shift.substring(0, 2) // Перші 2 символи
    }
  }

  const employees = Object.keys(scheduleData)
  const days = employees.length > 0 ? 
    Object.keys(scheduleData[employees[0]] || {}).sort((a, b) => parseInt(a) - parseInt(b)) : 
    []

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Графік роботи</h1>
        <p className="text-gray-600">{currentMonth} {currentYear}</p>
      </div>

      {/* Керування файлами */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Upload className="h-5 w-5 text-blue-500 mr-2" />
              Завантажити Excel
            </CardTitle>
            <CardDescription>Імпорт графіку з Excel файлу</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={loading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer inline-flex items-center justify-center w-full px-4 py-2 border border-blue-200 rounded-md text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                {loading ? 'Завантаження...' : 'Вибрати файл'}
              </label>
              <p className="text-xs text-gray-500">
                Підтримуються формати: .xlsx, .xls
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Download className="h-5 w-5 text-green-500 mr-2" />
              Експорт
            </CardTitle>
            <CardDescription>Зберегти графік в Excel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleExport}
              disabled={employees.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Завантажити Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 text-orange-500 mr-2" />
              Статистика
            </CardTitle>
            <CardDescription>Інформація про графік</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p>Співробітників: <span className="font-medium">{employees.length}</span></p>
              <p>Днів: <span className="font-medium">{days.length}</span></p>
              <p>Статус: <span className={employees.length > 0 ? "text-green-600 font-medium" : "text-gray-500"}>
                {employees.length > 0 ? "Завантажено" : "Немає даних"}
              </span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Помилки */}
      {error && (
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Легенда */}
      {employees.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800">
              Д
            </div>
            <span className="text-sm text-gray-600">Денна зміна</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-xs font-medium text-green-800">
              В
            </div>
            <span className="text-sm text-gray-600">Вечірня зміна</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-400">
              -
            </div>
            <span className="text-sm text-gray-600">Вихідний</span>
          </div>
        </div>
      )}

      {/* Таблиця графіку */}
      {employees.length > 0 ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-orange-500 mr-2" />
              {currentMonth} {currentYear} - {employees.length} співробітників
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 bg-gray-50 border border-gray-200 px-4 py-2 text-left font-medium text-gray-900 min-w-[150px]">
                      Співробітник
                    </th>
                    {days.map((day) => (
                      <th key={day} className="border border-gray-200 px-2 py-2 text-center min-w-[40px]">
                        <div className="text-xs font-medium text-gray-900">{day}</div>
                        <div className="text-xs text-gray-500">{getDayOfWeek(parseInt(day))}</div>
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
                          <span className="truncate max-w-[120px]" title={employee}>{employee}</span>
                        </div>
                      </td>
                      {days.map((day) => {
                        const shift = scheduleData[employee][day] || "0"
                        return (
                          <td
                            key={day}
                            className="border border-gray-200 p-1 text-center"
                          >
                            <div
                              className={`w-6 h-6 mx-auto rounded flex items-center justify-center text-xs font-medium ${getShiftColor(shift)}`}
                              title={`${employee} - ${day} ${currentMonth}: ${shift === "1" ? "Денна зміна" : shift === "16" ? "Вечірня зміна" : shift === "0" ? "Вихідний" : shift}`}
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
      ) : (
        // Заглушка коли немає даних
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileSpreadsheet className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Немає даних графіку</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              Завантажте Excel файл з графіком роботи, щоб переглянути розклад співробітників
            </p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
            >
              <Upload className="h-4 w-4 mr-2" />
              Завантажити файл
            </label>
          </CardContent>
        </Card>
      )}

      {/* Інструкції */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Як використовувати</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <div className="space-y-2 text-sm">
            <p><strong>1. Формат Excel файлу:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Перший рядок: заголовки (Співробітник, 1, 2, 3... до кінця місяця)</li>
              <li>Перша колонка: імена співробітників</li>
              <li>Значення: "1" (день), "16" (вечір), "0" (вихідний)</li>
            </ul>
            <p><strong>2. Приклад структури:</strong></p>
            <div className="bg-white p-2 rounded font-mono text-xs">
              Співробітник | 1 | 2 | 3 | ...<br/>
              Ігор | 1 | 0 | 16 | ...<br/>
              Олексій | 0 | 1 | 1 | ...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}