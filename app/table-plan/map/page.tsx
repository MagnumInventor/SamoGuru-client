"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Define restaurant zones
const restaurantZones = [
  { id: "100", name: "Перший поверх", description: "Основний зал, 100-199", position: { top: "45%", left: "50%" } },
  { id: "200", name: "Другий поверх", description: "VIP зона, 200-299", position: { top: "35%", left: "50%" } },
  { id: "300", name: "Третій поверх", description: "Тераса, 300-399", position: { top: "25%", left: "50%" } },
  { id: "400", name: "Вхідна зона (права)", description: "Біля входу, 400-499", position: { top: "55%", left: "65%" } },
  {
    id: "500",
    name: "Вхідна зона (ліва)",
    description: "Навпроти входу, 500-599",
    position: { top: "55%", left: "35%" },
  },
  {
    id: "600",
    name: "Нижня ліва частина парку",
    description: "Зона відпочинку, 600-699",
    position: { top: "75%", left: "25%" },
  },
  { id: "700", name: "Ліва частина", description: "Літня тераса, 700-799", position: { top: "50%", left: "20%" } },
  {
    id: "800",
    name: "Верхня ліва частина",
    description: "Панорамна зона, 800-899",
    position: { top: "25%", left: "25%" },
  },
]

export default function RestaurantMapPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Карта ресторану</h1>
        <p className="text-gray-600">Інтерактивна карта з розташуванням зон та столиків</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <Link href="/table-plan">Список столиків</Link>
        </Button>
        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
          <Link href="/table-plan/map">Карта ресторану</Link>
        </Button>
      </div>

      {/* Interactive Map */}
      <Card className="border-orange-200 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 text-orange-500 mr-2" />
            Карта ресторану
          </CardTitle>
          <CardDescription>Натисніть на зону для перегляду деталей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5205-sI8jJHeWy4Pvd8x0SbUsRhXv9SErJf.jpeg"
              alt="Карта ресторану"
              fill
              style={{ objectFit: "contain" }}
            />

            {/* Interactive Zone Markers */}
            {restaurantZones.map((zone) => (
              <div
                key={zone.id}
                className="absolute z-10 cursor-pointer"
                style={{
                  top: zone.position.top,
                  left: zone.position.left,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedZone(zone.id)}
                onMouseEnter={() => setShowTooltip(zone.id)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${selectedZone === zone.id ? "bg-orange-500" : "bg-orange-400"} hover:bg-orange-500 transition-colors`}
                >
                  {zone.id.substring(0, 1)}xx
                </div>

                {/* Tooltip */}
                {showTooltip === zone.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-lg z-20 w-48">
                    <p className="font-bold text-sm">{zone.name}</p>
                    <p className="text-xs text-gray-600">{zone.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Zone Details */}
      {selectedZone && (
        <Card className="border-orange-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 text-orange-500 mr-2" />
              Зона {selectedZone}
            </CardTitle>
            <CardDescription>{restaurantZones.find((zone) => zone.id === selectedZone)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <Info className="h-12 w-12 text-orange-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Схема столиків буде доступна незабаром</h3>
              <p className="text-gray-600 mb-4">
                Детальна схема розташування столиків у цій зоні буде додана після завантаження фотографій.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600">Переглянути столики в цій зоні</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone List */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 text-orange-500 mr-2" />
            Список зон
          </CardTitle>
          <CardDescription>Всі зони ресторану</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurantZones.map((zone) => (
              <Button
                key={zone.id}
                variant="outline"
                className={`h-auto py-4 px-4 flex flex-col items-center justify-center text-left border-orange-200 ${selectedZone === zone.id ? "bg-orange-50 border-orange-500" : ""}`}
                onClick={() => setSelectedZone(zone.id)}
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mb-2">
                  {zone.id.substring(0, 1)}
                </div>
                <span className="font-medium">{zone.name}</span>
                <span className="text-xs text-gray-600 mt-1">{zone.id}-серія</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FF Notice */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="text-sm text-yellow-800">
          <strong>FF:</strong> Наразі це не функціонує через відсутність фінансування та серверу, якщо ви справді
          зацікавлені у запуску цієї функції, зверніться до розробника (+380960427745)
        </div>
      </div>
    </div>
  )
}
