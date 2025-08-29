// components/RoleGuard.tsx
import React from 'react';
import { useAuthStore, USER_ROLES } from '@/app/store/authStore';
import { Shield, Lock, AlertCircle } from 'lucide-react';

interface RoleGuardProps {
    requiredRole?: string;
    allowedRoles?: string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
    showLoading?: boolean;
}

const DefaultAccessDenied = ({ userRole }: { userRole?: string }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Доступ заборонено</h2>
            <p className="text-gray-600 mb-2">
                У вас немає необхідних прав для перегляду цієї сторінки.
            </p>
            {userRole && (
                <p className="text-sm text-gray-500 mb-4">
                    Ваша поточна роль: <span className="font-medium">{userRole}</span>
                </p>
            )}
            <button
                onClick={() => window.history.back()}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
                Повернутися назад
            </button>
        </div>
    </div>
);

const LoadingScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
            <Shield className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Перевірка прав доступу...</p>
        </div>
    </div>
);

export const RoleGuard: React.FC<RoleGuardProps> = ({
    requiredRole,
    allowedRoles,
    children,
    fallback,
    showLoading = true
}) => {
    const { 
        user, 
        isAuthenticated, 
        isCheckingAuth,
        hasRole, 
        hasAnyRole 
    } = useAuthStore();

    // Показуємо завантаження якщо ще перевіряємо автентифікацію
    if (isCheckingAuth && showLoading) {
        return <LoadingScreen />;
    }

    // Перевіряємо автентифікацію
    if (!isAuthenticated || !user) {
        return fallback || <DefaultAccessDenied />;
    }

    // Перевіряємо роль
    let hasAccess = false;

    if (requiredRole) {
        hasAccess = hasRole(requiredRole);
    } else if (allowedRoles && allowedRoles.length > 0) {
        hasAccess = hasAnyRole(allowedRoles);
    } else {
        // Якщо ролі не вказані, дозволяємо доступ автентифікованим користувачам
        hasAccess = true;
    }

    if (!hasAccess) {
        return fallback || <DefaultAccessDenied userRole={user.role} />;
    }

    return <>{children}</>;
};

// Спеціальний компонент для адмінів
export const AdminGuard: React.FC<{ 
    children: React.ReactNode; 
    fallback?: React.ReactNode 
}> = ({ children, fallback }) => (
    <RoleGuard requiredRole={USER_ROLES.ADMIN} fallback={fallback}>
        {children}
    </RoleGuard>
);

// Спеціальний компонент для працівників (офіціанти + помічники)
export const StaffGuard: React.FC<{ 
    children: React.ReactNode; 
    fallback?: React.ReactNode 
}> = ({ children, fallback }) => (
    <RoleGuard 
        allowedRoles={[USER_ROLES.WAITER, USER_ROLES.HELPER]} 
        fallback={fallback}
    >
        {children}
    </RoleGuard>
);

// Експорт для легкого використання
export default RoleGuard;