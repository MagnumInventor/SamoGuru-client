"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Star, Trophy, BookOpen, Users, Target, Utensils, Map, ArrowRight, Link } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@radix-ui/react-checkbox"

export default function AssistantGuidePage() {
  const [activeTab, setActiveTab] = useState("guide")

  // Основні навички для стажера
  const coreSkills = [
    {
      title: "Сервірування страв/напоїв",
      steps: [
        "Розкладка базових приборів (ножа, виделки, ложки)",
        "Розміщення сервірувальних наборів за типами напоїв",
        "Контроль чистоти столових приборів"
      ]
    },
    {
      title: "Робота з ліфтом",
      steps: [
        "Безпечне завантаження посуду",
        "Координація між поверхами",
        "Екстрені процедури при застряганні"
      ]
    },
    {
      title: "Комунікація",
      steps: [
        "Стандартні фрази привітання гостей",
        "Передача інформації офіціантам",
        "Обробка базових запитів гостей (навігація, меню, туалет)"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Путівник стажера-помічника</h1>
        <p className="text-gray-600">Основні навички та алгоритми дій для успішного початку роботи</p>
      </div>

      {/* Навігаційні таби */}
      <div className="flex border-b mb-6">
        <Button
          variant="ghost"
          className={`rounded-none ${activeTab === "guide" ? "border-b-2 border-orange-500" : ""}`}
          onClick={() => setActiveTab("guide")}
        >
          Основний путівник
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none ${activeTab === "tips" ? "border-b-2 border-orange-500" : ""}`}
          onClick={() => setActiveTab("tips")}
        >
          Поради та лайфхаки
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none ${activeTab === "info" ? "border-b-2 border-orange-500" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Загальна інформація
        </Button>
      </div>

      {activeTab === "guide" && (
        <div className="space-y-6">
          {/* Блок з основними навичками */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="h-5 w-5 mr-2" />
                Основні навички помічника
              </CardTitle>
              <CardDescription>Критично важливі дії, які необхідно освоїти в першу чергу</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {coreSkills.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{skill.title}</h3>
                  <ul className="space-y-2">
                    {skill.steps.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-orange-500" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Карта ресторану */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2" />
                Карта залу та зон відповідальності
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="/app/table-plan/map"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2"
              >
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500 hover:shadow-lg hover:ring-2 hover:ring-orange-400 transition cursor-pointer">
                  <iframe
                    src="table-plan/map"
                    title="Інтерактивна карта ресторану"
                    className="w-full h-full rounded-lg border-0"
                  />
                </div>
              </a>
              <div className="mt-4 text-sm text-gray-600">
                <p>Детальніше у розділі "План закладу"</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "tips" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Поради від колег
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p>"Завжди тримайте в під рукою чек до замовлення - це рятує в пікові години"</p>
                <p className="text-sm text-gray-600 mt-1">- Порада від офіціантів</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p>"Уважно читайте чек та коментарі до них перед сервіруванням та віднесенням замовлення"</p>
                <p className="text-sm text-gray-600 mt-1">- Порада від адміністратора</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p>"Перш ніж заносити замовлення, уявіть собі весь маршрут - та врахуйте що можна зробити по дорозі"</p>
                <p className="text-sm text-gray-600 mt-1">- ???, старший офіціант</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p>"Завжди перевіряйте чистоту посуду та підносу перед передачею замовлення"</p>
                <p className="text-sm text-gray-600 mt-1">- Загальне правило</p>
              </div>
            </CardContent>
          </Card>

          {/* Взаємодія */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Повідомлення розробнику
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                id="dev-message"
                className="w-full h-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Записуйте тут свої поради, уточнення, найдені помилки на сайті..."
                onChange={e => window.localStorage.setItem("devMessageDraft", e.target.value)}
                defaultValue={typeof window !== "undefined" ? window.localStorage.getItem("devMessageDraft") || "" : ""}
              />
              <Button
                className="mt-3 bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  const textarea = document.getElementById("dev-message") as HTMLTextAreaElement | null
                  const text = textarea?.value || ""
                  window.localStorage.setItem("devMessageDraft", text)
                  const mailto = `mailto:markoleks08@gmail.com?subject=Порада/помилка%20від%20стажера&body=${encodeURIComponent(text)}`
                  window.location.href = mailto
                }}
              >
                Надіслати
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "info" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Загальна інформація</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Графік роботи</h3>
                  <p>Стажер працює з 10:00 до 18:00</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Тривалість стажування</h3>
                  <p>Стажування на кожній з 4 станцій по 1 повній зміні, вихід на ставку визначає адміністратор залежно від успішності стажування та результатів</p><Link href="/app/tests/trainee">тестування</Link>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Контактні особи</h3>
                  <p>Адміністратор: (тел. 067-327-9853)</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Важливі процедури</h3>
                  <p>Звітність одягу здається щодня до 17:45</p>
                  <p>Форма одягу: чорний низ, фірмова біла/кофейна сорочка, закрите взуття, охайний зовнішій вигляд</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Часті запитання</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Що робити, якщо розбили посуд з напоєм/стравою?</h3>
                <p className="text-gray-600">Повідомити про інцедент посудомийницям на мийці біля станції Гриль, якщо цього не достатньо повідомити адміністраторам</p>
              </div>
              <div>
                <h3 className="font-medium">Як поміняти воду у кулері?</h3>
                <p className="text-gray-600">Виконувати у наступній послідовністі: 1 - Зняти стару/пусту баклашку та віднести на стелажі біля курилки, 2 - Взяти повну баклашку ОБЕРЕЖНО ВАЖЧЕ, та віднести до кулера, 3 - Відкрити/проколоти пломбу, 4 - ШВИДКО Перевернути та вставити голко баклашки в кулер, ПОРАДА: Варто звернутися до колег, щоби не розлити багато води</p>
              </div>
              <div>
                <h3 className="font-medium">Що робити якщо погане самопочуття?</h3>
                <p className="text-gray-600">ВАЖЛИВО зразу повідомити про це адміністратору та колегам по станції, аптечка на 3 поверсі в кабінеті</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Прогрес бар 
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Ваш прогрес
            </CardTitle>
            <CardDescription>Загальний прогрес адаптації</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between">
              <span>Завершено 65% тренувальної програми</span>
              <span>3 з 5 днів</span>
            </div>
            <Progress value={65} className="h-3" />
          </CardContent>
        </Card>
      </div>*/}
    </div>
  )
}