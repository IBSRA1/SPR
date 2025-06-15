"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateMockDataForStudent } from "./data/mockData"
import { AcademicAchievementCard } from "./components/academic-achievement"
import { SkillDevelopmentCard } from "./components/skill-development"
import { ParticipationCard } from "./components/participation"
import { AdminPanel } from "./components/admin-panel"
import { MainPortal } from "./components/main-portal"
import { StudentManagement } from "./components/student-management"
import { Calendar, TrendingUp, Award, Target, Users, LogOut } from "lucide-react"
import { exportSessionToPDF } from "./utils/pdfExport"
import { Download } from "lucide-react"
import type { SessionData, StudentInfo } from "./types/performance"
import { AdminDashboard } from "./components/admin-dashboard"

export default function StudentPerformanceDashboard() {
  const [selectedSession, setSelectedSession] = useState(1)
  const [sessionsData, setSessionsData] = useState<SessionData[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showStudentManagement, setShowStudentManagement] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<StudentInfo | null>(null)
  const [showFullAdmin, setShowFullAdmin] = useState(false)

  const currentSessionData = sessionsData.find((session) => session.sessionId === selectedSession)

  const handleStudentLogin = (student: StudentInfo) => {
    setCurrentStudent(student)
    const studentSessions = generateMockDataForStudent(student)
    setSessionsData(studentSessions)
  }

  const handleLogout = () => {
    setCurrentStudent(null)
    setSessionsData([])
    setSelectedSession(1)
    setShowAdminPanel(false)
    setShowStudentManagement(false)
    setIsAdmin(false)
    setShowFullAdmin(false)
  }

  const handleUpdateSession = (updatedSession: SessionData) => {
    setSessionsData((prev) =>
      prev.map((session) => (session.sessionId === updatedSession.sessionId ? updatedSession : session)),
    )
  }

  // Remove handleAdminAccess function for students
  // const handleAdminAccess = () => {
  //   setIsAdmin(true)
  //   setShowAdminPanel(true)
  // }

  const handleAdminAccess = () => {
    setShowFullAdmin(true)
  }

  // Show main portal if no student is logged in and not showing full admin
  if (!currentStudent && !showFullAdmin) {
    return <MainPortal onStudentLogin={handleStudentLogin} onAdminAccess={handleAdminAccess} />
  }

  // Show admin dashboard if full admin access
  if (showFullAdmin) {
    return (
      <AdminDashboard
        onLogout={() => {
          setShowFullAdmin(false)
          setIsAdmin(false)
          handleLogout()
        }}
      />
    )
  }

  if (showStudentManagement) {
    return <StudentManagement onClose={() => setShowStudentManagement(false)} />
  }

  if (!currentSessionData) return null

  if (showAdminPanel) {
    return (
      <AdminPanel
        sessionsData={sessionsData}
        onUpdateSession={handleUpdateSession}
        onClose={() => setShowAdminPanel(false)}
        onManageStudents={() => {
          setShowAdminPanel(false)
          setShowStudentManagement(true)
        }}
      />
    )
  }

  const skillAverage = Math.round(
    (currentSessionData.skillDevelopment.problemSolving +
      currentSessionData.skillDevelopment.criticalThinking +
      currentSessionData.skillDevelopment.creativity +
      currentSessionData.skillDevelopment.innovation) /
      4,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with IBSRA branding and Student Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-12 w-auto" />
                <div>
                  <h1 className="text-3xl font-bold text-[#152c44]">Student Performance Dashboard</h1>
                  <p className="text-slate-600">Comprehensive academic and skill development tracking</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Only show logout for students */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Student Profile Card with Program Type */}
          <Card className="mb-6 border-[#152c44]/20 bg-gradient-to-r from-[#152c44]/5 to-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={currentStudent.profilePicture || "/placeholder.svg"}
                    alt={currentStudent.studentName}
                    className="w-16 h-16 rounded-full border-2 border-[#152c44]/20"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-[#152c44]">{currentStudent.studentName}</h2>
                    <p className="text-slate-600">Student ID: {currentStudent.studentId}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-500 text-sm">Code: {currentStudent.studentCode}</p>
                      <Badge
                        variant={currentStudent.programType === "individual" ? "default" : "secondary"}
                        className={
                          currentStudent.programType === "individual"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {currentStudent.programType === "individual" ? "Individual Program" : "Group Program"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-slate-600">
                    Overall Performance: {currentSessionData.academicAchievement.percentageScore}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Session Info */}
          <Card className="mb-6 border-[#152c44]/20 bg-gradient-to-r from-[#152c44]/5 to-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-[#152c44]" />
                  <span className="font-semibold text-[#152c44]">
                    Current Session: {currentSessionData.sessionName}
                  </span>
                  <Badge
                    variant={currentSessionData.sessionType === "individual" ? "default" : "secondary"}
                    className={
                      currentSessionData.sessionType === "individual"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {currentSessionData.sessionType === "individual" ? "Individual" : "Group"} Session
                  </Badge>
                  <span className="text-slate-500">({currentSessionData.date})</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Filter Buttons */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-[#152c44]">
            {currentStudent.programType === "individual" ? "Individual Sessions" : "Group Sessions"} (
            {sessionsData.length} sessions)
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2">
            {sessionsData.map((session) => (
              <Button
                key={session.sessionId}
                variant={selectedSession === session.sessionId ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSession(session.sessionId)}
                className={`h-12 transition-all duration-200 flex flex-col items-center justify-center ${
                  selectedSession === session.sessionId
                    ? "bg-[#152c44] hover:bg-[#152c44]/90 text-white shadow-lg"
                    : "border-[#152c44]/30 text-[#152c44] hover:bg-[#152c44]/10 hover:border-[#152c44]/50"
                }`}
              >
                <span className="text-sm font-bold">{session.sessionId}</span>
                <span className="text-xs opacity-75">{session.sessionType === "individual" ? "IND" : "GRP"}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Session Summary with Key Metrics */}
        <Card className="mb-8 border-[#152c44]/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-[#152c44] text-xl">Session Performance Summary</CardTitle>
            <Button
              onClick={() => exportSessionToPDF(currentSessionData)}
              size="sm"
              className="flex items-center gap-2 bg-[#152c44] hover:bg-[#152c44]/90 text-white shadow-md"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </CardHeader>
          <CardContent>
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-[#152c44]/10 to-blue-50 rounded-lg">
                <Award className="h-8 w-8 text-[#152c44] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#152c44] mb-1">
                  {currentSessionData.academicAchievement.gpa}
                </div>
                <div className="text-sm text-slate-600">Grade Point Average</div>
                <div className="text-xs text-slate-500 mt-1">out of 4.0</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {currentSessionData.academicAchievement.percentageScore}%
                </div>
                <div className="text-sm text-slate-600">Academic Performance</div>
                <div className="text-xs text-slate-500 mt-1">overall score</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600 mb-1">{skillAverage}%</div>
                <div className="text-sm text-slate-600">Skill Development</div>
                <div className="text-xs text-slate-500 mt-1">average score</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {currentSessionData.participation.overallEngagement}%
                </div>
                <div className="text-sm text-slate-600">Class Engagement</div>
                <div className="text-xs text-slate-500 mt-1">participation level</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Program Type</span>
                <Badge
                  variant={currentSessionData.sessionType === "individual" ? "default" : "secondary"}
                  className={
                    currentSessionData.sessionType === "individual"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }
                >
                  {currentSessionData.sessionType === "individual" ? "Individual" : "Group"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Attendance</span>
                <span className="font-semibold text-[#152c44]">
                  {currentSessionData.participation.classAttendance}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Project Score</span>
                <span className="font-semibold text-[#152c44]">
                  {currentSessionData.academicAchievement.projectPerformance}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Test Average</span>
                <span className="font-semibold text-[#152c44]">
                  {currentSessionData.academicAchievement.testScores.average}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Cards with Better Spacing */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div id="academic-achievement-card" className="xl:col-span-1">
            <AcademicAchievementCard data={currentSessionData.academicAchievement} />
          </div>
          <div id="skill-development-card" className="xl:col-span-1">
            <SkillDevelopmentCard data={currentSessionData.skillDevelopment} />
          </div>
          <div id="participation-card" className="xl:col-span-1">
            <ParticipationCard data={currentSessionData.participation} />
          </div>
        </div>
      </div>
    </div>
  )
}
