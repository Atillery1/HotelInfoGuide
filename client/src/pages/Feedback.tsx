import { useState } from "react";
import { Star, Send, CheckCircle, MessageSquare, User, Shield, Clock, UtensilsCrossed, Bed, Users, Waves, Dumbbell, UserCheck, Sparkles } from "lucide-react";

const feedbackCategories = [
  { id: "room-service", label: "Room Service", icon: Bed, description: "Room cleanliness, amenities, comfort" },
  { id: "dining", label: "Dining", icon: UtensilsCrossed, description: "Restaurant experience, food quality, service" },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles, description: "Room cleaning, maintenance, supplies" },
  { id: "front-desk", label: "Front Desk", icon: Users, description: "Check-in/out, staff assistance, information" },
  { id: "amenities", label: "Amenities", icon: Waves, description: "Pool, fitness center, market pantry, lounge" },
  { id: "concierge", label: "Concierge", icon: UserCheck, description: "Local recommendations, booking assistance" },
  { id: "overall", label: "Overall Experience", icon: Star, description: "Your complete stay experience" },
  { id: "other", label: "Other", icon: MessageSquare, description: "Specific feedback not covered above" }
];

export default function Feedback() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || rating === 0 || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedCategory("");
        setRating(0);
        setMessage("");
        setIsAnonymous(true);
      }, 3000);
    }, 1500);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white/70 text-sm">Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-400 hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <span className="text-yellow-400 font-medium ml-2">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </span>
        )}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 max-w-md mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-white/80 mb-6">
            Your feedback has been submitted successfully. We appreciate you taking the time to share your experience with us.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>Returning to form in a moment...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Feedback</h1>
              <p className="text-white/70 text-sm">Share Your Experience</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Norfolk, VA</p>
              <p className="text-xl font-semibold">93°F</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Introduction */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">We Value Your Feedback</h2>
          <p className="text-white/80 mb-4">
            Your experience matters to us. Please share your thoughts about your stay at Hilton Norfolk The Main. 
            Your feedback helps us improve our services and ensures future guests have an exceptional experience.
          </p>
          <div className="flex items-center gap-2 text-green-400">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Your feedback is secure and can be submitted anonymously</span>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Feedback Category</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {feedbackCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                      selectedCategory === category.id
                        ? "bg-blue-600/20 border-blue-500/30 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <p className="text-sm text-white/60">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          {selectedCategory && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>
              {renderStarRating()}
              <p className="text-white/60 text-sm mt-2">
                Click the stars to rate your experience from 1 (Poor) to 5 (Excellent)
              </p>
            </div>
          )}

          {/* Message */}
          {selectedCategory && rating > 0 && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Tell Us More</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please share details about your experience. What went well? What could be improved? Your specific feedback helps us serve you better."
                rows={6}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-white/60 text-sm">
                  {message.length}/500 characters
                </span>
                <span className="text-white/60 text-sm">
                  {message.length < 20 ? "Please provide more detail" : ""}
                </span>
              </div>
            </div>
          )}

          {/* Privacy Options */}
          {selectedCategory && rating > 0 && message.trim().length >= 20 && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
                  />
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Submit feedback anonymously</span>
                  </div>
                </label>
                <p className="text-white/60 text-sm ml-8">
                  {isAnonymous 
                    ? "Your feedback will be submitted without any identifying information."
                    : "Your room number may be included with your feedback for follow-up purposes."
                  }
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedCategory && rating > 0 && message.trim().length >= 20 && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center text-white/60 text-sm">
                <p>By submitting, you agree that your feedback may be used to improve our services.</p>
              </div>
            </div>
          )}
        </form>

        {/* Contact Information */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Need Immediate Assistance?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Front Desk</h4>
              <p className="text-white/70 text-sm mb-2">Available 24/7 for immediate assistance</p>
              <button
                onClick={() => window.location.href = "tel:757-763-6200"}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors"
              >
                <span className="font-medium">Call 757-763-6200</span>
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Guest Services</h4>
              <p className="text-white/70 text-sm mb-2">For detailed inquiries and special requests</p>
              <button
                onClick={() => window.location.href = "mailto:guestservices@hiltonnorfolk.com"}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                <span className="font-medium">Email Guest Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}