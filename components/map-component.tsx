"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { getGasStations } from "@/lib/stations-data"

interface MapComponentProps {
  userLocation: {
    latitude: number
    longitude: number
  }
  selectedStationId: number | null
}

declare global {
  interface Window {
    L: any
  }
}

export default function MapComponent({ userLocation, selectedStationId }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const { t } = useLanguage()
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Load Leaflet CSS
    const leafletCss = document.createElement("link")
    leafletCss.rel = "stylesheet"
    leafletCss.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
    document.head.appendChild(leafletCss)

    // Load Leaflet JS
    const leafletScript = document.createElement("script")
    leafletScript.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
    leafletScript.onload = () => {
      if (mapContainer.current && !map.current) {
        map.current = window.L.map(mapContainer.current).setView([userLocation.latitude, userLocation.longitude], 13)

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map.current)

        // Add user location marker
        window.L.circleMarker([userLocation.latitude, userLocation.longitude], {
          radius: 8,
          fillColor: "#3B82F6",
          color: "#1E40AF",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map.current)

        // Add station markers
        const stations = getGasStations()
        stations.forEach((station) => {
          const marker = window.L.marker([station.lat, station.lng], {
            icon: window.L.icon({
              iconUrl:
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23EF4444" width="32" height="32"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            }),
          }).addTo(map.current)

          marker.bindPopup(`<div class="text-sm font-semibold">${station.name.en}</div>`)
          markersRef.current.push({ id: station.id, marker })
        })
      }
    }
    document.head.appendChild(leafletScript)
  }, [userLocation])

  useEffect(() => {
    if (selectedStationId && map.current) {
      const station = getGasStations().find((s) => s.id === selectedStationId)
      if (station) {
        map.current.setView([station.lat, station.lng], 15)
      }
    }
  }, [selectedStationId])

  return (
    <div
      ref={mapContainer}
      className="w-full h-96 lg:h-full rounded-xl shadow-lg border border-border"
      style={{ minHeight: "400px" }}
    />
  )
}
