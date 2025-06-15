import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SkillDevelopment } from "../types/performance"
import { ProgressBar } from "./progress-bar"
import { Code, Users, Lightbulb, Brain } from "lucide-react"

interface SkillDevelopmentProps {
  data: SkillDevelopment
}

export function SkillDevelopmentCard({ data }: SkillDevelopmentProps) {
  return (
    <Card className="border-[#152c44]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#152c44]">
          <Brain className="h-5 w-5" />
          Skill Development
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2 text-[#152c44]">
            <Code className="h-4 w-4" />
            Technical Skills
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-600 mb-1 block">C Programming Language</span>
                <ProgressBar value={data.technicalSkills.cProgramming} />
              </div>
              <div>
                <span className="text-sm text-slate-600 mb-1 block">HTML/CSS Essentials</span>
                <ProgressBar value={data.technicalSkills.htmlCss} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-600 mb-1 block">JavaScript Essentials</span>
                <ProgressBar value={data.technicalSkills.jsEssentials} />
              </div>
              <div>
                <span className="text-sm text-slate-600 mb-1 block">Block Based Code</span>
                <ProgressBar value={data.technicalSkills.blockBasedCode} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-600 mb-1 block">Circuit Design</span>
                <ProgressBar value={data.technicalSkills.circuitDesign} />
              </div>
              <div>
                <span className="text-sm text-slate-600 mb-1 block">Electric Circuits Basics</span>
                <ProgressBar value={data.technicalSkills.electricCircuits} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-600 mb-1 block">AI Essentials</span>
                <ProgressBar value={data.technicalSkills.aiEssentials} />
              </div>
              <div>
                <span className="text-sm text-slate-600 mb-1 block">UI/UX Essentials</span>
                <ProgressBar value={data.technicalSkills.uiUxEssentials} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-slate-600 mb-1 block">Robotics Essentials</span>
                <ProgressBar value={data.technicalSkills.roboticsEssentials} />
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Interpersonal Skills */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2 text-[#152c44]">
            <Users className="h-4 w-4" />
            Interpersonal Skills
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Communication Skills</span>
              <ProgressBar value={data.interpersonalSkills.communicationSkills} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Presentation Skills</span>
              <ProgressBar value={data.interpersonalSkills.presentationSkills} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Time Management</span>
              <ProgressBar value={data.interpersonalSkills.timeManagement} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Negotiation</span>
              <ProgressBar value={data.interpersonalSkills.negotiation} />
            </div>
          </div>
        </div>

        {/* Core Competencies - 2x2 Grid */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2 text-[#152c44]">
            <Lightbulb className="h-4 w-4" />
            Core Competencies
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Problem Solving</span>
              <ProgressBar value={data.problemSolving} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Critical Thinking</span>
              <ProgressBar value={data.criticalThinking} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Creativity</span>
              <ProgressBar value={data.creativity} />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Innovation</span>
              <ProgressBar value={data.innovation} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
