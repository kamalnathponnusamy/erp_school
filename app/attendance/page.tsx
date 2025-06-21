import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AttendanceForm } from "@/components/attendance-form"
import { AttendanceStats } from "@/components/attendance-stats"

export default async function AttendancePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const allowedRoles = ["admin", "principal", "teacher"]
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
        <p className="text-muted-foreground">Mark and manage student attendance</p>
      </div>

      <AttendanceStats />
      <AttendanceForm />
    </div>
  )
}
