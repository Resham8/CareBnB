import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  Share,
  Star,
  Award,
  Home,
  MapPin,
  Calendar,
  Users,
  Save,
  Flag,
} from "lucide-react";
import { getListing } from "../data/mockData";

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [isReserving, setIsReserving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const data = getListing(id);
      setListing(data);
      document.title = data?.title || "Listing";
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const calculateTotalPrice = () => {
    if (!listing || !checkInDate || !checkOutDate) return 0;

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return listing.price * nights;
  };

  const totalPrice = calculateTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.15);
  const cleaningFee = Math.round(listing?.price * 0.5 || 0);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close gallery"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Share className="h-5 w-5 mr-2" strokeWidth={1.5} />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-5 w-5 mr-2 ${
                  isFavorite ? "fill-rose-500 text-rose-500" : ""
                }`}
                strokeWidth={1.5}
              />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Photos of {listing.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listing.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-[4/3] overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`${listing.title} - photo ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Listing Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {listing.title}
        </h1>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star
                className="h-4 w-4 text-gray-900 dark:text-white"
                fill="currentColor"
              />
              <span className="ml-1 text-gray-900 dark:text-white">
                {listing.rating}
              </span>
              <span className="mx-1 text-gray-700 dark:text-gray-300">·</span>
              <span className="text-gray-700 dark:text-gray-300 underline">
                {listing.reviews.length} reviews
              </span>
            </div>
            {listing.superhost && (
              <>
                <span className="text-gray-500 dark:text-gray-400">·</span>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    Superhost
                  </span>
                </div>
              </>
            )}
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-700 dark:text-gray-300 underline">
              {listing.location}
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Share className="h-5 w-5 mr-2" strokeWidth={1.5} />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-5 w-5 mr-2 ${
                  isFavorite ? "fill-rose-500 text-rose-500" : ""
                }`}
                strokeWidth={1.5}
              />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="relative mb-8">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden"
          style={{ maxHeight: "500px" }}
        >
          <div className="md:col-span-2 md:row-span-2 aspect-square md:aspect-auto">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          {listing.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="hidden md:block aspect-square">
              <img
                src={img}
                alt={`${listing.title} - photo ${idx + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-4 right-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-medium text-gray-800 dark:text-white flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Show all photos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Listing Details */}
        <div className="lg:col-span-2">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-8">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {listing.type} hosted by {listing.host.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
                  {listing.beds} beds · {listing.bathrooms} baths
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-8 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex">
                <Home
                  className="h-7 w-7 text-gray-700 dark:text-gray-300 mr-4"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Entire home
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    You'll have the place to yourself.
                  </p>
                </div>
              </div>
              <div className="flex">
                <Award
                  className="h-7 w-7 text-gray-700 dark:text-gray-300 mr-4"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Enhanced Clean
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    This host committed to Airbnb's cleaning process.
                  </p>
                </div>
              </div>
              <div className="flex">
                <MapPin
                  className="h-7 w-7 text-gray-700 dark:text-gray-300 mr-4"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Great location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    90% of recent guests gave the location a 5-star rating.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-8 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About this space
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {listing.description}
            </p>
            <button className="mt-4 text-gray-800 dark:text-white font-medium underline">
              Show more
            </button>
          </div>

          {/* Amenities */}
          <div className="py-8 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              What this place offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.amenities.slice(0, 8).map((amenity, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
            {listing.amenities.length > 8 && (
              <button className="mt-6 px-6 py-3 border border-gray-800 dark:border-gray-200 rounded-lg text-gray-800 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Show all {listing.amenities.length} amenities
              </button>
            )}
          </div>

          {/* Calendar */}
          <div className="py-8 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {checkInDate && checkOutDate
                ? `${checkInDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })} - ${checkOutDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}`
                : "Select check-in date"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add your travel dates for exact pricing
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <Calendar
                className="h-8 w-8 mx-auto text-gray-700 dark:text-gray-300 mb-2"
                strokeWidth={1.5}
              />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Your dates are ₹{listing.price} per night
              </p>
              <button className="mt-4 w-full py-3 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors">
                Choose dates
              </button>
            </div>
          </div>
        </div>

        
        <div className="lg:block">
          <div className="sticky top-28 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{listing.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400"> night</span>
              </div>
              <div className="flex items-center">
                <Star
                  className="h-4 w-4 text-gray-900 dark:text-white"
                  fill="currentColor"
                />
                <span className="ml-1 text-gray-900 dark:text-white">
                  {listing.rating}
                </span>
                <span className="mx-1 text-gray-600 dark:text-gray-400">·</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {listing.reviews.length} reviews
                </span>
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-t-lg overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-gray-300 dark:divide-gray-700">
                <div className="p-3">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    CHECK-IN
                  </label>
                  <input
                    type="text"
                    placeholder="Add date"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                    readOnly
                  />
                </div>
                <div className="p-3">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    CHECKOUT
                  </label>
                  <input
                    type="text"
                    placeholder="Add date"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                    readOnly
                  />
                </div>
              </div>
              <div className="p-3 border-t border-gray-300 dark:border-gray-700">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  GUESTS
                </label>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="1 guest"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                    readOnly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              className="w-full py-3 bg-rose-500 text-white rounded-lg mt-4 font-medium hover:bg-rose-600 transition-colors"
              onClick={() => setIsReserving(true)}
            >
              {isReserving ? "Reserve" : "Check availability"}
            </button>

            {isReserving && (
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 underline">
                  ₹{listing.price} x 5 nights
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                  ₹{listing.price * 5}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 underline">
                    Cleaning fee
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    ${cleaningFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 underline">
                    Service fee
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    ${serviceFee}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">
                    Total before taxes
                  </span>
                  <span className="text-gray-900 dark:text-white">
                  ₹{listing.price * 5 + cleaningFee + serviceFee}
                  </span>
                </div>
              </div>
            )}

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
     
      <div className="mt-8 pb-12 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center mb-6">
          <Star
            className="h-5 w-5 text-gray-900 dark:text-white"
            fill="currentColor"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
            {listing.rating} · {listing.reviews.length} reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listing.reviews.slice(0, 6).map((review, idx) => (
            <div key={idx}>
              <div className="flex items-center mb-2">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {review.userName}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {review.date}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
            </div>
          ))}
        </div>

        {listing.reviews.length > 6 && (
          <button className="mt-8 px-6 py-3 border border-gray-800 dark:border-gray-200 rounded-lg text-gray-800 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Show all {listing.reviews.length} reviews
          </button>
        )}
      </div>

      <div className="py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Where you'll be
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {listing.location}
        </p>

        <div className="rounded-xl overflow-hidden h-96 w-full">
          <iframe
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              listing.location
            )}&output=embed`}
          ></iframe>
        </div>
      </div>

      <div className="py-12 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start">
          <img
            src={listing.host.avatar}
            alt={listing.host.name}
            className="w-16 h-16 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Hosted by {listing.host.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Joined in {listing.host.joinedDate} ·{" "}
              {listing.host.isSuperhost ? "Superhost" : "Host"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-start mb-4">
              <Star className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
              <p className="text-gray-700 dark:text-gray-300">
                {listing.host.reviewCount} Reviews
              </p>
            </div>
            {listing.host.isSuperhost && (
              <div className="flex items-start mb-4">
                <Award className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
                <p className="text-gray-700 dark:text-gray-300">
                  {listing.host.name} is a Superhost
                </p>
              </div>
            )}
            <div className="flex items-start">
              <Save className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
              <p className="text-gray-700 dark:text-gray-300">
                Response rate: {listing.host.responseRate}
              </p>
            </div>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              {listing.host.description}
            </p>
            <button className="mt-4 px-6 py-3 border border-gray-800 dark:border-gray-200 rounded-lg text-gray-800 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Contact host
            </button>
          </div>
        </div>
      </div>
    
      <div className="py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
          Things to know
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              House rules
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>Check-in: After 3:00 PM</span>
              </li>
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>Checkout: 11:00 AM</span>
              </li>
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>No smoking</span>
              </li>
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>No pets</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Safety & property
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>Carbon monoxide alarm</span>
              </li>
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>Smoke alarm</span>
              </li>
              <li className="flex items-center">
                <span className="block w-5">·</span>
                <span>Security camera/recording device</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Cancellation policy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Free cancellation before{" "}
              {new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Review the host's full cancellation policy which applies even if
              you cancel for illness or disruptions caused by COVID-19.
            </p>
          </div>
        </div>
      </div>

      {/* Report */}
      <div className="py-6 text-center border-t border-gray-200 dark:border-gray-800">
        <button className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline">
          <Flag className="h-4 w-4 mr-2" />
          <span className="text-sm">Report this listing</span>
        </button>
      </div>
    </div>
  );
};

export default ListingPage;
