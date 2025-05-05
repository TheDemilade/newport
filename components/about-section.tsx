"use client"

import { EditableField } from "@/components/editable-field"
import { Button } from "@/components/ui/button"
import { FileDown, MapPin, Mail } from "lucide-react"
import { generateCV } from "@/lib/generate-cv"

export function AboutSection() {
  // Handle CV download
  const handleDownloadCV = () => {
    generateCV()
  }

  return (
    <section id="about" className="section-padding bg-accent">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg">
              <EditableField
                value="I'm a passionate frontend developer with over 5 years of experience creating beautiful, responsive, and user-friendly websites. I specialize in React, Next.js, and modern CSS frameworks like Tailwind."
                path="about[0]"
                multiline
              />
            </p>
            <p className="text-lg">
              <EditableField
                value="Based in New York City, I graduated from Columbia University with a degree in Computer Science. I've worked with startups and established companies to bring their digital visions to life."
                path="about[1]"
                multiline
              />
            </p>
            <p className="text-lg">
              <EditableField
                value="When I'm not coding, you can find me hiking, reading science fiction, or experimenting with new technologies. My mission is to create digital experiences that are both beautiful and functional."
                path="about[2]"
                multiline
              />
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Details</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">
                    <EditableField value="New York, USA" path="location" />
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    <EditableField value="hello@yourname.com" path="email" />
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleDownloadCV}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <FileDown className="h-5 w-5 mr-2" /> Download CV
          </Button>
        </div>
      </div>
    </section>
  )
}
