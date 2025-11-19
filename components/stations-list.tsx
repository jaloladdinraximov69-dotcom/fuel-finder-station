"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import StationCard from "@/components/station-card"
import type { Station } from "@/lib/stations-data"

interface StationsListProps {
  stations: Station[]
  onStationSelect: (station: Station | null) => void
  selectedStation: Station | null
  onFilterChange?: (fuelType: string, sortBy: string) => void
}

export default function StationsList({ 
  stations, 
  onStationSelect, 
  selectedStation,
  onFilterChange 
}: StationsListProps) {
  const { t } = useLanguage()
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance")
  const [fuelFilter, setFuelFilter] = useState<string>("all")

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy as any)
    onFilterChange?.(fuelFilter, newSortBy)
  }

  const handleFilterChange = (newFilter: string) => {
    setFuelFilter(newFilter)
    onFilterChange?.(newFilter, sortBy)
  }

  const bestStation = stations.length > 0 ? stations[0] : null

  return (
    <div className="space-y-4 p-4">
      {bestStation && (
        <div className="bg-gradient-to-r from-accent to-primary rounded-xl p-4 text-white shadow-lg border border-accent/20">
          <p className="text-xs font-bold uppercase tracking-wide mb-1 opacity-90">
            {t("best_station", "Best Station", "Eng yaxshi zapravka")}
          </p>
          <p className="text-lg font-bold mb-1">{bestStation.name}</p>
          <p className="text-sm opacity-95">
            {t("highly_rated", "Highly rated and nearby", "Yuqori baholangan va yaqin")}
          </p>
        </div>
      )}

      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            {t("sort_by", "Sort by", "Saralash")}
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="distance">{t("nearest", "Nearest", "Eng yaqin")}</option>
            <option value="price">{t("lowest_price", "Lowest Price", "Eng arzon")}</option>
            <option value="rating">{t("highest_rating", "Highest Rating", "Eng yaxshi")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            {t("fuel_type", "Fuel Type", "Yoqilg'i turi")}
          </label>
          <select
            value={fuelFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t("all_types", "All Types", "Barcha turlar")}</option>
            <option value="AI-80">AI-80</option>
            <option value="AI-91">AI-91</option>
            <option value="AI-95">AI-95</option>
            <option value="Dizel">Dizel</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto pr-2">
        {stations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {t("no_stations", "No stations found", "Zapravkalar topilmadi")}
          </div>
        ) : (
          stations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              isSelected={selectedStation?.id === station.id}
              onSelect={() => onStationSelect(station)}
            />
          ))
        )}
      </div>
    </div>
  )
}
