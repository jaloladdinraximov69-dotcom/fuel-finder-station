export interface GoogleMapsStation {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  fuel_types?: string[]
  prices?: { [key: string]: number }
  rating: number
  imageUrl?: string
  openNow?: boolean
}

// Khorezm region coordinates
export const KHOREZM_CENTER = {
  lat: 41.5526,
  lng: 60.6269,
}

export const KHOREZM_BOUNDS = {
  north: 42.0,
  south: 41.0,
  east: 61.5,
  west: 59.5,
}

// Calculate distance using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Format price in UZS
export function formatPrice(price: number): string {
  return `${price.toLocaleString("uz-UZ")} so'm`
}

// Sample gas stations in Khorezm (real coordinates)
export const khorezmStations: GoogleMapsStation[] = [
  {
    id: "1",
    name: "Xorazm Yoqilg'i - Urganch",
    address: "Amir Temur ko'chasi, Urganch, Xorazm",
    lat: 41.5598,
    lng: 60.627,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10200, "AI-95": 11200, Diesel: 11000 },
    rating: 4.7,
    openNow: true,
  },
  {
    id: "2",
    name: "OzbekGaz - Urganch",
    address: "Navoi ko'chasi 12, Urganch, Xorazm",
    lat: 41.5455,
    lng: 60.6404,
    fuel_types: ["AI-80", "AI-92", "Diesel"],
    prices: { "AI-80": 9500, "AI-92": 10100, Diesel: 10800 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "3",
    name: "Shamol Zapravkasi",
    address: "Istiqlol ko'chasi 45, Urganch, Xorazm",
    lat: 41.5687,
    lng: 60.6138,
    fuel_types: ["AI-92", "AI-95"],
    prices: { "AI-92": 10150, "AI-95": 11150 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "4",
    name: "Zarafshon Fuel - Khiva",
    address: "Qo'qon ko'chasi, Xiva, Xorazm",
    lat: 41.3868,
    lng: 60.3634,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10300, Diesel: 11050 },
    rating: 4.4,
    openNow: false,
  },
  {
    id: "5",
    name: "Silk Road Fuel",
    address: "O'zbekiston ko'chasi, Xiva, Xorazm",
    lat: 41.3925,
    lng: 60.3698,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Diesel"],
    prices: {
      "AI-80": 9600,
      "AI-92": 10250,
      "AI-95": 11250,
      Diesel: 11100,
    },
    rating: 4.8,
    openNow: true,
  },
  {
    id: "6",
    name: "Tuyoq Zapravkasi - Taxiatash",
    address: "Farg'ona ko'chasi, Taxiatash, Xorazm",
    lat: 41.8156,
    lng: 60.5341,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10100, Diesel: 10950 },
    rating: 4.3,
    openNow: true,
  },
]
