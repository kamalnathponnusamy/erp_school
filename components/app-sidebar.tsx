"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, School } from "lucide-react"
import * as LucideIcons from "lucide-react"
import type { MenuItem } from "@/lib/menu-service"
import { Skeleton } from "@/components/ui/skeleton"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (session?.user?.role) {
      fetchMenus(session.user.role)
    }
  }, [session])

  useEffect(() => {
    // Open the parent menu of the active item
    const activeItem = findActiveItem(menus, pathname)
    if (activeItem?.pid) {
      setOpenMenus((prev) => ({ ...prev, [activeItem.pid]: true }))
    }
  }, [pathname, menus])

  const findActiveItem = (items: MenuItem[], currentPath: string): MenuItem | null => {
    for (const item of items) {
      if (item.url === currentPath) {
        return item
      }
      if (item.children) {
        const found = findActiveItem(item.children, currentPath)
        if (found) {
          return found
        }
      }
    }
    return null
  }

  const fetchMenus = async (role: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/menus?role=${role}`)
      if (response.ok) {
        const data = await response.json()
        setMenus(data)
      } else {
        console.error("Failed to fetch menus")
        setMenus([])
      }
    } catch (error) {
      console.error("Error fetching menus:", error)
      setMenus([])
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName: string | null) => {
    if (!iconName) return <LucideIcons.Dot className="h-4 w-4" />
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className="h-4 w-4" /> : <LucideIcons.Dot className="h-4 w-4" />
  }

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      const isActive = item.url ? pathname.startsWith(item.url) : false

      if (hasChildren) {
        return (
          <Collapsible
            key={item.id}
            open={openMenus[item.id] || false}
            onOpenChange={(isOpen) => setOpenMenus((prev) => ({ ...prev, [item.id]: isOpen }))}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full">
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children!.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                        <Link href={subItem.url || "#"}>
                          {getIcon(subItem.icon)}
                          <span>{subItem.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }

      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link href={item.url || "#"}>
              {getIcon(item.icon)}
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })
  }

  if (loading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-4">
            <Skeleton className="h-8 w-8" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-16" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2 p-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <School className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="font-semibold">School ERP</h2>
            <p className="text-xs text-muted-foreground capitalize">{session?.user?.role} Menu</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menus)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
