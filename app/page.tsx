"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SocialIcons } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { EditModeProvider } from "@/hooks/use-edit-mode"
import { EditableField } from "@/components/editable-field"
import { EditableImage } from "@/components/editable-image"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { FloatingActionButtons } from "@/components/floating-action-buttons"

// Add this type declaration at the top level
declare global {
  interface Window {
    portfolioData: any
  }
}

// Update the Portfolio component to include the EditModeProvider
export default function Portfolio() {
  const { toast } = useToast()
  const projectsRef = useRef<HTMLElement>(null)

  // Initialize default data
  useEffect(() => {
    if (typeof window !== "undefined" && !window.portfolioData) {
      window.portfolioData = {
        name: "Your Name",
        title: "Frontend Developer & UI/UX Designer",
        email: "hello@yourname.com",
        location: "New York, USA",
        about: [
          "I'm a passionate frontend developer with over 5 years of experience creating beautiful, responsive, and user-friendly websites. I specialize in React, Next.js, and modern CSS frameworks like Tailwind.",
          "Based in New York City, I graduated from Columbia University with a degree in Computer Science. I've worked with startups and established companies to bring their digital visions to life.",
          "When I'm not coding, you can find me hiking, reading science fiction, or experimenting with new technologies. My mission is to create digital experiences that are both beautiful and functional.",
        ],
        skills: [
          { name: "HTML & CSS", level: 95 },
          { name: "JavaScript", level: 90 },
          { name: "React", level: 85 },
          { name: "Next.js", level: 80 },
          { name: "TypeScript", level: 75 },
          { name: "UI/UX Design", level: 70 },
        ],
        socialLinks: [
          { type: "github", url: "https://github.com" },
          { type: "linkedin", url: "https://linkedin.com" },
          { type: "twitter", url: "https://twitter.com" },
          { type: "instagram", url: "https://instagram.com" },
        ],
        education: [
          {
            institution: "Columbia University",
            dates: "2015-2019",
            qualification: "Bachelor of Science in Computer Science",
            link: "",
            type: "education",
          },
          {
            institution: "Stanford University",
            dates: "2019-2021",
            qualification: "Master of Science in Computer Science",
            link: "",
            type: "education",
          },
          {
            institution: "Udacity",
            dates: "2020",
            qualification: "Front End Web Developer Nanodegree",
            link: "https://confirm.udacity.com/example",
            type: "certification",
          },
          {
            institution: "freeCodeCamp",
            dates: "2021",
            qualification: "Responsive Web Design Certification",
            link: "https://www.freecodecamp.org/certification/example",
            type: "certification",
          },
          {
            institution: "Google",
            dates: "2022",
            qualification: "Google UX Design Professional Certificate",
            link: "https://www.coursera.org/example",
            type: "certification",
          },
        ],
      }
    }
  }, [])

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

  return (
    <EditModeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-16">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Hi, I'm <EditableField value="Your Name" path="name" className="text-primary" />
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                <EditableField value="Frontend Developer & UI/UX Designer" path="title" />
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToProjects} size="lg">
                  View Work
                </Button>
                <SocialIcons className="flex gap-4 mt-2" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
                <EditableImage
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile"
                  path="profileImage"
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
        <ProjectsSection ref={projectsRef} />

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
        <FloatingActionButtons />
      </div>
    </EditModeProvider>
  )
}
