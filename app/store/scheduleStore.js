import { create } from "zustand";
import API from "../utils/axios";

export const useScheduleStore = create((set, get) => ({
  schedules: [],
  isLoading: false,
  error: null,
  message: null,
  employees: [], // All employees from DB
  selectedEmployees: [], // Currently selected employees
  currentSchedule: null, // Current schedule being edited

  // Fetch all schedules (admin)
  fetchSchedules: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.get("/schedule/all");
      set({ schedules: res.data.schedules, isLoading: false });
    } catch (error) {
      set({ error: "Помилка завантаження графіків", isLoading: false });
    }
  },

  // Create or update a schedule (admin)
  createOrUpdateSchedule: async (scheduleData) => {
    const { month, year, data, userIds, templateType = "default", type = "manual" } = scheduleData;
    set({ isLoading: true, error: null });
    try {
      const res = await API.post("/schedule", { 
        month, year, data, userIds, templateType, type 
      });
      set({ 
        message: "Графік успішно збережено",
        isLoading: false 
      });
      await get().fetchSchedules();
      return res.data.schedule;
    } catch (error) {
      set({ 
        error: "Помилка збереження графіка", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Import schedule from Excel (admin)
  importSchedule: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.post("/schedule/import", formData);
      set({ 
        message: "Графік успішно імпортовано",
        isLoading: false 
      });
      await get().fetchSchedules();
      return res.data.schedule;
    } catch (error) {
      set({ 
        error: "Помилка імпорту графіка", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete schedule (admin)
  deleteSchedule: async (scheduleId) => {
    set({ isLoading: true, error: null });
    try {
      await API.delete(`/schedule/${scheduleId}`);
      set({ 
        message: "Графік успішно видалено",
        isLoading: false 
      });
      await get().fetchSchedules();
    } catch (error) {
      set({ 
        error: "Помилка видалення графіка", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Fetch employees by role
  fetchEmployeesByRole: async (role) => {
    set({ isLoading: true });
    try {
      const res = await API.get(`/users/role/${role}`);
      set({ employees: res.data.users });
    } catch (error) {
      set({ error: "Помилка завантаження працівників" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create new schedule
  createSchedule: async (scheduleData) => {
    const { month, year, employees, shifts, type = "manual" } = scheduleData;
    set({ isLoading: true });
    try {
      // Convert shifts to proper format
      const data = employees.map(emp => ({
        userId: emp._id,
        shifts: shifts[emp._id] || Array(31).fill("0")
      }));

      const res = await API.post("/schedule", {
        month,
        year,
        data,
        userIds: employees.map(emp => emp._id),
        type,
        templateType: type
      });

      set({ 
        message: "Графік успішно створено",
        schedules: [...get().schedules, res.data.schedule]
      });
    } catch (error) {
      set({ error: "Помилка створення графіка" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Select/deselect employee
  toggleEmployee: (employee) => {
    const selected = get().selectedEmployees;
    const isSelected = selected.find(emp => emp._id === employee._id);
    
    set({
      selectedEmployees: isSelected 
        ? selected.filter(emp => emp._id !== employee._id)
        : [...selected, employee]
    });
  },

  // Clear selections
  clearSelections: () => set({ selectedEmployees: [], currentSchedule: null }),

  // Clear messages
  clearMessage: () => set({ message: null }),
  clearError: () => set({ error: null }),
}));
