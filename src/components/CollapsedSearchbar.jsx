import React from "react";
import { Search } from "lucide-react";

export default function CollapsedSearchbar({ isMobile }) {
  if (isMobile) return null;

  return (
    <div className="hidden md:flex items-center border rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
      <button className="px-4 font-medium text-sm">Anywhere</button>
      <span className="h-5 border-r border-gray-300 dark:border-gray-600"></span>
      <button className="px-4 font-medium text-sm">Any week</button>
      <span className="h-5 border-r border-gray-300 dark:border-gray-600"></span>
      <button className="px-4 text-gray-500 dark:text-gray-400 text-sm">
        Add guests
      </button>

      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500 text-white hover:bg-rose-600 ml-2">
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
}
