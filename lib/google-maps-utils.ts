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
  {
    id: "7",
    name: "Xorazm Oil - Urganch Markaz",
    address: "Al-Xorazmiy ko'chasi 78, Urganch, Xorazm",
    lat: 41.5512,
    lng: 60.6351,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10180, "AI-95": 11180, Diesel: 10980 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "8",
    name: "Gurlan Zapravkasi",
    address: "Mustaqillik ko'chasi, Gurlan, Xorazm",
    lat: 41.8453,
    lng: 60.3854,
    fuel_types: ["AI-80", "AI-92", "Diesel"],
    prices: { "AI-80": 9550, "AI-92": 10150, Diesel: 10900 },
    rating: 4.4,
    openNow: true,
  },
  {
    id: "9",
    name: "Xonqa Fuel Station",
    address: "Yangibozor ko'chasi, Xonqa, Xorazm",
    lat: 41.7234,
    lng: 60.8854,
    fuel_types: ["AI-92", "AI-95"],
    prices: { "AI-92": 10200, "AI-95": 11200 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "10",
    name: "Bog'ot Zapravkasi",
    address: "Toshkent yo'li, Bog'ot, Xorazm",
    lat: 41.5345,
    lng: 60.9567,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10100, Diesel: 10850 },
    rating: 4.3,
    openNow: false,
  },
  {
    id: "11",
    name: "Hazorasp Yoqilg'i",
    address: "Amir Temur ko'chasi, Hazorasp, Xorazm",
    lat: 41.3234,
    lng: 61.0678,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Diesel"],
    prices: { "AI-80": 9580, "AI-92": 10220, "AI-95": 11220, Diesel: 11020 },
    rating: 4.7,
    openNow: true,
  },
  {
    id: "12",
    name: "Shovot Fuel",
    address: "Dustlik ko'chasi, Shovot, Xorazm",
    lat: 41.6234,
    lng: 60.3145,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10150, Diesel: 10900 },
    rating: 4.4,
    openNow: true,
  },
  {
    id: "13",
    name: "Urganch Avto Benzin",
    address: "Shahrisabz ko'chasi 25, Urganch, Xorazm",
    lat: 41.5489,
    lng: 60.6187,
    fuel_types: ["AI-80", "AI-92", "AI-95"],
    prices: { "AI-80": 9500, "AI-92": 10100, "AI-95": 11100 },
    rating: 4.6,
    openNow: true,
  },
  {
    id: "14",
    name: "Qo'shko'pir Zapravkasi",
    address: "Buxoro yo'li, Qo'shko'pir, Xorazm",
    lat: 41.5312,
    lng: 60.3456,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10180, Diesel: 10950 },
    rating: 4.2,
    openNow: true,
  },
  {
    id: "15",
    name: "Xiva Ichon Qal'a Fuel",
    address: "Poylvon Qori ko'chasi, Xiva, Xorazm",
    lat: 41.3778,
    lng: 60.3589,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10300, "AI-95": 11300, Diesel: 11100 },
    rating: 4.9,
    openNow: true,
  },
  {
    id: "16",
    name: "Yangiariq Zapravkasi",
    address: "Navoiy ko'chasi, Yangiariq, Xorazm",
    lat: 41.1856,
    lng: 60.8234,
    fuel_types: ["AI-80", "AI-92"],
    prices: { "AI-80": 9600, "AI-92": 10250 },
    rating: 4.1,
    openNow: false,
  },
  {
    id: "17",
    name: "Urganch Sharq Fuel",
    address: "Sharq darvoza, Urganch, Xorazm",
    lat: 41.5678,
    lng: 60.6512,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 10200, "AI-95": 11200, Diesel: 11000 },
    rating: 4.5,
    openNow: true,
  },
  {
    id: "18",
    name: "Xiva Avtoyol Zapravka",
    address: "Toshkent-Xiva yo'li, Xiva, Xorazm",
    lat: 41.3945,
    lng: 60.3712,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 10280, Diesel: 11080 },
    rating: 4.3,
    openNow: true,
  },
]
