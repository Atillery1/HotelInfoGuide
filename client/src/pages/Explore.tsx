import { useState, useEffect } from "react";
import { Search, MapPin, Star, ExternalLink, TreePine, Building, Music, ShoppingBag, UtensilsCrossed, Wine, Phone } from "lucide-react";
import { attractions } from "@/lib/hotelData";

const categoryIcons = {
  nature: TreePine,
  museums: Building,
  entertainment: Music,
  shopping: ShoppingBag,
  dining: UtensilsCrossed,
  nightlife: Wine
};

const categoryNames = {
  nature: "Nature & Parks",
  museums: "Museums & Historic Sites", 
  entertainment: "Entertainment & Live Shows",
  shopping: "Shopping & Markets",
  dining: "Dining",
  nightlife: "Nightlife"
};

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredAttractions, setFilteredAttractions] = useState(attractions);

  useEffect(() => {
    let filtered = attractions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(attraction => attraction.category === selectedCategory);
    }

    setFilteredAttractions(filtered);
  }, [searchTerm, selectedCategory]);

  const getAttractionsByCategory = () => {
    const categories = ['nature', 'museums', 'entertainment', 'shopping', 'dining', 'nightlife'];
    return categories.map(category => ({
      category,
      name: categoryNames[category as keyof typeof categoryNames],
      icon: categoryIcons[category as keyof typeof categoryIcons],
      attractions: filteredAttractions.filter(attr => attr.category === category),
      count: attractions.filter(attr => attr.category === category).length
    })).filter(cat => selectedCategory === "all" || cat.category === selectedCategory);
  };

  const handleWebsite = (attraction: any) => {
    if (attraction.website) {
      window.open(`https://${attraction.website}`, "_blank");
    }
  };

  const handleCall = (attraction: any) => {
    if (attraction.phone) {
      window.location.href = `tel:${attraction.phone}`;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
        <span className="text-white/70 text-sm ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Explore Norfolk</h1>
              <p className="text-white/70 text-sm">40+ Local Attractions & Activities</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Norfolk, VA</p>
              <p className="text-xl font-semibold">93°F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search attractions, activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              <option value="all">All Categories</option>
              <option value="nature">Nature & Parks</option>
              <option value="museums">Museums & Historic Sites</option>
              <option value="entertainment">Entertainment & Live Shows</option>
              <option value="shopping">Shopping & Markets</option>
              <option value="dining">Dining</option>
              <option value="nightlife">Nightlife</option>
            </select>
          </div>

          <p className="text-white/70 text-sm">
            {filteredAttractions.length} attraction{filteredAttractions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Category Overview (when showing all) */}
        {selectedCategory === "all" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Object.entries(categoryNames).map(([key, name]) => {
              const Icon = categoryIcons[key as keyof typeof categoryIcons];
              const count = attractions.filter(attr => attr.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-medium text-sm">{name}</h3>
                  <p className="text-white/70 text-xs">{count} places</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Attractions by Category */}
        <div className="space-y-8">
          {getAttractionsByCategory().map(({ category, name, icon: Icon, attractions: categoryAttractions }) => (
            <div key={category} className="space-y-4">
              {selectedCategory === "all" && (
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold">{name}</h2>
                  <span className="text-white/70 text-sm">({categoryAttractions.length})</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Attraction Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                      {renderStars(attraction.rating)}
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm mb-4 line-clamp-3">
                      {attraction.description}
                    </p>

                    {/* Distance and Walk Time */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-white/70">{attraction.distance}</span>
                      </div>
                      <div className="text-white/70">
                        {attraction.walkTime}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {attraction.website && (
                        <button
                          onClick={() => handleWebsite(attraction)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors text-sm flex-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Website</span>
                        </button>
                      )}
                      {attraction.phone && (
                        <button
                          onClick={() => handleCall(attraction)}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors text-sm flex-1"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                      )}
                      {!attraction.website && !attraction.phone && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm text-white/70 flex-1 justify-center">
                          Walking distance from hotel
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAttractions.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No attractions found</h3>
            <p className="text-white/70">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Getting Around Norfolk</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Walking Distances</h4>
              <p className="text-white/70">
                Most attractions are within easy walking distance. Walking times are estimated from the hotel entrance.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Transportation</h4>
              <p className="text-white/70">
                For farther destinations, rideshare services, taxis, and public transit are available. See the Transit page for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}