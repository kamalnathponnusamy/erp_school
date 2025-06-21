import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { RoleManagement } from "@/components/admin/role-management"

export default async function RoleSettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Role Settings</h2>
        <p className="text-muted-foreground">Manage user roles and menu permissions</p>
      </div>

      <RoleManagement />
    </div>
  )
}
