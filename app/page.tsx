"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  const handleLoginSuccess = () => {
    localStorage.setItem("user_authenticated", "true")
    router.push("/home")
  }

  const handleSignupSuccess = () => {
    localStorage.setItem("user_authenticated", "true")
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>

      {/* Glassmorphism Container */}
      <div className="relative w-full max-w-md">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl blur-xl"></div>

        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {isSignup ? (
            <SignupForm onSuccess={handleSignupSuccess} onToggle={() => setIsSignup(false)} />
          ) : (
            <LoginForm onSuccess={handleLoginSuccess} onToggle={() => setIsSignup(true)} />
          )}
        </div>
      </div>
    </div>
  )
}
