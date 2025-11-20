"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, MessageSquare } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { createClient } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

interface ReviewDialogProps {
  stationId: number
  stationName: string
  onReviewAdded?: () => void
}

export default function ReviewDialog({ stationId, stationName, onReviewAdded }: ReviewDialogProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [userName, setUserName] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: t("error", "Error", "Xatolik"),
        description: t("selectRating", "Please select a rating", "Iltimos bahoni tanlang"),
        variant: "destructive",
      })
      return
    }

    if (!userName.trim()) {
      toast({
        title: t("error", "Error", "Xatolik"),
        description: t("enterName", "Please enter your name", "Iltimos ismingizni kiriting"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("reviews").insert({
        station_id: stationId,
        user_name: userName.trim(),
        rating,
        comment: comment.trim() || null,
      })

      if (error) throw error

      toast({
        title: t("success", "Success", "Muvaffaqiyatli"),
        description: t("reviewAdded", "Your review has been added", "Sizning sharhingiz qo'shildi"),
      })

      // Reset form
      setRating(0)
      setUserName("")
      setComment("")
      setOpen(false)

      // Notify parent component
      if (onReviewAdded) onReviewAdded()
    } catch (error) {
      console.error("[v0] Error adding review:", error)
      toast({
        title: t("error", "Error", "Xatolik"),
        description: t("reviewError", "Failed to add review", "Sharh qo'shilmadi"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <MessageSquare className="w-4 h-4" />
          {t("addReview", "Add Review", "Baholash")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] z-50">
        <DialogHeader>
          <DialogTitle>{stationName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">{t("yourName", "Your Name", "Ismingiz")}</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("enterName", "Enter your name", "Ismingizni kiriting")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t("rating", "Rating", "Baho")}</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">
              {t("comment", "Comment", "Sharh")} ({t("optional", "optional", "ixtiyoriy")})
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("writeComment", "Write your experience...", "Tajribangizni yozing...")}
              rows={4}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("cancel", "Cancel", "Bekor qilish")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("submitting", "Submitting...", "Yuklanmoqda...") : t("submit", "Submit", "Yuborish")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
