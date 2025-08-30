"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Clock, Server, ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FFPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Server className="h-10 w-10 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Функція в розробці</h1>
          <p className="text-gray-600">Ця функція буде доступна після впровадження фінансування та серверної частини платформи</p>
        </div>

        {/* Main Card */}
        <Card className="border-orange-200 mb-8">
          <CardHeader className="text-center">
            <Badge className="bg-orange-100 text-orange-800 w-fit mx-auto mb-4">
              <Clock className="h-4 w-4 mr-2" />
              FF - For Future
            </Badge>
            <CardTitle className="text-xl">Наразі це не функціонує</CardTitle>
            <CardDescription>Через причини вище ця функція тимчасово недоступна</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Що це означає?</h3>
              <p className="text-sm text-yellow-700">
                FF (For Future) - це позначення функцій, які потребують серверної частини для повноцінної роботи. Наразі
                платформа працює в демонстраційному-статичному режимі без підключення до бази даних та серверних API.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Що буде доступно після впровадження?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Персональний акаунт та збереження даних</li>
                <li>• синхронізоване виконання завданнь</li>
                <li>• Взаємодія між працівниками (заміни, повідомлення, похвали)</li>
                <li>• Динамічні сповіщення</li>
                <li>• Детальна аналітика та статистика</li>
                <li>• Керування штатом та меню (через панель Менеджера/шефа)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">Зацікавлені у запуску?</h3>
              <p className="text-sm text-green-700 mb-4">
                Якщо ви справді зацікавлені у запуску цих функцій та готові підтримати розвиток платформи,
                зверніться до розробника:
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Телефон</p>
                    <p className="text-sm text-green-700">+380960427745</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Instagram</p>
                    <p className="text-sm text-green-700">@_marsa__08</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Email</p>
                    <p className="text-sm text-green-700">ujobua@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Повернутися на головну
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500">
          <p>СамоГуру - Платформа для персоналу ресторану "Ковчег"</p>
          <p>Версія: Alpha 1.17.2</p>
        </div>
      </div>
    </div>
  )
}
