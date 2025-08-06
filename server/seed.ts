import { db } from "./db";
import { 
  restaurants as restaurantsTable, 
  amenities as amenitiesTable,
  attractions as attractionsTable,
  transportOptions as transportTable,
  hotelInfo as hotelInfoTable,
  feedback as feedbackTable
} from "./db/schema";

// Restaurant data
const restaurantsData = [
  {
    id: "saltine",
    name: "Saltine",
    location: "1st Floor",
    description: "Fresh seafood, seasonal shellfish, and spirits in an elegant brasserie setting",
    operatingHours: JSON.stringify([
      {
        title: "Lunch",
        schedule: ["Monday – Friday: 11:30 AM – 3:00 PM"]
      },
      {
        title: "Brunch", 
        schedule: ["Saturday & Sunday: 10:00 AM – 3:00 PM"]
      },
      {
        title: "Dinner",
        schedule: [
          "Sunday – Thursday: 5:00 PM – 11:00 PM",
          "Friday – Saturday: 5:00 PM – 12:00 AM"
        ]
      }
    ]),
    happyHour: JSON.stringify({
      location: "Raw Bar Menu",
      schedule: ["Monday – Friday: 3:00 PM – 6:00 PM"]
    }),
    inRoomDining: JSON.stringify({
      schedule: ["Available daily until 10:30 PM"]
    }),
    phone: "757-763-6200",
    website: "hiltonnorfolk.com"
  },
  {
    id: "varia",
    name: "Varia",
    location: "2nd Floor", 
    description: "Trattoria-style Italian fare with curated wine selection, piano bar, and tasting room",
    operatingHours: JSON.stringify([
      {
        title: "Breakfast",
        schedule: ["Daily: 7:00 AM – 10:00 AM"]
      },
      {
        title: "Dinner",
        schedule: ["Tuesday – Saturday: 5:00 PM – 10:00 PM"],
        note: "Kitchen closes at 10:00 PM"
      }
    ]),
    happyHour: JSON.stringify({
      location: "Wolf Lounge Only",
      schedule: ["Tuesday – Friday: 5:00 PM – 7:00 PM"]
    }),
    inRoomDining: JSON.stringify({
      note: "Available for breakfast",
      schedule: ["Daily: 7:00 AM – 10:00 AM"]
    }),
    phone: "757-763-6200",
    website: "hiltonnorfolk.com"
  },
  {
    id: "grain",
    name: "Grain Rooftop Patio Bar",
    location: "5th Floor",
    description: "Indoor-outdoor rooftop beer garden with patio, fire pit, and Elizabeth River views",
    operatingHours: JSON.stringify([
      {
        title: "Weekdays",
        schedule: [
          "Monday – Thursday: 12:00 PM – 12:00 AM",
          "Friday: 12:00 PM – 2:00 AM"
        ]
      },
      {
        title: "Weekends", 
        schedule: [
          "Saturday: 4:00 PM – 2:00 AM",
          "Sunday: 4:00 PM – 12:00 AM"
        ]
      },
      {
        title: "Brunch Buffet",
        schedule: ["Saturday & Sunday: 9:00 AM – 3:00 PM"]
      },
      {
        title: "Kitchen Hours",
        schedule: [
          "Sunday – Thursday: Kitchen closes at 12:00 AM",
          "Friday & Saturday: Kitchen closes at 1:00 AM"
        ]
      }
    ]),
    happyHour: JSON.stringify({
      schedule: ["Monday – Friday: 3:00 PM – 5:00 PM"]
    }),
    noInRoomDining: "No in-room dining available",
    phone: "757-763-6200", 
    website: "hiltonnorfolk.com"
  }
];

// Amenities data
const amenitiesData = [
  {
    id: "market-pantry",
    name: "Market Pantry",
    location: "2nd Floor",
    hours: "24/7 convenience store",
    description: "24/7 convenience store with snacks, drinks, and essentials behind the front desk",
    iconType: "ShoppingBag"
  },
  {
    id: "pool",
    name: "Indoor Pool", 
    location: "5th Floor",
    hours: "6:00 AM - 10:00 PM daily",
    description: "Climate-controlled indoor pool with panoramic Norfolk views",
    iconType: "Pool"
  },
  {
    id: "fitness-center",
    name: "Fitness Center",
    location: "5th Floor", 
    hours: "24/7 modern equipment",
    description: "State-of-the-art exercise equipment available 24 hours daily",
    iconType: "Dumbbell"
  },
  {
    id: "empyrean-lounge",
    name: "Empyrean Level Lounge",
    location: "21st Floor",
    hours: "Exclusive lounge access", 
    description: "Exclusive lounge with complimentary breakfast and evening hors d'oeuvres",
    iconType: "Crown"
  }
];

