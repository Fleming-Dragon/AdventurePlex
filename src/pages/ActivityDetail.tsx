import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Calendar } from "lucide-react";
import { activities } from "../data/activities";
import { groundImages } from "../data/groundImages";
import ImageCarousel from "../components/ImageCarousel";
import { format } from "date-fns";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const activity = activities.find((a) => a.id === id);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Activity not found
          </h2>
          <Link
            to="/book"
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Booking
          </Link>
        </div>
      </div>
    );
  }

  const facilityImages =
    groundImages[activity.name as keyof typeof groundImages] || [];

  const calculateTotalPrice = () => {
    return activity.price * participants;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={activity.image}
          alt={activity.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              {activity.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/book"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Booking
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              {facilityImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Facility Images
                  </h2>
                  <ImageCarousel images={[...facilityImages]} />
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900">
                About this{" "}
                {activity.category === "social" ? "Venue" : "Activity"}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {activity.description}
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  What's Included
                </h3>
                <ul className="mt-4 space-y-4 text-gray-600">
                  {activity.category === "social" ? (
                    <>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Dedicated event coordinator
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Basic setup and cleanup
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Tables and chairs
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Basic sound system
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Professional equipment and safety gear provided
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Expert instructors and supervision
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Comprehensive safety briefing
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-green-500">•</span>
                        Suitable for {activity.minAge}+ years
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Guidelines
                </h3>
                <ul className="mt-4 space-y-4 text-gray-600">
                  {activity.category === "social" ? (
                    <>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        Outside catering allowed with prior approval
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        Decorations must be approved beforehand
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        No confetti or glitter allowed
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        Minimum age requirement: {activity.minAge} years
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        Follow instructor guidance at all times
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-amber-500">•</span>
                        Wear appropriate clothing and footwear
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900">Book Now</h3>

                {/* Date Selection */}
                <div className="mt-6">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(new Date(), "yyyy-MM-dd")}
                      className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                          selectedTime === time
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-900 hover:bg-gray-50"
                        } border border-gray-300`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Participants Selection */}
                <div className="mt-6">
                  <label
                    htmlFor="participants"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of{" "}
                    {activity.category === "social" ? "Guests" : "Participants"}
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500">
                      <Users className="h-5 w-5" />
                    </span>
                    <input
                      type="number"
                      id="participants"
                      value={participants}
                      onChange={(e) =>
                        setParticipants(
                          Math.max(
                            1,
                            Math.min(
                              parseInt(e.target.value) || 1,
                              activity.maxParticipants
                            )
                          )
                        )
                      }
                      min="1"
                      max={activity.maxParticipants}
                      className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum {activity.maxParticipants}{" "}
                    {activity.category === "social" ? "guests" : "participants"}
                  </p>
                </div>

                {/* Price Summary */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Price
                    </span>
                    <span className="text-lg font-semibold text-indigo-600">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="mt-6 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300"
                >
                  Complete Booking
                </button>

                {/* Success Message */}
                {showBookingSuccess && (
                  <div className="mt-4 rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Booking successful! We'll send you a confirmation
                          email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
