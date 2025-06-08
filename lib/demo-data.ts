// FF: This will be replaced with real API calls when backend is implemented

export const demoScheduleData = {
  employees: [
    "Максим Скак.",
    "Аня Лемик",
    "Влад Ярем.",
    "Ахмед",
    "Саша Маркович",
    "Таня",
    "Єва Комбуль",
    "Маркіян Кравч.",
    "Влад Пек.",
    "Саша Гладка",
    "Матвій Гард.",
    "Настя Пушкар",
    "Зоряна Грубяк",
    "Ярослав Борода",
  ],
  generateSchedule: () => {
    const scheduleData: { [key: string]: { [key: number]: string | null } } = {}

    demoScheduleData.employees.forEach((employee) => {
      scheduleData[employee] = {}
      for (let day = 1; day <= 31; day++) {
        const random = Math.random()
        if (random < 0.3) {
          scheduleData[employee][day] = null // day off
        } else if (random < 0.7) {
          scheduleData[employee][day] = "1" // day shift
        } else {
          scheduleData[employee][day] = "16" // night shift
        }
      }
    })

    return scheduleData
  },
}

export const demoTableData = [
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

export const demoTestQuestions = [
  {
    id: 1,
    question: "Які основні інгредієнти входять до складу м'ясної дошки?",
    options: [
      "Ковбаса купати, курча тапака, ковбаса з баранини, баварська ковбаса",
      "Тільки свинний стейк та курча тапака",
      "Ковбаса купати, телятина, картопля, хліб",
      "Курча тапака, свинина, баранина, сир",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "Скільки часу готуються виноградні равлики?",
    options: ["5-10 хв", "10-15 хв", "15-20 хв", "20-25 хв"],
    correct: 1,
  },
  {
    id: 3,
    question: "Який основний сир використовується в хінкалі з сиром?",
    options: ["Тільки моцарелла", "Тільки бринза", "Бринза, моцарела та кисломолочний сир", "Пармезан та горгонзола"],
    correct: 2,
  },
  {
    id: 4,
    question: "Яка вага порції хінкалі зі свининою та телятиною?",
    options: ["50 гр", "70 гр", "90 гр", "120 гр"],
    correct: 1,
  },
  {
    id: 5,
    question: "Які алергени містить салат 'Грузинський з лісовим фундуком'?",
    options: ["Тільки фундук", "Цибуля синя, кінза, фундук", "Тільки кінза", "Горіхи та молочні продукти"],
    correct: 1,
  },
]

// FF: News and announcements will come from CMS/API
export const demoNewsData = [
  {
    id: 1,
    title: "Новий співробітник у команді",
    description: "Вітаємо Марію Іваненко, яка приєдналася до нашої команди як офіціант",
    category: "team",
    date: "22.01.2024",
    author: "HR відділ",
    priority: "medium",
  },
  {
    id: 2,
    title: "Оновлення літнього меню",
    description: "З 1 лютого запускаємо нове літнє меню з 15 новими стравами та 8 коктейлями",
    category: "menu",
    date: "20.01.2024",
    author: "Шеф-кухар",
    priority: "high",
  },
]