// Norfolk attractions data
const attractionsData = [
  // Nature & Parks
  {
    id: "town-point-park",
    name: "Town Point Park",
    category: "nature",
    description: "7-acre riverfront park hosting festivals, concerts, and events",
    distance: "0.1 miles",
    walkTime: "2 min walk",
    rating: 4.5,
    website: "norfolkfestival.com"
  },
  {
    id: "pagoda-garden", 
    name: "Pagoda & Oriental Garden",
    category: "nature",
    description: "Tranquil waterfront space with beautiful Taiwanese pagoda",
    distance: "0.3 miles",
    walkTime: "6 min walk", 
    rating: 4.3
  },
  {
    id: "elizabeth-river-trail",
    name: "Elizabeth River Trail",
    category: "nature",
    description: "Urban trail along former railroad with scenic river views",
    distance: "0.1 miles",
    walkTime: "2 min walk",
    rating: 4.6
  },
  {
    id: "townebank-fountain-park",
    name: "TowneBank Fountain Park", 
    category: "nature",
    description: "Waterfront plaza with interactive fountains and green space",
    distance: "0.2 miles",
    walkTime: "4 min walk",
    rating: 4.2
  },
  {
    id: "plum-point-park",
    name: "Plum Point Park",
    category: "nature", 
    description: "Small riverfront park perfect for picnics and relaxation",
    distance: "0.4 miles",
    walkTime: "8 min walk",
    rating: 4.0
  },

  // Museums & Historic Sites
  {
    id: "nauticus",
    name: "Nauticus & Battleship Wisconsin",
    category: "museums",
    description: "Maritime discovery center with historic battleship tours",
    distance: "0.2 miles",
    walkTime: "4 min walk",
    rating: 4.7,
    website: "nauticus.org"
  },
  {
    id: "macarthur-memorial",
    name: "MacArthur Memorial", 
    category: "museums",
    description: "Museum honoring General Douglas MacArthur's life and legacy",
    distance: "0.3 miles",
    walkTime: "6 min walk",
    rating: 4.4
  },
  {
    id: "chrysler-museum",
    name: "Chrysler Museum of Art",
    category: "museums",
    description: "30,000+ objects including world-renowned glass collection",
    distance: "0.8 miles",
    walkTime: "16 min walk",
    rating: 4.8,
    website: "chrysler.org"
  },
  {
    id: "hampton-roads-naval",
    name: "Hampton Roads Naval Museum",
    category: "museums",
    description: "Naval fleet history museum located inside Nauticus", 
    distance: "0.2 miles",
    walkTime: "4 min walk",
    rating: 4.5
  },
  {
    id: "hunter-house",
    name: "Hunter House Victorian Museum",
    category: "museums",
    description: "Restored 1894 Victorian home with period furnishings",
    distance: "1.2 miles",
    walkTime: "24 min walk",
    rating: 4.1
  },

  // Entertainment & Live Shows
  {
    id: "chrysler-hall", 
    name: "Chrysler Hall",
    category: "entertainment",
    description: "Premier performing arts center featuring Broadway shows",
    distance: "0.4 miles",
    walkTime: "8 min walk",
    rating: 4.6,
    website: "sevenvenues.com"
  },
  {
    id: "the-norva",
    name: "The NorVa",
    category: "entertainment",
    description: "Live music venue featured by Rolling Stone magazine",
    distance: "0.6 miles",
    walkTime: "12 min walk",
    rating: 4.5,
    website: "thenorva.com"
  },
  {
    id: "attucks-theatre",
    name: "Attucks Theatre",
    category: "entertainment",
    description: "Historic 'Apollo of the South' venue with cultural performances",
    distance: "0.5 miles",
    walkTime: "10 min walk",
    rating: 4.3
  },
  {
    id: "harbor-park",
    name: "Harbor Park",
    category: "entertainment",
    description: "Norfolk Tides Triple-A baseball stadium with waterfront views",
    distance: "0.3 miles",
    walkTime: "6 min walk",
    rating: 4.4,
    website: "milb.com/norfolk"
  },
  {
    id: "scope-arena",
    name: "Scope Arena",
    category: "entertainment",
    description: "Norfolk Admirals hockey and major concert venue", 
    distance: "0.4 miles",
    walkTime: "8 min walk",
    rating: 4.2
  },

  // Shopping & Markets
  {
    id: "selden-market",
    name: "Selden Market",
    category: "shopping",
    description: "Connected to hotel with 11 unique retail and dining spaces",
    distance: "0.0 miles",
    walkTime: "Connected",
    rating: 4.3
  },
  {
    id: "macarthur-center",
    name: "MacArthur Center",
    category: "shopping",
    description: "Indoor shopping mall with major retailers and cinema",
    distance: "0.3 miles",
    walkTime: "6 min walk",
    rating: 4.1,
    website: "macarthurcenter.com"
  },
  {
    id: "waterside-district",
    name: "Waterside District",
    category: "shopping",
    description: "Waterfront dining and entertainment complex",
    distance: "0.2 miles", 
    walkTime: "4 min walk",
    rating: 4.2,
    website: "watersidedistrict.com"
  },
  {
    id: "prince-books",
    name: "Prince Books",
    category: "shopping",
    description: "Local independent bookstore with café",
    distance: "0.5 miles",
    walkTime: "10 min walk",
    rating: 4.6
  }
];

