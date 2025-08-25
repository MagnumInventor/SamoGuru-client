"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ShieldAlert, FileText, Mail, Phone } from "lucide-react"

export default function LegalDocumentsPage() {
  const [activeTab, setActiveTab] = useState("privacy")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Юридичні документи</h1>
        <p className="text-gray-600">Офіційні документи платформи САМоГуру</p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="privacy" className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Політика конфіденційності
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Умови використання
          </TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <Card className="mb-6 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ShieldAlert className="h-5 w-5 text-blue-500 mr-2" />
                ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ
              </CardTitle>
              <div className="text-sm text-gray-600">
                <strong>Дата останнього оновлення:</strong> 22 червня 2025 року
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Веб-додаток "САМоГуру" (далі - "Платформа", "я - Маркович Олександр Юрійович") зобов'язується захищати конфіденційність персональних даних 
                  користувачів платформи САМоГуру. Наступна інформація описує, 
                  як я збираю, використовую та захищаю вашу інформацію.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">2. ЗБІР ПЕРСОНАЛЬНИХ ДАНИХ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  <strong>Майбутні версії:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Персональна сторінка працівника (ПІБ, номер телефону, персональне фото, решта інформації)</li>
                  <li>Управління змінами робочого розкладу</li>
                  <li>Статистика навчання, тестування та <strong>роботи</strong></li>
                  <li>Інтерактивна панель користувача</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">3. ВИКОРИСТАННЯ ДАНИХ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Станом на 22.06 платформа <strong>НЕ використовує дані користувача</strong>, 
                  через відсутність серверної частини Платформи.
                </p>
                <p className="text-gray-700">
                  Від 23.06 платформа <strong>використовує фотографії з сайту меню</strong>, з сайту Самогонної ресторації у розділі Ковчег, без прав власнотсі над медіа матеріалами (використання фото у форматі URL).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">4. ЗБЕРІГАННЯ ДАНИХ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>*Обмежені дані з пристроїв користувачів зберігаються на серверах Vercel (що відповідають GDPR)</li>
                  <li>Дані шифруються під час передачі (передачі 3-тім особам не піддаються) та зберігання</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">5. ПЕРЕДАЧА ДАНИХ ТРЕТІМ ОСОБАМ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Я не продаю, не передаю та не розголошую персональні дані третім особам, 
                  окрім випадків, передбачених законодавством України.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">6. ПРАВА КОРИСТУВАЧІВ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Відповідно до Закону України "Про захист персональних даних", ви маєте право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Отримувати інформацію про обробку ваших даних</li>
                  <li>Вимагати виправлення неточних даних</li>
                  <li>Вимагати видалення ваших даних</li>
                  <li>Обмежувати обробку даних</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Mail className="h-5 w-5 text-blue-500 mr-2" />
                  7. КОНТАКТНА ІНФОРМАЦІЯ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  З питань конфіденційності звертайтесь: 
                  <a href="mailto:markoleks08@gmail.com" className="text-blue-600 ml-2 hover:underline">
                    markoleks08@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Terms of Use */}
        <TabsContent value="terms">
          <Card className="mb-6 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                УМОВИ ВИКОРИСТАННЯ
              </CardTitle>
              <div className="text-sm text-gray-600">
                <strong>Дата останнього оновлення:</strong> 22 червня 2025 року
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">1. ПРЕДМЕТ ДОГОВОРУ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ці Умови використання регулюють відносини між власником (розробником) "САМоГуру" та користувачами платформи 
                  САМоГуру - моделі внутрішньо-ресторанного онлайн середовища.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">2. ФУНКЦІОНАЛЬНІСТЬ ПЛАТФОРМИ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-2">Поточна версія:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Авторизація за ролями (Адміністратор, Офіціант, Помічник)</li>
                    <li>Базовий інтерфейс управління</li>
                  </ul>
                </div>

                <div>
                  <p className="text-gray-700 font-medium mb-2">Заплановані функції:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Управління розкладом співробітників</li>
                    <li>Облік робочого часу</li>
                    <li>Система завдань та повідомлень</li>
                    <li>Звіти про продуктивність</li>
                    <li>Інтеграція з касовими системами</li>
                    <li>Мобільний додаток для співробітників</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">3. ПРАВА ТА ОБОВ'ЯЗКИ КОРИСТУВАЧІВ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-2">Користувач має право:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Використовувати платформу згідно з наданою роллю</li>
                    <li>Отримувати технічну підтримку</li>
                    <li>Вимагати конфіденційності своїх даних</li>
                  </ul>
                </div>

                <div>
                  <p className="text-gray-700 font-medium mb-2">Користувач зобов'язується:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Не передавати універсальні дані доступу до інтерфейсу працівників третім особам</li>
                    <li>Використовувати платформу лише в робочих цілях</li>
                    <li>Повідомляти про виявлені помилки або порушення безпеки розробнику</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">4. ОБМЕЖЕННЯ ВІДПОВІДАЛЬНОСТІ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  Платформа не несе відповідальності за:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Тимчасову недоступність сервісу через технічні роботи</li>
                  <li>Втрату даних через дії третіх осіб</li>
                  <li>Збитки, пов'язані з неправильним використанням платформи</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">5. ІНТЕЛЕКТУАЛЬНА ВЛАСНІСТЬ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  Всі права на платформу САМоГуру належать Марковичу Олександру Юрійовичу. 
                  Користувач не має права:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Копіювати, модифікувати або поширювати програмний код</li>
                  <li>Створювати похідні продукти</li>
                  <li>Використовувати торгову марку без дозволу</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">6. ЗАСТОСОВНЕ ПРАВО</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ці умови регулюються законодавством України. Всі спори розглядаються в судах 
                  України.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">7. ЗМІНИ УМОВ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Платформа залишає за собою право змінювати ці умови з повідомленням користувачів 
                  за 14 днів до набрання чинності змін.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-2" />
                  8. КОНТАКТНА ІНФОРМАЦІЯ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <p className="text-gray-700 font-medium">Сайт "САМоГУРу"</p>
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-gray-600 mr-2" />
                  <a href="mailto:markoleks08@gmail.com" className="text-green-600 hover:underline">
                    markoleks08@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-600 mr-2" />
                  <a href="tel:+380960427745" className="text-green-600 hover:underline">
                    +380 96 042 7745
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-700 italic">
            *Використовуючи платформу САМоГуру, ви погоджуєтесь з цими умовами та політикою конфіденційності.*
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
