"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"

export default function TablePlanPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">План ресторану</h1>
        <p className="text-gray-600">Інтерактивна карта розташування зон ресторану</p>
      </div>

      {/* Redirect to Map */}
      <Card className="border-orange-200 max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Карта ресторану</CardTitle>
          <CardDescription>Переглядайте інтерактивну карту з розташуванням зон та столиків</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/table-plan/map">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Відкрити карту ресторану
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
