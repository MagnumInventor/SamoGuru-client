"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

const tableData = [
  { id: 1, number: 1, seats: 2, status: "available", section: "Тераса", waiter: "Олена" },
  { id: 2, number: 2, seats: 4, status: "occupied", section: "Тераса", waiter: "Олена", timeOccupied: "19:30" },
  { id: 3, number: 3, seats: 2, status: "reserved", section: "Тераса", waiter: "Олена", reservationTime: "20:00" },
  { id: 4, number: 4, seats: 6, status: "available", section: "Основний зал", waiter: "Максим" },
  { id: 5, number: 5, seats: 4, status: "occupied", section: "Основний зал", waiter: "Максим", timeOccupied: "19:15" },
  { id: 6, number: 6, seats: 4, status: "cleaning", section: "Основний зал", waiter: "Максим" },
  {
    id: 7,
    number: 7,
    seats: 8,
    status: "reserved",
    section: "Основний зал",
    waiter: "Максим",
    reservationTime: "20:30",
  },
  { id: 8, number: 8, seats: 2, status: "available", section: "Основний зал", waiter: "Ірина" },
  { id: 9, number: 9, seats: 4, status: "occupied", section: "VIP зона", waiter: "Ірина", timeOccupied: "18:45" },
  { id: 10, number: 10, seats: 6, status: "available", section: "VIP зона", waiter: "Ірина" },
  {
    id: 11,
    number: 11,
    seats: 4,
    status: "reserved",
    section: "Біля вікна",
    waiter: "Андрій",
    reservationTime: "21:00",
  },
  { id: 12, number: 12, seats: 2, status: "available", section: "Біля вікна", waiter: "Андрій" },
]

const sections = ["Всі", "Тераса", "Основний зал", "VIP зона", "Біля вікна"]

export default function TablePlanPage() {
  const [selectedSection, setSelectedSection] = useState("Всі")
  const [selectedTable, setSelectedTable] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200"
      case "reserved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cleaning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Вільний"
      case "occupied":
        return "Зайнятий"
      case "reserved":
        return "Заброньований"
      case "cleaning":
        return "Прибирання"
      default:
        return "Невідомо"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4" />
      case "occupied":
        return <Users className="h-4 w-4" />
      case "reserved":
        return <Clock className="h-4 w-4" />
      case "cleaning":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filteredTables =
    selectedSection === "Всі" ? tableData : tableData.filter((table) => table.section === selectedSection)

  const stats = {
    total: tableData.length,
    available: tableData.filter((t) => t.status === "available").length,
    occupied: tableData.filter((t) => t.status === "occupied").length,
    reserved: tableData.filter((t) => t.status === "reserved").length,
    cleaning: tableData.filter((t) => t.status === "cleaning").length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">План ресторану</h1>
        <p className="text-gray-600">Інтерактивний план розташування столиків та їх статус</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Всього столиків</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-sm text-gray-600">Вільні</div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.occupied}</div>
            <div className="text-sm text-gray-600">Зайняті</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.reserved}</div>
            <div className="text-sm text-gray-600">Заброньовані</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.cleaning}</div>
            <div className="text-sm text-gray-600">Прибирання</div>
          </CardContent>
        </Card>
      </div>

      {/* Section Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((section) => (
          <Button
            key={section}
            variant={selectedSection === section ? "default" : "outline"}
            onClick={() => setSelectedSection(section)}
            className={
              selectedSection === section
                ? "bg-orange-500 hover:bg-orange-600"
                : "border-orange-200 text-orange-600 hover:bg-orange-50"
            }
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {filteredTables.map((table) => (
          <Card
            key={table.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${getStatusColor(table.status)} ${
              selectedTable?.id === table.id ? "ring-2 ring-orange-500" : ""
            }`}
            onClick={() => setSelectedTable(table)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Столик {table.number}</CardTitle>
                <Badge className={`${getStatusColor(table.status)} flex items-center gap-1`}>
                  {getStatusIcon(table.status)}
                  {getStatusText(table.status)}
                </Badge>
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {table.section}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Місць:</span>
                  <span className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {table.seats}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Офіціант:</span>
                  <span className="font-medium">{table.waiter}</span>
                </div>
                {table.timeOccupied && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Зайнятий з:</span>
                    <span className="font-medium">{table.timeOccupied}</span>
                  </div>
                )}
                {table.reservationTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Бронь на:</span>
                    <span className="font-medium">{table.reservationTime}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Table Details */}
      {selectedTable && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 text-orange-500 mr-2" />
              Деталі столика {selectedTable.number}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Статус:</span>
                  <Badge className={getStatusColor(selectedTable.status)}>{getStatusText(selectedTable.status)}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Секція:</span>
                  <span className="font-medium">{selectedTable.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Кількість місць:</span>
                  <span className="font-medium">{selectedTable.seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Відповідальний офіціант:</span>
                  <span className="font-medium">{selectedTable.waiter}</span>
                </div>
              </div>
              <div className="space-y-3">
                {selectedTable.timeOccupied && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Час зайняття:</span>
                    <span className="font-medium">{selectedTable.timeOccupied}</span>
                  </div>
                )}
                {selectedTable.reservationTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Час бронювання:</span>
                    <span className="font-medium">{selectedTable.reservationTime}</span>
                  </div>
                )}
                <div className="pt-4">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={selectedTable.status === "occupied"}
                  >
                    {selectedTable.status === "available"
                      ? "Зайняти столик"
                      : selectedTable.status === "reserved"
                        ? "Підтвердити бронь"
                        : selectedTable.status === "cleaning"
                          ? "Завершити прибирання"
                          : "Столик зайнятий"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
