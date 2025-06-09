"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Server } from "lucide-react"

export function FFStatus() {
  const features = [
    { name: "Автентифікація (базова)", status: "ready", type: "client" },
    { name: "Навігація", status: "ready", type: "client" },
    { name: "Меню ресторану", status: "ready", type: "client" },
    { name: "Розклад роботи", status: "ready", type: "client" },
    { name: "План столиків", status: "ready", type: "client" },
    { name: "Тестування знань", status: "ready", type: "client" },
    { name: "Реєстрація користувачів", status: "ff", type: "server" },
    { name: "API для розкладу", status: "ff", type: "server" },
    { name: "Завантаження відео", status: "ff", type: "server" },
    { name: "CMS для новин", status: "ff", type: "server" },
    { name: "База даних", status: "ff", type: "server" },
    { name: "Адмін панель (повна)", status: "ff", type: "server" },
  ]

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 text-orange-500 mr-2" />
          Статус функцій платформи
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-3 text-green-700">✅ Готові (Client-side)</h4>
            <div className="space-y-2">
              {features
                .filter((f) => f.status === "ready")
                .map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{feature.name}</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Готово
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-orange-700">🔄 FF (For Future - Server)</h4>
            <div className="space-y-2">
              {features
                .filter((f) => f.status === "ff")
                .map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{feature.name}</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      <Clock className="h-3 w-3 mr-1" />
                      FF
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="text-xs text-gray-600">
            <strong>FF</strong> = For Future - функції, які потребують серверної частини та будуть реалізовані після
            налаштування backend
          </div>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="text-sm text-yellow-800">
            <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
            зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
