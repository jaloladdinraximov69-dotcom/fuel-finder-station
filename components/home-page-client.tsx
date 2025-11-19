"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GoogleMapComponent from "@/components/google-map-component"
import StationsList from "@/components/stations-list"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"

interface UserLocation {
  latitude: number
  longitude: number
}

export default function HomePageClient() {
  const router = useRouter()
  const { t } = useLanguage()
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedStation, setSelectedStation] = useState<number | null>(null)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("user_authenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setLoading(false)
        },
        (err) => {
          console.error("Location error:", err)
          // Default to Tashkent center if location fails
          setUserLocation({
            latitude: 41.2995,
            longitude: 69.2401,
          })
          setLoading(false)
        },
      )
    } else {
      setError(t("location_not_supported"))
      setLoading(false)
    }
  }, [router, t])

  const handleLogout = () => {
    localStorage.removeItem("user_authenticated")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Smart Fuel Finder</h1>
              <p className="text-xs text-muted-foreground">{t("find_nearest_stations")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-muted hover:bg-border text-foreground rounded-lg font-medium transition"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600">{t("loading_location")}</p>
            </div>
          </div>
        )}

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}

        {!loading && userLocation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <GoogleMapComponent
                userLocation={userLocation}
                selectedStationId={selectedStation?.toString()}
                onStationSelect={(station) => {
                  setSelectedStation(station.id ? Number.parseInt(station.id) : null)
                }}
              />
            </div>

            {/* Stations List */}
            <div className="lg:col-span-1">
              <StationsList
                userLocation={userLocation}
                onSelectStation={setSelectedStation}
                selectedStationId={selectedStation}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
