"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllStudents } from "../data/mockData"
import { AdminPanel } from "./admin-panel"
import { StudentManagement } from "./student-management"
import type { StudentInfo } from "../types/performance"
import { Settings, Users, UserCog, LogOut, BarChart3, Calendar, Crown } from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showStudentManagement, setShowStudentManagement] = useState(false)
  const [students] = useState<StudentInfo[]>(getAllStudents())

  if (showStudentManagement) {
    return <StudentManagement onClose={() => setShowStudentManagement(false)} />
  }

  if (showAdminPanel) {
    return (
      <AdminPanel
        sessionsData={[]} // Empty since this is general admin access
        onUpdateSession={() => {}} // No session updates in general admin
        onClose={() => setShowAdminPanel(false)}
        onManageStudents={() => {
          setShowAdminPanel(false)
          setShowStudentManagement(true)
        }}
      />
    )
  }

  const individualStudents = students.filter((s) => s.programType === "individual")
  const groupStudents = students.filter((s) => s.programType === "group")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-12 w-auto" />
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-[#152c44]" />
              <div>
                <h1 className="text-3xl font-bold text-[#152c44]">Admin Dashboard</h1>
                <p className="text-slate-600">Comprehensive system management and oversight</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#152c44]/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Students</p>
                  <p className="text-3xl font-bold text-[#152c44]">{students.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#152c44]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Individual Program</p>
                  <p className="text-3xl font-bold text-blue-600">{individualStudents.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Group Program</p>
                  <p className="text-3xl font-bold text-green-600">{groupStudents.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Sessions</p>
                  <p className="text-3xl font-bold text-purple-600">{students.length * 16}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card
            className="border-[#152c44]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setShowStudentManagement(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#152c44]">
                <UserCog className="h-6 w-6" />
                Student Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Create, edit, and manage student accounts and program enrollments</p>
              <Button className="w-full bg-[#152c44] hover:bg-[#152c44]/90 text-white">Manage Students</Button>
            </CardContent>
          </Card>

          <Card
            className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setShowAdminPanel(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Settings className="h-6 w-6" />
                Performance Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Edit student performance data, scores, and session information</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Manage Performance</Button>
            </CardContent>
          </Card>
        </div>

        {/* Students Overview */}
        <Card className="border-[#152c44]/20">
          <CardHeader>
            <CardTitle className="text-[#152c44]">Students Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No students found. Create your first student to get started.</p>
                </div>
              ) : (
                students.map((student) => (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={student.profilePicture || "/placeholder.svg"}
                        alt={student.studentName}
                        className="w-12 h-12 rounded-full border-2 border-[#152c44]/20"
                      />
                      <div>
                        <h3 className="font-semibold text-[#152c44]">{student.studentName}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>ID: {student.studentId}</span>
                          <span>•</span>
                          <span className="font-mono bg-slate-100 px-2 py-1 rounded">Code: {student.studentCode}</span>
                        </div>
                        <p className="text-xs text-slate-500">Created: {student.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={student.programType === "individual" ? "default" : "secondary"}
                        className={
                          student.programType === "individual"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {student.programType === "individual" ? "Individual Program" : "Group Program"}
                      </Badge>
                      <Badge variant={student.isActive ? "default" : "secondary"}>
                        {student.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
