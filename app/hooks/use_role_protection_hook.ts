// hooks/useRoleProtection.ts
import { useState, useEffect } from 'react';
import { useAuthStore, USER_ROLES } from '@/app/store/authStore';

type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

interface UseRoleProtectionOptions {
    requiredRole: UserRole;
    redirectOnUnauthorized?: boolean;
    redirectPath?: string;
}

interface UseRoleProtectionReturn {
    hasAccess: boolean;
    isChecking: boolean;
    user: any;
    userRole: UserRole | null;
}

export const useRoleProtection = ({
    requiredRole,
    redirectOnUnauthorized = false,
    redirectPath = '/dashboard'
}: UseRoleProtectionOptions): UseRoleProtectionReturn => {
    const { user, isAuthenticated, hasRole } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const checkRole = () => {
            // Перевіряємо авторизацію
            if (!isAuthenticated || !user) {
                setHasAccess(false);
                setIsChecking(false);
                
                if (redirectOnUnauthorized) {
                    window.location.href = '/login';
                }
                return;
            }

            // Використовуємо функцію hasRole з store
            const hasRequiredRole = hasRole(requiredRole);
            
            setHasAccess(hasRequiredRole);
            setIsChecking(false);

            // Редірект якщо немає доступу
            if (!hasRequiredRole && redirectOnUnauthorized) {
                window.location.href = redirectPath;
            }
        };

        // Невелика затримка для кращого UX
        const timer = setTimeout(checkRole, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, requiredRole, redirectOnUnauthorized, redirectPath, hasRole]);

    return {
        hasAccess,
        isChecking,
        user,
        userRole: user?.role || null
    };
};

// Додатковий хук для множинних ролей
export const useMultiRoleProtection = (
    allowedRoles: UserRole[]
): UseRoleProtectionReturn => {
    const { user, isAuthenticated, hasAnyRole } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const checkRoles = () => {
            if (!isAuthenticated || !user) {
                setHasAccess(false);
                setIsChecking(false);
                return;
            }

            // Використовуємо функцію hasAnyRole з store
            const hasAllowedRole = hasAnyRole(allowedRoles);
            
            setHasAccess(hasAllowedRole);
            setIsChecking(false);
        };

        const timer = setTimeout(checkRoles, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, allowedRoles, hasAnyRole]);

    return {
        hasAccess,
        isChecking,
        user,
        userRole: user?.role || null
    };
};




/* 
// HOC для захисту компонентів
export const withRoleProtection = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredRole: UserRole,
    AccessDeniedComponent?: React.ComponentType
) => {
    return (props: P) => {
        const { hasAccess, isChecking } = useRoleProtection({ requiredRole });

        if (isChecking) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Перевірка прав доступу...</p>
                    </div>
                </div>
            );
        }

        if (!hasAccess) {
            if (AccessDeniedComponent) {
                return <AccessDeniedComponent />;
            }
            
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-7V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Доступ заборонено</h2>
                        <p className="text-gray-600 mb-6">
                            У вас немає необхідних прав для перегляду цієї сторінки.
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Повернутися назад
                        </button>
                    </div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};
*/