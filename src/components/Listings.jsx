import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import { listings } from "../data/mockData";

const Listings = ({ filters }) => {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const filterListings = () => {
      return listings.filter((listing) => {        
        const [minPrice, maxPrice] = filters.priceRange;
        if (listing.price < minPrice || listing.price > maxPrice) return false;

        if (
          filters.placeType !== "Any type" &&
          listing.type !== filters.placeType
        )
          return false;
        
        if (
          filters.amenities.length > 0 &&
          !filters.amenities.every((amenity) =>
            listing.amenities.includes(amenity)
          )
        )
          return false;
        
        if (filters.medicalEquipment.length > 0) {
          const listingMedicalEquipment = listing.medicalEquipment || [];
          if (
            !filters.medicalEquipment.every((equipment) =>
              listingMedicalEquipment.includes(equipment)
            )
          ) {
            return false;
          }
        }
        
        if (filters.superhost && !listing.superhost) return false;
        
        if (
          filters.propertyTypes.length > 0 &&
          !filters.propertyTypes.includes(listing.type)
        )
          return false;

        return true;
      });
    };

    const timer = setTimeout(() => {
      const results = filterListings();
      setFilteredListings(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);
  return (
    <div className="px-4 md:px-8 pb-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-2 animate-pulse">
              <div className="rounded-xl bg-gray-200 aspect-square"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
              superhost={listing.superhost}
              type={listing.type}
              amenities={listing.amenities.slice(0, 3)}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredListings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No listings found matching your filters
        </div>
      )}
    </div>
  );
};

export default Listings;
