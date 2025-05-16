
import { format } from "date-fns";

// Mock data for available dates and time slots
export const AVAILABLE_DATES = [
  new Date(2025, 5, 16),
  new Date(2025, 5, 17),
  new Date(2025, 5, 20),
  new Date(2025, 5, 21),
  new Date(2025, 5, 22),
  new Date(2025, 5, 25),
  new Date(2025, 5, 30),
];

export const TIME_SLOTS = {
  "2025-06-16": ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-17": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-06-20": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "2025-06-21": ["10:00 AM", "1:00 PM"],
  "2025-06-22": ["9:00 AM", "3:00 PM", "5:00 PM"],
  "2025-06-25": ["11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-30": ["9:00 AM", "1:00 PM", "4:00 PM"],
};

// Format date as string key for time slots
export const formatDateKey = (date: Date) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

// Get available time slots for selected date
export const getAvailableTimeSlots = (date: Date | undefined) => {
  if (!date) return [];
  const dateKey = formatDateKey(date);
  return TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS] || [];
};

// Function to determine which days should be disabled
export const isDayDisabled = (date: Date, classFormat: string) => {
  if (classFormat === 'online') {
    return false; // Online classes don't have date restrictions
  }
  
  // For in-person, only allow specific available dates
  return !AVAILABLE_DATES.some(
    availableDate => 
      availableDate.getDate() === date.getDate() && 
      availableDate.getMonth() === date.getMonth() && 
      availableDate.getFullYear() === date.getFullYear()
  );
};

// Get the number of available slots for a specific date
export const getAvailableSlotsCount = (date: Date) => {
  const dateKey = formatDateKey(date);
  const slots = TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS];
  return slots ? slots.length : 0;
};
