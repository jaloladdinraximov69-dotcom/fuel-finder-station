"use client"

import { useLanguage } from "@/hooks/use-language"
import { Star, Fuel, Navigation } from "lucide-react"

interface StationCardProps {
  station: any
  distance: number
  isSelected: boolean
  onSelect: () => void
}

export default function StationCard({ station, distance, isSelected, onSelect }: StationCardProps) {
  const { t, language } = useLanguage()

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`
    window.open(mapsUrl, "_blank")
  }

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 cursor-pointer transition duration-200 ${
        isSelected
          ? "bg-primary/5 border-primary shadow-md"
          : "bg-card border-border hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-base">{station.name[language as keyof typeof station.name]}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {station.address[language as keyof typeof station.address]}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg ml-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-bold text-accent">{station.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mb-4 space-y-2 py-3 border-y border-border">
        {Object.entries(station.prices).map(([fuelType, price]) => (
          <div key={fuelType} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{fuelType}</span>
            </div>
            <span className="font-bold text-primary">
              {new Intl.NumberFormat("ru-RU").format(price as number)} {t("som")}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
          {distance.toFixed(1)} km
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleGetDirections()
          }}
          className="flex items-center gap-1 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition font-medium text-sm"
        >
          <Navigation className="w-4 h-4" />
          {t("directions")}
        </button>
      </div>
    </div>
  )
}
