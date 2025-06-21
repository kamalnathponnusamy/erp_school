import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { StudentsTable } from "@/components/students-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function StudentsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Check if user has permission to view students
  const allowedRoles = ["admin", "principal", "teacher"]
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage student information and records</p>
        </div>
        {(session.user.role === "admin" || session.user.role === "principal") && (
          <Button asChild>
            <Link href="/students/admission">
              <Plus className="mr-2 h-4 w-4" />
              New Admission
            </Link>
          </Button>
        )}
      </div>

      <StudentsTable />
    </div>
  )
}
