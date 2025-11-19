"use client"

import { createClient } from "@/lib/supabase/client"

export async function signInWithGoogle() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/home`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("[v0] Google sign-in error:", error)
      throw new Error(error.message || "Google bilan kirish muvaffaqiyatsiz bo'ldi")
    }

    if (data?.url) {
      // Redirect to Google OAuth flow
      window.location.href = data.url
    }
  } catch (err) {
    console.error("[v0] Auth error:", err)
    throw err
  }
}

export async function signUp(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/home`,
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
