"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getStudentByCode } from "../data/mockData"
import type { StudentInfo } from "../types/performance"
import { User, Lock } from "lucide-react"

interface StudentLoginProps {
  onLogin: (student: StudentInfo) => void
}

export function StudentLogin({ onLogin }: StudentLoginProps) {
  const [studentCode, setStudentCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!studentCode.trim()) {
      setError("Please enter your student code")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const student = getStudentByCode(studentCode.trim())

    if (student) {
      onLogin(student)
    } else {
      setError("Invalid student code. Please check and try again.")
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with IBSRA branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-[#152c44] mb-2">Student Portal</h1>
          <p className="text-slate-600">Enter your student code to access your performance dashboard</p>
        </div>

        <Card className="border-[#152c44]/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-[#152c44]">
              <User className="h-5 w-5" />
              Student Login
            </CardTitle>
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
                onKeyPress={handleKeyPress}
                className="mt-2 border-[#152c44]/30 focus:border-[#152c44] text-center font-mono text-lg"
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#152c44] hover:bg-[#152c44]/90 text-white"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </Button>

            <div className="text-center text-sm text-slate-500 mt-4">
              <p>Demo Student Codes:</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <span className="bg-slate-100 px-2 py-1 rounded">AH2024</span>
                <span className="bg-slate-100 px-2 py-1 rounded">FZ2024</span>
                <span className="bg-slate-100 px-2 py-1 rounded">OK2024</span>
                <span className="bg-slate-100 px-2 py-1 rounded">LI2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
