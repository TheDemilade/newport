"use client"

import { useState, useEffect } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EditableSocialIcon } from "@/components/editable-social-icon"

interface SocialIconsProps {
  className?: string
  readOnly?: boolean
}

export function SocialIcons({ className, readOnly = false }: SocialIconsProps) {
  const { isEditMode } = useEditMode()
  const [socialLinks, setSocialLinks] = useState([
    { type: "github", url: "https://github.com" },
    { type: "linkedin", url: "https://linkedin.com" },
    { type: "twitter", url: "https://twitter.com" },
    { type: "instagram", url: "https://instagram.com" },
  ])

  // Initialize global data
  useEffect(() => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (window.portfolioData.socialLinks) {
      setSocialLinks(window.portfolioData.socialLinks)
    } else {
      window.portfolioData.socialLinks = socialLinks
    }
  }, [])

  // Update a social link
  const updateSocial = (index: number, type: string, url: string) => {
    const newLinks = [...socialLinks]
    newLinks[index] = { type, url }
    setSocialLinks(newLinks)
    window.portfolioData.socialLinks = newLinks
  }

  // Add a new social link
  const addSocial = () => {
    const newLinks = [...socialLinks, { type: "website", url: "https://" }]
    setSocialLinks(newLinks)
    window.portfolioData.socialLinks = newLinks
  }

  // Remove a social link
  const removeSocial = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index)
    setSocialLinks(newLinks)
    window.portfolioData.socialLinks = newLinks
  }

  return (
    <div className={className}>
      {socialLinks.map((social, index) => (
        <EditableSocialIcon
          key={index}
          type={social.type}
          url={social.url}
          index={index}
          updateSocial={updateSocial}
          removeSocial={socialLinks.length > 1 ? removeSocial : undefined}
          readOnly={readOnly}
        />
      ))}
      {isEditMode && !readOnly && (
        <Button variant="outline" size="icon" className="rounded-full" onClick={addSocial}>
          <Plus className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
