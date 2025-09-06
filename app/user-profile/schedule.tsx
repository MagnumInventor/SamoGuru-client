import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Calendar } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import { useScheduleStore } from "../store/scheduleStore";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const daysOfWeek = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

// Month name
const currentMonth = "Червень";

export default function UserProfileSchedulePage() {
  const { user, isAuthenticated } = useAuthStore();
  const {
    personalSchedule,
    fetchPersonalSchedule,
    isLoading,
    error,
    clearError,
  } = useScheduleStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPersonalSchedule();
    }
  }, [isAuthenticated, fetchPersonalSchedule]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getDayOfWeek = (day: number) => {
    // June 2025 starts on Sunday (0)
    const startDay = 0; // Sunday
    return daysOfWeek[(startDay + day - 1) % 7];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Сталася помилка: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Мій розклад роботи
        </h1>
        <p className="text-gray-600">
          {currentMonth} 2025 - Особистий графік роботи
        </p>
      </div>

      {/* Calendar Header */}
      <div className="mb-4">
        <div className="grid grid-cols-8 gap-4 text-center">
          <div></div>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div key={day} className="text-xs font-medium text-gray-900">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 text-orange-500 mr-2" />
            {currentMonth} 2025 - Мій розклад
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-4 border-b">
              <div className="text-center py-2 font-medium text-gray-900">
                Нд
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Пн
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Вт
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Ср
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Чт
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Пт
              </div>
              <div className="text-center py-2 font-medium text-gray-900">
                Сб
              </div>
            </div>
            <div className="grid grid-cols-8 gap-4">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const date = new Date(2025, 5, day);
                const isSelected = selectedDate?.toDateString() ===
                  date.toDateString();
                const shifts = personalSchedule.filter(
                  (shift: { date: string | number | Date; }) => new Date(shift.date).getDate() === day
                );

                return (
                  <div
                    key={day}
                    className={`text-center py-4 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-900 hover:bg-orange-50"
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="text-xs">{getDayOfWeek(date.getDate())}</div>
                    <div className="text-sm font-medium">
                      {shifts.length > 0
                        ? shifts.map((shift: { type: string; }) =>
                            shift.type === "morning"
                              ? "Робочий ранок"
                              : "Робочий вечір"
                          )
                        : "Вихідний"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}