import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Check, Wifi, Zap, Home, TreePalm } from "lucide-react";

export default function AirbnbFiltersModal({
  showFilters,
  setShowFilters,
  onApply,
  initialFilters,
}) {
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [medicalExpanded, setMedicalExpanded] = useState(true);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const handlePriceChange = (type, value) => {   
    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    
    setLocalFilters((prev) => {
      const newPriceRange = [
        type === "min" ? numericValue : prev.priceRange[0],
        type === "max" ? numericValue : prev.priceRange[1],
      ];
         
      if (type === "min" && newPriceRange[0] > newPriceRange[1]) {
        newPriceRange[1] = newPriceRange[0];
      } else if (type === "max" && newPriceRange[1] < newPriceRange[0]) {
        newPriceRange[0] = newPriceRange[1];
      }
      
      return {
        ...prev,
        priceRange: newPriceRange,
      };
    });
  };

  const toggleFilterArray = (filterType, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const handleMedicalEquipment = (equipment) => {
    toggleFilterArray("medicalEquipment", equipment);
  };

  const handleApply = () => {
    onApply(localFilters);
    setShowFilters(false);
  };

  const handleClearAll = () => {
    const resetFilters = {
      priceRange: [0, 1000000],
      placeType: "Any type",
      amenities: [],
      propertyTypes: [],
      medicalEquipment: [],
      superhost: false,
    };
    setLocalFilters(resetFilters);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && showFilters) {
        setShowFilters(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showFilters, setShowFilters]);
 
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFilters]);

  if (!showFilters) return null;

  const placeTypes = [
    { name: "Any type", icon: <Home size={20} /> },
    { name: "Entire house", icon: <Home size={20} /> },
    { name: "Treehouse", icon: <TreePalm size={20} /> },
  ];

  const amenities = [
    { name: "Wifi", icon: <Wifi size={16} /> },
    { name: "Air conditioning", icon: <Zap size={16} /> },
    { name: "Washer/Dryer", icon: null },
    { name: "BBQ grill", icon: null },
  ];

  const medicalEquipmentList = [
    "First Aid Kit",
    "Blood Pressure Monitor",
    "Digital Thermometer",
    "Glucometer (Sugar Check)",
    "Emergency Medication Kit",
    "Pulse Oximeter",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl h-[90vh] my-8 mx-4 flex flex-col">
        
        <div className="flex justify-between items-center px-6 rounded-lg py-4 border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 id="filter-modal-title" className="font-medium text-xl text-black dark:text-white">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

    
        <div className="flex-1 overflow-y-auto px-6 py-4 dark:text-white">        
          <div className="pt-4 mb-8">
            <h3 className="font-medium text-xl mb-1">Price range</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Trip price, includes all fees
            </p>

            <div className="mb-6 h-16 flex items-end">
              <div className="w-full flex items-end justify-between space-x-1">
                {Array(30)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-rose-500 w-full"
                      style={{
                        height: `${
                          20 + Math.sin(i / 3) * 15 + Math.random() * 10
                        }px`,
                      }}
                      aria-hidden="true"
                    />
                  ))}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label htmlFor="min-price" className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Minimum</label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <input
                    id="min-price"
                    type="text"
                    value={`₹${localFilters.priceRange[0]}`}
                    onChange={(e) =>
                      handlePriceChange("min", e.target.value)
                    }
                    className="w-full outline-none bg-transparent text-black dark:text-white"
                    aria-label="Minimum price"
                  />
                </div>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 w-4" aria-hidden="true"></div>
              <div className="flex-1">
                <label htmlFor="max-price" className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Maximum</label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  <input
                    id="max-price"
                    type="text"
                    value={`₹${localFilters.priceRange[1]}`}
                    onChange={(e) =>
                      handlePriceChange("max", e.target.value)
                    }
                    className="w-full outline-none bg-transparent text-black dark:text-white"
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 pt-4 border-t dark:border-gray-600">
            <h3 className="font-medium text-xl mb-4">Type of place</h3>
            <div className="flex gap-2">
              {placeTypes.map((type) => (
                <button
                  key={type.name}
                  className={`flex-1 py-6 border rounded-lg flex flex-col items-center gap-2 ${
                    localFilters.placeType === type.name
                      ? "border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      placeType: type.name,
                    }))
                  }
                  aria-pressed={localFilters.placeType === type.name}
                >
                  {type.icon}
                  <div className="text-black dark:text-white">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t mb-8 dark:border-gray-600">
            <h3 className="font-medium text-xl mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity) => (
                <button
                  key={amenity.name}
                  className={`px-4 py-3 rounded-full border flex items-center gap-2 ${
                    localFilters.amenities.includes(amenity.name)
                      ? "border-black dark:border-white"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() => toggleFilterArray("amenities", amenity.name)}
                  aria-pressed={localFilters.amenities.includes(amenity.name)}
                >
                  {amenity.icon}
                  <span className="text-black dark:text-white">{amenity.name}</span>
                  {localFilters.amenities.includes(amenity.name) && (
                    <Check size={16} className="ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t mb-8 dark:border-gray-600">
            <button 
              className="flex justify-between items-center w-full mb-4 text-black dark:text-white"
              onClick={() => setMedicalExpanded(!medicalExpanded)}
              aria-expanded={medicalExpanded}
              aria-controls="medical-equipment-list"
            >
              <h3 className="font-medium text-xl">Health & Medical Equipment</h3>
              {medicalExpanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {medicalExpanded && (
              <div id="medical-equipment-list" className="space-y-4">
                {medicalEquipmentList.map((equipment) => (
                  <div key={equipment} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`medical-${equipment.replace(/\s+/g, '-').toLowerCase()}`}
                      checked={localFilters.medicalEquipment.includes(equipment)}
                      onChange={() => handleMedicalEquipment(equipment)}
                      className="mr-3 h-5 w-5"
                    />
                    <label htmlFor={`medical-${equipment.replace(/\s+/g, '-').toLowerCase()}`} className="text-black dark:text-white">{equipment}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Superhost Filter */}
          <div className="pt-4 border-t mb-8 dark:border-gray-600">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="superhost-filter"
                checked={localFilters.superhost}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    superhost: e.target.checked,
                  }))
                }
                className="mr-3 h-5 w-5"
              />
              <label htmlFor="superhost-filter" className="font-medium text-black dark:text-white">
                Show only Superhost listings
              </label>
            </div>
          </div>
        </div>
      
        <div className="flex justify-between items-center rounded-xl px-6 py-4 border-t bg-white dark:bg-gray-800">
          <button
            className="font-medium text-black dark:text-white underline"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            className="bg-black text-white px-6 py-3 rounded-lg font-medium dark:bg-white dark:text-black"
            onClick={handleApply}
          >
            Show places
          </button>
        </div>
      </div>
    </div>
  );
}
