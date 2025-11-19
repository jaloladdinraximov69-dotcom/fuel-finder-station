"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/hooks/use-language"
import { getGasStations, calculateDistance } from "@/lib/stations-data"
import StationCard from "@/components/station-card"

interface StationsListProps {
  userLocation: {
    latitude: number
    longitude: number
  }
  onSelectStation: (id: number) => void
  selectedStationId: number | null
}

export default function StationsList({ userLocation, onSelectStation, selectedStationId }: StationsListProps) {
  const { t, language } = useLanguage()
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance")
  const [fuelFilter, setFuelFilter] = useState<string>("all")

  const stations = useMemo(() => {
    let filtered = getGasStations()

    // Filter by fuel type
    if (fuelFilter !== "all") {
      filtered = filtered.filter((s) => s.fuel_types.includes(fuelFilter))
    }

    // Calculate distances
    const withDistance = filtered.map((station) => ({
      ...station,
      distance: calculateDistance(userLocation.latitude, userLocation.longitude, station.lat, station.lng),
    }))

    // Sort
    switch (sortBy) {
      case "distance":
        return withDistance.sort((a, b) => a.distance - b.distance)
      case "price":
        return withDistance.sort((a, b) => {
          const priceA = Math.min(...Object.values(a.prices))
          const priceB = Math.min(...Object.values(b.prices))
          return priceA - priceB
        })
      case "rating":
        return withDistance.sort((a, b) => b.rating - a.rating)
      default:
        return withDistance
    }
  }, [sortBy, fuelFilter, userLocation])

  const bestStation = stations.length > 0 ? stations[0] : null

  return (
    <div className="space-y-4">
      {/* Best Station Recommendation */}
      {bestStation && (
        <div className="bg-gradient-to-r from-accent to-primary rounded-xl p-4 text-white shadow-lg border border-accent/20">
          <p className="text-xs font-bold uppercase tracking-wide mb-1 opacity-90">{t("best_station")}</p>
          <p className="text-lg font-bold mb-1">{bestStation.name[language as keyof typeof bestStation.name]}</p>
          <p className="text-sm opacity-95">{t("highly_rated")}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">{t("sort_by")}</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="distance">{t("nearest")}</option>
            <option value="price">{t("lowest_price")}</option>
            <option value="rating">{t("highest_rating")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">{t("fuel_type")}</label>
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t("all_types")}</option>
            <option value="AI-80">AI-80</option>
            <option value="AI-92">AI-92</option>
            <option value="AI-95">AI-95</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>
      </div>

      {/* Stations List */}
      <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto pr-2">
        {stations.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            distance={calculateDistance(userLocation.latitude, userLocation.longitude, station.lat, station.lng)}
            isSelected={station.id === selectedStationId}
            onSelect={() => onSelectStation(station.id)}
          />
        ))}
      </div>
    </div>
  )
}
