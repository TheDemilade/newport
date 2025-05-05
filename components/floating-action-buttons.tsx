"use client"

import { useState } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Edit, Share2, X, Check, Loader2 } from "lucide-react"
import { sharePortfolio } from "@/lib/share-portfolio"
import { useToast } from "@/hooks/use-toast"

export function FloatingActionButtons() {
  const { isEditMode, toggleEditMode, saveChanges, cancelChanges } = useEditMode()
  const { toast } = useToast()
  const [isSharing, setIsSharing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Handle portfolio sharing
  const handleSharePortfolio = async () => {
    try {
      setIsSharing(true)
      const result = await sharePortfolio()

      if (result.success) {
        // Display a simple toast message that lasts for 5 seconds
        toast({
          title: "Portfolio link copied",
          description: "Share this link with others to view your portfolio.",
          duration: 5000, // 5 seconds
        })
      } else {
        throw new Error(result.error || "Failed to share portfolio")
      }
    } catch (error) {
      toast({
        title: "Sharing Failed",
        description: error instanceof Error ? error.message : "There was an error sharing your portfolio.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  // Handle saving changes
  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)
      await saveChanges()
    } finally {
      setIsSaving(false)
    }
  }

  if (isEditMode) {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={cancelChanges}
            disabled={isSaving}
            className="h-12 w-12 rounded-full shadow-lg bg-background hover:bg-background/90"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Cancel</span>
          </Button>
          <Button
            size="icon"
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={handleSharePortfolio}
        disabled={isSharing}
        className="h-12 w-12 rounded-full shadow-lg bg-background hover:bg-background/90"
      >
        {isSharing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Share2 className="h-5 w-5" />}
        <span className="sr-only">Share Portfolio</span>
      </Button>
      <Button
        size="icon"
        onClick={toggleEditMode}
        className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
      >
        <Edit className="h-5 w-5" />
        <span className="sr-only">Edit Portfolio</span>
      </Button>
    </div>
  )
}
