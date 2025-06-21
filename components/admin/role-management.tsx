"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Shield, Menu } from "lucide-react"

interface MenuItem {
  id: number
  pid: number
  name: string
  url: string | null
  icon: string | null
  role_permissions: string[]
  children?: MenuItem[]
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export function RoleManagement() {
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchMenus()
    fetchRoles()
  }, [])

  const fetchMenus = async () => {
    try {
      const response = await fetch("/api/admin/menus")
      if (response.ok) {
        const data = await response.json()
        setMenus(data)
      }
    } catch (error) {
      console.error("Error fetching menus:", error)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/admin/roles")
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
      }
    } catch (error) {
      console.error("Error fetching roles:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateMenuPermissions = async (menuId: number, permissions: string[]) => {
    try {
      const response = await fetch(`/api/admin/menus/${menuId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_permissions: permissions }),
      })

      if (response.ok) {
        fetchMenus()
      }
    } catch (error) {
      console.error("Error updating menu permissions:", error)
    }
  }

  const handlePermissionChange = (menuId: number, role: string, checked: boolean) => {
    const menu = findMenuById(menus, menuId)
    if (!menu) return

    let newPermissions = [...menu.role_permissions]
    if (checked) {
      if (!newPermissions.includes(role)) {
        newPermissions.push(role)
      }
    } else {
      newPermissions = newPermissions.filter((r) => r !== role)
    }

    updateMenuPermissions(menuId, newPermissions)
  }

  const findMenuById = (menuList: MenuItem[], id: number): MenuItem | null => {
    for (const menu of menuList) {
      if (menu.id === id) return menu
      if (menu.children) {
        const found = findMenuById(menu.children, id)
        if (found) return found
      }
    }
    return null
  }

  const renderMenuTree = (menuItems: MenuItem[], level = 0) => {
    return menuItems.map((menu) => (
      <div key={menu.id}>
        <TableRow>
          <TableCell style={{ paddingLeft: `${level * 20 + 16}px` }}>
            <div className="flex items-center gap-2">
              {menu.children && menu.children.length > 0 && <Menu className="h-4 w-4" />}
              <span className={level === 0 ? "font-semibold" : ""}>{menu.name}</span>
            </div>
          </TableCell>
          <TableCell>{menu.url || "-"}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${menu.id}-${role.id}`}
                    checked={menu.role_permissions.includes(role.id)}
                    onCheckedChange={(checked) => handlePermissionChange(menu.id, role.id, checked as boolean)}
                  />
                  <Label htmlFor={`${menu.id}-${role.id}`} className="text-xs">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm" onClick={() => setEditingMenu(menu)}>
              <Edit className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
        {menu.children && renderMenuTree(menu.children, level + 1)}
      </div>
    ))
  }

  if (loading) {
    return <div className="p-4">Loading role settings...</div>
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="permissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="permissions">Menu Permissions</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="users">User Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Permissions</CardTitle>
              <CardDescription>Configure which roles can access each menu item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Menu Item</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Role Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{renderMenuTree(menus)}</TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Roles</CardTitle>
                  <CardDescription>Manage system roles and their descriptions</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Role</DialogTitle>
                      <DialogDescription>Create a new system role with specific permissions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="roleName">Role Name</Label>
                        <Input id="roleName" placeholder="Enter role name" />
                      </div>
                      <div>
                        <Label htmlFor="roleDescription">Description</Label>
                        <Input id="roleDescription" placeholder="Enter role description" />
                      </div>
                      <Button className="w-full">Create Role</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <CardTitle className="text-lg capitalize">{role.name}</CardTitle>
                        </div>
                        <Badge variant="secondary">{role.userCount} users</Badge>
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Role Assignment</CardTitle>
              <CardDescription>Assign roles to users and manage user permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <UserRoleAssignment />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserRoleAssignment() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error("Error updating user role:", error)
    }
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? "default" : "secondary"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select value={user.role} onValueChange={(value) => updateUserRole(user.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
