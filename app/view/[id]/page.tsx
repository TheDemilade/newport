"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SocialIcons } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SharedPortfolioView() {
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [portfolioData, setPortfolioData] = useState<any>(null)
  const projectsRef = useRef<HTMLElement>(null)

  // Fetch portfolio data from GitHub
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const id = params.id as string
        const response = await fetch(`https://raw.githubusercontent.com/TheDemilade/newport/main/${id}.json`)

        if (!response.ok) {
          throw new Error(`Failed to load portfolio: ${response.status}`)
        }

        const data = await response.json()
        setPortfolioData(data)

        // Set global data for components that might need it
        window.portfolioData = data

        setLoading(false)
      } catch (err) {
        console.error("Error fetching portfolio:", err)
        setError(err instanceof Error ? err.message : "Failed to load portfolio")
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPortfolio()
    }
  }, [params.id])

  // Scroll to projects section
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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

  if (error || !portfolioData) {
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
      <Navbar isSharedView={true} />

      {portfolioData.shareDate && (
        <div className="fixed top-20 right-4 z-40 bg-card px-3 py-1 rounded-md text-xs shadow-md">
          Shared on: {new Date(portfolioData.shareDate).toLocaleDateString()}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I'm <span className="text-primary">{portfolioData.name || "Your Name"}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {portfolioData.title || "Frontend Developer & UI/UX Designer"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToProjects} size="lg">
                View Work
              </Button>
              <SocialIcons className="flex gap-4 mt-2" readOnly={true} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
              <img
                src={portfolioData.profileImage || "/placeholder.svg?height=320&width=320"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-accent">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {portfolioData.about &&
                portfolioData.about.map((paragraph: string, index: number) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="text-primary">📍</div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{portfolioData.location || "New York, USA"}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="text-primary">✉️</div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{portfolioData.email || "hello@example.com"}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Download CV
            </Button>
          </div>
        </div>
      </section>

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
