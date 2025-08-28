import { create } from "zustand";
import API from "../utils/axios";

export const useScheduleStore = create((set, get) => ({
  schedules: [],
  personalSchedule: null,
  isLoading: false,
  error: null,

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
  saveSchedule: async (month, year, scheduleData, templateType) => {
    set({ isLoading: true, error: null });
    try {
      await API.post("/schedule", { month, year, scheduleData, templateType });
      await get().fetchSchedules();
    } catch (error) {
      set({ error: "Помилка збереження графіка", isLoading: false });
    }
  },

  // Import schedule from Excel (admin)
  importSchedule: async (parsedExcelData) => {
    set({ isLoading: true, error: null });
    try {
      await API.post("/schedule/import", { data: parsedExcelData });
      await get().fetchSchedules();
    } catch (error) {
      set({ error: "Помилка імпорту графіка", isLoading: false });
    }
  },

  // Get personal schedule for employee
  fetchPersonalSchedule: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.get(`/schedule/personal/${userId}`);
      set({ personalSchedule: res.data.schedule, isLoading: false });
    } catch (error) {
      set({ error: "Помилка завантаження особистого графіка", isLoading: false });
    }
  },

  // Save personal schedule (employee)
  savePersonalSchedule: async (userId, scheduleData) => {
    set({ isLoading: true, error: null });
    try {
      await API.post(`/schedule/personal/${userId}`, { scheduleData });
      await get().fetchPersonalSchedule(userId);
    } catch (error) {
      set({ error: "Помилка збереження особистого графіка", isLoading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
