import type { SessionData, StudentInfo, SessionType } from "../types/performance"

// Update the students database to include program types
const studentsDatabase: StudentInfo[] = [
  {
    studentId: "STU001",
    studentName: "Ahmed Hassan",
    studentCode: "AH2024",
    profilePicture: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-15",
    isActive: true,
    programType: "individual", // Add program type
  },
  {
    studentId: "STU002",
    studentName: "Fatima Al-Zahra",
    studentCode: "FZ2024",
    profilePicture: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-16",
    isActive: true,
    programType: "group", // Add program type
  },
  {
    studentId: "STU003",
    studentName: "Omar Khaled",
    studentCode: "OK2024",
    profilePicture: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-17",
    isActive: true,
    programType: "individual", // Add program type
  },
]

export const getStudentByCode = (code: string): StudentInfo | null => {
  return (
    studentsDatabase.find((student) => student.studentCode.toLowerCase() === code.toLowerCase() && student.isActive) ||
    null
  )
}

export const getAllStudents = (): StudentInfo[] => {
  return studentsDatabase.filter((student) => student.isActive)
}

// Update addStudent function to include program type
export const addStudent = (student: Omit<StudentInfo, "studentId" | "createdAt">): StudentInfo => {
  const newStudent: StudentInfo = {
    ...student,
    studentId: `STU${String(studentsDatabase.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString().split("T")[0],
  }
  studentsDatabase.push(newStudent)
  return newStudent
}

export const updateStudent = (studentId: string, updates: Partial<StudentInfo>): StudentInfo | null => {
  const index = studentsDatabase.findIndex((s) => s.studentId === studentId)
  if (index !== -1) {
    studentsDatabase[index] = { ...studentsDatabase[index], ...updates }
    return studentsDatabase[index]
  }
  return null
}

export const deleteStudent = (studentId: string): boolean => {
  const index = studentsDatabase.findIndex((s) => s.studentId === studentId)
  if (index !== -1) {
    studentsDatabase[index].isActive = false
    return true
  }
  return false
}

// Update generateMockDataForStudent to create sessions based on program type
export const generateMockDataForStudent = (student: StudentInfo): SessionData[] => {
  const sessions: SessionData[] = []

  const getGrade = (score: number): string => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F"
  }

  // Generate 16 sessions based on student's program type
  for (let i = 1; i <= 16; i++) {
    const sessionType: SessionType = student.programType // Use student's program type

    const quizScores = Array.from({ length: 3 }, () => Math.floor(Math.random() * 40) + 60)
    const examScores = Array.from({ length: 2 }, () => Math.floor(Math.random() * 30) + 70)
    const presentationScores = Array.from({ length: 2 }, () => Math.floor(Math.random() * 30) + 70)

    sessions.push({
      sessionId: i,
      sessionName: `${sessionType === "individual" ? "Individual" : "Group"} Session ${i}`,
      sessionType,
      student: student,
      date: new Date(2024, 0, i * 7).toISOString().split("T")[0],
      academicAchievement: {
        testScores: {
          quizzes: quizScores.map((score) => ({ score, grade: getGrade(score) })),
          exams: examScores.map((score) => ({ score, grade: getGrade(score) })),
          presentations: presentationScores.map((score) => ({ score, grade: getGrade(score) })),
          average: Math.floor(Math.random() * 25) + 75,
        },
        assignmentGrades: Array.from({ length: 4 }, () => Math.floor(Math.random() * 30) + 70),
        projectPerformance: Math.floor(Math.random() * 25) + 75,
        gpa: Math.round((Math.random() * 1.5 + 2.5) * 100) / 100,
        percentageScore: Math.floor(Math.random() * 25) + 75,
      },
      skillDevelopment: {
        technicalSkills: {
          cProgramming: Math.floor(Math.random() * 30) + 70,
          htmlCss: Math.floor(Math.random() * 30) + 70,
          jsEssentials: Math.floor(Math.random() * 30) + 70,
          blockBasedCode: Math.floor(Math.random() * 30) + 70,
          circuitDesign: Math.floor(Math.random() * 30) + 70,
          electricCircuits: Math.floor(Math.random() * 30) + 70,
          aiEssentials: Math.floor(Math.random() * 30) + 70,
          uiUxEssentials: Math.floor(Math.random() * 30) + 70,
          roboticsEssentials: Math.floor(Math.random() * 30) + 70,
        },
        interpersonalSkills: {
          communicationSkills: Math.floor(Math.random() * 30) + 70,
          presentationSkills: Math.floor(Math.random() * 30) + 70,
          timeManagement: Math.floor(Math.random() * 30) + 70,
          negotiation: Math.floor(Math.random() * 30) + 70,
        },
        problemSolving: Math.floor(Math.random() * 30) + 70,
        criticalThinking: Math.floor(Math.random() * 30) + 70,
        creativity: Math.floor(Math.random() * 30) + 70,
        innovation: Math.floor(Math.random() * 30) + 70,
      },
      participation: {
        classAttendance: Math.floor(Math.random() * 20) + 80,
        discussionParticipation: Math.floor(Math.random() * 30) + 70,
        groupWork: sessionType === "group" ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 60,
        overallEngagement: Math.floor(Math.random() * 30) + 70,
      },
    })
  }

  return sessions
}
