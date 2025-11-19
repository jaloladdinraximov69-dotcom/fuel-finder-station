// Google Maps API keys should be restricted to specific domains in Google Cloud Console
// Google Maps JavaScript API REQUIRES client-side API keys
// SECURITY: Restrict this API key in Google Cloud Console to:
// 1. HTTP referrers (domains) - Add your production domain and localhost for development
// 2. API restrictions - Restrict to "Maps JavaScript API" only
// Learn more: https://developers.google.com/maps/api-security-best-practices

"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { calculateDistance, type Station } from "@/lib/stations-data"
import { getGoogleMapsApiKey } from "@/app/actions/get-maps-key"

interface GoogleMapComponentProps {
  selectedStation: Station | null
  onStationSelect: (station: Station | null) => void
  stations: Station[]
}

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMapComponent({
  selectedStation,
  onStationSelect,
  stations,
}: GoogleMapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markersRef = useRef<Map<number, any>>(new Map())
  const infoWindowRef = useRef<any>(null)
  const { t, language } = useLanguage()
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [apiError, setApiError] = useState(false)
  
  const defaultLocation = { latitude: 41.5424857, longitude: 60.6095073 }

  // Load Google Maps API
  useEffect(() => {
    // Check if script already loaded
    if (window.google?.maps) {
      setIsMapLoaded(true)
      return
    }

    const loadGoogleMapsScript = async () => {
      try {
        const apiKey = await getGoogleMapsApiKey()
        
        window.gm_authFailure = () => {
          console.error("[v0] Google Maps authentication failed - billing may not be enabled")
          setApiError(true)
        }
        
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log("[v0] Google Maps script loaded successfully")
          setIsMapLoaded(true)
        }
        script.onerror = () => {
          console.error("[v0] Failed to load Google Maps script")
          setApiError(true)
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("[v0] Error loading Google Maps:", error)
        setApiError(true)
      }
    }

    loadGoogleMapsScript()
  }, [])

  // Initialize map and markers
  useEffect(() => {
    if (!isMapLoaded || !mapContainer.current || !window.google || stations.length === 0) return

    if (!map.current) {
      map.current = new window.google.maps.Map(mapContainer.current, {
        zoom: 11,
        center: { lat: defaultLocation.latitude, lng: defaultLocation.longitude },
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })

      new window.google.maps.Marker({
        position: { lat: defaultLocation.latitude, lng: defaultLocation.longitude },
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
    }

    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current.clear()

    stations.forEach((station) => {
      const marker = new window.google.maps.Marker({
        position: { lat: station.latitude, lng: station.longitude },
        map: map.current,
        title: station.name,
        icon: {
          url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23EF4444" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8z"/></svg>',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40),
        },
      })

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close()
        }

        const fuelTypesList = station.fuel_types.join(", ")

        const infoContent = `
          <div class="font-semibold text-sm mb-2">${station.name}</div>
          <div class="text-xs text-gray-600 mb-2">${station.address}</div>
          ${station.distance ? `<div class="text-xs mb-2">
            <strong>${language === "uz" ? "Masofa:" : "Distance:"}</strong> ${station.distance}
          </div>` : ''}
          ${station.rating ? `<div class="text-xs mb-2">
            <strong>${language === "uz" ? "Reyting:" : "Rating:"}</strong> ${station.rating}/5 ⭐
          </div>` : ''}
          <div class="text-xs mb-2">
            <strong>${language === "uz" ? "Narx:" : "Price:"}</strong> ${station.price.toLocaleString("uz-UZ")} so'm
          </div>
          <div class="text-xs">
            <strong>${language === "uz" ? "Yoqilg'i turlari:" : "Fuel types:"}</strong> ${fuelTypesList}
          </div>
        `

        infoWindowRef.current = new window.google.maps.InfoWindow({
          content: infoContent,
        })

        infoWindowRef.current.open(map.current, marker)
        onStationSelect(station)
      })

      markersRef.current.set(station.id, marker)
    })
  }, [isMapLoaded, stations, language, onStationSelect])

  useEffect(() => {
    if (selectedStation && map.current && markersRef.current.has(selectedStation.id)) {
      map.current.panTo({ lat: selectedStation.latitude, lng: selectedStation.longitude })
      map.current.setZoom(15)

      const marker = markersRef.current.get(selectedStation.id)
      if (marker && window.google?.maps?.event) {
        window.google.maps.event.trigger(marker, 'click')
      }
    }
  }, [selectedStation])

  if (apiError) {
    return (
      <div className="w-full h-96 lg:h-full rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === "uz" 
              ? "Xarita hozircha mavjud emas" 
              : "Map temporarily unavailable"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === "uz" 
              ? "Zapravkalar ro'yxatidan foydalanib, kerakli shoxobchani toping va yo'nalish oling" 
              : "Use the stations list to find your location and get directions"}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{language === "uz" ? "Xarita tez orada qayta ishga tushadi" : "Map will be available soon"}</span>
          </div>
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
