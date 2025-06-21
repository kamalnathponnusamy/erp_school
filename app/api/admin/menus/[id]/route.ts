import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { role_permissions } = await request.json()
    const menuId = Number.parseInt(params.id)

    await db.execute("UPDATE menus SET role_permissions = ? WHERE id = ?", [JSON.stringify(role_permissions), menuId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating menu permissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
