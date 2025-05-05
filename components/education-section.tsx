"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Plus, Trash } from "lucide-react"

interface Education {
  institution: string
  dates: string
  qualification: string
  link?: string
  type: "education" | "certification"
}

export function EducationSection() {
  const { isEditMode } = useEditMode()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeTab, setActiveTab] = useState<"education" | "certification">("education")
  const [education, setEducation] = useState<Education[]>([
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
  ])

  // Initialize global data
  useEffect(() => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (window.portfolioData.education) {
      setEducation(window.portfolioData.education)
    } else {
      window.portfolioData.education = education
    }
  }, [])

  // Add a new education entry
  const addEducation = (type: "education" | "certification") => {
    const newEducation = [
      ...education,
      {
        institution: "New Institution",
        dates: "Year - Year",
        qualification: "Qualification",
        link: "",
        type,
      },
    ]
    setEducation(newEducation)
    window.portfolioData.education = newEducation
  }

  // Remove an education entry
  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index)
    setEducation(newEducation)
    window.portfolioData.education = newEducation
  }

  // Update an education entry field
  const updateEducationField = (
    index: number,
    field: keyof Education,
    value: string | "education" | "certification",
  ) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setEducation(newEducation)
    window.portfolioData.education = newEducation
  }

  // Filter education entries by type
  const educationEntries = education.filter((edu) => edu.type === "education")
  const certificationEntries = education.filter((edu) => edu.type === "certification")

  return (
    <section id="education" className="section-padding">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Education & Certifications</h2>
        <Tabs defaultValue="education" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certification">Certifications</TabsTrigger>
          </TabsList>
          <TabsContent value="education" className="space-y-8">
            <div ref={ref} className="space-y-8">
              {educationEntries.map((edu, index) => (
                <div
                  key={index}
                  className={`bg-card p-6 rounded-lg shadow-sm transition-all duration-500 ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {isEditMode ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <Input
                            value={edu.institution}
                            onChange={(e) =>
                              updateEducationField(education.indexOf(edu), "institution", e.target.value)
                            }
                            placeholder="Institution"
                            className="mb-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={edu.dates}
                              onChange={(e) => updateEducationField(education.indexOf(edu), "dates", e.target.value)}
                              placeholder="Dates"
                            />
                            <Input
                              value={edu.qualification}
                              onChange={(e) =>
                                updateEducationField(education.indexOf(edu), "qualification", e.target.value)
                              }
                              placeholder="Qualification"
                            />
                          </div>
                          <Input
                            value={edu.link || ""}
                            onChange={(e) => updateEducationField(education.indexOf(edu), "link", e.target.value)}
                            placeholder="Credential Link (optional)"
                            className="mt-2"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeEducation(education.indexOf(edu))}
                          className="ml-2 h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold">{edu.institution}</h3>
                      <p className="text-muted-foreground">{edu.dates}</p>
                      <p className="font-medium mt-2">{edu.qualification}</p>
                      {edu.link && (
                        <a
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline mt-2"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> View Credential
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}

              {isEditMode && (
                <Button
                  variant="outline"
                  onClick={() => addEducation("education")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Education
                </Button>
              )}
            </div>
          </TabsContent>
          <TabsContent value="certification" className="space-y-8">
            <div ref={ref} className="space-y-8">
              {certificationEntries.map((cert, index) => (
                <div
                  key={index}
                  className={`bg-card p-6 rounded-lg shadow-sm transition-all duration-500 ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {isEditMode ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <Input
                            value={cert.institution}
                            onChange={(e) =>
                              updateEducationField(education.indexOf(cert), "institution", e.target.value)
                            }
                            placeholder="Institution"
                            className="mb-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={cert.dates}
                              onChange={(e) => updateEducationField(education.indexOf(cert), "dates", e.target.value)}
                              placeholder="Dates"
                            />
                            <Input
                              value={cert.qualification}
                              onChange={(e) =>
                                updateEducationField(education.indexOf(cert), "qualification", e.target.value)
                              }
                              placeholder="Qualification"
                            />
                          </div>
                          <Input
                            value={cert.link || ""}
                            onChange={(e) => updateEducationField(education.indexOf(cert), "link", e.target.value)}
                            placeholder="Credential Link (optional)"
                            className="mt-2"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeEducation(education.indexOf(cert))}
                          className="ml-2 h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold">{cert.institution}</h3>
                      <p className="text-muted-foreground">{cert.dates}</p>
                      <p className="font-medium mt-2">{cert.qualification}</p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline mt-2"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> View Credential
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}

              {isEditMode && (
                <Button
                  variant="outline"
                  onClick={() => addEducation("certification")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Certification
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
