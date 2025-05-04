import { useState } from "react";
import FilterBar from "../components/FilterBar";
import Listings from "../components/Listings";

export default function Home() {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    placeType: "Any type",
    amenities: [],
    propertyTypes: [],
    medicalEquipment: [],
    bookingOptions: []
  });

  return (
    <div className="container mx-auto">
      <div className="z-50 w-full transition-all duration-300 sticky top-20 bg-white pb-4 dark:bg-gray-900">
        <FilterBar 
          onApplyFilters={setFilters} 
          currentFilters={filters}
        />
      </div>
      <Listings filters={filters} />
    </div>
  );
}