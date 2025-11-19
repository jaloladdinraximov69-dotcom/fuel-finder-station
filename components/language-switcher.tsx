"use client"

import { useLanguage } from "@/hooks/use-language"

const languages = [
  { code: "uz", flag: "🇺🇿", name: "O'zbek" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`px-3 py-2 rounded-lg font-semibold transition ${
            language === lang.code ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  )
}
