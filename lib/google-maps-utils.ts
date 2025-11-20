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
    name: "Chinobod oil",
    address: "Urgench, Xorazm Region",
    lat: 41.55,
    lng: 60.625,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10200, "AI-95": 11200, Diesel: 11000 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "2",
    name: "Metan gaz",
    address: "GJHF+9X, Urgench, Xorazm Region",
    lat: 41.5283,
    lng: 60.6247,
    fuel_types: ["Metan"],
    prices: { Metan: 5500 },
    rating: 3.7,
    openNow: true,
  },
  {
    id: "3",
    name: "Metan Toshbozor",
    address: "JH3R+WW, Urgench, Xorazm Region",
    lat: 41.5547,
    lng: 60.6422,
    fuel_types: ["Metan"],
    prices: { Metan: 5500 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "4",
    name: "Inoyat invest",
    address: "GHGJ+9G6, Хива йули, Urgench",
    lat: 41.4758,
    lng: 60.6311,
    fuel_types: ["Diesel"],
    prices: { Diesel: 11000 },
    rating: 5.0,
    openNow: true,
  },
  {
    id: "5",
    name: "MMS Metan Zapravka",
    address: "R-159, Urgench",
    lat: 41.5442,
    lng: 60.6492,
    fuel_types: ["Metan", "Diesel"],
    prices: { Metan: 5500, Diesel: 11000 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "6",
    name: "Turon Oil Petrol Station",
    address: "A-380, Urganch, Xorazm",
    lat: 41.55063,
    lng: 60.63144,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10200, "AI-95": 11200, Diesel: 11000 },
    rating: 4.7,
    openNow: true,
  },
  {
    id: "7",
    name: "O'ZNEFTMAHSULOT AJ Urganch AZS №55",
    address: "Al-Xorazmiy ko'chasi, Urganch",
    lat: 41.55425,
    lng: 60.62489,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Diesel"],
    prices: { "AI-80": 9500, "AI-92": 10100, "AI-95": 11100, Diesel: 10800 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "8",
    name: "AZS Xiva",
    address: "Yangi Xiva yo'li, Xiva",
    lat: 41.38883,
    lng: 60.35953,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10300, "AI-95": 11300, Diesel: 11050 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "9",
    name: "AZS №32",
    address: "Toshkent yo'li, Urganch",
    lat: 41.54389,
    lng: 60.61156,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10150, Diesel: 10950 },
    rating: 4.4,
    openNow: true,
  },
  {
    id: "10",
    name: "O'ZNEFTMAHSULOT Xiva",
    address: "Al-Xorazmiy ko'chasi, Xiva",
    lat: 41.37856,
    lng: 60.36289,
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
    id: "11",
    name: "Turon Oil - Gurlan",
    address: "Mustaqillik ko'chasi, Gurlan",
    lat: 41.84532,
    lng: 60.38545,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10100, Diesel: 10950 },
    rating: 4.3,
    openNow: true,
  },
  {
    id: "12",
    name: "AZS Urganch Markaz",
    address: "Navoi ko'chasi, Urganch",
    lat: 41.55127,
    lng: 60.63518,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10180, "AI-95": 11180, Diesel: 10980 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "13",
    name: "Benzin Quyish Shoxobchasi - Hazorasp",
    address: "Amir Temur ko'chasi, Hazorasp",
    lat: 41.32345,
    lng: 61.06784,
    fuel_types: ["AI-80", "AI-92", "Diesel"],
    prices: { "AI-80": 9550, "AI-92": 10150, Diesel: 10900 },
    rating: 4.4,
    openNow: true,
  },
  {
    id: "14",
    name: "AZS Xonqa",
    address: "Yangibozor yo'li, Xonqa",
    lat: 41.72345,
    lng: 60.88543,
    fuel_types: ["AI-92", "AI-95"],
    prices: { "AI-92": 10200, "AI-95": 11200 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "15",
    name: "Benzin Quyish - Bog'ot",
    address: "Toshkent yo'li, Bog'ot",
    lat: 41.53453,
    lng: 60.95674,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10100, Diesel: 10850 },
    rating: 4.3,
    openNow: true,
  },
  {
    id: "16",
    name: "Turon Oil - Shovot",
    address: "Dustlik ko'chasi, Shovot",
    lat: 41.62345,
    lng: 60.31456,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10150, Diesel: 10900 },
    rating: 4.4,
    openNow: true,
  },
  {
    id: "17",
    name: "AZS Qo'shko'pir",
    address: "Buxoro yo'li, Qo'shko'pir",
    lat: 41.53125,
    lng: 60.34567,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10180, Diesel: 10950 },
    rating: 4.2,
    openNow: true,
  },
]
