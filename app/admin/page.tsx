"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/schedule-tabs";

import { useAuthStore } from "@/app/store/authStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { 
  Users, 
  Calendar, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  Clock,
  Eye,
  Send,
  Edit,
  Archive,
  Download,
} from "lucide-react";

interface ScheduleFormData {
  month: number;
  year: number;
  role: string;
  title: string;
  generalComment: string;
}

interface ShiftData {
  [employeeId: string]: {
    [day: number]: string;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const authState = useAuthStore();
  const scheduleStore = useScheduleStore();
  const isAdmin = authState.user?.role === 'admin';

  // Existing states
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Schedule creation states
  const [showScheduleCreator, setShowScheduleCreator] = useState(false);
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    role: 'helper',
    title: '',
    generalComment: ''
  });
  const [customShifts, setCustomShifts] = useState<ShiftData>({});
  const [selectedTab, setSelectedTab] = useState('codes');

  // Schedule view states
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showScheduleDetail, setShowScheduleDetail] = useState(false);

  useEffect(() => {
    const isRefresh = performance.navigation.type === 1;
    
    if (isRefresh && !authState.user) {
      router.push('/login');
      return;
    }
    
    if (isAdmin) {
      authState.fetchEmployeeCodes();
      scheduleStore.fetchSchedules();
    }
  }, [isAdmin, authState.user, router]);

  // Load employees when schedule role changes
  useEffect(() => {
    if (showScheduleCreator && scheduleForm.role) {
      scheduleStore.fetchEmployeesByRole(scheduleForm.role);
      scheduleStore.clearSelections();
      setCustomShifts({});
    }
  }, [scheduleForm.role, showScheduleCreator]);

  // Generate title automatically
  useEffect(() => {
    if (scheduleForm.month && scheduleForm.year && scheduleForm.role) {
      const roleNames = {
        'helper': 'ранери',
        'waiter': 'Офіціанти', 
        'admin': 'Менеджери'
      };
      const monthNames = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
      ];
      
      setScheduleForm(prev => ({
        ...prev,
        title: `Розклад ${roleNames[scheduleForm.role as keyof typeof roleNames]} - ${monthNames[scheduleForm.month - 1]} ${scheduleForm.year}`
      }));
    }
  }, [scheduleForm.month, scheduleForm.year, scheduleForm.role]);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Доступ обмежено
          </h2>
          <p className="text-gray-600 mb-4">
            Будь ласка, увійдіть як менеджер для доступу до цієї сторінки
          </p>
            <Link href="/ff" className="hover:text-orange-600 transition-colors">
              Перейти до входу
            </Link>
        </div>
      </div>
    );
  }

  const adminStats = [
    {
      title: "Загальна кількість кодів",
      value: Array.isArray(authState.employeeCodes) ? authState.employeeCodes.length : 0,
      change: "",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Використані коди",
      value: Array.isArray(authState.employeeCodes) ? authState.employeeCodes.filter((c: any) => c.isUsed).length : 0,
      change: "",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Активні розклади",
      value: scheduleStore.schedules.filter((s: any) => s.status === 'published').length,
      change: "",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Чернетки розкладів",
      value: scheduleStore.schedules.filter((s: any) => s.status === 'draft').length,
      change: "",
      icon: Edit,
      color: "text-orange-600"
    }
  ];

  function formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  async function handleAddCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newCode.trim()) return;
    try {
      await authState.addEmployeeCode(newCode.trim(), newDescription.trim());
      setNewCode('');
      setNewDescription('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Помилка додавання коду:', error);
    }
  }

  async function handleDeleteCode(codeId: string) {
    if (!window.confirm('Ви впевнені, що хочете видалити цей код?')) return;
    try {
      await authState.deleteEmployeeCode(codeId);
    } catch (error) {
      console.error('Помилка видалення коду:', error);
    }
  }

  // Schedule creation handlers
  const handleFormChange = (field: keyof ScheduleFormData, value: string | number) => {
    setScheduleForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleShiftChange = (employeeId: string, day: number, shift: string) => {
    setCustomShifts(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: shift
      }
    }));
  };

  const generateDefaultShifts = () => {
    const shifts: ShiftData = {};
    const daysInMonth = new Date(scheduleForm.year, scheduleForm.month, 0).getDate();
    
    scheduleStore.selectedEmployees.forEach((employee: any, empIndex: number) => {
      shifts[employee._id] = {};
      
      // Generate 3/3 pattern starting from different days for each employee
      let dayCounter = empIndex * 2; // Offset start for each employee
      let isWorking = true;
      let patternDay = 0;
      
      for (let day = 1; day <= daysInMonth; day++) {
        if (isWorking) {
          shifts[employee._id][day] = patternDay % 2 === 0 ? '1' : '16';
          patternDay++;
          
          if (patternDay >= 3) {
            isWorking = false;
            patternDay = 0;
          }
        } else {
          shifts[employee._id][day] = '0';
          patternDay++;
          
          if (patternDay >= 3) {
            isWorking = true;
            patternDay = 0;
          }
        }
      }
    });
    
    setCustomShifts(shifts);
  };

  const handleCreateSchedule = async () => {
    try {
      await scheduleStore.createSchedule({
        ...scheduleForm,
        selectedEmployees: scheduleStore.selectedEmployees,
        customShifts
      });
      
      // Reset form
      setShowScheduleCreator(false);
      setCustomShifts({});
      scheduleStore.clearSelections();
      setScheduleForm({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        role: 'helper',
        title: '',
        generalComment: ''
      });
      
      // Refresh schedules list
      scheduleStore.fetchSchedules();
    } catch (error) {
      console.error('Помилка створення розкладу:', error);
    }
  };

  const getShiftLabel = (shift: string) => {
    const labels = {
      '0': '-',
      '1': '1',
      '16': '16',
      'ADD': '+'
    };
    return labels[shift as keyof typeof labels] || shift;
  };

  const getShiftColor = (shift: string) => {
    const colors = {
      '0': 'bg-gray-100',
      '1': 'bg-blue-100 text-blue-800',
      '16': 'bg-green-100 text-green-800',
      'ADD': 'bg-orange-100 text-orange-800'
    };
    return colors[shift as keyof typeof colors] || 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Панель Менеджера</h1>
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                {authState.user.role.toUpperCase()}
              </Badge>
            </div>
            <p className="text-gray-600">Управління кодами працівників та розкладами</p>
          </div>
        </div>

        {/* Messages */}
        {(authState.message || scheduleStore.message) && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {authState.message || scheduleStore.message}
            </AlertDescription>
          </Alert>
        )}

        {(authState.error || scheduleStore.error) && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {authState.error || scheduleStore.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="codes">Коди працівників</TabsTrigger>
            <TabsTrigger value="schedules">Розклади</TabsTrigger>
            <TabsTrigger value="create-schedule">Створити розклад</TabsTrigger>
          </TabsList>

          {/* Employee Codes Tab */}
          <TabsContent value="codes">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Коди працівників</CardTitle>
                    <CardDescription>
                      Управління кодами для реєстрації нових працівників
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Додати код
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && (
                  <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <form onSubmit={handleAddCode} className="space-y-4">
                      <div>
                        <Label htmlFor="code">Код працівника *</Label>
                        <Input
                          id="code"
                          value={newCode}
                          onChange={(e) => setNewCode(e.target.value)}
                          placeholder="Введіть унікальний код"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Опис (необов'язково)</Label>
                        <Input
                          id="description"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="Опис або коментар"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          disabled={authState.isLoading || !newCode.trim()}
                        >
                          {authState.isLoading ? 'Додавання...' : 'Додати код'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowAddForm(false)}
                        >
                          Скасувати
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {authState.isLoading && !authState.employeeCodes?.length ? (
                  <div className="text-center py-4">Завантаження...</div>
                ) : !authState.employeeCodes?.length ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Коди працівників ще не додані</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {authState.employeeCodes.map((code: any) => (
                      <div 
                        key={code._id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono font-medium">
                              {code.code}
                            </span>
                            <Badge variant={code.isUsed ? "secondary" : "default"}>
                              {code.isUsed ? "Використаний" : "Доступний"}
                            </Badge>
                          </div>
                          {code.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {code.description}
                            </p>
                          )}
                          <div className="text-xs text-gray-500 flex flex-wrap gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Створено: {formatDate(code.createdAt)}
                            </span>
                            {code.isUsed && code.usedBy && (
                              <span>
                                {code.usedBy.firstName ? `Використав: ${code.usedBy.firstName} ${code.usedBy.lastName}` : `Використав: ${code.usedBy}`}
                              </span>
                            )}
                            {code.isUsed && code.usedAt && (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Використано: {formatDate(code.usedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                        {!code.isUsed && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCode(code._id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Видалити код"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="bg-gray-100 p-2 rounded text-xs mt-4">
                  Для видалення використаного коду працівника зверніться до розробника <strong>096-042-7745</strong>: Кодів = {authState.employeeCodes?.length || 0}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <CardTitle>Управління розкладами</CardTitle>
                <CardDescription>Перегляд, редагування та публікація розкладів</CardDescription>
              </CardHeader>
              <CardContent>
                {scheduleStore.schedules.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Розклади ще не створені</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {scheduleStore.schedules.map((schedule: any) => (
                      <div 
                        key={schedule._id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-lg">{schedule.title}</h4>
                              <Badge 
                                variant={schedule.status === 'published' ? 'default' : 'secondary'}
                                className={schedule.isCurrent ? 'bg-green-100 text-green-800' : ''}
                              >
                                {schedule.status === 'published' ? 'Опубліковано' : 'Чернетка'}
                                {schedule.isCurrent && ' (Поточний)'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                              <span>Місяць: {schedule.month}/{schedule.year}</span>
                              <span>Роль: {schedule.role}</span>
                              <span>Працівників: {schedule.totalEmployees}</span>
                              <span>Робочих днів: {schedule.totalWorkingDays}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                              Створено: {formatDate(schedule.createdAt)}
                              {schedule.publishedAt && ` • Опубліковано: ${formatDate(schedule.publishedAt)}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setShowScheduleDetail(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Переглянути
                            </Button>
                            {schedule.status === 'draft' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => scheduleStore.publishSchedule(schedule._id)}
                                disabled={scheduleStore.isLoading}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Опублікувати
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => scheduleStore.deleteSchedule(schedule._id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Schedule Tab */}
          <TabsContent value="create-schedule">
            <Card>
              <CardHeader>
                <CardTitle>Створення нового розкладу</CardTitle>
                <CardDescription>Створіть розклад для конкретної групи працівників</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showScheduleCreator ? (
                  <Button 
                    onClick={() => setShowScheduleCreator(true)}
                    className="w-full"
                    size="lg"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Почати створення розкладу
                  </Button>
                ) : (
                  <div className="space-y-6">
                    {/* Schedule Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Тип працівників</Label>
                        <Select 
                          value={scheduleForm.role} 
                          onValueChange={(val) => handleFormChange('role', val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="helper">ранери</SelectItem>
                            <SelectItem value="waiter">Офіціанти</SelectItem>
                            <SelectItem value="admin">Менеджери</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Місяць</Label>
                        <Select 
                          value={scheduleForm.month.toString()} 
                          onValueChange={(val) => handleFormChange('month', parseInt(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть місяць" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 12}, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {new Date(2000, i).toLocaleString('uk-UA', { month: 'long' })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Рік</Label>
                        <Select 
                          value={scheduleForm.year.toString()} 
                          onValueChange={(val) => handleFormChange('year', parseInt(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть рік" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 3}, (_, i) => (
                              <SelectItem key={i} value={(new Date().getFullYear() + i).toString()}>
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Назва розкладу</Label>
                        <Input
                          value={scheduleForm.title}
                          onChange={(e) => handleFormChange('title', e.target.value)}
                          placeholder="Автоматично згенерована назва"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Загальний коментар</Label>
                      <Textarea
                        value={scheduleForm.generalComment}
                        onChange={(e: { target: { value: string | number; }; }) => handleFormChange('generalComment', e.target.value)}
                        placeholder="Додаткова інформація до розкладу (необов'язково)"
                        rows={3}
                      />
                    </div>

                    {/* Employee Selection */}
                    {scheduleStore.employees.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Виберіть працівників ({scheduleStore.selectedEmployees.length} вибрано)</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => scheduleStore.selectAllEmployees()}
                            >
                              Вибрати всіх
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => scheduleStore.deselectAllEmployees()}
                            >
                              Скасувати вибір
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {scheduleStore.employees.map((employee: any) => (
                            <div key={employee._id} className="flex items-center space-x-2 p-2 border rounded">
                              <Checkbox
                                checked={scheduleStore.selectedEmployees.some((emp: { _id: any; }) => emp._id === employee._id)}
                                onCheckedChange={() => scheduleStore.toggleEmployee(employee)}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{employee.name}</p>
                                <p className="text-xs text-gray-500 truncate">{employee.email}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shift Assignment */}
                    {scheduleStore.selectedEmployees.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Призначення змін</h3>
                          <Button
                            variant="outline"
                            onClick={generateDefaultShifts}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Згенерувати шаблон 3/3
                          </Button>
                        </div>
                        
                        <div className="mb-4 text-xs text-gray-600 space-y-1">
                          <p><strong>1</strong> - Денна зміна (9:00-22:15)</p>
                          <p><strong>16</strong> - Вечірня зміна (16:00-23:00)</p>
                          <p><strong>-</strong> - Вихідний день</p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 px-2 py-1 text-left text-sm font-medium sticky left-0 bg-gray-50 min-w-[120px]">
                                  Працівник
                                </th>
                                {Array.from({length: new Date(scheduleForm.year, scheduleForm.month, 0).getDate()}, (_, i) => (
                                  <th key={i} className="border border-gray-300 px-1 py-1 text-center text-xs min-w-[40px]">
                                    {i + 1}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {scheduleStore.selectedEmployees.map((employee: any) => (
                                <tr key={employee._id}>
                                  <td className="border border-gray-300 px-2 py-1 text-sm font-medium sticky left-0 bg-white">
                                    <div className="truncate max-w-[100px]" title={employee.name}>
                                      {employee.name.split(' ')[0]}
                                    </div>
                                  </td>
                                  {Array.from({length: new Date(scheduleForm.year, scheduleForm.month, 0).getDate()}, (_, day) => (
                                    <td key={day} className="border border-gray-300 p-0">
                                      <Select
                                        value={customShifts[employee._id]?.[day + 1] || "0"}
                                        onValueChange={(val) => handleShiftChange(employee._id, day + 1, val)}
                                      >
                                        <SelectTrigger className="w-full h-8 border-none rounded-none text-center text-xs">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="0">-</SelectItem>
                                          <SelectItem value="1">1</SelectItem>
                                          <SelectItem value="16">16</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowScheduleCreator(false);
                          setCustomShifts({});
                          scheduleStore.clearSelections();
                        }}
                      >
                        Скасувати
                      </Button>
                      <Button 
                        onClick={handleCreateSchedule}
                        disabled={scheduleStore.selectedEmployees.length === 0 || scheduleStore.isLoading}
                        className="min-w-[120px]"
                      >
                        {scheduleStore.isLoading ? 'Створення...' : 'Створити розклад'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Schedule Detail Modal */}
        {showScheduleDetail && selectedSchedule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">{(selectedSchedule as any).title}</h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowScheduleDetail(false);
                    setSelectedSchedule(null);
                  }}
                >
                  ✕
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><strong>Місяць:</strong> {(selectedSchedule as any).month}/{(selectedSchedule as any).year}</div>
                  <div><strong>Роль:</strong> {(selectedSchedule as any).role}</div>
                  <div><strong>Статус:</strong> {(selectedSchedule as any).status}</div>
                  <div><strong>Працівників:</strong> {(selectedSchedule as any).totalEmployees}</div>
                </div>
                
                {(selectedSchedule as any).generalComment && (
                  <div className="mb-4 p-3 bg-blue-50 rounded">
                    <strong>Коментар:</strong> {(selectedSchedule as any).generalComment}
                  </div>
                )}
                
                <div className="overflow-x-auto mt-8">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 bg-gray-50 p-2">Працівник</th>
                        {Array.from({ length: new Date((selectedSchedule as any).year, (selectedSchedule as any).month, 0).getDate() }, (_, i) => (
                          <th key={i + 1} className="border border-gray-200 bg-gray-50 p-2 min-w-[40px] text-center">
                            {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedSchedule as any).employees?.map((employee: { _id: string; name: string; shifts?: { [key: number]: string } }) => (
                        <tr key={employee._id}>
                          <td className="border border-gray-200 p-2 whitespace-nowrap">
                            {employee.name}
                          </td>
                          {Array.from(
                            { length: new Date((selectedSchedule as any).year, (selectedSchedule as any).month, 0).getDate() },
                            (_, day) => (
                              <td 
                                key={day + 1} 
                                className={`border border-gray-200 p-2 text-center ${
                                  employee.shifts?.[day + 1] === '1' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : employee.shifts?.[day + 1] === '16'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-50'
                                }`}
                              >
                                {employee.shifts?.[day + 1] || '-'}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Legend */}
                <div className="mt-4 flex gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-200"></div>
                    <span>Денна зміна (1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-200"></div>
                    <span>Вечірня зміна (16)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-50 border border-gray-200"></div>
                    <span>Вихідний (-)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}