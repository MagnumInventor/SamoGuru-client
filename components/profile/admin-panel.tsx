"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "lucide-react"

interface AdminPanelProps {
  onUpdate: () => void
}

export function AdminPanel({ onUpdate }: AdminPanelProps) {
  const [newToken, setNewToken] = useState({ role: '', token: '' })
  const [generatedTokens, setGeneratedTokens] = useState<any[]>([])
  const [scheduleData, setScheduleData] = useState({
    userId: '',
    date: '',
    startTime: '',
    endTime: '',
    station: ''
  })

  const generateToken = async () => {
    if (!newToken.role) return

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    try {
      const response = await fetch('/api/admin/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          role: newToken.role,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })
      })

      if (response.ok) {
        setNewToken({ role: '', token: token })
        loadTokens()
      }
    } catch (error) {
      console.error('Error generating token:', error)
    }
  }

  const loadTokens = async () => {
    try {
      const response = await fetch('/api/admin/tokens')
      if (response.ok) {
        const tokens = await response.json()
        setGeneratedTokens(tokens)
      }
    } catch (error) {
      console.error('Error loading tokens:', error)
    }
  }

  const createSchedule = async () => {
    if (!scheduleData.userId || !scheduleData.date || !scheduleData.startTime || !scheduleData.endTime) return

    try {
      const response = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: scheduleData.userId,
          date: scheduleData.date,
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
          station: scheduleData.station
        })
      })

      if (response.ok) {
        setScheduleData({ userId: '', date: '', startTime: '', endTime: '', station: '' })
        onUpdate()
      }
    } catch (error) {
      console.error('Error creating schedule:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Панель адміністратора
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tokens" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tokens">Токени</TabsTrigger>
              <TabsTrigger value="schedule">Розклад</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
