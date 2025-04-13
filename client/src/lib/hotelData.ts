import { ReactNode } from "react";

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  operatingHours: {
    title: string;
    schedule: string[];
    note?: string;
  }[];
  happyHour?: {
    location?: string;
    schedule: string[];
  };
  inRoomDining?: {
    note?: string;
    schedule: string[];
  };
  noInRoomDining?: string;
}

export interface Amenity {
  id: string;
  name: string;
  location: string;
  hours: string;
  description: string;
  iconType: string; // Changed to string identifier instead of direct React component
}

export const restaurants: Restaurant[] = [
  {
    id: "saltine",
    name: "Saltine",
    location: "1st Floor",
    operatingHours: [
      {
        title: "Lunch",
        schedule: ["Monday – Friday: 11:30am – 3pm"]
      },
      {
        title: "Brunch",
        schedule: ["Saturday & Sunday: 10am – 3pm"]
      },
      {
        title: "Dinner",
        schedule: [
          "Sunday – Thursday: 5pm – 11pm",
          "Friday – Saturday: 5pm – 12pm"
        ]
      }
    ],
    happyHour: {
      location: "Bar & Patio Only",
      schedule: ["Monday – Friday: 3pm – 6pm"]
    },
    inRoomDining: {
      schedule: [
        "Monday – Friday Lunch: 10am – 5pm",
        "Saturday & Sunday Brunch: 10am – 5pm",
        "Daily Dinner: 5pm – 11pm"
      ]
    }
  },
  {
    id: "varia",
    name: "Varia",
    location: "2nd Floor",
    operatingHours: [
      {
        title: "Breakfast",
        schedule: ["Daily: 6:30am – 10am"]
      },
      {
        title: "Dinner Service",
        schedule: ["Tuesday – Saturday: 5pm – 10pm"],
        note: "Kitchen closes at 10pm"
      }
    ],
    happyHour: {
      location: "Wolf Lounge Only",
      schedule: ["Tuesday – Friday: 5pm – 7pm"]
    },
    inRoomDining: {
      note: "Breakfast Only",
      schedule: ["Daily: 6:30am – 10am"]
    }
  },
  {
    id: "grain",
    name: "Grain Rooftop Patio Bar",
    location: "5th Floor",
    operatingHours: [
      {
        title: "Weekdays",
        schedule: [
          "Monday – Thursday: 12pm – 12am",
          "Friday: 12pm – 2am"
        ]
      },
      {
        title: "Weekends",
        schedule: [
          "Saturday & Sunday Brunch Buffet: 9am – 3pm",
          "Saturday: 4pm – 2am",
          "Sunday: 4pm – 12am"
        ]
      },
      {
        title: "Kitchen Hours",
        schedule: [
          "Sunday – Thursday: Kitchen closes at 12am",
          "Friday & Saturday: Kitchen closes at 1am"
        ]
      }
    ],
    happyHour: {
      schedule: ["Monday – Friday: 3pm – 5pm"]
    },
    noInRoomDining: "Grain does not offer In-Room Dining"
  }
];

export const amenities: Amenity[] = [
  {
    id: "market-pantry",
    name: "Market Pantry",
    location: "2nd floor (behind front desk)",
    hours: "Open 24 hours daily",
    description: "Convenient access to snacks, drinks, and essentials during your stay.",
    iconType: "ShoppingBag"
  },
  {
    id: "pool",
    name: "Pool",
    location: "5th floor",
    hours: "6am – 10pm daily",
    description: "Relax and unwind in our refreshing pool with panoramic views.",
    iconType: "Pool"
  },
  {
    id: "fitness-center",
    name: "Fitness Center",
    location: "5th floor",
    hours: "Open 24 hours daily",
    description: "State-of-the-art exercise equipment to maintain your fitness routine.",
    iconType: "Dumbbell"
  },
  {
    id: "business-center",
    name: "Business Center",
    location: "Lobby level",
    hours: "Open 24 hours daily",
    description: "Full-service business center with computers, printers, and high-speed internet access.",
    iconType: "Laptop"
  }
];
