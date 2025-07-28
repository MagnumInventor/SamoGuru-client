"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Server, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function FFStatus() {
  const features = [
    { name: "Автентифікація (базова)", status: "ready", type: "client" },
    { name: "Навігація", status: "ready", type: "client" },
    { name: "Меню ресторану", status: "ready", type: "client" },
    { name: "Розклад роботи", status: "ready", type: "client" },
    { name: "План столиків", status: "ready", type: "client" },
    { name: "Список завданнь", status: "ready", type: "client" },
    { name: "Тестування знань", status: "ready", type: "client" },

    { name: "Реєстрація користувачів", status: "working", type: "server" },


    { name: "API для розкладу", status: "ff", type: "server" },
    { name: "Завантаження відео", status: "ff", type: "server" },
    { name: "CMS для новин", status: "ff", type: "server" },
    { name: "База даних", status: "ff", type: "server" },
    { name: "Адмін панель (повна)", status: "ff", type: "server" },
  ]

  return (
    <Card className="border-red-300 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center text-red-800">
          <Server className="h-5 w-5 text-red-600 mr-2" />
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
            <h4 className="font-medium mb-3 text-orange-700">Розробляється (Client-side)</h4>
            <div className="space-y-2">
              {features
                .filter((f) => f.status === "working")
                .map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{feature.name}</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Готово
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-red-700">🔄 FF (For Future - Server)</h4>
            <div className="space-y-2">
              {features
                .filter((f) => f.status === "ff")
                .map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{feature.name}</span>
                    <Badge className="bg-red-100 text-red-800">
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
        <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-md">
          <div className="text-sm text-red-800 mb-3">
            <strong>⚠️ УВАГА:</strong> Більшість функцій наразі не працюють через відсутність фінансування та часу на розробку
          </div>
          <Link href="/ff">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              Дізнатися більше про FF функції
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
