"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Button } from "@/components/ui/button"
import { EditableSkill } from "@/components/editable-skill"
import { Plus, Trash } from "lucide-react"

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [animated, setAnimated] = useState(false)
  const { isEditMode } = useEditMode()
  const [skills, setSkills] = useState([
    { name: "HTML & CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "UI/UX Design", level: 70 },
  ])

  // Initialize global data
  useEffect(() => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (window.portfolioData.skills) {
      setSkills(window.portfolioData.skills)
    } else {
      window.portfolioData.skills = skills
    }
  }, [])

  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true)
    }
  }, [inView, animated])

  // Add a new skill
  const addSkill = () => {
    const newSkills = [...skills, { name: "New Skill", level: 50 }]
    setSkills(newSkills)
    window.portfolioData.skills = newSkills
  }

  // Remove a skill
  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index)
    setSkills(newSkills)
    window.portfolioData.skills = newSkills
  }

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Skills</h2>
        <div ref={ref} className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1">
                <EditableSkill name={skill.name} level={skill.level} index={index} animated={animated} />
              </div>
              {isEditMode && (
                <Button variant="destructive" size="icon" onClick={() => removeSkill(index)} className="ml-4 h-8 w-8">
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {isEditMode && (
            <Button variant="outline" onClick={addSkill} className="w-full flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
