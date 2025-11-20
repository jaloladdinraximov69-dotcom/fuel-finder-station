"use client"

import { useEffect, useState } from "react"
import { Star, User } from "lucide-react"
import { createClient } from "@/lib/supabase-client"
import { useLanguage } from "@/hooks/use-language"
import { Card } from "@/components/ui/card"

interface Review {
  id: number
  station_id: number
  user_name: string
  rating: number
  comment: string | null
  created_at: string
}

interface ReviewsListProps {
  stationId: number
  refreshTrigger?: number
}

export default function ReviewsList({ stationId, refreshTrigger }: ReviewsListProps) {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    loadReviews()
  }, [stationId, refreshTrigger])

  const loadReviews = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("station_id", stationId)
        .order("created_at", { ascending: false })

      if (error) throw error

      setReviews(data || [])

      // Calculate average rating
      if (data && data.length > 0) {
        const avg = data.reduce((sum, review) => sum + review.rating, 0) / data.length
        setAverageRating(avg)
      } else {
        setAverageRating(null)
      }
    } catch (error) {
      console.error("[v0] Error loading reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-4">{t("loading", "Loading...", "Yuklanmoqda...")}</div>
  }

  return (
    <div className="space-y-4">
      {averageRating !== null && (
        <div className="flex items-center gap-2 p-4 bg-accent/10 rounded-lg">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} {t("reviews", "reviews", "sharh")})
          </span>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t("noReviews", "No reviews yet. Be the first to review!", "Hali sharhlar yo'q. Birinchi bo'lib baholang!")}
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.user_name}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(review.created_at).toLocaleDateString("uz-UZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
