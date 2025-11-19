"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "en" | "ru"

const translations = {
  uz: {
    find_nearest_stations: "Eng yaqin yoqilg'i shoxobchasini toping",
    logout: "Chiqish",
    loading_location: "Lokatsiya yuklanyapti...",
    location_not_supported: "Lokatsiya aniqlanmadi",
    best_station: "Eng yaxshi shoxobcha",
    highly_rated: "Yuqori bahogga ega",
    sort_by: "Sortirash",
    fuel_type: "Yoqilg'i turi",
    all_types: "Hamma turlar",
    nearest: "Eng yaqin",
    lowest_price: "Eng arzon",
    highest_rating: "Eng yuqori baho",
    som: "so'm",
    directions: "Yo'nalish",
  },
  en: {
    find_nearest_stations: "Find nearest gas stations",
    logout: "Logout",
    loading_location: "Loading location...",
    location_not_supported: "Location not supported",
    best_station: "Best Station",
    highly_rated: "Highly rated",
    sort_by: "Sort by",
    fuel_type: "Fuel type",
    all_types: "All types",
    nearest: "Nearest",
    lowest_price: "Lowest price",
    highest_rating: "Highest rating",
    som: "UZS",
    directions: "Directions",
  },
  ru: {
    find_nearest_stations: "Найдите ближайшую заправку",
    logout: "Выход",
    loading_location: "Загрузка местоположения...",
    location_not_supported: "Местоположение не поддерживается",
    best_station: "Лучшая заправка",
    highly_rated: "Высокий рейтинг",
    sort_by: "Сортировать по",
    fuel_type: "Тип топлива",
    all_types: "Все типы",
    nearest: "Ближайшая",
    lowest_price: "Самая дешёвая",
    highest_rating: "Самый высокий рейтинг",
    som: "UZS",
    directions: "Маршрут",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.uz) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved) setLanguage(saved)
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: keyof typeof translations.uz): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
