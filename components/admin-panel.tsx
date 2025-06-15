"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { SessionData } from "../types/performance"
import { Settings, Save, Calendar, UserCog, Users, BarChart3 } from "lucide-react"

interface AdminPanelProps {
  sessionsData: SessionData[]
  onUpdateSession: (sessionData: SessionData) => void
  onClose: () => void
  onManageStudents: () => void
}

export function AdminPanel({ sessionsData, onUpdateSession, onClose, onManageStudents }: AdminPanelProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1)
  const [formData, setFormData] = useState<SessionData>(
    sessionsData.find((s) => s.sessionId === selectedSessionId) || sessionsData[0],
  )

  const handleSessionSelect = (sessionId: string) => {
    const id = Number.parseInt(sessionId)
    setSelectedSessionId(id)
    const sessionData = sessionsData.find((s) => s.sessionId === id)
    if (sessionData) {
      setFormData(sessionData)
    }
  }

  const handleInputChange = (path: string, value: number | string) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value

      return newData
    })
  }

  const handleArrayChange = (path: string, index: number, field: string, value: number | string) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          current[keys[i]][index][field] = value
        } else {
          current = current[keys[i]]
        }
      }

      return newData
    })
  }

  const getGrade = (score: number): string => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F"
  }

  const handleSave = () => {
    onUpdateSession(formData)
    alert(`Session ${formData.sessionId} updated successfully!`)
  }

  const individualSessions = sessionsData.filter((s) => s.sessionType === "individual")
  const groupSessions = sessionsData.filter((s) => s.sessionType === "group")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-10 w-auto" />
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-[#152c44]" />
              <div>
                <h1 className="text-3xl font-bold text-[#152c44]">Admin Panel</h1>
                <p className="text-slate-600">Manage student performance data and accounts</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onManageStudents}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <UserCog className="h-4 w-4" />
              Manage Students
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#152c44] text-[#152c44] hover:bg-[#152c44] hover:text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#152c44]/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Sessions</p>
                  <p className="text-3xl font-bold text-[#152c44]">{sessionsData.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-[#152c44]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Individual Sessions</p>
                  <p className="text-3xl font-bold text-blue-600">{individualSessions.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Group Sessions</p>
                  <p className="text-3xl font-bold text-green-600">{groupSessions.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-[#152c44]/20">
          <CardHeader>
            <CardTitle className="text-[#152c44]">Select Session to Edit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#152c44]">Session</Label>
                <Select value={selectedSessionId.toString()} onValueChange={handleSessionSelect}>
                  <SelectTrigger className="w-full border-[#152c44]/30 focus:border-[#152c44]">
                    <SelectValue placeholder="Select a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionsData.map((session) => (
                      <SelectItem key={session.sessionId} value={session.sessionId.toString()}>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={session.sessionType === "individual" ? "default" : "secondary"}
                            className={
                              session.sessionType === "individual"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {session.sessionType === "individual" ? "IND" : "GRP"}
                          </Badge>
                          {session.sessionName} - {session.date}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sessionDate" className="text-[#152c44] flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Session Date
                </Label>
                <Input
                  id="sessionDate"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="border-[#152c44]/30 focus:border-[#152c44]"
                />
              </div>
            </div>
            {formData && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Session Type:</span>
                    <Badge
                      variant={formData.sessionType === "individual" ? "default" : "secondary"}
                      className={
                        formData.sessionType === "individual"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {formData.sessionType === "individual" ? "Individual Session" : "Group Session"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Student:</span>
                    <span className="text-sm text-[#152c44] font-medium">{formData.student.studentName}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#152c44]/10">
            <TabsTrigger value="academic" className="data-[state=active]:bg-[#152c44] data-[state=active]:text-white">
              Academic Achievement
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-[#152c44] data-[state=active]:text-white">
              Skill Development
            </TabsTrigger>
            <TabsTrigger
              value="participation"
              className="data-[state=active]:bg-[#152c44] data-[state=active]:text-white"
            >
              Participation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic">
            <Card className="border-[#152c44]/20">
              <CardHeader>
                <CardTitle className="text-[#152c44]">Academic Achievement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gpa" className="text-[#152c44]">
                      GPA (0-4.0)
                    </Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.academicAchievement.gpa}
                      onChange={(e) => handleInputChange("academicAchievement.gpa", Number.parseFloat(e.target.value))}
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="percentage" className="text-[#152c44]">
                      Overall Percentage
                    </Label>
                    <Input
                      id="percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.academicAchievement.percentageScore}
                      onChange={(e) =>
                        handleInputChange("academicAchievement.percentageScore", Number.parseInt(e.target.value))
                      }
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                </div>

                {/* Quiz Scores with Grades */}
                <div>
                  <Label className="text-[#152c44]">Quiz Scores</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {formData.academicAchievement.testScores.quizzes.map((quiz, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-slate-600">Quiz {index + 1}</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={quiz.score}
                          onChange={(e) => {
                            const score = Number.parseInt(e.target.value)
                            handleArrayChange("academicAchievement.testScores.quizzes", index, "score", score)
                            handleArrayChange("academicAchievement.testScores.quizzes", index, "grade", getGrade(score))
                          }}
                          className="border-[#152c44]/30 focus:border-[#152c44]"
                        />
                        <div className="text-xs text-center">
                          <span
                            className={`px-2 py-1 rounded font-bold ${
                              quiz.grade === "A"
                                ? "bg-green-100 text-green-800"
                                : quiz.grade === "B"
                                  ? "bg-blue-100 text-blue-800"
                                  : quiz.grade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : quiz.grade === "D"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                          >
                            Grade: {quiz.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Scores with Grades */}
                <div>
                  <Label className="text-[#152c44]">Exam Scores</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {formData.academicAchievement.testScores.exams.map((exam, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-slate-600">Exam {index + 1}</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={exam.score}
                          onChange={(e) => {
                            const score = Number.parseInt(e.target.value)
                            handleArrayChange("academicAchievement.testScores.exams", index, "score", score)
                            handleArrayChange("academicAchievement.testScores.exams", index, "grade", getGrade(score))
                          }}
                          className="border-[#152c44]/30 focus:border-[#152c44]"
                        />
                        <div className="text-xs text-center">
                          <span
                            className={`px-2 py-1 rounded font-bold ${
                              exam.grade === "A"
                                ? "bg-green-100 text-green-800"
                                : exam.grade === "B"
                                  ? "bg-blue-100 text-blue-800"
                                  : exam.grade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : exam.grade === "D"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                          >
                            Grade: {exam.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Presentation Scores with Grades */}
                <div>
                  <Label className="text-[#152c44]">Presentation Scores</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {formData.academicAchievement.testScores.presentations.map((presentation, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-slate-600">Presentation {index + 1}</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={presentation.score}
                          onChange={(e) => {
                            const score = Number.parseInt(e.target.value)
                            handleArrayChange("academicAchievement.testScores.presentations", index, "score", score)
                            handleArrayChange(
                              "academicAchievement.testScores.presentations",
                              index,
                              "grade",
                              getGrade(score),
                            )
                          }}
                          className="border-[#152c44]/30 focus:border-[#152c44]"
                        />
                        <div className="text-xs text-center">
                          <span
                            className={`px-2 py-1 rounded font-bold ${
                              presentation.grade === "A"
                                ? "bg-green-100 text-green-800"
                                : presentation.grade === "B"
                                  ? "bg-blue-100 text-blue-800"
                                  : presentation.grade === "C"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : presentation.grade === "D"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                          >
                            Grade: {presentation.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="project" className="text-[#152c44]">
                    Project Performance
                  </Label>
                  <Input
                    id="project"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.academicAchievement.projectPerformance}
                    onChange={(e) =>
                      handleInputChange("academicAchievement.projectPerformance", Number.parseInt(e.target.value))
                    }
                    className="border-[#152c44]/30 focus:border-[#152c44]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="border-[#152c44]/20">
              <CardHeader>
                <CardTitle className="text-[#152c44]">Skill Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-[#152c44]">Technical Skills</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-600">C Programming Language</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.cProgramming}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.cProgramming",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">HTML/CSS Essentials</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.htmlCss}
                        onChange={(e) =>
                          handleInputChange("skillDevelopment.technicalSkills.htmlCss", Number.parseInt(e.target.value))
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">JavaScript Essentials</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.jsEssentials}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.jsEssentials",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Block Based Code</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.blockBasedCode}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.blockBasedCode",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Circuit Design</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.circuitDesign}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.circuitDesign",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Electric Circuits Basics</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.electricCircuits}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.electricCircuits",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">AI Essentials</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.aiEssentials}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.aiEssentials",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">UI/UX Essentials</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.uiUxEssentials}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.uiUxEssentials",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Robotics Essentials</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.technicalSkills.roboticsEssentials}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.technicalSkills.roboticsEssentials",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-[#152c44]">Interpersonal Skills</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-600">Communication Skills</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.interpersonalSkills.communicationSkills}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.interpersonalSkills.communicationSkills",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Presentation Skills</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.interpersonalSkills.presentationSkills}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.interpersonalSkills.presentationSkills",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Time Management</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.interpersonalSkills.timeManagement}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.interpersonalSkills.timeManagement",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Negotiation</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.interpersonalSkills.negotiation}
                        onChange={(e) =>
                          handleInputChange(
                            "skillDevelopment.interpersonalSkills.negotiation",
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-[#152c44]">Core Competencies</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-600">Problem Solving</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.problemSolving}
                        onChange={(e) =>
                          handleInputChange("skillDevelopment.problemSolving", Number.parseInt(e.target.value))
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Critical Thinking</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.criticalThinking}
                        onChange={(e) =>
                          handleInputChange("skillDevelopment.criticalThinking", Number.parseInt(e.target.value))
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Creativity</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.creativity}
                        onChange={(e) =>
                          handleInputChange("skillDevelopment.creativity", Number.parseInt(e.target.value))
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-600">Innovation</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.skillDevelopment.innovation}
                        onChange={(e) =>
                          handleInputChange("skillDevelopment.innovation", Number.parseInt(e.target.value))
                        }
                        className="border-[#152c44]/30 focus:border-[#152c44]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participation">
            <Card className="border-[#152c44]/20">
              <CardHeader>
                <CardTitle className="text-[#152c44]">Participation & Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600">Class Attendance (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.participation.classAttendance}
                      onChange={(e) =>
                        handleInputChange("participation.classAttendance", Number.parseInt(e.target.value))
                      }
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600">Discussion Participation (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.participation.discussionParticipation}
                      onChange={(e) =>
                        handleInputChange("participation.discussionParticipation", Number.parseInt(e.target.value))
                      }
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600">
                      Group Work (%){" "}
                      {formData.sessionType === "group" && (
                        <span className="text-green-600 text-xs">(Group Session)</span>
                      )}
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.participation.groupWork}
                      onChange={(e) => handleInputChange("participation.groupWork", Number.parseInt(e.target.value))}
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600">Overall Engagement (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.participation.overallEngagement}
                      onChange={(e) =>
                        handleInputChange("participation.overallEngagement", Number.parseInt(e.target.value))
                      }
                      className="border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#152c44] hover:bg-[#152c44]/90 text-white"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
