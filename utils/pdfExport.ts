import jsPDF from "jspdf"
import type { SessionData } from "../types/performance"

export async function exportSessionToPDF(sessionData: SessionData) {
  try {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    let yPosition = margin

    // Colors
    const colors = {
      primary: "#152c44",
      secondary: "#64748b",
      success: "#16a34a",
      warning: "#d97706",
      danger: "#dc2626",
      light: "#f8fafc",
      dark: "#1e293b",
      gold: "#d4af37",
    }

    // Helper functions
    const addTitle = (text: string, size = 16) => {
      doc.setFontSize(size)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(colors.primary)
      doc.text(text, margin, yPosition)
      yPosition += size * 0.5 + 5
    }

    const addText = (text: string, size = 10) => {
      doc.setFontSize(size)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(colors.dark)
      doc.text(text, margin, yPosition)
      yPosition += size * 0.4 + 2
    }

    // Header
    doc.setFillColor(colors.primary)
    doc.rect(0, 0, pageWidth, 25, "F")

    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("STUDENT PERFORMANCE REPORT", margin, 15)

    doc.setFontSize(12)
    doc.setTextColor(colors.gold)
    doc.text(`${sessionData.student.studentName} - ${sessionData.sessionName}`, pageWidth - margin - 80, 15)

    yPosition = 35

    // Student Info
    addTitle("STUDENT INFORMATION")
    addText(`Name: ${sessionData.student.studentName}`)
    addText(`Student ID: ${sessionData.student.studentId}`)
    addText(`Student Code: ${sessionData.student.studentCode}`)
    addText(`Session: ${sessionData.sessionName} (${sessionData.date})`)

    yPosition += 10

    // Performance Summary
    addTitle("PERFORMANCE SUMMARY")
    addText(`Academic Achievement: ${sessionData.academicAchievement.percentageScore}%`)
    addText(`Grade Point Average: ${sessionData.academicAchievement.gpa}/4.0`)
    addText(`Class Engagement: ${sessionData.participation.overallEngagement}%`)
    addText(`Class Attendance: ${sessionData.participation.classAttendance}%`)

    yPosition += 10

    // Academic Details
    addTitle("ACADEMIC PERFORMANCE")

    const quizAvg = Math.round(
      sessionData.academicAchievement.testScores.quizzes.reduce((a, b) => a + b.score, 0) /
        sessionData.academicAchievement.testScores.quizzes.length,
    )

    const examAvg = Math.round(
      sessionData.academicAchievement.testScores.exams.reduce((a, b) => a + b.score, 0) /
        sessionData.academicAchievement.testScores.exams.length,
    )

    addText(`Quiz Average: ${quizAvg}%`)
    addText(`Exam Average: ${examAvg}%`)
    addText(`Project Performance: ${sessionData.academicAchievement.projectPerformance}%`)

    // Individual Scores
    yPosition += 5
    addText("Individual Quiz Scores:")
    sessionData.academicAchievement.testScores.quizzes.forEach((quiz, i) => {
      addText(`  Quiz ${i + 1}: ${quiz.score}% (Grade: ${quiz.grade})`)
    })

    addText("Individual Exam Scores:")
    sessionData.academicAchievement.testScores.exams.forEach((exam, i) => {
      addText(`  Exam ${i + 1}: ${exam.score}% (Grade: ${exam.grade})`)
    })

    doc.save(`${sessionData.student.studentName}_${sessionData.sessionName}_Report.pdf`)
  } catch (error) {
    console.error("PDF Export Error:", error)
    alert("There was an error generating the PDF. Please try again.")
  }
}

