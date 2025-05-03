import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import { listings } from '../data/mockData';

const Listings = ({ category }) => {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (category) {
        setFilteredListings(listings.filter(listing =>
          listing.categories.includes(category)
        ));
      } else {
        setFilteredListings(listings);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className="px-4 md:px-8 pb-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="rounded-xl bg-gray-200 dark:bg-gray-700 aspect-square animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              location={listing.location}
              images={listing.images}
              price={listing.price}
              rating={listing.rating}
              dates={listing.availableDates}
              distance={listing.distance}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
