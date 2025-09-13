// app/store/scheduleStore.js
import { create } from "zustand";
import API from "../utils/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useScheduleStore = create((set, get) => ({
  // State
  schedules: [],
  currentSchedule: null,
  myCurrentSchedule: null,
  employees: [],
  selectedEmployees: [],
  isLoading: false,
  error: null,
  message: null,

  // Actions
  
  // Clear messages
  clearMessages: () => set({ error: null, message: null }),
  
  // Clear selections
  clearSelections: () => set({ selectedEmployees: [] }),

  // Get all schedules (admin only)
  fetchSchedules: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters.role) params.append('role', filters.role);
      if (filters.month) params.append('month', filters.month);
      if (filters.year) params.append('year', filters.year);
      if (filters.status) params.append('status', filters.status);
      
      const response = await API.get(`${API_URL}/schedule/all?${params}`);
      set({ 
        schedules: response.data.schedules, 
        isLoading: false 
      });
    } catch (error) {
      console.error("Помилка завантаження розкладів:", error);
      set({ 
        error: error.response?.data?.message || "Помилка завантаження розкладів", 
        isLoading: false 
      });
    }
  },

  // Get employees by role
  fetchEmployeesByRole: async (role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.get(`${API_URL}/schedule/employees/${role}`);
      set({ 
        employees: response.data.employees, 
        isLoading: false 
      });
    } catch (error) {
      console.error("Помилка завантаження працівників:", error);
      set({ 
        error: error.response?.data?.message || "Помилка завантаження працівників", 
        isLoading: false 
      });
    }
  },

  // Toggle employee selection
  toggleEmployee: (employee) => {
    const currentSelected = get().selectedEmployees;
    const isSelected = currentSelected.some(emp => emp._id === employee._id);
    
    if (isSelected) {
      set({ 
        selectedEmployees: currentSelected.filter(emp => emp._id !== employee._id) 
      });
    } else {
      set({ 
        selectedEmployees: [...currentSelected, employee] 
      });
    }
  },

  // Select all employees
  selectAllEmployees: () => {
    const { employees } = get();
    set({ selectedEmployees: [...employees] });
  },

  // Deselect all employees
  deselectAllEmployees: () => {
    set({ selectedEmployees: [] });
  },

  // Create new schedule
  createSchedule: async (scheduleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/schedule/create`, {
        month: scheduleData.month,
        year: scheduleData.year,
        role: scheduleData.role,
        title: scheduleData.title || `Розклад ${scheduleData.role} - ${scheduleData.month}/${scheduleData.year}`,
        generalComment: scheduleData.generalComment || '',
        selectedEmployees: scheduleData.selectedEmployees.map(emp => emp._id),
        customShifts: scheduleData.customShifts || {}
      });
      
      // Add new schedule to the list
      const currentSchedules = get().schedules;
      set({ 
        schedules: [response.data.schedule, ...currentSchedules],
        message: response.data.message,
        isLoading: false,
        selectedEmployees: [] // Clear selections after creation
      });
      
      return response.data;
    } catch (error) {
      console.error("Помилка створення розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка створення розкладу", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Get schedule by ID
  getSchedule: async (scheduleId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.get(`${API_URL}/schedule/${scheduleId}`);
      set({ 
        currentSchedule: response.data.schedule, 
        isLoading: false 
      });
      return response.data.schedule;
    } catch (error) {
      console.error("Помилка завантаження розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка завантаження розкладу", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Get my current schedule
  fetchMyCurrentSchedule: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.get(`${API_URL}/schedule/my-current`);
      set({ 
        myCurrentSchedule: response.data.schedule, 
        isLoading: false,
        message: response.data.message 
      });
    } catch (error) {
      console.error("Помилка завантаження особистого розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка завантаження особистого розкладу", 
        isLoading: false 
      });
    }
  },

  // Update schedule
  updateSchedule: async (scheduleId, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.put(`${API_URL}/schedule/${scheduleId}`, updateData);
      
      // Update in schedules list
      const currentSchedules = get().schedules;
      const updatedSchedules = currentSchedules.map(schedule => 
        schedule._id === scheduleId ? response.data.schedule : schedule
      );
      
      set({ 
        schedules: updatedSchedules,
        currentSchedule: response.data.schedule,
        message: response.data.message,
        isLoading: false 
      });
      
      return response.data;
    } catch (error) {
      console.error("Помилка оновлення розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка оновлення розкладу", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Publish schedule
  publishSchedule: async (scheduleId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.post(`${API_URL}/schedule/${scheduleId}/publish`);
      
      // Update schedule status in the list
      const currentSchedules = get().schedules;
      const updatedSchedules = currentSchedules.map(schedule => {
        if (schedule._id === scheduleId) {
          return { ...schedule, status: 'published', isCurrent: true };
        }
        // Unpublish other schedules of the same role
        if (schedule.role === response.data.schedule.role && schedule.isCurrent) {
          return { ...schedule, isCurrent: false };
        }
        return schedule;
      });
      
      set({ 
        schedules: updatedSchedules,
        message: response.data.message,
        isLoading: false 
      });
      
      return response.data;
    } catch (error) {
      console.error("Помилка публікації розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка публікації розкладу", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete schedule
  deleteSchedule: async (scheduleId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await API.delete(`${API_URL}/schedule/${scheduleId}`);
      
      // Remove from schedules list
      const currentSchedules = get().schedules;
      const filteredSchedules = currentSchedules.filter(schedule => schedule._id !== scheduleId);
      
      set({ 
        schedules: filteredSchedules,
        message: response.data.message,
        isLoading: false 
      });
      
      return response.data;
    } catch (error) {
      console.error("Помилка видалення розкладу:", error);
      set({ 
        error: error.response?.data?.message || "Помилка видалення розкладу", 
        isLoading: false 
      });
      throw error;
    }
  },
 

  
  // Format shift display
  formatShift: (shift) => {
    switch (shift) {
      case '1':
        return { label: '1 (9:00-22:15)', color: 'bg-blue-100 text-blue-800' };
      case '16':
        return { label: '16 (16:00-23:00)', color: 'bg-green-100 text-green-800' };
      case '0':
        return { label: 'Вихідний', color: 'bg-gray-100 text-gray-600' };
      case 'ADD':
        return { label: 'Додаткова', color: 'bg-orange-100 text-orange-800' };
      default:
        return { label: 'Невідомо', color: 'bg-red-100 text-red-800' };
    }
  },

  // Get schedule statistics
  getScheduleStats: (schedule) => {
    if (!schedule || !schedule.employees) return null;
    
    const totalEmployees = schedule.employees.length;
    const totalWorkingDays = schedule.employees.reduce((total, emp) => {
      return total + emp.days.filter(day => day.shift !== '0').length;
    }, 0);
    
    const shiftDistribution = schedule.employees.reduce((dist, emp) => {
      emp.days.forEach(day => {
        dist[day.shift] = (dist[day.shift] || 0) + 1;
      });
      return dist;
    }, {});
    
    return {
      totalEmployees,
      totalWorkingDays,
      averageWorkingDaysPerEmployee: totalEmployees > 0 ? (totalWorkingDays / totalEmployees).toFixed(1) : 0,
      shiftDistribution
    };
  },

  // Generate calendar view for employee
  generateCalendarView: (employeeSchedule) => {
    if (!employeeSchedule || !employeeSchedule.employee) return null;
    
    const { month, year } = employeeSchedule;
    const days = employeeSchedule.employee.days;
    
    // Get days in month and first day of week
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    
    // Create calendar grid
    const calendar = [];
    const weekDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    
    // Add week day headers
    calendar.push(weekDays);
    
    // Create weeks
    let week = new Array(7).fill(null);
    let dayIndex = 0;
    
    // Fill first week with empty cells and first days
    for (let i = 0; i < 7; i++) {
      if (i >= firstDay && dayIndex < days.length) {
        const day = days[dayIndex];
        week[i] = {
          date: new Date(day.date).getDate(),
          shift: day.shift,
          dayOfWeek: day.dayOfWeek,
          isAdditional: day.isAdditional
        };
        dayIndex++;
      }
    }
    calendar.push([...week]);
    
    // Fill remaining weeks
    while (dayIndex < days.length) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayIndex < days.length; i++) {
        const day = days[dayIndex];
        week[i] = {
          date: new Date(day.date).getDate(),
          shift: day.shift,
          dayOfWeek: day.dayOfWeek,
          isAdditional: day.isAdditional
        };
        dayIndex++;
      }
      calendar.push([...week]);
    }
    
    return {
      calendar,
      month,
      year,
      employeeName: employeeSchedule.employee.name,
      stats: employeeSchedule.employee.stats
    };
  }
}));