"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getAllStudents, addStudent, updateStudent, deleteStudent } from "../data/mockData"
import type { StudentInfo } from "../types/performance"
import { Plus, Edit, Trash2, Users, UserCheck, Calendar, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentManagementProps {
  onClose: () => void
}

export function StudentManagement({ onClose }: StudentManagementProps) {
  const [students, setStudents] = useState<StudentInfo[]>(getAllStudents())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentInfo | null>(null)
  const [formData, setFormData] = useState({
    studentName: "",
    studentCode: "",
    programType: "" as "individual" | "group" | "",
    profilePicture: "/placeholder.svg?height=100&width=100",
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      studentName: "",
      studentCode: "",
      programType: "",
      profilePicture: "/placeholder.svg?height=100&width=100",
      isActive: true,
    })
  }

  const handleAddStudent = () => {
    if (!formData.studentName.trim() || !formData.studentCode.trim() || !formData.programType) {
      alert("Please fill in all required fields")
      return
    }

    // Check if student code already exists
    if (students.some((s) => s.studentCode.toLowerCase() === formData.studentCode.toLowerCase())) {
      alert("Student code already exists. Please use a different code.")
      return
    }

    const newStudent = addStudent(formData)
    setStudents(getAllStudents())
    setIsAddDialogOpen(false)
    resetForm()
    alert(`Student ${newStudent.studentName} added successfully!`)
  }

  const handleEditStudent = () => {
    if (!editingStudent || !formData.studentName.trim() || !formData.studentCode.trim() || !formData.programType) {
      alert("Please fill in all required fields")
      return
    }

    // Check if student code already exists (excluding current student)
    if (
      students.some(
        (s) =>
          s.studentId !== editingStudent.studentId &&
          s.studentCode.toLowerCase() === formData.studentCode.toLowerCase(),
      )
    ) {
      alert("Student code already exists. Please use a different code.")
      return
    }

    const updatedStudent = updateStudent(editingStudent.studentId, formData)
    if (updatedStudent) {
      setStudents(getAllStudents())
      setIsEditDialogOpen(false)
      setEditingStudent(null)
      resetForm()
      alert(`Student ${updatedStudent.studentName} updated successfully!`)
    }
  }

  const handleDeleteStudent = (student: StudentInfo) => {
    if (confirm(`Are you sure you want to delete ${student.studentName}? This action cannot be undone.`)) {
      const success = deleteStudent(student.studentId)
      if (success) {
        setStudents(getAllStudents())
        alert(`Student ${student.studentName} deleted successfully!`)
      }
    }
  }

  const openEditDialog = (student: StudentInfo) => {
    setEditingStudent(student)
    setFormData({
      studentName: student.studentName,
      studentCode: student.studentCode,
      programType: student.programType,
      profilePicture: student.profilePicture,
      isActive: student.isActive,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/images/ibsra-logo-bw.png" alt="IBSRA Logo" className="h-10 w-auto" />
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#152c44]" />
              <div>
                <h1 className="text-3xl font-bold text-[#152c44]">Student Management</h1>
                <p className="text-slate-600">Create and manage student accounts and access codes</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-[#152c44] text-[#152c44] hover:bg-[#152c44] hover:text-white"
          >
            Back to Admin Panel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#152c44]/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Students</p>
                  <p className="text-3xl font-bold text-[#152c44]">{students.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-[#152c44]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#152c44]/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Students</p>
                  <p className="text-3xl font-bold text-green-600">{students.filter((s) => s.isActive).length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#152c44]/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Sessions per Student</p>
                  <p className="text-3xl font-bold text-purple-600">16</p>
                  <p className="text-xs text-slate-500">8 Individual + 8 Group</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Student Button */}
        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#152c44] hover:bg-[#152c44]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[#152c44]">Add New Student</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="studentName" className="text-[#152c44]">
                    Student Name *
                  </Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter student full name"
                    className="border-[#152c44]/30 focus:border-[#152c44]"
                  />
                </div>
                <div>
                  <Label htmlFor="studentCode" className="text-[#152c44]">
                    Student Code *
                  </Label>
                  <Input
                    id="studentCode"
                    value={formData.studentCode}
                    onChange={(e) => setFormData({ ...formData, studentCode: e.target.value.toUpperCase() })}
                    placeholder="e.g., AH2024"
                    className="border-[#152c44]/30 focus:border-[#152c44] font-mono"
                  />
                  <p className="text-xs text-slate-500 mt-1">This code will be used by students to login</p>
                </div>
                <div>
                  <Label htmlFor="programType" className="text-[#152c44]">
                    Session Program *
                  </Label>
                  <Select
                    value={formData.programType}
                    onValueChange={(value: "individual" | "group") => setFormData({ ...formData, programType: value })}
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
                      setIsAddDialogOpen(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddStudent} className="bg-[#152c44] hover:bg-[#152c44]/90 text-white">
                    Add Student
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Students List */}
        <Card className="border-[#152c44]/20">
          <CardHeader>
            <CardTitle className="text-[#152c44]">Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No students found. Add your first student to get started.</p>
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
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500">Created: {student.createdAt}</p>
                          <Badge
                            variant={student.programType === "individual" ? "default" : "secondary"}
                            className={
                              student.programType === "individual"
                                ? "bg-blue-100 text-blue-800 text-xs"
                                : "bg-green-100 text-green-800 text-xs"
                            }
                          >
                            {student.programType === "individual" ? "Individual" : "Group"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={student.isActive ? "default" : "secondary"}>
                        {student.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(student)}
                        className="border-[#152c44]/30 text-[#152c44] hover:bg-[#152c44] hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteStudent(student)}
                        className="border-red-300 text-red-600 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#152c44]">Edit Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editStudentName" className="text-[#152c44]">
                  Student Name *
                </Label>
                <Input
                  id="editStudentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter student full name"
                  className="border-[#152c44]/30 focus:border-[#152c44]"
                />
              </div>
              <div>
                <Label htmlFor="editStudentCode" className="text-[#152c44]">
                  Student Code *
                </Label>
                <Input
                  id="editStudentCode"
                  value={formData.studentCode}
                  onChange={(e) => setFormData({ ...formData, studentCode: e.target.value.toUpperCase() })}
                  placeholder="e.g., AH2024"
                  className="border-[#152c44]/30 focus:border-[#152c44] font-mono"
                />
              </div>
              <div>
                <Label htmlFor="programType" className="text-[#152c44]">
                  Session Program *
                </Label>
                <Select
                  value={formData.programType}
                  onValueChange={(value: "individual" | "group") => setFormData({ ...formData, programType: value })}
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
                    setIsEditDialogOpen(false)
                    setEditingStudent(null)
                    resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditStudent} className="bg-[#152c44] hover:bg-[#152c44]/90 text-white">
                  Update Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
