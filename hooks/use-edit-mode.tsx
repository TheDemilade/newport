"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { savePortfolioToGitHub } from "@/app/actions/github-actions"

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
  saveChanges: () => Promise<void>
  cancelChanges: () => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [originalData, setOriginalData] = useState<any>(null)
  const { toast } = useToast()

  // Load portfolio data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("portfolio-data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        window.portfolioData = parsedData
      } catch (error) {
        console.error("Error parsing saved portfolio data:", error)
      }
    }
  }, [])

  const toggleEditMode = () => {
    if (!isEditMode) {
      // Entering edit mode - save original data for potential cancellation
      setOriginalData(JSON.parse(JSON.stringify(window.portfolioData || {})))
    }
    setIsEditMode(!isEditMode)
  }

  const saveChanges = async () => {
    try {
      // Get current portfolio data
      const portfolioData = window.portfolioData || {}

      // Save to localStorage for local persistence
      localStorage.setItem("portfolio-data", JSON.stringify(portfolioData))

      // Push changes to GitHub repository using server action
      const result = await savePortfolioToGitHub(portfolioData)

      if (result.success) {
        // Show success toast
        toast({
          title: "Changes saved",
          description: "Your changes have been saved and pushed to the repository.",
          duration: 3000,
        })

        setIsEditMode(false)
      } else {
        throw new Error(result.error || "Failed to save changes")
      }
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Save failed",
        description: "There was an error saving your changes. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const cancelChanges = () => {
    // Restore original data
    if (originalData) {
      window.portfolioData = originalData
    }
    setIsEditMode(false)
  }

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, saveChanges, cancelChanges }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const context = useContext(EditModeContext)
  if (context === undefined) {
    throw new Error("useEditMode must be used within an EditModeProvider")
  }
  return context
}
