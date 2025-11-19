export interface GasStation {
  id: number
  name: { uz: string; en: string; ru: string }
  address: { uz: string; en: string; ru: string }
  lat: number
  lng: number
  fuel_types: string[]
  prices: { [key: string]: number }
  rating: number
}

export const gasStations: GasStation[] = [
  {
    id: 1,
    name: { uz: "EkoYo'l Zapravkasi", en: "EcoFuel Station", ru: "ЭкоТопливо" },
    address: { uz: "Yunusobod 4-kvartal, Toshkent", en: "Yunusobod 4, Tashkent", ru: "Юнусабад 4, Ташкент" },
    lat: 41.3432,
    lng: 69.2854,
    fuel_types: ["AI-92", "AI-95", "Diesel"],
    prices: { "AI-92": 9800, "AI-95": 10800, Diesel: 10500 },
    rating: 4.7,
  },
  {
    id: 2,
    name: { uz: "AvtoEnergiya", en: "AutoEnergy", ru: "АвтоЭнергия" },
    address: { uz: "Chilonzor 5-mavze, Toshkent", en: "Chilonzor 5, Tashkent", ru: "Чиланзар 5, Ташкент" },
    lat: 41.2856,
    lng: 69.2023,
    fuel_types: ["AI-80", "AI-92"],
    prices: { "AI-80": 8700, "AI-92": 9500 },
    rating: 4.3,
  },
  {
    id: 3,
    name: { uz: "Oktans Zapravkasi", en: "Octane Station", ru: "Октан" },
    address: { uz: "Mirzo Ulugbek 44, Toshkent", en: "Mirzo Ulugbek 44, Tashkent", ru: "Мирзо Улугбек 44, Ташкент" },
    lat: 41.3178,
    lng: 69.1842,
    fuel_types: ["AI-92", "AI-95"],
    prices: { "AI-92": 9900, "AI-95": 11000 },
    rating: 4.5,
  },
  {
    id: 4,
    name: { uz: "Sharaf Zapravkasi", en: "Sharaf Fuel", ru: "Шараф Топливо" },
    address: { uz: "Amir Temur 23, Toshkent", en: "Amir Temur 23, Tashkent", ru: "Амир Тимур 23, Ташкент" },
    lat: 41.2885,
    lng: 69.2242,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Diesel"],
    prices: { "AI-80": 8600, "AI-92": 9400, "AI-95": 10700, Diesel: 10400 },
    rating: 4.8,
  },
  {
    id: 5,
    name: { uz: "Oltin Yoqilg'i", en: "Golden Fuel", ru: "Золотое Топливо" },
    address: { uz: "Sergeli 1, Toshkent", en: "Sergeli 1, Tashkent", ru: "Сергели 1, Ташкент" },
    lat: 41.2345,
    lng: 69.1567,
    fuel_types: ["AI-92", "Diesel"],
    prices: { "AI-92": 9700, Diesel: 10200 },
    rating: 4.2,
  },
]

export function getGasStations(): GasStation[] {
  return gasStations
}

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
