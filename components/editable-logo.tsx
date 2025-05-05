"use client"

import { useState, useEffect } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EditableImage } from "@/components/editable-image"
import { ImageIcon, Type, Check, X } from "lucide-react"

interface EditableLogoProps {
  defaultText?: string
  defaultImage?: string
}

export function EditableLogo({ defaultText = "Portfolio", defaultImage = "" }: EditableLogoProps) {
  const { isEditMode } = useEditMode()
  const [isEditing, setIsEditing] = useState(false)
  const [logoType, setLogoType] = useState<"text" | "image">(defaultImage ? "image" : "text")
  const [logoText, setLogoText] = useState(defaultText)
  const [logoImage, setLogoImage] = useState(defaultImage)

  // Initialize global data
  useEffect(() => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (window.portfolioData.logo) {
      if (window.portfolioData.logo.type) setLogoType(window.portfolioData.logo.type)
      if (window.portfolioData.logo.text) setLogoText(window.portfolioData.logo.text)
      if (window.portfolioData.logo.image) setLogoImage(window.portfolioData.logo.image)
    } else {
      window.portfolioData.logo = {
        type: logoType,
        text: logoText,
        image: logoImage,
      }
    }
  }, [defaultText, defaultImage])

  // Save changes
  const saveChanges = () => {
    window.portfolioData.logo = {
      type: logoType,
      text: logoText,
      image: logoImage,
    }
    setIsEditing(false)
  }

  // Cancel changes
  const cancelChanges = () => {
    if (window.portfolioData.logo) {
      setLogoType(window.portfolioData.logo.type)
      setLogoText(window.portfolioData.logo.text)
      setLogoImage(window.portfolioData.logo.image)
    }
    setIsEditing(false)
  }

  // Update logo image
  const updateLogoImage = (newImage: string) => {
    setLogoImage(newImage)
    if (window.portfolioData.logo) {
      window.portfolioData.logo.image = newImage
    }
  }

  if (isEditMode && isEditing) {
    return (
      <div className="p-4 border rounded-md bg-background shadow-sm">
        <div className="flex gap-4 mb-4">
          <Button
            variant={logoType === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setLogoType("text")}
            className="flex items-center gap-2"
          >
            <Type className="h-4 w-4" /> Text
          </Button>
          <Button
            variant={logoType === "image" ? "default" : "outline"}
            size="sm"
            onClick={() => setLogoType("image")}
            className="flex items-center gap-2"
          >
            <ImageIcon className="h-4 w-4" /> Image
          </Button>
        </div>

        {logoType === "text" ? (
          <Input value={logoText} onChange={(e) => setLogoText(e.target.value)} placeholder="Logo Text" />
        ) : (
          <div className="h-20 w-full">
            <EditableImage
              src={logoImage || "/placeholder.svg?height=80&width=200"}
              alt="Logo"
              path="logo.image"
              className="h-full max-w-full object-contain"
            />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" size="sm" onClick={cancelChanges}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button variant="default" size="sm" onClick={saveChanges}>
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    )
  }

  if (isEditMode) {
    return (
      <div className="relative group" onClick={() => setIsEditing(true)}>
        {logoType === "text" ? (
          <div className="font-bold text-xl">
            <span className="text-primary">{logoText.split(" ")[0]}</span>
            {logoText.split(" ").length > 1 && logoText.split(" ").slice(1).join(" ")}
          </div>
        ) : (
          <img src={logoImage || "/placeholder.svg"} alt="Logo" className="h-8" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 bg-background border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Type className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className="font-bold text-xl">
      {logoType === "text" ? (
        <>
          <span className="text-primary">{logoText.split(" ")[0]}</span>
          {logoText.split(" ").length > 1 && logoText.split(" ").slice(1).join(" ")}
        </>
      ) : (
        <img src={logoImage || "/placeholder.svg"} alt="Logo" className="h-8" />
      )}
    </div>
  )
}
