import { useState } from "react";
import FilterBar from "../components/FilterBar";
import Listings from "../components/Listings";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto">
      <div className="z-50 w-full transition-all duration-300 sticky top-20 bg-white pb-4">
        <FilterBar onCategoryChange={handleCategoryChange} />
      </div>
      <Listings category={selectedCategory} />
    </div>
  );
}
