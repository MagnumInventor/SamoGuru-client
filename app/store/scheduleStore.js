import { create } from "zustand";
import API from "../utils/axios";

export const useScheduleStore = create((set, get) => ({
  schedules: [],
  isLoading: false,
  error: null,
  message: null,

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

  // Clear messages
  clearMessage: () => set({ message: null }),
  clearError: () => set({ error: null }),
}));