// Transportation options data
const transportData = [
  {
    id: "uber",
    name: "Uber",
    type: "rideshare",
    cost: "$8-15",
    waitTime: "5-10 minutes",
    description: "Various vehicle options with app integration"
  },
  {
    id: "lyft",
    name: "Lyft", 
    type: "rideshare",
    cost: "$8-15",
    waitTime: "5-10 minutes",
    description: "Competitive rates with friendly service"
  },
  {
    id: "yellow-cab",
    name: "Yellow Cab Norfolk",
    type: "taxi",
    cost: "$10-20",
    waitTime: "10-15 minutes",
    phone: "757-460-0000",
    description: "24/7 traditional taxi service"
  },
  {
    id: "hotel-valet",
    name: "Hotel Valet",
    type: "hotel",
    cost: "$35/night",
    waitTime: "Immediate",
    phone: "757-763-6200",
    description: "Professional parking service"
  },
  {
    id: "hrt-bus",
    name: "Hampton Roads Transit (HRT)",
    type: "public",
    cost: "$1.50",
    waitTime: "15-30 minutes",
    website: "gohrt.com",
    description: "Local bus service throughout Hampton Roads"
  },
  {
    id: "enterprise-rental",
    name: "Enterprise Rent-A-Car",
    type: "rental",
    cost: "$40-80/day",
    waitTime: "15-30 minutes",
    phone: "757-622-2855",
    description: "Downtown pickup location for car rentals"
  }
];

// Hotel information data
const hotelInfoData = {
  id: "hilton-norfolk-main",
  name: "Hilton Norfolk The Main",
  address: "100 East Main Street, Norfolk, VA 23510",
  phone: "757-763-6200",
  wifiNetwork: "HILTON HONORS",
  wifiLogin: "Last name + Room number",
  currentWeather: JSON.stringify({
    temperature: "93°F",
    condition: "Sunny & Hot", 
    high: "96°",
    low: "77°"
  })
};

async function seed() {
  console.log("🌱 Seeding database with Hilton Norfolk digital concierge data...");

  try {
    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await db.delete(feedbackTable);
    await db.delete(transportTable);
    await db.delete(attractionsTable);
    await db.delete(amenitiesTable);
    await db.delete(restaurantsTable);
    await db.delete(hotelInfoTable);

    // Insert hotel information
    console.log("🏨 Inserting hotel information...");
    await db.insert(hotelInfoTable).values(hotelInfoData);

    // Insert restaurants
    console.log("🍽️ Inserting restaurant data...");
    await db.insert(restaurantsTable).values(restaurantsData);

    // Insert amenities
    console.log("🏊‍♂️ Inserting amenities data...");
    await db.insert(amenitiesTable).values(amenitiesData);

    // Insert Norfolk attractions
    console.log("🗺️ Inserting Norfolk attractions...");
    await db.insert(attractionsTable).values(attractionsData);

    // Insert transportation options
    console.log("🚗 Inserting transportation options...");
    await db.insert(transportTable).values(transportData);

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Seeded data summary:`);
    console.log(`   • 1 hotel information record`);
    console.log(`   • ${restaurantsData.length} restaurants`);
    console.log(`   • ${amenitiesData.length} amenities`);
    console.log(`   • ${attractionsData.length} Norfolk attractions`);
    console.log(`   • ${transportData.length} transportation options`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log("🎉 Seeding process completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding process failed:", error);
      process.exit(1);
    });
}

export { seed };