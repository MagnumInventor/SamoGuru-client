import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

// Define available roles
export const USER_ROLES = {
  TRAINEE: 'trainee',
  HELPER: 'helper', 
  WAITER: 'waiter',
  ADMIN: 'admin'
}

export const useAuthStore = create((set, get) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	// Enhanced signup with role support
	signup: async (email, password, name, role = USER_ROLES.TRAINEE) => {
        set({ isLoading: true, error: null });
        try {
            // Використовуйте повний URL
            const response = await axios.post(`${API_URL}/signup`, { 
                email, 
                password, 
                firstName,
                role 
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error('Signup error:', error);
            const errorMessage = error.response?.data?.message || "Error signing up";
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
	},

	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},

	// NEW: Role management functions
	updateUserRole: async (userId, newRole) => {
		const { user } = get()
		
		if (user?.role !== USER_ROLES.ADMIN) {
			throw new Error('Only admins can update user roles')
		}

		try {
			const response = await axios.put(`${API_URL}/update-role`, {
				userId,
				role: newRole
			})
			
			// If updating own role, update local state
			if (userId === user.id) {
				set({ 
					user: { ...user, role: newRole }
				})
			}
			
			return response.data
		} catch (error) {
			throw error
		}
	},

	// Role checking helpers
	hasRole: (requiredRole) => {
		const { user } = get()
		return user?.role === requiredRole
	},

	hasAnyRole: (roles) => {
		const { user } = get()
		return roles.includes(user?.role)
	},

	isAdmin: () => {
		const { user } = get()
		return user?.role === USER_ROLES.ADMIN
	},

	// Clear error
	clearError: () => set({ error: null }),

	// Clear message
	clearMessage: () => set({ message: null })
}));