// Helper functions remain the same
function getGrade(score: number): string {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

function getGPAGrade(gpa: number): string {
  if (gpa >= 3.7) return "A"
  if (gpa >= 3.0) return "B"
  if (gpa >= 2.0) return "C"
  if (gpa >= 1.0) return "D"
  return "F"
}

function getStatus(score: number): string {
  if (score >= 85) return "Excellent"
  if (score >= 75) return "Good"
  if (score >= 65) return "Satisfactory"
  return "Needs Improvement"
}

function getGPAStatus(gpa: number): string {
  if (gpa >= 3.5) return "Excellent"
  if (gpa >= 3.0) return "Good"
  if (gpa >= 2.5) return "Satisfactory"
  return "Needs Improvement"
}

function getSkillLevel(score: number): string {
  if (score >= 90) return "Expert"
  if (score >= 80) return "Advanced"
  if (score >= 70) return "Intermediate"
  if (score >= 60) return "Developing"
  return "Beginning"
}

function getEngagementStatus(actual: number, target: number): string {
  if (actual >= target) return "Target Met"
  if (actual >= target * 0.8) return "Near Target"
  return "Below Target"
}

function getStrongestArea(data: SessionData): string {
  const academic = data.academicAchievement.percentageScore
  const skills = Math.round(
    (data.skillDevelopment.problemSolving +
      data.skillDevelopment.criticalThinking +
      data.skillDevelopment.creativity +
      data.skillDevelopment.innovation) /
      4,
  )
  const participation = data.participation.overallEngagement

  if (academic >= skills && academic >= participation) return "Academic Performance"
  if (skills >= participation) return "Skill Development"
  return "Class Engagement"
}

function getWeakestArea(data: SessionData): string {
  const academic = data.academicAchievement.percentageScore
  const skills = Math.round(
    (data.skillDevelopment.problemSolving +
      data.skillDevelopment.criticalThinking +
      data.skillDevelopment.creativity +
      data.skillDevelopment.innovation) /
      4,
  )
  const participation = data.participation.overallEngagement

  if (academic <= skills && academic <= participation) return "Academic Performance"
  if (skills <= participation) return "Skill Development"
  return "Class Engagement"
}

function getOverallTrend(data: SessionData): string {
  const academic = data.academicAchievement.percentageScore
  const skills = Math.round(
    (data.skillDevelopment.problemSolving +
      data.skillDevelopment.criticalThinking +
      data.skillDevelopment.creativity +
      data.skillDevelopment.innovation) /
      4,
  )
  const participation = data.participation.overallEngagement
  const average = (academic + skills + participation) / 3

  if (average >= 85) return "excellent"
  if (average >= 75) return "good"
  if (average >= 65) return "satisfactory"
  return "developing"
}

function generateRecommendations(data: SessionData): string[] {
  const recommendations = []

  if (data.academicAchievement.percentageScore < 75) {
    recommendations.push("Strengthen study strategies and test preparation methods")
  }

  if (data.skillDevelopment.technicalSkills.coding < 80) {
    recommendations.push("Increase programming practice with structured coding exercises")
  }

  if (data.participation.classAttendance < 90) {
    recommendations.push("Prioritize consistent class attendance for better learning outcomes")
  }

  if (data.skillDevelopment.softSkills.communication < 80) {
    recommendations.push("Engage more actively in class discussions and presentations")
  }

  if (data.skillDevelopment.problemSolving < 80) {
    recommendations.push("Practice analytical thinking through complex problem-solving exercises")
  }

  if (recommendations.length === 0) {
    recommendations.push("Maintain current excellent performance standards")
    recommendations.push("Take on advanced challenges and leadership opportunities")
    recommendations.push("Mentor other students to further develop teaching skills")
  }

  return recommendations.slice(0, 5)
}

function generateGoals(data: SessionData): string[] {
  const goals = []

  const currentAcademic = data.academicAchievement.percentageScore
  const targetAcademic = Math.min(100, currentAcademic + (currentAcademic < 85 ? 10 : 5))
  goals.push(`Achieve ${targetAcademic}% in overall academic performance`)

  const currentAttendance = data.participation.classAttendance
  if (currentAttendance < 95) {
    goals.push(`Improve attendance to ${Math.min(100, currentAttendance + 10)}%`)
  }

  goals.push(`Complete ${data.participation.presentationsGiven + 1} presentations this session`)

  const weakestSkill = getLowestSkill(data)
  goals.push(`Improve ${weakestSkill} by 15 points`)

  return goals
}

function getLowestSkill(data: SessionData): string {
  const skills = {
    "Programming Skills": data.skillDevelopment.technicalSkills.coding,
    Communication: data.skillDevelopment.softSkills.communication,
    "Problem Solving": data.skillDevelopment.problemSolving,
    "Critical Thinking": data.skillDevelopment.criticalThinking,
  }

  return Object.entries(skills).reduce(
    (lowest, [name, score]) => (score < skills[lowest] ? name : lowest),
    Object.keys(skills)[0],
  )
}
