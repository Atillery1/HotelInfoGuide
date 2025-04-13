import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Restaurant } from "./hotelData"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Days of the week mapping for easier parsing of schedule strings
const DAYS = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0
}

// Parse time string (e.g., "10am", "6:30pm") to hours/minutes in 24h format
function parseTime(timeStr: string): { hour: number; minute: number } {
  let hour = 0;
  let minute = 0;
  
  // Strip any whitespace
  timeStr = timeStr.trim().toLowerCase();
  
  // Split at ':' if present
  const hasSeparator = timeStr.includes(':');
  if (hasSeparator) {
    const [hourStr, minuteWithSuffix] = timeStr.split(':');
    hour = parseInt(hourStr, 10);
    
    // Extract minutes and am/pm suffix
    const minuteMatch = minuteWithSuffix.match(/(\d+)([ap]m)?/);
    if (minuteMatch) {
      minute = parseInt(minuteMatch[1], 10);
      if (minuteMatch[2]?.includes('pm') && hour < 12) {
        hour += 12;
      }
      if (minuteMatch[2]?.includes('am') && hour === 12) {
        hour = 0;
      }
    }
  } else {
    // Handle formats like "10am", "2pm"
    const match = timeStr.match(/(\d+)([ap]m)/);
    if (match) {
      hour = parseInt(match[1], 10);
      if (match[2].includes('pm') && hour < 12) {
        hour += 12;
      }
      if (match[2].includes('am') && hour === 12) {
        hour = 0;
      }
    }
  }
  
  return { hour, minute };
}

// Check if a restaurant is currently open
export function isRestaurantOpen(restaurant: Restaurant): boolean {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Check each operating hours period
  for (const hours of restaurant.operatingHours) {
    for (const schedule of hours.schedule) {
      // Parse the schedule string (e.g., "Monday – Friday: 11:30am – 3pm")
      // First, determine which days this applies to
      let applicableDays: number[] = [];
      
      if (schedule.toLowerCase().includes('daily')) {
        applicableDays = [0, 1, 2, 3, 4, 5, 6]; // All days
      } else if (schedule.toLowerCase().includes('weekend') || 
                 schedule.toLowerCase().includes('saturday & sunday')) {
        applicableDays = [0, 6]; // Weekend days
      } else if (schedule.toLowerCase().includes('weekday') || 
                 schedule.toLowerCase().includes('monday') && schedule.toLowerCase().includes('friday')) {
        applicableDays = [1, 2, 3, 4, 5]; // Weekdays
      } else {
        // Parse specific days like "Tuesday – Saturday"
        const dayMatch = schedule.toLowerCase().match(/([a-z]+day)\s*(?:–|-|to)\s*([a-z]+day)/);
        if (dayMatch) {
          const startDay = DAYS[dayMatch[1].toLowerCase() as keyof typeof DAYS];
          const endDay = DAYS[dayMatch[2].toLowerCase() as keyof typeof DAYS];
          
          // Handle wrapping around the week (e.g., Sunday-Tuesday)
          if (startDay <= endDay) {
            for (let d = startDay; d <= endDay; d++) {
              applicableDays.push(d);
            }
          } else {
            // Handle wrap-around (e.g., Friday-Monday)
            for (let d = startDay; d <= 6; d++) {
              applicableDays.push(d);
            }
            for (let d = 0; d <= endDay; d++) {
              applicableDays.push(d);
            }
          }
        }
      }
      
      // If current day is not in the applicable days, skip this schedule
      if (!applicableDays.includes(currentDay)) {
        continue;
      }
      
      // Parse opening and closing times
      const timeRangeMatch = schedule.match(/(\d+(?::\d+)?(?:am|pm))\s*(?:–|-|to)\s*(\d+(?::\d+)?(?:am|pm))/i);
      if (timeRangeMatch) {
        const openTime = parseTime(timeRangeMatch[1]);
        const closeTime = parseTime(timeRangeMatch[2]);
        
        // Convert current time to minutes for easier comparison
        const currentTimeInMinutes = currentHour * 60 + currentMinute;
        const openTimeInMinutes = openTime.hour * 60 + openTime.minute;
        const closeTimeInMinutes = closeTime.hour * 60 + closeTime.minute;
        
        // Check if current time is within range
        // Handle cases where closing time is after midnight
        if (closeTimeInMinutes < openTimeInMinutes) { // e.g., 10pm - 2am
          if (currentTimeInMinutes >= openTimeInMinutes || 
              currentTimeInMinutes <= closeTimeInMinutes) {
            return true;
          }
        } else { // Normal case, e.g., 11am - 10pm
          if (currentTimeInMinutes >= openTimeInMinutes && 
              currentTimeInMinutes <= closeTimeInMinutes) {
            return true;
          }
        }
      }
    }
  }
  
  return false; // Not open in any of the defined time slots
}

