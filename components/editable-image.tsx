"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon } from "lucide-react"

interface EditableImageProps {
  src: string
  alt: string
  path: string
  className?: string
}

export function EditableImage({ src, alt, path, className = "" }: EditableImageProps) {
  const { isEditMode } = useEditMode()
  const [imageSrc, setImageSrc] = useState(src)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update the image source when the src prop changes
  useEffect(() => {
    setImageSrc(src)
  }, [src])

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  // Process the selected file
  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const newSrc = event.target?.result as string
      setImageSrc(newSrc)

      // Update the global data object
      if (!window.portfolioData) {
        window.portfolioData = {}
      }

      // Parse the path and update the nested property
      const pathParts = path.split(".")
      let current = window.portfolioData

      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i]

        // Handle array indices
        if (part.includes("[") && part.includes("]")) {
          const arrayName = part.substring(0, part.indexOf("["))
          const index = Number.parseInt(part.substring(part.indexOf("[") + 1, part.indexOf("]")))

          if (!current[arrayName]) {
            current[arrayName] = []
          }

          if (!current[arrayName][index]) {
            current[arrayName][index] = {}
          }

          current = current[arrayName][index]
        } else {
          if (!current[part]) {
            current[part] = {}
          }
          current = current[part]
        }
      }

      current[pathParts[pathParts.length - 1]] = newSrc
    }
    reader.readAsDataURL(file)
  }

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isEditMode) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isEditMode) setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isEditMode) {
      setIsDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0])
      }
    }
  }

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  if (isEditMode) {
    return (
      <div
        className={`relative group ${isDragging ? "ring-2 ring-primary" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imageSrc ? (
          <img src={imageSrc || "/placeholder.svg"} alt={alt} className={className} />
        ) : (
          <div className={`flex items-center justify-center bg-muted ${className}`}>
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={openFilePicker}
        >
          <Button variant="outline" className="bg-background/80">
            <Upload className="h-4 w-4 mr-2" /> {isDragging ? "Drop Image Here" : "Change Image"}
          </Button>
          <p className="text-white text-xs mt-2">or drag and drop</p>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
        </div>
      </div>
    )
  }

  return imageSrc ? (
    <img src={imageSrc || "/placeholder.svg"} alt={alt} className={className} />
  ) : (
    <div className={`flex items-center justify-center bg-muted ${className}`}>
      <ImageIcon className="h-12 w-12 text-muted-foreground" />
    </div>
  )
}
