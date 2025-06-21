import { type NextRequest, NextResponse } from "next/server"
import { getMenusByRole } from "@/lib/menu-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 })
    }

    console.log("Role param:", role);

    const menus = await getMenusByRole(role)
    return NextResponse.json(menus)
  } catch (error) {
    console.error("Error fetching menus:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
