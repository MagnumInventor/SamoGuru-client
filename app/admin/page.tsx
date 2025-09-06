"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

import { useAuthStore } from "@/app/store/authStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { Users, Calendar, Plus, Trash2, CheckCircle, AlertCircle, Shield, Lock } from "lucide-react";

export default function AdminPage() {
    // Отримуємо весь стан з authStore
    const authState = useAuthStore(); 
    const isAdmin = authState.user?.role === 'admin';

    // Add schedule store
    const scheduleStore = useScheduleStore();
    const [importFile, setImportFile] = useState<File | null>(null);

    // Fetch all codes on mount
    useEffect(() => {
        if (isAdmin) {
            authState.fetchEmployeeCodes();
            scheduleStore.fetchSchedules(); // Add this line
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin]);

    if (!isAdmin) return <div>Немає доступу</div>;

    const [newCode, setNewCode] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // Основний контент для Менеджерів
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
            console.error('Error adding code:', error);
        }
    }

    async function handleDeleteCode(codeId: string) {
        if (!window.confirm('Ви впевнені, що хочете видалити цей код?')) return;
        try {
            await authState.deleteEmployeeCode(codeId);
        } catch (error) {
            console.error('Error deleting code:', error);
        }
    }

    // Add handler for schedule import
    const handleImportSchedule = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!importFile) return;

        const formData = new FormData();
        formData.append('file', importFile);
        try {
            await scheduleStore.importSchedule(formData);
            setImportFile(null);
        } catch (error) {
            console.error('Error importing schedule:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Заголовок з індикатором ролі */}
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">Панель Менеджера</h1>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                <Shield className="w-3 h-3 mr-1" />
                                {authState.user.role.toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-gray-600">Управління кодами працівників</p>
                    </div>
                    <Button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Додати код
                    </Button>
                </div>

                {/* Повідомлення */}
                {authState.message && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                            {authState.message}
                        </AlertDescription>
                    </Alert>
                )}

                {authState.error && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                            {authState.error}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Форма додавання коду */}
                {showAddForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Додати новий код працівника</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                    </Card>
                )}

                {/* Список кодів */}
                <Card>
                    <CardHeader>
                        <CardTitle>Коди працівників</CardTitle>
                        <CardDescription>
                            Управління кодами для реєстрації нових працівників
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                            <div className="bg-gray-100 p-2 rounded text-xs">
                                Для видалення використаного коду працівника зверніться до розробника <strong>096-042-7745</strong>:  Кодів = {authState.employeeCodes?.length || 0}
                            </div>
                    </CardContent>
                </Card>

                {/* Add Schedule Management Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Управління розкладом</CardTitle>
                        <CardDescription>Імпорт та редагування розкладу працівників</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Import Form */}
                        <form onSubmit={handleImportSchedule} className="space-y-4">
                            <div>
                                <Label htmlFor="schedule-file">Імпорт розкладу</Label>
                                <Input
                                    id="schedule-file"
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                />
                            </div>
                            <Button 
                                type="submit"
                                disabled={!importFile || scheduleStore.isLoading}
                            >
                                {scheduleStore.isLoading ? 'Імпортування...' : 'Імпортувати'}
                            </Button>
                        </form>

                        {/* Schedules List */}
                        <div className="space-y-4 mt-6">
                            <h3 className="font-medium">Наявні розклади</h3>
                            {scheduleStore.schedules.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Немає доступних розкладів</p>
                            ) : (
                                scheduleStore.schedules.map((schedule: any) => (
                                    <div 
                                        key={schedule._id}
                                        className="border rounded-lg p-4 space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium">
                                                    {schedule.month}/{schedule.year}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Тип: {schedule.templateType}
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => scheduleStore.deleteSchedule(schedule._id)}
                                            >
                                                Видалити
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}