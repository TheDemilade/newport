"use client"

import { useState, useEffect } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Dribbble,
  Figma,
  Globe,
  Edit,
  Check,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SocialIconProps {
  type: string
  url: string
  index: number
  updateSocial: (index: number, type: string, url: string) => void
  removeSocial?: (index: number) => void
  readOnly?: boolean
}

export function EditableSocialIcon({
  type,
  url,
  index,
  updateSocial,
  removeSocial,
  readOnly = false,
}: SocialIconProps) {
  const { isEditMode } = useEditMode()
  const [isEditing, setIsEditing] = useState(false)
  const [socialType, setSocialType] = useState(type)
  const [socialUrl, setSocialUrl] = useState(url)

  // Update state when props change
  useEffect(() => {
    setSocialType(type)
    setSocialUrl(url)
  }, [type, url])

  // Save changes
  const saveChanges = () => {
    updateSocial(index, socialType, socialUrl)
    setIsEditing(false)
  }

  // Cancel changes
  const cancelChanges = () => {
    setSocialType(type)
    setSocialUrl(url)
    setIsEditing(false)
  }

  // Get icon based on type
  const getIcon = (iconType: string) => {
    switch (iconType.toLowerCase()) {
      case "github":
        return <Github className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "dribbble":
        return <Dribbble className="h-5 w-5" />
      case "figma":
        return <Figma className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  if (isEditMode && isEditing && !readOnly) {
    return (
      <div className="flex flex-col gap-2 p-2 border rounded-md">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                {getIcon(socialType)}
                {socialType.charAt(0).toUpperCase() + socialType.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[
                "Github",
                "Linkedin",
                "Twitter",
                "Instagram",
                "Facebook",
                "Youtube",
                "Dribbble",
                "Figma",
                "Website",
              ].map((platform) => (
                <DropdownMenuItem key={platform} onClick={() => setSocialType(platform.toLowerCase())}>
                  <div className="flex items-center gap-2">
                    {getIcon(platform.toLowerCase())}
                    {platform}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="url"
            value={socialUrl}
            onChange={(e) => setSocialUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={cancelChanges}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button variant="default" size="sm" onClick={saveChanges}>
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
          {removeSocial && (
            <Button variant="destructive" size="sm" onClick={() => removeSocial(index)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (isEditMode && !readOnly) {
    return (
      <div className="relative group">
        <a
          href={socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialType}
          onClick={(e) => isEditMode && e.preventDefault()}
        >
          <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
            {getIcon(socialType)}
          </Button>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 bg-background border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <a href={socialUrl} target="_blank" rel="noopener noreferrer" aria-label={socialType}>
      <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
        {getIcon(socialType)}
      </Button>
    </a>
  )
}
