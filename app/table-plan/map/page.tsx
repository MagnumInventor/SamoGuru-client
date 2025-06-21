import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, UserCheck } from "lucide-react"

export default function TablePlanMapPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">План розміщення <strong>столиків</strong></h1>

      {/* 1 Поверх - Основна зала */}
      <Card className="border-blue-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Схема ресторану (1 Поверх) - Основна зала
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків, станцій та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/100s.png"
              alt="Схема ресторану - 1 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 101-110
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Барна стійка</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Кухня</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Піца зона</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Основна станція</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-orange-600" />
                <span><strong>Помічники:</strong> Барна стійка</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Схема столиків 200-ті (2 Поверх)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 201-220 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/200s.png"
              alt="Схема столиків 200s - 2 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 201-220
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium"><strong>Ліфт</strong> для посуду біля бару</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium"><strong>Ліфт</strong> для страв біля 203</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium"><strong>Каса</strong> для розрахунків</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Стаєнка</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-orange-600" />
                <span><strong>Помічники:</strong> Верхній бар</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3 Поверх - 300-ті */}
      <Card className="border-purple-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-500" />
            Схема столиків 300-ті (3 Поверх)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 302-308 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/300s.png"
              alt="Схема столиків 300s - 3 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 302-308
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Дитяча зона</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Ліфт</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Сходи</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Під стрихою</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      

{/* 1 Поверх  (бар - двір) - 400-ті */}
      <Card className="border-purple-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-500" />
            Схема столиків 400-ті (1 поверх - двір)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 302-308 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/400s.png"
              alt="Схема столиків 400s - 1 поверх"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 401-414
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Вхід в ресторан</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-800">Станції персоналу:</span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Бар-двір</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-orange-600" />
                <span><strong>Помічники:</strong> Гриль</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Яруса - 500s */}
      <Card className="border-green-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Схема столиків 500s - Яруса (1 Поверх)
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 501-508 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/500s.png"
              alt="Схема столиків 500s - Яруса"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 501-508
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Стіл для брудного посуду</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Зона Яруса</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Сходи</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Яруса</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-orange-600" />
                <span><strong>Помічники:</strong> Нижній бар</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Пивниця - 600s */}
      <Card className="border-amber-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            Схема столиків 600s - Пивниця
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 601-616 та допоміжних зон</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/600s.png"
              alt="Схема столиків 600s - Пивниця"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 601-616
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Сходи</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Підвальна зона</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Окрема зона</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-amber-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Пивниця</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Світлиця - 617-713 */}
      <Card className="border-teal-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-teal-500" />
            Схема столиків 617-713 - Світлиця
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків в зоні Світлиця</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/700s.png"
              alt="Схема столиків - Світлиця"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 617-626, 701-713
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Велика зала</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Окремі зони</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Світлиця</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-teal-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-teal-600" />
              <span className="font-medium text-teal-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Світлиця</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Гірниця - 627-630, 802-808 */}
      <Card className="border-red-200 mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            Схема столиків - Гірниця
          </CardTitle>
          <CardDescription>Детальна схема розташування столиків 627-630 та 802-808</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              src="/images/scheme/800s.png"
              alt="Схема столиків - Гірниця"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 627-630
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Столики:</span> 802-808
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Гірниця зона</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="font-medium">Окрема зала</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-800">Станції персоналу:</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-green-600" />
                <span><strong>Офіціанти:</strong> Гірниця</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Загальна інформація */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-500" />
            Загальна інформація про станції
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-1">
                <Users className="h-4 w-4" />
                Станції офіціантів
              </h3>
              <ul className="text-sm space-y-1 text-green-700">
                <li>• Основна станція (1 поверх)</li>
                <li>• Стаєнка (2 поверх)</li>
                <li>• Під стрихою (3 поверх)</li>
                <li>• Яруса (500s)</li>
                <li>• Пивниця (600s)</li>
                <li>• Світлиця (617-713)</li>
                <li>• Гірниця (627-630, 802-808)</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-1">
                <UserCheck className="h-4 w-4" />
                Станції помічників
              </h3>
              <ul className="text-sm space-y-1 text-orange-700">
                <li>• Барна стійка (1 поверх)</li>
                <li>• Верхній бар (2 поверх)</li>
                <li>• Нижній бар (Яруса)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}