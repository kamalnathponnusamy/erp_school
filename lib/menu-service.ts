import { db } from "./db"

export interface MenuItem {
  id: number
  pid: number
  name: string
  url: string | null
  icon: string | null
  sort_order: number
  role_permissions: string[]
  children?: MenuItem[]
}

export async function getMenusByRole(role: string): Promise<MenuItem[]> {
  try {
    const [rows] = await db.execute(
      `
      SELECT id, pid, name, url, icon, sort_order, role_permissions 
      FROM menus 
      WHERE is_active = TRUE 
      AND JSON_CONTAINS(role_permissions, ?, '$')
      ORDER BY sort_order ASC
    `,
      [`"admin"`]
    )

    const menus = rows as any[]

    console.log("Raw menu rows:", menus);
    console.log("Raw DB rows:", rows);

    // Build tree structure
    const menuMap = new Map<number, MenuItem>()
    const rootMenus: MenuItem[] = []

    // First pass: create all menu items
    menus.forEach((menu) => {
      const menuItem: MenuItem = {
        id: menu.id,
        pid: menu.pid,
        name: menu.name,
        url: menu.url,
        icon: menu.icon,
        sort_order: menu.sort_order,
        role_permissions: Array.isArray(menu.role_permissions)
          ? menu.role_permissions
          : JSON.parse(menu.role_permissions),
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
          parent.children!.push(menuItem)
        }
      }
    })

    return rootMenus
  } catch (error) {
    console.error("Error fetching menus:", error)
    return []
  }
}
