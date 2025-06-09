import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import FFStatus from "@/components/ff-status"

export default function TablePlanMapPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">План Розміщення Столиків</h1>

      {/* Main Restaurant Map Section */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Схема ресторану (1 Поверх)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/restaurant-scheme.png"
              alt="Схема ресторану - 1 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 1-49
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Барна стійка</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Кухня</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">1 Поверх</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 500s Tables Scheme */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Схема столиків 500s (1 Поверх)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 501-508 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/tables-500s-scheme.png"
              alt="Схема столиків 500s - 1 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 501-508
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Стіл для посуду</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Нижній бар</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">1 Поверх</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <FFStatus />
    </div>
  )
}
