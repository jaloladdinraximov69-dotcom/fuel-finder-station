// Google Maps API keys should be restricted to specific domains in Google Cloud Console

"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { calculateDistance, khorezmStations, type GoogleMapsStation } from "@/lib/google-maps-utils"

interface GoogleMapComponentProps {
  userLocation: {
    latitude: number
    longitude: number
  }
  selectedStationId?: string
  onStationSelect?: (station: GoogleMapsStation) => void
}

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMapComponent({
  userLocation,
  selectedStationId,
  onStationSelect,
}: GoogleMapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const infoWindowRef = useRef<any>(null)
  const { t, language } = useLanguage()
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [apiError, setApiError] = useState(false)

  // Load Google Maps API
  useEffect(() => {
    // Check if script already loaded
    if (window.google?.maps) {
      setIsMapLoaded(true)
      return
    }

    // Get API key from environment - ensure it's configured
    const loadGoogleMapsScript = async () => {
      try {
        // Dynamically load the script
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDemoKey123&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => setIsMapLoaded(true)
        script.onerror = () => {
          console.error("Failed to load Google Maps")
          setApiError(true)
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Error loading Google Maps:", error)
        setApiError(true)
      }
    }

    loadGoogleMapsScript()
  }, [])

  // Initialize map and markers
  useEffect(() => {
    if (!isMapLoaded || !mapContainer.current || !window.google) return

    if (!map.current) {
      map.current = new window.google.maps.Map(mapContainer.current, {
        zoom: 11,
        center: { lat: userLocation.latitude, lng: userLocation.longitude },
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })

      // Add user location marker
      new window.google.maps.Marker({
        position: { lat: userLocation.latitude, lng: userLocation.longitude },
        map: map.current,
        title: language === "uz" ? "Sizning joylashuvingiz" : "Your Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#3B82F6",
          fillOpacity: 0.8,
          strokeColor: "#1E40AF",
          strokeWeight: 2,
        },
      })

      // Add gas station markers
      khorezmStations.forEach((station) => {
        const distance = calculateDistance(userLocation.latitude, userLocation.longitude, station.lat, station.lng)

        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: map.current,
          title: station.name,
          icon: {
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23EF4444" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          },
        })

        marker.addListener("click", () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.close()
          }

          const priceList = station.prices
            ? Object.entries(station.prices)
                .map(([type, price]) => `${type}: ${price.toLocaleString("uz-UZ")} so'm`)
                .join("<br/>")
            : "N/A"

          const infoContent = `
            <div class="font-semibold text-sm mb-2">${station.name}</div>
            <div class="text-xs text-gray-600 mb-2">${station.address}</div>
            <div class="text-xs mb-2">
              <strong>${language === "uz" ? "Masofa:" : "Distance:"}</strong> ${distance.toFixed(1)} km
            </div>
            <div class="text-xs mb-2">
              <strong>${language === "uz" ? "Reyting:" : "Rating:"}</strong> ${station.rating}/5 ⭐
            </div>
            <div class="text-xs font-semibold mb-2">
              ${language === "uz" ? "Narxlar:" : "Prices:"}
            </div>
            <div class="text-xs">${priceList}</div>
          `

          infoWindowRef.current = new window.google.maps.InfoWindow({
            content: infoContent,
          })

          infoWindowRef.current.open(map.current, marker)
          onStationSelect?.({
            ...station,
            lat: station.lat,
            lng: station.lng,
          })
        })

        markersRef.current.set(station.id, marker)
      })
    }

    // Pan to selected station
    if (selectedStationId) {
      const station = khorezmStations.find((s) => s.id === selectedStationId)
      if (station && map.current) {
        map.current.panTo({ lat: station.lat, lng: station.lng })
        map.current.setZoom(15)

        const marker = markersRef.current.get(selectedStationId)
        if (marker) {
          marker.click()
        }
      }
    }
  }, [isMapLoaded, userLocation, selectedStationId, language, onStationSelect])

  if (apiError) {
    return (
      <div className="w-full h-96 lg:h-full rounded-xl shadow-lg bg-red-50 border border-red-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Maps API Error</p>
          <p className="text-red-600 text-sm">Please add your Google Maps API key to environment variables</p>
        </div>
      </div>
    )
  }

  if (!isMapLoaded) {
    return (
      <div className="w-full h-96 lg:h-full rounded-xl shadow-lg bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">
            {language === "uz" ? "Xarita yuklanmoqda..." : "Loading map..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={mapContainer}
      className="w-full h-96 lg:h-full rounded-xl shadow-lg border border-border"
      style={{ minHeight: "400px" }}
    />
  )
}
