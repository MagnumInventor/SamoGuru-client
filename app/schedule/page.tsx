"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

import { useAuthStore } from "@/app/store/authStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { 
  Calendar, 
  Clock, 
  User,
  AlertCircle,
  CheckCircle,
  Coffee,
  Moon,
  Home
} from "lucide-react";

export default function EmployeeSchedulePage() {
  const router = useRouter();
  const authState = useAuthStore();
  const scheduleStore = useScheduleStore();
  
  const [calendarView, setCalendarView] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    if (!authState.user) {
      router.push('/login');
      return;
    }

    // Fetch current schedule
    scheduleStore.fetchMyCurrentSchedule();
  }, [authState.user, router]);

  // Generate calendar view when schedule loads
  useEffect(() => {
    if (scheduleStore.myCurrentSchedule) {
      const calendar = scheduleStore.generateCalendarView(scheduleStore.myCurrentSchedule);
      setCalendarView(calendar);
    }
  }, [scheduleStore.myCurrentSchedule]);

  if (!authState.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  const getShiftIcon = (shift: string) => {
    switch (shift) {
      case '1':
        return <Coffee className="h-4 w-4" />;
      case '16':
        return <Moon className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case '1':
        return '9:00-22:15';
      case '16':
        return '16:00-23:00';
      default:
        return 'Вихідний';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case '1':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '16':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const renderCalendar = () => {
    if (!calendarView) return null;

    const { calendar, month, year, employeeName, stats } = calendarView;
    const monthNames = [
      'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
      'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    return (
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[month - 1]} {year}
          </h2>
          <p className="text-gray-600 mt-1">Особистий розклад для {employeeName}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{stats.totalWorkingDays}</div>
              <div className="text-sm text-gray-600">Робочих днів</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Coffee className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{stats.totalDayShifts}</div>
              <div className="text-sm text-gray-600">Денні зміни</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Moon className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold">{stats.totalEveningShifts}</div>
              <div className="text-sm text-gray-600">Вечірні зміни</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Home className="h-5 w-5 text-gray-600" />
              </div>
              <div className="text-2xl font-bold">
                {new Date(year, month, 0).getDate() - stats.totalWorkingDays}
              </div>
              <div className="text-sm text-gray-600">Вихідних</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2">
              {/* Week day headers */}
              {calendar[0].map((day: string, index: number) => (
                <div key={index} className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {calendar.slice(1).map((week: any[], weekIndex: number) => (
                week.map((day: any, dayIndex: number) => (
                  <div key={`${weekIndex}-${dayIndex}`} className="aspect-square">
                    {day ? (
                      <div className={`h-full border-2 rounded-lg p-1 flex flex-col items-center justify-center ${getShiftColor(day.shift)} hover:shadow-md transition-shadow`}>
                        <div className="font-bold text-lg mb-1">{day.date}</div>
                        <div className="flex items-center gap-1 text-xs">
                          {getShiftIcon(day.shift)}
                          <span className="font-medium">
                            {day.shift === '0' ? '-' : day.shift}
                          </span>
                        </div>
                        {day.isAdditional && (
                          <Badge className="text-xs mt-1 h-4" variant="secondary">
                            Додатково
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="h-full border-2 border-transparent rounded-lg"></div>
                    )}
                  </div>
                ))
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Легенда</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${getShiftColor('1')}`}>
                  <Coffee className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Денна зміна (1)</div>
                  <div className="text-sm text-gray-600">9:00 - 22:15</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${getShiftColor('16')}`}>
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Вечірня зміна (16)</div>
                  <div className="text-sm text-gray-600">16:00 - 23:00</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${getShiftColor('0')}`}>
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Вихідний день</div>
                  <div className="text-sm text-gray-600">Відпочинок</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мій розклад</h1>
            <p className="text-gray-600">
              Особистий графік роботи для {authState.user.firstName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {authState.user.role.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Messages */}
        {scheduleStore.message && (
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              {scheduleStore.message}
            </AlertDescription>
          </Alert>
        )}

        {scheduleStore.error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {scheduleStore.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {scheduleStore.isLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-spin" />
              <p className="text-gray-600">Завантаження розкладу...</p>
            </CardContent>
          </Card>
        )}

        {/* No Schedule State */}
        {!scheduleStore.isLoading && !scheduleStore.myCurrentSchedule && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Розклад не знайдений
              </h3>
              <p className="text-gray-600 mb-4">
                На даний момент для вас немає активного розкладу. 
                Зверніться до менеджера для отримання додаткової інформації.
              </p>
              <Button
                variant="outline"
                onClick={() => scheduleStore.fetchMyCurrentSchedule()}
              >
                Перевірити знову
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Schedule Display */}
        {!scheduleStore.isLoading && scheduleStore.myCurrentSchedule && renderCalendar()}

        {/* General Comments */}
        {scheduleStore.myCurrentSchedule?.generalComment && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Важлива інформація
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {scheduleStore.myCurrentSchedule.generalComment}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Швидкі дії</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => scheduleStore.fetchMyCurrentSchedule()}
                disabled={scheduleStore.isLoading}
              >
                <Clock className="h-4 w-4 mr-2" />
                Оновити розклад
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                Друкувати розклад
              </Button>
              
              {authState.user.role === 'admin' && (
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin')}
                >
                  Панель менеджера
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}