"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SignupFormProps {
  onSuccess: () => void
  onToggle: () => void
}

export default function SignupForm({ onSuccess, onToggle }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Barcha maydonlarni to'ldiring")
      return
    }

    if (!email.includes("@")) {
      setError("To'g'ri email kiritng")
      return
    }

    if (password !== confirmPassword) {
      setError("Parollar mos kelmadi")
      return
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      return
    }

    // Simulate signup
    onSuccess()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Fuel Finder</h1>
        <p className="text-white/70">Ro\'yxatdan o\'tish</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="To'liq isim"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Parolni tasdiqlang"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 rounded-lg transition"
        >
          Ro\'yxatdan o\'tish
        </Button>
      </form>

      <div className="text-center">
        <p className="text-white/70 text-sm">
          Allaqachon akkauntingiz bormi?{" "}
          <button onClick={onToggle} className="text-white font-semibold hover:underline">
            Kirish
          </button>
        </p>
      </div>
    </div>
  )
}