// Check if room service is currently available for a restaurant
export function isRoomServiceAvailable(restaurant: Restaurant): boolean {
  if (!restaurant.inRoomDining) {
    return false;
  }
  
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  for (const schedule of restaurant.inRoomDining.schedule) {
    // Parse the schedule string similar to isRestaurantOpen
    let applicableDays: number[] = [];
    
    if (schedule.toLowerCase().includes('daily')) {
      applicableDays = [0, 1, 2, 3, 4, 5, 6]; // All days
    } else if (schedule.toLowerCase().includes('weekend') || 
                schedule.toLowerCase().includes('saturday & sunday')) {
      applicableDays = [0, 6]; // Weekend days
    } else if (schedule.toLowerCase().includes('weekday') || 
                (schedule.toLowerCase().includes('monday') && schedule.toLowerCase().includes('friday'))) {
      applicableDays = [1, 2, 3, 4, 5]; // Weekdays
    } else {
      // Parse specific days
      const dayMatch = schedule.toLowerCase().match(/([a-z]+day)\s*(?:–|-|to)\s*([a-z]+day)/);
      if (dayMatch) {
        const startDay = DAYS[dayMatch[1].toLowerCase() as keyof typeof DAYS];
        const endDay = DAYS[dayMatch[2].toLowerCase() as keyof typeof DAYS];
        
        if (startDay <= endDay) {
          for (let d = startDay; d <= endDay; d++) {
            applicableDays.push(d);
          }
        } else {
          for (let d = startDay; d <= 6; d++) {
            applicableDays.push(d);
          }
          for (let d = 0; d <= endDay; d++) {
            applicableDays.push(d);
          }
        }
      }
    }
    
    if (!applicableDays.includes(currentDay)) {
      continue;
    }
    
    // Parse opening and closing times
    const timeRangeMatch = schedule.match(/(\d+(?::\d+)?(?:am|pm))\s*(?:–|-|to)\s*(\d+(?::\d+)?(?:am|pm))/i);
    if (timeRangeMatch) {
      const openTime = parseTime(timeRangeMatch[1]);
      const closeTime = parseTime(timeRangeMatch[2]);
      
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      const openTimeInMinutes = openTime.hour * 60 + openTime.minute;
      const closeTimeInMinutes = closeTime.hour * 60 + closeTime.minute;
      
      if (closeTimeInMinutes < openTimeInMinutes) { // e.g., 10pm - 6am
        if (currentTimeInMinutes >= openTimeInMinutes || 
            currentTimeInMinutes <= closeTimeInMinutes) {
          return true;
        }
      } else { // Normal case
        if (currentTimeInMinutes >= openTimeInMinutes && 
            currentTimeInMinutes <= closeTimeInMinutes) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Get the currently available menu for room service
export function getCurrentRoomServiceMenu(restaurant: Restaurant): string {
  if (!restaurant.inRoomDining || !isRoomServiceAvailable(restaurant)) {
    return "";
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  
  // Determine which meal period we're in
  if (currentHour >= 6 && currentHour < 11) {
    return "Breakfast";
  } else if (currentHour >= 11 && currentHour < 17) {
    return "Lunch";
  } else {
    return "Dinner";
  }
}

// Determine which meal period is currently being served
export function getCurrentMealPeriod(restaurant: Restaurant): string {
  if (!isRestaurantOpen(restaurant)) {
    return "";
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const isWeekend = currentDay === 0 || currentDay === 6;
  
  // Check for brunch on weekends
  if (isWeekend && currentHour >= 9 && currentHour < 15) {
    // Check if this restaurant specifically mentions brunch in their schedule
    for (const hours of restaurant.operatingHours) {
      if (hours.title.toLowerCase().includes('brunch')) {
        return "Brunch";
      }
    }
  }
  
  // Standard meal periods based on time
  if (currentHour >= 5 && currentHour < 11) {
    return "Breakfast";
  } else if (currentHour >= 11 && currentHour < 16) {
    return "Lunch";
  } else if (currentHour >= 16 && currentHour < 23) {
    return "Dinner";
  } else {
    // Late night / early morning
    return "Late Night Menu";
  }
}
