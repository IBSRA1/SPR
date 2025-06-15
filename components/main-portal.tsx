"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getAllStudents, addStudent, getStudentByCode } from "../data/mockData"
import type { StudentInfo } from "../types/performance"
import { User, Lock, Plus, Settings, Users, UserCheck, Crown } from "lucide-react"

interface MainPortalProps {
  onStudentLogin: (student: StudentInfo) => void
  onAdminAccess: () => void
}

export function MainPortal({ onStudentLogin, onAdminAccess }: MainPortalProps) {
  const [studentCode, setStudentCode] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showStudentCreation, setShowStudentCreation] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [students, setStudents] = useState<StudentInfo[]>(getAllStudents())

  // Student creation form
  const [newStudentForm, setNewStudentForm] = useState({
    studentName: "",
    studentCode: "",
    programType: "" as "individual" | "group" | "",
  })

  const handleStudentLogin = async () => {
    if (!studentCode.trim()) {
      setError("Please enter your student code")
      return
    }

    setIsLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const student = getStudentByCode(studentCode.trim())
    if (student) {
      onStudentLogin(student)
    } else {
      setError("Invalid student code. Please check and try again.")
    }

    setIsLoading(false)
  }

  const handleAdminLogin = async () => {
    if (!adminPassword.trim()) {
      setError("Please enter admin password")
      return
    }

    if (adminPassword === "Sameh@1999") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setError("")
      setAdminPassword("")
    } else {
      setError("Invalid admin password")
    }
  }

  const handleCreateStudent = () => {
    if (!newStudentForm.studentName.trim() || !newStudentForm.studentCode.trim() || !newStudentForm.programType) {
      setError("Please fill in all required fields")
      return
    }

    // Check if student code already exists
    if (students.some((s) => s.studentCode.toLowerCase() === newStudentForm.studentCode.toLowerCase())) {
      setError("Student code already exists. Please use a different code.")
      return
    }

    const newStudent = addStudent({
      studentName: newStudentForm.studentName,
      studentCode: newStudentForm.studentCode,
      programType: newStudentForm.programType,
      profilePicture: "/placeholder.svg?height=100&width=100",
      isActive: true,
    })

    setStudents(getAllStudents())
    setShowStudentCreation(false)
    setNewStudentForm({
      studentName: "",
      studentCode: "",
      programType: "",
    })
    setError("")
    alert(`Student ${newStudent.studentName} created successfully for ${newStudent.programType} sessions program!`)
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: "student" | "admin") => {
    if (e.key === "Enter") {
      if (action === "student") {
        handleStudentLogin()
      } else {
        handleAdminLogin()
      }
    }
  }

  const resetNewStudentForm = () => {
    setNewStudentForm({
      studentName: "",
      studentCode: "",
      programType: "",
    })
    setError("")
  }

  const handleFullAdminAccess = () => {
    // This will trigger the full admin dashboard
    onAdminAccess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header with IBSRA branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-20 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-[#152c44] mb-2">IBSRA Learning Portal</h1>
          <p className="text-slate-600 text-lg">Student Performance Management System</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Login Card */}
          <Card className="border-[#152c44]/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-[#152c44] text-xl">
                <User className="h-6 w-6" />
                Student Access
              </CardTitle>
              <p className="text-slate-600">Enter your student code to access your dashboard</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="studentCode" className="text-[#152c44] flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Student Code
                </Label>
                <Input
                  id="studentCode"
                  type="text"
                  placeholder="Enter your student code (e.g., AH2024)"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, "student")}
                  className="mt-2 border-[#152c44]/30 focus:border-[#152c44] text-center font-mono text-lg"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleStudentLogin}
                disabled={isLoading}
                className="w-full bg-[#152c44] hover:bg-[#152c44]/90 text-white"
              >
                {isLoading ? "Verifying..." : "Access Dashboard"}
              </Button>

              <div className="text-center text-sm text-slate-500 mt-4">
                <p>Demo Student Codes:</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div className="bg-blue-50 px-2 py-1 rounded">
                    <span className="font-mono">AH2024</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      IND
                    </Badge>
                  </div>
                  <div className="bg-green-50 px-2 py-1 rounded">
                    <span className="font-mono">FZ2024</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      GRP
                    </Badge>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 rounded">
                    <span className="font-mono">OK2024</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      IND
                    </Badge>
                  </div>
                </div>
                <p className="text-xs mt-2 text-slate-400">IND = Individual Sessions, GRP = Group Sessions</p>
              </div>
            </CardContent>
          </Card>

          {/* Admin Access Card */}
          <Card className="border-[#152c44]/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-[#152c44] text-xl">
                <Crown className="h-6 w-6" />
                Admin Access
              </CardTitle>
              <p className="text-slate-600">Manage students and session programs</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isAdmin ? (
                <>
                  <div>
                    <Label htmlFor="adminPassword" className="text-[#152c44] flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Admin Password
                    </Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "admin")}
                      className="mt-2 border-[#152c44]/30 focus:border-[#152c44]"
                    />
                  </div>

                  <Button onClick={handleAdminLogin} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Admin Login
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-semibold">Admin Access Granted</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Dialog open={showStudentCreation} onOpenChange={setShowStudentCreation}>
                      <DialogTrigger asChild>
                        <Button
                          className="flex items-center gap-2 bg-[#152c44] hover:bg-[#152c44]/90 text-white"
                          onClick={resetNewStudentForm}
                        >
                          <Plus className="h-4 w-4" />
                          Add Student
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-[#152c44]">Create New Student</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="newStudentName" className="text-[#152c44]">
                              Student Name *
                            </Label>
                            <Input
                              id="newStudentName"
                              value={newStudentForm.studentName}
                              onChange={(e) => setNewStudentForm({ ...newStudentForm, studentName: e.target.value })}
                              placeholder="Enter full name"
                              className="border-[#152c44]/30 focus:border-[#152c44]"
                            />
                          </div>
                          <div>
                            <Label htmlFor="newStudentCode" className="text-[#152c44]">
                              Student Code *
                            </Label>
                            <Input
                              id="newStudentCode"
                              value={newStudentForm.studentCode}
                              onChange={(e) =>
                                setNewStudentForm({ ...newStudentForm, studentCode: e.target.value.toUpperCase() })
                              }
                              placeholder="e.g., JS2024"
                              className="border-[#152c44]/30 focus:border-[#152c44] font-mono"
                            />
                          </div>
                          <div>
                            <Label htmlFor="programType" className="text-[#152c44]">
                              Session Program *
                            </Label>
                            <Select
                              value={newStudentForm.programType}
                              onValueChange={(value: "individual" | "group") =>
                                setNewStudentForm({ ...newStudentForm, programType: value })
                              }
                            >
                              <SelectTrigger className="border-[#152c44]/30 focus:border-[#152c44]">
                                <SelectValue placeholder="Select program type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="individual">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-600" />
                                    Individual Sessions Program
                                  </div>
                                </SelectItem>
                                <SelectItem value="group">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-green-600" />
                                    Group Sessions Program
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowStudentCreation(false)
                                resetNewStudentForm()
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCreateStudent}
                              className="bg-[#152c44] hover:bg-[#152c44]/90 text-white"
                            >
                              Create Student
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={handleFullAdminAccess}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Settings className="h-4 w-4" />
                      Full Admin
                    </Button>
                  </div>

                  {/* Students Overview */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-[#152c44] mb-3">Current Students</h3>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {students.map((student) => (
                        <div
                          key={student.studentId}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{student.studentName}</span>
                            <span className="font-mono text-slate-500">({student.studentCode})</span>
                          </div>
                          <Badge
                            variant={student.programType === "individual" ? "default" : "secondary"}
                            className={
                              student.programType === "individual"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {student.programType === "individual" ? "Individual" : "Group"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="mt-4 text-center">
            <div className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
          </div>
        )}

        {/* Program Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 text-lg">
                <User className="h-5 w-5" />
                Individual Sessions Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-sm">
                Personalized learning experience with 16 individual sessions focused on personal skill development and
                academic achievement.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 text-lg">
                <Users className="h-5 w-5" />
                Group Sessions Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-sm">
                Collaborative learning environment with 16 group sessions emphasizing teamwork, communication, and
                collective problem-solving.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
