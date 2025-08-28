"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import {
  Menu,
  Calendar,
  BookOpen,
  Brain,
  MapPin,
  User,
  FileText,
  TrendingUp,
  Newspaper,
  Utensils,
  LogOut,
  Settings,
  Coffee,
  CheckSquare,
  Soup,
  Smile,
} from "lucide-react"
import { useAuthStore } from "@/app/store/authStore"

const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "waiter":
      return "Фіц"
    case "helper":
      return "Малий/мала"
    case "admin":
      return "Адмін"
    case "trainee":
      return "Стажер"
    default:
      return role
  }
}

const allNavItems = [
  { href: "/user-profile", label: "Профіль", icon: Smile, roles: ["waiter", "helper", "admin", "trainee"] },
  
  { href: "/", label: "Головна", icon: User, roles: ["waiter", "helper"] },

  // ПАНЕЛЬ АДМІНІСТРАТОРА
  { href: "/admin", label: "Меню", icon: User, roles: ["admin"] },
  { href: "/pnp", label: "Правила платформи", icon: Newspaper, roles: ["admin"] },
  { href: "/schedule", label: "Графік", icon: Calendar, roles: ["admin"] },
  { href: "/tasks", label: "Виконання плану", icon: CheckSquare, roles: ["admin"] },


  { href: "/tasks", label: "Чек-лист", icon: CheckSquare, roles: ["waiter"] },
  { href: "/tasks", label: "Робота", icon: CheckSquare, roles: ["helper"] },

  { href: "/schedule/waiter", label: "Розклад роботи офіціантів", icon: Calendar, roles: ["waiter"] },
  { href: "/schedule/helper", label: "Розклад роботи помічників", icon: Calendar, roles: ["helper"] },

  { href: "/serving", label: "Сервірування", icon: Coffee, roles: ["helper"] }, 
  { href: "/tablewear", label: "Посуд", icon: Utensils, roles: ["helper"] },

  { href: "/table-plan", label: "План столиків", icon: MapPin, roles: ["helper"] }, 
    { href: "/tests", label: "Тестування", icon: Brain, roles: ["waiter", "helper"] },
    { href: "/menu", label: "Меню", icon: Soup, roles: ["waiter", "helper"] },
  
    { href: "/tutorials", label: "Навчання", icon: BookOpen, roles: ["helper"] },
  { href: "/rules", label: "Правила", icon: FileText, roles: ["waiter"] }, 
  //{ href: "/news", label: "Актуальне", icon: Newspaper, roles: ["admin", "waiter", "helper"] },
  { href: "/my-path", label: "Мій шлях", icon: TrendingUp, roles: ["helper"] },
  
  { href: "/pnp", label: "Формальності", icon: Newspaper, roles: ["helper", "waiter"] },


  // МЕНЮ ДЛЯ СТАЖЕРІВ
  { href: "/my-path/trainee", label: "Стажування", icon: User, roles: ["trainee"] },

  { href: "/rules/trainee", label: "Правила", icon: FileText, roles: ["trainee"] },
  { href: "/tasks/trainee", label: "Завдання", icon: CheckSquare, roles: ["trainee"] },
  { href: "/table-plan/map", label: "План закладу", icon:  BookOpen, roles: ["trainee"] },
  { href: "/serving", label: "Сервірування", icon:  Soup, roles: ["trainee"] },
  { href: "/tablewear", label: "Посуд та ліфт", icon:  BookOpen, roles: ["trainee"] },

    { href: "/tests/trainee", label: "Тестування", icon: Brain, roles: ["trainee"] },

  { href: "/pnp", label: "Формальності", icon: Newspaper, roles: ["trainee"] }, 
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter();
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  // ФІЛЬТРУВАННЯ НАВІГАЦІЇ ЗАЛЕЖНО ВІД РОЛІ
  const navItems = allNavItems.filter((item) => item.roles.includes(user?.role || "helper"))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            <span className="text-gray-900">Само</span>
            <span className="text-orange-500">Гуру</span>
          </div>
        </Link>

        {/* НОУТ */}
        <nav className="hidden lg:flex items-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-sm text-gray-600">
                <div className="font-medium">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-xs">{getRoleDisplayName(user?.role || "")}</div>
              </div>
              {user?.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Адміністрування
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Вийти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* МОБІЛЬНА */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
            
            <div className="px-4 py-2 bg-orange-50 rounded-md mb-4">
              <div className="font-medium text-orange-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-sm text-orange-600">{getRoleDisplayName(user?.role || "")}</div>
            </div>

            {/* СКРОЛ */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-orange-100 text-orange-600"
                          : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}

                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Адміністрування</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Вийти
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
