"use client"

import { useState, useEffect, forwardRef } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EditableImage } from "@/components/editable-image"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  sourceUrl: string
}

// Sample data
const defaultProjects = [
  {
    title: "E-commerce Website",
    description: "A fully responsive e-commerce platform with cart functionality and payment integration.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "A clean and modern portfolio website showcasing creative work and projects.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A productivity app that helps users organize tasks and track progress.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Redux", "Firebase", "Material UI"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Weather Dashboard",
    description: "A weather application that displays current and forecasted weather data.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["JavaScript", "API", "Chart.js", "Bootstrap"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Recipe Finder",
    description: "An app that allows users to search for recipes based on ingredients they have.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Social Media Dashboard",
    description: "A dashboard that aggregates and displays social media metrics and analytics.",
    image: "/placeholder.svg?height=200&width=400",
    technologies: ["Vue.js", "D3.js", "Firebase", "Vuetify"],
    liveUrl: "#",
    sourceUrl: "#",
  },
]

export const ProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  // Initialize global data
  useEffect(() => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (window.portfolioData.projects) {
      setProjects(window.portfolioData.projects)
    } else {
      window.portfolioData.projects = projects
    }
  }, [])

  return (
    <section ref={ref} id="projects" className="section-padding">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

ProjectsSection.displayName = "ProjectsSection"

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { isEditMode } = useEditMode()
  const [projectData, setProjectData] = useState(project)

  // Update the project data when props change
  useEffect(() => {
    setProjectData(project)
  }, [project])

  // Update the global data
  const updateProject = (field: keyof Project, value: string | string[]) => {
    const updatedProject = { ...projectData, [field]: value }
    setProjectData(updatedProject)

    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (!window.portfolioData.projects) {
      window.portfolioData.projects = []
    }

    window.portfolioData.projects[index] = updatedProject
  }

  // Update technologies
  const updateTechnologies = (techString: string) => {
    const techArray = techString.split(",").map((tech) => tech.trim())
    updateProject("technologies", techArray)
  }

  if (isEditMode) {
    return (
      <div className="bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 p-4 space-y-4">
        <EditableImage
          src={projectData.image || "/placeholder.svg"}
          alt={projectData.title}
          path={`projects[${index}].image`}
          className="w-full aspect-video object-cover rounded-md"
        />

        <div className="space-y-2">
          <Input
            value={projectData.title}
            onChange={(e) => updateProject("title", e.target.value)}
            placeholder="Project Title"
          />

          <Textarea
            value={projectData.description}
            onChange={(e) => updateProject("description", e.target.value)}
            placeholder="Project Description"
          />

          <Input
            value={projectData.technologies.join(", ")}
            onChange={(e) => updateTechnologies(e.target.value)}
            placeholder="Technologies (comma separated)"
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              value={projectData.liveUrl}
              onChange={(e) => updateProject("liveUrl", e.target.value)}
              placeholder="Live URL"
            />
            <Input
              value={projectData.sourceUrl}
              onChange={(e) => updateProject("sourceUrl", e.target.value)}
              placeholder="Source URL"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-card group relative rounded-lg overflow-hidden border border-border transition-all duration-300 hover:shadow-lg">
      <img
        src={projectData.image || "/placeholder.svg"}
        alt={projectData.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{projectData.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {projectData.technologies.map((tech, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="project-overlay absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-white">
        <p className="text-center mb-4">{projectData.description}</p>
        <div className="flex gap-4">
          <a
            href={projectData.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/80 transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> View Live
          </a>
          <a
            href={projectData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors"
          >
            <Github className="h-4 w-4" /> Source
          </a>
        </div>
      </div>
    </div>
  )
}
