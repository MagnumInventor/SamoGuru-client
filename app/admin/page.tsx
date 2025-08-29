"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

import { useAuthStore, USER_ROLES } from "@/app/store/authStore";
import { Users, Calendar, Plus, Trash2, CheckCircle, AlertCircle, Shield, Lock } from "lucide-react";

// Компонент для блокування доступу
const AccessDenied = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-600">Доступ заборонено</CardTitle>
                <CardDescription>
                    У вас немає прав для перегляду цієї сторінки. Тільки адміністратори мають доступ до панелі управління.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <Button 
                    variant="outline" 
                    onClick={() => window.history.back()}
                    className="w-full"
                >
                    Повернутися назад
                </Button>
            </CardContent>
        </Card>
    </div>
);

// Компонент завантаження під час перевірки ролі
const RoleCheckLoading = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
                <CardTitle>Перевірка прав доступу</CardTitle>
                <CardDescription>
                    Будь ласка, зачекайте...
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
);

export default function AdminPage() {
    const {
        user,
        isAuthenticated,
        employeeCodes,
        fetchEmployeeCodes,
        addEmployeeCode,
        deleteEmployeeCode,
        isLoading,
        error,
        message,
        clearError,
        clearMessage,
        isAdmin, // Використаємо готову функцію з store
    } = useAuthStore();

    const [isCheckingRole, setIsCheckingRole] = useState(true);
    const [hasAdminAccess, setHasAdminAccess] = useState(false);

    // Перевірка ролі користувача
    useEffect(() => {
        const checkAdminRole = () => {
            // Перевіряємо чи користувач авторизований
            if (!isAuthenticated) {
                setHasAdminAccess(false);
                setIsCheckingRole(false);
                return;
            }

            // Використовуємо функцію isAdmin() з store
            const adminAccess = isAdmin();
            setHasAdminAccess(adminAccess);
            setIsCheckingRole(false);
        };

        // Невелика затримка для кращого UX
        const timer = setTimeout(checkAdminRole, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, isAdmin]); // Додали isAdmin до залежностей

    // Показуємо завантаження під час перевірки
    if (isCheckingRole) {
        return <RoleCheckLoading />;
    }

    // Блокуємо доступ якщо користувач не адмін
    if (!hasAdminAccess) {
        return <AccessDenied />;
    }

    // Решта коду админ панелі (тільки якщо користувач - адмін)
    const adminStats = [
        {
            title: "Загальна кількість кодів",
            value: Array.isArray(employeeCodes) ? employeeCodes.length : 0,
            change: "",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Використані коди",
            value: Array.isArray(employeeCodes) ? employeeCodes.filter((c: any) => c.isUsed).length : 0,
            change: "",
            icon: CheckCircle,
            color: "text-green-600"
        }
    ];

    const [newCode, setNewCode] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // Завантажуємо коди працівників
    useEffect(() => {
        fetchEmployeeCodes();
    }, [fetchEmployeeCodes]);

    // Очищення повідомлень
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                clearMessage();
            }, 30000);
            return () => clearTimeout(timer);
        }
        if (error) {
            const timer = setTimeout(() => {
                clearError();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [message, error, clearMessage, clearError]);

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
            await addEmployeeCode(newCode.trim(), newDescription.trim());
            setNewCode('');
            setNewDescription('');
            setShowAddForm(false);
        } catch (error) {
            // error handled by store
        }
    }

    async function handleDeleteCode(codeId: string) {
        if (!window.confirm('Ви впевнені, що хочете видалити цей код?')) return;
        try {
            await deleteEmployeeCode(codeId);
        } catch (error) {
            // error handled by store
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Заголовок з індикатором ролі */}
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">Панель адміністратора</h1>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                <Shield className="w-3 h-3 mr-1" />
                                {user?.role?.toUpperCase()}
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
                {message && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                            {message}
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                            {error}
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
                                        disabled={isLoading || !newCode.trim()}
                                    >
                                        {isLoading ? 'Додавання...' : 'Додати код'}
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
                        {isLoading && !employeeCodes.length ? (
                            <div className="text-center py-4">Завантаження...</div>
                        ) : employeeCodes.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>Коди працівників ще не додані</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {Array.isArray(employeeCodes) && employeeCodes.map((code: any) => (
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}