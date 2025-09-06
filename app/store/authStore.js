// app/store/authStore.js (ОНОВЛЕНИЙ)
import { create } from "zustand";
import axios from "axios";
import API from "../utils/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

// Define available roles
export const USER_ROLES = {
  TRAINEE: "trainee",
  HELPER: "helper",
  WAITER: "waiter",
  ADMIN: "admin",
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isVerified: false,  // Add this explicitly
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  employeeCodes: [], 




  // Enhanced signup with employee code validation
  signup: async (
    email,
    password,
    firstName,
    role = USER_ROLES.TRAINEE,
    employeeCode = null,
    adminCode = null
  ) => {
    set({ isLoading: true, error: null });
    try {
      // Require adminCode for admin role
      if (role === USER_ROLES.ADMIN && !adminCode) {
        set({ error: "Потрібен Менеджерський код", isLoading: false });
        throw new Error("Потрібен Менеджерський код");
      }
      // Fixed condition: Check if role is WAITER or HELPER before requiring employeeCode
      if ((role === USER_ROLES.WAITER || role === USER_ROLES.HELPER) && !employeeCode) {
        set({ error: "Потрібен код працівника", isLoading: false });
        throw new Error("Потрібен код працівника");
      }
      const response = await API.post(`${API_URL}/auth/signup`, {
        email,
        password,
        firstName,
        role,
        employeeCode,
        adminCode,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isVerified: false, // Explicitly set to false on signup
        isLoading: false,
      });
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Помилка реєстрації";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await API.post(`${API_URL}/auth/login`, { email, password });
    set({
      user: response.data.user,
      isAuthenticated: true,
      isVerified: response.data.user.isVerified || false, // Ensure isVerified is set from response
      isLoading: false,
      message: response.data.message,
    });
    return response.data;
  } catch (error) {
    console.error("Помилка коду:", error);
    const errorMessage =
      error.response?.data?.message || "Помилка входу в систему";
    set({ error: errorMessage, isLoading: false });
    throw error;
  }
},







  // Перевірка Менеджерського коду
  verifyAdminCode: async (adminCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(
        `${API_URL}/employee-codes/verify-admin-code`,
        {
          adminCode,
        }
      );
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка перевірки коду";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Перевірка коду працівника
  verifyEmployeeCode: async (employeeCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(
        `${API_URL}/employee-codes/verify-employee-code`,
        {
          employeeCode,
        }
      );
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка перевірки коду";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Додавання коду працівника (тільки Менеджери)
  addEmployeeCode: async (code, description = "") => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/employee-codes/add`, {
        code,
        description,
      });

      // Оновлюємо список кодів
      const currentCodes = get().employeeCodes;
      set({
        employeeCodes: [response.data.code, ...currentCodes],
        isLoading: false,
        message: response.data.message,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка додавання коду";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Видалення коду працівника (тільки Менеджери)
  deleteEmployeeCode: async (codeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.delete(`${API_URL}/employee-codes/${codeId}`);

      // Видаляємо код зі списку
      const currentCodes = get().employeeCodes;
      set({
        employeeCodes: currentCodes.filter((code) => code._id !== codeId),
        isLoading: false,
        message: response.data.message,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка видалення коду";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Отримання всіх кодів (тільки Менеджери)
  fetchEmployeeCodes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.get(`${API_URL}/employee-codes/all`);
      set({
        employeeCodes: response.data.codes,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка завантаження кодів";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },







  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/auth/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isVerified: true, // Додайте це
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      // Обробка помилок
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await API.get(`${API_URL}/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isVerified: response.data.user?.isVerified || false,
        isCheckingAuth: false, // <-- ensure this is set!
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false, user: null, isVerified: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/auth/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Помилки надсилання коду для відновлення паролю",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/auth/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Помилка відновлення паролю",
      });
      throw error;
    }
  },





  // NEW: Role management functions
  updateUserRole: async (userId, newRole) => {
    const { user } = get();

    if (user?.role !== USER_ROLES.ADMIN) {
      throw new Error("Тільки менеджери можуть оновлювати ролі користувачів");
    }

    try {
      const response = await API.put(`${API_URL}/update-role`, {
        userId,
        role: newRole,
      });

      // If updating own role, update local state
      if (userId === user.id) {
        set({
          user: { ...user, role: newRole },
        });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Role checking helpers
  hasRole: (requiredRole) => {
    const { user } = get();
    return user?.role === requiredRole;
  },

  hasAnyRole: (roles) => {
    const { user } = get();
    return roles.includes(user?.role);
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === USER_ROLES.ADMIN;
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear message
  clearMessage: () => set({ message: null }),





  // Вихід з акаунта (logout, updated to call backend and clear state)
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await API.post(`${API_URL}/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isVerified: false,
        isLoading: false,
        message: "Ви успішно вийшли з акаунта",
      });
      // Do NOT redirect here!
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Помилка виходу з акаунта",
      });
      throw error;
    }
  },
}));
