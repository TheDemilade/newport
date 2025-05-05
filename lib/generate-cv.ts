import { jsPDF } from "jspdf"

export function generateCV() {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Get portfolio data
  const portfolioData = window.portfolioData || getDefaultData()
  const userName = portfolioData.name || "Your Name"

  // Set font
  doc.setFont("helvetica", "normal") // Using helvetica as a fallback since jsPDF doesn't support Ovo directly

  // Add header with name and title
  doc.setFontSize(24)
  doc.setTextColor(225, 6, 0) // Red color #E10600
  doc.text(userName, 20, 20)

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0) // Black color
  doc.text(portfolioData.title || "Frontend Developer", 20, 30)

  // Add contact info
  doc.setFontSize(10)
  doc.text(`Email: ${portfolioData.email || "hello@example.com"}`, 20, 40)
  doc.text(`Location: ${portfolioData.location || "New York, USA"}`, 20, 45)

  // Add about section
  doc.setFontSize(16)
  doc.setTextColor(225, 6, 0) // Red color
  doc.text("About", 20, 55)

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0) // Black color
  const aboutText = (portfolioData.about || []).join(" ")
  const aboutLines = doc.splitTextToSize(aboutText, 170)
  doc.text(aboutLines, 20, 65)

  // Add education section
  let yPos = 65 + aboutLines.length * 5

  doc.setFontSize(16)
  doc.setTextColor(225, 6, 0) // Red color
  doc.text("Education & Certifications", 20, yPos)

  yPos += 10
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0) // Black color

  // Education entries
  const educationEntries = (portfolioData.education || []).filter((edu: any) => edu.type === "education")
  educationEntries.forEach((edu: any) => {
    doc.setFontSize(12)
    doc.text(edu.institution, 20, yPos)
    doc.setFontSize(10)
    doc.text(`${edu.dates} - ${edu.qualification}`, 20, yPos + 5)
    yPos += 15
  })

  // Certification entries
  const certificationEntries = (portfolioData.education || []).filter((edu: any) => edu.type === "certification")
  if (certificationEntries.length > 0) {
    doc.setFontSize(12)
    doc.text("Certifications:", 20, yPos)
    yPos += 8

    certificationEntries.forEach((cert: any) => {
      doc.setFontSize(10)
      doc.text(`• ${cert.qualification} - ${cert.institution} (${cert.dates})`, 25, yPos)
      yPos += 6
    })
    yPos += 4
  }

  // Add skills section
  doc.setFontSize(16)
  doc.setTextColor(225, 6, 0) // Red color
  doc.text("Skills", 20, yPos)

  yPos += 10
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0) // Black color

  const skills = portfolioData.skills || []
  skills.forEach((skill: any) => {
    doc.text(`${skill.name} - ${skill.level}%`, 20, yPos)
    yPos += 5
  })

  // Add projects section
  yPos += 5
  doc.setFontSize(16)
  doc.setTextColor(225, 6, 0) // Red color
  doc.text("Projects", 20, yPos)

  yPos += 10
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0) // Black color

  const projects = portfolioData.projects || []
  projects.slice(0, 3).forEach((project: any) => {
    doc.setFontSize(12)
    doc.text(project.title, 20, yPos)
    doc.setFontSize(10)
    const techText = project.technologies.join(", ")
    doc.text(`Technologies: ${techText}`, 20, yPos + 5)
    const descLines = doc.splitTextToSize(project.description, 170)
    doc.text(descLines, 20, yPos + 10)
    yPos += 20
  })

  // Save the PDF with the user's name
  doc.save(`${userName.replace(/\s+/g, "_")}_CV.pdf`)
}

function getDefaultData() {
  return {
    name: "Your Name",
    title: "Frontend Developer & UI/UX Designer",
    email: "hello@yourname.com",
    location: "New York, USA",
    about: [
      "I'm a passionate frontend developer with over 5 years of experience creating beautiful, responsive, and user-friendly websites. I specialize in React, Next.js, and modern CSS frameworks like Tailwind.",
      "Based in New York City, I graduated from Columbia University with a degree in Computer Science. I've worked with startups and established companies to bring their digital visions to life.",
      "When I'm not coding, you can find me hiking, reading science fiction, or experimenting with new technologies. My mission is to create digital experiences that are both beautiful and functional.",
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
        institution: "Udacity",
        dates: "2020",
        qualification: "Front End Web Developer Nanodegree",
        link: "https://confirm.udacity.com/example",
        type: "certification",
      },
    ],
    skills: [
      { name: "HTML & CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "UI/UX Design", level: 70 },
    ],
    projects: [
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
    ],
  }
}
