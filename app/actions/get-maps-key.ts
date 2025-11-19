"use server"

// Server action to fetch Google Maps API key
// Uses server-side environment variable (without NEXT_PUBLIC_ prefix)
// Security is enforced through domain restrictions in Google Cloud Console
export async function getGoogleMapsApiKey() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    throw new Error("Google Maps API key not configured")
  }
  
  return apiKey
}
