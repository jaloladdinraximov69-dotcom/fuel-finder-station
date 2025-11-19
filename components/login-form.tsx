"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/auth-actions"

interface LoginFormProps {
  onSuccess: () => void
  onToggle: () => void
}

export default function LoginForm({ onSuccess, onToggle }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Barcha maydonlarni to'ldiring")
      return
    }

    if (!email.includes("@")) {
      setError("To'g'ri email kiritng")
      return
    }

    // Simulate login
    onSuccess()
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")
    try {
      console.log("[v0] Starting Google sign-in...")
      await signInWithGoogle()
      // The redirect happens automatically from signInWithGoogle
    } catch (err) {
      console.error("[v0] Google sign-in failed:", err)
      setError(err instanceof Error ? err.message : "Google bilan kirish muvaffaqiyatsiz bo'ldi")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Fuel Finder</h1>
        <p className="text-white/70">Kirish</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

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

        <Button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 rounded-lg transition"
        >
          Kirish
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white/10 text-white/70">yoki</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {isLoading ? "Yuklanmoqda..." : "Google bilan kirish"}
      </Button>

      <div className="text-center">
        <p className="text-white/70 text-sm">
          Akkauntingiz yo\'qmi?{" "}
          <button onClick={onToggle} className="text-white font-semibold hover:underline">
            Ro\'yxatdan o\'tishga
          </button>
        </p>
      </div>
    </div>
  )
}
