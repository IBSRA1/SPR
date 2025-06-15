import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AcademicAchievement } from "../types/performance"
import { ProgressBar } from "./progress-bar"
import { BookOpen, FileText, Trophy, GraduationCap } from "lucide-react"

interface AcademicAchievementProps {
  data: AcademicAchievement
}

export function AcademicAchievementCard({ data }: AcademicAchievementProps) {
  return (
    <Card className="border-[#152c44]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#152c44]">
          <GraduationCap className="h-5 w-5" />
          Academic Achievement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Scores */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#152c44]">
            <BookOpen className="h-4 w-4" />
            Test Performance
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Quiz Average</span>
              <ProgressBar
                value={Math.round(
                  data.testScores.quizzes.reduce((a, b) => a + b.score, 0) / data.testScores.quizzes.length,
                )}
              />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Exam Average</span>
              <ProgressBar
                value={Math.round(
                  data.testScores.exams.reduce((a, b) => a + b.score, 0) / data.testScores.exams.length,
                )}
              />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Presentation Average</span>
              <ProgressBar
                value={Math.round(
                  data.testScores.presentations.reduce((a, b) => a + b.score, 0) / data.testScores.presentations.length,
                )}
              />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Overall Test Average</span>
              <ProgressBar value={data.testScores.average} />
            </div>
          </div>
        </div>

        {/* Assignment Performance */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#152c44]">
            <FileText className="h-4 w-4" />
            Coursework Performance
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Assignment Average</span>
              <ProgressBar
                value={Math.round(data.assignmentGrades.reduce((a, b) => a + b, 0) / data.assignmentGrades.length)}
              />
            </div>
            <div>
              <span className="text-sm text-slate-600 mb-1 block">Project Performance</span>
              <ProgressBar value={data.projectPerformance} />
            </div>
          </div>
        </div>

        {/* Individual Scores Summary with Grades */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#152c44]">
            <Trophy className="h-4 w-4" />
            Recent Assessments
          </h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {data.testScores.quizzes.map((quiz, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                <span className="text-slate-600">Quiz {i + 1}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#152c44]">{quiz.score}%</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
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
                    {quiz.grade}
                  </span>
                </div>
              </div>
            ))}
            {data.testScores.exams.map((exam, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                <span className="text-slate-600">Exam {i + 1}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#152c44]">{exam.score}%</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
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
                    {exam.grade}
                  </span>
                </div>
              </div>
            ))}
            {data.testScores.presentations.map((presentation, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                <span className="text-slate-600">Presentation {i + 1}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#152c44]">{presentation.score}%</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
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
                    {presentation.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
