import { useState } from 'react';
import { X, Plus, ChevronDown, ChevronUp, Zap, Check, Wifi, Search } from 'lucide-react';

export default function AirbnbFiltersModal({showFilters, setShowFilters}) { 
  const [priceMin, setPriceMin] = useState('₹4300');
  const [priceMax, setPriceMax] = useState('₹200000');
  const [placeType, setPlaceType] = useState('Any type');
  const [propertyExpanded, setPropertyExpanded] = useState(true);
  const [accessibilityExpanded, setAccessibilityExpanded] = useState(true);
  const [hostLanguageExpanded, setHostLanguageExpanded] = useState(true);    
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedBookingOptions, setSelectedBookingOptions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [medicalExpanded, setMedicalExpanded] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  const toggleMedicalExpanded = () => setMedicalExpanded(prev => !prev);

  const togglePropertyExpanded = () => {
    setPropertyExpanded(!propertyExpanded);
  };

  const toggleAccessibilityExpanded = () => {
    setAccessibilityExpanded(!accessibilityExpanded);
  };

  const toggleHostLanguageExpanded = () => {
    setHostLanguageExpanded(!hostLanguageExpanded);
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const toggleBookingOption = (option) => {
    if (selectedBookingOptions.includes(option)) {
      setSelectedBookingOptions(selectedBookingOptions.filter(o => o !== option));
    } else {
      setSelectedBookingOptions([...selectedBookingOptions, option]);
    }
  };

  const togglePropertyType = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  return (
    <div className="font-sans">
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-2xl flex flex-col h-screen md:h-[90vh]">            
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={toggleFilters} className="rounded-full p-2 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>
                        
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-6">                
                <div className="mb-8">
                  <h3 className="font-medium text-xl mb-4">Type of place</h3>
                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 py-6 border rounded-lg ${placeType === 'Any type' ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => setPlaceType('Any type')}
                    >
                      <div className="text-center">Any type</div>
                    </button>
                    <button 
                      className={`flex-1 py-6 border rounded-lg ${placeType === 'Room' ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => setPlaceType('Room')}
                    >
                      <div className="text-center">Room</div>
                    </button>
                    <button 
                      className={`flex-1 py-6 border rounded-lg ${placeType === 'Entire home' ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => setPlaceType('Entire home')}
                    >
                      <div className="text-center">Entire home</div>
                    </button>
                  </div>
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <h3 className="font-medium text-xl mb-1">Price range</h3>
                  <p className="text-gray-500 mb-6">Trip price, includes all fees</p>
                                    
                  <div className="mb-6 h-16 flex items-end">
                    <div className="w-full flex items-end justify-between space-x-1">
                      {Array(30).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-rose-500 w-full" 
                          style={{
                            height: `${20 + Math.sin(i/3) * 15 + Math.random() * 10}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <div className="text-gray-500 text-sm mb-1">Minimum</div>
                      <div className="border border-gray-300 rounded-lg p-3">
                        <input 
                          type="text" 
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                          className="w-full outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-300 w-4"></div>
                    
                    <div className="flex-1">
                      <div className="text-gray-500 text-sm mb-1">Maximum</div>
                      <div className="border border-gray-300 rounded-lg p-3">
                        <input 
                          type="text" 
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                          className="w-full outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <h3 className="font-medium text-xl mb-4">Rooms and beds</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Bedrooms</span>
                      <div className="flex items-center">
                        <span className="mr-4 font-medium">Any</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Beds</span>
                      <div className="flex items-center">
                        <span className="mr-4 font-medium">Any</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Bathrooms</span>
                      <div className="flex items-center">
                        <span className="mr-4 font-medium">Any</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <h3 className="font-medium text-xl mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Wifi') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Wifi')}
                    >
                      <Wifi size={16} />
                      <span>Wifi</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Kitchen') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Kitchen')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6 6h6v2h-6v-2z" fill="currentColor"/>
                      </svg>
                      <span>Kitchen</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Washing machine') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Washing machine')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor"/>
                        <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm0 2h16v12H4V6z" fill="currentColor"/>
                        <circle cx="8" cy="8" r="2" fill="currentColor"/>
                      </svg>
                      <span>Washing machine</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Dryer') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Dryer')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor"/>
                        <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm0 2h16v12H4V6z" fill="currentColor"/>
                        <path d="M9 8h6M7 8h1M7 6h1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>Dryer</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Air conditioning') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Air conditioning')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-10 1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                      </svg>
                      <span>Air conditioning</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedAmenities.includes('Heating') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleAmenity('Heating')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor"/>
                        <path d="M12 4V2M12 22v-2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41M4 12H2M22 12h-2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Heating</span>
                    </button>
                  </div>
                  <button className="flex items-center text-black font-medium gap-1 mt-4">
                    <span>Show more</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
                                
                <div className="pt-8 border-t mb-8">
                  <h3 className="font-medium text-xl mb-4">Booking options</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedBookingOptions.includes('Instant Book') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleBookingOption('Instant Book')}
                    >
                      <Zap size={16} />
                      <span>Instant Book</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedBookingOptions.includes('Self check-in') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleBookingOption('Self check-in')}
                    >
                      <Search size={16} />
                      <span>Self check-in</span>
                    </button>
                    <button 
                      className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedBookingOptions.includes('Allows pets') ? 'border-black' : 'border-gray-300'}`}
                      onClick={() => toggleBookingOption('Allows pets')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 8a6 6 0 1 1 12 0A6 6 0 0 1 4 8z" fill="currentColor"/>
                        <path d="M16 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" fill="currentColor"/>
                        <path d="M7 16a3 3 0 0 0-3 3v1h2v-1a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1h2v-1a3 3 0 0 0-3-3H7z" fill="currentColor"/>
                      </svg>
                      <span>Allows pets</span>
                    </button>
                  </div>
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <h3 className="font-medium text-xl mb-4">Standout stays</h3>
                  <div className="border border-gray-300 rounded-lg p-4 max-w-md">
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                          <path d="M12 2L6.44 11h11.12L12 2zm0 4l2.76 5H9.24L12 6z" fill="currentColor"/>
                          <path d="M12 22l5.56-9H6.44L12 22zm0-4l-2.76-5h5.52L12 18z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-base">Guest favourite</h4>
                        <p className="text-gray-600 text-sm">The most loved homes on Airbnb</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t mb-8">
  <div className="flex justify-between items-center">
    <h3 className="font-medium text-xl">Health & Medical Equipment</h3>
    <button onClick={toggleMedicalExpanded}>
      {medicalExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  </div>

  {medicalExpanded && (
    <div className="mt-4 space-y-4">
      <div className="flex items-center">
        <input type="checkbox" id="first-aid" className="mr-3 h-5 w-5" />
        <label htmlFor="first-aid">First Aid Kit</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="bp-monitor" className="mr-3 h-5 w-5" />
        <label htmlFor="bp-monitor">Blood Pressure Monitor</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="thermometer" className="mr-3 h-5 w-5" />
        <label htmlFor="thermometer">Digital Thermometer</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="sugar-checker" className="mr-3 h-5 w-5" />
        <label htmlFor="sugar-checker">Glucometer (Sugar Check)</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="emergency-kit" className="mr-3 h-5 w-5" />
        <label htmlFor="emergency-kit">Emergency Medication Kit</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="pulse-oximeter" className="mr-3 h-5 w-5" />
        <label htmlFor="pulse-oximeter">Pulse Oximeter</label>
      </div>
    </div>
  )}
</div>


                <div className="pt-8 border-t mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-xl">Property type</h3>
                    <button onClick={togglePropertyExpanded}>
                      {propertyExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  
                  {propertyExpanded && (
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedPropertyTypes.includes('House') ? 'border-black' : 'border-gray-300'}`}
                        onClick={() => togglePropertyType('House')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3L4 9v12h16V9l-8-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>House</span>
                      </button>
                      <button 
                        className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedPropertyTypes.includes('Flat') ? 'border-black' : 'border-gray-300'}`}
                        onClick={() => togglePropertyType('Flat')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 21h18v-9l-9-6-9 6v9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Flat</span>
                      </button>
                      <button 
                        className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedPropertyTypes.includes('Guest house') ? 'border-black' : 'border-gray-300'}`}
                        onClick={() => togglePropertyType('Guest house')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 21V8l8-5 8 5v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 17h6M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Guest house</span>
                      </button>
                      <button 
                        className={`px-4 py-3 rounded-full border flex items-center gap-2 ${selectedPropertyTypes.includes('Hotel') ? 'border-black' : 'border-gray-300'}`}
                        onClick={() => togglePropertyType('Hotel')}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 22h20V11H2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Hotel</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-xl">Accessibility features</h3>
                    <button onClick={toggleAccessibilityExpanded}>
                      {accessibilityExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  
                  {accessibilityExpanded && (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="step-free" className="mr-3 h-5 w-5" />
                        <label htmlFor="step-free">Step-free entrance</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="wide-doorways" className="mr-3 h-5 w-5" />
                        <label htmlFor="wide-doorways">Wide doorways</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="accessible-bathroom" className="mr-3 h-5 w-5" />
                        <label htmlFor="accessible-bathroom">Accessible bathroom</label>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-8 border-t mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-xl">Host language</h3>
                    <button onClick={toggleHostLanguageExpanded}>
                      {hostLanguageExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  
                  {hostLanguageExpanded && (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="english" className="mr-3 h-5 w-5" />
                        <label htmlFor="english">English</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="french" className="mr-3 h-5 w-5" />
                        <label htmlFor="french">French</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="spanish" className="mr-3 h-5 w-5" />
                        <label htmlFor="spanish">Spanish</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="german" className="mr-3 h-5 w-5" />
                        <label htmlFor="german">German</label>
                      </div>
                    </div>
                  )}
                </div>

              </div>                           
              <div className="h-6"></div>
            </div>
                        
            <div className="flex justify-between items-center px-6 py-4 border-t bg-white">
              <button className="font-medium text-black underline">
                Clear all
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium">
                Show 1,000+ places
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}