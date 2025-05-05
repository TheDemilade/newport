"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SocialIcons } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AboutSection } from "@/components/about-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"

export default function SharedPortfolio() {
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [shareDate, setShareDate] = useState<string | null>(null)

  // Load shared portfolio data
  useEffect(() => {
    const id = params.id as string
    const sharedData = localStorage.getItem(`shared_portfolio_${id}`)

    if (sharedData) {
      try {
        const parsedData = JSON.parse(sharedData)
        window.portfolioData = parsedData

        if (parsedData.shareDate) {
          setShareDate(new Date(parsedData.shareDate).toLocaleDateString())
        }

        setLoading(false)
      } catch (error) {
        console.error("Error parsing shared portfolio data:", error)
        setNotFound(true)
        setLoading(false)
      }
    } else {
      setNotFound(true)
      setLoading(false)
    }
  }, [params.id])

  // Handle contact form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })
    e.currentTarget.reset()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-card rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="mb-6">The shared portfolio you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {shareDate && (
        <div className="fixed top-20 right-4 z-40 bg-card px-3 py-1 rounded-md text-xs shadow-md">
          Shared on: {shareDate}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I'm <span className="text-primary">{window.portfolioData?.name || "Your Name"}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {window.portfolioData?.title || "Frontend Developer & UI/UX Designer"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="#projects">View Work</a>
              </Button>
              <SocialIcons className="flex gap-4 mt-2" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
              <img
                src={window.portfolioData?.profileImage || "/placeholder.svg?height=320&width=320"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Education Section */}
      <EducationSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-accent">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" required placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" required placeholder="Your message" className="min-h-32" />
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
