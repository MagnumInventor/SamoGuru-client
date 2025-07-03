"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus } from "lucide-react"
import type { User, WorkShift, Fine } from "@/backend/models/user"

interface SalaryCalculatorProps {
  user: User
  workShifts: WorkShift[]
  fines: Fine[]
  onUpdate: () => void
}

export function SalaryCalculator({ user, workShifts, fines, onUpdate }: SalaryCalculatorProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [salaryData, setSalaryData] = useState({
    baseSalary: 0,
    tips: 0,
    salesBonus: 0,
    fines: 0,
    totalSalary: 0,
    workDays: 0,
  })
  const [editingTips, setEditingTips] = useState<{ [key: string]: number }>({})
  const [editingSales, setEditingSales] = useState<{ [key: string]: { sales: number; percentage: number } }>({})

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ]

  useEffect(() => {
    calculateSalary()
  }, [selectedMonth, selectedYear, workShifts, fines])

  const calculateSalary = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}/salary?month=${selectedMonth}&year=${selectedYear}`)
      if (response.ok) {
        const data = await response.json()
        setSalaryData(data)
      }
    } catch (error) {
      console.error("Error calculating salary:", error)
    }
  }

  const getMonthShifts = () => {
    return workShifts.filter((shift) => {
      const shiftDate = new Date(shift.date)
      return shiftDate.getMonth() === selectedMonth - 1 && shiftDate.getFullYear() === selectedYear
    })
  }

  const updateShiftTips = async (shiftId: string, tips: number) => {
    try {
      const response = await fetch(`/api/shifts/${shiftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tips }),
      })

      if (response.ok) {
        onUpdate()
        calculateSalary()
      }
    } catch (error) {
      console.error("Error updating tips:", error)
    }
  }

  const updateShiftSales = async (shiftId: string, totalSales: number, salesPercentage: number) => {
    try {
      const response = await fetch(`/api/shifts/${shiftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalSales, salesPercentage }),
      })

      if (response.ok) {
        onUpdate()
        calculateSalary()
      }
    } catch (error) {
      console.error("Error updating sales:", error)
    }
  }

  const monthShifts = getMonthShifts()

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Розрахунок зарплати
            </CardTitle>
            <div className="flex gap-2">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2023, 2024, 2025].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{salaryData.baseSalary}₴</div>
              <div className="text-sm text-gray-600">Базова зарплата</div>
              <div className="text-xs text-gray-500">
                {salaryData.workDays} днів × {user.dailySalaryRate}₴
              </div>
            </div>

            {user.role === "waiter" && (
              <>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{salaryData.tips}₴</div>
                  <div className="text-sm text-gray-600">Чайові</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{salaryData.salesBonus}₴</div>
                  <div className="text-sm text-gray-600">Бонус з продажів</div>
                </div>
              </>
            )}

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">-{salaryData.fines}₴</div>
              <div className="text-sm text-gray-600">Штрафи</div>
            </div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
            <div className="text-3xl font-bold text-orange-600">{salaryData.totalSalary}₴</div>
            <div className="text-lg text-gray-700">
              Загальна зарплата за {monthNames[selectedMonth - 1]} {selectedYear}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shift Details for Waiters */}
      {user.role === "waiter" && monthShifts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Деталі змін</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthShifts.map((shift) => (
                <div key={shift._id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{new Date(shift.date).toLocaleDateString("uk-UA")}</div>
                      <div className="text-sm text-gray-600">
                        {shift.startTime} - {shift.endTime}
                        {shift.station && ` • ${shift.station}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{user.dailySalaryRate}₴</div>
                      <div className="text-sm text-gray-600">Базова ставка</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Tips */}
                    <div>
                      <Label className="text-sm">Чайові</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          placeholder="0"
                          value={editingTips[shift._id || ""] ?? shift.tips ?? ""}
                          onChange={(e) =>
                            setEditingTips((prev) => ({
                              ...prev,
                              [shift._id || ""]: Number.parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const tips = editingTips[shift._id || ""] ?? shift.tips ?? 0
                            updateShiftTips(shift._id || "", tips)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Sales */}
                    <div>
                      <Label className="text-sm">Продажі</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          placeholder="Сума продажів"
                          value={editingSales[shift._id || ""]?.sales ?? shift.totalSales ?? ""}
                          onChange={(e) =>
                            setEditingSales((prev) => ({
                              ...prev,
                              [shift._id || ""]: {
                                ...prev[shift._id || ""],
                                sales: Number.parseFloat(e.target.value) || 0,
                              },
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          placeholder="%"
                          value={editingSales[shift._id || ""]?.percentage ?? shift.salesPercentage ?? ""}
                          onChange={(e) =>
                            setEditingSales((prev) => ({
                              ...prev,
                              [shift._id || ""]: {
                                ...prev[shift._id || ""],
                                percentage: Number.parseFloat(e.target.value) || 0,
                              },
                            }))
                          }
                          className="w-16"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const sales = editingSales[shift._id || ""]?.sales ?? shift.totalSales ?? 0
                            const percentage = editingSales[shift._id || ""]?.percentage ?? shift.salesPercentage ?? 0
                            updateShiftSales(shift._id || "", sales, percentage)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
