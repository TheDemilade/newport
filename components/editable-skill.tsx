"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface EditableSkillProps {
  name: string
  level: number
  index: number
  animated: boolean
}

export function EditableSkill({ name, level, index, animated }: EditableSkillProps) {
  const { isEditMode } = useEditMode()
  const [skillName, setSkillName] = useState(name)
  const [skillLevel, setSkillLevel] = useState(level)

  // Update the state when props change
  useEffect(() => {
    setSkillName(name)
    setSkillLevel(level)
  }, [name, level])

  // Update the global data object
  const updateGlobalData = (newName: string, newLevel: number) => {
    if (!window.portfolioData) {
      window.portfolioData = {}
    }

    if (!window.portfolioData.skills) {
      window.portfolioData.skills = []
    }

    if (!window.portfolioData.skills[index]) {
      window.portfolioData.skills[index] = {}
    }

    window.portfolioData.skills[index] = {
      name: newName,
      level: newLevel,
    }
  }

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setSkillName(newName)
    updateGlobalData(newName, skillLevel)
  }

  // Handle level change
  const handleLevelChange = (value: number[]) => {
    const newLevel = value[0]
    setSkillLevel(newLevel)
    updateGlobalData(skillName, newLevel)
  }

  if (isEditMode) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input value={skillName} onChange={handleNameChange} placeholder="Skill name" className="flex-1" />
          <Input
            type="number"
            min="0"
            max="100"
            value={skillLevel}
            onChange={(e) => handleLevelChange([Number.parseInt(e.target.value)])}
            className="w-20"
          />
        </div>
        <Slider value={[skillLevel]} min={0} max={100} step={1} onValueChange={handleLevelChange} />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h3 className="font-medium">{skillName}</h3>
        <span className="text-primary font-medium">{animated ? `${skillLevel}%` : "0%"}</span>
      </div>
      <div className={`skill-bar ${animated ? "animate" : ""}`}>
        <div className="skill-progress" style={{ "--progress": `${skillLevel}%` } as React.CSSProperties}></div>
      </div>
    </div>
  )
}
