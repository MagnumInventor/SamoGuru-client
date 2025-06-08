"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, RefreshCw, CalendarIcon } from "lucide-react"

const scheduleData = [
  { day: "Понеділок", date: "15.01", shift: "Ранкова", time: "08:00-16:00", status: "confirmed" },
  { day: "Вівторок", date: "16.01", shift: "Денна", time: "12:00-20:00", status: "confirmed" },
  { day: "Середа", date: "17.01", shift: "Вечірня", time: "16:00-00:00", status: "pending" },
  { day: "Четвер", date: "18.01", shift: "Ранкова", time: "08:00-16:00", status: "confirmed" },
  { day: "П'ятниця", date: "19.01", shift: "Денна", time: "12:00-20:00", status: "confirmed" },
  { day: "Субота", date: "20.01", shift: "Вечірня", time: "16:00-00:00", status: "requested-off" },
  { day: "Неділя", date: "21.01", shift: "Вихідний", time: "-", status: "off" },
]

export default function SchedulePage() {
  const [selectedShift, setSelectedShift] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "requested-off":
        return "bg-blue-100 text-blue-800"
      case "off":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Підтверджено"
      case "pending":
        return "Очікує"
      case "requested-off":
        return "Запит на вихідний"
      case "off":
        return "Вихідний"
      default:
        return "Невідомо"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Розклад роботи</h1>
        <p className="text-gray-600">Управляйте своїм робочим розкладом та запитами на зміни</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <RefreshCw className="h-5 w-5 text-orange-500 mr-2" />
              Заміна зміни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Запросити заміну</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Запит на заміну зміни</DialogTitle>
                  <DialogDescription>Оберіть зміну, яку хочете замінити, та вкажіть причину</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть зміну" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wed">Середа 17.01 - Вечірня</SelectItem>
                      <SelectItem value="fri">П'ятниця 19.01 - Денна</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Причина заміни..." />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Відправити запит</Button>
                </div>
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                  Запросити вихідний
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Запит на вихідний день</DialogTitle>
                  <DialogDescription>Оберіть дату та вкажіть причину</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть дату" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sat">Субота 20.01</SelectItem>
                      <SelectItem value="sun">Неділя 21.01</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Причина запиту..." />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Відправити запит</Button>
                </div>
              </DialogContent>
            </Dialog>
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

      {/* Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 text-orange-500 mr-2" />
            Тижневий розклад
          </CardTitle>
          <CardDescription>15 - 21 січня 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">День</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Дата</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Зміна</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Час</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Дії</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{item.day}</td>
                    <td className="py-4 px-4">{item.date}</td>
                    <td className="py-4 px-4">{item.shift}</td>
                    <td className="py-4 px-4 flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {item.time}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      {item.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                          onClick={() => setSelectedShift(item)}
                        >
                          Змінити
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
