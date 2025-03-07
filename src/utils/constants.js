// Reusable constants (e.g., price ranges)
// Price ranges in USD
export const PRICE_RANGES = [
    { label: 'Under $50k', min: 0, max: 50000 },
    { label: '$50k - $100k', min: 50000, max: 100000 },
    { label: '$100k - $200k', min: 100000, max: 200000 },
    { label: '$200k - $500k', min: 200000, max: 500000 },
    { label: 'Over $500k', min: 500000, max: Infinity }
  ]
  
  // Property types
  export const PROPERTY_TYPES = [
    'House',
    'Apartment',
    'Condominium',
    'Townhouse',
    'Villa',
    'Commercial'
  ]
  
  // Available utilities
  export const UTILITIES = [
    'Water',
    'Electricity',
    'Gas',
    'Internet',
    'Cable TV',
    'Parking'
  ]
  
  // Default filter values
  export const DEFAULT_FILTERS = {
    priceRange: [0, Infinity],
    propertyType: [],
    utilities: [],
    bedrooms: 0,
    bathrooms: 0
  }
  
  // Map configuration
  export const MAP_CONFIG = {
    defaultZoom: 11,
    defaultCenter: [51.505, -0.09], // Default to London
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution: '&copy; OpenStreetMap contributors'
  }