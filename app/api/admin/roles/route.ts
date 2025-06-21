import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get role statistics
    const [roleStats] = await db.execute(`
      SELECT 
        role,
        COUNT(*) as user_count
      FROM users 
      WHERE is_active = TRUE
      GROUP BY role
    `)

    const stats = roleStats as any[]

    const roles = [
      {
        id: "admin",
        name: "Administrator",
        description: "Full system access with all administrative privileges",
        permissions: ["all"],
        userCount: stats.find((s) => s.role === "admin")?.user_count || 0,
      },
      {
        id: "principal",
        name: "Principal",
        description: "School management with oversight of all academic and administrative functions",
        permissions: ["manage_staff", "manage_students", "view_reports", "manage_academics"],
        userCount: stats.find((s) => s.role === "principal")?.user_count || 0,
      },
      {
        id: "teacher",
        name: "Teacher",
        description: "Classroom management, student assessment, and academic activities",
        permissions: ["manage_classes", "mark_attendance", "enter_marks", "view_students"],
        userCount: stats.find((s) => s.role === "teacher")?.user_count || 0,
      },
      {
        id: "student",
        name: "Student",
        description: "Access to personal academic information and school resources",
        permissions: ["view_profile", "view_marks", "view_timetable", "view_announcements"],
        userCount: stats.find((s) => s.role === "student")?.user_count || 0,
      },
      {
        id: "parent",
        name: "Parent",
        description: "Monitor child's academic progress and school communications",
        permissions: ["view_child_profile", "view_child_marks", "view_announcements", "communicate"],
        userCount: stats.find((s) => s.role === "parent")?.user_count || 0,
      },
    ]

    return NextResponse.json(roles)
  } catch (error) {
    console.error("Error fetching roles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
