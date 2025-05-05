"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditableFieldProps {
  value: string
  path: string
  multiline?: boolean
  className?: string
  placeholder?: string
}

export function EditableField({
  value,
  path,
  multiline = false,
  className = "",
  placeholder = "Edit this field",
}: EditableFieldProps) {
  const { isEditMode } = useEditMode()
  const [fieldValue, setFieldValue] = useState(value)

  // Update the field value when the value prop changes
  useEffect(() => {
    setFieldValue(value)
  }, [value])

  // Update the global data object when the field value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setFieldValue(newValue)

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

    current[pathParts[pathParts.length - 1]] = newValue
  }

  if (isEditMode) {
    if (multiline) {
      return <Textarea value={fieldValue} onChange={handleChange} className={className} placeholder={placeholder} />
    } else {
      return (
        <Input type="text" value={fieldValue} onChange={handleChange} className={className} placeholder={placeholder} />
      )
    }
  }

  return <span className={className}>{fieldValue}</span>
}
