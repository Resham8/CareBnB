import React, { useRef, useState, useEffect } from 'react';
import AirbnbFiltersModal from './FilterModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Mountain, 
  Umbrella, 
  Home, 
  Paintbrush, 
  Mountain as MountainIcon, 
  Castle, 
  Trees, 
  Sparkles, 
  TreePine, 
  Tent, 
  Waves, 
  Snowflake, 
  TreePalm, 
  Building, 
  SlidersHorizontal
} from 'lucide-react';


const categories = [
  { id: 'amazing-views', name: 'Amazing views', icon: Mountain },
  { id: 'beaches', name: 'Beaches', icon: Umbrella },
  { id: 'tiny-homes', name: 'Tiny homes', icon: Home },
  { id: 'design', name: 'Design', icon: Paintbrush },
  { id: 'countryside', name: 'Countryside', icon: MountainIcon },
  { id: 'mansions', name: 'Mansions', icon: Castle },
  { id: 'cabins', name: 'Cabins', icon: Trees },
  { id: 'luxury', name: 'Luxury', icon: Sparkles },
  { id: 'treehouses', name: 'Treehouses', icon: TreePine },
  { id: 'camping', name: 'Camping', icon: Tent },
  { id: 'lakefront', name: 'Lakefront', icon: Waves },
  { id: 'skiing', name: 'Skiing', icon: Snowflake },
  { id: 'tropical', name: 'Tropical', icon: TreePalm },
  { id: 'historic', name: 'Historic homes', icon: Building },
  { id: 'islands', name: 'Islands', icon: TreePalm },
];

const FilterBar = ({ onApplyFilters, currentFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleApplyFilters = (newFilters) => {
    onApplyFilters(newFilters);
    setShowFilters(false);
  };

  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft);
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="relative py-4 dark:bg-gray-900">      
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 border border-gray-200 dark:border-gray-700"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </button>
      )}
            
      <div 
        ref={scrollContainerRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              className={`flex flex-col items-center space-y-2 min-w-fit pb-3 border-b-2 transition-colors ${
                selectedCategory === category.id
                  ? 'border-gray-800 dark:border-white text-gray-800 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
      
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-16 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 border border-gray-200 dark:border-gray-700"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </button>
      )}
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
        >
          <SlidersHorizontal size={16} className=" text-gray-500 dark:text-gray-300" />
          <span className="font-medium text-sm dark:text-gray-100">Filters</span>
        </button>
      </div>

      {showFilters && (
        <AirbnbFiltersModal 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onApply={handleApplyFilters}
          initialFilters={currentFilters}
        />
      )}
    </div>
  );
};

export default FilterBar;