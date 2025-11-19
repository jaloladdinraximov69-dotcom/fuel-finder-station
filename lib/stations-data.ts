export interface Station {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  fuel_types: string[]
  price: number
  rating?: number
  distance?: string
}

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

export const mockStations: Station[] = [
  {
    id: 1,
    name: "Xorazm Yoqilg'i - Urganch",
    address: "Amir Temur ko'chasi, Urganch, Xorazm",
    latitude: 41.5598,
    longitude: 60.627,
    fuel_types: ["AI-92", "AI-95", "Dizel"],
    price: 10200,
    rating: 4.7,
  },
  {
    id: 2,
    name: "OzbekGaz - Urganch",
    address: "Navoi ko'chasi 12, Urganch",
    latitude: 41.5455,
    longitude: 60.6404,
    fuel_types: ["AI-80", "AI-92", "Dizel"],
    price: 10100,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Shamol Zapravkasi",
    address: "Istiqlol ko'chasi 45, Urganch",
    latitude: 41.5687,
    longitude: 60.6138,
    fuel_types: ["AI-92", "AI-95"],
    price: 10150,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Zarafshon Fuel - Xiva",
    address: "Qo'qon ko'chasi, Xiva",
    latitude: 41.3868,
    longitude: 60.3634,
    fuel_types: ["AI-92", "Dizel"],
    price: 10300,
    rating: 4.4,
  },
  {
    id: 5,
    name: "Silk Road Fuel",
    address: "O'zbekiston ko'chasi, Xiva",
    latitude: 41.3925,
    longitude: 60.3698,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Dizel"],
    price: 10250,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Tuyoq Zapravkasi - Taxiatash",
    address: "Farg'ona ko'chasi, Taxiatash",
    latitude: 41.8156,
    longitude: 60.5341,
    fuel_types: ["AI-92", "Dizel"],
    price: 10100,
    rating: 4.3,
  },
  {
    id: 7,
    name: "Xorazm Oil - Urganch Markaz",
    address: "Al-Xorazmiy ko'chasi 78, Urganch",
    latitude: 41.5512,
    longitude: 60.6351,
    fuel_types: ["AI-92", "AI-95", "Dizel"],
    price: 10180,
    rating: 4.6,
  },
  {
    id: 8,
    name: "Gurlan Zapravkasi",
    address: "Mustaqillik ko'chasi, Gurlan",
    latitude: 41.8453,
    longitude: 60.3854,
    fuel_types: ["AI-80", "AI-92", "Dizel"],
    price: 10150,
    rating: 4.4,
  },
  {
    id: 9,
    name: "Xonqa Fuel Station",
    address: "Yangibozor ko'chasi, Xonqa",
    latitude: 41.7234,
    longitude: 60.8854,
    fuel_types: ["AI-92", "AI-95"],
    price: 10200,
    rating: 4.5,
  },
  {
    id: 10,
    name: "Bog'ot Zapravkasi",
    address: "Toshkent yo'li, Bog'ot",
    latitude: 41.5345,
    longitude: 60.9567,
    fuel_types: ["AI-92", "Dizel"],
    price: 10100,
    rating: 4.3,
  },
  {
    id: 11,
    name: "Hazorasp Yoqilg'i",
    address: "Amir Temur ko'chasi, Hazorasp",
    latitude: 41.3234,
    longitude: 61.0678,
    fuel_types: ["AI-80", "AI-92", "AI-95", "Dizel"],
    price: 10220,
    rating: 4.7,
  },
  {
    id: 12,
    name: "Shovot Fuel",
    address: "Dustlik ko'chasi, Shovot",
    latitude: 41.6234,
    longitude: 60.3145,
    fuel_types: ["AI-92", "Dizel"],
    price: 10150,
    rating: 4.4,
  },
  {
    id: 13,
    name: "Urganch Avto Benzin",
    address: "Shahrisabz ko'chasi 25, Urganch",
    latitude: 41.5489,
    longitude: 60.6187,
    fuel_types: ["AI-80", "AI-92", "AI-95"],
    price: 10100,
    rating: 4.6,
  },
  {
    id: 14,
    name: "Qo'shko'pir Zapravkasi",
    address: "Buxoro yo'li, Qo'shko'pir",
    latitude: 41.5312,
    longitude: 60.3456,
    fuel_types: ["AI-92", "Dizel"],
    price: 10180,
    rating: 4.2,
  },
  {
    id: 15,
    name: "Xiva Ichon Qal'a Fuel",
    address: "Poylvon Qori ko'chasi, Xiva",
    latitude: 41.3778,
    longitude: 60.3589,
    fuel_types: ["AI-92", "AI-95", "Dizel"],
    price: 10300,
    rating: 4.9,
  },
  {
    id: 16,
    name: "Yangiariq Zapravkasi",
    address: "Navoiy ko'chasi, Yangiariq",
    latitude: 41.1856,
    longitude: 60.8234,
    fuel_types: ["AI-80", "AI-92"],
    price: 10250,
    rating: 4.1,
  },
  {
    id: 17,
    name: "Urganch Sharq Fuel",
    address: "Sharq darvoza, Urganch",
    latitude: 41.5678,
    longitude: 60.6512,
    fuel_types: ["AI-92", "AI-95", "Dizel"],
    price: 10200,
    rating: 4.5,
  },
  {
    id: 18,
    name: "Xiva Avtoyol Zapravka",
    address: "Toshkent-Xiva yo'li, Xiva",
    latitude: 41.3945,
    longitude: 60.3712,
    fuel_types: ["AI-92", "Dizel"],
    price: 10280,
    rating: 4.3,
  },
]

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

export function getGasStations(): GasStation[] {
  // Convert mockStations to GasStation format
  return mockStations.map(station => ({
    id: station.id,
    name: { uz: station.name, en: station.name, ru: station.name },
    address: { uz: station.address, en: station.address, ru: station.address },
    lat: station.latitude,
    lng: station.longitude,
    fuel_types: station.fuel_types,
    prices: station.fuel_types.reduce((acc, type) => ({ ...acc, [type]: station.price }), {}),
    rating: station.rating || 4.0,
  }))
}
