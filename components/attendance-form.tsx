"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Save, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Student {
  id: number
  student_id: string
  name: string
  status: "present" | "absent" | "late" | "excused"
}

export function AttendanceForm() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const fetchStudents = async (classId: string) => {
    if (!classId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/attendance/students?classId=${classId}&date=${formatDate(date)}`)
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateAttendance = (studentId: number, status: Student["status"]) => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const saveAttendance = async () => {
    setSaving(true)
    try {
      const attendanceData = students.map((student) => ({
        student_id: student.id,
        date: formatDate(date),
        status: student.status,
      }))

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance: attendanceData }),
      })

      if (response.ok) {
        alert("Attendance saved successfully!")
      }
    } catch (error) {
      console.error("Error saving attendance:", error)
      alert("Error saving attendance")
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "excused":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select date and class to mark attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDisplayDate(date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class 1 - A</SelectItem>
                <SelectItem value="2">Class 2 - B</SelectItem>
                <SelectItem value="3">Class 3 - A</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => fetchStudents(selectedClass)} disabled={!selectedClass || loading}>
              <Users className="mr-2 h-4 w-4" />
              Load Students
            </Button>
          </div>
        </CardContent>
      </Card>

      {students.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Students ({students.length})</CardTitle>
                <CardDescription>Mark attendance for each student</CardDescription>
              </div>
              <Button onClick={saveAttendance} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Attendance"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.student_id}</p>
                  </div>
                  <div className="flex gap-2">
                    {(["present", "absent", "late", "excused"] as const).map((status) => (
                      <Button
                        key={status}
                        variant={student.status === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateAttendance(student.id, status)}
                        className={student.status === status ? getStatusColor(status) : ""}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
