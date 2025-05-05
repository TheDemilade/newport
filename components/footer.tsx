"use client"

import { useEffect, useState } from "react"
import { SocialIcons } from "@/components/social-icons"

export function Footer() {
  const [userName, setUserName] = useState("Your Name")

  // Get user name from global data
  useEffect(() => {
    if (window.portfolioData && window.portfolioData.name) {
      setUserName(window.portfolioData.name)
    }

    // Listen for changes to the user's name
    const handleStorageChange = () => {
      if (window.portfolioData && window.portfolioData.name) {
        setUserName(window.portfolioData.name)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <footer className="py-8 border-t">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {userName}. All rights reserved.
          </p>
        </div>
        <SocialIcons className="flex gap-4" />
      </div>
    </footer>
  )
}
