"use client"

import { useEffect, useRef } from "react"
import type { Station } from "@/lib/stations-data"

interface LeafletMapComponentProps {
  selectedStation: Station | null
  onStationSelect: (station: Station | null) => void
  stations: Station[]
}

export default function LeafletMapComponent({ selectedStation, onStationSelect, stations }: LeafletMapComponentProps) {
  const mapRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (typeof window !== "undefined" && !leafletRef.current) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true
      script.onload = () => {
        leafletRef.current = (window as any).L
        initializeMap()
      }
      document.head.appendChild(script)
    }
  }, [])

  const initializeMap = () => {
    if (!leafletRef.current || mapRef.current) return

    const L = leafletRef.current

    // Create map centered on Urgench, Khorezm
    const map = L.map("leaflet-map").setView([41.5598, 60.627], 10)
    mapRef.current = map

    // Add OpenStreetMap tiles (free, no API key needed)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map)

    // Add markers for all stations
    updateMarkers()
  }

  const updateMarkers = () => {
    if (!mapRef.current || !leafletRef.current) return

    const L = leafletRef.current
    const map = mapRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Create custom icon
    const customIcon = L.divIcon({
      html: `<div style="background-color: #3b82f6; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); color: white; font-size: 16px; text-align: center; line-height: 24px;">⛽</div></div>`,
      className: "",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    })

    // Add markers
    stations.forEach((station) => {
      const directionsUrl =
        station.googleMapsUrl ||
        `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}&destination_place_id=${encodeURIComponent(station.name + ", " + station.address)}`

      const marker = L.marker([station.latitude, station.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${station.name}</h3>
            <p style="margin: 4px 0; color: #666; font-size: 14px;">${station.address}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Narx:</strong> ${station.price.toLocaleString()} so'm</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Yoqilg'i:</strong> ${station.fuel_types.join(", ")}</p>
            ${station.rating ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Reyting:</strong> ⭐ ${station.rating}</p>` : ""}
            <a href="${directionsUrl}" 
               target="_blank" 
               style="display: inline-block; margin-top: 8px; padding: 6px 12px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">
              Yo'nalish olish
            </a>
          </div>
        `)

      marker.on("click", () => {
        onStationSelect(station)
      })

      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    updateMarkers()
  }, [stations])

  useEffect(() => {
    if (selectedStation && mapRef.current && leafletRef.current) {
      // Center map on selected station
      mapRef.current.setView([selectedStation.latitude, selectedStation.longitude], 15)

      // Find and open the popup for the selected marker
      markersRef.current.forEach((marker) => {
        const latLng = marker.getLatLng()
        if (latLng.lat === selectedStation.latitude && latLng.lng === selectedStation.longitude) {
          marker.openPopup()
        }
      })
    }
  }, [selectedStation])

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg relative z-0">
      <div id="leaflet-map" className="h-full w-full" />
    </div>
  )
}
