"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Plus, Camera } from "lucide-react"
import type { Fine } from "@/backend/models/user"

interface FinesSectionProps {
  fines: Fine[]
  userRole: string
  userId: string
  onUpdate: () => void
}

export function FinesSection({ fines, userRole, userId, onUpdate }: FinesSectionProps) {
  const [isAddingFine, setIsAddingFine] = useState(false)
  const [newFine, setNewFine] = useState({
    amount: "",
    comment: "",
    photo: "",
  })

  const addFine = async () => {
    if (!newFine.amount || !newFine.comment) return

    try {
      const response = await fetch(`/api/users/${userId}/fines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(newFine.amount),
          comment: newFine.comment,
          photo: newFine.photo,
          date: new Date(),
        }),
      })

      if (response.ok) {
        setNewFine({ amount: "", comment: "", photo: "" })
        setIsAddingFine(false)
        onUpdate()
      }
    } catch (error) {
      console.error("Error adding fine:", error)
    }
  }

  const toggleFinePayment = async (fineId: string, isPaid: boolean) => {
    try {
      const response = await fetch(`/api/fines/${fineId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPaid }),
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error("Error updating fine payment:", error)
    }
  }

  const totalFines = fines.reduce((sum, fine) => sum + fine.amount, 0)
  const paidFines = fines.filter((fine) => fine.isPaid).reduce((sum, fine) => sum + fine.amount, 0)
  const unpaidFines = totalFines - paidFines

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Штрафи
          </CardTitle>
          {userRole === "admin" && (
            <Dialog open={isAddingFine} onOpenChange={setIsAddingFine}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Додати штраф
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новий штраф</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Сума штрафу (₴)</Label>
                    <Input
                      type="number"
                      value={newFine.amount}
                      onChange={(e) => setNewFine((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>Коментар</Label>
                    <Textarea
                      value={newFine.comment}
                      onChange={(e) => setNewFine((prev) => ({ ...prev, comment: e.target.value }))}
                      placeholder="Причина штрафу..."
                    />
                  </div>
                  <div>
                    <Label>Фото (опціонально)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          // Handle file upload
                          const file = e.target.files?.[0]
                          if (file) {
                            // In a real app, you'd upload to a file storage service
                            setNewFine((prev) => ({ ...prev, photo: URL.createObjectURL(file) }))
                          }
                        }}
                      />
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingFine(false)}>
                      Скасувати
                    </Button>
                    <Button onClick={addFine}>Додати штраф</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{totalFines}₴</div>
            <div className="text-sm text-gray-600">Всього штрафів</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{paidFines}₴</div>
            <div className="text-sm text-gray-600">Сплачено</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{unpaidFines}₴</div>
            <div className="text-sm text-gray-600">До сплати</div>
          </div>
        </div>

        {/* Fines List */}
        <div className="space-y-4">
          {fines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Штрафів немає</div>
          ) : (
            fines.map((fine) => (
              <div key={fine._id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-lg">{fine.amount}₴</span>
                      <Badge variant={fine.isPaid ? "default" : "destructive"}>
                        {fine.isPaid ? "Сплачено" : "Не сплачено"}
                      </Badge>
                      <span className="text-sm text-gray-500">{new Date(fine.date).toLocaleDateString("uk-UA")}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{fine.comment}</p>
                    {fine.photo && (
                      <img
                        src={fine.photo || "/placeholder.svg"}
                        alt="Фото штрафу"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {userRole === "admin" && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={fine.isPaid}
                        onCheckedChange={(checked) => toggleFinePayment(fine._id || "", checked as boolean)}
                      />
                      <Label className="text-sm">Сплачено</Label>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
