
import { format } from "date-fns";

/**
 * DateTime Utilities for Registration System
 * 
 * This module contains utility functions and mock data for handling
 * date and time selection in the registration system. It manages
 * available dates, time slots, and validation logic for both
 * online and in-person class formats.
 */

// ========================================
// MOCK DATA - Replace with real API calls
// ========================================

/**
 * Mock data: Available dates for in-person classes
 * In a real application, this would come from an API
 * that checks instructor availability and venue capacity
 */
export const AVAILABLE_DATES = [
  new Date(2025, 5, 16), // June 16, 2025
  new Date(2025, 5, 17), // June 17, 2025
  new Date(2025, 5, 20), // June 20, 2025
  new Date(2025, 5, 21), // June 21, 2025
  new Date(2025, 5, 22), // June 22, 2025
  new Date(2025, 5, 25), // June 25, 2025
  new Date(2025, 5, 30), // June 30, 2025
];

/**
 * Mock data: Available time slots for each date
 * Key format: YYYY-MM-DD
 * Value: Array of time strings in 12-hour format
 * 
 * In a real application, this would be dynamically
 * fetched based on instructor schedules and bookings
 */
export const TIME_SLOTS = {
  "2025-06-16": ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-17": ["10:00 AM", "1:00 PM", "3:00 PM"],
  "2025-06-20": ["9:00 AM", "11:00 AM", "2:00 PM"],
  "2025-06-21": ["10:00 AM", "1:00 PM"],
  "2025-06-22": ["9:00 AM", "3:00 PM", "5:00 PM"],
  "2025-06-25": ["11:00 AM", "2:00 PM", "4:00 PM"],
  "2025-06-30": ["9:00 AM", "1:00 PM", "4:00 PM"],
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Converts a Date object to a string key for time slot lookup
 * 
 * @param date - The date to format
 * @returns String in YYYY-MM-DD format, or empty string if date is null/undefined
 */
export const formatDateKey = (date: Date) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

/**
 * Retrieves available time slots for a specific date
 * 
 * @param date - The date to get time slots for
 * @returns Array of time strings, or empty array if no slots available
 */
export const getAvailableTimeSlots = (date: Date | undefined) => {
  if (!date) return [];
  
  const dateKey = formatDateKey(date);
  return TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS] || [];
};

/**
 * Determines whether a specific day should be disabled in the calendar
 * 
 * Business Logic:
 * - Online classes: No date restrictions (all dates enabled)
 * - In-person classes: Only predefined available dates are enabled
 * 
 * @param date - The date to check
 * @param classFormat - Either 'online' or 'in-person'
 * @returns true if the date should be disabled, false if it should be selectable
 */
export const isDayDisabled = (date: Date, classFormat: string) => {
  // Online classes don't have date restrictions
  if (classFormat === 'online') {
    return false;
  }
  
  // For in-person classes, only allow specific available dates
  return !AVAILABLE_DATES.some(
    availableDate => 
      availableDate.getDate() === date.getDate() && 
      availableDate.getMonth() === date.getMonth() && 
      availableDate.getFullYear() === date.getFullYear()
  );
};

/**
 * Gets the number of available time slots for a specific date
 * Used to determine the color of availability indicators
 * 
 * @param date - The date to check
 * @returns Number of available slots (0 if none available)
 */
export const getAvailableSlotsCount = (date: Date) => {
  const dateKey = formatDateKey(date);
  const slots = TIME_SLOTS[dateKey as keyof typeof TIME_SLOTS];
  return slots ? slots.length : 0;
};

// ========================================
// FUTURE ENHANCEMENTS
// ========================================

/*
 * TODO: Replace mock data with real API integration
 * TODO: Add timezone support for multi-location classes
 * TODO: Implement real-time slot availability updates
 * TODO: Add recurring class scheduling support
 * TODO: Integrate with calendar booking systems
 */
