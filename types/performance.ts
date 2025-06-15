export interface AcademicAchievement {
  testScores: {
    quizzes: { score: number; grade: string }[]
    exams: { score: number; grade: string }[]
    presentations: { score: number; grade: string }[]
    average: number
  }
  assignmentGrades: number[]
  projectPerformance: number
  gpa: number
  percentageScore: number
}

export interface SkillDevelopment {
  technicalSkills: {
    cProgramming: number
    htmlCss: number
    jsEssentials: number
    blockBasedCode: number
    circuitDesign: number
    electricCircuits: number
    aiEssentials: number
    uiUxEssentials: number
    roboticsEssentials: number
  }
  interpersonalSkills: {
    communicationSkills: number
    presentationSkills: number
    timeManagement: number
    negotiation: number
  }
  problemSolving: number
  criticalThinking: number
  creativity: number
  innovation: number
}

export interface Participation {
  classAttendance: number
  discussionParticipation: number
  groupWork: number
  overallEngagement: number
}

export interface StudentInfo {
  studentId: string
  studentName: string
  studentCode: string
  profilePicture: string
  createdAt: string
  isActive: boolean
  programType: "individual" | "group" // Add this field
}

export type SessionType = "individual" | "group"

export interface SessionData {
  sessionId: number
  sessionName: string
  sessionType: SessionType
  student: StudentInfo
  academicAchievement: AcademicAchievement
  skillDevelopment: SkillDevelopment
  participation: Participation
  date: string
}
