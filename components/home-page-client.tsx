"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import StationsList from "./stations-list"
import LeafletMapComponent from "./leaflet-map-component"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { mockStations, type Station } from "@/lib/stations-data"

export default function HomePageClient() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [stations, setStations] = useState<Station[]>(mockStations)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("user_authenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }
  }, [router])

  const handleFilterChange = (fuelType: string, sortBy: string) => {
    let filtered = [...mockStations]

    // Filter by fuel type
    if (fuelType !== "all") {
      filtered = filtered.filter((station) => station.fuel_types.includes(fuelType))
    }

    // Sort stations
    if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setStations(filtered)
  }

  const handleLogout = () => {
    localStorage.removeItem("user_authenticated")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Smart Fuel Finder</h1>
              <p className="text-xs text-muted-foreground">
                {t("find_nearest_stations", "Find nearest gas stations", "Eng yaqin zapravkalarni toping")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg font-medium transition"
            >
              {t("logout", "Logout", "Chiqish")}
            </button>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
              <p className="text-muted-foreground">{t("loading", "Loading...", "Yuklanmoqda...")}</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
            <div className="w-full lg:w-3/5 h-1/2 lg:h-full overflow-y-auto">
              <StationsList
                stations={stations}
                onStationSelect={setSelectedStation}
                selectedStation={selectedStation}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-4">
              <LeafletMapComponent
                selectedStation={selectedStation}
                onStationSelect={setSelectedStation}
                stations={stations}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
