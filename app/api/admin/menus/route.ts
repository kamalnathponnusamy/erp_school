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

    const [rows] = await db.execute(`
      SELECT id, pid, name, url, icon, sort_order, role_permissions, is_active
      FROM menus 
      ORDER BY sort_order ASC
    `)

    const menus = rows as any[]

    // Build tree structure
    const menuMap = new Map<number, any>()
    const rootMenus: any[] = []

    // First pass: create all menu items
    menus.forEach((menu) => {
      const menuItem = {
        id: menu.id,
        pid: menu.pid,
        name: menu.name,
        url: menu.url,
        icon: menu.icon,
        sort_order: menu.sort_order,
        role_permissions: JSON.parse(menu.role_permissions || "[]"),
        is_active: menu.is_active,
        children: [],
      }
      menuMap.set(menu.id, menuItem)
    })

    // Second pass: build tree structure
    menus.forEach((menu) => {
      const menuItem = menuMap.get(menu.id)!
      if (menu.pid === 0) {
        rootMenus.push(menuItem)
      } else {
        const parent = menuMap.get(menu.pid)
        if (parent) {
          parent.children.push(menuItem)
        }
      }
    })

    return NextResponse.json(rootMenus)
  } catch (error) {
    console.error("Error fetching admin menus:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
