export interface User {
  _id?: string
  firstName: string
  lastName: string
  phone: string
  email: string
  role: "waiter" | "helper" | "trainee" | "admin"
  photo?: string
  employmentDate: Date
  personalDescription?: string
  dailySalaryRate: number
  isActive: boolean
  registrationToken?: string
  createdAt: Date
  updatedAt: Date
}

export interface Fine {
  _id?: string
  userId: string
  date: Date
  amount: number
  comment: string
  photo?: string
  isPaid: boolean
  createdBy: string
  createdAt: Date
}

export interface WorkShift {
  _id?: string
  userId: string
  date: Date
  startTime: string
  endTime: string
  station?: string
  tips?: number
  salesPercentage?: number
  totalSales?: number
  isCompleted: boolean
  createdAt: Date
}

export interface InternshipProgress {
  _id?: string
  userId: string
  stage: string
  description: string
  completedTasks: string[]
  totalTasks: string[]
  progress: number
  mentorId?: string
  startDate: Date
  expectedEndDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface RegistrationToken {
  _id?: string
  token: string
  role: "waiter" | "helper"
  isUsed: boolean
  createdBy: string
  expiresAt: Date
  createdAt: Date
}
