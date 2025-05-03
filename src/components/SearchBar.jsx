import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [activeTab, setActiveTab] = useState("location");

  const totalGuests = guests.adults + guests.children;

  const handleSearch = () => {
    console.log("Searching with:", { location, dateRange, guests });
    setIsExpanded(false);
  };

  const resetSearch = () => {
    setLocation("");
    setDateRange({ from: "", to: "" });
    setGuests({ adults: 0, children: 0, infants: 0, pets: 0 });
  };

  const handleGuestChange = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto pt-20">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Search</h2>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-600 dark:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-4 border-b">
            {["location", "dates", "guests"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-3 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-rose-500 text-rose-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === "location" && (
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Where are you going?
                </label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full p-2 border rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}

            {activeTab === "dates" && (
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  When's your trip?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, from: e.target.value })
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, to: e.target.value })
                    }
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {activeTab === "guests" && (
              <div className="space-y-6">
                {["adults", "children", "infants", "pets"].map((type) => (
                  <div className="flex justify-between items-center" key={type}>
                    <div>
                      <h3 className="font-medium capitalize">{type}</h3>
                      <p className="text-sm text-gray-500">
                        {type === "adults"
                          ? "Ages 13+"
                          : type === "children"
                          ? "Ages 2–12"
                          : type === "infants"
                          ? "Under 2"
                          : "Service animals always welcome"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleGuestChange(type, -1)}
                        disabled={guests[type] === 0}
                        className="w-8 h-8 rounded-full border text-lg"
                      >
                        -
                      </button>
                      <span>{guests[type]}</span>
                      <button
                        onClick={() => handleGuestChange(type, 1)}
                        className="w-8 h-8 rounded-full border text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={resetSearch}
              className="text-sm text-gray-600 underline"
            >
              Clear all
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      {/* Mobile Search Bar */}
      <div
        className="md:hidden w-full mx-4 flex items-center border rounded-full shadow-md bg-white p-4 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <Search className="h-5 w-5 text-gray-500 mr-3" />
        <div className="text-gray-500">Where to?</div>
        <div className="ml-auto flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border">
            <span className="text-lg">⚙️</span>
          </div>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex w-full max-w-3xl items-center border rounded-full shadow-sm bg-white">
        <div className="flex-1 px-6 py-3">
          <div className="text-sm font-medium">Where</div>
          <input
            className="text-sm text-gray-500 outline-none w-full bg-transparent"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="border-l h-12"></div>

        <div className="px-6 py-3">
          <div className="text-sm font-medium">Check in</div>
          <div className="text-sm text-gray-500">Add dates</div>
        </div>

        <div className="border-l h-12"></div>

        <div className="px-6 py-3">
          <div className="text-sm font-medium">Check out</div>
          <div className="text-sm text-gray-500">Add dates</div>
        </div>

        <div className="border-l h-12"></div>

        <div className="px-6 py-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Who</div>
            <div className="text-sm text-gray-500">
              {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
            </div>
          </div>

          <button className="ml-12 p-3 rounded-full bg-rose-500 text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
